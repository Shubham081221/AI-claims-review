// import fs from "fs";
// import path from "path";
// import { gemini } from "@/lib/gemini";
// import { VISION_PROMPT } from "@/prompts/VisionPrompt";
// import { getImageCache, saveImageCache } from "@/cache/imageCache";

// export async function analyzeImage(
//     imagePath: string,
//     issueType: string,
//     objectPart: string
// ) {

//     const cache = getImageCache();

//         const cacheKey =
//                 `${imagePath}_${issueType}_${objectPart}`;

//             if (cache[cacheKey]) {

//                 console.log(
//                 "CACHE HIT:",
//                 imagePath
//                 );

//      return cache[cacheKey];
//     }        

//     const fullPath = path.join(
//     process.cwd(),
//     "dataset",
//     imagePath
//   );

//   console.log("Image:", fullPath);
//   console.log(
//     "Exists:",
//     fs.existsSync(fullPath)
//   );

//     const imageBytes = fs.readFileSync(fullPath);

//     const base64 = imageBytes.toString("base64");

//     const prompt = `
//                 User Claim

//                 Issue Type:
//                ${issueType}

//                 Object Part:
//                ${objectPart}

//                ${VISION_PROMPT}
//                `;

       

//     const response = await gemini.models.generateContent({
//         model: "gemini-3.1-flash-lite",

//         contents: [
//             {
//                 inlineData:{
//                     mimeType: "image/jpeg",
//                     data: base64,
//                 },
//             },
//             {
//                 text: prompt,
//             },
//         ],

//         config: {
//             responseMimeType:
//               "application/json",
//         },
//     });

//     const parsed = JSON.parse(
//     response.text ?? "{}"
//     );

//     cache[cacheKey] = parsed;

//     saveImageCache(cache);

//     return parsed;
// }


//Above is Gemini Model

//Below is OpenRouter


import fs from "fs";
import path from "path";

import { openrouter } from "@/lib/openrouter";

import { VISION_PROMPT }
  from "@/prompts/VisionPrompt";

import {
  getImageCache,
  saveImageCache,
} from "@/cache/imageCache";

export async function analyzeImage(
  imagePath: string,
  issueType: string,
  objectPart: string
) {

  const cache =
    getImageCache();

  const cacheKey =
    `${imagePath}_${issueType}_${objectPart}`;

  if (cache[cacheKey]) {

    console.log(
      "IMAGE CACHE HIT:",
      imagePath
    );

    return cache[cacheKey];
  }

  const fullPath =
    path.join(
      process.cwd(),
      "dataset",
      imagePath
    );

  if (
    !fs.existsSync(
      fullPath
    )
  ) {

    return {
      issueType: "unknown",
      objectPart: "unknown",
      severity: "unknown",
      validImage: false,
      riskFlags: [
        "wrong_object"
      ],
    };
  }

  const imageBytes =
    fs.readFileSync(
      fullPath
    );

  const base64 =
    imageBytes.toString(
      "base64"
    );

    const ext = path
  .extname(fullPath)
  .toLowerCase();

let mimeType = "image/jpeg";

if (ext === ".png") {
  mimeType = "image/png";
}

if (ext === ".webp") {
  mimeType = "image/webp";
}

if (ext === ".gif") {
  mimeType = "image/gif";
}

console.log("Extension:", ext);
console.log("MimeType:", mimeType);

  const prompt = `
User Claim

Issue Type:
${issueType}

Object Part:
${objectPart}

${VISION_PROMPT}
`;

console.log("Image Path:", fullPath);
console.log("Extension:", ext);
console.log("Size:", imageBytes.length);


  const response =
    await openrouter.chat.completions.create({
      model: "google/gemini-2.5-flash",

      max_tokens: 300,

      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt,
            },
            {
              type: "image_url",
              image_url: {
                url:
                  `data:${mimeType};base64,${base64}`,
              },
            },
          ],
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
    "OpenRouter Vision:",
    text
  );

  try {

    const parsed =
      JSON.parse(text);

    cache[cacheKey] =
      parsed;

    saveImageCache(
      cache
    );

    return parsed;

  } catch {

    return {
      issueType: "unknown",
      objectPart: "unknown",
      severity: "unknown",
      validImage: false,
      riskFlags: [
        "manual_review_required"
      ],
    };
  }
}