import { NextResponse } from 'next/server';
import { analyzeImage } from "@/agents/vision-agent"

// export async function GET() {
//     return NextResponse.json({
//         status: "Working",
//     });
// }

export async function GET() {

    const result = await analyzeImage(
        "dataset/images//test/case_001/img_1.jpg"
    );
    
    return NextResponse.json(result);
}