import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { site } from "@/lib/site";

const subscribeSchema = z.object({
  email: z.string().email(),
  region: z.string().max(120).default("global"),
});

export async function POST(request: Request) {
  const parsed = subscribeSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: site.emailFrom,
      to: parsed.data.email,
      subject: "Confirm hantavirus outbreak updates",
      text: `Confirm your ${parsed.data.region} outbreak alerts at ${site.url}/alerts/confirm.`,
    });
  }

  return NextResponse.json({
    ok: true,
    message: "Alert signup received. Check your inbox to confirm updates.",
  });
}
