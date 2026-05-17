export const demoProducts = [
  {
    id: "ck-prod-001",
    slug: "client-launch-kit",
    name: "Client Launch Kit",
    category: "Delivery",
    description: "A productized launch kit purchased after a ClientHub project reaches final QA.",
    priceCents: 18900,
    inventory: 28,
    featured: true,
    color: "#2e3f34",
  },
  {
    id: "ck-prod-002",
    slug: "workshop-seat-bundle",
    name: "Workshop Seat Bundle",
    category: "Events",
    description: "Reserved seats and materials for teams attending an EventPass training session.",
    priceCents: 24900,
    inventory: 16,
    featured: true,
    color: "#b76935",
  },
  {
    id: "ck-prod-003",
    slug: "support-priority-pack",
    name: "Support Priority Pack",
    category: "Support",
    description: "Priority support credits for clients who need faster follow-up after delivery.",
    priceCents: 12900,
    inventory: 34,
    featured: false,
    color: "#f1d59b",
  },
  {
    id: "ck-prod-004",
    slug: "api-usage-credit",
    name: "API Usage Credit",
    category: "Technical",
    description: "Prepaid API usage for partner integrations tracked through API Meter.",
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
    customerName: "Lead Luma entrant",
    customerEmail: "lead@example.com",
    customerCompany: "Northline Studio",
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
    customerCompany: "Atelier Boutique",
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

export const ecosystemSignals = [
  {
    source: "ClientHub",
    actor: "Lead Luma entrant",
    action: {
      fr: "Projet Northline en QA finale",
      en: "Northline project in final QA",
    },
    outcome: {
      fr: "Achat du Client Launch Kit",
      en: "Purchased the Client Launch Kit",
    },
  },
  {
    source: "EventPass",
    actor: "Elliot Moore",
    action: {
      fr: "Inscription a Design Ops Night",
      en: "Registered for Design Ops Night",
    },
    outcome: {
      fr: "Bundle atelier en fulfillment",
      en: "Workshop bundle in fulfillment",
    },
  },
  {
    source: "SupportDesk Lite",
    actor: "Nadia Fortin",
    action: {
      fr: "Demande de support apres livraison",
      en: "Support request after delivery",
    },
    outcome: {
      fr: "Credits support prioritaire disponibles",
      en: "Priority support credits available",
    },
  },
];

export type DemoProduct = (typeof demoProducts)[number];
export type DemoOrder = (typeof demoOrders)[number];
