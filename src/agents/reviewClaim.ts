import { extractClaim } from "./claim_agent";
import { analyzeImages } from "./analyzeImages";

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

  const supportingImage =
    imageResults.find(
      img =>
        img.issueType ===
        extracted.issueType
    );

  const claimStatus =
    supportingImage
      ? "supported"
      : "not_enough_information";

  return {
    user_id: claim.user_id,
    image_paths: claim.image_paths,
    claim_object: claim.claim_object,

    issue_type:
      extracted.issueType,

    object_part:
      extracted.objectPart,

    claim_status:
      claimStatus,

    supporting_image_ids:
      supportingImage
        ? supportingImage.imagePath
        : "none",

    risk_flags:
      userHistory?.history_flags ??
      "none",
  };
}