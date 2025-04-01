import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { AWSOrganizationManager } from '@/lib/aws/organization';

const prisma = new PrismaClient();
const awsOrgManager = new AWSOrganizationManager();

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();

    // 1. ユーザーを作成
    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    });

    // 2. 初期クレジットを付与（1000円）
    await prisma.credit.create({
      data: {
        userId: user.id,
        amount: 1000,
        type: 'initial',
        description: '初期クレジット',
      },
    });

    // 3. AWS Organizations でアカウントを作成
    const awsAccountId = await awsOrgManager.createNewAccount(
      email,
      `TeAI-${user.id}`,
      user.id
    );

    // 4. AWSアカウント情報を保存
    await prisma.aWSAccount.create({
      data: {
        userId: user.id,
        awsAccountId,
        accountName: `TeAI-${user.id}`,
        status: 'active',
      },
    });

    // 5. ユーザーレコードを更新
    await prisma.user.update({
      where: { id: user.id },
      data: { awsAccountId },
    });

    return NextResponse.json({
      user,
      message: '会員登録が完了しました',
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: '会員登録に失敗しました' },
      { status: 500 }
    );
  }
}
