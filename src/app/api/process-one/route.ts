import { NextResponse } from "next/server";
import { loadDataset } from "@/csv/loadDataset";
import { processClaim } from "@/agents/processClaim";

export async function GET() {

    const data = await loadDataset();

    const result = await processClaim(
        data.claims[0],
        data.history
    );

    return NextResponse.json(
        result
    );
}