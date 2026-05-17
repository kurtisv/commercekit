import { createDemoOrder } from "@/app/actions/commerce";
import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { demoProducts } from "@/data/commerce";
import { getCurrentLocale } from "@/lib/locale";
import { calculateOrderTotals, formatCurrency } from "@/lib/money";

export default async function CheckoutPage() {
  const locale = await getCurrentLocale();
  const items = demoProducts.slice(0, 2).map((product) => ({ quantity: 1, unitPriceCents: product.priceCents, product }));
  const totals = calculateOrderTotals(items);

  return (
    <MarketingPageShell>
      <main className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Checkout</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-balance sm:text-5xl">
            {locale === "fr" ? "Un checkout demo qui garde les calculs visibles." : "A demo checkout that keeps calculations visible."}
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            {locale === "fr"
              ? "Le flux cree une commande demo quand la base est disponible et redirige vers une confirmation publique."
              : "The flow creates a demo order when the database is available and redirects to a public confirmation."}
          </p>
          <form action={createDemoOrder} className="mt-8 grid gap-4 rounded-lg border bg-card p-5">
            <div className="grid gap-2">
              <Label htmlFor="customerName">{locale === "fr" ? "Nom" : "Name"}</Label>
              <Input id="customerName" name="customerName" placeholder={locale === "fr" ? "Nom du client" : "Customer name"} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="customerEmail">Email</Label>
              <Input id="customerEmail" name="customerEmail" type="email" placeholder="client@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="customerCompany">{locale === "fr" ? "Entreprise" : "Company"}</Label>
              <Input id="customerCompany" name="customerCompany" placeholder={locale === "fr" ? "Entreprise" : "Company"} />
            </div>
            <Button type="submit" size="lg">
              {locale === "fr" ? "Creer une commande demo" : "Create demo order"}
            </Button>
          </form>
        </div>
        <aside className="rounded-[1.25rem] border bg-card p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">{locale === "fr" ? "Resume de commande" : "Order summary"}</h2>
          <div className="mt-6 grid gap-4">
            {items.map(({ product }) => (
              <div key={product.slug} className="flex items-start justify-between gap-4 border-b pb-4">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{product.category}</p>
                </div>
                <p className="font-semibold">{formatCurrency(product.priceCents, locale)}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(totals.subtotalCents, locale)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{formatCurrency(totals.shippingCents, locale)}</span></div>
            <div className="flex justify-between"><span>Tax</span><span>{formatCurrency(totals.taxCents, locale)}</span></div>
            <div className="flex justify-between border-t pt-3 text-lg font-semibold"><span>Total</span><span>{formatCurrency(totals.totalCents, locale)}</span></div>
          </div>
        </aside>
      </main>
    </MarketingPageShell>
  );
}
