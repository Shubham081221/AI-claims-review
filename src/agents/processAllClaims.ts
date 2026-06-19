import { reviewClaim } from "./reviewClaim";

export async function processAllClaims(
  claims: any[],
  history: any[]
) {

  const results = [];

  for (const claim of claims.slice(0, 3)) {

    const result =
      await reviewClaim(
        claim,
        history
      );

    results.push(result);
  }

//   for (const claim of claims) {

//     const result =
//       await reviewClaim(
//         claim,
//         history
//       );

//     results.push(result);
//   }

  return results;
}