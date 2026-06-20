# AI Claims Review System

## Overview

AI Claims Review System is an automated claim verification pipeline that analyzes customer claim conversations and supporting images to determine whether a claim is supported, contradicted, or requires further review.

The system combines natural language understanding, computer vision, evidence validation, risk assessment, and decision generation to produce structured claim review outputs.

---

## Features

### Claim Extraction Agent

Extracts structured claim information from customer conversations:

* Issue Type
* Object Part

Example:

Customer Claim:

"I noticed a dent on the rear bumper."

Output:

```json
{
  "issueType": "dent",
  "objectPart": "rear_bumper"
}
```

---

### Vision Analysis Agent

Analyzes uploaded images and identifies:

* Visible damage
* Affected object part
* Severity
* Image validity
* Risk indicators

Supported damage types:

* dent
* scratch
* crack
* glass_shatter
* broken_part
* missing_part
* torn_packaging
* crushed_packaging
* water_damage
* stain

---

### Evidence Evaluation

Determines whether sufficient evidence exists to support the claim.

Checks:

* Relevant object visibility
* Image validity
* Visual evidence availability

---

### Risk Assessment

Generates risk flags such as:

* user_history_risk
* manual_review_required
* wrong_object
* low_quality_image

---

### Decision Engine

Produces one of the following decisions:

* supported
* contradicted
* not_enough_information

Example:

Claim:

"Broken headlight"

Image:

"Visible bumper scratch only"

Decision:

```json
{
  "claimStatus": "contradicted"
}
```

---

## Architecture

```text
Customer Claim
       │
       ▼
Claim Extraction Agent
       │
       ▼
Vision Analysis Agent
       │
       ▼
Evidence Evaluation
       │
       ▼
Risk Assessment
       │
       ▼
Decision Engine
       │
       ▼
output.csv
```

---

## Tech Stack

### Framework

* Next.js
* TypeScript

### AI Models

* OpenRouter
* GPT-4o Mini
* Gemini Vision Models

### Data Processing

* CSV Parser
* CSV Writer

### Storage

* File-based caching

---

## Project Structure

```text
src/
├── agents/
│   ├── claim_agent.ts
│   ├── vision-agent.ts
│   ├── reviewClaim.ts
│   ├── analyzeImages.ts
│
├── cache/
│   ├── claimCache.ts
│   ├── imageCache.ts
│
├── csv/
│   ├── loadDataset.ts
│   ├── loadSampleDataset.ts
│   ├── writeOutput.ts
│   ├── writeSampleOutput.ts
│
├── prompts/
│   ├── ClaimPrompt.ts
│   ├── VisionPrompt.ts
│
└── app/api/
```

---

## Evaluation

The system was evaluated using:

```text
dataset/sample_claims.csv
```

Generated file:

```text
evaluation/sample_results.csv
```

After successful evaluation, final predictions were generated using:

```text
dataset/claims.csv
```

Generated file:

```text
output.csv
```

---

## Output Schema

Generated output.csv contains:

| Column                       | Description                 |
| ---------------------------- | --------------------------- |
| user_id                      | User identifier             |
| image_paths                  | Associated images           |
| user_claim                   | Original claim text         |
| claim_object                 | Claimed object              |
| evidence_standard_met        | Evidence validation result  |
| evidence_standard_met_reason | Validation explanation      |
| risk_flags                   | Generated risk flags        |
| issue_type                   | Extracted issue type        |
| object_part                  | Extracted object part       |
| claim_status                 | Final decision              |
| claim_status_justification   | Decision explanation        |
| supporting_image_ids         | Supporting image references |
| valid_image                  | Image validation result     |
| severity                     | Damage severity             |

---

## Caching

To reduce API usage and speed up processing:

### Claim Cache

Caches extracted claim information.

### Image Cache

Caches image analysis results.

Benefits:

* Lower API cost
* Faster execution
* Reduced duplicate requests

---

## Setup

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create `.env.local`

```env
OPENROUTER_API_KEY=your_api_key
```

---

## Run Development Server

```bash
npm run dev
```

---

## Generate Sample Evaluation

```text
/api/process-sample
```

Output:

```text
evaluation/sample_results.csv
```

---

## Generate Final Predictions

```text
/api/process-all
```

Output:

```text
output.csv
```

---

## Limitations

* Performance depends on image quality.
* Ambiguous customer descriptions may affect extraction accuracy.
* Some edge cases may require manual review.
* Vision models may occasionally misclassify minor damage.

---

## Future Improvements

* Confidence scoring
* Multi-image reasoning
* Human review dashboard
* Database-backed caching
* Batch processing queue
* Model ensemble validation

---

## Submission Contents

* Source Code
* README.md
* output.csv
* evaluation/sample_results.csv
* evaluation/Sample_Evaluation.md
* chat_transcript.txt

---

## Author

Shubham Kumar

B.Tech Computer Science Engineering

## Note 

I have removed "test" folder from "dataset/images/test" as it is taking more space and i am having problem submitting project due to size folder.