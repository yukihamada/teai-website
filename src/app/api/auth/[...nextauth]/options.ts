import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { PrismaClient } from '@prisma/client';
import { 
  OrganizationsClient, 
  CreateAccountCommand,
} from "@aws-sdk/client-organizations";

const prisma = new PrismaClient();
const organizations = new OrganizationsClient({
  region: "ap-northeast-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // ユーザーが存在するか確認
        let dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (!dbUser) {
          // 新規ユーザーの場合
          dbUser = await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name,
            },
          });

          // 初期クレジットを付与（1000円）
          await prisma.credit.create({
            data: {
              userId: dbUser.id,
              amount: 1000,
              type: 'initial',
              description: '初期クレジット',
            },
          });

          // AWS Organizations でアカウントを作成
          const createAccountResponse = await organizations.send(
            new CreateAccountCommand({
              Email: user.email!,
              AccountName: `TeAI-${dbUser.id}`,
            })
          );

          const awsAccountId = createAccountResponse.CreateAccountStatus?.AccountId;

          if (awsAccountId) {
            // AWSアカウント情報を保存
            await prisma.aWSAccount.create({
              data: {
                userId: dbUser.id,
                awsAccountId: awsAccountId,
                accountName: `TeAI-${dbUser.id}`,
                status: 'creating',
              },
            });

            // ユーザーレコードを更新
            await prisma.user.update({
              where: { id: dbUser.id },
              data: { awsAccountId },
            });
          }
        }

        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: session.user.email! },
          include: {
            credits: true,
            awsAccounts: true,
          },
        });

        if (dbUser) {
          session.user.id = dbUser.id;
          session.user.credits = dbUser.credits;
          session.user.awsAccounts = dbUser.awsAccounts;
        }
      }
      return session;
    },
  },
};
