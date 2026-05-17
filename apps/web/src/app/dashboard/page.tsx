import Link from "next/link";
import { ArrowRight, PackageCheck, ShoppingBag, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { demoOrders } from "@/data/commerce";
import { prisma } from "@/lib/db";
import { formatCurrency } from "@/lib/money";

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
  const data = await getDashboardData();
  const stats = [
    { label: "Revenue tracked", value: formatCurrency(data.revenue), icon: ShoppingBag },
    { label: "Active orders", value: String(data.orders.length), icon: Truck },
    { label: "Catalog SKUs", value: String(data.products), icon: PackageCheck },
    { label: "Order states", value: "6", icon: ArrowRight },
  ];

  return (
    <main className="px-6 py-10 text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Commerce operations</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal">Order cockpit</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              A recruiter-facing admin view that shows how the starter can become a small commerce operations app.
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/orders">View orders</Link>
          </Button>
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

        <section className="mt-8 rounded-lg border bg-card">
          <div className="border-b p-5">
            <h2 className="text-xl font-semibold">Recent orders</h2>
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
