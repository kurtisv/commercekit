import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Button } from "@/components/ui/button";
import { getCurrentLocale } from "@/lib/locale";

const copy = {
  fr: {
    eyebrow: "Etude de cas",
    title: "CommerceKit devient une vitrine commerce 3D autonome.",
    intro:
      "Le projet prouve qu'une meme fondation peut devenir une experience commerce premium avec produits superposes en 3D, catalogue, checkout demo et preuve operationnelle.",
    points: [
      "Scene 3D CSS avec pile de produits et carte checkout flottante.",
      "Catalogue produit structure avec prix en cents et inventaire.",
      "Checkout demo avec calculs de taxes, livraison et total.",
      "Confirmation publique par token pour montrer un parcours client.",
      "Dashboard operations pour commandes, revenu et fulfillment.",
      "FR/EN, repo public, branches lisibles et tests avant deploiement.",
    ],
    cta: "Tester le checkout",
  },
  en: {
    eyebrow: "Case study",
    title: "CommerceKit becomes a standalone 3D commerce showcase.",
    intro:
      "The project proves one foundation can become a premium commerce experience with layered 3D products, catalog, demo checkout, and operational proof.",
    points: [
      "CSS 3D scene with stacked products and a floating checkout card.",
      "Structured product catalog with cents-based prices and inventory.",
      "Demo checkout with tax, shipping, and total calculations.",
      "Public token confirmation to show a customer journey.",
      "Operations dashboard for orders, revenue, and fulfillment.",
      "FR/EN, public repo, readable branches, and tests before deployment.",
    ],
    cta: "Test checkout",
  },
};

export default async function CaseStudyPage() {
  const locale = await getCurrentLocale();
  const t = copy[locale];

  return (
    <MarketingPageShell>
      <main className="mx-auto grid max-w-5xl gap-10 px-6 py-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{t.eyebrow}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-balance sm:text-5xl">{t.title}</h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">{t.intro}</p>
        </div>
        <div className="grid gap-3">
          {t.points.map((point) => (
            <div key={point} className="flex gap-3 rounded-lg border bg-card p-5 text-sm leading-6 text-muted-foreground">
              <CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" />
              {point}
            </div>
          ))}
        </div>
        <Button asChild>
          <Link href="/checkout">{t.cta}</Link>
        </Button>
      </main>
    </MarketingPageShell>
  );
}
