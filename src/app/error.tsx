'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-6xl font-extrabold text-red-600 dark:text-red-400">
            エラー
          </h1>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            予期せぬエラーが発生しました
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            申し訳ありません。問題が発生しました。
          </p>
        </div>
        <div>
          <button
            onClick={reset}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            もう一度試す
          </button>
        </div>
      </div>
    </div>
  );
}
