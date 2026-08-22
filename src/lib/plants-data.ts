import { IMAGES } from '@/lib/images'

export type PlantSlug = 'omoku' | 'trans-amadi' | 'afam' | 'eleme'

export type Plant = {
  slug: PlantSlug
  name: string
  images: readonly string[]
  desc: string
  supplier: string
  imageLeft: boolean
}

export const plants: Plant[] = [
  {
    slug: 'omoku',
    name: 'Omoku Plant',
    images: IMAGES.plants.omoku,
    desc: "Located in the heart of Rivers State's energy corridor, the Omoku Power Plant plays a strategic role in delivering reliable electricity to Nigeria's national grid. As one of the region's major power generation facilities, it strengthens grid stability while supporting industrial growth and economic development across the country. The Omoku Power Plant has an installed capacity of 150MW, comprising six 25MW GE Nuovo Pignone heavy-duty gas turbines. The plant generates electricity for the national grid through its on-site 132kV switching facility, which connects to the Rumuosi Transmission Substation. Strategically located adjacent to the NAOC Gas Processing Plant in Obrikom, the facility benefits from a reliable natural gas supply that supports efficient and continuous operations. Commissioned in 2006, the Omoku Power Plant remains one of FIPL's flagship assets, delivering dependable power through world-class operational standards.",
    supplier: 'Nigerian Agip Oil Company (NAOC)',
    imageLeft: true,
  },
  {
    slug: 'trans-amadi',
    name: 'Trans Amadi Plant',
    images: IMAGES.plants.transAmadi,
    desc: 'Situated within the industrial city of Port Harcourt, the Trans-Amadi Power Plant is a critical asset supporting commercial and industrial productivity in the Niger Delta. Its strategic location and flexible operating capability make it an important contributor to grid resilience and energy security. The plant occupies approximately four hectares and has a total installed capacity of 136MW. Developed in two phases, Phase I comprises three 12MW GE Solar Mars gas turbines, commissioned in 2002, while Phase II, commissioned in 2009, added four 25MW GE Nuovo Pignone Frame 5 gas turbines. The facility is equipped with 4 × 35MVA (11kV/33kV) transformers, 3 × 75MVA (33kV/132kV) transformers, dedicated control buildings, and two black-start generators that enable island-mode startup during system restoration. Natural gas is supplied by Heirs Energies Limited, ensuring efficient and reliable power generation for the national grid.',
    supplier: 'Heirs Energies Limited',
    imageLeft: false,
  },
  {
    slug: 'afam',
    name: 'Afam Plant',
    images: IMAGES.plants.afam,
    desc: "The Afam Power Plant is FIPL's largest generating station and a cornerstone of Nigeria's electricity infrastructure. Located within one of the country's most significant power generation hubs, the facility contributes substantially to grid reliability and supports the nation's growing energy needs through dependable, large-scale generation. With an installed capacity of 180MW, the plant is powered by a GE (formerly Alstom) GT13E2 gas turbine and exports an average of 3,500MWh of electricity daily to the national grid. Natural gas is supplied by Ohuru Trading Company and Accugas, providing a dependable fuel source for efficient operations. Situated in Oyigbo Local Government Area of Rivers State, the plant forms part of a strategic energy cluster that underpins electricity generation in Nigeria.",
    supplier: 'Ohuru Trading Company and Accugas',
    imageLeft: true,
  },
  {
    slug: 'eleme',
    name: 'Eleme Plant',
    images: IMAGES.plants.eleme,
    desc: "The Eleme Power Plant reflects FIPL's commitment to transforming energy infrastructure and unlocking new generation capacity. Positioned within one of Nigeria's foremost industrial corridors, the plant supports growing electricity demand while reinforcing power reliability for industries and communities. Originally a non-operational facility, the station was revitalized in 2001 when FIPL refurbished and commissioned a 20MW GE LM2500 gas turbine. As part of its long-term expansion strategy, FIPL replaced the legacy turbine with three 25MW GE Nuovo Pignone Frame 5 gas turbines, increasing the plant's installed capacity to 75MW. The project achieved hot commissioning in December 2023, representing another milestone in FIPL's continued investment in modern, efficient generation assets.",
    supplier: 'Ohuru Trading Company',
    imageLeft: false,
  },
]

export function getPlantBySlug(slug: string): Plant | undefined {
  return plants.find((plant) => plant.slug === slug)
}
