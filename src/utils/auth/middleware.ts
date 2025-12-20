import { NextProxy, NextResponse } from 'next/server';
import { middleware_hasServerSession } from './server';

export const withAuth = (authUrl: string, middleware: NextProxy): NextProxy => {
  return (req, evt) => {
    const loggedin = middleware_hasServerSession(req);

    if (!loggedin) {
      const url = req.nextUrl.clone();
      url.pathname = authUrl;

      return NextResponse.redirect(url);
    }

    return middleware(req, evt);
  };
};

export default withAuth('/auth/signin', () => NextResponse.next());
