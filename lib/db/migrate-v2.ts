import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });

import postgres from "postgres";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL required");

  const sql = postgres(url, { max: 1, prepare: false });

  try {
    // ── cities: add currency column ───────────────────────────────────────────
    await sql`
      ALTER TABLE cities
        ADD COLUMN IF NOT EXISTS currency text NOT NULL DEFAULT 'USD'
    `;

    // ── users: add image column ───────────────────────────────────────────────
    await sql`
      ALTER TABLE users
        ADD COLUMN IF NOT EXISTS image text
    `;

    // ── neighborhood_features ─────────────────────────────────────────────────
    await sql`
      CREATE TABLE IF NOT EXISTS neighborhood_features (
        id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        neighborhood_id   uuid NOT NULL UNIQUE REFERENCES neighborhoods(id) ON DELETE CASCADE,
        walkability       real NOT NULL DEFAULT 0.5,
        transit           real NOT NULL DEFAULT 0.5,
        nightlife         real NOT NULL DEFAULT 0.5,
        safety            real NOT NULL DEFAULT 0.5,
        cafes             real NOT NULL DEFAULT 0.5,
        parks             real NOT NULL DEFAULT 0.5,
        young_professionals real NOT NULL DEFAULT 0.5,
        affordability     real NOT NULL DEFAULT 0.5,
        diversity         real NOT NULL DEFAULT 0.5,
        data_source       text NOT NULL DEFAULT 'seeded',
        updated_at        timestamptz NOT NULL DEFAULT now()
      )
    `;

    // ── rentals ───────────────────────────────────────────────────────────────
    await sql`
      CREATE TABLE IF NOT EXISTS rentals (
        id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        neighborhood_id uuid NOT NULL REFERENCES neighborhoods(id) ON DELETE CASCADE,
        title           text NOT NULL,
        price           integer NOT NULL,
        currency        text NOT NULL,
        bedrooms        integer NOT NULL,
        bathrooms       real NOT NULL,
        sqft            integer,
        lat             real NOT NULL,
        lng             real NOT NULL,
        coordinates     geography(Point,4326) NOT NULL,
        source          text NOT NULL,
        external_url    text NOT NULL,
        available_from  date NOT NULL,
        is_active       boolean NOT NULL DEFAULT true,
        created_at      timestamptz NOT NULL DEFAULT now()
      )
    `;

    // ── user_profiles: new columns ────────────────────────────────────────────
    const newProfileCols: [string, string][] = [
      ["source_neighborhood_name", "text"],
      ["source_city_name",         "text"],
      ["source_likes",             "text"],
      ["source_dislikes",          "text"],
      ["walkability_weight",       "real"],
      ["transit_weight",           "real"],
      ["nightlife_weight",         "real"],
      ["safety_weight",            "real"],
      ["cafes_weight",             "real"],
      ["parks_weight",             "real"],
      ["young_professionals_weight", "real"],
      ["affordability_weight",     "real"],
      ["diversity_weight",         "real"],
    ];

    for (const [col, type] of newProfileCols) {
      await sql.unsafe(
        `ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS "${col}" ${type}`
      );
    }

    // legacy defaults (needed for NOT NULL cols we added)
    await sql`
      ALTER TABLE user_profiles
        ALTER COLUMN vibe_tags    SET DEFAULT '{}',
        ALTER COLUMN interests    SET DEFAULT '{}',
        ALTER COLUMN priorities   SET DEFAULT '{}',
        ALTER COLUMN moving_with  SET DEFAULT 'solo',
        ALTER COLUMN work_type    SET DEFAULT 'office'
    `;

    console.log("✅ Migration complete.");
  } finally {
    await sql.end();
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
