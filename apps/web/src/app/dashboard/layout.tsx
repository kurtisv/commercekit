import Link from "next/link";
import {
  BriefcaseBusiness,
  CreditCard,
  LayoutDashboard,
  PackageCheck,
  Settings,
  ShoppingBag,
  Truck,
} from "lucide-react";

import { signOutCurrentUser } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/orders", label: "Orders", icon: ShoppingBag },
  { href: "/products", label: "Catalog", icon: PackageCheck },
  { href: "/checkout", label: "Checkout", icon: CreditCard },
  { href: "/case-study", label: "Case study", icon: BriefcaseBusiness },
  { href: "/dashboard/billing", label: "Stripe-ready", icon: Truck },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-muted text-foreground">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r bg-background px-4 py-5 lg:block">
        <Link href="/" className="block px-2 text-lg font-semibold">
          CommerceKit
        </Link>
        <nav className="mt-8 grid gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex h-10 items-center gap-3 px-3 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="lg:pl-64">
        <header className="flex h-16 items-center justify-between border-b bg-background px-6">
          <div>
            <p className="text-sm font-medium">{session?.user?.name ?? "Admin"}</p>
            <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
          </div>
          <form action={signOutCurrentUser}>
            <Button type="submit" variant="secondary">
              Sign out
            </Button>
          </form>
        </header>
        {children}
      </div>
    </div>
  );
}
