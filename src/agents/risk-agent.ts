export function buildRiskFlags(
  imageResults: any[],
  historyFlags: string
) {

  const flags = [];

  if (
    imageResults.some(
      img => !img.validImage
    )
  ) {
    flags.push(
      "manual_review_required"
    );
  }

  if (
    historyFlags &&
    historyFlags !== "none"
  ) {
    flags.push(historyFlags);
  }

  return flags.length
    ? flags.join(";")
    : "none";
}