/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken'; 

const AuthRoutes = ["/login", "/signup"];

const roleBasedRoutes = {
  MEMBER: ['/groups', '/userDashboard','/groups/[id]'], 
  ADMIN: ['/groups','/adminDashboard','/groups/[id]'], 
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;


  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {

    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {

      return NextResponse.redirect(new URL(`/login`, request.url));
    }
  } else {
    try {

      const decodedToken = jwt.decode(accessToken);

      if (decodedToken && typeof decodedToken === 'object') {
        const userRole = decodedToken?.role;

        if (!userRole) {
          return NextResponse.redirect(new URL('/login', request.url));
        }
        const isDynamicRoute = pathname.includes('/groups/');

        if (isDynamicRoute) {

          if (
            (userRole === 'MEMBER' && roleBasedRoutes.MEMBER.some(route => pathname.startsWith(route))) ||
            (userRole === 'ADMIN' && roleBasedRoutes.ADMIN.some(route => pathname.startsWith(route)))
          ) {
            return NextResponse.next();
          }
        }

        if (pathname === '/adminDashboard' && userRole !== 'ADMIN') {
          return NextResponse.redirect(new URL('/', request.url));
        }

        if (
          (userRole === 'MEMBER' && roleBasedRoutes.MEMBER.includes(pathname)) ||
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
  matcher: ['/profile', '/userDashboard', '/adminDashboard', '/login', '/signup', '/groups','/groups/:path*'],
};
