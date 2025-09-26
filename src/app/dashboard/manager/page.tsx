'use client';

import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ManagerDashboard from '@/components/ManagerDashboard';

export default function ManagerDashboardPage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
        return;
      }
      
      if (profile?.roles !== 'manager') {
        // Redirect to appropriate dashboard based on role
        switch (profile?.roles) {
          case 'owner':
            router.push('/dashboard/owner');
            break;
          case 'technician':
            router.push('/dashboard/lift-worker');
            break;
          case 'front_desk':
            router.push('/dashboard/front-desk');
            break;
          default:
            router.push('/login');
        }
        return;
      }
    }
  }, [user, profile, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user || profile?.roles !== 'manager') {
    return null; // Will redirect via useEffect
  }

  return <ManagerDashboard />;
}