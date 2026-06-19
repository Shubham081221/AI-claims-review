import fs from "fs";
import csv from "csv-parser";

export async function readCsv(
    path: string
) {
    const results: any[] = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(path)
            .pipe(csv())
            .on("data", (data) => results.push(data))
            .on("end", () => resolve(results))
            .on("error", (err) => reject(err));
    })
}