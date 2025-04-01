'use client';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            ドキュメント
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            TeAI.ioの使い方やAPIリファレンスを確認できます。
          </p>
        </div>
        <div className="mt-12">
          {/* ドキュメントのコンテンツをここに追加 */}
        </div>
      </div>
    </div>
  );
}