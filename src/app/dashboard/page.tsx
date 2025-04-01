'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { data: session } = useSession();
  const [totalCredit, setTotalCredit] = useState(0);

  useEffect(() => {
    if (session?.user?.credits) {
      const total = session.user.credits.reduce((sum, credit) => sum + credit.amount, 0);
      setTotalCredit(total);
    }
  }, [session]);

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            ログインが必要です
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">ダッシュボード</h1>
          
          {/* クレジット情報 */}
          <div className="mt-6">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  クレジット残高
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>{totalCredit.toLocaleString()}円</p>
                </div>
              </div>
            </div>
          </div>

          {/* AWSアカウント情報 */}
          <div className="mt-6">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  AWSアカウント
                </h3>
                <div className="mt-2">
                  {session.user.awsAccounts?.map((account) => (
                    <div
                      key={account.id}
                      className="border-t border-gray-200 mt-4 pt-4 first:border-t-0 first:mt-0 first:pt-0"
                    >
                      <p className="text-sm font-medium text-gray-900">
                        {account.accountName}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        ステータス: {account.status}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        アカウントID: {account.awsAccountId}
                      </p>
                    </div>
                  ))}
                  {!session.user.awsAccounts?.length && (
                    <p className="text-sm text-gray-500">
                      AWSアカウントは作成中です
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
