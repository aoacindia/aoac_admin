import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

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

        const { adminPrisma } = await import("@/lib/admin-prisma");

        const user = await adminPrisma.user.findFirst({
          where: {
            OR: [{ email: identifier }, { phone: identifier }],
          },
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true,
            suspended: true,
            terminated: true,
          },
        });

        if (!user || user.suspended || user.terminated) {
          return null;
        }

        const otpRecord = await adminPrisma.otpVerification.findUnique({
          where: { token },
        });

        if (!otpRecord || otpRecord.expiresAt < new Date()) {
          if (otpRecord) {
            await adminPrisma.otpVerification.delete({
              where: { id: otpRecord.id },
            });
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

        await adminPrisma.otpVerification.delete({
          where: { id: otpRecord.id },
        });

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
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});