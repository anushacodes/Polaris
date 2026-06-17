import { NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { rentals } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const neighborhoodId = searchParams.get("neighborhoodId");

  if (!neighborhoodId) {
    return NextResponse.json(
      { error: "Missing required query parameter: neighborhoodId" },
      { status: 400 }
    );
  }

  try {
    const list = await db
      .select()
      .from(rentals)
      .where(eq(rentals.neighborhoodId, neighborhoodId))
      .orderBy(rentals.price);

    return NextResponse.json({
      data: list,
    });
  } catch (error) {
    console.error("Rentals fetch error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch rentals." },
      { status: 500 }
    );
  }
}
