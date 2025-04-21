import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: '/signup', // send user to this page if not logged in
  },
})

// This tells Next.js: Only protect the /home route
export const config = {
  matcher: ['/market'],
}
