import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });

import { eq, and, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { sql } from "drizzle-orm";

import { cities, neighborhoods, neighborhoodFeatures, rentals } from "@/lib/db/schema";
import { neighborhoodFeatureVectors, neighborhoodRentals } from "@/lib/db/seed-features";

function point(lng: number, lat: number) {
  return sql`ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)::geography`;
}

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL required");

  const client = postgres(connectionString, { max: 1, prepare: false });
  const db = drizzle(client);

  try {
    // 1. Seed neighborhood_features
    let featuresSeeded = 0;
    for (const [slug, vec] of Object.entries(neighborhoodFeatureVectors)) {
      // Find the neighborhood by slug (across all cities)
      const [row] = await db
        .select({ id: neighborhoods.id })
        .from(neighborhoods)
        .where(eq(neighborhoods.slug, slug))
        .limit(1);

      if (!row) {
        console.warn(`  ⚠ Neighborhood slug not found: ${slug}`);
        continue;
      }

      await db
        .insert(neighborhoodFeatures)
        .values({
          neighborhoodId:     row.id,
          walkability:        vec.walkability,
          transit:            vec.transit,
          nightlife:          vec.nightlife,
          safety:             vec.safety,
          cafes:              vec.cafes,
          parks:              vec.parks,
          youngProfessionals: vec.youngProfessionals,
          affordability:      vec.affordability,
          diversity:          vec.diversity,
          dataSource:         "seeded",
        })
        .onConflictDoUpdate({
          target: neighborhoodFeatures.neighborhoodId,
          set: {
            walkability:        vec.walkability,
            transit:            vec.transit,
            nightlife:          vec.nightlife,
            safety:             vec.safety,
            cafes:              vec.cafes,
            parks:              vec.parks,
            youngProfessionals: vec.youngProfessionals,
            affordability:      vec.affordability,
            diversity:          vec.diversity,
            dataSource:         "seeded",
          },
        });

      featuresSeeded++;
    }

    // 2. Seed rentals (delete existing seeded ones first, then re-insert)
    let rentalsSeeded = 0;
    for (const [slug, listings] of Object.entries(neighborhoodRentals)) {
      const [row] = await db
        .select({ id: neighborhoods.id })
        .from(neighborhoods)
        .where(eq(neighborhoods.slug, slug))
        .limit(1);

      if (!row) {
        console.warn(`  ⚠ Neighborhood slug not found for rentals: ${slug}`);
        continue;
      }

      // Remove existing seeded rentals for this neighborhood
      await db
        .delete(rentals)
        .where(
          and(
            eq(rentals.neighborhoodId, row.id),
            or(
              eq(rentals.source, "seeded"),
              eq(rentals.source, "craigslist"),
              eq(rentals.source, "kijiji"),
              eq(rentals.source, "magicbricks"),
              eq(rentals.source, "nobroker"),
              eq(rentals.source, "rentals-ca"),
              eq(rentals.source, "streeteasy"),
            ),
          ),
        );

      for (const listing of listings) {
        await db.insert(rentals).values({
          neighborhoodId: row.id,
          title:          listing.title,
          price:          listing.price,
          currency:       listing.currency,
          bedrooms:       listing.bedrooms,
          bathrooms:      listing.bathrooms,
          sqft:           listing.sqft,
          lat:            listing.lat,
          lng:            listing.lng,
          coordinates:    point(listing.lng, listing.lat),
          source:         listing.source,
          externalUrl:    listing.externalUrl,
          availableFrom:  listing.availableFrom,
          isActive:       true,
        });
        rentalsSeeded++;
      }
    }

    console.log(`✅ Seeded ${featuresSeeded} neighborhood feature vectors`);
    console.log(`✅ Seeded ${rentalsSeeded} rental listings`);
  } finally {
    await client.end();
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
