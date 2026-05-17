import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, PackageCheck } from "lucide-react";

import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Button } from "@/components/ui/button";
import { demoProducts } from "@/data/commerce";
import { prisma } from "@/lib/db";
import { getCurrentLocale } from "@/lib/locale";
import { formatCurrency } from "@/lib/money";

async function getProduct(slug: string) {
  try {
    return (
      (await prisma.commerceProduct.findUnique({ where: { slug } })) ??
      demoProducts.find((product) => product.slug === slug) ??
      null
    );
  } catch {
    return demoProducts.find((product) => product.slug === slug) ?? null;
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const locale = await getCurrentLocale();
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <MarketingPageShell>
      <main className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.25rem] border bg-muted p-6" style={{ backgroundColor: product.color ?? undefined }}>
          <div className="flex min-h-96 items-end rounded-lg border border-white/30 bg-white/10 p-6 text-white">
            <div>
              <PackageCheck className="size-12" />
              <p className="mt-4 text-sm uppercase tracking-[0.18em]">{product.category}</p>
              <h1 className="mt-2 text-5xl font-semibold tracking-normal text-balance">{product.name}</h1>
            </div>
          </div>
        </div>
        <div className="self-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            {locale === "fr" ? "Detail produit" : "Product detail"}
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-normal text-balance">
            {locale === "fr" ? "Une fiche produit claire, prete pour conversion." : "A clear product page, ready for conversion."}
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">{product.description}</p>
          <div className="mt-6 rounded-lg border bg-card p-5">
            <p className="text-3xl font-semibold">{formatCurrency(product.priceCents, locale)}</p>
            <p className="mt-2 text-sm text-muted-foreground">{product.inventory} units available</p>
          </div>
          <ul className="mt-6 grid gap-3 text-sm text-muted-foreground">
            {[
              "Stored in cents to avoid rounding errors.",
              "Ready to connect to Stripe Checkout metadata.",
              "Can be managed through the operations dashboard.",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 size-4 text-primary" />
                {item}
              </li>
            ))}
          </ul>
          <Button asChild className="mt-8" size="lg">
            <Link href="/checkout">
              {locale === "fr" ? "Continuer au checkout" : "Continue to checkout"} <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </main>
    </MarketingPageShell>
  );
}
