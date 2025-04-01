'use client';

import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem('theme', theme);

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', systemTheme === 'dark');
    } else {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }, [theme, mounted]);

  if (!mounted) return null;

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

import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { useThemeStore } from '@/lib/store/theme';

export function ThemeToggle() {
  const { isDarkMode, setDarkMode } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isDarkMode === null) {
      // System preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      // User preference
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [isDarkMode]);

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setDarkMode(false)}
        className={`p-2 rounded-lg ${
          isDarkMode === false
            ? 'bg-gray-200 dark:bg-gray-700'
            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
        title="ライトモード"
      >
        <SunIcon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
      </button>
      <button
        onClick={() => setDarkMode(null)}
        className={`p-2 rounded-lg ${
          isDarkMode === null
            ? 'bg-gray-200 dark:bg-gray-700'
            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
        title="システム設定に従う"
      >
        <ComputerDesktopIcon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
      </button>
      <button
        onClick={() => setDarkMode(true)}
        className={`p-2 rounded-lg ${
          isDarkMode === true
            ? 'bg-gray-200 dark:bg-gray-700'
            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
        title="ダークモード"
      >
        <MoonIcon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
      </button>
    </div>
  );
}