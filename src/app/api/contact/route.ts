import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    // Database-backed rate limiting (max 5 contact submissions per 15 mins per IP)
    const ip = getClientIp(request.headers);
    const rateLimit = await checkRateLimit(`contact:${ip}`, 5, 900);

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: `Too many inquiries sent from your network. Please wait ${rateLimit.resetInSeconds} seconds.`,
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are mandatory fields.' },
        { status: 400 }
      );
    }

    // Log inquiry cleanly
    console.log(`[Contact Submission from ${name} <${email}>]: Subject: ${subject} | Message: ${message.slice(0, 100)}...`);

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully.',
    });
  } catch (error) {
    console.error('[API /api/contact Error]:', error);
    return NextResponse.json(
      { error: 'Unable to process your contact inquiry.' },
      { status: 500 }
    );
  }
}
