export interface ProtocolStep {
  order: number
  title: string
  description: string
  tip?: string
}

export interface HowToSchema {
  '@context': string
  '@type': 'HowTo'
  name: string
  description?: string
  step: {
    '@type': 'HowToStep'
    position: number
    name: string
    text: string
  }[]
}

export function buildHowToSchema(
  title: string,
  steps: ProtocolStep[],
  description?: string
): HowToSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    ...(description ? { description } : {}),
    step: steps.map((s) => ({
      '@type': 'HowToStep',
      position: s.order,
      name: s.title,
      text: s.description,
    })),
  }
}
