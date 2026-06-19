import { gemini } from "@/lib/gemini";
import { CLAIM_PROMPT } from "@/prompts/ClaimPrompt";

export async function extractClaim(
    userClaim: string
) {
    const response = await gemini.models.generateContent({
        model: "gemini-3-flash",
        contents: `
        ${CLAIM_PROMPT}
        
        Claim: ${userClaim}
        `,

         config: {
  responseMimeType: "application/json",

  responseSchema: {
    type: "OBJECT",
    properties: {
      issueType: {
        type: "STRING",
      },
      objectPart: {
        type: "STRING",
      },
    },
    required: [
      "issueType",
      "objectPart",
    ],
  },
}
    });

    //const text = response.text?.trim();

    // try {
    //     return JSON.parse(text || "{}");
    // } catch {
    //     return {
    //         issueType: "unknown",
    //         objectPart: "unknown"
    //     };
    // }

    const text = response.text ?? "";

    console.log("Gemini JSON:", text);

    return JSON.parse(text);


}