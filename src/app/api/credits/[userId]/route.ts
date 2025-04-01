import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;

    // クレジット履歴を取得
    const credits = await prisma.credit.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    // 合計クレジットを計算
    const total = credits.reduce((sum, credit) => {
      if (credit.type === 'charge' || credit.type === 'initial') {
        return sum + credit.amount;
      } else {
        return sum - credit.amount;
      }
    }, 0);

    return NextResponse.json({
      total,
      history: credits,
    });
  } catch (error) {
    console.error('Failed to fetch credits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch credits' },
      { status: 500 }
    );
  }
}
