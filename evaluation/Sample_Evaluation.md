# Sample Evaluation

## Overview

This solution reviews insurance and product damage claims by combining:

1. Claim text extraction
2. Image evidence analysis
3. Evidence validation
4. Risk assessment
5. Claim decision generation

The system processes customer conversations and supporting images to determine whether a claim is supported, contradicted, or requires further review.

---

## Architecture

### Claim Extraction Agent

Extracts:

* issue_type
* object_part

Example:

Customer claim:

"Front bumper is damaged and scratched."

Output:

```json
{
  "issueType": "scratch",
  "objectPart": "front_bumper"
}
```

---

### Vision Agent

Analyzes uploaded images and identifies:

* visible damage
* affected object part
* severity
* image validity
* risk indicators

Example:

```json
{
  "issueType": "scratch",
  "objectPart": "front_bumper",
  "severity": "low",
  "validImage": true,
  "riskFlags": []
}
```

---

### Evidence Evaluation

Checks whether:

* claimed object is visible
* image quality is sufficient
* visual evidence exists

Output:

```json
{
  "evidenceStandardMet": true,
  "reason": "Relevant object part visible."
}
```

---

### Decision Engine

Produces:

* supported
* contradicted
* not_enough_information

Example:

Claim:

* broken headlight

Image:

* visible scratch only

Decision:

```json
{
  "claimStatus": "contradicted"
}
```

---

## Risk Flag Detection

The system identifies:

* user_history_risk
* manual_review_required
* wrong_object
* low_quality_image

These flags are included in the final output.

---

## Optimization Techniques

### Claim Cache

Repeated claim extraction requests are cached to reduce API usage.

### Image Cache

Previously analyzed images are cached and reused.

### Structured JSON Responses

All AI outputs use JSON schemas to ensure consistency and simplify downstream processing.

---

## Tech Stack

Frontend / Runtime:

* Next.js
* TypeScript

AI:

* OpenRouter
* GPT-4o Mini
* Gemini 2.5 Flash (Vision)

Data:

* CSV Dataset

Output:

* output.csv

---

## Output Schema

Generated output.csv contains:

* user_id
* image_paths
* user_claim
* claim_object
* evidence_standard_met
* evidence_standard_met_reason
* risk_flags
* issue_type
* object_part
* claim_status
* claim_status_justification
* supporting_image_ids
* valid_image
* severity

---

## Limitations

* Decisions depend on image quality.
* Ambiguous customer descriptions may reduce extraction accuracy.
* Vision models may occasionally misclassify minor damage.
* Manual review is recommended for high-risk cases.

---

## Future Improvements

* Multi-image reasoning.
* Confidence scoring.
* Human review dashboard.
* Database-backed caching.
* Batch processing queue.
* Model ensemble validation.

---

## Conclusion

The solution successfully combines language understanding and image analysis to automate claim review. The generated output.csv provides structured claim decisions while maintaining explainability through evidence reasoning and risk flag generation.
