import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;

    // クレジット残高を取得
    const credits = await prisma.credit.findMany({
      where: { userId },
    });

    const totalCredit = credits.reduce((sum, credit) => {
      if (credit.type === 'charge' || credit.type === 'initial') {
        return sum + credit.amount;
      } else {
        return sum - credit.amount;
      }
    }, 0);

    // アクティブなインスタンス数を取得
    const activeInstances = await prisma.instance.count({
      where: {
        userId,
        status: 'running',
      },
    });

    // 今月の利用額を取得
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const usageCredits = await prisma.credit.findMany({
      where: {
        userId,
        type: 'usage',
        createdAt: {
          gte: startOfMonth,
        },
      },
    });

    const totalSpent = usageCredits.reduce((sum, credit) => sum + credit.amount, 0);

    return NextResponse.json({
      totalCredit,
      activeInstances,
      totalSpent,
    });
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
