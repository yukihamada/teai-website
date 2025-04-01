import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { options } from '../auth/[...nextauth]/options';
import crypto from 'crypto';

// 暗号化キー（本番環境では環境変数から取得）
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-secret-key-32-characters-long';
const IV_LENGTH = 16;

function encrypt(text: string) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text: string) {
  const [ivHex, encryptedHex] = text.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const encrypted = Buffer.from(encryptedHex, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encrypted);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

function generateShareId() {
  return `share-${crypto.randomBytes(16).toString('hex')}`;
}

function generateUrl(shareId: string) {
  return `${process.env.NEXTAUTH_URL}/api/secure-configs/${shareId}`;
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(options);
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { name, description, variables } = body;

    // 環境変数の値を暗号化
    const encryptedVariables = variables.map((v: any) => ({
      ...v,
      value: encrypt(v.value),
    }));

    // 共有IDとURLを生成
    const shareId = generateShareId();
    const generatedUrl = generateUrl(shareId);

    // プロンプトを生成
    const prompt = `環境変数の設定:
${variables.map((v: any) => `${v.key}=${v.value}`).join('\n')}

この設定を使用するには、以下のURLにアクセスしてください：
${generatedUrl}`;

    // TODO: データベースに保存
    const config = {
      id: `config-${Date.now()}`,
      name,
      description,
      variables: encryptedVariables,
      shareId,
      generatedUrl,
      prompt,
      createdAt: new Date().toISOString(),
      userId: session.user.id,
    };

    return NextResponse.json(config);
  } catch (error) {
    console.error('Failed to create secure config:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(options);
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // TODO: データベースから取得
    const configs: any[] = [];

    // 値を復号化して返す
    const decryptedConfigs = configs.map(config => ({
      ...config,
      variables: config.variables.map((v: any) => ({
        ...v,
        value: decrypt(v.value),
      })),
    }));

    return NextResponse.json(decryptedConfigs);
  } catch (error) {
    console.error('Failed to fetch secure configs:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}