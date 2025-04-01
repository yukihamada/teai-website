'use client';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            お問い合わせ
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            ご質問やご相談がありましたら、お気軽にお問い合わせください。
          </p>
        </div>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                お問い合わせフォーム
              </h3>
              <div className="mt-6">
                <form action="#" method="POST" className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      お名前
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      メールアドレス
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      お問い合わせ内容
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      送信
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                その他のお問い合わせ方法
              </h3>
              <div className="mt-6">
                <dl className="space-y-6">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">メール</dt>
                    <dd className="mt-1 text-sm text-gray-900">support@teai.io</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">電話</dt>
                    <dd className="mt-1 text-sm text-gray-900">03-1234-5678</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">営業時間</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      平日 9:00 - 18:00（土日祝日を除く）
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}