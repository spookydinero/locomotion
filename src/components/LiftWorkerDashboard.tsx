'use client'

import { createClient } from '@/lib/supabase'
import { useAuth } from '@/lib/auth'
import { useState, useEffect } from 'react'
import { Bell, Wrench, Car, Package, QrCode } from '@/components/Icons'

interface WorkOrder {
  id: string
  vehicle: string
  phase: string
  status: string
  priority: 'high' | 'medium' | 'low'
  estimatedTime: string
  liftRequired: boolean
}

interface BayStatus {
  id: number
  name: string
  status: 'occupied' | 'available' | 'maintenance'
  currentJob?: string
  estimatedCompletion?: string
}

export default function LiftWorkerDashboard() {
  const { user } = useAuth()
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([])
  const [bayStatuses, setBayStatuses] = useState<BayStatus[]>([])
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isClockingIn, setIsClockingIn] = useState(false)

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.reload()
  }

  // Mock data - in real implementation, this would come from the database
  useEffect(() => {
    // Mock work orders
    setWorkOrders([
      {
        id: 'WO-124',
        vehicle: 'Nissan Altima CVT',
        phase: 'Install',
        status: 'in_progress',
        priority: 'high',
        estimatedTime: '2.5 hrs',
        liftRequired: true
      },
      {
        id: 'WO-125',
        vehicle: 'Honda Civic Brake Service',
        phase: 'Diagnosis',
        status: 'pending',
        priority: 'medium',
        estimatedTime: '1.5 hrs',
        liftRequired: true
      },
      {
        id: 'WO-126',
        vehicle: 'Toyota Camry Oil Change',
        phase: 'Quality Check',
        status: 'pending',
        priority: 'low',
        estimatedTime: '0.5 hrs',
        liftRequired: false
      }
    ])

    // Mock bay statuses
    setBayStatuses([
      { id: 1, name: 'Bay 1', status: 'occupied', currentJob: 'WO-124', estimatedCompletion: '2:30 PM' },
      { id: 2, name: 'Bay 2', status: 'available' },
      { id: 3, name: 'Bay 3', status: 'occupied', currentJob: 'WO-123', estimatedCompletion: '1:45 PM' },
      { id: 4, name: 'Bay 4', status: 'maintenance' },
      { id: 5, name: 'Bay 5', status: 'available' },
      { id: 6, name: 'Bay 6', status: 'occupied', currentJob: 'WO-122', estimatedCompletion: '4:00 PM' }
    ])

    // Update time every minute
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const handleClockInOut = async () => {
    setIsClockingIn(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsClockingIn(false)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/20'
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20'
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
    }
  }

  const getBayStatusColor = (status: string) => {
    switch (status) {
      case 'occupied': return 'bg-red-500'
      case 'available': return 'bg-green-500'
      case 'maintenance': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">
      <header className="bg-background-light dark:bg-background-dark/80 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="text-primary size-8">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.8261 30.5736C16.7203 29.8826 20.2244 29.4783 24 29.4783C27.7756 29.4783 31.2797 29.8826 34.1739 30.5736C36.9144 31.2278 39.9967 32.7669 41.3563 33.8352L24.8486 7.36089C24.4571 6.73303 23.5429 6.73303 23.1514 7.36089L6.64374 33.8352C8.00331 32.7669 11.0856 31.2278 13.8261 30.5736Z" fill="currentColor"></path>
                  <path clipRule="evenodd" d="M39.998 35.764C39.9944 35.7463 39.9875 35.7155 39.9748 35.6706C39.9436 35.5601 39.8949 35.4259 39.8346 35.2825C39.8168 35.2403 39.7989 35.1993 39.7813 35.1602C38.5103 34.2887 35.9788 33.0607 33.7095 32.5189C30.9875 31.8691 27.6413 31.4783 24 31.4783C20.3587 31.4783 17.0125 31.8691 14.2905 32.5189C12.0012 33.0654 9.44505 34.3104 8.18538 35.1832C8.17384 35.2075 8.16216 35.233 8.15052 35.2592C8.09919 35.3751 8.05721 35.4886 8.02977 35.589C8.00356 35.6848 8.00039 35.7333 8.00004 35.7388C8.00004 35.739 8 35.7393 8.00004 35.7388C8.00004 35.7641 8.0104 36.0767 8.68485 36.6314C9.34546 37.1746 10.4222 37.7531 11.9291 38.2772C14.9242 39.319 19.1919 40 24 40C28.8081 40 33.0758 39.319 36.0709 38.2772C37.5778 37.7531 38.6545 37.1746 39.3151 36.6314C39.9006 36.1499 39.9857 35.8511 39.998 35.764ZM4.95178 32.7688L21.4543 6.30267C22.6288 4.4191 25.3712 4.41909 26.5457 6.30267L43.0534 32.777C43.0709 32.8052 43.0878 32.8338 43.104 32.8629L41.3563 33.8352C43.104 32.8629 43.1038 32.8626 43.104 32.8629L43.1051 32.865L43.1065 32.8675L43.1101 32.8739L43.1199 32.8918C43.1276 32.906 43.1377 32.9246 43.1497 32.9473C43.1738 32.9925 43.2062 33.0545 43.244 33.1299C43.319 33.2792 43.4196 33.489 43.5217 33.7317C43.6901 34.1321 44 34.9311 44 35.7391C44 37.4427 43.003 38.7775 41.8558 39.7209C40.6947 40.6757 39.1354 41.4464 37.385 42.0552C33.8654 43.2794 29.133 44 24 44C18.867 44 14.1346 43.2794 10.615 42.0552C8.86463 41.4464 7.30529 40.6757 6.14419 39.7209C4.99695 38.7775 3.99999 37.4427 3.99999 35.7391C3.99999 34.8725 4.29264 34.0922 4.49321 33.6393C4.60375 33.3898 4.71348 33.1804 4.79687 33.0311C4.83898 32.9556 4.87547 32.8935 4.9035 32.8471C4.91754 32.8238 4.92954 32.8043 4.93916 32.7889L4.94662 32.777L4.95178 32.7688ZM35.9868 29.004L24 9.77997L12.0131 29.004C12.4661 28.8609 12.9179 28.7342 13.3617 28.6282C16.4281 27.8961 20.0901 27.4783 24 27.4783C27.9099 27.4783 31.5719 27.8961 34.6383 28.6282C35.082 28.7342 35.5339 28.8609 35.9868 29.004Z" fill="currentColor" fillRule="evenodd"></path>
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Locomotion AI</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors" href="/dashboard/lift-worker">Dashboard</a>
              <a className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors" href="/work-orders">Work Orders</a>
              <a className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors" href="/inventory-management">Parts</a>
            </nav>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <button className="relative rounded-full p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark focus:ring-primary">
                <Bell className="w-5 h-5 text-current" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">3</span>
              </button>
              <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA3wajLm9Cr17fcEP1sLHnsc5trHbwxs6cdbNSSBwn9xEW_kqHZa4UzDGc_YRUgc7rtCl7VqyZt0_tN6-_u6zsHl60F0_am3q2nCKTCYlgwx4y4fxFKKwZDuXsZwsAuSHBu9upF-dm7Cpdnb5B-5bw25gLN7yrMyRSgIu4C4Lg7o3abeRUujofP0oAzv7WO5dcfyxOohIuyONxJZhYF67DhPY7eQkQBVBRVRViI447NRic9L5Az4ZIkGdXgvupKEuWU4s9lSxueZ3w')"}}></div>
              <button 
                onClick={handleSignOut}
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Technician Dashboard</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Welcome back, {user?.email?.split('@')[0] || 'Technician'}!</p>
              </div>
              <button 
                onClick={handleClockInOut}
                disabled={isClockingIn}
                className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isClockingIn ? 'Processing...' : 'Clock In/Out'}
              </button>
            </div>

            {/* Bay Status Overview */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Bay Status</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {bayStatuses.map((bay) => (
                  <div key={bay.id} className="bg-white dark:bg-background-dark/50 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">{bay.name}</h4>
                      <div className={`w-3 h-3 rounded-full ${getBayStatusColor(bay.status)}`}></div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{bay.status}</p>
                    {bay.currentJob && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500 dark:text-gray-500">{bay.currentJob}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">Est: {bay.estimatedCompletion}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Work Orders */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">My Work Orders</h3>
              <div className="space-y-4">
                {workOrders.map((order) => (
                  <div key={order.id} className="bg-white dark:bg-background-dark/50 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">{order.id}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(order.priority)}`}>
                          {order.priority.toUpperCase()}
                        </span>
                        {order.liftRequired && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600 dark:bg-blue-900/20">
                            LIFT REQUIRED
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Est: {order.estimatedTime}
                      </div>
                    </div>
                    <p className="text-gray-900 dark:text-white font-medium mb-2">{order.vehicle}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Phase:</span>
                        <span className="text-sm font-medium text-primary">{order.phase}</span>
                      </div>
                      <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                        Continue Work
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <a className="group block rounded-lg p-6 bg-white dark:bg-background-dark/50 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-primary dark:hover:border-primary transition-all duration-300" href="/work-orders">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <Wrench className="w-5 h-5 text-current" />
                    </div>
                    <h4 className="text-base font-bold text-gray-800 dark:text-gray-200">Technician Interface</h4>
                  </div>
                </a>
                <a className="group block rounded-lg p-6 bg-white dark:bg-background-dark/50 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-primary dark:hover:border-primary transition-all duration-300" href="/qc-road-test">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <Car className="w-5 h-5 text-current" />
                    </div>
                    <h4 className="text-base font-bold text-gray-800 dark:text-gray-200">QC & Road Test</h4>
                  </div>
                </a>
                <a className="group block rounded-lg p-6 bg-white dark:bg-background-dark/50 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-primary dark:hover:border-primary transition-all duration-300" href="/inventory-management">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <Package className="w-5 h-5 text-current" />
                    </div>
                    <h4 className="text-base font-bold text-gray-800 dark:text-gray-200">Parts Request</h4>
                  </div>
                </a>
                <button className="group block rounded-lg p-6 bg-white dark:bg-background-dark/50 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-primary dark:hover:border-primary transition-all duration-300 w-full text-left">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <QrCode className="w-5 h-5 text-current" />
                    </div>
                    <h4 className="text-base font-bold text-gray-800 dark:text-gray-200">QR Scanner</h4>
                  </div>
                </button>
              </div>
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