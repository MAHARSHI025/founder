// /middleware.js
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // custom logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // only allow logged-in users
    },
    pages: {
      signIn: "/signup", // redirect here if unauthenticated
    },
  }
);

export const config = {
  matcher: [
    "/profile/:path*",
    "/chat/:path*",
    "/market/:path*",
    "/contact/:path*",
    // Add more protected routes if needed
  ],
};
