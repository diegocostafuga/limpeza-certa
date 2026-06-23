'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Sparkles, LayoutDashboard } from 'lucide-react'
import { useAuth, UserButton } from '@clerk/nextjs'
import { buttonVariants } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const navLinks = [
  { href: '/protocolos', label: 'Protocolos' },
  { href: '/dicas', label: 'Dicas' },
  { href: '/stories', label: 'Stories' },
  { href: '/calculadora', label: 'Calculadora' },
]

export function Navbar({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { isSignedIn } = useAuth()

  return (
    <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="text-primary h-5 w-5" />
          <span className="font-heading text-primary text-lg font-bold">LimpezaCerta</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'hover:bg-secondary hover:text-primary rounded-md px-3 py-2 text-sm font-medium transition-colors',
                pathname.startsWith(link.href)
                  ? 'bg-secondary text-primary'
                  : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop auth */}
        <div className="hidden items-center gap-2 md:flex">
          {isSignedIn ? (
            <div className="flex items-center gap-2">
              {isAdmin && (
                <Link
                  href="/admin"
                  className={cn(
                    buttonVariants({ variant: 'ghost', size: 'sm' }),
                    'text-muted-foreground gap-1.5'
                  )}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Admin
                </Link>
              )}
              <UserButton />
            </div>
          ) : (
            <>
              <Link href="/entrar" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}>
                Entrar
              </Link>
              <Link href="/cadastro" className={cn(buttonVariants({ size: 'sm' }))}>
                Cadastre-se grátis
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'md:hidden')}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Abrir menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <div className="flex items-center gap-2 pt-2 pb-6">
              <Sparkles className="text-primary h-5 w-5" />
              <span className="font-heading text-primary text-lg font-bold">LimpezaCerta</span>
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'hover:bg-secondary hover:text-primary rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                    pathname.startsWith(link.href) ? 'bg-secondary text-primary' : 'text-foreground'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-6 flex flex-col gap-2">
              {isSignedIn ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 px-1">
                    <UserButton />
                    <span className="text-foreground text-sm font-medium">Minha conta</span>
                  </div>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setOpen(false)}
                      className={cn(buttonVariants({ variant: 'outline' }), 'w-full gap-2')}
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Painel admin
                    </Link>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    href="/entrar"
                    onClick={() => setOpen(false)}
                    className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}
                  >
                    Entrar
                  </Link>
                  <Link
                    href="/cadastro"
                    onClick={() => setOpen(false)}
                    className={cn(buttonVariants(), 'w-full')}
                  >
                    Cadastre-se grátis
                  </Link>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
