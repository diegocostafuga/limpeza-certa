import { loadEnvConfig } from '@next/env'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { protocols } from '../src/lib/schema'
import type { ProtocolStep } from '../src/lib/types'

loadEnvConfig(process.cwd())

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

const seedProtocols: {
  slug: string
  title: string
  category: string
  objectType?: string
  visibility: 'public' | 'auth_required'
  steps: ProtocolStep[]
}[] = [
  {
    slug: 'limpeza-banheiro-completo',
    title: 'Limpeza completa do banheiro',
    category: 'banheiro',
    visibility: 'public',
    steps: [
      {
        order: 1,
        title: 'Ventile o ambiente',
        description:
          'Abra janelas e ligue o exaustor antes de começar. A ventilação evita a inalação de produtos químicos e ajuda a secar as superfícies mais rápido.',
        tip: 'Nunca misture produtos com amônia e produtos com cloro no mesmo ambiente fechado.',
      },
      {
        order: 2,
        title: 'Aplique o produto no vaso sanitário',
        description:
          'Aplique o detergente sanitário na borda interna do vaso, deixe agir por pelo menos 5 minutos enquanto limpa o resto do banheiro.',
      },
      {
        order: 3,
        title: 'Limpe o espelho',
        description:
          'Borrife álcool isopropílico 70% diretamente no espelho e passe um pano de microfibra em movimentos circulares. Evite papel toalha — ele deixa fiapos.',
        tip: 'Limpe o espelho antes de limpar a pia para evitar respingos.',
      },
      {
        order: 4,
        title: 'Limpe a pia e torneira',
        description:
          'Aplique multiuso na pia, esfregue com esponja macia e enxágue bem. Para torneiras, use um pincel velho para alcançar as frestas. Seque com pano seco para evitar manchas de calcário.',
      },
      {
        order: 5,
        title: 'Esfregue e enxágue o vaso',
        description:
          'Com a escova sanitária, esfregue a borda, as laterais e o fundo. Dê a descarga e feche a tampa.',
        tip: 'Guarde a escova com um pouquinho de água sanitária diluída no suporte para mantê-la higienizada.',
      },
      {
        order: 6,
        title: 'Limpe o box e o chuveiro',
        description:
          'Borrife removedor de calcário no box, aguarde 2 minutos e esfregue com esponja. Para o chuveiro, mergulhe o crivo em solução de vinagre branco por 10 minutos para remover a cal.',
      },
      {
        order: 7,
        title: 'Limpe o piso',
        description:
          'Por último, passe o rodo para juntar a água e os resíduos para o ralo. Aplique desinfetante diluído e esfregue o piso. Seque com rodo para acelerar a secagem.',
      },
    ],
  },
  {
    slug: 'limpeza-pia-cozinha',
    title: 'Limpeza da pia da cozinha',
    category: 'cozinha',
    objectType: 'pia',
    visibility: 'public',
    steps: [
      {
        order: 1,
        title: 'Retire louças e utensílios',
        description:
          'Remova tudo de dentro e ao redor da pia antes de começar para facilitar a limpeza e não molhar objetos desnecessariamente.',
      },
      {
        order: 2,
        title: 'Ensaboe toda a pia',
        description:
          'Aplique detergente neutro com uma esponja macia em toda a superfície, incluindo as laterais e a torneira.',
        tip: 'Para pias de inox, sempre esfregue no sentido das marcas (escovado) para não riscar.',
      },
      {
        order: 3,
        title: 'Trate o ralo',
        description:
          'Jogue 2 colheres de bicarbonato de sódio no ralo, depois adicione meio copo de vinagre branco. Aguarde a reação parar (± 5 min) e enxágue com água quente.',
      },
      {
        order: 4,
        title: 'Enxágue e seque',
        description:
          'Enxágue toda a pia com água corrente e seque com um pano limpo e seco. Para inox, secar evita manchas de água.',
      },
      {
        order: 5,
        title: 'Higienize a esponja',
        description:
          'Molhe a esponja usada, esprema bem e leve ao micro-ondas por 1 minuto. Deixe esfriar antes de retirar.',
        tip: 'Troque a esponja da cozinha a cada 2 semanas, mesmo higienizando regularmente.',
      },
    ],
  },
  {
    slug: 'limpeza-piso-laminado',
    title: 'Limpeza de piso laminado sem danificar',
    category: 'sala',
    objectType: 'piso laminado',
    visibility: 'auth_required',
    steps: [
      {
        order: 1,
        title: 'Aspire ou varra antes de passar o pano',
        description:
          'Retire toda a poeira e partículas soltas com aspirador ou vassoura de microfibra. Passar pano molhado sobre sujeira sólida pode riscar o laminado.',
      },
      {
        order: 2,
        title: 'Prepare a solução de limpeza',
        description:
          'Misture 1 medida de limpador específico para laminado para 10 medidas de água fria. Nunca use água quente — ela causa empenamento.',
        tip: 'Evite produtos com amônia, cloro ou cera. Eles danificam o revestimento protetivo.',
      },
      {
        order: 3,
        title: 'Use o pano bem torcido',
        description:
          'O pano deve estar levemente úmido, quase seco. Excesso de água é o maior inimigo do laminado — pode causar inchamento e descolamento.',
      },
      {
        order: 4,
        title: 'Passe no sentido das tábuas',
        description:
          'Passe o pano sempre no sentido longitudinal das ripas do laminado, nunca na transversal.',
      },
      {
        order: 5,
        title: 'Seque imediatamente',
        description:
          'Se restar qualquer umidade visível, seque com pano seco imediatamente. Não deixe o piso úmido por mais de 5 minutos.',
      },
    ],
  },
  {
    slug: 'desinfeccao-cozinha-semanal',
    title: 'Desinfecção semanal da cozinha',
    category: 'cozinha',
    visibility: 'auth_required',
    steps: [
      {
        order: 1,
        title: 'Limpe os eletrodomésticos por fora',
        description:
          'Passe pano úmido com multiuso em geladeira, micro-ondas, liquidificador e outros aparelhos. Atenção às borrachas de vedação da geladeira — acumulam mofo.',
      },
      {
        order: 2,
        title: 'Higienize o interior do micro-ondas',
        description:
          'Coloque uma tigela com água e rodelas de limão no micro-ondas, ligue por 3 minutos. O vapor soltará a gordura. Limpe com pano úmido enquanto ainda morno.',
      },
      {
        order: 3,
        title: 'Desengordure o fogão',
        description:
          'Retire as bocas e grades. Deixe-as de molho em água quente com detergente por 15 minutos. Passe multiuso desengordurante na superfície do fogão e esfregue.',
        tip: 'Para grades muito engorduradas, use bicarbonato + detergente e deixe agir por 30 minutos.',
      },
      {
        order: 4,
        title: 'Limpe armários por fora',
        description:
          'Passe pano úmido com álcool 70% nas maçanetas e bordas dos armários — são as superfícies mais tocadas da cozinha.',
      },
      {
        order: 5,
        title: 'Desinfete bancadas',
        description:
          'Após limpar a gordura visível, aplique álcool 70% em toda a bancada e deixe agir 30 segundos antes de secar. Isso elimina 99% das bactérias.',
      },
      {
        order: 6,
        title: 'Passe o pano no piso',
        description:
          'Varra primeiro para recolher migalhas, depois passe pano com desinfetante diluído (1:40). Dê atenção especial à frente do fogão e da geladeira.',
      },
    ],
  },
]

async function seed() {
  console.log('🌱 Iniciando seed de protocolos...')

  for (const data of seedProtocols) {
    const { steps, ...rest } = data
    await db
      .insert(protocols)
      .values({
        ...rest,
        steps: steps as unknown as (typeof protocols.$inferInsert)['steps'],
      })
      .onConflictDoNothing()

    console.log(`  ✓ ${data.title}`)
  }

  console.log(`\n✅ Seed concluído — ${seedProtocols.length} protocolos inseridos.`)
  process.exit(0)
}

seed().catch((e) => {
  console.error(e)
  process.exit(1)
})
