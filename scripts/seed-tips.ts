import { loadEnvConfig } from '@next/env'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { eq } from 'drizzle-orm'
import * as schema from '../src/lib/schema'

loadEnvConfig(process.cwd())

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql, { schema })

const TIPS = [
  {
    slug: 'vinagre-limpeza-cheiro',
    type: 'quick_tip' as const,
    title: 'Vinagre não deixa cheiro se você usar assim',
    body: `O vinagre é um dos melhores desinfetantes naturais, mas o cheiro forte afasta muita gente. O segredo está na diluição certa: misture 1 parte de vinagre para 3 partes de água e adicione algumas gotas de óleo essencial de lavanda ou eucalipto.

Durante o uso, abra as janelas para ventilar o ambiente. Em poucos minutos após a aplicação, o cheiro de vinagre desaparece completamente — e o que fica é só a superfície limpa e desinfetada.

Use em bancadas, pisos e azulejos. Evite em mármores e granitos, pois o ácido pode danificar a pedra.`,
    visibility: 'public' as const,
  },
  {
    slug: 'bicarbonato-vaso-sanitario',
    type: 'quick_tip' as const,
    title: 'Bicarbonato + vinagre no vaso: mito ou verdade?',
    body: `A combinação de bicarbonato de sódio e vinagre faz espuma e parece poderosa — mas a reação química entre eles se neutraliza rapidamente, deixando apenas água e acetato de sódio, sem ação de limpeza real.

O que realmente funciona para o vaso sanitário:

1. Jogue 1 xícara de bicarbonato diretamente no vaso e deixe agir por 10 minutos
2. Esfregue com a escova
3. Depois, com o vaso limpo, pode usar vinagre puro para desinfetar e brilhar

Use os dois separadamente, nunca juntos ao mesmo tempo. Assim você aproveita o poder de cada um sem desperdiçar nenhum.`,
    visibility: 'public' as const,
  },
  {
    slug: 'produto-certo-para-piso',
    type: 'quick_tip' as const,
    title: 'Como escolher o produto certo para cada tipo de piso',
    body: `Cada tipo de piso tem uma necessidade diferente — usar o produto errado pode riscar, manchar ou até danificar permanentemente a superfície.

**Porcelanato e cerâmica:** neutros ou levemente ácidos. Evite produtos alcalinos fortes que opacificam o rejunte.

**Piso laminado:** nunca use água em excesso. Prefira produtos específicos para laminado e pano torcido bem seco. Umidade é o maior inimigo desse tipo de piso.

**Mármore e granito:** jamais use vinagre, limão ou qualquer ácido. O pH ácido corrói a pedra com o tempo. Use apenas produtos neutros ou específicos para pedras naturais.

**Madeira maciça:** cera ou produtos à base de óleo vegetal. Nunca molhe a madeira — passe apenas um pano levemente úmido e seque imediatamente.

**Vinílico e emborrachado:** detergente neutro diluído. Evite solventes que podem amolecer o material.`,
    visibility: 'auth_required' as const,
  },
  {
    slug: 'frequencia-limpeza-por-ambiente',
    type: 'quick_tip' as const,
    title: 'Com que frequência limpar cada ambiente?',
    body: `A manutenção regular evita o acúmulo de sujeira e reduz o esforço de limpeza geral. Use este guia como ponto de partida e adapte conforme o ritmo da sua casa.

**Diariamente:**
- Louças e utensílios usados
- Bancada da cozinha após cozinhar
- Espelho e pia do banheiro (rápido)

**Semanalmente:**
- Banheiro completo (vaso, chuveiro, piso)
- Aspirar e passar pano nos pisos
- Limpeza da geladeira por fora
- Troca de lençóis e fronhas

**Quinzenalmente:**
- Limpar dentro do micro-ondas
- Lavar tapetes menores
- Limpar janelas e vidros

**Mensalmente:**
- Limpar dentro da geladeira
- Lavar cortinas leves
- Organizar armários e gavetas
- Limpar exaustor e filtros

**A cada 3 meses:**
- Lavar cobertores e edredons
- Limpar atrás dos eletrodomésticos
- Limpeza profunda de armários`,
    visibility: 'auth_required' as const,
  },
]

async function seedTips() {
  console.log('🌱 Seeding tips...')

  for (const tip of TIPS) {
    const existing = await db.query.tips.findFirst({
      where: eq(schema.tips.slug, tip.slug),
    })

    if (existing) {
      console.log(`  ⏭  Skipping "${tip.title}" (already exists)`)
      continue
    }

    await db.insert(schema.tips).values(tip)
    console.log(`  ✅ Created "${tip.title}"`)
  }

  console.log('✨ Tips seeded!')
  process.exit(0)
}

seedTips().catch((e) => {
  console.error(e)
  process.exit(1)
})
