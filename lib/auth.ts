import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginSchema } from "@/lib/validations/admin";

const authSecret = process.env.NEXTAUTH_SECRET ?? "huipindu-local-dev-secret";
const adminEmail = process.env.ADMIN_EMAIL;
const adminPhone = process.env.ADMIN_PHONE;
const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
const adminPassword = process.env.ADMIN_PASSWORD;

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

        const allowedAccounts = [adminEmail, adminPhone].filter(Boolean);
        const isAllowedAccount = allowedAccounts.includes(parsed.data.account);
        const passwordMatched = adminPasswordHash
          ? await bcrypt.compare(parsed.data.password, adminPasswordHash)
          : Boolean(adminPassword && parsed.data.password === adminPassword);

        if (!isAllowedAccount || !passwordMatched) {
          return null;
        }

        return {
          id: "admin",
          name: "超级管理员",
          email: adminEmail ?? "admin",
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
