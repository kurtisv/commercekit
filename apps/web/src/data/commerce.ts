export const demoProducts = [
  {
    id: "ck-prod-001",
    slug: "checkout-launch-kit",
    name: "Checkout Launch Kit",
    category: "Checkout",
    description: "A guided checkout package for teams that need a polished purchase flow fast.",
    priceCents: 18900,
    inventory: 28,
    featured: true,
    color: "#2e3f34",
  },
  {
    id: "ck-prod-002",
    slug: "retail-ops-dashboard",
    name: "Retail Ops Dashboard",
    category: "Operations",
    description: "Order, customer, and fulfillment dashboards shaped for a small commerce team.",
    priceCents: 24900,
    inventory: 16,
    featured: true,
    color: "#b76935",
  },
  {
    id: "ck-prod-003",
    slug: "email-receipt-system",
    name: "Email Receipt System",
    category: "Email",
    description: "Resend-ready receipt and status messages that keep customers informed.",
    priceCents: 12900,
    inventory: 34,
    featured: false,
    color: "#f1d59b",
  },
  {
    id: "ck-prod-004",
    slug: "catalog-structure-pack",
    name: "Catalog Structure Pack",
    category: "Catalog",
    description: "Product cards, filters, detail pages, and conversion-focused merchandising blocks.",
    priceCents: 15900,
    inventory: 22,
    featured: false,
    color: "#7f9172",
  },
];

export const demoOrders = [
  {
    id: "ck-order-001",
    orderNumber: "CK-2026-0001",
    publicToken: "commercekit-demo-order",
    customerName: "Mara Chen",
    customerEmail: "mara@example.com",
    customerCompany: "Mile End Goods",
    status: "PAID",
    subtotalCents: 43800,
    shippingCents: 0,
    taxCents: 6560,
    totalCents: 50360,
    createdAt: "2026-05-17",
  },
  {
    id: "ck-order-002",
    orderNumber: "CK-2026-0002",
    publicToken: "commercekit-demo-fulfillment",
    customerName: "Elliot Moore",
    customerEmail: "elliot@example.com",
    customerCompany: "Atelier Supply",
    status: "FULFILLING",
    subtotalCents: 28800,
    shippingCents: 1200,
    taxCents: 4493,
    totalCents: 34493,
    createdAt: "2026-05-16",
  },
];

export const productStats = [
  { label: "Catalog SKUs", value: "4" },
  { label: "Checkout paths", value: "2" },
  { label: "Order states", value: "6" },
  { label: "Tests inherited", value: "50" },
];

export type DemoProduct = (typeof demoProducts)[number];
export type DemoOrder = (typeof demoOrders)[number];
