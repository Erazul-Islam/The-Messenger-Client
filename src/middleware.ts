/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "./services/group.service"



const AuthRoutes = ["/login", "/signup"]

type Role = keyof typeof roleBasedRoutes

const roleBasedRoutes = {
    MEMEBER: ['/groups', '/userDashboard'],
    ADMIN: ['/groups', '/adminDashboard']
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    const userInfo = await getCurrentUser()

    if (!userInfo) {
        if (AuthRoutes.includes(pathname)) {
            return NextResponse.next()
        } else {
            return NextResponse.redirect(
                new URL(`/login?redirect=${pathname}`, request.url)
            )
        }
    }
    if (userInfo?.role && roleBasedRoutes[userInfo?.role as Role]) {
        const routes = roleBasedRoutes[userInfo?.role as Role];

        if (routes.includes(pathname)) {
            return NextResponse.next();
        }
    }

    return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
    matcher: ['/profile', '/userDashboard', "/adminDashboard", '/login', '/signup']
}