'use client'

import { CinematicHero, HeroWords } from '@/components/CinematicHero'
import { IMAGES } from '@/lib/images'

export function AboutHero() {
  return (
    <CinematicHero
      image={IMAGES.about.hero}
      minHeight="min-h-[420px] md:min-h-[520px] lg:min-h-[640px]"
      contentAlign="end"
      overlay="linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.72) 38%, rgba(0,0,0,0.22) 75%, rgba(0,0,0,0.08) 100%)"
      renderContent={(ready) => (
        <div className="w-full max-w-[1280px] mx-auto px-6 pb-14 md:pb-20 lg:pb-24">
          {ready && (
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#DB1B0C', marginBottom: 16, animation: 'heroBadgeIn 0.5s ease 0.3s both' }}>
              Since 2006
            </p>
          )}
          <h1 style={{ fontFamily: 'Arial', fontWeight: 700, fontSize: 'clamp(38px, 6.5vw, 76px)', lineHeight: 1.1, color: 'white', maxWidth: 700 }}>
            <HeroWords text="Powering" startIdx={0} ready={ready} />
            <HeroWords text="Nigeria's Progress" startIdx={1} ready={ready} />
          </h1>
          {ready && (
            <div style={{ height: 2, width: 80, background: 'linear-gradient(90deg, #DB1B0C, #D97300, transparent)', marginTop: 16, transformOrigin: 'left', animation: 'heroRuleGrow 0.7s cubic-bezier(0.22,1,0.36,1) 1s both' }} />
          )}
          {ready && (
            <p className="hero-tagline" style={{ animation: 'heroStatIn 0.6s ease 1.15s both' }}>
              541 MW · 4 Power Plants · Rivers State, Nigeria
            </p>
          )}
        </div>
      )}
    />
  )
}

export function SustainabilityHero() {
  return (
    <CinematicHero
      image={IMAGES.sustainability.hero}
      minHeight="min-h-[420px] md:min-h-[520px] lg:min-h-[640px]"
      contentAlign="center"
      overlay="linear-gradient(to bottom, rgba(0,0,0,0.62) 0%, rgba(0,15,8,0.06) 30%, rgba(0,22,12,0.06) 62%, rgba(0,0,0,0.74) 100%)"
      renderContent={(ready) => (
        <div className="w-full max-w-[1280px] mx-auto px-6 py-16 text-center">
          {ready && (
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#22c55e', marginBottom: 16, animation: 'heroBadgeIn 0.5s ease 0.3s both' }}>
              ESG Commitment
            </p>
          )}
          <h1 style={{ fontFamily: 'Arial', fontWeight: 700, fontSize: 'clamp(30px, 5.2vw, 58px)', lineHeight: 1.25, color: 'white' }}>
            <HeroWords text="Powering Progress," startIdx={0} ready={ready} />
            <HeroWords text="Sustaining the Future" startIdx={2} ready={ready} />
          </h1>
          {ready && (
            <div style={{ height: 2, width: 180, background: 'linear-gradient(90deg, transparent, #22c55e, #16a34a, transparent)', margin: '16px auto 0', transformOrigin: 'center', animation: 'heroRuleGrow 0.7s ease 1.1s both' }} />
          )}
        </div>
      )}
    />
  )
}

export function PowerPlantsHero() {
  return (
    <CinematicHero
      image={IMAGES.plants.hero}
      minHeight="min-h-[420px] md:min-h-[520px] lg:min-h-[640px]"
      contentAlign="end"
      overlay="linear-gradient(to bottom, rgba(0,0,0,0.48) 0%, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.84) 100%)"
      renderContent={(ready) => (
        <div className="w-full max-w-[1280px] mx-auto px-6 pb-10 md:pb-14 text-center">
          <h1 style={{ fontFamily: 'Arial', fontWeight: 700, fontSize: 'clamp(32px, 5.5vw, 62px)', lineHeight: 1.2, color: 'white' }}>
            <HeroWords text="Our Energy Hubs" startIdx={0} ready={ready} />
          </h1>
          {ready && <div className="hero-scan-line" />}
          {ready && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.14)', animation: 'heroStatIn 0.65s ease 1.1s both' }}>
              {([['541 MW', 'Total Capacity'], ['4', 'Strategic Plants'], ['100%', 'Reliability']] as [string, string][]).map(([val, lbl], i) => (
                <div key={lbl} style={{ flex: 1, borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.14)' : 'none', padding: '0 clamp(12px, 3vw, 32px)' }}>
                  <div style={{ fontFamily: 'Arial', fontWeight: 800, fontSize: 'clamp(18px, 3vw, 30px)', color: '#D97300' }}>{val}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.58)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 5 }}>{lbl}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    />
  )
}

export function NewsHero() {
  return (
    <CinematicHero
      image={IMAGES.news.hero}
      minHeight="min-h-[420px] md:min-h-[520px] lg:min-h-[640px]"
      contentAlign="center"
      overlay="linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.25) 75%, rgba(0,0,0,0.1) 100%)"
      renderContent={(ready) => (
        <div className="w-full max-w-[1280px] mx-auto px-6 py-16">
          {ready && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, animation: 'heroBadgeIn 0.5s ease 0.3s both' }}>
              <div style={{ width: 3, height: 34, background: '#DB1B0C', borderRadius: 2, flexShrink: 0 }} />
              <span className="hero-eyebrow">Latest from FIPL · 2026</span>
            </div>
          )}
          <h1 style={{ fontFamily: 'Arial', fontWeight: 700, fontSize: 'clamp(34px, 5.8vw, 66px)', lineHeight: 1.15, color: 'white' }}>
            <HeroWords text="News &" startIdx={0} ready={ready} />
            <HeroWords text="Media" startIdx={2} ready={ready} />
          </h1>
          {ready && (
            <div style={{ height: 2, width: 80, background: 'linear-gradient(90deg, #DB1B0C, #D97300, transparent)', marginTop: 16, transformOrigin: 'left', animation: 'heroRuleGrow 0.7s ease 1s both' }} />
          )}
          {ready && (
            <p className="hero-tagline" style={{ animation: 'heroStatIn 0.6s ease 1.2s both' }}>
              Your source for energy sector insights and updates.
            </p>
          )}
        </div>
      )}
    />
  )
}

