import { loadEnvConfig } from '@next/env'
import type { Config } from 'drizzle-kit'

loadEnvConfig(process.cwd())

export default {
  schema: './src/lib/schema/index.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config
