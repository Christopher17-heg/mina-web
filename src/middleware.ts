import { NextResponse, type NextRequest } from 'next/server';
import { middleware_hasServerSession } from './utils/auth/server';

//Pages need to be logged in before visiting
export const config = {
  matcher: ['/guilds/:path*', '/user/:path*'],
};

export default function middleware(req: NextRequest) {
  const loggedin = middleware_hasServerSession(req);

  if (!loggedin) {
    const url = req.nextUrl.clone();
    url.pathname = '/auth/signin';

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
