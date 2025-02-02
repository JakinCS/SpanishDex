// import { auth } from "@/auth";


// export { auth as middleware } from "@/auth"

// export default auth((req) => {
//   if (!req.auth && req.nextUrl.pathname !== "login") {
//     const newUrl = new URL("/login", req.nextUrl.origin);
//     return Response.redirect(newUrl);
//   }
// })

// export const config = { matcher: ["/dashboard"] }


import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*'],
}
// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// }


