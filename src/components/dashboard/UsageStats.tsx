'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api/endpoints';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

const stats = [
  { name: 'AI Usage', unit: 'tokens' },
  { name: 'Active Instances', unit: 'instances' },
  { name: 'Storage Used', unit: 'GB' },
  { name: 'Estimated Cost', unit: 'JPY' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function UsageStats() {
  const { data: usageCosts, isLoading } = useQuery({
    queryKey: ['usage-costs'],
    queryFn: async () => {
      const response = await api.billing.getUsageCosts();
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="animate-pulse bg-white shadow rounded-lg px-4 py-5">
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  const getStatValue = (name: string) => {
    if (!usageCosts) return { value: 0, change: 0 };

    switch (name) {
      case 'AI Usage':
        return {
          value: Math.round(usageCosts.ai_usage * 1000),
          change: 12,
        };
      case 'Active Instances':
        return {
          value: 2,
          change: 0,
        };
      case 'Storage Used':
        return {
          value: Math.round(usageCosts.storage),
          change: 5.4,
        };
      case 'Estimated Cost':
        return {
          value: Math.round(usageCosts.total),
          change: -3.2,
        };
      default:
        return { value: 0, change: 0 };
    }
  };

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const { value, change } = getStatValue(stat.name);
        return (
          <div
            key={stat.name}
            className="bg-white shadow rounded-lg px-4 py-5"
          >
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 truncate">
                  {stat.name}
                </p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">
                  {value.toLocaleString()} {stat.unit}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <div
                  className={classNames(
                    change > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                    'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0'
                  )}
                >
                  {change > 0 ? (
                    <ArrowUpIcon
                      className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <ArrowDownIcon
                      className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
                      aria-hidden="true"
                    />
                  )}
                  {Math.abs(change)}%
                </div>
                <p className="text-xs text-gray-500">vs last month</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}