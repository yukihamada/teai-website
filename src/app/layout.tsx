import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/providers/theme-provider';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://teai.io'),
  title: {
    default: 'TeAI - AI開発者のためのクラウドプラットフォーム',
    template: '%s | TeAI'
  },
  description: 'TeAIは、AI開発者のためのクラウドプラットフォームです。AWSアカウントの自動作成、クレジット管理、インスタンス管理などの機能を提供します。',
  keywords: ['AI', 'クラウド', 'AWS', '開発者', 'インスタンス管理', 'クレジット管理'],
  icons: {
    icon: ['/favicon.ico'],
    apple: ['/apple-touch-icon.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
