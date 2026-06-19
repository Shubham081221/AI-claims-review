export interface Claim {
  user_id: string;
  image_paths: string;
  user_claim: string;
  claim_object: string;
}

export interface UserHistory {
  user_id: string;
  past_claim_count: string;
  accept_claim: string;
  manual_review_claim: string;
  rejected_claim: string;
  last_90_days_claim_count: string;
  history_flags: string;
  history_summary: string;
}

export interface EvidenceRule {
  requirement_id: string;
  claim_object: string;
  applies_to: string;
  minimum_image_evidence: string;
}