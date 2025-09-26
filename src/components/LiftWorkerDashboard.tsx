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