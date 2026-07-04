import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PlantHero } from '@/components/PageHeroes'
import { PlantSlideshow } from '@/components/PlantSlideshow'
import { Reveal } from '@/components/Reveal'
import { plants, getPlantBySlug } from '@/lib/plants-data'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return plants.map((plant) => ({ slug: plant.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const plant = getPlantBySlug(params.slug)
  if (!plant) return { title: 'Power Plant' }
  return {
    title: `${plant.name} | Power Plants`,
    description: plant.desc,
  }
}

export default function PlantDetailPage({ params }: Props) {
  const plant = getPlantBySlug(params.slug)
  if (!plant) notFound()

  const index = plants.findIndex((p) => p.slug === plant.slug)
  const prevPlant = plants[(index - 1 + plants.length) % plants.length]
  const nextPlant = plants[(index + 1) % plants.length]

  return (
    <div className="page-bolt-bg">
      <PlantHero name={plant.name} image={plant.images[0]} supplier={plant.supplier} />

      <section className="py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal variant="fade">
            <Link
              href="/power-plants"
              className="inline-flex items-center gap-1.5 text-sm text-[#DB1B0C] hover:text-[#b81508] transition-colors mb-8"
            >
              ← Back to All Plants
            </Link>
          </Reveal>

          <Reveal variant={plant.imageLeft ? 'left' : 'right'} duration={0.8}>
            <div
              className={`flex flex-col ${plant.imageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-0 bg-[var(--fipl-bg)] shadow-sm border border-[var(--fipl-border)] fipl-card-hover`}
            >
              <div className="lg:w-[480px] shrink-0 overflow-hidden relative h-[260px] md:h-[320px] lg:self-stretch">
                <PlantSlideshow images={plant.images} imageLeft={plant.imageLeft} />
              </div>
              <div className="flex-1 p-7 md:p-8 lg:p-10 flex flex-col justify-center">
                <h2 className="text-xl md:text-2xl font-bold text-[#D97300] mb-4">{plant.name}</h2>
                <p className="text-[var(--fipl-body)] leading-relaxed text-sm md:text-base mb-4">
                  {plant.desc}
                </p>
                <p className="text-sm text-[var(--fipl-body)]">
                  <span className="font-semibold text-[var(--fipl-heading)]">
                    Primary Gas Supplier:
                  </span>{' '}
                  {plant.supplier}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-[var(--fipl-border)]">
            <Link
              href={`/power-plants/${prevPlant.slug}`}
              className="inline-flex items-center gap-2 text-sm text-[var(--fipl-body)] hover:text-[#DB1B0C] transition-colors"
            >
              ← {prevPlant.name}
            </Link>
            <Link
              href={`/power-plants/${nextPlant.slug}`}
              className="inline-flex items-center gap-2 text-sm text-[var(--fipl-body)] hover:text-[#DB1B0C] transition-colors"
            >
              {nextPlant.name} →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
