
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import DashboardClientUpdated from '@/components/dashboard-client-updated';
import ClientOnly from '@/components/client-only';
import { Calculator } from 'lucide-react';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <ClientOnly
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <Calculator className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Carregando Dashboard...</h1>
          </div>
        </div>
      }
    >
      <DashboardClientUpdated />
    </ClientOnly>
  );
}
