// import { gemini } from "@/lib/gemini";
// import { CLAIM_PROMPT } from "@/prompts/ClaimPrompt";
// import { getClaimCache, saveClaimCache } from "@/cache/claimCache";

// export async function extractClaim(
//     userClaim: string
// ) {

//   const cache = getClaimCache();

//   const cacheKey = userClaim.trim();

//   if (cache[cacheKey]) {

//   console.log(
//     "CLAIM CACHE HIT"
//   );

//   return cache[cacheKey];
//   }

//     const response = await gemini.models.generateContent({
//         model: "gemini-3.1-flash-lite",
//         contents: `
//         ${CLAIM_PROMPT}
        
//         Claim: ${userClaim}
//         `,

//          config: {
//   responseMimeType: "application/json",

//   responseSchema: {
//     type: "OBJECT",
//     properties: {
//       issueType: {
//         type: "STRING",
//       },
//       objectPart: {
//         type: "STRING",
//       },
//     },
//     required: [
//       "issueType",
//       "objectPart",
//     ],
//   },
// }
//     });

    

//     const text = response.text ?? "";

// console.log("Gemini JSON:", text);

// try {

//   const parsed = JSON.parse(text);

//   cache[cacheKey] = parsed;

//   saveClaimCache(cache);

//   return parsed;

// } catch {

//   return {
//     issueType: "unknown",
//     objectPart: "unknown",
//   };
// }
// }

//Above is Gemini Model

//Below is OpenRouter

import crypto from "crypto";

import { openrouter } from "@/lib/openrouter";
import { CLAIM_PROMPT } from "@/prompts/ClaimPrompt";

import {
  getClaimCache,
  saveClaimCache,
} from "@/cache/claimCache";

export async function extractClaim(
  userClaim: string
) {

  const cache = getClaimCache();

  const cacheKey = crypto
    .createHash("md5")
    .update(userClaim)
    .digest("hex");

  if (cache[cacheKey]) {

    console.log(
      "CLAIM CACHE HIT"
    );

    return cache[cacheKey];
  }

  const response =
    await openrouter.chat.completions.create({
      model: "openai/gpt-4o-mini",

      max_tokens: 100,

      messages: [
        {
          role: "system",
          content: CLAIM_PROMPT,
        },
        {
          role: "user",
          content: userClaim,
        },
      ],

      response_format: {
        type: "json_object",
      },
    });

  const text =
    response.choices[0]
      .message.content ?? "{}";

  console.log(
    "OpenRouter Claim:",
    text
  );

  try {

    const parsed =
      JSON.parse(text);

    cache[cacheKey] =
      parsed;

    saveClaimCache(
      cache
    );

    return parsed;

  } catch {

    return {
      issueType: "unknown",
      objectPart: "unknown",
    };
  }
}