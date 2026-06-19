
export type ClaimObject = 
    | "car"
    | "laptop"
    | "package";

export type ClaimStatus = 
    | "supported"
    | "contradicted"
    | "not_enough_info";
    
export interface ExtractedClaim {
    issueType: string;
    objectType: string;
}    