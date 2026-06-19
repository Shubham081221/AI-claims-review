import { analyzeImage } from "./vision-agent";

export async function analyzeImages(
  imagePaths: string,
   issueType: string,
   objectPart: string
) {

  const paths =
    imagePaths.split(";");

  const results = [];

  for (const path of paths) {

    const result =
      await analyzeImage(
        path,
        issueType,
        objectPart
      );

    results.push({
      imagePath: path,
      ...result,
    });
  }

  return results;
}