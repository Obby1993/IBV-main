import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const origin = req.headers.get('origin');

  // Autoriser les requêtes provenant de votre domaine
  if (origin === 'https://www.imagine-beach-volley.com') {
    const res = NextResponse.next();
    res.headers.set('Access-Control-Allow-Origin', 'https://www.imagine-beach-volley.com');
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res;
  }

  // Bloquez toutes les autres origines
  return NextResponse.rewrite(new URL('/api/error', req.url));
}

export const config = {
  matcher: '/api/:path*', // Applique le middleware à toutes les routes sous /api/
};
