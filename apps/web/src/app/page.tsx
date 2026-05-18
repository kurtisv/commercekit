import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, BarChart3, Boxes, CheckCircle2, CreditCard, PackageCheck, ReceiptText, ShieldCheck } from "lucide-react";

import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Button } from "@/components/ui/button";
import { demoProducts, productStats } from "@/data/commerce";
import { getCurrentLocale } from "@/lib/locale";
import { formatCurrency } from "@/lib/money";

const copy = {
  fr: {
    eyebrow: "Vitrine 3D - Commerce moderne",
    title: "Une vitrine commerce qui transforme un catalogue en experience de marque.",
    intro:
      "CommerceKit sort du parcours synchronise et devient une demonstration visuelle autonome: hero 3D, produits superposes, checkout clair et preuve operationnelle.",
    primary: "Tester le checkout",
    secondary: "Voir le catalogue",
    sceneLabel: "Product stack",
    proofTitle: "Le commerce est presente comme un objet visuel, pas seulement un dashboard.",
    proof:
      "Le recruteur voit rapidement catalogue, panier, confirmation, operations et structure Stripe-ready dans une interface plus memorable et plus premium.",
    modules: [
      { title: "Catalogue", text: "Produits actifs, inventaire, prix en cents et categories.", icon: Boxes },
      { title: "Checkout", text: "Flux demo clair avec totaux, taxes, livraison et futur Stripe Checkout.", icon: CreditCard },
      { title: "Commandes", text: "Token public, confirmation client, statuts et lignes de commande.", icon: ReceiptText },
      { title: "Operations", text: "Cockpit pour suivre revenu, fulfillment et commandes recentes.", icon: BarChart3 },
    ],
    closeText: "Catalogue, checkout, commandes, dashboard, courriel et structure Stripe-ready.",
    proofButton: "Voir la preuve technique",
  },
  en: {
    eyebrow: "3D showcase - Modern commerce",
    title: "A commerce showcase that turns a catalog into a brand experience.",
    intro:
      "CommerceKit leaves the synchronized path and becomes a standalone visual demo: 3D hero, layered products, clear checkout, and operational proof.",
    primary: "Test checkout",
    secondary: "View catalog",
    sceneLabel: "Product stack",
    proofTitle: "Commerce is presented as a visual object, not only a dashboard.",
    proof:
      "Recruiters can quickly see catalog, cart, confirmation, operations, and Stripe-ready structure in a more memorable premium interface.",
    modules: [
      { title: "Catalog", text: "Active products, inventory, prices in cents, and categories.", icon: Boxes },
      { title: "Checkout", text: "Clear demo flow with totals, tax, shipping, and future Stripe Checkout.", icon: CreditCard },
      { title: "Orders", text: "Public token, customer confirmation, statuses, and order line items.", icon: ReceiptText },
      { title: "Operations", text: "Cockpit to track revenue, fulfillment, and recent orders.", icon: BarChart3 },
    ],
    closeText: "Catalog, checkout, orders, dashboard, email, and Stripe-ready structure.",
    proofButton: "View technical proof",
  },
} as const;

export default async function Home() {
  const locale = await getCurrentLocale();
  const t = copy[locale];

  return (
    <MarketingPageShell>
      <main className="overflow-hidden">
        <section className="relative border-b">
          <div className="absolute inset-0 -z-10 commerce-grid" />
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border bg-card/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                <PackageCheck className="size-4" />
                {t.eyebrow}
              </p>
              <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-normal text-balance sm:text-6xl lg:text-7xl">
                {t.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{t.intro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/checkout">
                    {t.primary} <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/products">{t.secondary}</Link>
                </Button>
              </div>
              <div className="mt-10 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
                {productStats.map((stat) => (
                  <div key={stat.label} className="rounded-lg border bg-card/85 p-4 shadow-sm">
                    <p className="text-2xl font-semibold">{stat.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="commerce-scene" aria-label={t.sceneLabel}>
              <div className="commerce-stage">
                {demoProducts.slice(0, 4).map((product, index) => (
                  <Link
                    key={product.slug}
                    href={`/products/${product.slug}`}
                    className={`commerce-product commerce-product-${index + 1}`}
                    style={{ "--swatch": product.color } as CSSProperties}
                  >
                    <span className="commerce-product-swatch" />
                    <span className="text-xs uppercase tracking-[0.16em] text-white/55">{product.category}</span>
                    <span className="mt-3 block text-2xl font-semibold text-white">{product.name}</span>
                    <span className="mt-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-white">
                      {formatCurrency(product.priceCents, locale)}
                    </span>
                  </Link>
                ))}
                <div className="commerce-checkout-card">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/55">Checkout</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{formatCurrency(50360, locale)}</p>
                  <div className="mt-5 grid gap-2">
                    {["Cart", "Tax", "Shipping", "Ready"].map((item) => (
                      <div key={item} className="flex items-center justify-between rounded-lg bg-white/[0.08] px-3 py-2 text-sm text-white/72">
                        <span>{item}</span>
                        <CheckCircle2 className="size-4 text-[#f1d59b]" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-normal text-balance sm:text-5xl">{t.proofTitle}</h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">{t.proof}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {t.modules.map((module) => (
              <div key={module.title} className="commerce-lift rounded-lg border bg-card p-5">
                <div className="flex size-11 items-center justify-center rounded-lg bg-[var(--accent-soft)]">
                  <module.icon className="size-5" />
                </div>
                <h3 className="mt-5 font-semibold">{module.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{module.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t bg-card">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-12 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-semibold">CommerceKit</h2>
              <p className="mt-2 text-muted-foreground">{t.closeText}</p>
            </div>
            <Button asChild>
              <Link href="/case-study">
                <ShieldCheck className="size-4" />
                {t.proofButton}
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </MarketingPageShell>
  );
}
