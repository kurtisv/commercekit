import Link from "next/link";
import { ArrowRight, PackageCheck, ShoppingBag, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EcosystemNotificationPanel } from "@/components/ecosystem/notification-panel";
import { createOrderFromEcosystemEvent } from "@/app/actions/commerce";
import { demoOrders } from "@/data/commerce";
import { prisma } from "@/lib/db";
import { getIncomingEcosystemEvents } from "@/lib/ecosystem";
import { getCurrentLocale } from "@/lib/locale";
import { formatCurrency } from "@/lib/money";

const timeline = ["Luma Studio", "QuotePilot", "ReserveFlow", "ClientHub", "CommerceKit", "EventPass", "SupportDesk Lite", "API Meter"];

const serviceOffers = {
  fr: [
    ["Kit de lancement", "Service productise issu du projet ClientHub", "$1,200"],
    ["Forfait atelier", "Commande qui peut ouvrir EventPass", "$850"],
    ["Credits support", "Suivi post-livraison vers SupportDesk Lite", "$300"],
  ],
  en: [
    ["Launch kit", "Productized service from the ClientHub project", "$1,200"],
    ["Workshop bundle", "Order that can open EventPass", "$850"],
    ["Support credits", "Post-delivery follow-up toward SupportDesk Lite", "$300"],
  ],
} as const;

async function getDashboardData() {
  try {
    const [orders, products] = await Promise.all([
      prisma.commerceOrder.findMany({
        orderBy: { createdAt: "desc" },
        take: 6,
      }),
      prisma.commerceProduct.count({ where: { isActive: true } }),
    ]);

    const orderRows = orders.length > 0 ? orders : demoOrders;
    const revenue = orderRows.reduce((sum, order) => sum + order.totalCents, 0);
    return { orders: orderRows, products: products || 4, revenue };
  } catch {
    return {
      orders: demoOrders,
      products: 4,
      revenue: demoOrders.reduce((sum, order) => sum + order.totalCents, 0),
    };
  }
}

