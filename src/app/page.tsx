import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'ワンクリックデプロイ',
    description: '数クリックでOpenHandsインスタンスを起動。面倒な設定は必要ありません。',
    icon: (
      <svg className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: 'セキュアな環境',
    description: 'SSL証明書の自動発行、WAF保護、セキュリティアップデートの自動適用。',
    icon: (
      <svg className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: '自動スケーリング',
    description: 'トラフィックに応じて自動的にスケール。パフォーマンスを常に最適に。',
    icon: (
      <svg className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: '24/7モニタリング',
    description: 'リアルタイムの監視とアラート。問題が発生する前に検知。',
    icon: (
      <svg className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 2.5c-1.31 0-2.526.386-3.546 1.051a.75.75 0 01-.82-1.256A8 8 0 0118 9a22.47 22.47 0 01-1.228 7.351.75.75 0 11-1.417-.49A20.97 20.97 0 0016.5 9 6.5 6.5 0 0010 2.5zM4.333 4.416a.75.75 0 01.218 1.038A6.466 6.466 0 003.5 9a7.966 7.966 0 01-1.293 4.362.75.75 0 01-1.257-.819A6.466 6.466 0 002 9c0-1.61.476-3.11 1.295-4.365a.75.75 0 011.038-.219zM10 6.12a3 3 0 00-3.001 3.041 11.455 11.455 0 01-2.697 7.24.75.75 0 01-1.148-.965A9.957 9.957 0 005.5 9c0-.028.002-.055.004-.082a4.5 4.5 0 018.996.084V9c0 2.275-.765 4.43-2.154 6.196a.75.75 0 11-1.147-.965A9.957 9.957 0 0013.5 9c0-.028-.002-.055-.004-.082A3 3 0 0010 6.12z" clipRule="evenodd" />
      </svg>
    ),
  },
]

const plans = [
  {
    name: 'Free',
    price: '¥0',
    description: '個人開発者向け',
    features: [
      '1インスタンス',
      '5GB ストレージ',
      '12時間/日の稼働制限',
      'コミュニティサポート',
    ],
    cta: '無料で始める',
    href: '/register',
  },
  {
    name: 'Pro',
    price: '¥9,800',
    description: 'スタートアップ向け',
    features: [
      '3インスタンス',
      '50GB ストレージ',
      '24時間稼働',
      'メールサポート',
      'GitHub連携',
      'カスタムドメイン',
    ],
    cta: '14日間無料トライアル',
    href: '/register?plan=pro',
  },
  {
    name: 'Enterprise',
    price: 'カスタム',
    description: '大規模プロジェクト向け',
    features: [
      '無制限インスタンス',
      'カスタムストレージ',
      '24時間稼働',
      '専任サポート',
      'SLA保証',
      'カスタム機能開発',
    ],
    cta: '営業に問い合わせ',
    href: '/contact',
  },
]

export default function Home() {
  return (
    <div className="bg-white dark:bg-[#0B1120]">
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10 overflow-hidden dark:bg-[#0B1120]">
        <div className="absolute -top-[50vh] left-0 right-0 h-[200vh]" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.05) 0%, rgba(99, 102, 241, 0) 100%)' }} />
        <div className="absolute inset-x-0 top-0 h-96 blur-[100px] bg-gradient-to-b from-indigo-100/20 dark:from-indigo-900/30" />
        <div className="absolute -left-[50vw] top-0 h-[200vh] w-[100vw] dark:bg-[linear-gradient(to_right,#0B1120_1px,transparent_1px),linear-gradient(to_bottom,#0B1120_1px,transparent_1px)] dark:bg-[size:4rem_4rem] dark:[mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Hero section */}
      <div className="relative isolate overflow-hidden pt-14">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <div className="flex">
              <div className="relative flex items-center gap-x-4 rounded-full px-4 py-1 text-sm leading-6 text-gray-600 dark:text-gray-300 ring-1 ring-gray-900/10 dark:ring-gray-100/10 hover:ring-gray-900/20 dark:hover:ring-gray-100/20">
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">新登場</span>
                <span className="h-4 w-px bg-gray-900/10 dark:bg-gray-100/10" aria-hidden="true" />
                <a href="#" className="flex items-center gap-x-1">
                  <span className="absolute inset-0" aria-hidden="true" />
                  プレビュー版を試す
                  <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
            </div>
            <h1 className="mt-10 max-w-lg text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              OpenHandsを
              <br />
              クラウドで簡単に
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              TeAI.ioは、OpenHandsのホスティングサービスを提供します。
              インフラ管理から解放され、AIアプリケーションの開発に集中できます。
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                href="/register"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                無料で始める
              </Link>
              <Link href="/docs" className="text-sm font-semibold leading-6 text-gray-900">
                ドキュメントを見る <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
            <div className="relative mx-auto w-full max-w-xl lg:max-w-lg">
              <div className="absolute -top-8 -left-8 w-72 h-72 bg-indigo-50 rounded-full mix-blend-multiply opacity-70 animate-blob" />
              <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply opacity-70 animate-blob animation-delay-2000" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-indigo-50 to-indigo-100 shadow-2xl" />
              <div className="relative rounded-2xl bg-[#1a1b26] dark:bg-[#0B1120] overflow-hidden border border-gray-200/10 dark:border-gray-700/30">
                <div className="flex bg-[#24283b] dark:bg-[#0B1120] px-4 py-2 items-center gap-2 border-b border-gray-200/10 dark:border-gray-700/30">
                  <div className="w-3 h-3 rounded-full bg-red-500/90" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/90" />
                  <div className="w-3 h-3 rounded-full bg-green-500/90" />
                  <div className="ml-2 text-sm text-gray-400">Terminal</div>
                </div>
                <div className="p-6">
                  <pre className="text-sm text-gray-300 dark:text-gray-200 font-mono">
                    <code>{`$ teai create instance
<span class="text-blue-400 dark:text-blue-300">Creating new instance...</span> ⚡️
<span class="text-green-400 dark:text-green-300">✨ Instance "my-app" is ready!</span>
<span class="text-yellow-400 dark:text-yellow-300">🚀 Access your app at https://my-app.teai.io</span>

$ teai list instances
NAME     STATUS    URL
my-app   <span class="text-green-400 dark:text-green-300">Running</span>   https://my-app.teai.io

$ teai logs my-app
<span class="text-gray-500 dark:text-gray-400">[2025-04-01 01:23:45]</span> Server started on port 3000
<span class="text-gray-500 dark:text-gray-400">[2025-04-01 01:23:46]</span> Connected to database
<span class="text-gray-500 dark:text-gray-400">[2025-04-01 01:23:47]</span> Loading AI models...
<span class="text-gray-500 dark:text-gray-400">[2025-04-01 01:23:48]</span> <span class="text-green-400 dark:text-green-300">✓</span> All systems operational
`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">より速く、より簡単に</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            OpenHandsをクラウドで
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            インフラ管理の煩わしさから解放され、アプリケーション開発に集中できます。
            スケーリング、監視、バックアップなど、すべておまかせください。
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="relative flex flex-col group">
                <div className="absolute -inset-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <dt className="relative flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600/10 dark:bg-indigo-400/10 group-hover:bg-indigo-600/20 dark:group-hover:bg-indigo-400/20 transition-colors">
                    {feature.icon}
                  </div>
                  {feature.name}
                </dt>
                <dd className="relative mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-400">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Pricing section */}
      <div className="py-24 sm:pt-48">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">料金プラン</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              シンプルな料金体系
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600 dark:text-gray-400">
            必要な分だけ支払い、スケールアップも簡単です。
            まずは14日間の無料トライアルからお試しください。
          </p>
          <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {plans.map((plan, planIdx) => (
              <div
                key={plan.name}
                className={`relative flex flex-col justify-between rounded-3xl bg-white dark:bg-gray-800/50 p-8 ring-1 ring-gray-200 dark:ring-gray-700 backdrop-blur-sm xl:p-10 ${
                  planIdx === 1 ? 'lg:z-10 lg:rounded-b-none' : ''
                } ${planIdx === 0 ? 'lg:rounded-r-none' : ''} ${
                  planIdx === 2 ? 'lg:rounded-l-none' : ''
                }`}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent dark:via-indigo-400/50" />
                <div>
                  <div className="flex items-center justify-between gap-x-4">
                    <h3 className="text-lg font-semibold leading-8 text-gray-900 dark:text-white">{plan.name}</h3>
                    {planIdx === 1 ? (
                      <p className="rounded-full bg-indigo-600/10 dark:bg-indigo-400/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600 dark:text-indigo-400">
                        Most popular
                      </p>
                    ) : null}
                  </div>
                  <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-400">{plan.description}</p>
                  <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{plan.price}</span>
                    {planIdx !== 2 && <span className="text-sm font-semibold leading-6 text-gray-600 dark:text-gray-400">/月</span>}
                  </p>
                  <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <svg className="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={plan.href}
                  className={`relative mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    planIdx === 1
                      ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400'
                      : 'text-indigo-600 dark:text-indigo-400 ring-1 ring-inset ring-indigo-200 dark:ring-indigo-400/20 hover:ring-indigo-300 dark:hover:ring-indigo-400/40'
                  }`}
                >
                  <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent dark:via-indigo-400/50" />
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="relative isolate mt-32 px-6 py-32 sm:mt-56 sm:py-40 lg:px-8">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-[calc(50%-19rem)] top-[calc(50%-36rem)] transform-gpu blur-3xl">
            <div
              className="aspect-[1097/1023] w-[68.5625rem] bg-gradient-to-r from-[#ff4694]/10 to-[#776fff]/10 dark:from-[#ff4694]/5 dark:to-[#776fff]/5"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            今すぐ始めましょう
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-400">
            14日間の無料トライアルで、TeAI.ioの機能を体験してください。
            クレジットカードは必要ありません。
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/register"
              className="relative rounded-md bg-indigo-600 dark:bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 dark:hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 group"
            >
              <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-[#ff4694]/50 to-[#776fff]/50 dark:from-[#ff4694]/30 dark:to-[#776fff]/30 opacity-0 group-hover:opacity-100 transition-opacity blur" />
              <span className="relative">無料で始める</span>
            </Link>
            <Link href="/contact" className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
              お問い合わせ <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}