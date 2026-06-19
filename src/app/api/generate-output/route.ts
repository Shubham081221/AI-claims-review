import { writeOutput } from "@/csv/writeOutput";

export async function GET() {

  // later:
  // const results = await processAllClaims(...)

  await writeOutput([]);

  return Response.json({
    success: true
  });
}