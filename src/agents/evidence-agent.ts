export function checkEvidence(
  claimObject: string,
  issueType: string,
  imageResults: any[]
) {

  const validImages =
    imageResults.filter(
      img => img.validImage
    );

  if (validImages.length === 0) {
    return {
      evidenceStandardMet: false,
      reason:
        "No usable image evidence."
    };
  }

  const visibleDamage =
    validImages.some(
      img =>
        img.issueType !== "none"
    );

  if (visibleDamage) {
    return {
      evidenceStandardMet: true,
      reason:
        "Relevant object part visible."
    };
  }

  return {
    evidenceStandardMet: false,
    reason:
      "Damage not visible."
    };
}