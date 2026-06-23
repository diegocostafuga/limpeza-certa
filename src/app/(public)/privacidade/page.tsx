import type { Metadata } from 'next'
import { Container, Section } from '@/components/layout/container'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Como o LimpezaCerta coleta, usa e protege seus dados pessoais.',
}

export default function PrivacidadePage() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <h1 className="font-heading text-foreground mb-2 text-3xl font-bold">
          Política de Privacidade
        </h1>
        <p className="text-muted-foreground mb-10 text-sm">Última atualização: junho de 2026</p>

        <div className="prose prose-neutral max-w-none space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="font-heading text-foreground mb-3 text-xl font-semibold">
              1. Quem somos
            </h2>
            <p className="text-muted-foreground">
              O <strong>LimpezaCerta</strong> é um serviço operado por Andreia Coelho Fuga
              (@andreiacoelhofuga), que oferece protocolos de limpeza doméstica, dicas de produtos e
              calculadora de diluição. Para dúvidas sobre esta política, entre em contato pelo
              Instagram{' '}
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

          <section>
            <h2 className="font-heading text-foreground mb-3 text-xl font-semibold">
              2. Dados que coletamos
            </h2>
            <ul className="text-muted-foreground list-disc space-y-2 pl-5">
              <li>
                <strong>Dados de cadastro:</strong> nome e e-mail fornecidos ao criar sua conta via
                Clerk.
              </li>
              <li>
                <strong>Dados de uso:</strong> páginas visitadas, conteúdos acessados e interações
                com a calculadora.
              </li>
              <li>
                <strong>Dados de consentimento:</strong> suas preferências de cookies e a data em
                que foram registradas.
              </li>
              <li>
                <strong>Dados de afiliados:</strong> cliques em links de parceiros (sem
                identificação pessoal — usamos hash do IP).
              </li>
              <li>
                <strong>Cookies e armazenamento local:</strong> para manter sua sessão ativa e
                lembrar suas preferências.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-foreground mb-3 text-xl font-semibold">
              3. Como usamos seus dados
            </h2>
            <ul className="text-muted-foreground list-disc space-y-2 pl-5">
              <li>Personalizar conteúdo de acordo com seus interesses.</li>
              <li>Melhorar o site com base em dados de uso agregados.</li>
              <li>
                Enviar novidades e conteúdo exclusivo (apenas com consentimento de marketing).
              </li>
              <li>Rastrear cliques em links afiliados para análise interna.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-foreground mb-3 text-xl font-semibold">
              4. Base legal (LGPD)
            </h2>
            <p className="text-muted-foreground">
              Processamos seus dados com base no seu <strong>consentimento</strong> (Art. 7º, I da
              Lei nº 13.709/2018 — LGPD) e no <strong>legítimo interesse</strong> para melhoria dos
              serviços (Art. 7º, IX). Você pode retirar o consentimento a qualquer momento.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-foreground mb-3 text-xl font-semibold">
              5. Compartilhamento de dados
            </h2>
            <p className="text-muted-foreground">
              Não vendemos seus dados. Compartilhamos apenas com prestadores de serviço essenciais:
            </p>
            <ul className="text-muted-foreground mt-2 list-disc space-y-2 pl-5">
              <li>
                <strong>Clerk</strong> — autenticação e gestão de contas.
              </li>
              <li>
                <strong>Neon / Vercel</strong> — hospedagem e banco de dados.
              </li>
              <li>
                <strong>Google Analytics / Posthog</strong> — análise de uso (apenas com
                consentimento).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-foreground mb-3 text-xl font-semibold">
              6. Seus direitos (LGPD Art. 18)
            </h2>
            <ul className="text-muted-foreground list-disc space-y-2 pl-5">
              <li>Confirmação de que processamos seus dados.</li>
              <li>Acesso aos dados que temos sobre você.</li>
              <li>Correção de dados incompletos ou incorretos.</li>
              <li>Exclusão dos dados pessoais (mediante solicitação).</li>
              <li>Portabilidade dos dados.</li>
              <li>Revogação do consentimento a qualquer momento.</li>
            </ul>
            <p className="text-muted-foreground mt-3">
              Para exercer esses direitos, envie uma mensagem pelo Instagram{' '}
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

          <section>
            <h2 className="font-heading text-foreground mb-3 text-xl font-semibold">
              7. Retenção de dados
            </h2>
            <p className="text-muted-foreground">
              Mantemos seus dados enquanto sua conta estiver ativa. Após solicitação de exclusão,
              removemos os dados pessoais em até 30 dias, salvo obrigação legal.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-foreground mb-3 text-xl font-semibold">8. Cookies</h2>
            <p className="text-muted-foreground">
              Usamos cookies essenciais (necessários para o funcionamento do site) e opcionais
              (analytics e marketing). Você pode gerenciar suas preferências a qualquer momento pelo
              banner de cookies ou limpando o armazenamento local do navegador.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-foreground mb-3 text-xl font-semibold">
              9. Alterações nesta política
            </h2>
            <p className="text-muted-foreground">
              Podemos atualizar esta política periodicamente. A data de última atualização estará
              sempre no topo desta página. Alterações significativas serão comunicadas via e-mail ou
              aviso no site.
            </p>
          </section>
        </div>
      </Container>
    </Section>
  )
}
