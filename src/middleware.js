import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl.clone();
  const role = url.searchParams.get('role');

  if (role) {
    const response = NextResponse.next();
    response.cookies.set('role', role, { path: '/' });
    url.searchParams.delete('role');  // Supprimer le rôle de l'URL pour éviter de le transmettre
    response.headers.set('location', url.toString());
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/auth/:path*', '/auth/:path*'],
};
