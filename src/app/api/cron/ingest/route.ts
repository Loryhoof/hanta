import { NextResponse } from "next/server";
import { runOfficialSourceIngestion } from "@/lib/ingestion/sources";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const provided = new URL(request.url).searchParams.get("secret");

  if (secret && provided !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results = await runOfficialSourceIngestion();
  const itemCount = results.reduce((sum, result) => sum + result.items.length, 0);

  return NextResponse.json({
    ok: results.every((result) => result.ok),
    itemCount,
    results,
  });
}
