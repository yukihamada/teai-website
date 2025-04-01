import { Sidebar } from '@/components/dashboard/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <main className="py-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
