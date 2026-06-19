import { extractClaim } from "./claim_agent";
import { analyzeImages } from "./analyzeImages";
import { decideClaim } from "./decision-engine";
import { checkEvidence } from "./evidence-agent";
import { buildRiskFlags } from "./risk-agent";

export async function reviewClaim(
  claim: any,
  history: any[]
) {

  const extracted =
    await extractClaim(
      claim.user_claim
    );

  const imageResults =
  await analyzeImages(
    claim.image_paths,
    extracted.issueType,
    extracted.objectPart
  );

  const evidence =
  checkEvidence(
    claim.claim_object,
    extracted.issueType,
    imageResults
  );

  console.log(
  JSON.stringify(
    imageResults,
    null,
    2
  )
);

  const userHistory =
    history.find(
      h => h.user_id === claim.user_id
    );

  // const supportingImage =
  //   imageResults.find(
  //     img =>
  //       img.issueType ===
  //       extracted.issueType
  //   );

  // const claimStatus =
  //   supportingImage
  //     ? "supported"
  //     : "not_enough_information";

  const decision = decideClaim(
  extracted,
  imageResults
);

//   return {
//     user_id: claim.user_id,
//     image_paths: claim.image_paths,
//     claim_object: claim.claim_object,

//     issue_type:
//       extracted.issueType,

//     object_part:
//       extracted.objectPart,

//     claim_status:
//       claimStatus,

//     supporting_image_ids:
//       supportingImage
//         ? supportingImage.imagePath
//         : "none",

//     risk_flags:
//       userHistory?.history_flags ??
//       "none",
//   };


return {
  user_id: claim.user_id,

  image_paths: claim.image_paths,

  user_claim: claim.user_claim,

  claim_object: claim.claim_object,

  evidence_standard_met:
    evidence.evidenceStandardMet,

  evidence_standard_met_reason:
    evidence.reason,

  risk_flags:
    buildRiskFlags(
    imageResults,
    userHistory?.history_flags
  ),

  issue_type:
    extracted.issueType,

  object_part:
    extracted.objectPart,

  claim_status:
    decision.claimStatus,

  claim_status_justification:
    decision.claimStatus ===
    "supported"
      ? "Image evidence matches the claim."
      : decision.claimStatus ===
        "contradicted"
      ? "Visible evidence conflicts with the claim."
      : "Insufficient visual evidence.",

  supporting_image_ids:
    decision.supportingImageId,

  valid_image:
    imageResults.some(
      img => img.validImage
    ),

  severity:
    decision.severity
};
}