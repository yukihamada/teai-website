'use client';

import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ClipboardDocumentIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';

const apiExamples = {
  python: `import teai

# Initialize the client
client = teai.Client(api_key="your-api-key")

# Create a new instance
instance = client.instances.create(
    name="my-app",
    model="gpt-4",
    memory=8,
    storage=50
)

# Get instance status
status = instance.status()
print(f"Instance status: {status}")

# Send a request to the instance
response = instance.chat.complete(
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "What is OpenHands?"}
    ]
)
print(response.choices[0].message.content)`,

  javascript: `import { TeAI } from '@teai/sdk';

// Initialize the client
const client = new TeAI('your-api-key');

// Create a new instance
const instance = await client.instances.create({
  name: 'my-app',
  model: 'gpt-4',
  memory: 8,
  storage: 50
});

// Get instance status
const status = await instance.status();
console.log('Instance status:', status);

// Send a request to the instance
const response = await instance.chat.complete({
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'What is OpenHands?' }
  ]
});
console.log(response.choices[0].message.content);`,

  curl: `# Create a new instance
curl -X POST "https://api.teai.io/v1/instances" \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "my-app",
    "model": "gpt-4",
    "memory": 8,
    "storage": 50
  }'

# Get instance status
curl "https://api.teai.io/v1/instances/my-app/status" \\
  -H "Authorization: Bearer your-api-key"

# Send a request to the instance
curl -X POST "https://api.teai.io/v1/chat/completions" \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "What is OpenHands?"}
    ]
  }'`,
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function APIReference() {
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B1120] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            APIリファレンス
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            TeAI.ioのAPIを使用して、OpenHandsインスタンスを管理し、AIモデルとやり取りします。
          </p>

          <div className="mt-12">
            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 dark:bg-gray-800 p-1">
                {Object.keys(apiExamples).map((language) => (
                  <Tab
                    key={language}
                    className={({ selected }) =>
                      classNames(
                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                        'ring-white/60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2',
                        selected
                          ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-white/[0.12] hover:text-gray-800 dark:hover:text-white'
                      )
                    }
                    onClick={() => setSelectedLanguage(language)}
                  >
                    {language.charAt(0).toUpperCase() + language.slice(1)}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="mt-4">
                {Object.entries(apiExamples).map(([language, code]) => (
                  <Tab.Panel
                    key={language}
                    className={classNames(
                      'rounded-xl bg-white dark:bg-gray-800 p-3',
                      'ring-white/60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2'
                    )}
                  >
                    <div className="relative">
                      <CopyToClipboard text={code} onCopy={handleCopy}>
                        <button
                          className="absolute right-2 top-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                          title="コードをコピー"
                        >
                          {copied ? (
                            <ClipboardDocumentCheckIcon className="h-5 w-5 text-green-500" />
                          ) : (
                            <ClipboardDocumentIcon className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </CopyToClipboard>
                      <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto p-4">
                        <code>{code}</code>
                      </pre>
                    </div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              認証
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              APIリクエストには、APIキーを使用した認証が必要です。APIキーは、ダッシュボードの設定ページで取得できます。
            </p>
            <div className="mt-4 rounded-md bg-gray-100 dark:bg-gray-800 p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                すべてのAPIリクエストには、以下のヘッダーが必要です：
              </p>
              <pre className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                <code>Authorization: Bearer your-api-key</code>
              </pre>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              レート制限
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              APIリクエストには、以下のレート制限が適用されます：
            </p>
            <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-400">
              <li>• 無料プラン: 60リクエスト/分</li>
              <li>• Proプラン: 300リクエスト/分</li>
              <li>• Enterpriseプラン: カスタム</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}