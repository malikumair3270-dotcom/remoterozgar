import { prisma } from '../src/lib/prisma';
import { SEED_GUIDES } from '../src/lib/guides-seed-data';

async function main() {
  console.log('🌱 Starting RemoteRozgar database seeding...');

  // 1. Seed 14 comprehensive guides
  console.log(`📚 Seeding ${SEED_GUIDES.length} comprehensive guides...`);
  for (const guide of SEED_GUIDES) {
    await prisma.guide.upsert({
      where: { slug: guide.slug },
      update: {
        title: guide.title,
        category: guide.category,
        excerpt: guide.excerpt,
        body: guide.body,
        coverImage: guide.coverImage,
        readTimeMinutes: guide.readTimeMinutes,
        isFeatured: guide.isFeatured,
        publishedDate: new Date(guide.publishedDate),
      },
      create: {
        slug: guide.slug,
        title: guide.title,
        category: guide.category,
        excerpt: guide.excerpt,
        body: guide.body,
        coverImage: guide.coverImage,
        readTimeMinutes: guide.readTimeMinutes,
        isFeatured: guide.isFeatured,
        publishedDate: new Date(guide.publishedDate),
      },
    });
  }
  console.log('✅ Guides successfully seeded.');

  // 2. Seed initial approved jobs
  console.log('💼 Seeding verified approved jobs...');
  const sampleJobs = [
    {
      id: 'rr-job-1',
      title: 'Senior Full-Stack Engineer (Next.js & TypeScript)',
      companyName: 'Superscale Cloud Ltd',
      companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=200&h=200&q=80',
      companyWebsite: 'https://example.com/superscale',
      category: 'Tech',
      location: 'Anywhere (Global Remote)',
      jobType: 'Full-Time',
      salaryMinUsd: 3500,
      salaryMaxUsd: 5000,
      salaryFormatted: '$3,500 - $5,000 / mo',
      description: `We are looking for a Senior Full-Stack Engineer to lead the architecture of our cloud telemetry analytics platform.
      
Responsibilities:
- Build high-performance React and Next.js 14 applications with App Router and Server Actions.
- Optimize PostgreSQL schemas and write complex Prisma queries.
- Collaborate asynchronously with team members in US, Europe, and South Asia.
- Ensure 99.9% uptime across production Kubernetes clusters.

Requirements:
- 4+ years of professional full-stack development experience.
- Strong proficiency in TypeScript, Node.js, and modern React patterns.
- Excellent written English communication and async ownership.`,
      applyUrl: 'https://jobicy.com',
      contactEmail: 'careers@example.com',
      isFeatured: true,
      status: 'APPROVED',
      source: 'ADMIN',
      adminNotes: 'Verified direct employer post.',
      pubDate: new Date(),
    },
    {
      id: 'rr-job-2',
      title: 'Senior Product Designer (Design Systems & Web3)',
      companyName: 'Aura Studio Inc',
      companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&h=200&q=80',
      companyWebsite: 'https://example.com/aura',
      category: 'Design',
      location: 'Anywhere (Remote)',
      jobType: 'Full-Time',
      salaryMinUsd: 2800,
      salaryMaxUsd: 4200,
      salaryFormatted: '$2,800 - $4,200 / mo',
      description: `Join our distributed creative agency crafting flagship products for fintech and creator economy platforms.

Responsibilities:
- Maintain and expand our comprehensive Figma design tokens and design systems.
- Conduct interactive user testing sessions and translate insights into high-fidelity prototypes.
- Work closely with frontend engineers to inspect production CSS implementations.

Requirements:
- 3+ years in product design, UI/UX, or mobile design.
- Stellar portfolio demonstrating user problem solving and responsive typography.`,
      applyUrl: 'https://jobicy.com',
      contactEmail: 'design-hiring@example.com',
      isFeatured: true,
      status: 'APPROVED',
      source: 'ADMIN',
      adminNotes: 'Pre-approved partner posting.',
      pubDate: new Date(),
    },
    {
      id: 'rr-job-3',
      title: 'Technical B2B Copywriter & Content Strategist',
      companyName: 'DevRelix Systems',
      companyLogo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=200&h=200&q=80',
      companyWebsite: 'https://example.com/devrelix',
      category: 'Writing',
      location: 'Worldwide Remote',
      jobType: 'Contract',
      salaryMinUsd: 2000,
      salaryMaxUsd: 3200,
      salaryFormatted: '$2,000 - $3,200 / mo',
      description: `We need an analytical, developer-oriented writer who can turn complex cloud infrastructure concepts into lucid whitepapers and tutorials.

Responsibilities:
- Write 2 in-depth technical guides (1,500-2,500 words) each week targeting senior engineering leads.
- Interview software architects and review GitHub repositories.
- Work with our SEO lead to identify high-intent technical search keywords.`,
      applyUrl: 'https://jobicy.com',
      contactEmail: 'content@example.com',
      isFeatured: false,
      status: 'APPROVED',
      source: 'ADMIN',
      adminNotes: 'Direct client submission approved.',
      pubDate: new Date(),
    },
  ];

  for (const job of sampleJobs) {
    await prisma.job.upsert({
      where: { id: job.id },
      update: job,
      create: job,
    });
  }
  console.log('✅ Approved sample jobs seeded.');

  // 3. Seed initial ExchangeRate
  console.log('💱 Seeding initial USD/PKR exchange rate cache...');
  await prisma.exchangeRate.create({
    data: {
      baseCurrency: 'USD',
      targetCurrency: 'PKR',
      rate: 278.5,
      fetchedAt: new Date(),
    },
  });
  console.log('✅ Initial exchange rate cached (USD 1 = PKR 278.50).');

  console.log('🚀 RemoteRozgar database seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed with error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
