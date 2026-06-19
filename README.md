# AI Claims Review System

## Overview

AI-powered claim verification system that reviews damage claims using:

* Images (primary source of truth)
* User claim conversation
* User history
* Evidence requirements

The system analyzes claims involving:

* Car damage
* Laptop damage
* Package damage

and generates a structured `output.csv` containing claim review decisions.

---

## Architecture

```text
Claims CSV
    ↓
Claim Extraction Agent
    ↓
Vision Analysis Agent
    ↓
Evidence Validation Agent
    ↓
Risk Assessment Agent
    ↓
Decision Engine
    ↓
Output CSV Generator
```

### Components

#### Claim Agent

Extracts:

* issue_type
* object_part

from the user conversation using Gemini.

#### Vision Agent

Analyzes submitted images and identifies:

* visible damage
* object part
* severity
* image quality

#### Evidence Agent

Checks whether submitted images meet the minimum evidence requirements defined in:

```text
dataset/evidence_requirements.csv
```

#### Risk Agent

Adds contextual risk flags from:

```text
dataset/user_history.csv
```

#### Decision Engine

Determines:

* supported
* contradicted
* not_enough_information

---

## Tech Stack

### Frontend / Backend

* Next.js 16
* TypeScript

### AI

* Gemini 2.5 Flash

### Data

* CSV datasets
* Local image processing

### Output

* csv-writer

---

## Project Structure

```text
src/
├── agents/
│   ├── claim_agent.ts
│   ├── vision-agent.ts
│   ├── analyzeImages.ts
│   ├── evidence-agent.ts
│   ├── risk-agent.ts
│   ├── decision-engine.ts
│   └── reviewClaim.ts
│
├── prompts/
│   ├── ClaimPrompt.ts
│   └── VisionPrompt.ts
│
├── csv/
│   ├── readCsv.ts
│   ├── loadDataset.ts
│   └── writeOutput.ts
│
└── app/api/
```

---

## Installation

```bash
npm install
```

Create:

```env
GEMINI_API_KEY=your_api_key
```

---

## Run

```bash
npm run dev
```

---

## Generate Output

```text
/api/process-all
```

Processes all claims.

```text
/api/generate-output
```

Generates:

```text
output.csv
```

---

## Output Schema

Generated CSV contains:

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

## Evaluation

The system is evaluated using:

```text
dataset/sample_claims.csv
```

Results and operational analysis are available in:

```text
evaluation/evaluation_report.md
```
