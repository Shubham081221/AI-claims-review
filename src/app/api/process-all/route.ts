// import { loadDataset } from "@/csv/loadDataset";

// import { reviewClaim } from "@/agents/reviewClaim";

// export async function GET() {

//   const data: any =
//     await loadDataset();

//   const results = [];
// //.slice(0, 3)
//   for (const claim of data.claims) {

//     const result =
//       await reviewClaim(
//         claim,
//         data.history
//       );

//     results.push(result);
//   }

//   // return Response.json({
//   //   total: results.length,
//   //   sample: results[0]
//   // });

//   //temprorary
//   return Response.json(results);
// }

//above does not update output.csv

import { loadDataset }
  from "@/csv/loadDataset";

import { reviewClaim }
  from "@/agents/reviewClaim";

import { writeOutput }
  from "@/csv/writeOutput";

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

  await writeOutput(results);

  return Response.json({
    total: results.length,
    message:
      "output.csv generated successfully"
  });
}