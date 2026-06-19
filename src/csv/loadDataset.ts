import path from "path";
import { readCsv } from "./readCsv";

export async function loadDataset() {

    const claims = await readCsv(
                    path.join(
                        process.cwd(),
                        "dataset",
                        "claims.csv",
                    )
    );

    const history = await readCsv(
                    path.join(
                        process.cwd(),
                        "dataset",
                        "user_history.csv",
                    )
    );

    const evidence = await readCsv(
                    path.join(
                        process.cwd(),
                        "dataset",
                        "evidence_requirements.csv",
                    )
    );

    return {
    claims,
    history,
    evidence,
  };
}