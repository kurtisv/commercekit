import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Button } from "@/components/ui/button";
import { demoOrders } from "@/data/commerce";
import { prisma } from "@/lib/db";
import { getCurrentLocale } from "@/lib/locale";
import { formatCurrency } from "@/lib/money";

async function getOrder(token: string) {
  try {
    return (
      (await prisma.commerceOrder.findUnique({
        where: { publicToken: token },
        include: { items: true },
      })) ?? demoOrders.find((order) => order.publicToken === token) ?? demoOrders[0]
    );
  } catch {
    return demoOrders.find((order) => order.publicToken === token) ?? demoOrders[0];
  }
}

export default async function OrderPage({ params }: { params: Promise<{ token: string }> }) {
  const locale = await getCurrentLocale();
  const { token } = await params;
  const order = await getOrder(token);

  return (
    <MarketingPageShell>
      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-[1.25rem] border bg-card p-8 shadow-sm">
          <CheckCircle2 className="size-12 text-primary" />
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            {locale === "fr" ? "Commande recue" : "Order received"}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-balance">{order.orderNumber}</h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            {locale === "fr"
              ? `La commande de ${order.customerName} est sauvegardee comme ${order.status}.`
              : `${order.customerName}'s order is saved as ${order.status}.`}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="border bg-background p-4">
              <p className="text-sm text-muted-foreground">Customer</p>
              <p className="mt-2 font-semibold">{order.customerName}</p>
            </div>
            <div className="border bg-background p-4">
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="mt-2 font-semibold">{order.status}</p>
            </div>
            <div className="border bg-background p-4">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="mt-2 font-semibold">{formatCurrency(order.totalCents, locale)}</p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/products">{locale === "fr" ? "Retour au catalogue" : "Back to catalog"}</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/case-study">{locale === "fr" ? "Voir l'etude" : "View case study"}</Link>
            </Button>
          </div>
        </div>
      </main>
    </MarketingPageShell>
  );
}
