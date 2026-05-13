/**
 * Centralised image registry.
 *
 * All pages import from here. When real assets are ready, swap the
 * picsum URL for a local path (e.g. '/images/home/hero.jpg') or a
 * production CDN URL — no hunting through page files required.
 *
 * picsum.photos seeds are stable: the same seed always returns the
 * same photo, so the UI looks consistent across refreshes.
 */
export const IMAGES = {
  home: {
    hero:          '/images/home/backgroundimage.png',
    community:     'https://picsum.photos/seed/fipl-h2/1920/900',
    plantOverview: 'https://picsum.photos/seed/fipl-h3/900/650',
    team:          'https://picsum.photos/seed/fipl-h4/900/650',
    workerLeft:    '/images/home/leftheroimage.png',
    workerRight:   '/images/home/rightsideimage.png',
  },
  about: {
    hero:     'https://picsum.photos/seed/fipl-a1/1920/1080',
    facility: 'https://picsum.photos/seed/fipl-a2/900/650',
    ceo:      'https://picsum.photos/seed/fipl-a3/900/650',
  },
  plants: {
    hero:       'https://picsum.photos/seed/fipl-p0/1920/1080',
    omoku:      'https://picsum.photos/seed/fipl-p1/900/550',
    transAmadi: 'https://picsum.photos/seed/fipl-p2/900/550',
    afam:       'https://picsum.photos/seed/fipl-p3/900/550',
    eleme:      'https://picsum.photos/seed/fipl-p4/900/550',
  },
  sustainability: {
    hero:       'https://picsum.photos/seed/fipl-s1/1920/1080',
    nature:     'https://picsum.photos/seed/fipl-s2/900/650',
    workplace:  'https://picsum.photos/seed/fipl-s3/900/650',
    governance: 'https://picsum.photos/seed/fipl-s4/900/650',
    community:  'https://picsum.photos/seed/fipl-s5/900/650',
  },
  news: {
    hero:      'https://picsum.photos/seed/fipl-n1/1920/1080',
    articleBg: 'https://picsum.photos/seed/fipl-n2/1920/700',
  },
  careers: {
    hero: 'https://picsum.photos/seed/fipl-c1/1920/1080',
    team: 'https://picsum.photos/seed/fipl-c2/900/650',
  },
  contact: {
    hero: 'https://picsum.photos/seed/fipl-ct1/1920/1080',
  },
  register: {
    hero:   'https://picsum.photos/seed/fipl-r1/1920/1080',
    vendor: 'https://picsum.photos/seed/fipl-r2/900/650',
  },
} as const
