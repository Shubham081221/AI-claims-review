import { NextResponse } from "next/server";

import { loadDataset } from "@/csv/loadDataset";

export async function GET() {

  const data =
    await loadDataset();

  return NextResponse.json({
    claims: data.claims.length,
    history: data.history.length,
    evidence: data.evidence.length,
  });
}