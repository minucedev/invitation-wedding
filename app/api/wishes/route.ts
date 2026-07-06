import { NextResponse } from "next/server";

export const runtime = "nodejs";

export type Wish = { name: string; message: string };

// Shown when the Sheet backend isn't configured yet (or returns nothing) so the
// rotating toast always has something elegant to display.
const FALLBACK_WISHES: Wish[] = [
  {
    name: "Gia đình Bác Hùng",
    message:
      "Chúc hai cháu trăm năm hạnh phúc, đầu bạc răng long. Một khởi đầu mới thật rạng rỡ và viên mãn nhé!",
  },
  {
    name: "Minh Anh & Phương",
    message:
      "Thật ngưỡng mộ tình yêu của hai bạn. Chúc Thanh và Tuấn luôn giữ được ngọn lửa ấm áp này trong tổ ấm nhỏ của mình.",
  },
  {
    name: "Anh Hoàng (Team Marketing)",
    message:
      "Mừng ngày trọng đại của hai em! Chúc hai em luôn đồng hành, thấu hiểu và cùng nhau xây dựng những giấc mơ lớn.",
  },
];

function isWish(v: unknown): v is Wish {
  return (
    typeof v === "object" &&
    v !== null &&
    typeof (v as Wish).message === "string" &&
    (v as Wish).message.trim() !== ""
  );
}

export async function GET() {
  const webhookUrl = process.env.RSVP_WEBHOOK_URL;
  const secret = process.env.RSVP_SHARED_SECRET;

  if (!webhookUrl || !secret) {
    console.error(
      "[wishes] Missing RSVP_WEBHOOK_URL or RSVP_SHARED_SECRET — serving fallback wishes."
    );
    return NextResponse.json({ ok: true, wishes: FALLBACK_WISHES });
  }

  try {
    const url = `${webhookUrl}?token=${encodeURIComponent(secret)}`;
    const res = await fetch(url, { next: { revalidate: 15 } });
    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      wishes?: unknown;
    };

    const wishes = Array.isArray(data.wishes)
      ? data.wishes
          .filter(isWish)
          .map((w) => ({ name: String(w.name ?? "").trim() || "Khách mời", message: w.message.trim() }))
      : [];

    if (!data.ok || wishes.length === 0) {
      console.error(
        "[wishes] Webhook returned no usable wishes — serving fallback."
      );
      return NextResponse.json({ ok: true, wishes: FALLBACK_WISHES });
    }

    return NextResponse.json({ ok: true, wishes });
  } catch (err) {
    console.error("[wishes] Failed to fetch wishes:", err);
    return NextResponse.json({ ok: true, wishes: FALLBACK_WISHES });
  }
}
