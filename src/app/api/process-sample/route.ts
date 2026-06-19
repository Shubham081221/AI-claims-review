import { loadSampleDataset } from "@/csv/loadSampleDataset";
import { reviewClaim } from "@/agents/reviewClaim";
import { writeSampleOutput } from "@/csv/writeSampleOutput";

export async function GET() {

  const data =
    await loadSampleDataset();

  const results = [];

  for (const claim of data.claims) {

    const result =
      await reviewClaim(
        claim,
        data.history
      );

    results.push(result);
  }

  await writeSampleOutput(results);

  return Response.json({
    success: true,
    rows: results.length,
    file:
      "evaluation/sample_results.csv",
  });
}