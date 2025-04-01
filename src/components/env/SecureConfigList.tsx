'use client';

import { useState } from 'react';
import { KeyIcon, ClipboardIcon, ShareIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { AddConfigModal } from './AddConfigModal';

interface SecureConfig {
  id: string;
  name: string;
  description?: string;
  variables: {
    key: string;
    value: string;
    description?: string;
  }[];
  generatedUrl: string;
  prompt: string;
  shareId: string;
  createdAt: string;
}

export function SecureConfigList() {
  const [configs, setConfigs] = useState<SecureConfig[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showValues, setShowValues] = useState<Record<string, boolean>>({});
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates({ ...copiedStates, [id]: true });
      setTimeout(() => {
        setCopiedStates({ ...copiedStates, [id]: false });
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const toggleValueVisibility = (configId: string) => {
    setShowValues({ ...showValues, [configId]: !showValues[configId] });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">環境変数・鍵の管理</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <KeyIcon className="-ml-1 mr-2 h-5 w-5" />
          新しい設定を追加
        </button>
      </div>

      <div className="space-y-4">
        {configs.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
            <KeyIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
              設定がありません
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              新しい環境変数や鍵の設定を追加してください
            </p>
          </div>
        ) : (
          configs.map((config) => (
            <div
              key={config.id}
              className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {config.name}
                  </h3>
                  {config.description && (
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {config.description}
                    </p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleCopy(config.generatedUrl, `url-${config.id}`)}
                    className="inline-flex items-center p-1 border border-transparent rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
                    title="URLをコピー"
                  >
                    <ClipboardIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleCopy(config.shareId, `share-${config.id}`)}
                    className="inline-flex items-center p-1 border border-transparent rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
                    title="共有IDをコピー"
                  >
                    <ShareIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <div className="space-y-2">
                  {config.variables.map((variable) => (
                    <div
                      key={variable.key}
                      className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-md p-2"
                    >
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {variable.key}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {showValues[config.id] ? variable.value : '••••••••'}
                        </div>
                      </div>
                      <button
                        onClick={() => toggleValueVisibility(config.id)}
                        className="ml-2 text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
                      >
                        {showValues[config.id] ? (
                          <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                作成日: {new Date(config.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>

      <AddConfigModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={(newConfig) => {
          setConfigs([...configs, newConfig]);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}