import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { demoOrders } from "@/data/commerce";
import { prisma } from "@/lib/db";
import { formatCurrency } from "@/lib/money";

async function getOrder(id: string) {
  try {
    return (
      (await prisma.commerceOrder.findUnique({
        where: { id },
        include: { items: true },
      })) ?? demoOrders.find((order) => order.id === id) ?? null
    );
  } catch {
    return demoOrders.find((order) => order.id === id) ?? null;
  }
}

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    notFound();
  }

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Order detail</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-normal">{order.orderNumber}</h1>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border bg-card p-5">
            <p className="text-sm text-muted-foreground">Customer</p>
            <p className="mt-2 font-semibold">{order.customerName}</p>
          </div>
          <div className="rounded-lg border bg-card p-5">
            <p className="text-sm text-muted-foreground">Status</p>
            <p className="mt-2 font-semibold">{order.status}</p>
          </div>
          <div className="rounded-lg border bg-card p-5">
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="mt-2 font-semibold">{formatCurrency(order.totalCents)}</p>
          </div>
        </div>
        <div className="mt-8 rounded-lg border bg-card p-5">
          <p className="text-sm text-muted-foreground">Public confirmation</p>
          <Link className="mt-2 block font-medium text-primary" href={`/order/${order.publicToken}`}>
            /order/{order.publicToken}
          </Link>
        </div>
        <Button asChild className="mt-8" variant="secondary">
          <Link href="/dashboard/orders">Back to orders</Link>
        </Button>
      </div>
    </main>
  );
}
