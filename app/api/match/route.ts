import { NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { neighborhoods, neighborhoodFeatures, cities } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { scoreNeighborhoods } from "@/lib/matching/score";
import { PreferenceVector } from "@/lib/ai/extract-preferences";

export const runtime = "nodejs";

interface MatchRequestBody {
  preferences: PreferenceVector;
  budgetMin: number;
  budgetMax: number;
  citySlug: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as MatchRequestBody;
    const { preferences, budgetMin, budgetMax, citySlug } = body;

    if (!preferences || typeof budgetMin !== "number" || typeof budgetMax !== "number" || !citySlug) {
      return NextResponse.json(
        { error: "Missing required fields in request body." },
        { status: 400 }
      );
    }

    // 1. Fetch destination city
    const [city] = await db
      .select()
      .from(cities)
      .where(eq(cities.slug, citySlug))
      .limit(1);

    if (!city) {
      return NextResponse.json(
        { error: `Destination city '${citySlug}' not found.` },
        { status: 404 }
      );
    }

    // 2. Fetch neighborhoods with features in the target city
    const rawData = await db
      .select({
        neighborhood: neighborhoods,
        features: neighborhoodFeatures,
      })
      .from(neighborhoods)
      .innerJoin(
        neighborhoodFeatures,
        eq(neighborhoods.id, neighborhoodFeatures.neighborhoodId)
      )
      .where(eq(neighborhoods.cityId, city.id));

    // Map into the format expected by scoreNeighborhoods
    const neighborhoodsWithFeatures = rawData.map((row) => ({
      neighborhood: row.neighborhood,
      features: row.features,
      city: city,
    }));

    // 3. Compute matching scores
    const matches = scoreNeighborhoods(
      preferences,
      budgetMin,
      budgetMax,
      neighborhoodsWithFeatures
    );

    return NextResponse.json({
      data: {
        city,
        matches,
      },
    });
  } catch (error) {
    console.error("Match route error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Neighborhood matching failed." },
      { status: 500 }
    );
  }
}
