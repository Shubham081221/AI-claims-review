import fs from "fs";
import path from "path";
import { gemini } from "@/lib/gemini";
import { VISION_PROMPT } from "@/prompts/VisionPrompt";

export async function analyzeImage(
    imagePath: string,
    issueType: string,
    objectPart: string
) {

    const fullPath = path.join(
    process.cwd(),
    "dataset",
    imagePath
  );

  console.log("Image:", fullPath);
  console.log(
    "Exists:",
    fs.existsSync(fullPath)
  );

    const imageBytes = fs.readFileSync(fullPath);

    const base64 = imageBytes.toString("base64");

    const prompt = `
                User Claim

                Issue Type:
               ${issueType}

                Object Part:
               ${objectPart}

               ${VISION_PROMPT}
               `;

    const response = await gemini.models.generateContent({
        model: "gemini-3-flash",

        contents: [
            {
                inlineData:{
                    mimeType: "image/jpeg",
                    data: base64,
                },
            },
            {
                text: prompt,
            },
        ],

        config: {
            responseMimeType:
              "application/json",
        },
    });

    return JSON.parse(
        response.text ?? "{}"
    );
}