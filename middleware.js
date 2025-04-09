
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth((req) => {
  let path = req.nextUrl.pathname;
  if ( !req.auth && ( /^\/dashboard.*/.test(path) ) ) {
    const newUrl = new URL(("/auth/signin" + '?callbackUrl=' + encodeURIComponent(req.nextUrl)), req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
  else if (req.auth && path === "/auth/signin") {
    const newUrl = new URL("/dashboard", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
});


export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|static|manifest.json|robots.txt).*)"],
}
