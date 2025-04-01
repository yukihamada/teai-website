'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  CreditCardIcon,
  CloudIcon,
  ServerIcon,
  CogIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'ダッシュボード', href: '/dashboard', icon: ServerIcon },
  { name: 'クレジット管理', href: '/dashboard/credits', icon: CreditCardIcon },
  { name: 'AWS管理', href: '/dashboard/aws', icon: CloudIcon },
  { name: '設定', href: '/settings/profile', icon: CogIcon },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 bg-white dark:bg-gray-800 overflow-y-auto">
        <div className="flex-grow flex flex-col">
          <nav className="flex-1 px-2 pb-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-200'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <item.icon
                    className={`mr-3 flex-shrink-0 h-6 w-6 ${
                      isActive
                        ? 'text-indigo-600 dark:text-indigo-200'
                        : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400'
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
