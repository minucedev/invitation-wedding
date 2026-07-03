// Shared RSVP payload type + validator, used by the /api/rsvp route handler
// and importable by the client form for the type.

export const GUEST_OF_OPTIONS = ["Khách của Cô dâu", "Khách của Chú rể"] as const;
export const GUEST_COUNT_OPTIONS = ["1", "2"] as const;
export const ATTENDING_OPTIONS = ["yes", "no"] as const;

export type RsvpPayload = {
  fullName: string;
  email: string;
  attending: (typeof ATTENDING_OPTIONS)[number];
  guestOf: (typeof GUEST_OF_OPTIONS)[number];
  guests: (typeof GUEST_COUNT_OPTIONS)[number];
  /** Optional wish / message left by the guest */
  message: string;
};

export type ValidationResult =
  | { ok: true; value: RsvpPayload }
  | { ok: false; error: string };

// Pragmatic email check — good enough for form validation, not RFC-perfect.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export function validateRsvp(data: unknown): ValidationResult {
  if (typeof data !== "object" || data === null) {
    return { ok: false, error: "Invalid request body." };
  }
  const d = data as Record<string, unknown>;

  const fullName = asString(d.fullName);
  if (!fullName) return { ok: false, error: "Vui lòng nhập họ và tên." };
  if (fullName.length > 120)
    return { ok: false, error: "Họ và tên quá dài." };

  const email = asString(d.email); // optional
  if (email && !EMAIL_RE.test(email))
    return { ok: false, error: "Email không hợp lệ." };

  const attending = asString(d.attending);
  if (!ATTENDING_OPTIONS.includes(attending as RsvpPayload["attending"]))
    return { ok: false, error: "Vui lòng chọn bạn có tham dự hay không." };

  const guestOf = asString(d.guestOf);
  if (!GUEST_OF_OPTIONS.includes(guestOf as RsvpPayload["guestOf"]))
    return { ok: false, error: "Lựa chọn khách mời không hợp lệ." };

  const guests = asString(d.guests);
  if (!GUEST_COUNT_OPTIONS.includes(guests as RsvpPayload["guests"]))
    return { ok: false, error: "Số lượng khách không hợp lệ." };

  const message = asString(d.message); // optional
  if (message.length > 1000)
    return { ok: false, error: "Lời chúc quá dài." };

  return {
    ok: true,
    value: {
      fullName,
      email,
      attending: attending as RsvpPayload["attending"],
      guestOf: guestOf as RsvpPayload["guestOf"],
      guests: guests as RsvpPayload["guests"],
      message,
    },
  };
}
