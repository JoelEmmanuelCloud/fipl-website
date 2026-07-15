export type NewsArticleRow = {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  date_iso: string
  category: string
  read_time: string
  image_url: string
  created_at: string
}

export type JobRow = {
  id: string
  title: string
  department: string
  location: string
  type: string
  description: string | null
  requirements: string | null
  posted_date: string
  is_active: boolean
  created_at: string
}

export type MediaKitRow = {
  id: string
  title: string
  category: string
  file_url: string
  thumbnail_url: string | null
  created_at: string
}

export type ContactSubmissionRow = {
  id: string
  first_name: string
  last_name: string
  email: string
  subject: string | null
  message: string
  created_at: string
}

export type NewsletterSubscriberRow = {
  id: string
  email: string
  subscribed_at: string
}

export type JobApplicationRow = {
  id: string
  job_id: string | null
  job_title: string
  first_name: string
  last_name: string
  email: string
  phone: string
  cover_letter: string | null
  cv_url: string
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected'
  created_at: string
}

export type TestimonialRow = {
  id: string
  quote: string
  name: string
  role: string
  is_active: boolean
  created_at: string
}

export type HeroSlideContent = {
  type: 'image' | 'video'
  src: string
  poster: string
  line1: string
  line2: string
}

export type HomeHeroContent = {
  slides: HeroSlideContent[]
  overlay: {
    title: string
    body: string
    imageLeft: string
    imageRight: string
  }
}

export type TitleDesc = { title: string; desc: string }
export type LabelValue = { label: string; value: string }

export type HomeContent = {
  hero: HomeHeroContent
  whoWeAre: {
    eyebrow: string
    heading: string
    body1: string
    body2: string
    body3: string
    image: string
    ctaLabel: string
  }
  sustainabilityCta: {
    eyebrow: string
    heading: string
    body: string
  }
  communityBanner: {
    eyebrow: string
    heading: string
    body: string
    image: string
    ctaLabel: string
  }
  careersSection: {
    eyebrow: string
    heading: string
    body1: string
    body2: string
    image: string
    ctaLabel: string
    officeAddress: string
  }
}

export type AboutContent = {
  purpose: {
    eyebrow: string
    heading: string
    body1: string
    body2: string
    body3: string
    stat1Value: string
    stat1Label: string
    stat2Value: string
    stat2Label: string
  }
  vision: { body: string }
  mission: { body: string }
  coreValues: TitleDesc[]
  ceo: { heading: string; subheading: string }
  integrity: { heading: string; body: string; buttonLabel: string; buttonUrl: string }
}

export type SustainabilityContent = {
  weCare: { heading: string; body1: string; body2: string }
  focusAreas: TitleDesc[]
  sustainabilityBlock: { heading: string; body1: string; body2: string; image: string }
  healthSafety: { heading: string; body: string; image: string }
  governance: { heading: string; body: string; image: string }
  sdg: { heading: string; body1: string; body2: string; image: string }
  community: {
    eyebrow: string
    heading: string
    body1: string
    body2: string
    body3: string
    image: string
  }
  projects: {
    heading: string
    project1: { title: string; desc: string; image: string }
    project2: { title: string; desc: string; image: string }
  }
}

export type PowerPlantsContent = {
  intro: { heading: string; body: string; ctaLabel: string }
  workProcess: { heading: string; body: string }
}

export type RegisterContent = {
  intro: { heading: string; body1: string; body2: string; ctaLabel: string }
  duns: { heading: string; body1: string; body2: string; ctaLabel: string }
}

export type CareersContent = {
  whyJoin: { heading: string; body: string }
  evpCards: TitleDesc[]
  workingInFipl: { heading: string; body1: string; body2: string; image: string }
  talentPool: { heading: string; body: string }
  ctaCard: { heading: string; body: string }
}

export type ContactContent = {
  getInTouch: { heading: string; body: string }
  contactItems: LabelValue[]
  newsletter: { heading: string; body: string }
}

export type NewsContent = {
  insights: { eyebrow: string; heading: string }
}

export type PageContentRow = {
  page: string
  content: Record<string, unknown>
  updated_at: string
}
