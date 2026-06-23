import { BookOpen, Users, Eye, Bookmark } from 'lucide-react'
import { db } from '@/lib/db'
import { protocols, users, savedDilutions } from '@/lib/schema'
import { eq, count } from 'drizzle-orm'

async function getStats() {
  const [protocolCount] = await db.select({ value: count() }).from(protocols)
  const [publicCount] = await db
    .select({ value: count() })
    .from(protocols)
    .where(eq(protocols.visibility, 'public'))
  const [userCount] = await db.select({ value: count() }).from(users)
  const [dilutionCount] = await db.select({ value: count() }).from(savedDilutions)

  return {
    protocols: protocolCount?.value ?? 0,
    publicProtocols: publicCount?.value ?? 0,
    users: userCount?.value ?? 0,
    savedDilutions: dilutionCount?.value ?? 0,
  }
}

export default async function AdminPage() {
  const stats = await getStats()

  const cards = [
    {
      label: 'Protocolos',
      value: stats.protocols,
      sub: `${stats.publicProtocols} públicos`,
      icon: BookOpen,
      color: 'bg-violet-50 text-violet-600',
    },
    {
      label: 'Usuários cadastrados',
      value: stats.users,
      sub: 'total no banco',
      icon: Users,
      color: 'bg-pink-50 text-pink-600',
    },
    {
      label: 'Diluições salvas',
      value: stats.savedDilutions,
      sub: 'pelos usuários',
      icon: Bookmark,
      color: 'bg-blue-50 text-blue-600',
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-foreground text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1 text-sm">Visão geral do LimpezaCerta</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ label, value, sub, icon: Icon, color }) => (
          <div key={label} className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">{label}</p>
                <p className="text-foreground mt-1 text-3xl font-bold">{value}</p>
                <p className="text-muted-foreground mt-1 text-xs">{sub}</p>
              </div>
              <div className={`rounded-xl p-2.5 ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
