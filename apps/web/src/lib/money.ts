export function formatCurrency(cents: number, locale: "fr" | "en" = "en") {
  return new Intl.NumberFormat(locale === "fr" ? "fr-CA" : "en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function calculateOrderTotals(items: Array<{ quantity: number; unitPriceCents: number }>) {
  const subtotalCents = items.reduce((sum, item) => sum + item.quantity * item.unitPriceCents, 0);
  const shippingCents = subtotalCents > 30000 ? 0 : 1200;
  const taxCents = Math.round((subtotalCents + shippingCents) * 0.14975);

  return {
    subtotalCents,
    shippingCents,
    taxCents,
    totalCents: subtotalCents + shippingCents + taxCents,
  };
}
