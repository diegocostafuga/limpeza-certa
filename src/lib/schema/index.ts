import {
  pgTable,
  pgEnum,
  text,
  boolean,
  integer,
  timestamp,
  uuid,
  jsonb,
  index,
} from 'drizzle-orm/pg-core'

// ─── Enums ──────────────────────────────────────────────────────────────────

export const roleEnum = pgEnum('role', ['guest', 'user', 'admin'])
export const visibilityEnum = pgEnum('visibility', ['public', 'auth_required', 'draft'])
export const tipTypeEnum = pgEnum('tip_type', ['quick_tip', 'product_tip'])
export const mediaTypeEnum = pgEnum('media_type', ['image', 'video'])
export const deletionStatusEnum = pgEnum('deletion_status', ['pending', 'processing', 'completed'])

// ─── Users ───────────────────────────────────────────────────────────────────

export const users = pgTable('users', {
  id: text('id').primaryKey(), // Clerk user ID
  email: text('email').notNull().unique(),
  name: text('name'),
  role: roleEnum('role').notNull().default('user'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// ─── Protocols ───────────────────────────────────────────────────────────────

export const protocols = pgTable(
  'protocols',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: text('slug').notNull().unique(),
    title: text('title').notNull(),
    category: text('category').notNull(),
    objectType: text('object_type'),
    steps: jsonb('steps').notNull().default([]),
    visibility: visibilityEnum('visibility').notNull().default('draft'),
    coverImageUrl: text('cover_image_url'),
    howToSchema: jsonb('how_to_schema'),
    createdBy: text('created_by').references(() => users.id, { onDelete: 'set null' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (t) => [
    index('protocols_slug_idx').on(t.slug),
    index('protocols_visibility_category_idx').on(t.visibility, t.category),
  ]
)

// ─── Products (afiliados) ─────────────────────────────────────────────────────

export const products = pgTable(
  'products',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: text('slug').notNull().unique(),
    name: text('name').notNull(),
    description: text('description'),
    imageUrl: text('image_url'),
    affiliateUrl: text('affiliate_url').notNull(),
    partner: text('partner'),
    isActive: boolean('is_active').notNull().default(true),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (t) => [index('products_slug_idx').on(t.slug)]
)

// ─── Tips ────────────────────────────────────────────────────────────────────

export const tips = pgTable(
  'tips',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: text('slug').notNull().unique(),
    type: tipTypeEnum('type').notNull().default('quick_tip'),
    title: text('title').notNull(),
    body: text('body').notNull(),
    productId: uuid('product_id').references(() => products.id, { onDelete: 'set null' }),
    visibility: visibilityEnum('visibility').notNull().default('draft'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (t) => [
    index('tips_slug_idx').on(t.slug),
    index('tips_visibility_type_idx').on(t.visibility, t.type),
  ]
)

// ─── Stories ─────────────────────────────────────────────────────────────────

export const stories = pgTable('stories', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  mediaUrl: text('media_url').notNull(),
  mediaType: mediaTypeEnum('media_type').notNull().default('image'),
  linkUrl: text('link_url'),
  visibility: visibilityEnum('visibility').notNull().default('draft'),
  expiresAt: timestamp('expires_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// ─── Affiliate clicks ────────────────────────────────────────────────────────

export const affiliateClicks = pgTable(
  'affiliate_clicks',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    productId: uuid('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),
    sourcePath: text('source_path'),
    ipHash: text('ip_hash'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (t) => [
    index('affiliate_clicks_product_created_idx').on(t.productId, t.createdAt),
    index('affiliate_clicks_user_idx').on(t.userId),
  ]
)

// ─── Saved dilutions ─────────────────────────────────────────────────────────

export const savedDilutions = pgTable('saved_dilutions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  ratioProduct: integer('ratio_product').notNull(),
  ratioWater: integer('ratio_water').notNull(),
  bottleSizeMl: integer('bottle_size_ml').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// ─── LGPD: User consent ───────────────────────────────────────────────────────

export const userConsent = pgTable('user_consent', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),
  sessionId: text('session_id'),
  analytics: boolean('analytics').notNull().default(false),
  marketing: boolean('marketing').notNull().default(false),
  ipHash: text('ip_hash'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// ─── LGPD: Data deletion requests ────────────────────────────────────────────

export const dataDeletionRequests = pgTable('data_deletion_requests', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  status: deletionStatusEnum('status').notNull().default('pending'),
  requestedAt: timestamp('requested_at').notNull().defaultNow(),
  completedAt: timestamp('completed_at'),
})

// ─── Types inferred from schema ───────────────────────────────────────────────

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export type Protocol = typeof protocols.$inferSelect
export type NewProtocol = typeof protocols.$inferInsert

export type Tip = typeof tips.$inferSelect
export type NewTip = typeof tips.$inferInsert

export type Product = typeof products.$inferSelect
export type NewProduct = typeof products.$inferInsert

export type SavedDilution = typeof savedDilutions.$inferSelect
export type NewSavedDilution = typeof savedDilutions.$inferInsert

export type Story = typeof stories.$inferSelect
export type NewStory = typeof stories.$inferInsert
