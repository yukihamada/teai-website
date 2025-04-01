import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { options } from '../auth/[...nextauth]/options';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(options);
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { name, type } = body;

    // TODO: 実際のインスタンス作成ロジックを実装
    // 現在はモックレスポンスを返す
    const instance = {
      id: `inst-${Date.now()}`,
      name,
      type,
      status: 'creating',
      created_at: new Date().toISOString(),
      user_id: session.user.id,
    };

    // 実際のAPIでは、ここでインスタンスを作成し、DBに保存する
    console.log('Creating instance:', instance);

    return NextResponse.json(instance);
  } catch (error) {
    console.error('Failed to create instance:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(options);
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // TODO: 実際のインスタンス一覧取得ロジックを実装
    // 現在はモックデータを返す
    const instances: {
      id: string;
      name: string;
      type: string;
      status: string;
      created_at: string;
      user_id: string;
    }[] = [];

    return NextResponse.json(instances);
  } catch (error) {
    console.error('Failed to fetch instances:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}