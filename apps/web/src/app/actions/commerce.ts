"use server";

import { redirect } from "next/navigation";
import { nanoid } from "nanoid";

import type { Prisma } from "@/generated/prisma";

import { demoProducts } from "@/data/commerce";
import { prisma } from "@/lib/db";
import { linkEcosystemEntities, publishEcosystemEvent } from "@/lib/ecosystem";
import { requireDashboardAccess } from "@/lib/dashboard-auth";
import { calculateOrderTotals } from "@/lib/money";

function payloadOf(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {};
}

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function numberValue(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

export async function createDemoOrder(formData: FormData) {
  const customerName = String(formData.get("customerName") ?? "").trim();
  const customerEmail = String(formData.get("customerEmail") ?? "").trim();
  const customerCompany = String(formData.get("customerCompany") ?? "").trim();
  const flowId = String(formData.get("flowId") ?? "").trim() || undefined;
  const sourceApp = String(formData.get("sourceApp") ?? "").trim() || undefined;
  const sourceEventId = String(formData.get("sourceEventId") ?? "").trim() || undefined;
  const projectId = String(formData.get("projectId") ?? "").trim() || undefined;
  const projectName = String(formData.get("projectName") ?? "").trim() || undefined;

  if (!customerName || !customerEmail) {
    redirect("/checkout?error=missing-customer");
  }

  const selected = demoProducts.slice(0, 2).map((product, index) => ({
    product,
    quantity: index === 0 ? 1 : 1,
    unitPriceCents: product.priceCents,
  }));
  const totals = calculateOrderTotals(selected);
  const publicToken = `ck_${nanoid(18)}`;

  try {
    const products = await Promise.all(
      selected.map(({ product }) =>
        prisma.commerceProduct.upsert({
          where: { slug: product.slug },
          update: {
            name: product.name,
            category: product.category,
            description: product.description,
            priceCents: product.priceCents,
            inventory: product.inventory,
            featured: product.featured,
            color: product.color,
            isActive: true,
          },
          create: {
            slug: product.slug,
            name: product.name,
            category: product.category,
            description: product.description,
            priceCents: product.priceCents,
            inventory: product.inventory,
            featured: product.featured,
            color: product.color,
            isActive: true,
          },
        }),
      ),
    );

    const count = await prisma.commerceOrder.count();
    const order = await prisma.commerceOrder.create({
      data: {
        orderNumber: `CK-2026-${String(count + 1).padStart(4, "0")}`,
        publicToken,
        customerName,
        customerEmail,
        customerCompany: customerCompany || null,
        status: "PENDING",
        ...totals,
        flowId,
        sourceApp,
        sourceEventId,
        projectId,
        projectName,
        contextJson: {
          sourceApp,
          sourceEventId,
          projectId,
          projectName,
        },
        items: {
          create: selected.map((item, index) => ({
            productId: products[index].id,
            name: item.product.name,
            quantity: item.quantity,
            unitPriceCents: item.unitPriceCents,
            totalCents: item.quantity * item.unitPriceCents,
          })),
        },
      },
    });

    await publishEcosystemEvent({
      flowId,
      sourceApp: "commercekit",
      targetApps: ["supportdesk-lite", "api-meter"],
      eventType: "order.created",
      entityType: "order",
      entityId: order.id,
      customerName,
      customerEmail,
      title: "Commande creee dans CommerceKit",
      description: `${customerName} a cree la commande ${order.orderNumber}.`,
      payload: {
        orderNumber: order.orderNumber,
        customerCompany,
        totalCents: order.totalCents,
        projectId,
        projectName,
        flowId,
      },
      priority: "NORMAL",
      actionLabel: "Voir la commande",
      actionUrl: `/dashboard/orders/${order.id}`,
    });

    redirect(`/order/${order.publicToken}`);
  } catch {
    redirect("/order/commercekit-demo-order");
  }
}

export async function createOrderFromEcosystemEvent(formData: FormData) {
  await requireDashboardAccess();

  const eventId = String(formData.get("eventId") ?? "").trim();
  if (!eventId) return;

  const event = await prisma.ecosystemEvent.findUnique({ where: { id: eventId } });
  if (!event) return;

  const payload = payloadOf(event.payload);
  const customerName = event.customerName || text(payload.customerName) || "Client ecosysteme";
  const customerEmail = event.customerEmail || text(payload.customerEmail) || "client@ecosystem.local";
  const projectId = text(payload.projectId) || event.entityId || undefined;
  const projectName = text(payload.projectName) || event.title;
  const quoteTotalCents = numberValue(payload.quoteTotalCents) ?? numberValue(payload.totalCents) ?? 0;
  const orderPriceCents = Math.max(0, Math.round(quoteTotalCents));
  const publicToken = `ck_${nanoid(18)}`;
  const productSlug = `ecosystem-${event.id.slice(0, 10)}`;

  const product = await prisma.commerceProduct.upsert({
    where: { slug: productSlug },
    update: {
      name: projectName,
      category: "Ecosystem service",
      description: event.description ?? event.title,
      priceCents: orderPriceCents,
      inventory: 1,
      featured: true,
      color: "#0f766e",
      isActive: true,
    },
    create: {
      slug: productSlug,
      name: projectName,
      category: "Ecosystem service",
      description: event.description ?? event.title,
      priceCents: orderPriceCents,
      inventory: 1,
      featured: true,
      color: "#0f766e",
      isActive: true,
    },
  });

  const count = await prisma.commerceOrder.count();
  const order = await prisma.commerceOrder.create({
    data: {
      orderNumber: `CK-2026-${String(count + 1).padStart(4, "0")}`,
      publicToken,
      customerName,
      customerEmail,
      customerCompany: text(payload.customerCompany) || null,
      status: "PENDING",
      subtotalCents: orderPriceCents,
      shippingCents: 0,
      taxCents: 0,
      totalCents: orderPriceCents,
      notes: `Cree depuis ${event.sourceApp} / ${event.eventType}`,
      flowId: event.flowId,
      sourceApp: event.sourceApp,
      sourceEventId: event.id,
      projectId,
      projectName,
      contextJson: {
        sourceEvent: event,
        payload,
      } as Prisma.InputJsonValue,
      items: {
        create: {
          productId: product.id,
          name: product.name,
          quantity: 1,
          unitPriceCents: orderPriceCents,
          totalCents: orderPriceCents,
        },
      },
    },
  });

  await linkEcosystemEntities({
    flowId: event.flowId,
    fromApp: event.sourceApp,
    fromEntityType: event.entityType,
    fromEntityId: event.entityId ?? event.id,
    toApp: "commercekit",
    toEntityType: "order",
    toEntityId: order.id,
  });

  await publishEcosystemEvent({
    flowId: event.flowId,
    sourceApp: "commercekit",
    targetApps: ["eventpass", "supportdesk-lite", "api-meter"],
    eventType: "order.created",
    entityType: "order",
    entityId: order.id,
    customerName,
    customerEmail,
    title: "Commande CommerceKit creee depuis le parcours reel",
    description: `${customerName} a une commande ${order.orderNumber} liee a ${projectName}.`,
    payload: {
      orderNumber: order.orderNumber,
      totalCents: order.totalCents,
      projectId,
      projectName,
      sourceApp: event.sourceApp,
      sourceEventId: event.id,
      flowId: event.flowId,
    },
    priority: "NORMAL",
    actionLabel: "Voir la commande",
    actionUrl: `/dashboard/orders/${order.id}`,
  });

  redirect(`/dashboard/orders/${order.id}`);
}
