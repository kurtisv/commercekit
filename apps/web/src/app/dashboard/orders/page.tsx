import Link from "next/link";

import { demoOrders } from "@/data/commerce";
import { prisma } from "@/lib/db";
import { formatCurrency } from "@/lib/money";

async function getOrders() {
  try {
    const orders = await prisma.commerceOrder.findMany({ orderBy: { createdAt: "desc" } });
    return orders.length > 0 ? orders : demoOrders;
  } catch {
    return demoOrders;
  }
}

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Orders</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-normal">Fulfillment queue</h1>
        <div className="mt-8 overflow-hidden rounded-lg border bg-card">
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b bg-muted px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            <span>Order</span>
            <span>Status</span>
            <span>Total</span>
          </div>
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/dashboard/orders/${order.id}`}
              className="grid grid-cols-[1fr_auto_auto] gap-4 border-b px-5 py-4 last:border-b-0 hover:bg-muted"
            >
              <span>
                <span className="block font-medium">{order.orderNumber}</span>
                <span className="text-sm text-muted-foreground">{order.customerName}</span>
              </span>
              <span className="text-sm font-medium">{order.status}</span>
              <span className="font-semibold">{formatCurrency(order.totalCents)}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
