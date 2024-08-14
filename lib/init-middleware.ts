// lib/init-middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const origin = req.headers.get('origin');

  // Vérifie si l'origine est autorisée
  if (origin === 'https://www.imagine-beach-volley.com') {
    const res = NextResponse.next();
    res.headers.set('Access-Control-Allow-Origin', 'https://www.imagine-beach-volley.com');
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res;
  }

  // Bloquez toutes les autres origines
  return new NextResponse('Blocked by CORS policy', { status: 403 });
}

export const config = {
  matcher: '/api/:path*', // Applique le middleware à toutes les routes sous /api/
};
