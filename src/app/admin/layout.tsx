import Link from 'next/link'
import { redirect } from 'next/navigation'
import { LayoutDashboard, BookOpen, Lightbulb, Image, ShoppingBag, ArrowLeft } from 'lucide-react'
import { requireAdmin } from '@/lib/require-admin'

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/protocolos', label: 'Protocolos', icon: BookOpen },
  { href: '/admin/dicas', label: 'Dicas', icon: Lightbulb },
  { href: '/admin/stories', label: 'Stories', icon: Image },
  { href: '/admin/afiliados', label: 'Afiliados', icon: ShoppingBag },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin()

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-gray-200 bg-white">
        {/* Brand */}
        <div className="flex h-16 items-center gap-2 border-b border-gray-200 px-5">
          <div className="bg-primary flex h-7 w-7 items-center justify-center rounded-lg">
            <span className="text-xs font-bold text-white">LC</span>
          </div>
          <div>
            <p className="text-foreground text-sm leading-none font-semibold">LimpezaCerta</p>
            <p className="text-muted-foreground mt-0.5 text-xs">Painel admin</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {NAV.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-muted-foreground hover:bg-primary/8 hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 p-3">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground flex items-center gap-2 rounded-lg px-3 py-2 text-xs transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Voltar ao site
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-60 flex-1 p-8">{children}</main>
    </div>
  )
}
