import { randomUUID } from 'crypto'
import { pool, query } from './db.mjs'

const articles = [
  {
    slug: 'fipl-500mw-aggregate-generation-milestone',
    title: 'FIPL Achieves 500MW Aggregate Generation Milestone',
    category: 'Operations',
    date: 'March 31, 2026',
    date_iso: '2026-03-31',
    read_time: '3 min read',
    excerpt:
      "First Independent Power Limited has reached a landmark operational milestone, achieving an aggregate output of 500 megawatts across its portfolio of gas-fired power plants for the first time in the company's history.",
    image_url: '',
    content: `<h2>Milestone Achievement</h2>
<p>First Independent Power Limited (FIPL) has announced the achievement of a 500 megawatt aggregate generation milestone across its combined plant portfolio. The record output was sustained for a continuous 72-hour period during the final week of March 2026, marking a new high for the company since operations commenced.</p>
<h2>Plant Contributions</h2>
<p>The milestone reflects improved performance across all three operational facilities:</p>
<ul>
<li><strong>Omoku Power Plant</strong> — 220MW contribution at full nameplate capacity</li>
<li><strong>Eleme Power Plant</strong> — 185MW following completion of the Unit 3 refurbishment</li>
<li><strong>Trans-Amadi facility</strong> — 95MW sustained output</li>
</ul>
<h2>Technical Factors</h2>
<p>The record output was supported by stable gas supply from SPDC and a reduction in auxiliary power consumption following efficiency upgrades implemented in Q4 2025. The operations team maintained grid synchronisation without interruption throughout the record period.</p>
<h2>Management Comment</h2>
<blockquote>This milestone is a testament to the discipline of our engineering and operations teams. We are committed to sustaining and improving on this output level as we progress through 2026.</blockquote>`,
  },

  {
    slug: 'fipl-community-borehole-health-centre-omoku',
    title: 'FIPL Donates Borehole and Primary Health Centre to Omoku Community',
    category: 'Community',
    date: 'February 14, 2026',
    date_iso: '2026-02-14',
    read_time: '3 min read',
    excerpt:
      'As part of its host community development commitments, FIPL has commissioned a solar-powered borehole and a fully equipped primary health centre in Omoku, Rivers State, directly benefiting over 4,000 residents.',
    image_url: '',
    content: `<h2>Community Investment</h2>
<p>First Independent Power Limited (FIPL) has commissioned two major infrastructure projects in Omoku, Rivers State — a solar-powered borehole water system and a purpose-built primary health centre. The projects, valued at ₦180 million, were funded entirely by FIPL as part of its annual host community development programme.</p>
<h2>Borehole Water System</h2>
<p>The borehole project provides clean, treated water to three communities within the Omoku axis. Key features include:</p>
<ul>
<li>300-metre deep borehole with submersible pump</li>
<li>Solar panel array providing off-grid power for the pump station</li>
<li>50,000-litre overhead storage tank</li>
<li>Distribution network serving over 800 households</li>
</ul>
<h2>Primary Health Centre</h2>
<p>The health centre has been fully equipped with consultation rooms, a maternity ward, laboratory facilities, and a pharmacy. FIPL has also funded the secondment of two qualified nurses and one physician for the first operating year.</p>
<h2>Community Reception</h2>
<blockquote>For years, our women walked long distances to fetch water and seek medical care. FIPL has changed that today. We are deeply grateful for this investment in our lives.</blockquote>
<p>The commissioning ceremony was attended by the Omoku community leadership, Rivers State government representatives, and FIPL's Executive Director of Corporate Affairs.</p>`,
  },

  {
    slug: 'fipl-appoints-new-managing-director-2026',
    title: 'FIPL Appoints Engr. Adaeze Nwosu as Managing Director',
    category: 'Corporate',
    date: 'January 10, 2026',
    date_iso: '2026-01-10',
    read_time: '2 min read',
    excerpt:
      'The Board of Directors of First Independent Power Limited has announced the appointment of Engr. Adaeze Nwosu as Managing Director and Chief Executive Officer, effective 1 January 2026.',
    image_url: '',
    content: `<h2>Board Announcement</h2>
<p>The Board of Directors of First Independent Power Limited (FIPL) has announced the appointment of Engr. Adaeze Nwosu as Managing Director and Chief Executive Officer. Engr. Nwosu assumes the role effective 1 January 2026, succeeding Engr. Chukwudi Okafor who served the company for nine years.</p>
<h2>Profile</h2>
<p>Engr. Nwosu brings over 22 years of experience in power generation and energy management to the role. She holds a B.Sc. in Electrical/Electronic Engineering from the University of Port Harcourt and an MBA from Lagos Business School. Prior to joining FIPL, she served as Deputy General Manager — Operations at Transcorp Power, where she led a major capacity expansion programme.</p>
<h2>Strategic Priorities</h2>
<p>In a statement released alongside the announcement, Engr. Nwosu outlined her priorities for the year ahead:</p>
<ul>
<li>Sustaining and growing generation capacity towards 600MW</li>
<li>Accelerating the company's energy transition roadmap</li>
<li>Deepening host community partnerships</li>
<li>Expanding FIPL's eligible customer portfolio</li>
</ul>
<h2>Board Chair Statement</h2>
<blockquote>Adaeze's track record, technical depth, and leadership qualities make her the right person to take FIPL into its next phase of growth. The Board has full confidence in her ability to deliver on our strategic objectives.</blockquote>`,
  },

  {
    slug: 'fipl-siemens-energy-grid-stabilisation-mou',
    title: 'FIPL and Siemens Energy Sign MOU on Grid Stabilisation Initiative',
    category: 'Partnerships',
    date: 'December 5, 2025',
    date_iso: '2025-12-05',
    read_time: '3 min read',
    excerpt:
      'FIPL and Siemens Energy have signed a Memorandum of Understanding to collaborate on advanced grid stabilisation technologies, including synchronous condensers and real-time frequency response systems for the Nigerian electricity grid.',
    image_url: '',
    content: `<h2>Partnership Overview</h2>
<p>First Independent Power Limited (FIPL) and Siemens Energy have formalised a Memorandum of Understanding (MOU) to jointly develop and deploy advanced grid stabilisation solutions across FIPL's plant portfolio. The partnership was announced at the Nigeria Energy Summit in Abuja on 5 December 2025.</p>
<h2>Scope of Collaboration</h2>
<p>Under the MOU, the two organisations will work together on the following workstreams:</p>
<ul>
<li>Feasibility study for synchronous condenser installation at FIPL's Omoku facility</li>
<li>Deployment of Siemens Energy's SIGUARD real-time grid monitoring system</li>
<li>Technical training programme for FIPL's control room engineers</li>
<li>Joint research into hydrogen co-firing potential at existing gas turbines</li>
</ul>
<h2>Strategic Significance</h2>
<p>Nigeria's national grid has historically experienced frequency instability, contributing to system collapses and load shedding. The technologies covered by this partnership are designed to provide reactive power support and inertia to the grid, improving reliability for all connected customers.</p>
<blockquote>This partnership reflects our long-term commitment to not just generating power, but actively contributing to the health of the Nigerian grid. We are proud to work with a global leader like Siemens Energy on this initiative.</blockquote>`,
  },

  {
    slug: 'fipl-metering-programme-phase-2-notice',
    title: 'FIPL Metering Programme: Phase 2 Roll-Out — Notice to Eligible Customers',
    category: 'Updates',
    date: 'November 3, 2025',
    date_iso: '2025-11-03',
    read_time: '2 min read',
    excerpt:
      'FIPL has commenced Phase 2 of its advanced metering infrastructure roll-out for eligible customers. All affected customers are advised to review the schedule and prepare their facilities for meter installation.',
    image_url: '',
    content: `<h2>Phase 2 Roll-Out Notice</h2>
<p>First Independent Power Limited (FIPL) hereby notifies eligible customers that Phase 2 of the Advanced Metering Infrastructure (AMI) roll-out will commence on 15 November 2025. This phase covers industrial and large commercial customers in the Rivers State and Delta State supply zones.</p>
<h2>Installation Schedule</h2>
<p>The Phase 2 installation is expected to be completed within eight weeks. Customers will be contacted individually with their specific installation slot at least five working days in advance.</p>
<h2>Customer Action Required</h2>
<p>Eligible customers are required to take the following steps before their scheduled installation date:</p>
<ul>
<li>Ensure unobstructed access to the existing meter location</li>
<li>Designate a site representative to be present during installation</li>
<li>Clear any outstanding billing queries with the FIPL commercial team</li>
<li>Review the AMI Customer Guide available on the FIPL website</li>
</ul>
<h2>Benefits of the New Meters</h2>
<p>The new smart meters will provide customers with half-hourly consumption data via the FIPL customer portal, enabling more accurate billing, early detection of abnormalities, and improved demand management.</p>
<p>For queries, contact the FIPL commercial team at <strong>commercial@fipl.ng</strong> or call <strong>+234 84 500 100</strong>.</p>`,
  },

  {
    slug: 'fipl-auxiliary-power-reduction-efficiency-drive',
    title: 'FIPL Reduces Auxiliary Power Consumption by 12% Through Efficiency Programme',
    category: 'Operations',
    date: 'October 14, 2025',
    date_iso: '2025-10-14',
    read_time: '3 min read',
    excerpt:
      "A targeted efficiency improvement programme implemented across FIPL's plant portfolio has delivered a 12% reduction in auxiliary power consumption, freeing up additional megawatts for dispatch to the national grid.",
    image_url: '',
    content: `<h2>Programme Overview</h2>
<p>First Independent Power Limited (FIPL) has concluded its first-phase Auxiliary Power Reduction Programme, delivering measurable improvements in plant efficiency across its three operational sites. The initiative, which ran from April to September 2025, targeted parasitic loads — power consumed by the plant itself rather than exported to the grid.</p>
<h2>Key Initiatives</h2>
<p>The programme comprised several parallel workstreams:</p>
<ul>
<li><strong>Variable speed drives</strong> — Retrofitted on cooling water pumps and air compressors at Omoku and Eleme, reducing motor energy consumption by up to 40% at partial load</li>
<li><strong>Lighting upgrades</strong> — Full LED replacement across all plant buildings, workshops, and switchyard areas</li>
<li><strong>Compressed air optimisation</strong> — Leak detection survey and rectification, reducing system pressure set-point by 0.5 bar</li>
<li><strong>Control system tuning</strong> — DCS logic optimisation to reduce unnecessary auxiliary start-stop cycles</li>
</ul>
<h2>Results</h2>
<p>Across the three sites, auxiliary consumption was reduced from an average of 8.1% of gross generation to 7.1%, releasing approximately 5MW of additional export capacity. On an annualised basis, this represents an additional revenue opportunity of approximately ₦600 million at current market tariffs.</p>
<h2>Next Phase</h2>
<p>Phase 2 of the programme, scheduled for Q1 2026, will focus on waste heat recovery from gas turbine exhaust streams and further optimisation of the fuel gas system.</p>`,
  },

  {
    slug: 'fipl-scholarship-awards-2025',
    title: '200 Students Benefit from FIPL 2025 Scholarship Awards',
    category: 'Community',
    date: 'September 8, 2025',
    date_iso: '2025-09-08',
    read_time: '2 min read',
    excerpt:
      'FIPL has presented scholarship awards to 200 university students drawn from its host communities in Rivers and Delta States, covering full tuition and a monthly stipend for the 2025/2026 academic year.',
    image_url: '',
    content: `<h2>Annual Scholarship Ceremony</h2>
<p>First Independent Power Limited (FIPL) held its 2025 Scholarship Award Ceremony at the Civic Centre, Port Harcourt on 6 September 2025. A total of 200 students from FIPL's host communities in Rivers and Delta States received awards covering full university tuition and a monthly living stipend of ₦30,000 for the 2025/2026 academic session.</p>
<h2>Beneficiary Profile</h2>
<p>The awards were distributed across a range of disciplines, with priority given to STEM fields:</p>
<ul>
<li><strong>Engineering</strong> (Electrical, Mechanical, Chemical) — 80 students</li>
<li><strong>Sciences</strong> (Physics, Chemistry, Mathematics) — 45 students</li>
<li><strong>Medicine and Health Sciences</strong> — 35 students</li>
<li><strong>Business and Social Sciences</strong> — 40 students</li>
</ul>
<h2>Selection Process</h2>
<p>Candidates were assessed through a competitive process including academic performance review, essay submission, and an interview conducted by a panel of FIPL staff and independent community representatives. Female applicants made up 52% of award recipients this year, the highest proportion in the programme's history.</p>
<h2>FIPL Comment</h2>
<blockquote>Investing in the education of young people from our host communities is not just a corporate responsibility — it is a commitment to the future of the communities that have supported our operations. We are proud of every one of these 200 scholars.</blockquote>
<p>The FIPL scholarship programme has now supported over 1,200 students since its inception in 2015.</p>`,
  },

  {
    slug: 'fipl-2024-annual-report-record-output',
    title: 'FIPL 2024 Annual Report: Record Output and Zero Lost-Time Injuries',
    category: 'Corporate',
    date: 'August 20, 2025',
    date_iso: '2025-08-20',
    read_time: '4 min read',
    excerpt:
      'FIPL has published its 2024 Annual Report, highlighting record-breaking generation output, a full-year zero lost-time injury record, and significant progress on its community development and energy transition commitments.',
    image_url: '',
    content: `<h2>Highlights of 2024</h2>
<p>First Independent Power Limited (FIPL) has released its 2024 Annual Report, covering financial performance, operational results, safety outcomes, and sustainability activities for the year ended 31 December 2024. The report reflects a year of significant achievement across all key performance dimensions.</p>
<h2>Operational Performance</h2>
<p>2024 was FIPL's strongest year on record for generation output:</p>
<ul>
<li>Total net generation: <strong>3.82 TWh</strong> — up 11% year-on-year</li>
<li>Plant availability factor: <strong>94.7%</strong> across the combined portfolio</li>
<li>Equivalent Forced Outage Rate (EFOR): <strong>2.3%</strong> — below industry benchmark</li>
<li>Fuel efficiency: heat rate improvement of 1.8% vs. 2023 baseline</li>
</ul>
<h2>Safety Performance</h2>
<p>FIPL recorded zero Lost-Time Injuries (LTIs) for the full calendar year 2024, across all three plants and all contractor activities. The company maintained a Total Recordable Incident Rate (TRIR) of 0.31, well below the sector average of 0.85.</p>
<h2>Financial Summary</h2>
<p>Revenue for the year grew 18% to ₦47.6 billion, driven by higher generation volumes and improved capacity payments under revised Power Purchase Agreements. EBITDA margin improved to 38%, reflecting operational leverage and the efficiency gains from the ongoing improvement programme.</p>
<h2>Sustainability Commitments</h2>
<p>The 2024 report also presents FIPL's updated Energy Transition Roadmap, including commitments to:</p>
<ul>
<li>Reduce specific CO₂ emissions intensity by 15% by 2030</li>
<li>Complete feasibility assessment for hybrid solar-gas configuration at Omoku</li>
<li>Achieve ISO 14001 environmental management certification across all sites by 2026</li>
</ul>
<p>The full 2024 Annual Report is available for download on the FIPL website.</p>`,
  },

  {
    slug: 'fipl-hse-zero-lti-recognition-2025',
    title: 'FIPL Receives National HSE Excellence Award for Third Consecutive Year',
    category: 'Operations',
    date: 'July 15, 2025',
    date_iso: '2025-07-15',
    read_time: '2 min read',
    excerpt:
      "The Nigeria Employers Consultative Association has recognised FIPL with the HSE Excellence Award for the third consecutive year, citing the company's sustained zero Lost-Time Injury record and industry-leading safety culture.",
    image_url: '',
    content: `<h2>Award Recognition</h2>
<p>First Independent Power Limited (FIPL) has received the Nigeria Employers Consultative Association (NECA) HSE Excellence Award for the third consecutive year at the annual Health, Safety and Environment Forum held in Lagos on 12 July 2025. The award recognises organisations that demonstrate outstanding commitment to workplace safety and environmental stewardship.</p>
<h2>Safety Record</h2>
<p>FIPL's award citation highlighted the following achievements:</p>
<ul>
<li>1,095 consecutive days (three full years) without a Lost-Time Injury across all operations</li>
<li>Total Recordable Incident Rate (TRIR) of 0.28 — the lowest in FIPL's history</li>
<li>100% completion rate for mandatory HSE training across workforce and contractors</li>
<li>Implementation of behavioural-based safety programme across all three plant sites</li>
</ul>
<h2>Safety Culture Initiatives</h2>
<p>Key contributors to FIPL's safety record include its near-miss reporting culture, which saw a 34% increase in voluntary near-miss reports in 2024 — a leading indicator of safety awareness — and its monthly plant-wide safety stand-downs led by senior management.</p>
<blockquote>Every person on our sites goes home safely. That is not an aspiration — it is our minimum standard. This award belongs to every FIPL employee and contractor who lives that standard every day.</blockquote>`,
  },

  {
    slug: 'fipl-vendor-registration-phase-2-2025',
    title: 'FIPL Opens Phase 2 Vendor Registration for Local Suppliers',
    category: 'Corporate',
    date: 'June 20, 2025',
    date_iso: '2025-06-20',
    read_time: '2 min read',
    excerpt:
      "FIPL has opened the second phase of its local vendor registration programme, inviting Nigerian-owned businesses in engineering, logistics, catering, and maintenance to apply for inclusion on the company's approved supplier list.",
    image_url: '',
    content: `<h2>Phase 2 Registration Open</h2>
<p>First Independent Power Limited (FIPL) is pleased to announce the opening of Phase 2 of its Local Vendor Registration Programme. The programme is designed to expand FIPL's supply chain to include more Nigerian-owned small and medium enterprises (SMEs), consistent with its local content commitments under the Nigerian Oil and Gas Industry Content Development Act.</p>
<h2>Categories Open for Registration</h2>
<p>Applications are invited from businesses operating in the following categories:</p>
<ul>
<li>Mechanical and electrical maintenance services</li>
<li>Industrial cleaning and waste management</li>
<li>Catering and facility management</li>
<li>Logistics and materials handling</li>
<li>IT equipment supply and support</li>
<li>PPE and consumables supply</li>
</ul>
<h2>Eligibility Requirements</h2>
<p>To be eligible, applicants must:</p>
<ul>
<li>Be a Nigerian-registered company with a valid CAC certificate</li>
<li>Hold a current Tax Clearance Certificate</li>
<li>Have a minimum of two years of operating history in the relevant category</li>
<li>Provide evidence of relevant insurance cover</li>
</ul>
<h2>How to Apply</h2>
<p>Registration forms and detailed requirements are available on the FIPL website. Completed applications should be submitted to <strong>procurement@fipl.ng</strong> by <strong>31 July 2025</strong>. Shortlisted vendors will be invited to a pre-qualification assessment in August 2025.</p>`,
  },
]

function coverImage(slug) {
  return `https://picsum.photos/seed/${slug}-cover/1200/675.jpg`
}

const withImages = articles.map((a) => ({
  ...a,
  image_url: a.image_url || coverImage(a.slug),
}))

console.log(`Upserting ${withImages.length} news articles…`)

for (const a of withImages) {
  await query(
    `insert into news_articles
      (id, slug, title, excerpt, content, date, date_iso, category, read_time, image_url)
     values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     on duplicate key update
       title = values(title), excerpt = values(excerpt), content = values(content),
       date = values(date), date_iso = values(date_iso), category = values(category),
       read_time = values(read_time), image_url = values(image_url)`,
    [
      randomUUID(),
      a.slug,
      a.title,
      a.excerpt,
      a.content,
      a.date,
      a.date_iso,
      a.category,
      a.read_time,
      a.image_url,
    ],
  )
}

console.log(`\nDone — ${withImages.length} article(s) upserted:\n`)
withImages.forEach((a) => console.log(`  ✓ ${a.title}`))

await pool.end()
