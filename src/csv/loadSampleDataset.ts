import fs from "fs";
import path from "path";
import csv from "csv-parser";

function loadCsv(filePath: string) {
  return new Promise<any[]>((resolve, reject) => {

    const results: any[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });

  });
}

export async function loadSampleDataset() {

  const sampleClaims =
    await loadCsv(
      path.join(
        process.cwd(),
        "dataset",
        "sample_claims.csv"
      )
    );

  const history =
    await loadCsv(
      path.join(
        process.cwd(),
        "dataset",
        "user_history.csv"
      )
    );

  const evidence =
    await loadCsv(
      path.join(
        process.cwd(),
        "dataset",
        "evidence_requirements.csv"
      )
    );

  return {
    claims: sampleClaims,
    history,
    evidence,
  };
}