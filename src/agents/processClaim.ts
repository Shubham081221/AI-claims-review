import { extractClaim } from "./claim_agent";

export async function processClaim(
    claim: any,
  history: any[]
) {

    const extracted = await extractClaim(
        claim.user_claim
    );

    const userHistory =
    history.find(
      h => h.user_id === claim.user_id
    );

     return {
    userId: claim.user_id,

    claimObject:
      claim.claim_object,

    issueType:
      extracted.issueType,

    objectPart:
      extracted.objectPart,

    historyFlags:
      userHistory?.history_flags ??
      "none",
  };
}