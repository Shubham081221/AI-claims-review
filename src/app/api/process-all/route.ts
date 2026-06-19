import { loadDataset }
from "@/csv/loadDataset";

import { reviewClaim }
from "@/agents/reviewClaim";

export async function GET() {

  const data: any =
    await loadDataset();

  const results = [];

  for (const claim of data.claims) {

    const result =
      await reviewClaim(
        claim,
        data.history
      );

    results.push(result);
  }

  return Response.json({
    total: results.length,
    sample: results[0]
  });
}