import "server-only";

import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "@/lib/db/schema-minimal";

type DB = PostgresJsDatabase<typeof schema>;

let _db: DB | null = null;

function getDb(): DB {
  if (_db) return _db;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is required for database access.");
  }

  const queryClient = postgres(connectionString, {
    max: 1,
    prepare: false,
  });

  _db = drizzle(queryClient, { schema });
  return _db;
}

// Lazily initialize the connection so that importing this module does not
// require DATABASE_URL at build time. The connection is only created on first
// access at runtime.
export const db = new Proxy({} as DB, {
  get(_target, prop, receiver) {
    const instance = getDb();
    const value = Reflect.get(instance as object, prop, receiver);
    return typeof value === "function" ? value.bind(instance) : value;
  },
});
