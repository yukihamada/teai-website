import './globals.css';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://teai.io'),
  title: {
    default: 'TeAI - AI開発者のためのクラウドプラットフォーム',
    template: '%s | TeAI'
  },
  description: 'TeAIは、AI開発者のためのクラウドプラットフォームです。AWSアカウントの自動作成、クレジット管理、インスタンス管理などの機能を提供します。',
  keywords: [
    'AI',
    'クラウド',
    'AWS',
    '開発者',
    'インスタンス管理',
    'クレジット管理',
    'TeAI',
    'クラウドプラットフォーム'
  ],
  authors: [{ name: 'TeAI' }],
  creator: 'TeAI',
  publisher: 'TeAI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://teai.io',
    siteName: 'TeAI',
    title: 'TeAI - AI開発者のためのクラウドプラットフォーム',
    description: 'TeAIは、AI開発者のためのクラウドプラットフォームです。AWSアカウントの自動作成、クレジット管理、インスタンス管理などの機能を提供します。',
    images: [
      {
        url: '/images/teai-logo.png',
        width: 1200,
        height: 630,
        alt: 'TeAI Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TeAI - AI開発者のためのクラウドプラットフォーム',
    description: 'TeAIは、AI開発者のためのクラウドプラットフォームです。AWSアカウントの自動作成、クレジット管理、インスタンス管理などの機能を提供します。',
    images: ['/images/teai-logo.png'],
    creator: '@teai_official',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