export default async function DashboardPage() {
  const locale = await getCurrentLocale();
  const copy = locale === "fr"
    ? {
        productLabel: "Operations commerce",
        title: "Cockpit des commandes",
        intro:
          "CommerceKit montre le cote revenus du boilerplate: produits, services, commandes, statuts, client lie et signaux envoyes vers support et API Meter.",
        testTitle: "Ce que tu peux tester ici",
        receives: "Recoit",
        receivesText: "commerce.intent.created depuis ClientHub.",
        sends: "Transmet",
        sendsText: "order.created vers SupportDesk Lite et API Meter.",
        next: "Prochain module",
        nextText: "EventPass pour un atelier ou SupportDesk pour le suivi.",
        stats: ["Revenus suivis", "Commandes actives", "SKUs catalogue", "Etats commande"],
        timeline: "Timeline du parcours",
        offers: "Offres productisees",
        offersTitle: "Services vendables apres le projet",
        viewOrders: "Voir les commandes",
        projectOrders: "Commandes pretes a creer depuis ClientHub",
        projectOrdersText: "Chaque intention commerciale garde le client, le projet, la soumission et le meme flowId.",
        linkedClient: "Client lie",
        proposedService: "Service propose",
        linkedQuote: "Soumission liee",
        clientHubContext: "Contexte ClientHub",
        trackedRevenue: "Revenu suivi",
        receivedName: "Nom recu du formulaire",
        createOrder: "Creer la commande liee",
        empty:
          "Aucun projet entrant pour l'instant. Cree un projet dans ClientHub; CommerceKit affichera ensuite le client, le service lie, le montant et le meme flowId.",
        recentOrders: "Commandes recentes",
      }
    : {
        productLabel: "Commerce operations",
        title: "Order cockpit",
        intro:
          "CommerceKit shows the revenue side of the boilerplate: products, services, orders, statuses, linked client, and signals sent to support and API Meter.",
        testTitle: "What you can test here",
        receives: "Receives",
        receivesText: "commerce.intent.created from ClientHub.",
        sends: "Sends",
        sendsText: "order.created to SupportDesk Lite and API Meter.",
        next: "Next module",
        nextText: "EventPass for a workshop or SupportDesk for follow-up.",
        stats: ["Revenue tracked", "Active orders", "Catalog SKUs", "Order states"],
        timeline: "Journey timeline",
        offers: "Productized offers",
        offersTitle: "Sellable services after the project",
        viewOrders: "View orders",
        projectOrders: "Orders ready to create from ClientHub",
        projectOrdersText: "Each commerce intent keeps the client, project, proposal, and same flowId.",
        linkedClient: "Linked client",
        proposedService: "Proposed service",
        linkedQuote: "Linked quote",
        clientHubContext: "ClientHub context",
        trackedRevenue: "Tracked revenue",
        receivedName: "Name received from the form",
        createOrder: "Create linked order",
        empty:
          "No incoming project yet. Create a project in ClientHub; CommerceKit will then show the client, linked service, amount, and same flowId.",
        recentOrders: "Recent orders",
      };
  const [data, projectEvents] = await Promise.all([
    getDashboardData(),
    getIncomingEcosystemEvents("commercekit", "commerce.intent.created", 6),
  ]);
  const stats = [
    { label: copy.stats[0], value: formatCurrency(data.revenue), icon: ShoppingBag },
    { label: copy.stats[1], value: String(data.orders.length), icon: Truck },
    { label: copy.stats[2], value: String(data.products), icon: PackageCheck },
    { label: copy.stats[3], value: "6", icon: ArrowRight },
  ];

  return (
    <main className="bg-[linear-gradient(180deg,#fffaf0_0%,#f8fafc_52%,#ffffff_100%)] px-6 py-10 text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <div>
            <p className="inline-flex rounded-md border bg-white px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              KV Portfolio Ecosystem - Demo Mode
            </p>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">{copy.productLabel}</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal">{copy.title}</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              {copy.intro}
            </p>
          </div>
          <section className="rounded-lg border bg-card p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {copy.testTitle}
            </p>
            <div className="mt-3 grid gap-2 text-sm">
              <p><span className="font-semibold">{copy.receives}:</span> {copy.receivesText}</p>
              <p><span className="font-semibold">{copy.sends}:</span> {copy.sendsText}</p>
              <p><span className="font-semibold">{copy.next}:</span> {copy.nextText}</p>
            </div>
          </section>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <section key={stat.label} className="rounded-lg border bg-card p-5">
              <stat.icon className="size-5 text-primary" />
              <p className="mt-5 text-sm text-muted-foreground">{stat.label}</p>
              <p className="mt-3 text-2xl font-semibold">{stat.value}</p>
            </section>
          ))}
        </div>

        <div className="mt-8">
          <EcosystemNotificationPanel appKey="commercekit" />
        </div>

        <section className="mt-8 rounded-lg border bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{copy.timeline}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
            {timeline.map((item, index) => (
              <span key={item} className={index === 4 ? "rounded-md bg-primary px-3 py-2 text-primary-foreground" : "rounded-md border bg-background px-3 py-2"}>
                {String(index + 1).padStart(2, "0")} {item}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-lg border bg-card p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {copy.offers}
              </p>
              <h2 className="mt-2 text-xl font-semibold">{copy.offersTitle}</h2>
            </div>
            <Button asChild>
              <Link href="/dashboard/orders">{copy.viewOrders}</Link>
            </Button>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {serviceOffers[locale].map(([title, text, price]) => (
              <article key={title} className="rounded-md border bg-background p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold">{title}</h3>
                  <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold">{price}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-lg border bg-card">
          <div className="border-b p-5">
            <h2 className="text-xl font-semibold">{copy.projectOrders}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {copy.projectOrdersText}
            </p>
          </div>
          <div className="divide-y">
            {projectEvents.map((event) => {
              const payload = typeof event.payload === "object" && event.payload !== null
                ? event.payload as Record<string, unknown>
                : {};
              return (
              <article key={event.id} className="grid gap-4 p-5 md:grid-cols-[1fr_auto]">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="border bg-background px-2 py-1 text-xs font-semibold">{event.sourceApp}</span>
                    <span className="font-mono text-xs text-muted-foreground">{event.flowId}</span>
                  </div>
                  <h3 className="mt-3 font-semibold">{event.customerName ?? copy.receivedName}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{event.description ?? event.title}</p>
                  <div className="mt-4 grid gap-2 text-xs text-muted-foreground sm:grid-cols-3">
                    <span className="rounded-md border bg-background px-3 py-2">{copy.linkedClient}: {event.customerEmail ?? "-"}</span>
                    <span className="rounded-md border bg-background px-3 py-2">{copy.proposedService}: {String(payload.projectName ?? payload.projectType ?? "-")}</span>
                    <span className="rounded-md border bg-background px-3 py-2">{copy.linkedQuote}: {String(payload.quoteNumber ?? "-")}</span>
                    <span className="rounded-md border bg-background px-3 py-2">{copy.trackedRevenue}: {String(payload.quoteTotalCents ?? payload.quoteTotal ?? "-")}</span>
                    <span className="rounded-md border bg-background px-3 py-2 sm:col-span-2">{copy.clientHubContext}: {String(payload.originalMessage ?? payload.notes ?? "-")}</span>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-3 self-center md:items-end">
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold">
                    {event.eventType}
                  </span>
                  <form action={createOrderFromEcosystemEvent}>
                    <input type="hidden" name="eventId" value={event.id} />
                    <button className="rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90">
                      {copy.createOrder}
                    </button>
                  </form>
                </div>
              </article>
              );
            })}
            {projectEvents.length === 0 ? (
              <div className="p-5">
                <p className="rounded-md border bg-background p-4 text-sm text-muted-foreground">
                  {copy.empty}
                </p>
              </div>
            ) : null}
          </div>
        </section>

        <section className="mt-8 rounded-lg border bg-card">
          <div className="border-b p-5">
            <h2 className="text-xl font-semibold">{copy.recentOrders}</h2>
          </div>
          <div className="divide-y">
            {data.orders.map((order) => (
              <Link
                key={order.id}
                href={`/dashboard/orders/${order.id}`}
                className="grid gap-3 p-5 hover:bg-muted sm:grid-cols-[1fr_auto_auto]"
              >
                <div>
                  <p className="font-medium">{order.orderNumber}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{order.customerName}</p>
                </div>
                <p className="text-sm font-medium">{order.status}</p>
                <p className="font-semibold">{formatCurrency(order.totalCents)}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
