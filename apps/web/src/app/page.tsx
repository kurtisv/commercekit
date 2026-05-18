import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  CheckCircle2,
  CreditCard,
  MailCheck,
  PackageCheck,
  ReceiptText,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Button } from "@/components/ui/button";
import { demoProducts, ecosystemSignals, productStats } from "@/data/commerce";
import { getCurrentLocale } from "@/lib/locale";
import { formatCurrency } from "@/lib/money";

const copy = {
  fr: {
    eyebrow: "Projet 6 - Commerce Stripe-ready",
    title: "Un commerce demo qui montre catalogue, checkout, commandes et operations.",
    intro:
      "CommerceKit transforme KV Web Starter en experience e-commerce credible: produits, panier demo, handoff Stripe-ready, confirmation par token et cockpit operations.",
    primary: "Tester le checkout",
    secondary: "Voir le catalogue",
    cockpit: "Commerce cockpit",
    revenue: "Revenu demo",
    orders: "Commandes actives",
    conversion: "Conversion checkout",
    pipeline: ["Panier cree", "Checkout pret", "Commande recue", "Email fallback"],
    proofTitle: "Ce n'est pas juste une vitrine commerce.",
    proof:
      "Le projet montre les couches qui comptent dans une vraie app: catalogue, calculs, commandes, tableau de bord, courriels, Stripe-ready et donnees partagees.",
    modules: [
      { title: "Catalogue", text: "Produits actifs, inventaire, prix en cents et categories.", icon: Boxes },
      { title: "Checkout", text: "Flux demo clair avec totaux, taxes, livraison et futur Stripe Checkout.", icon: CreditCard },
      { title: "Commandes", text: "Token public, confirmation client, statuts et lignes de commande.", icon: ReceiptText },
      { title: "Operations", text: "Dashboard pour suivre revenu, fulfillment et commandes recentes.", icon: BarChart3 },
    ],
    journeyTitle: "Un parcours qui relie client et operations.",
    journey: [
      "Le client compare les produits et comprend la valeur.",
      "Le panier calcule sous-total, taxes, livraison et total.",
      "La confirmation publique donne un suivi partageable.",
      "Le dashboard montre ce qui doit etre prepare, expedie ou rembourse.",
    ],
    ecosystemTitle: "CommerceKit ne vend pas dans le vide.",
    ecosystemText:
      "Les commandes utilisent les memes clients que les autres modules KV Portfolio: un projet suivi dans ClientHub, un atelier gere dans EventPass ou un ticket prioritaire dans SupportDesk peut devenir un achat CommerceKit.",
    ecosystemSource: "Source",
    ecosystemOutcome: "Resultat commerce",
    closeText: "Catalogue, checkout, commandes, dashboard, courriel et structure Stripe-ready.",
    proofButton: "Voir la preuve technique",
  },
  en: {
    eyebrow: "Project 6 - Stripe-ready commerce",
    title: "A commerce demo that shows catalog, checkout, orders, and operations.",
    intro:
      "CommerceKit turns KV Web Starter into a credible e-commerce experience: products, demo cart, Stripe-ready handoff, token confirmation, and operations cockpit.",
    primary: "Test checkout",
    secondary: "View catalog",
    cockpit: "Commerce cockpit",
    revenue: "Demo revenue",
    orders: "Active orders",
    conversion: "Checkout conversion",
    pipeline: ["Cart created", "Checkout ready", "Order received", "Email fallback"],
    proofTitle: "This is not just a commerce landing page.",
    proof:
      "The project shows the layers that matter in a real app: catalog, calculations, orders, dashboard, email, Stripe-ready structure, and shared data.",
    modules: [
      { title: "Catalog", text: "Active products, inventory, prices in cents, and categories.", icon: Boxes },
      { title: "Checkout", text: "Clear demo flow with totals, tax, shipping, and future Stripe Checkout.", icon: CreditCard },
      { title: "Orders", text: "Public token, customer confirmation, statuses, and order line items.", icon: ReceiptText },
      { title: "Operations", text: "Dashboard to track revenue, fulfillment, and recent orders.", icon: BarChart3 },
    ],
    journeyTitle: "A journey that connects customer and operations.",
    journey: [
      "The customer compares products and understands the value.",
      "The cart calculates subtotal, tax, shipping, and total.",
      "The public confirmation gives a shareable status page.",
      "The dashboard shows what needs to be prepared, shipped, or refunded.",
    ],
    ecosystemTitle: "CommerceKit does not sell in isolation.",
    ecosystemText:
      "Orders use the same customers as the other KV Portfolio modules: a ClientHub project, an EventPass workshop, or a priority SupportDesk request can become a CommerceKit purchase.",
    ecosystemSource: "Source",
    ecosystemOutcome: "Commerce result",
    closeText: "Catalog, checkout, orders, dashboard, email, and Stripe-ready structure.",
    proofButton: "View technical proof",
  },
};

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

            <div className="rounded-[1.25rem] border bg-card shadow-2xl shadow-stone-950/10">
              <div className="flex items-center justify-between border-b px-5 py-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{t.cockpit}</p>
                  <p className="mt-1 text-xl font-semibold">{formatCurrency(50360, locale)}</p>
                </div>
                <div className="rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground">Stripe-ready</div>
              </div>
              <div className="grid gap-0 md:grid-cols-[0.74fr_1fr]">
                <div className="border-b bg-muted/55 p-5 md:border-b-0 md:border-r">
                  <div className="rounded-lg border bg-background p-4">
                    <p className="text-sm text-muted-foreground">{t.revenue}</p>
                    <p className="mt-2 text-3xl font-semibold">{formatCurrency(50360, locale)}</p>
                    <div className="mt-4 h-2 rounded-full bg-muted">
                      <div className="h-2 w-[82%] rounded-full bg-primary" />
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3">
                    {t.pipeline.map((item, index) => (
                      <div key={item} className="flex items-center justify-between rounded-lg border bg-card px-4 py-3 text-sm">
                        <span>{item}</span>
                        {index < 3 ? <CheckCircle2 className="size-4 text-primary" /> : <MailCheck className="size-4 text-primary" />}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-5">
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      [t.orders, "18"],
                      [t.conversion, "71%"],
                      ["AOV", formatCurrency(21400, locale)],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-lg border bg-background p-3">
                        <p className="text-2xl font-semibold">{value}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 grid gap-3">
                    {demoProducts.slice(0, 3).map((product) => (
                      <div key={product.slug} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-lg border bg-background p-3">
                        <span className="size-9 rounded-lg" style={{ backgroundColor: product.color }} />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.category}</p>
                        </div>
                        <p className="font-semibold">{formatCurrency(product.priceCents, locale)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.8fr_1.2fr]">
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

        <section className="border-y bg-primary text-primary-foreground">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div>
              <Truck className="size-10 text-secondary" />
              <h2 className="mt-5 text-3xl font-semibold tracking-normal text-balance sm:text-5xl">{t.journeyTitle}</h2>
            </div>
            <div className="grid gap-3">
              {t.journey.map((item, index) => (
                <div key={item} className="grid gap-4 rounded-lg border border-white/15 bg-white/[0.06] p-5 sm:grid-cols-[4rem_1fr]">
                  <p className="font-mono text-sm text-secondary">0{index + 1}</p>
                  <p className="text-sm leading-6 text-primary-foreground/75">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              KV Portfolio ecosystem
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-normal text-balance sm:text-5xl">
              {t.ecosystemTitle}
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">{t.ecosystemText}</p>
          </div>
          <div className="grid gap-3">
            {ecosystemSignals.map((signal) => (
              <div key={`${signal.source}-${signal.actor}`} className="rounded-lg border bg-card p-5 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{t.ecosystemSource}</p>
                    <p className="mt-1 font-semibold">{signal.source}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{signal.actor} - {signal.action[locale]}</p>
                  </div>
                  <div className="rounded-lg bg-muted px-4 py-3 text-sm font-medium">
                    <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{t.ecosystemOutcome}</p>
                    <p className="mt-1">{signal.outcome[locale]}</p>
                  </div>
                </div>
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
