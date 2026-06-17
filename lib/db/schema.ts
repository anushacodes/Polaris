import { relations, sql } from "drizzle-orm";
import {
  boolean,
  check,
  customType,
  date,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  real,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

const geographyPoint = customType<{ data: string; driverData: string }>({
  dataType() {
    return "geography(Point,4326)";
  },
});

export const placeCategories = [
  "food",
  "nightlife",
  "wellness",
  "practical",
] as const;

// ─── Cities ───────────────────────────────────────────────────────────────────

export const cities = pgTable(
  "cities",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    country: text("country").notNull(),
    currency: text("currency").notNull().default("USD"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    slugIdx: uniqueIndex("cities_slug_idx").on(table.slug),
  }),
);

// ─── Users ────────────────────────────────────────────────────────────────────

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").notNull(),
    name: text("name").notNull(),
    image: text("image"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    emailIdx: uniqueIndex("users_email_idx").on(table.email),
  }),
);

// ─── Neighborhoods ────────────────────────────────────────────────────────────

export const neighborhoods = pgTable(
  "neighborhoods",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    cityId: uuid("city_id")
      .notNull()
      .references(() => cities.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    summary: text("summary").notNull(),
    vibeTags: text("vibe_tags").array().notNull(),
    bestForTags: text("best_for_tags").array().notNull(),
    rentMin: integer("rent_min").notNull(),
    rentMax: integer("rent_max").notNull(),
    walkabilityScore: integer("walkability_score").notNull(),
    nightlifeScore: integer("nightlife_score").notNull(),
    quietScore: integer("quiet_score").notNull(),
    transitScore: integer("transit_score").notNull(),
    lat: real("lat").notNull(),
    lng: real("lng").notNull(),
    coordinates: geographyPoint("coordinates").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    citySlugIdx: uniqueIndex("neighborhoods_city_slug_idx").on(
      table.cityId,
      table.slug,
    ),
    rentCheck: check(
      "neighborhoods_rent_check",
      sql`${table.rentMin} <= ${table.rentMax}`,
    ),
  }),
);

// ─── Neighborhood Features (matching vector) ──────────────────────────────────

export const neighborhoodFeatures = pgTable("neighborhood_features", {
  id: uuid("id").defaultRandom().primaryKey(),
  neighborhoodId: uuid("neighborhood_id")
    .notNull()
    .unique()
    .references(() => neighborhoods.id, { onDelete: "cascade" }),
  walkability:        real("walkability").notNull().default(0.5),
  transit:            real("transit").notNull().default(0.5),
  nightlife:          real("nightlife").notNull().default(0.5),
  safety:             real("safety").notNull().default(0.5),
  cafes:              real("cafes").notNull().default(0.5),
  parks:              real("parks").notNull().default(0.5),
  youngProfessionals: real("young_professionals").notNull().default(0.5),
  affordability:      real("affordability").notNull().default(0.5),
  diversity:          real("diversity").notNull().default(0.5),
  dataSource: text("data_source").notNull().default("seeded"),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ─── Places ───────────────────────────────────────────────────────────────────

export const places = pgTable(
  "places",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    neighborhoodId: uuid("neighborhood_id")
      .notNull()
      .references(() => neighborhoods.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    category: text("category", { enum: placeCategories }).notNull(),
    summary: text("summary").notNull(),
    priceRange: text("price_range").notNull(),
    vibeTags: text("vibe_tags").array().notNull(),
    bestForTags: text("best_for_tags").array().notNull(),
    lat: real("lat").notNull(),
    lng: real("lng").notNull(),
    coordinates: geographyPoint("coordinates").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    neighborhoodSlugIdx: uniqueIndex("places_neighborhood_slug_idx").on(
      table.neighborhoodId,
      table.slug,
    ),
  }),
);

// ─── Rentals ──────────────────────────────────────────────────────────────────

export const rentals = pgTable("rentals", {
  id: uuid("id").defaultRandom().primaryKey(),
  neighborhoodId: uuid("neighborhood_id")
    .notNull()
    .references(() => neighborhoods.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  price: integer("price").notNull(),
  currency: text("currency").notNull(),
  bedrooms: integer("bedrooms").notNull(),
  bathrooms: real("bathrooms").notNull(),
  sqft: integer("sqft"),
  lat: real("lat").notNull(),
  lng: real("lng").notNull(),
  coordinates: geographyPoint("coordinates").notNull(),
  source: text("source").notNull(),
  externalUrl: text("external_url").notNull(),
  availableFrom: date("available_from").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ─── User Profiles ────────────────────────────────────────────────────────────

export const userProfiles = pgTable("user_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  cityId: uuid("city_id")
    .notNull()
    .references(() => cities.id, { onDelete: "restrict" }),
  budgetMin: integer("budget_min").notNull(),
  budgetMax: integer("budget_max").notNull(),

  // Onboarding source fields
  sourceNeighborhoodName: text("source_neighborhood_name"),
  sourceCityName:         text("source_city_name"),
  sourceLikes:            text("source_likes"),
  sourceDislikes:         text("source_dislikes"),

  // Preference weight vector (0.0–1.0, extracted by Groq)
  walkabilityWeight:        real("walkability_weight"),
  transitWeight:            real("transit_weight"),
  nightlifeWeight:          real("nightlife_weight"),
  safetyWeight:             real("safety_weight"),
  cafesWeight:              real("cafes_weight"),
  parksWeight:              real("parks_weight"),
  youngProfessionalsWeight: real("young_professionals_weight"),
  affordabilityWeight:      real("affordability_weight"),
  diversityWeight:          real("diversity_weight"),

  // Legacy fields kept for backward compat
  vibeTags:   text("vibe_tags").array().notNull().default([]),
  interests:  text("interests").array().notNull().default([]),
  movingWith: text("moving_with").notNull().default("solo"),
  workType:   text("work_type").notNull().default("office"),
  priorities: text("priorities").array().notNull().default([]),

  commuteTargetNeighborhoodId: uuid("commute_target_neighborhood_id").references(
    () => neighborhoods.id,
    { onDelete: "set null" },
  ),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ─── Neighborhood Matches ─────────────────────────────────────────────────────

export const neighborhoodMatches = pgTable(
  "neighborhood_matches",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    profileId: uuid("profile_id")
      .notNull()
      .references(() => userProfiles.id, { onDelete: "cascade" }),
    neighborhoodId: uuid("neighborhood_id")
      .notNull()
      .references(() => neighborhoods.id, { onDelete: "cascade" }),
    score: integer("score").notNull(),
    reasons: text("reasons").array().notNull(),
    scoreBreakdown: jsonb("score_breakdown").$type<Record<string, number>>(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    profileNeighborhoodIdx: uniqueIndex(
      "neighborhood_matches_profile_neighborhood_idx",
    ).on(table.profileId, table.neighborhoodId),
    scoreCheck: check(
      "neighborhood_matches_score_check",
      sql`${table.score} >= 0 and ${table.score} <= 100`,
    ),
  }),
);

// ─── Reviews ──────────────────────────────────────────────────────────────────

export const reviews = pgTable(
  "reviews",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    placeId: uuid("place_id")
      .notNull()
      .references(() => places.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    rating: integer("rating").notNull(),
    body: text("body").notNull(),
    reviewerVibeTags: text("reviewer_vibe_tags").array().notNull(),
    reviewerInterests: text("reviewer_interests").array().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    ratingCheck: check(
      "reviews_rating_check",
      sql`${table.rating} >= 1 and ${table.rating} <= 5`,
    ),
  }),
);

// ─── User Saves ───────────────────────────────────────────────────────────────

export const userSaves = pgTable(
  "user_saves",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    placeId: uuid("place_id")
      .notNull()
      .references(() => places.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.placeId] }),
  }),
);

