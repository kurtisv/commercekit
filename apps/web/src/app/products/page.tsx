import Link from "next/link";
import { ArrowRight, Boxes } from "lucide-react";

import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Button } from "@/components/ui/button";
import { demoProducts } from "@/data/commerce";
import { commerceCopy } from "@/lib/commerce-copy";
import { prisma } from "@/lib/db";
import { getCurrentLocale } from "@/lib/locale";
import { formatCurrency } from "@/lib/money";

async function getProducts() {
  try {
    const products = await prisma.commerceProduct.findMany({
      where: { isActive: true },
      orderBy: [{ featured: "desc" }, { name: "asc" }],
    });
    return products.length > 0 ? products : demoProducts;
  } catch {
    return demoProducts;
  }
}

export default async function ProductsPage() {
  const locale = await getCurrentLocale();
  const t = commerceCopy[locale];
  const products = await getProducts();

  return (
    <MarketingPageShell>
      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{t.products}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-balance sm:text-5xl">
            {locale === "fr" ? "Un catalogue demo concu pour vendre une suite commerce." : "A demo catalog designed to sell a commerce suite."}
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            {locale === "fr"
              ? "Chaque produit expose prix, inventaire, categorie et positionnement pour montrer la base catalogue du boilerplate."
              : "Each product exposes price, inventory, category, and positioning to show the boilerplate catalog foundation."}
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <article key={product.slug} className="commerce-lift flex min-h-80 flex-col rounded-lg border bg-card p-5">
              <div className="flex h-28 items-end rounded-lg border bg-muted p-4" style={{ backgroundColor: product.color ?? undefined }}>
                <Boxes className="size-8 text-white" />
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">{product.category}</p>
              <h2 className="mt-2 text-xl font-semibold">{product.name}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{product.description}</p>
              <div className="mt-auto flex items-center justify-between border-t pt-4">
                <p className="font-semibold">{formatCurrency(product.priceCents, locale)}</p>
                <p className="text-xs text-muted-foreground">{product.inventory} units</p>
              </div>
              <Button asChild className="mt-4" variant="secondary">
                <Link href={`/products/${product.slug}`}>
                  {t.view} <ArrowRight className="size-4" />
                </Link>
              </Button>
            </article>
          ))}
        </div>
      </main>
    </MarketingPageShell>
  );
}
