'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 p-1 rounded-lg bg-gray-100 dark:bg-gray-800">
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded-md transition-colors ${
          theme === 'light'
            ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
            : 'hover:bg-white/50 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-400'
        }`}
        title="ライトモード"
      >
        <SunIcon className="h-5 w-5" />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`p-2 rounded-md transition-colors ${
          theme === 'system'
            ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
            : 'hover:bg-white/50 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-400'
        }`}
        title="システム設定に従う"
      >
        <ComputerDesktopIcon className="h-5 w-5" />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded-md transition-colors ${
          theme === 'dark'
            ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
            : 'hover:bg-white/50 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-400'
        }`}
        title="ダークモード"
      >
        <MoonIcon className="h-5 w-5" />
      </button>
    </div>
  );
}