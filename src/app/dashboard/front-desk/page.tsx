'use client';

import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import FrontDeskDashboard from '@/components/FrontDeskDashboard';

export default function FrontDeskDashboardPage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  // Debug logging
  console.log('🔍 Front Desk Dashboard Debug:', {
    loading,
    hasUser: !!user,
    userEmail: user?.email,
    hasProfile: !!profile,
    profileRoles: profile?.roles,
    roleName: profile?.roles?.name,
    expectedRole: 'front_desk'
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
      
      if (profile?.roles?.name !== 'front_desk') {
        console.log('🔄 Wrong role, redirecting based on role:', profile?.roles?.name);
        // Redirect to appropriate dashboard based on role
        switch (profile?.roles?.name) {
          case 'owner':
            router.push('/dashboard/owner');
            break;
          case 'manager':
            router.push('/dashboard/manager');
            break;
          case 'technician':
            router.push('/dashboard/lift-worker');
            break;
          default:
            console.warn('Unknown role, redirecting to login');
            router.push('/login');
        }
        return;
      }

      console.log('✅ Front Desk access granted');
    }
  }, [user, profile, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user || profile?.roles?.name !== 'front_desk') {
    return null; // Will redirect via useEffect
  }

  return <FrontDeskDashboard />;
}