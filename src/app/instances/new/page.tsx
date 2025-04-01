'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ServerIcon } from '@heroicons/react/24/outline';

const instanceTypes = [
  {
    id: 'basic',
    name: 'Basic',
    description: '小規模なアプリケーション向け',
    specs: {
      cpu: '2 vCPU',
      memory: '4 GB',
      storage: '50 GB',
    },
    price: '¥5,000/月',
  },
  {
    id: 'standard',
    name: 'Standard',
    description: '中規模なアプリケーション向け',
    specs: {
      cpu: '4 vCPU',
      memory: '8 GB',
      storage: '100 GB',
    },
    price: '¥10,000/月',
  },
  {
    id: 'premium',
    name: 'Premium',
    description: '大規模なアプリケーション向け',
    specs: {
      cpu: '8 vCPU',
      memory: '16 GB',
      storage: '200 GB',
    },
    price: '¥20,000/月',
  },
];

export default function NewInstancePage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: インスタンス作成APIを呼び出す
      await new Promise(resolve => setTimeout(resolve, 2000)); // モック用の遅延
      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to create instance:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B1120] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            新規インスタンスの作成
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            アプリケーションに最適なインスタンスタイプを選択してください。
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-8">
            <div>
              <label className="text-base font-medium text-gray-900 dark:text-white">
                インスタンスタイプ
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                用途に応じて最適なタイプをお選びください。
              </p>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {instanceTypes.map((type) => (
                  <div
                    key={type.id}
                    className={`relative rounded-lg border p-4 cursor-pointer ${
                      selectedType === type.id
                        ? 'border-indigo-600 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-900/30'
                        : 'border-gray-300 dark:border-gray-700'
                    }`}
                    onClick={() => setSelectedType(type.id)}
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <ServerIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {type.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {type.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 space-y-1">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        CPU: {type.specs.cpu}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        メモリ: {type.specs.memory}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        ストレージ: {type.specs.storage}
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {type.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                インスタンス名
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:text-white"
                  placeholder="my-app"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => router.back()}
                className="mr-4 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 px-4 text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                キャンセル
              </button>
              <button
                type="submit"
                disabled={!selectedType || isLoading}
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '作成中...' : 'インスタンスを作成'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}