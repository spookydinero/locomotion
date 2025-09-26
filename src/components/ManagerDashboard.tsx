'use client'

import { createClient } from '@/lib/supabase'
import { Bell, LayoutDashboard, ClipboardList, Car, FileText, Package, ShieldCheck } from '@/components/Icons'

export default function ManagerDashboard() {
  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.reload()
  }

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">Welcome, Alex</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <a className="group block rounded-lg p-6 bg-white dark:bg-background-dark/50 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-primary dark:hover:border-primary transition-all duration-300" href="/operations-dashboard">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <LayoutDashboard className="w-5 h-5 text-current" />
                  </div>
                  <h3 className="text-base font-bold text-gray-800 dark:text-gray-200">Operations Dashboard</h3>
                </div>
              </a>
              <a className="group block rounded-lg p-6 bg-white dark:bg-background-dark/50 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-primary dark:hover:border-primary transition-all duration-300" href="/work-orders">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <ClipboardList className="w-5 h-5 text-current" />
                  </div>
                  <h3 className="text-base font-bold text-gray-800 dark:text-gray-200">Work Orders</h3>
                </div>
              </a>
              <a className="group block rounded-lg p-6 bg-white dark:bg-background-dark/50 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-primary dark:hover:border-primary transition-all duration-300" href="/lifts-management">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <Car className="w-5 h-5 text-current" />
                  </div>
                  <h3 className="text-base font-bold text-gray-800 dark:text-gray-200">Lifts Management</h3>
                </div>
              </a>
              <a className="group block rounded-lg p-6 bg-white dark:bg-background-dark/50 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-primary dark:hover:border-primary transition-all duration-300" href="/quotes-pos">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <FileText className="w-5 h-5 text-current" />
                  </div>
                  <h3 className="text-base font-bold text-gray-800 dark:text-gray-200">Quotes & POs</h3>
                </div>
              </a>
              <a className="group block rounded-lg p-6 bg-white dark:bg-background-dark/50 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-primary dark:hover:border-primary transition-all duration-300" href="/inventory-management">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <Package className="w-5 h-5 text-current" />
                  </div>
                  <h3 className="text-base font-bold text-gray-800 dark:text-gray-200">Inventory Management</h3>
                </div>
              </a>
              <a className="group block rounded-lg p-6 bg-white dark:bg-background-dark/50 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-primary dark:hover:border-primary transition-all duration-300" href="/warranty-management">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <ShieldCheck className="w-5 h-5 text-current" />
                  </div>
                  <h3 className="text-base font-bold text-gray-800 dark:text-gray-200">Warranty Management</h3>
                </div>
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">Copyright © 2024 Locomotion AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}