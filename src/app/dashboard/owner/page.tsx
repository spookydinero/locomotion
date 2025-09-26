'use client';

import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import OwnerDashboard from '@/components/OwnerDashboard';

export default function OwnerDashboardPage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
        return;
      }
      
      if (profile?.roles !== 'owner') {
        // Redirect to appropriate dashboard based on role
        switch (profile?.roles) {
          case 'manager':
            router.push('/dashboard/manager');
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

  if (!user || profile?.roles !== 'owner') {
    return null; // Will redirect via useEffect
  }

  return <OwnerDashboard />;
}