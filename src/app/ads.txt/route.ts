export const dynamic = 'force-static';
export const revalidate = 3600;

export async function GET() {
  const content = [
    'google.com, pub-1222688537346496, DIRECT, f08c47fec0942fa0',
    'google.com, pub-3674055805574433, DIRECT, f08c47fec0942fa0',
    '',
  ].join('\n');

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
    },
  });
}
