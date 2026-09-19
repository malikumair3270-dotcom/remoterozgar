import { NextResponse } from 'next/server';
import { getSubmissions, addSubmission } from '@/lib/adminStore';
import { isAdminAuthenticated } from '@/lib/authCrypto';
import { checkRateLimit } from '@/lib/rateLimit';
import { logger } from '@/lib/logger';

export const dynamic = 'force-dynamic';

// ---------------------------------------------------------------------------
// Input validation helper
// ---------------------------------------------------------------------------
function validateSubmission(body: Record<string, unknown>): string | null {
  if (!body.jobTitle || typeof body.jobTitle !== 'string' || !body.jobTitle.trim()) {
    return 'jobTitle is required';
  }
  if (!body.companyName || typeof body.companyName !== 'string' || !body.companyName.trim()) {
    return 'companyName is required';
  }
  if (!body.applyUrl || typeof body.applyUrl !== 'string') {
    return 'applyUrl is required';
  }
  try {
    new URL(body.applyUrl as string);
  } catch {
    return 'applyUrl must be a valid URL';
  }
  return null;
}

// ---------------------------------------------------------------------------
// GET: Admin-only endpoint to view confidential client submissions & WhatsApp numbers
// ---------------------------------------------------------------------------
export async function GET(request: Request) {
  if (!isAdminAuthenticated(request)) {
    logger.warn('Unauthorized attempt to read submissions');
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Admin authentication required.' },
      { status: 401 }
    );
  }

  const submissions = await getSubmissions();
  return NextResponse.json({
    success: true,
    total: submissions.length,
    submissions,
  });
}

// ---------------------------------------------------------------------------
// POST: Employer submission endpoint with Anti-Spam Rate Limiting & Sanitization
// ---------------------------------------------------------------------------
export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '127.0.0.1';

  // Anti-spam: Limit public job submissions to 5 per 30 minutes per IP
  const rateCheck = checkRateLimit(`submit_${ip}`, 5, 30 * 60 * 1000);
  if (!rateCheck.success) {
    logger.warn('Spam submission rate limit exceeded', { userIp: ip });
    return NextResponse.json(
      { success: false, error: 'Too many submissions. Please wait 30 minutes.' },
      { status: 429 }
    );
  }

  try {
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid JSON payload' }, { status: 400 });
    }

    const validationError = validateSubmission(body);
    if (validationError) {
      return NextResponse.json({ success: false, error: validationError }, { status: 400 });
    }

    // Sanitize strings to prevent stored XSS
    const sanitize = (str: unknown) =>
      typeof str === 'string' ? str.replace(/</g, '&lt;').replace(/>/g, '&gt;').trim() : '';

    const submission = await addSubmission({
      jobTitle: sanitize(body.jobTitle),
      companyName: sanitize(body.companyName),
      applyUrl: (body.applyUrl as string).trim(),
      contactWhatsApp: sanitize(body.contactWhatsApp),
      notes: sanitize(body.notes),
    });

    logger.info('New employer job submission received', { id: submission.id, company: submission.companyName });

    return NextResponse.json({
      success: true,
      submission,
      message: 'Job submitted successfully for admin review.',
    });
  } catch (error) {
    logger.error('Failed to process job submission', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}