// ─── Relations ────────────────────────────────────────────────────────────────

export const citiesRelations = relations(cities, ({ many }) => ({
  neighborhoods: many(neighborhoods),
  userProfiles: many(userProfiles),
}));

export const usersRelations = relations(users, ({ many }) => ({
  profiles: many(userProfiles),
  matches: many(neighborhoodMatches),
  reviews: many(reviews),
  saves: many(userSaves),
}));

export const neighborhoodsRelations = relations(neighborhoods, ({ one, many }) => ({
  city: one(cities, {
    fields: [neighborhoods.cityId],
    references: [cities.id],
  }),
  features: one(neighborhoodFeatures, {
    fields: [neighborhoods.id],
    references: [neighborhoodFeatures.neighborhoodId],
  }),
  places: many(places),
  rentals: many(rentals),
  profilesUsingAsCommuteTarget: many(userProfiles),
  matches: many(neighborhoodMatches),
}));

export const neighborhoodFeaturesRelations = relations(
  neighborhoodFeatures,
  ({ one }) => ({
    neighborhood: one(neighborhoods, {
      fields: [neighborhoodFeatures.neighborhoodId],
      references: [neighborhoods.id],
    }),
  }),
);

export const placesRelations = relations(places, ({ one, many }) => ({
  neighborhood: one(neighborhoods, {
    fields: [places.neighborhoodId],
    references: [neighborhoods.id],
  }),
  reviews: many(reviews),
  saves: many(userSaves),
}));

export const rentalsRelations = relations(rentals, ({ one }) => ({
  neighborhood: one(neighborhoods, {
    fields: [rentals.neighborhoodId],
    references: [neighborhoods.id],
  }),
}));

export const userProfilesRelations = relations(userProfiles, ({ one, many }) => ({
  user: one(users, {
    fields: [userProfiles.userId],
    references: [users.id],
  }),
  city: one(cities, {
    fields: [userProfiles.cityId],
    references: [cities.id],
  }),
  commuteTargetNeighborhood: one(neighborhoods, {
    fields: [userProfiles.commuteTargetNeighborhoodId],
    references: [neighborhoods.id],
  }),
  matches: many(neighborhoodMatches),
}));

export const neighborhoodMatchesRelations = relations(
  neighborhoodMatches,
  ({ one }) => ({
    user: one(users, {
      fields: [neighborhoodMatches.userId],
      references: [users.id],
    }),
    profile: one(userProfiles, {
      fields: [neighborhoodMatches.profileId],
      references: [userProfiles.id],
    }),
    neighborhood: one(neighborhoods, {
      fields: [neighborhoodMatches.neighborhoodId],
      references: [neighborhoods.id],
    }),
  }),
);

export const reviewsRelations = relations(reviews, ({ one }) => ({
  place: one(places, {
    fields: [reviews.placeId],
    references: [places.id],
  }),
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
}));

export const userSavesRelations = relations(userSaves, ({ one }) => ({
  user: one(users, {
    fields: [userSaves.userId],
    references: [users.id],
  }),
  place: one(places, {
    fields: [userSaves.placeId],
    references: [places.id],
  }),
}));

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type City                 = typeof cities.$inferSelect;
export type Neighborhood         = typeof neighborhoods.$inferSelect;
export type NeighborhoodFeatures = typeof neighborhoodFeatures.$inferSelect;
export type Place                = typeof places.$inferSelect;
export type Rental               = typeof rentals.$inferSelect;
export type UserProfile          = typeof userProfiles.$inferSelect;
export type NeighborhoodMatch    = typeof neighborhoodMatches.$inferSelect;
