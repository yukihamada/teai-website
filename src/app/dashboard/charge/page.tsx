'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ChargePage() {
  const router = useRouter();
  const [amount, setAmount] = useState(1000);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/payments/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'チャージに失敗しました');
      }

      // Stripeのチェックアウトページにリダイレクト
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'チャージに失敗しました');
      setIsLoading(false);
    }
  };

  const predefinedAmounts = [1000, 3000, 5000, 10000];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                クレジットをチャージ
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-400">
                <p>
                  チャージするクレジット額を選択または入力してください。
                  最低チャージ額は1,000円です。
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-5">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {predefinedAmounts.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAmount(preset)}
                      className={`px-4 py-2 border rounded-md text-sm font-medium ${
                        amount === preset
                          ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900'
                          : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      ¥{preset.toLocaleString()}
                    </button>
                  ))}
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    金額を入力
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 dark:text-gray-400 sm:text-sm">¥</span>
                    </div>
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      min="1000"
                      step="100"
                      value={amount}
                      onChange={(e) => setAmount(parseInt(e.target.value, 10))}
                      className="block w-full pl-7 pr-12 sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                {error && (
                  <div className="mt-4 text-red-600 dark:text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isLoading || amount < 1000}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-offset-gray-800"
                  >
                    {isLoading ? '処理中...' : 'チャージする'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
