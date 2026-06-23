import type { Metadata } from 'next'
import { Container, Section } from '@/components/layout/container'

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description: 'Termos e condições de uso do LimpezaCerta.',
}

export default function TermosPage() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <h1 className="font-heading text-foreground mb-2 text-3xl font-bold">Termos de Uso</h1>
        <p className="text-muted-foreground mb-10 text-sm">Última atualização: junho de 2026</p>

        <div className="prose prose-neutral max-w-none space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="font-heading text-foreground mb-3 text-xl font-semibold">
              1. Aceitação dos termos
            </h2>
            <p className="text-muted-foreground">
              Ao acessar ou usar o <strong>LimpezaCerta</strong>, você concorda com estes Termos de
              Uso. Se não concordar, não utilize o serviço.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-foreground mb-3 text-xl font-semibold">
              2. Sobre o serviço
            </h2>
            <p className="text-muted-foreground">
              O LimpezaCerta oferece protocolos de limpeza doméstica, dicas de produtos e
              calculadora de diluição. O conteúdo é produzido e curado por Andreia Coelho Fuga com
              base em sua experiência prática, mas{' '}
              <strong>não substitui orientação profissional</strong> em casos de substâncias
              perigosas ou situações de risco.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-foreground mb-3 text-xl font-semibold">
              3. Cadastro e conta
            </h2>
            <ul className="text-muted-foreground list-disc space-y-2 pl-5">
              <li>Você deve ter pelo menos 13 anos para criar uma conta.</li>
              <li>Você é responsável pela segurança da sua conta e senha.</li>
              <li>
                Informações falsas no cadastro podem resultar no encerramento da conta sem aviso
                prévio.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-foreground mb-3 text-xl font-semibold">
              4. Uso permitido
            </h2>
            <p className="text-muted-foreground">Você pode usar o LimpezaCerta para:</p>
            <ul className="text-muted-foreground mt-2 list-disc space-y-2 pl-5">
              <li>Consultar protocolos e dicas de limpeza para uso pessoal.</li>
              <li>Usar a calculadora de diluição.</li>
              <li>Salvar suas diluições favoritas (usuários cadastrados).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-foreground mb-3 text-xl font-semibold">
              5. Uso proibido
            </h2>
            <ul className="text-muted-foreground list-disc space-y-2 pl-5">
              <li>Reproduzir ou redistribuir o conteúdo sem autorização.</li>
              <li>Usar o serviço para fins comerciais sem permissão expressa.</li>
              <li>Tentar comprometer a segurança ou disponibilidade do site.</li>
              <li>Criar contas automatizadas ou usar bots.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-foreground mb-3 text-xl font-semibold">
              6. Links de afiliados
            </h2>
            <p className="text-muted-foreground">
              Alguns links no site são links de afiliados — ao comprar por eles, o LimpezaCerta pode
              receber uma comissão sem custo adicional para você. Isso nos ajuda a manter o serviço
              gratuito. Todos os produtos recomendados são indicados com base na experiência real da
              criadora.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-foreground mb-3 text-xl font-semibold">
              7. Propriedade intelectual
            </h2>
            <p className="text-muted-foreground">
              Todo o conteúdo do LimpezaCerta — textos, imagens, protocolos e dicas — é de
              propriedade de Andreia Coelho Fuga, protegido por direitos autorais. A reprodução
              parcial ou total sem autorização é proibida.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-foreground mb-3 text-xl font-semibold">
              8. Limitação de responsabilidade
            </h2>
            <p className="text-muted-foreground">
              O LimpezaCerta não se responsabiliza por danos causados pelo uso incorreto de produtos
              de limpeza ou pela aplicação inadequada dos protocolos. Leia sempre o rótulo dos
              produtos e siga as instruções do fabricante.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-foreground mb-3 text-xl font-semibold">
              9. Encerramento de conta
            </h2>
            <p className="text-muted-foreground">
              Você pode encerrar sua conta a qualquer momento. Reservamo-nos o direito de suspender
              ou encerrar contas que violem estes termos. Para solicitações de exclusão de dados,
              veja nossa{' '}
              <a href="/privacidade" className="text-primary hover:underline">
                Política de Privacidade
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-heading text-foreground mb-3 text-xl font-semibold">
              10. Lei aplicável
            </h2>
            <p className="text-muted-foreground">
              Estes termos são regidos pelas leis brasileiras. Qualquer disputa será resolvida no
              foro da comarca de domicílio do usuário, conforme o Código de Defesa do Consumidor.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-foreground mb-3 text-xl font-semibold">11. Contato</h2>
            <p className="text-muted-foreground">
              Dúvidas sobre estes termos? Fale conosco pelo Instagram{' '}
              <a
                href="https://instagram.com/andreiacoelhofuga"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                @andreiacoelhofuga
              </a>
              .
            </p>
          </section>
        </div>
      </Container>
    </Section>
  )
}
