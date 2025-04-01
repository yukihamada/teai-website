import { NextResponse } from 'next/server';
import { api } from '@/lib/api/endpoints';

export async function POST(request: Request) {
  try {
    const { email, password, fullName } = await request.json();

    const response = await api.auth.register(
      email,
      password,
      fullName
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 400 }
    );
  }
}