import { NextResponse } from 'next/server';
import { extractClaim } from '@/agents/claim_agent';

export async function GET() {
    const claim = "The rear bumper has a dent.";

    const result = await extractClaim(claim);

    return NextResponse.json(result);
}