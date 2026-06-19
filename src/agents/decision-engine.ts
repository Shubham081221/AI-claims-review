export function decideClaim(
  extracted: any,
  images: any[]
) {

  const matchingImage = images.find(
    (img) =>
      img.issueType === extracted.issueType
  );

  if (matchingImage) {
    return {
      claimStatus: "supported",
      supportingImage: matchingImage,
    };
  }

  const visiblePart = images.find(
    (img) =>
      img.objectPart &&
      extracted.objectPart &&
      img.objectPart
        .toLowerCase()
        .includes(
          extracted.objectPart
            .toLowerCase()
        )
    );

  if (visiblePart) {
    return {
      claimStatus: "contradicted",
      supportingImage: visiblePart,
    };
  }

  return {
    claimStatus:
      "not_enough_information",
    supportingImage: null,
  };
}