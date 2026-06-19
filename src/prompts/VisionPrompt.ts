export const VISION_PROMPT = `
You are reviewing an insurance damage claim.

Allowed issue types:

dent
scratch
crack
glass_shatter
broken_part
missing_part
torn_packaging
crushed_packaging
water_damage
stain
none
unknown

Inspect the image carefully.

Return ONLY valid JSON.

Example:

{
  "issueType": "scratch",
  "objectPart": "front_bumper",
  "severity": "low",
  "validImage": true,
  "riskFlags": []
}

Do not return markdown.
Do not return explanations.
`;