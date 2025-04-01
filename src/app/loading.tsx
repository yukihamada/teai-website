export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
        <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
          読み込み中...
        </h2>
      </div>
    </div>
  );
}
