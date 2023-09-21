import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const url = new URL(req.url);
  const pathname = req.nextUrl.pathname;
  const searchParams = url.searchParams;
  const mode = searchParams.get("mode");
  const oobCode = searchParams.get("oobCode");

  if (mode === "verifyEmail") {
    return NextResponse.redirect(
      new URL(`/verify-email?oobCode=${oobCode}`, req.url)
    );
  } else if (mode === "resetPassword") {
    return NextResponse.redirect(
      new URL(`/auth/reset-password?oobCode=${oobCode}`, req.url)
    );
  }

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    if (pathname === "/upload" ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // if (session && !session.user.user.emailVerified) {
  //   if (pathname !== "/verify-email" &&  pathname !== "/verify" ) {
  //     return NextResponse.redirect(new URL("/verify", req.url));
  //   }
  // }
}
export const config = {
  matcher: [
    "/",
    "/verify",
    "/verify-email",
    "/upload",
  ],
};