export function CareersHero() {
  return (
    <CinematicHero
      image={IMAGES.careers.hero}
      minHeight="min-h-[420px] md:min-h-[520px] lg:min-h-[640px]"
      contentAlign="center"
      overlay="linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.04) 35%, rgba(0,0,0,0.04) 60%, rgba(0,0,0,0.68) 100%)"
      renderContent={(ready) => (
        <div className="w-full max-w-[1280px] mx-auto px-6 py-16 text-center">
          {ready && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, marginBottom: 18, animation: 'heroBadgeIn 0.5s ease 0.3s both' }}>
              <span className="hero-dot-pulse" />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)' }}>Join The Team</span>
            </div>
          )}
          <h1 style={{ fontFamily: 'Arial', fontWeight: 700, fontSize: 'clamp(30px, 5.2vw, 58px)', lineHeight: 1.25, color: 'white' }}>
            <HeroWords text="Powering the" startIdx={0} ready={ready} />
            <HeroWords text="Future Starts With You" startIdx={2} ready={ready} />
          </h1>
          {ready && <div className="hero-scan-line" />}
        </div>
      )}
    />
  )
}

export function ContactHero() {
  return (
    <CinematicHero
      image={IMAGES.contact.hero}
      minHeight="min-h-[420px] md:min-h-[520px] lg:min-h-[640px]"
      contentAlign="center"
      overlay="linear-gradient(to bottom, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.08) 35%, rgba(0,0,0,0.08) 60%, rgba(0,0,0,0.7) 100%)"
      renderContent={(ready) => (
        <div className="w-full max-w-[1280px] mx-auto px-6 py-16 text-center">
          {ready && (
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 16, animation: 'heroBadgeIn 0.5s ease 0.3s both' }}>
              Port Harcourt, Rivers State
            </p>
          )}
          <h1 style={{ fontFamily: 'Arial', fontWeight: 700, fontSize: 'clamp(27px, 4.8vw, 54px)', lineHeight: 1.25, color: 'white' }}>
            <HeroWords text="Get in Touch with" startIdx={0} ready={ready} />
            <HeroWords text="First Independent Power Limited" startIdx={4} ready={ready} />
          </h1>
          {ready && (
            <div style={{ height: 1, background: 'rgba(255,255,255,0.22)', margin: '20px auto 0', width: 200, transformOrigin: 'center', animation: 'heroRuleGrow 0.6s ease 1.05s both' }} />
          )}
          {ready && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 28, marginTop: 16, animation: 'heroStatIn 0.6s ease 1.2s both' }}>
              <a href="tel:+23412620375" style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, fontFamily: 'Arial', textDecoration: 'none' }}>
                +234 (0) 1262 0375
              </a>
              <a href="mailto:info@fipl-ng.com" style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, fontFamily: 'Arial', textDecoration: 'none' }}>
                info@fipl-ng.com
              </a>
            </div>
          )}
        </div>
      )}
    />
  )
}

export function RegisterHero() {
  return (
    <CinematicHero
      image={IMAGES.register.hero}
      minHeight="min-h-[420px] md:min-h-[520px] lg:min-h-[640px]"
      contentAlign="center"
      overlay="linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.22) 45%, rgba(0,0,0,0.72) 100%)"
      renderContent={(ready) => (
        <div className="w-full max-w-[1280px] mx-auto px-6 py-16 text-center">
          {ready && (
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#D97300', marginBottom: 16, animation: 'heroBadgeIn 0.5s ease 0.3s both' }}>
              Vendor Programme
            </p>
          )}
          <h1 style={{ fontFamily: 'Arial', fontWeight: 700, fontSize: 'clamp(34px, 5.8vw, 68px)', lineHeight: 1.15, color: 'white' }}>
            <HeroWords text="Register" startIdx={0} ready={ready} />
            <HeroWords text="with Us" startIdx={1} ready={ready} />
          </h1>
          {ready && (
            <div style={{ height: 2, width: 160, background: 'linear-gradient(90deg, transparent, #D97300, #F47820, transparent)', margin: '16px auto 0', transformOrigin: 'center', animation: 'heroRuleGrow 0.7s ease 1s both' }} />
          )}
          {ready && (
            <p className="hero-tagline" style={{ animation: 'heroStatIn 0.6s ease 1.15s both' }}>
              Open for registration year-round · Dun &amp; Bradstreet certified
            </p>
          )}
        </div>
      )}
    />
  )
}
