/* eslint-disable prettier/prettier */
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken'; // Use the 'jsonwebtoken' package for decoding

const AuthRoutes = ["/login", "/signup"];

const roleBasedRoutes = {
  USER: ['/groups', '/userDashboard'], // For logged-in users
  ADMIN: ['/groups','/adminDashboard'], // For admins
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the access token from cookies
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {

    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {

      return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url));
    }
  } else {
    try {

      const decodedToken = jwt.decode(accessToken);

 

      if (decodedToken && typeof decodedToken === 'object') {
        const userRole = decodedToken?.role;

        if (!userRole) {
          return NextResponse.redirect(new URL('/login', request.url));
        }

        if (pathname === '/adminDashboard' && userRole !== 'ADMIN') {
          return NextResponse.redirect(new URL('/', request.url));
        }

        if (
          (userRole === 'MEMBER' && roleBasedRoutes.USER.includes(pathname)) ||
          (userRole === 'ADMIN' && roleBasedRoutes.ADMIN.includes(pathname))
        ) {
          return NextResponse.next();
        }
      }

      return NextResponse.redirect(new URL('/login', request.url));
    } catch (error) {

      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
}

export const config = {
  matcher: ['/profile', '/userDashboard', '/adminDashboard', '/login', '/signup', '/groups'],
};
