import { NextResponse } from "next/server";
import { validateRsvp } from "@/lib/rsvp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Yêu cầu không hợp lệ." },
      { status: 400 }
    );
  }

  // Honeypot: bots tend to fill every field. Silently accept, write nothing.
  const company = (body as Record<string, unknown>)?.company;
  if (typeof company === "string" && company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const result = validateRsvp(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }

  const webhookUrl = process.env.RSVP_WEBHOOK_URL;
  const secret = process.env.RSVP_SHARED_SECRET;
  if (!webhookUrl || !secret) {
    console.error(
      "[rsvp] Missing RSVP_WEBHOOK_URL or RSVP_SHARED_SECRET env var — cannot forward submission."
    );
    return NextResponse.json(
      { ok: false, error: "Máy chủ chưa được cấu hình. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...result.value, token: secret }),
    });

    // Apps Script always responds HTTP 200 (ContentService) — even on errors
    // like an unauthorized token — so we must inspect the JSON body, not just
    // the HTTP status, otherwise a failed save would look like a success.
    const text = await upstream.text();
    let upstreamOk = false;
    try {
      upstreamOk = (JSON.parse(text) as { ok?: boolean })?.ok === true;
    } catch {
      upstreamOk = false;
    }

    if (!upstream.ok || !upstreamOk) {
      console.error(
        `[rsvp] Webhook rejected (HTTP ${upstream.status}): ${text.slice(0, 500)}`
      );
      return NextResponse.json(
        { ok: false, error: "Không thể gửi phản hồi. Vui lòng thử lại." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[rsvp] Failed to reach webhook:", err);
    return NextResponse.json(
      { ok: false, error: "Không thể kết nối máy chủ. Vui lòng thử lại." },
      { status: 502 }
    );
  }
}
