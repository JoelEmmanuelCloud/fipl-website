import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } },
)

const articles = [
  {
    slug: 'fipl-achieves-record-generation-output-q1-2024',
    title: 'FIPL Achieves Record Generation Output in Q1 2024',
    excerpt: 'First Independent Power Limited (FIPL) made history with 541 MW nameplate capacity across all four plants, marking a 25% increase from the previous quarter.',
    content: '<p>First Independent Power Limited (FIPL) is making history milestone records with 540 MW nameplate capacity across all four plants, maintaining a landmark record in the first quarter of the year, marking a 25% increase from the previous quarter.</p><p>This achievement underscores FIPL\'s commitment to operational excellence, continuous reinvestment, and strong partnerships with gas supply entities. According to the company\'s statement, the first quarter results were driven by significant improvements in plant availability and fuel supply reliability.</p><p>The company\'s CEO stated: "This record output is a testament to the dedication of our entire team and our relentless focus on operational excellence. We remain committed to delivering reliable power to Nigeria\'s industries and communities."</p><p>FIPL operates four gas turbine power plants — Afam, Omoku, Trans-Amadi, and Eleme — all situated in Rivers State, Nigeria, with a combined installed capacity of 541MW.</p>',
    date: 'January 12, 2024',
    date_iso: '2024-01-12',
    category: 'Operations',
    read_time: '5 min read',
    image_url: '/images/news/article1.png',
  },
  {
    slug: 'fipl-eligible-customers-expression-of-interest',
    title: 'FiPL Eligible Customers Expression of Interest Form',
    excerpt: 'FIPL invites eligible customers to register their expression of interest to receive electricity supply directly from our generation facilities.',
    content: '<p>First Independent Power Limited (FIPL) is inviting eligible industrial and commercial customers to submit their Expression of Interest (EOI) for direct electricity supply under the Eligible Customer initiative.</p><p>Under the Nigerian Electricity Supply Industry (NESI) framework, large electricity consumers who meet the specified thresholds can now procure power directly from generation companies like FIPL, bypassing traditional distribution channels.</p><p>Interested parties should meet the minimum load requirement of 2MW and have a credible payment history. Please complete and submit the EOI form through our official channels before the closing date.</p>',
    date: 'January 2, 2024',
    date_iso: '2024-01-02',
    category: 'Updates',
    read_time: '3 min read',
    image_url: '/images/news/article2.png',
  },
  {
    slug: 'fipl-vendor-registration-now-open',
    title: 'FiPL Vendor Registration Now Open',
    excerpt: 'FIPL has officially opened its Vendor Registration Programme for qualified suppliers and service providers seeking to partner with the company.',
    content: '<p>First Independent Power Limited (FIPL) is pleased to announce that our Vendor Registration Programme is now open for qualified businesses seeking to supply goods and services to our operations.</p><p>Eligible companies must hold a valid DUNS Number issued by Dun & Bradstreet and meet all documentary requirements including CAC registration, tax clearance certificates, and audited financial statements.</p><p>This registration is open year-round. Visit our Register With Us page for full requirements and the registration portal.</p>',
    date: 'December 15, 2023',
    date_iso: '2023-12-15',
    category: 'Corporate',
    read_time: '2 min read',
    image_url: '/images/news/article3.png',
  },
  {
    slug: 'fipl-ge-partnership-sustainable-power',
    title: 'FIPL & General Electric Forge Partnership to Drive Sustainable Power Generation',
    excerpt: 'FIPL and GE have signed a landmark strategic partnership to deploy advanced technologies that will boost generation efficiency and reduce emissions.',
    content: '<p>First Independent Power Limited (FIPL) and General Electric (GE) have entered into a landmark strategic partnership aimed at deploying cutting-edge technologies across FIPL\'s four power generation facilities in Rivers State, Nigeria.</p><p>The collaboration will focus on digital monitoring, predictive maintenance, and emissions optimisation — key pillars of FIPL\'s sustainability roadmap and commitment to the UN Sustainable Development Goals.</p><p>"This partnership represents a significant step forward in our journey to deliver world-class power generation while meeting our environmental commitments," said FIPL\'s CEO.</p>',
    date: 'November 30, 2023',
    date_iso: '2023-11-30',
    category: 'Partnerships',
    read_time: '4 min read',
    image_url: '/images/news/article1.png',
  },
  {
    slug: 'fipl-community-development-2023',
    title: 'FIPL Invests ₦500M in Host Community Development in 2023',
    excerpt: 'FIPL\'s CSR report reveals a ₦500M investment in education, healthcare, and rural electrification across Rivers State host communities in 2023.',
    content: '<p>First Independent Power Limited (FIPL) today released its 2023 Corporate Social Responsibility (CSR) report, highlighting over ₦500 million invested in community development initiatives across its host communities in Rivers State.</p><p>Key highlights include the award of 120 university scholarships, the construction of three new primary healthcare facilities, and the extension of electricity access to six previously unserved rural communities.</p>',
    date: 'October 10, 2023',
    date_iso: '2023-10-10',
    category: 'Community',
    read_time: '4 min read',
    image_url: '/images/news/article2.png',
  },
  {
    slug: 'fipl-hse-zero-lti-2023',
    title: 'FIPL Records Zero Lost Time Injury for Full Year 2023',
    excerpt: 'FIPL\'s HSE team has maintained an impeccable safety record, recording zero lost time injuries across all four plants throughout 2023.',
    content: '<p>First Independent Power Limited (FIPL) is proud to announce that it has achieved zero Lost Time Injuries (LTIs) across all four of its power generation facilities for the full calendar year 2023, a landmark health and safety milestone.</p><p>This achievement reflects the company\'s deep commitment to its "Safety First" culture and the rigorous implementation of its Health, Safety & Environment (HSE) Management System.</p>',
    date: 'January 8, 2024',
    date_iso: '2024-01-08',
    category: 'Operations',
    read_time: '3 min read',
    image_url: '/images/news/article3.png',
  },
]

const { data, error } = await supabase
  .from('news_articles')
  .upsert(articles, { onConflict: 'slug' })
  .select('slug')

if (error) {
  console.error('Seed failed:', error.message)
  process.exit(1)
}

console.log(`Seeded ${data.length} articles:`)
data.forEach((r) => console.log(' -', r.slug))
