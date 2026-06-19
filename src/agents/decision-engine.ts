// export function decideClaim(
//   extracted: any,
//   images: any[]
// ) {

//   const matchingImage = images.find(
//     (img) =>
//       img.issueType === extracted.issueType
//   );

//   if (matchingImage) {
//     return {
//       claimStatus: "supported",
//       supportingImage: matchingImage,
//     };
//   }

//   const visiblePart = images.find(
//     (img) =>
//       img.objectPart &&
//       extracted.objectPart &&
//       img.objectPart
//         .toLowerCase()
//         .includes(
//           extracted.objectPart
//             .toLowerCase()
//         )
//     );

//   if (visiblePart) {
//     return {
//       claimStatus: "contradicted",
//       supportingImage: visiblePart,
//     };
//   }

//   return {
//     claimStatus:
//       "not_enough_information",
//     supportingImage: null,
//   };
// }

// export function decideClaim(
//   extracted: any,
//   images: any[]
// ) {

//   const matchingIssue =
//     images.find(
//       img =>
//         img.issueType ===
//         extracted.issueType
//     );

//   if (matchingIssue) {
//     return {
//       claimStatus: "supported",
//       supportingImage: matchingIssue,
//     };
//   }

//   const relevantPart =
//     images.find(
//       img =>
//         img.objectPart &&
//         extracted.objectPart &&
//         extracted.objectPart
//           .toLowerCase()
//           .includes(
//             img.objectPart.toLowerCase()
//           )
//       );

//   if (relevantPart) {
//     return {
//       claimStatus: "contradicted",
//       supportingImage: relevantPart,
//     };
//   }

//   return {
//     claimStatus:
//       "not_enough_information",
//     supportingImage: null,
//   };
// }

// src/agents/decision-engine.ts

import path from "path";

function mapSeverity(value: string) {
  switch (value?.toLowerCase()) {
    case "minor":
      return "low";
    case "moderate":
      return "medium";
    case "severe":
      return "high";
    default:
      return "unknown";
  }
}

function getImageId(imagePath: string) {
  return path.parse(imagePath).name;
}

export function decideClaim(
  extracted: any,
  images: any[]
) {

  const matchingIssue = images.find(
    img => img.issueType === extracted.issueType
  );

  if (matchingIssue) {
    return {
      claimStatus: "supported",
      supportingImageId: getImageId(
        matchingIssue.imagePath
      ),
      severity: mapSeverity(
        matchingIssue.severity
      )
    };
  }

  const relevantPart = images.find(
    img =>
      img.objectPart &&
      extracted.objectPart &&
      extracted.objectPart
        .toLowerCase()
        .includes(
          img.objectPart.toLowerCase()
        )
  );

  if (relevantPart) {
    return {
      claimStatus: "contradicted",
      supportingImageId: getImageId(
        relevantPart.imagePath
      ),
      severity: mapSeverity(
        relevantPart.severity
      )
    };
  }

  return {
    claimStatus: "not_enough_information",
    supportingImageId: "none",
    severity: "unknown"
  };
}