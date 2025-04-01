'use client';

import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const tutorials = [
  {
    title: 'クイックスタート',
    description: '5分で始めるOpenHands。基本的なセットアップから最初のAIアプリケーションの作成まで。',
    duration: '5分',
    level: '初級',
    href: '/tutorials/quickstart',
  },
  {
    title: 'カスタムモデルのデプロイ',
    description: '独自のAIモデルをTeAI.ioにデプロイする方法を学びます。',
    duration: '15分',
    level: '中級',
    href: '/tutorials/custom-model',
  },
  {
    title: 'スケーリングとパフォーマンス',
    description: 'インスタンスのスケーリングとパフォーマンスの最適化について学びます。',
    duration: '20分',
    level: '上級',
    href: '/tutorials/scaling',
  },
  {
    title: 'セキュリティベストプラクティス',
    description: 'OpenHandsインスタンスのセキュリティを強化する方法を学びます。',
    duration: '25分',
    level: '上級',
    href: '/tutorials/security',
  },
  {
    title: 'APIインテグレーション',
    description: '既存のアプリケーションにOpenHands APIを統合する方法を学びます。',
    duration: '30分',
    level: '中級',
    href: '/tutorials/api-integration',
  },
  {
    title: 'モニタリングと分析',
    description: 'インスタンスのパフォーマンスを監視し、分析する方法を学びます。',
    duration: '20分',
    level: '中級',
    href: '/tutorials/monitoring',
  },
];

const levels = {
  初級: 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 ring-green-600/20 dark:ring-green-300/20',
  中級: 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 ring-yellow-600/20 dark:ring-yellow-300/20',
  上級: 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 ring-red-600/20 dark:ring-red-300/20',
};

export default function Tutorials() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B1120] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            チュートリアル
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            OpenHandsの使い方を段階的に学びましょう。初心者から上級者まで、様々なレベルのチュートリアルをご用意しています。
          </p>

          <div className="mt-12 space-y-8">
            {tutorials.map((tutorial) => (
              <Link
                key={tutorial.title}
                href={tutorial.href}
                className="relative block overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-sm transition-all hover:shadow-md"
              >
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent dark:via-indigo-400/50" />
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {tutorial.title}
                    </h2>
                    <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
                      {tutorial.description}
                    </p>
                    <div className="mt-4 flex items-center gap-4">
                      <span className="inline-flex items-center rounded-md bg-gray-50 dark:bg-gray-700 px-2 py-1 text-sm text-gray-600 dark:text-gray-400 ring-1 ring-inset ring-gray-500/10 dark:ring-gray-400/20">
                        {tutorial.duration}
                      </span>
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-1 text-sm ring-1 ring-inset ${
                          levels[tutorial.level as keyof typeof levels]
                        }`}
                      >
                        {tutorial.level}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <ArrowRightIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}