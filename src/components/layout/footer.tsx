import Link from 'next/link'
import { Sparkles } from 'lucide-react'

const footerLinks = {
  conteudo: [
    { href: '/protocolos', label: 'Protocolos' },
    { href: '/dicas', label: 'Dicas' },
    { href: '/stories', label: 'Stories' },
    { href: '/calculadora', label: 'Calculadora' },
  ],
  institucional: [
    { href: '/sobre', label: 'Sobre' },
    { href: '/privacidade', label: 'Política de Privacidade' },
    { href: '/termos', label: 'Termos de Uso' },
    { href: '/contato', label: 'Contato' },
  ],
}

export function Footer() {
  return (
    <footer className="border-border bg-secondary/40 mt-auto border-t">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="text-primary h-5 w-5" />
              <span className="font-heading text-primary text-lg font-bold">LimpezaCerta</span>
            </Link>
            <p className="text-muted-foreground mt-3 max-w-xs text-sm leading-relaxed">
              Testados, aprovados e recomendados! Protocolos de limpeza passo a passo para cada
              cantinho da sua casa.
            </p>
            <a
              href="https://instagram.com/andreiacoelhofuga"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent mt-4 inline-flex items-center gap-2 text-sm font-medium transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              @andreiacoelhofuga
            </a>
          </div>

          {/* Conteúdo */}
          <div>
            <h3 className="text-foreground text-sm font-semibold">Conteúdo</h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.conteudo.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h3 className="text-foreground text-sm font-semibold">Institucional</h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.institucional.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-border mt-10 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} LimpezaCerta. Todos os direitos reservados.
          </p>
          <p className="text-muted-foreground text-xs">
            Feito com carinho por{' '}
            <a
              href="https://instagram.com/andreiacoelhofuga"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary font-medium transition-colors"
            >
              Andreia Coelho Fuga
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
