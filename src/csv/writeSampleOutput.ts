import { createObjectCsvWriter } from "csv-writer";

export async function writeSampleOutput(results: any[]) {

  const csvWriter = createObjectCsvWriter({
    path: "evaluation/sample_results.csv",

    header: [
      { id: "user_id", title: "user_id" },
      { id: "image_paths", title: "image_paths" },
      { id: "user_claim", title: "user_claim" },
      { id: "claim_object", title: "claim_object" },
      { id: "evidence_standard_met", title: "evidence_standard_met" },
      { id: "evidence_standard_met_reason", title: "evidence_standard_met_reason" },
      { id: "risk_flags", title: "risk_flags" },
      { id: "issue_type", title: "issue_type" },
      { id: "object_part", title: "object_part" },
      { id: "claim_status", title: "claim_status" },
      { id: "claim_status_justification", title: "claim_status_justification" },
      { id: "supporting_image_ids", title: "supporting_image_ids" },
      { id: "valid_image", title: "valid_image" },
      { id: "severity", title: "severity" },
    ],
  });

  await csvWriter.writeRecords(results);
}