'use client';

import { useState, useEffect } from 'react';
import { PlusIcon, ServerIcon, CloudIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { SecureConfigList } from '@/components/env/SecureConfigList';

interface OpenHandsInstance {
  id: string;
  name: string;
  type: string;
  status: string;
  region: string;
  url: string;
}

interface AwsServer {
  id: string;
  name: string;
  type: string;
  status: string;
  region: string;
  ip: string;
}

const mockAwsServers: AwsServer[] = [
  {
    id: 'i-1234567890abcdef0',
    name: 'Production API Server',
    type: 't3.medium',
    status: 'running',
    region: 'ap-northeast-1',
    ip: '13.xxx.xxx.xxx',
  },
  {
    id: 'i-0987654321fedcba0',
    name: 'Staging Environment',
    type: 't3.small',
    status: 'stopped',
    region: 'ap-northeast-1',
    ip: '18.xxx.xxx.xxx',
  },
];

export default function DashboardPage() {
  const [openHandsInstances, setOpenHandsInstances] = useState<OpenHandsInstance[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [awsServers] = useState(mockAwsServers);

  useEffect(() => {
    const fetchInstances = async () => {
      try {
        const response = await fetch('/api/instances');
        if (response.ok) {
          const data = await response.json();
          setOpenHandsInstances(data);
        }
      } catch (error) {
        console.error('Failed to fetch instances:', error);
      }
    };

    fetchInstances();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B1120] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* OpenHands Instances Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              OpenHands インスタンス
            </h2>
            {openHandsInstances.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="text-center">
                  <ServerIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                  <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
                    インスタンスがありません
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    新しいインスタンスを作成して始めましょう
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={async () => {
                        if (isLoading) return;
                        setIsLoading(true);
                        try {
                          const response = await fetch('/api/instances', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              name: `instance-${Date.now()}`,
                              type: 'basic',
                            }),
                          });

                          if (!response.ok) {
                            throw new Error('Failed to create instance');
                          }

                          const newInstance = await response.json();
                          setOpenHandsInstances([...openHandsInstances, newInstance]);
                        } catch (error) {
                          console.error('Failed to create instance:', error);
                          alert('インスタンスの作成に失敗しました');
                        } finally {
                          setIsLoading(false);
                        }
                      }}
                      disabled={isLoading}
                      className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
                      {isLoading ? '作成中...' : 'インスタンスを作成'}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                {/* インスタンス一覧（実装時に追加） */}
              </div>
            )}
          </div>

          {/* AWS Servers Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              AWS サーバー
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        名前
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        インスタンスタイプ
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        ステータス
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        リージョン
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        IP アドレス
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {awsServers.map((server) => (
                      <tr key={server.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          <div className="flex items-center">
                            <CloudIcon className="flex-shrink-0 h-5 w-5 text-gray-400 dark:text-gray-500 mr-2" />
                            {server.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {server.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            server.status === 'running'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                          }`}>
                            {server.status === 'running' ? '稼働中' : '停止中'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {server.region}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {server.ip}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Environment Variables Section */}
          <div>
            <SecureConfigList />
          </div>
        </div>
      </div>
    </div>
  );
}