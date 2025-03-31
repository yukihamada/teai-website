'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api/endpoints';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function CostBreakdown() {
  const { data: usageCosts, isLoading } = useQuery({
    queryKey: ['usage-costs'],
    queryFn: async () => {
      const response = await api.billing.getUsageCosts();
      return response.data;
    },
  });

  const chartData = {
    labels: ['AI Usage', 'Instances', 'Storage'],
    datasets: [
      {
        label: 'Cost (JPY)',
        data: usageCosts ? [
          usageCosts.ai_usage,
          usageCosts.instances,
          usageCosts.storage,
        ] : [0, 0, 0],
        backgroundColor: [
          'rgba(99, 102, 241, 0.5)',
          'rgba(79, 70, 229, 0.5)',
          'rgba(67, 56, 202, 0.5)',
        ],
        borderColor: [
          'rgb(99, 102, 241)',
          'rgb(79, 70, 229)',
          'rgb(67, 56, 202)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Cost Breakdown</h2>
      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>
      {usageCosts && usageCosts.margin_percentage < 20 && (
        <div className="mt-4 p-4 bg-yellow-50 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Low Profit Margin Alert
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Your current profit margin is {usageCosts.margin_percentage.toFixed(1)}%.
                  Consider optimizing resource usage or upgrading your plan.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}