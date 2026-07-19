import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  projectType: z.string().min(1),
  date: z.string().optional(),
  message: z.string().min(10),
});

// In a production app this would persist to a database (e.g. Prisma)
// and/or send an email notification. Here we validate and acknowledge.
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

    // Log the booking (replace with DB write / email send in production)
    console.log("[booking]", ref, {
      name: data.name,
      email: data.email,
      company: data.company,
      projectType: data.projectType,
      date: data.date,
      message: data.message,
    });

    return NextResponse.json({ ok: true, ref });
  } catch (e) {
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
