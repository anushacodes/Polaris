import "server-only";

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "@/lib/db/schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is required for database access. Connect your Neon database to this project.",
  );
}

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
  max: 20,
});

export const db = drizzle(pool, {
  schema,
});

export async function closeDb() {
  await pool.end();
}
