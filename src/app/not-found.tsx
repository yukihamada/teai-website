import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-9xl font-extrabold text-indigo-600 dark:text-indigo-400">404</h1>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            ページが見つかりません
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            お探しのページは存在しないか、移動した可能性があります。
          </p>
        </div>
        <div>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
