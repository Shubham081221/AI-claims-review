// import { analyzeImage }
// from "@/agents/vision-agent";

// export async function GET() {

//   const result =
//     await analyzeImage(
//       "images/test/case_001/img_1.jpg"
//     );

//   return Response.json(result);
// }

import { loadDataset }
from "@/csv/loadDataset";

import { analyzeImages }
from "@/agents/analyzeImages";

export async function GET() {

  const data: any =
    await loadDataset();

  const claim =
    data.claims[0];

  const results =
    await analyzeImages(
      claim.image_paths
    );

  return Response.json(results);
}