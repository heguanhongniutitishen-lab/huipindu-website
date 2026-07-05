import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginSchema } from "@/lib/validations/admin";

const demoPasswordHash = bcrypt.hashSync("admin123", 10);
const authSecret = process.env.NEXTAUTH_SECRET ?? "huipindu-local-dev-secret";

export const authOptions: NextAuthOptions = {
  secret: authSecret,
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/admin/login"
  },
  providers: [
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        account: { label: "手机号 / 邮箱", type: "text" },
        password: { label: "密码", type: "password" },
        captcha: { label: "验证码", type: "text" }
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const isDemoAccount =
          parsed.data.account === "admin@huipindu.com" || parsed.data.account === "13800000000";
        const passwordMatched = await bcrypt.compare(parsed.data.password, demoPasswordHash);

        if (!isDemoAccount || !passwordMatched) {
          return null;
        }

        return {
          id: "demo-admin",
          name: "超级管理员",
          email: "admin@huipindu.com",
          role: "SUPER_ADMIN"
        };
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }

      return session;
    }
  }
};
