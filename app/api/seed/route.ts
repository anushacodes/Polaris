import { NextResponse } from "next/server";
import { db } from "@/lib/db/client"; 
import { neighborhoodProfiles } from "@/lib/db/schema";
import { sql } from "drizzle-orm";
import _neighborhoodData from "@/lib/db/neighborhood_profiles.json";

// The exact model mapping your database schema
interface NeighborhoodInput {
  id?: string;
  city_id: string;
  name: string;
  slug: string;
  summary: string;
  vibe_tags?: string[];
  best_for_tags?: string[];
  rent_min: number;
  rent_max: number;
  lat: number;
  lng: number;
  coordinates?: string;
  walkability?: number;
  transit?: number;
  nightlife?: number;
  safety?: number;
  cafes?: number;
  parks?: number;
  young_professionals?: number;
  affordability?: number;
  diversity?: number;
  // mapped as unknown because JSON payloads can be arrays or objects
  places?: unknown;
  commute_estimates?: unknown;
  llm_profile?: unknown;
  external_metrics?: unknown;
  data_sources?: unknown;
  data_source?: string;
}

const neighborhoodData = _neighborhoodData as NeighborhoodInput[];

export async function POST() {
  console.log("🌱 Starting safe database sync...");

  try {
    if (neighborhoodData && neighborhoodData.length > 0) {
      console.log(`⏳ Syncing ${neighborhoodData.length} neighborhood profiles...`);
      
      const processed = neighborhoodData.map((n: NeighborhoodInput) => ({
        ...n,
        // Enforce stringification of objects/arrays to satisfy database JSONB strings input
        places: n.places ? JSON.stringify(n.places) : "[]",
        commute_estimates: n.commute_estimates ? JSON.stringify(n.commute_estimates) : "[]",
        llm_profile: n.llm_profile ? JSON.stringify(n.llm_profile) : "{}",
        external_metrics: n.external_metrics ? JSON.stringify(n.external_metrics) : "{}",
        data_sources: n.data_sources ? JSON.stringify(n.data_sources) : "{}",
        // PostGIS Geometry Wrapper
        coordinates: sql`ST_GeographyFromText(${n.coordinates || `POINT(${n.lng} ${n.lat})`})`,
      }));
      
      // Explicit type alignment for Drizzle's internal Insert object
      await db
        .insert(neighborhoodProfiles)
        .values(processed as unknown as typeof neighborhoodProfiles.$inferInsert[])
        .onConflictDoNothing();
    }

    console.log("✅ Everything successfully synchronized!");
    return NextResponse.json({ success: true, message: "Synchronization complete" });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ Sync failed:", errorMessage);
    return NextResponse.json(
      { success: false, error: errorMessage }, 
      { status: 500 }
    );
  }
}