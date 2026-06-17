"use server";

import { aiFunction } from "./aiagent";

export async function retrieveNeighborhoods(prevState: any, formData: FormData) {
  const messyPrompt = formData.get("userPrompt") as string;

  const neighborhoods = await aiFunction(messyPrompt);
  
  return neighborhoods;
}