'use client';

import { useState, useEffect } from 'react';
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const services = [
  {
    name: 'API',
    description: 'REST APIエンドポイント',
    status: 'operational',
    uptime: '99.99%',
    latency: '45ms',
  },
  {
    name: 'インスタンス管理',
    description: 'インスタンスの作成、更新、削除',
    status: 'operational',
    uptime: '99.95%',
    latency: '120ms',
  },
  {
    name: 'モデルサービス',
    description: 'AIモデルの推論サービス',
    status: 'operational',
    uptime: '99.90%',
    latency: '250ms',
  },
  {
    name: 'ストレージ',
    description: 'データストレージサービス',
    status: 'operational',
    uptime: '99.99%',
    latency: '85ms',
  },
  {
    name: 'モニタリング',
    description: 'メトリクス収集と分析',
    status: 'operational',
    uptime: '99.95%',
    latency: '150ms',
  },
  {
    name: '認証',
    description: 'ユーザー認証とアクセス制御',
    status: 'operational',
    uptime: '99.99%',
    latency: '65ms',
  },
];

const incidents = [
  {
    date: '2025-03-30',
    title: 'APIレイテンシーの一時的な上昇',
    description: '一部のリージョンでAPIレイテンシーが上昇しました。原因を特定し、対応済みです。',
    status: 'resolved',
    duration: '15分',
  },
  {
    date: '2025-03-25',
    title: 'モデルサービスの部分的な遅延',
    description: '大規模なトラフィック増加により、一部のモデルサービスで遅延が発生しました。スケールアップにより解決しました。',
    status: 'resolved',
    duration: '25分',
  },
];

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-sm font-medium ring-1 ring-inset ${
        status === 'operational'
          ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 ring-green-600/20 dark:ring-green-300/20'
          : 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 ring-yellow-600/20 dark:ring-yellow-300/20'
      }`}
    >
      {status === 'operational' ? (
        <CheckCircleIcon className="mr-1.5 h-4 w-4" />
      ) : (
        <ExclamationTriangleIcon className="mr-1.5 h-4 w-4" />
      )}
      {status === 'operational' ? '正常' : '障害発生中'}
    </span>
  );
}

export default function Status() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B1120] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              システムステータス
            </h1>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              最終更新: {currentTime.toLocaleTimeString()}
            </div>
          </div>

          <div className="mt-8">
            <div className="rounded-xl bg-white dark:bg-gray-800 shadow-sm ring-1 ring-gray-900/5 dark:ring-gray-700">
              <div className="p-6">
                <h2 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                  現在のステータス
                </h2>
                <div className="mt-2 divide-y divide-gray-100 dark:divide-gray-700">
                  {services.map((service) => (
                    <div
                      key={service.name}
                      className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 sm:gap-6"
                    >
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {service.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {service.description}
                        </p>
                      </div>
                      <div className="sm:text-right">
                        <StatusBadge status={service.status} />
                        <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          <span className="mr-4">Uptime: {service.uptime}</span>
                          <span>Latency: {service.latency}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              最近のインシデント
            </h2>
            <div className="mt-4 space-y-6">
              {incidents.map((incident) => (
                <div
                  key={incident.date + incident.title}
                  className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-sm ring-1 ring-gray-900/5 dark:ring-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {incident.title}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {incident.date}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {incident.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                        incident.status === 'resolved'
                          ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 ring-1 ring-inset ring-green-600/20 dark:ring-green-300/20'
                          : ''
                      }`}
                    >
                      {incident.status === 'resolved' ? '解決済み' : '対応中'}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      影響時間: {incident.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}