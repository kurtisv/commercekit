import { PrismaClient, Role } from "../apps/web/src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.AUTH_DEMO_EMAIL ?? "admin@example.com";
  const user = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Demo Admin",
    },
  });
  const organization = await prisma.organization.upsert({
    where: { slug: "default" },
    update: {},
    create: {
      name: "Default Organization",
      slug: "default",
    },
  });

  await prisma.membership.upsert({
    where: {
      userId_organizationId: {
        userId: user.id,
        organizationId: organization.id,
      },
    },
    update: { role: Role.OWNER },
    create: {
      userId: user.id,
      organizationId: organization.id,
      role: Role.OWNER,
    },
  });

  await prisma.service.upsert({
    where: { slug: "consultation" },
    update: {},
    create: {
      name: "Consultation",
      slug: "consultation",
      description: "Service de demonstration pour le module booking.",
      durationMin: 60,
      priceCents: 12500,
    },
  });

  const products = [
    {
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
      slug: "email-receipt-system",
      name: "Email Receipt System",
      category: "Email",
      description: "Resend-ready receipt and status messages that keep customers informed.",
      priceCents: 12900,
      inventory: 34,
      featured: false,
      color: "#f1d59b",
    },
  ];

  for (const product of products) {
    await prisma.commerceProduct.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
