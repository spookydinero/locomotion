'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth'

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
        return 'trending_up'
      case 'decrease':
        return 'trending_down'
      default:
        return 'trending_flat'
    }
  }

  const filteredKPIs = selectedEntity === 'all'
    ? mockKPIData
    : mockKPIData.filter(entity => entity.entity.includes(selectedEntity))

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
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Locomotion AI - Owner Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
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
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back, {profile?.full_name || (user?.email ?? 'User')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Here's your real-time business performance overview
            </p>
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
                          <span className="material-symbols-outlined text-lg mr-1">
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