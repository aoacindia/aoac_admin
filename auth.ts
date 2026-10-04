import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { eq, or } from "drizzle-orm";

import { getLiveAdminUser } from "@/lib/current-admin";
import { dbAdmin } from "@/lib/db";
import { adminOtpVerifications, adminUsers } from "@/lib/db/admin-schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: "OTP",
      credentials: {
        identifier: { label: "Email or Phone", type: "text" },
        otp: { label: "OTP", type: "text" },
        token: { label: "Token", type: "text" },
      },
      authorize: async (credentials) => {
        const identifier =
          typeof credentials?.identifier === "string"
            ? credentials.identifier.trim().toLowerCase()
            : "";
        const otp =
          typeof credentials?.otp === "string" ? credentials.otp.trim() : "";
        const token =
          typeof credentials?.token === "string" ? credentials.token.trim() : "";

        if (!identifier || !otp || !token) {
          return null;
        }

        const [user] = await dbAdmin
          .select({
            id: adminUsers.id,
            name: adminUsers.name,
            email: adminUsers.email,
            phone: adminUsers.phone,
            role: adminUsers.role,
            suspended: adminUsers.suspended,
            terminated: adminUsers.terminated,
          })
          .from(adminUsers)
          .where(
            or(eq(adminUsers.email, identifier), eq(adminUsers.phone, identifier))
          )
          .limit(1);

        if (!user || user.suspended || user.terminated) {
          return null;
        }

        const [otpRecord] = await dbAdmin
          .select()
          .from(adminOtpVerifications)
          .where(eq(adminOtpVerifications.token, token))
          .limit(1);

        if (!otpRecord || otpRecord.expiresAt < new Date()) {
          if (otpRecord) {
            await dbAdmin
              .delete(adminOtpVerifications)
              .where(eq(adminOtpVerifications.id, otpRecord.id));
          }
          return null;
        }

        if (otpRecord.email && otpRecord.email !== user.email) {
          return null;
        }

        const isMatch = await bcrypt.compare(otp, otpRecord.otp);
        if (!isMatch) {
          return null;
        }

        await dbAdmin
          .delete(adminOtpVerifications)
          .where(eq(adminOtpVerifications.id, otpRecord.id));

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 12,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      const userId = user?.id ?? (typeof token.id === "string" ? token.id : null);
      if (!userId) {
        return {};
      }

      const live = await getLiveAdminUser(userId);
      if (!live) {
        return {};
      }

      token.id = live.id;
      token.role = live.role;
      token.name = live.name;
      token.email = live.email;
      return token;
    },
    session: async ({ session, token }) => {
      if (!token.id || !token.role) {
        return session;
      }
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        if (typeof token.name === "string") {
          session.user.name = token.name;
        }
        if (typeof token.email === "string") {
          session.user.email = token.email;
        }
      }
      return session;
    },
  },
});
