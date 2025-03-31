'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { UsageStats } from '@/components/dashboard/UsageStats';
import { CostBreakdown } from '@/components/dashboard/CostBreakdown';
import { InstanceList } from '@/components/instances/InstanceList';

export default function DashboardPage() {
  const router = useRouter();
  const { user, fetchUser } = useAuthStore();

  useEffect(() => {
    if (!user) {
      fetchUser().catch(() => {
        router.push('/login');
      });
    }
  }, [user, fetchUser, router]);

  if (!user) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Overview of your OpenHands instances and usage
          </p>
        </div>

        <UsageStats />
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <CostBreakdown />
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900">Active Instances</h2>
            <InstanceList />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}