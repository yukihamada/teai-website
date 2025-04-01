'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  const handleOAuthSignIn = (provider: string) => {
    signIn(provider, { callbackUrl: '/dashboard' });
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
      <div className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {isLogin ? 'ログイン' : '新規登録'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            TeAIへようこそ
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleOAuthSignIn('google')}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-all duration-150 ease-in-out transform hover:scale-[1.02]"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google logo"
              className="h-5 w-5 mr-3"
            />
            <span>Googleで{isLogin ? 'ログイン' : '登録'}</span>
          </button>

          <button
            onClick={() => handleOAuthSignIn('github')}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg text-white bg-gray-900 hover:bg-gray-800 shadow-sm transition-all duration-150 ease-in-out transform hover:scale-[1.02]"
          >
            <svg
              className="h-5 w-5 mr-3"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            <span>GitHubで{isLogin ? 'ログイン' : '登録'}</span>
          </button>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                {isLogin ? '初めての方は' : 'アカウントをお持ちの方は'}
              </span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-150 ease-in-out"
            >
              {isLogin ? '新規登録はこちら' : 'ログインはこちら'}
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-500">
          <p>
            続行することで、
            <Link href="/legal/terms" className="text-indigo-600 hover:text-indigo-500">
              利用規約
            </Link>
            と
            <Link href="/legal/privacy-policy" className="text-indigo-600 hover:text-indigo-500">
              プライバシーポリシー
            </Link>
            に同意したことになります
          </p>
        </div>
      </div>

      <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
        <p className="text-xs text-center text-gray-600">
          ソーシャルログインで自動的に会員登録され、
          <br />
          1,000円分のクレジットが付与されます
        </p>
      </div>
    </div>
  );
}
