'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth'
import { TrendingUp, TrendingDown, Minus } from '@/components/Icons'

interface KPIMetric {
  id: string
  name: string
  value: string | number
  change: number
  changeType: 'increase' | 'decrease' | 'neutral'
  frequency: 'daily' | 'weekly'
  format: 'currency' | 'percentage' | 'number' | 'hours'
}

interface EntityKPIs {
  entity: string
  metrics: KPIMetric[]
}

export default function OwnerDashboard() {
  const { user, profile } = useAuth()
  const [selectedEntity, setSelectedEntity] = useState<string>('all')
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('today')

  // Mock KPI data based on documentation requirements
  const mockKPIData: EntityKPIs[] = [
    {
      entity: 'Locomotion Automatic Transmissions',
      metrics: [
        {
          id: 'sales',
          name: 'Sales',
          value: 15420.50,
          change: 12.5,
          changeType: 'increase',
          frequency: 'daily',
          format: 'currency'
        },
        {
          id: 'expenses',
          name: 'Expenses',
          value: 8750.25,
          change: -3.2,
          changeType: 'decrease',
          frequency: 'daily',
          format: 'currency'
        },
        {
          id: 'productivity',
          name: 'Productivity',
          value: 87.3,
          change: 5.1,
          changeType: 'increase',
          frequency: 'daily',
          format: 'percentage'
        },
        {
          id: 'inventory',
          name: 'Inventory Value',
          value: 234500.00,
          change: 2.8,
          changeType: 'increase',
          frequency: 'daily',
          format: 'currency'
        },
        {
          id: 'repair_turnaround',
          name: 'Repair Turnaround',
          value: 3.2,
          change: -0.5,
          changeType: 'decrease',
          frequency: 'weekly',
          format: 'number'
        },
        {
          id: 'bay_utilization',
          name: 'Bay Utilization Rate',
          value: 78.5,
          change: 8.2,
          changeType: 'increase',
          frequency: 'daily',
          format: 'percentage'
        },
        {
          id: 'comeback_rate',
          name: 'Comeback Rate',
          value: 4.2,
          change: -1.8,
          changeType: 'decrease',
          frequency: 'daily',
          format: 'percentage'
        },
        {
          id: 'expenses_by_ro',
          name: 'Expenses by RO',
          value: 1250.75,
          change: 15.3,
          changeType: 'increase',
          frequency: 'daily',
          format: 'currency'
        },
        {
          id: 'accounts_receivable',
          name: 'Accounts Receivable',
          value: 45680.00,
          change: -5.7,
          changeType: 'decrease',
          frequency: 'daily',
          format: 'currency'
        },
        {
          id: 'accounts_payable',
          name: 'Accounts Payable',
          value: 32150.00,
          change: 7.4,
          changeType: 'increase',
          frequency: 'daily',
          format: 'currency'
        }
      ]
    },
    {
      entity: 'Locomotion Transmission Parts',
      metrics: [
        {
          id: 'sales',
          name: 'Sales',
          value: 8950.75,
          change: 18.3,
          changeType: 'increase',
          frequency: 'daily',
          format: 'currency'
        },
        {
          id: 'expenses',
          name: 'Expenses',
          value: 5420.50,
          change: 2.1,
          changeType: 'increase',
          frequency: 'daily',
          format: 'currency'
        },
        {
          id: 'production',
          name: 'Production Units',
          value: 127,
          change: 15.6,
          changeType: 'increase',
          frequency: 'daily',
          format: 'number'
        },
        {
          id: 'inventory',
          name: 'Inventory Value',
          value: 187650.00,
          change: -4.2,
          changeType: 'decrease',
          frequency: 'daily',
          format: 'currency'
        },
        {
          id: 'cores',
          name: 'Core Returns',
          value: 23,
          change: 9.5,
          changeType: 'increase',
          frequency: 'weekly',
          format: 'number'
        },
        {
          id: 'driver_tracking',
          name: 'Driver Efficiency',
          value: 92.1,
          change: 3.7,
          changeType: 'increase',
          frequency: 'daily',
          format: 'percentage'
        },
        {
          id: 'pending_orders',
          name: 'Pending Orders',
          value: 18,
          change: -12.5,
          changeType: 'decrease',
          frequency: 'daily',
          format: 'number'
        },
        {
          id: 'usage_percentage',
          name: 'Capacity Usage',
          value: 76.8,
          change: 6.2,
          changeType: 'increase',
          frequency: 'daily',
          format: 'percentage'
        },
        {
          id: 'accounts_receivable',
          name: 'Accounts Receivable',
          value: 28950.00,
          change: -8.3,
          changeType: 'decrease',
          frequency: 'daily',
          format: 'currency'
        },
        {
          id: 'accounts_payable',
          name: 'Accounts Payable',
          value: 19800.00,
          change: 4.9,
          changeType: 'increase',
          frequency: 'daily',
          format: 'currency'
        }
      ]
    }
  ]

  const formatValue = (value: number | string, format: string) => {
    if (typeof value === 'string') return value

    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(value)
      case 'percentage':
        return `${value}%`
      case 'number':
        return value.toLocaleString()
      case 'hours':
        return `${value}h`
      default:
        return value.toString()
    }
  }

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'increase':
        return 'text-green-600'
      case 'decrease':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'increase':
        return <TrendingUp className="w-5 h-5 text-current" />
      case 'decrease':
        return <TrendingDown className="w-5 h-5 text-current" />
      default:
        return <Minus className="w-5 h-5 text-current" />
    }
  }

  const filteredKPIs = selectedEntity === 'all'
    ? mockKPIData
    : mockKPIData.filter(entity => entity.entity.includes(selectedEntity))

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back, {profile?.full_name || (user?.email ?? 'User')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Here&apos;s your real-time business performance overview
            </p>
          </div>
          <div className="mb-8 flex items-center gap-4">
            <select
              value={selectedEntity}
              onChange={(e) => setSelectedEntity(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="all">All Entities</option>
              <option value="Automatic Transmissions">Automatic Transmissions</option>
              <option value="Transmission Parts">Transmission Parts</option>
            </select>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as 'today' | 'week' | 'month')}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>

          {filteredKPIs.map((entityData) => (
            <div key={entityData.entity} className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                {entityData.entity}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {entityData.metrics.map((metric) => (
                  <div
                    key={metric.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {metric.name}
                      </h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        metric.frequency === 'daily'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                      }`}>
                        {metric.frequency}
                      </span>
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {formatValue(metric.value, metric.format)}
                        </p>
                        <div className={`flex items-center mt-2 text-sm ${getChangeColor(metric.changeType)}`}>
                           <span className="mr-1">
                             {getChangeIcon(metric.changeType)}
                           </span>
                           <span>
                             {metric.change > 0 ? '+' : ''}{metric.change}% from yesterday
                           </span>
                         </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* PLOOP Model Summary for Automatic Transmissions */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              PLOOP Business Model - Locomotion Automatic Transmissions
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">21%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Parts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">20%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Labor</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">30%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Overhead</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">10%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Office</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">19%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Profit</div>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
              Target profit margin: 19% per job. Current performance tracking shows we&apos;re meeting this goal.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}