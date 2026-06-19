import { loadDataset } from "@/csv/loadDataset";

import { reviewClaim } from "@/agents/reviewClaim";

export async function GET() {

  const data: any =
    await loadDataset();

  const result =
    await reviewClaim(
      data.claims[0],
      data.history
    );

  return Response.json(result);
}