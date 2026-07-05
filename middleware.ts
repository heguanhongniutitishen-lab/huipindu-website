import { withAuth } from "next-auth/middleware";

export default withAuth({
  secret: process.env.NEXTAUTH_SECRET ?? "huipindu-local-dev-secret",
  pages: {
    signIn: "/admin/login"
  }
});

export const config = {
  matcher: ["/admin((?!/login).*)"]
};
