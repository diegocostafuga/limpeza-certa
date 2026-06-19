import { BookOpen, Sparkles, FlaskConical } from 'lucide-react'

const steps = [
  {
    icon: BookOpen,
    number: '01',
    title: 'Escolha o protocolo',
    description:
      'Banheiro, cozinha, piso, pia — cada ambiente e objeto tem seu próprio guia testado.',
  },
  {
    icon: FlaskConical,
    number: '02',
    title: 'Calcule a diluição',
    description:
      'Use a calculadora para saber exatamente quanto de produto usar. Sem desperdício, sem erro.',
  },
  {
    icon: Sparkles,
    number: '03',
    title: 'Mão na massa',
    description:
      'Siga os passos na ordem certa e veja o resultado. Rápido, eficiente e do jeito certo.',
  },
]

export function HowItWorks() {
  return (
    <section className="bg-secondary/30 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-accent text-sm font-semibold tracking-widest uppercase">
            Como funciona
          </p>
          <h2 className="font-heading text-foreground mt-2 text-3xl font-bold md:text-4xl">
            Simples assim
          </h2>
          <p className="text-muted-foreground mx-auto mt-2 max-w-md">
            Sem complicação. Do protocolo ao resultado em três passos.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="bg-border absolute top-8 left-1/2 hidden h-px w-full md:block"
                />
              )}

              {/* Icon */}
              <div className="bg-primary shadow-primary/20 relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl shadow-md">
                <step.icon className="h-7 w-7 text-white" />
              </div>

              {/* Step number */}
              <span className="text-muted-foreground mt-4 text-xs font-bold tracking-widest">
                PASSO {step.number}
              </span>

              <h3 className="font-heading text-foreground mt-2 text-xl font-semibold">
                {step.title}
              </h3>
              <p className="text-muted-foreground mt-2 max-w-xs text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
