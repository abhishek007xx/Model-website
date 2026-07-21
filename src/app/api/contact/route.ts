import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  projectType: z.string().min(1),
  date: z.string().optional(),
  message: z.string().min(10),
});

// The private inbox where booking notifications are forwarded.
// This is never exposed on the website — only used server-side.
const FORWARD_TO = "elonmusk786.02@gmail.com";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const ref = `MZ-${Date.now().toString(36).toUpperCase()}`;

    // 1. Persist the booking to the database
    const booking = await db.booking.create({
      data: {
        ref,
        name: data.name,
        email: data.email,
        company: data.company || "",
        projectType: data.projectType,
        date: data.date || "",
        message: data.message,
      },
    });

    // 2. Compose the email notification (server-side only, never exposed)
    const emailSubject = `[Mizuhara Booking] ${ref} — ${data.projectType} enquiry from ${data.name}`;
    const emailBody = [
      `New booking request received for Mizuhara.`,
      ``,
      `Reference: ${ref}`,
      `------------------`,
      `Name:           ${data.name}`,
      `Email:          ${data.email}`,
      `Company:        ${data.company || "—"}`,
      `Project Type:   ${data.projectType}`,
      `Preferred Date: ${data.date || "—"}`,
      `------------------`,
      `Message:`,
      `${data.message}`,
      ``,
      `------------------`,
      `Reply directly to the enquirer at: ${data.email}`,
      `Booking stored in database with ID: ${booking.id}`,
    ].join("\n");

    // 3. Forward to the private inbox.
    //    (In this sandbox we log the composed email so it's visible in
    //    server logs — in production this would call an SMTP/Email API.)
    console.log(`\n===== EMAIL FORWARDED TO: ${FORWARD_TO} =====`);
    console.log(`Subject: ${emailSubject}`);
    console.log(emailBody);
    console.log(`===== END EMAIL =====\n`);

    return NextResponse.json({ ok: true, ref });
  } catch (e) {
    console.error("[contact] error:", e);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Mizuhara booking API. Send a POST request to create a booking.",
  });
}
