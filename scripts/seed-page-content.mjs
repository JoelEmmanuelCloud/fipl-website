import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { createClient } from '@supabase/supabase-js'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: join(__dirname, '..', '.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } },
)

const pages = [
  {
    page: 'home',
    content: {
      hero: {
        slides: [
          {
            type: 'image',
            src: '/images/hero/FIPL6318.jpg',
            poster: '',
            line1: 'Our People',
            line2: 'Power the Nation',
          },
          {
            type: 'image',
            src: '/images/hero/FIPL6305.jpg',
            poster: '',
            line1: 'Engineering',
            line2: "Nigeria's Energy Future",
          },
          {
            type: 'video',
            src: '/videos/hero.mp4',
            poster: '/images/home/backgroundimage.png',
            line1: 'Committed to',
            line2: 'Efficient and Sustainable Power Generation',
          },
        ],
        overlay: {
          title: 'Our Power Plants,\nOur Impact',
          body: "FIPL operates four world-class thermal power plants – Omoku, Afam, Trans-Amadi, and Eleme – generating electricity that supports Nigeria's industrial and economic growth.",
          imageLeft: '/images/home/leftheroimage.png',
          imageRight: '/images/home/rightsideimage.png',
        },
      },
      whoWeAre: {
        eyebrow: 'Who We Are ⚡',
        heading: "A Trusted Energy Partner\nShaping Nigeria's Future.",
        body1:
          'First Independent Power Company Limited (FIPL) is a leading Nigerian power generation company committed to delivering reliable, responsible, and sustainable energy. We operate four gas turbine power plants in Trans-Amadi, Afam, Omoku, and Eleme, with a combined installed capacity of 541MW.',
        body2:
          "Driven by operational excellence, engineering innovation, and continuous investment in our assets and people, we provide dependable power that supports industries, businesses, and communities while contributing to Nigeria's energy future.",
        body3:
          "Since assuming operations in 2014, FIPL has consistently restored critical power assets, expanded generation capacity, and strengthened infrastructure to enhance grid reliability. Our commitment to excellence and sustainability continues to drive lasting value for our stakeholders and the nation's power sector.",
        image: '/images/home/who-we-are.jpg',
        ctaLabel: 'Learn More About Us',
      },
      sustainabilityCta: {
        eyebrow: 'Sustainability & CSR',
        heading: 'Sustainability Beyond Power',
        body: 'Our responsibility goes beyond megawatts. Through CSR and sustainable practices we are empowering communities, protecting the environment, and driving progress aligned with the UN SDGs.',
      },
      communityBanner: {
        eyebrow: 'WE VALUE PEOPLE',
        heading: 'Empowering Communities,\nPreserving the Environment',
        body: 'FIPL is conscious of the environment within which we operate, and we ensure that as a socially responsible company, we embark on community development projects within our host communities to benefit the host community residents.',
        image: '/images/home/csr-community.jpg',
        ctaLabel: 'Learn More',
      },
      careersSection: {
        eyebrow: 'Careers',
        heading: 'Join Our Amazing Team',
        body1:
          "At FIPL, our people are the driving force behind our success. We foster a culture of collaboration, innovation, and continuous learning, empowering our employees to grow professionally while making a meaningful impact on Nigeria's energy sector.",
        body2:
          'Our work environment is built on excellence, safety, integrity, and continuous improvement. By investing in our people and encouraging new ideas, we create opportunities to deliver exceptional results, advance sustainable power generation, and shape the future of energy together.',
        image: '/images/home/careers-team-2.jpg',
        ctaLabel: 'Explore Opportunities',
        officeAddress: '70/72 Ordinance, Trans-Amadi, Port Harcourt, Rivers State.',
      },
    },
  },
  {
    page: 'about',
    content: {
      purpose: {
        eyebrow: 'We are FIPL',
        heading: 'Our Purpose, Our Promise',
        body1:
          'First Independent Power Company Limited (FIPL) is a leading Nigerian power generation company committed to delivering reliable, responsible, and sustainable energy. We operate four gas turbine power plants in Trans-Amadi, Afam, Omoku, and Eleme, with a combined installed capacity of 541MW.',
        body2:
          "Driven by operational excellence, engineering innovation, and continuous investment in our assets and people, we provide dependable power that supports industries, businesses, and communities while contributing to Nigeria's energy future.",
        body3:
          "Since assuming operations in 2014, FIPL has consistently restored critical power assets, expanded generation capacity, and strengthened infrastructure to enhance grid reliability. Our commitment to excellence and sustainability continues to drive lasting value for our stakeholders and the nation's power sector.",
        stat1Value: '541',
        stat1Label: 'MW Installed Capacity',
        stat2Value: '10',
        stat2Label: 'Years Experiences',
      },
      vision: { body: 'To be the provider of choice wherever energy is consumed.' },
      mission: {
        body: 'To transform through sustainable and reliable innovation in energy generation, connecting lives and positively impacting livelihoods.',
      },
      coreValues: [
        { title: 'Safety', desc: 'We ensure safety in all areas of our operation.' },
        {
          title: 'Professionalism',
          desc: 'To deliver on all our endeavors with the highest level of professionalism.',
        },
        {
          title: 'Integrity',
          desc: 'To maintain integrity through discipline in all our actions.',
        },
        {
          title: 'Commitment to Stakeholders',
          desc: 'To maintain our commitment to delivering quality service to all our stakeholders.',
        },
        {
          title: 'Environmental Consciousness',
          desc: 'To ensure all our operations are environmentally friendly.',
        },
        {
          title: 'Sustainability',
          desc: 'To ensure our operations drive long-term environmental and social sustainability.',
        },
      ],
      ceo: {
        heading: 'Meet The CEO',
        subheading: 'A video address from our Chief Executive Officer',
      },
      integrity: {
        heading: 'Integrity & Transparency',
        body: 'First Independent Power Company Limited is committed to integrity and transparency. If you have concerns about unethical conduct, fraud or misconduct, you can submit a confidential tip-off report anonymously through our independent reporting platform powered by Deloitte.',
        buttonLabel: 'Submit a Report',
        buttonUrl: 'https://tip-offs.deloitte.com.ng/',
      },
    },
  },
  {
    page: 'sustainability',
    content: {
      weCare: {
        heading: 'We Care',
        body1:
          'FIPL is conscious of the environment within which we operate, and we ensure that as a socially responsible company, we embark on some community development projects within our host communities to benefit the host community residents.',
        body2:
          'At the heart of our business objectives lies an unwavering commitment to promoting good corporate citizenship across the globe. This is achieved through FIPL Foundation – the vehicle for our Corporate Social Responsibility (CSR) initiatives. The activities of FIPL Foundation are aimed at empowering the communities where we operate in a sustainable, transparent, and efficient manner.',
      },
      focusAreas: [
        {
          title: 'Health',
          desc: 'We are committed to the health and well-being of the people and community in which we operate.',
        },
        {
          title: 'Education',
          desc: 'Our multiple education intervention schemes, including scholarships, seminars etc., restate our commitment to improving lives.',
        },
        {
          title: 'Environment',
          desc: 'We are environmentally aware and understand the importance of environmental protection and sustainability.',
        },
      ],
      sustainabilityBlock: {
        heading: 'Sustainability',
        body1:
          'Our operations and maintenance philosophy is driven by efficiency, sustainability, and continuous improvement. We are committed to reducing carbon and fugitive emissions while exploring hardware upgrades and combined-cycle integration to enhance plant performance and reliability. Guided by ethical business practices, we continue to create shared value for our stakeholders and deliver sustainable growth.',
        body2:
          'We have also built strong partnerships with our host communities through impactful development initiatives, including skills acquisition programs, scholarship schemes, and STEM education. By promoting local human capital integration and community participation in our projects, we continue to foster inclusive growth and long-term social impact.',
        image: '/images/sustainability/governance-team.jpg',
      },
      healthSafety: {
        heading: 'Health & Safety First',
        body: 'FIPL is committed to maintaining the highest Environment, Health, Safety, Security & Quality (EHSSQ) standards across all entries and partners. We focus on Injury prevention and the protection of all employees and sub-contractors from occupational hazards in the execution of their responsibilities. Through a systematic implementation of our Environmental Health and Safety Management System, we ensure that our operations within our host communities are safe, environmentally friendly, socially responsible, and efficiency-driven.',
        image: '/images/sustainability/health-safety.jpg',
      },
      governance: {
        heading: 'Corporate Governance',
        body: 'FIPL operates under a set of corporate governance and business principles in order to deliver sustaining and sustainable performance over the long term. This we can only achieve when everyone conforms to a set of high standards and binding values. At FIPL, we strongly uphold our corporate values (SPICES) and engage in our business activities in a transparent manner in accordance with the laid down processes and procedures. We are also bound by the corporate governance standards set out in the regulated Nigerian Electricity Supply Industry (NESI) and we ensure to abide by these standards accordingly.',
        image: '/images/sustainability/governance-board.jpg',
      },
      sdg: {
        heading: 'Our SDG Goals',
        body1:
          'At FIPL, sustainability is embedded in the way we operate. We align our business and community development initiatives with the United Nations Sustainable Development Goals (SDGs), ensuring our actions create lasting value for people, communities, and the environment.',
        body2:
          'Our commitment to affordable and clean energy is reflected in our efforts to provide reliable and efficient power while continuously improving environmental performance. Through our investment in quality education, we support STEM programs, scholarships, and learning opportunities that equip young people with the knowledge and skills to shape the future. We also promote decent work and economic growth by creating employment opportunities, developing local talent, and supporting initiatives that stimulate inclusive and sustainable economic development within our host communities.',
        image: '/images/sustainability/sdg.png',
      },
      community: {
        eyebrow: 'Our Initiatives',
        heading: 'Empowering Communities,\nBuilding Futures',
        body1:
          'We partner with our host communities to drive sustainable development through impactful initiatives in health, education, empowerment, and infrastructure.',
        body2:
          'Our community investment programmes include rural electrification projects that bring reliable electricity to underserved communities, enabling education, healthcare, and economic activities. We also support STEM education through scholarships, mentorship, and hands-on learning opportunities that inspire the next generation of innovators.',
        body3:
          'Our healthcare access programmes provide medical outreach, health screenings, and awareness campaigns to improve community well-being, while our youth empowerment initiatives equip young people with vocational skills, entrepreneurship training, and the resources needed to build sustainable livelihoods.',
        image: '/images/sustainability/community-handover.jpg',
      },
      projects: {
        heading: 'Making a Difference in Our Host Communities',
        project1: {
          title: 'Health Fair (Health is Wealth)',
          desc: 'We organized a health fair for the Obrikom Community residents tagged "Health is Wealth", where up to 200 people were given basic health education, vital signs checks, eye checks and mild corrective lenses, anti-malaria treatments for pregnant women, and mosquito nets to use at home.',
          image: '/images/sustainability/csr-community.png',
        },
        project2: {
          title: 'Renovation of UBE Primary School',
          desc: 'The UBE Primary School Obrikom, which was previously in a deplorable state with open roofs, broken doors and windows, no boards, and broken furniture, and no toilets, received an intervention from FIPL as the entire school block was renovated, furniture was provided, and a block of six toilets was built and commissioned in January 2019.',
          image: '/images/sustainability/ube-primary-school.jpg',
        },
      },
    },
  },
  {
    page: 'power-plants',
    content: {
      intro: {
        heading: 'Our Power Plants',
        body: 'First Independent Power Limited is a company in the business of power generation in Nigeria located in Rivers State. We own and operate 4 gas turbine power plants within Rivers State located in Trans-Amadi Port-Harcourt, Afam, Omoku and Eleme. FIPL currently has a combined installed capacity of 541MW.',
        ctaLabel: 'Explore All Plants',
      },
      workProcess: {
        heading: 'How We Power Nigeria',
        body: 'Our approach ensures every project is executed with precision, safety, and sustainability at the core.',
      },
    },
  },
  {
    page: 'register',
    content: {
      intro: {
        heading: 'Vendor Registration Program',
        body1:
          'In our bid to enhance our business relationship with our vendors and ensure that their operations are guided professionally with the highest form of standards, we require all existing and intending vendors to register with FIPL. The services of a globally reputable company, Dun & Bradstreet, have been engaged to support FIPL in this exercise.',
        body2:
          "The company shall review vendor's documents, conduct office, workshop, and business premises inspection to validate vendor's claims on the registration document. Upon satisfactory review, the company shall be issued a DUNS Number Certificate.",
        ctaLabel: 'Register With Us',
      },
      duns: {
        heading: 'What is a DUNS Number?',
        body1:
          'A DUNS Number is a unique business status number that is provided only to companies that are certified to have met acceptable vendor registration requirements. The number gives the company the benefit of being part of a global database of credible companies that have been certified by Dun & Bradstreet, and the number can be quoted in all your correspondence with any company both locally and globally.',
        body2:
          'Companies who have paid the stipulated registration fee will be contacted by Dun & Bradstreet and required to provide some documents for the registration exercise. See below.',
        ctaLabel: 'Click Here to View Vendor Registration Category',
      },
    },
  },
  {
    page: 'careers',
    content: {
      whyJoin: {
        heading: 'Why Join FIPL',
        body: "First Independent Power Limited is passionate about supporting employees' aspirations by providing limitless opportunities, a growth enabling and collaborative work environment. Our human capital strategies are centred around staff engagement, motivation, productivity and job satisfaction. At FIPL, our EVP tagline is Growth-Opportunity. Culture. Collaboration.",
      },
      evpCards: [
        {
          title: 'Growth Opportunity',
          desc: 'We prioritise career development through our performance-based promotions, robust learning interventions, talent mobility programs, cross-functional projects and higher-level responsibilities that align with personal career objectives.',
        },
        {
          title: 'Culture',
          desc: 'Our inclusive culture is imbued with family values, originality, mutual respect, integrity, open and honest communication.',
        },
        {
          title: 'Collaboration',
          desc: 'Networking is a fundamental aspect of our cross-functional collaborations. We offer our employees a strong sense of purpose and support them with the resources to succeed.',
        },
      ],
      workingInFipl: {
        heading: 'Working in FIPL',
        body1:
          'FIPL is an active, can-do environment built on a diverse team united by a common goal of productivity, solutions, and results, with opportunities open to anyone who can deliver regardless of gender. We work with our people individually and collectively, offering challenging roles and opportunities for growth as they contribute to our corporate objectives.',
        body2:
          "Our values guide everything we do: integrity means we do what's right, always; innovation drives us to challenge limits and improve continuously; safety puts people and the environment first; and collaboration and sustainability mean we achieve more together and remain committed to lasting impact.",
        image: '/images/careers/team.png',
      },
      talentPool: {
        heading: 'We are committed to lasting impact',
        body: 'Explore roles across engineering, plant operations, administration, and management.',
      },
      ctaCard: {
        heading: "Don't See Your Role?",
        body: "We're always looking for talented individuals. Join our talent pool and we'll reach out when opportunities match your skills.",
      },
    },
  },
  {
    page: 'contact',
    content: {
      getInTouch: {
        heading: 'Get in Touch with Us',
        body: 'Our team is ready to provide answers, offer solutions, and start your journey toward success.',
      },
      contactItems: [
        {
          label: 'Head Office:',
          value:
            '12 Circular Road, Presidential Estate, Off Aba Road, Port-Harcourt, Rivers State, Nigeria.',
        },
        { label: 'Phone:', value: '+234 (0) 1262 0375' },
        { label: 'Email:', value: 'info@fipl-ng.com' },
        {
          label: 'Business Hours',
          value: 'Monday – Friday: 8:00 AM – 5:00 PM\nSaturday & Sunday: Closed',
        },
      ],
      newsletter: {
        heading: 'Subscribe For All The Top News!',
        body: 'Learn how we can serve you better with our daily newsletter.',
      },
    },
  },
  {
    page: 'news',
    content: {
      insights: {
        eyebrow: 'News & Blog',
        heading: 'Insights, Updates & Industry News',
      },
    },
  },
]

console.log(`Upserting ${pages.length} page content row(s)…`)

const { data, error } = await supabase
  .from('page_content')
  .upsert(pages, { onConflict: 'page' })
  .select('page')

if (error) {
  console.error('Error:', error.message)
  process.exit(1)
}

console.log(`\nDone — ${data.length} row(s) upserted:\n`)
data.forEach((p) => console.log(`  ✓ ${p.page}`))
