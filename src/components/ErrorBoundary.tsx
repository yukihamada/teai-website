'use client';

import { useEffect } from 'react';

export function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-100 dark:bg-red-900 mb-4">
          <svg
            className="h-6 w-6 text-red-600 dark:text-red-200"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          エラーが発生しました
        </h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          申し訳ありません。予期せぬエラーが発生しました。
        </p>
        <div className="mt-6">
          <button
            onClick={reset}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            もう一度試す
          </button>
        </div>
      </div>
    </div>
  );
}
