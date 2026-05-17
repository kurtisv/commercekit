"use server";

import { redirect } from "next/navigation";
import { nanoid } from "nanoid";

import { demoProducts } from "@/data/commerce";
import { prisma } from "@/lib/db";
import { calculateOrderTotals } from "@/lib/money";

export async function createDemoOrder(formData: FormData) {
  const customerName = String(formData.get("customerName") ?? "").trim();
  const customerEmail = String(formData.get("customerEmail") ?? "").trim();
  const customerCompany = String(formData.get("customerCompany") ?? "").trim();

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

    redirect(`/order/${order.publicToken}`);
  } catch {
    redirect("/order/commercekit-demo-order");
  }
}
