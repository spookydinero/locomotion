'use client';

import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ManagerDashboard from '@/components/ManagerDashboard';

export default function ManagerDashboardPage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  // Debug logging
  console.log('🔍 Manager Dashboard Debug:', {
    loading,
    hasUser: !!user,
    userEmail: user?.email,
    hasProfile: !!profile,
    profileRoles: profile?.roles,
    roleName: profile?.roles?.name,
    expectedRole: 'manager'
  });

  useEffect(() => {
    if (!loading) {
      if (!user) {
        console.log('❌ No user, redirecting to login');
        router.push('/login');
        return;
      }

      if (!profile) {
        console.error('❌ User authenticated but no profile found');
        router.push('/login');
        return;
      }
      
      if (profile?.roles?.name !== 'manager') {
        console.log('🔄 Wrong role, redirecting based on role:', profile?.roles?.name);
        // Redirect to appropriate dashboard based on role
        switch (profile?.roles?.name) {
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
            console.warn('Unknown role, redirecting to login');
            router.push('/login');
        }
        return;
      }

      console.log('✅ Manager access granted');
    }
  }, [user, profile, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user || profile?.roles?.name !== 'manager') {
    return null; // Will redirect via useEffect
  }

  return <ManagerDashboard />;
}