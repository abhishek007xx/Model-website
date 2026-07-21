import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/bookings
 * -----------------
 * Returns all booking submissions (newest first).
 * This is a private admin endpoint — not linked from the website.
 * Use it to retrieve bookings that were forwarded to your email.
 */
export async function GET() {
  try {
    const bookings = await db.booking.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return NextResponse.json({ ok: true, count: bookings.length, bookings });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
