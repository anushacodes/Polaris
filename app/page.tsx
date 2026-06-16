"use client";

import { useActionState } from "react";
import { retrieveNeighborhoods } from "./actions";

export default function Prototype() {
  const [data, formAction, isPending] = useActionState(retrieveNeighborhoods, null);

  return (
    <div>
      <form action={formAction}>
        <textarea name="userPrompt" placeholder="describe your preferences..." required />
        <button type="submit" disabled={isPending}>
          {isPending ? "Loading..." : "Submit"}
        </button>
      </form>
      
      {data && data.map((info: any, idx: number) =>(
        <div key={idx}>
          <p>{info.name}</p>
          <p>{info.city}, {info.country}</p>
          <p>Safety: {info.safety_score}</p>
          <p>Transit: {info.transit_score}</p>
          <p>Vibe: {info.vibe_score}</p>
          <p>{info.description}</p>
          <p>Tags: {info.tags?.join(", ")}</p>
          <p>Rent: {info.min_rent} - {info.max_rent}</p><br />
        </div>
      ))}
    </div>
  );
}