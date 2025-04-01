import { DefaultSession } from 'next-auth';
import { Credit, AWSAccount } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      credits?: Credit[];
      awsAccounts?: AWSAccount[];
    } & DefaultSession['user'];
  }
}
