'use client'

import { createClient } from '@/lib/supabase'
import { useAuth } from '@/lib/auth'
import { useState, useEffect } from 'react'
import { Bell, Calendar, FileText, Users, DollarSign, UserPlus, CalendarCheck, Receipt, CreditCard } from '@/components/Icons'

interface Customer {
  id: string
  name: string
  phone: string
  email: string
  vehicle: string
  lastVisit: string
  status: 'active' | 'pending' | 'completed'
}

interface Appointment {
  id: string
  customerName: string
  service: string
  date: string
  time: string
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed'
  priority: 'high' | 'medium' | 'low'
}

interface Quote {
  id: string
  workOrder: string
  customer: string
  vehicle: string
  amount: number
  status: 'pending' | 'approved' | 'declined'
  createdDate: string
}

export default function FrontDeskDashboard() {
  const { user } = useAuth()
  const [customers, setCustomers] = useState<Customer[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [selectedTab, setSelectedTab] = useState<'customers' | 'appointments' | 'quotes'>('customers')

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.reload()
  }

  // Mock data - in real implementation, this would come from the database
  useEffect(() => {
    // Mock customers
    setCustomers([
      {
        id: 'C001',
        name: 'John Smith',
        phone: '(555) 123-4567',
        email: 'john.smith@email.com',
        vehicle: '2020 Toyota Camry',
        lastVisit: '2024-01-15',
        status: 'active'
      },
      {
        id: 'C002',
        name: 'Sarah Johnson',
        phone: '(555) 234-5678',
        email: 'sarah.j@email.com',
        vehicle: '2019 Honda Civic',
        lastVisit: '2024-01-10',
        status: 'pending'
      },
      {
        id: 'C003',
        name: 'Mike Davis',
        phone: '(555) 345-6789',
        email: 'mike.davis@email.com',
        vehicle: '2021 Ford F-150',
        lastVisit: '2024-01-08',
        status: 'completed'
      }
    ])

    // Mock appointments
    setAppointments([
      {
        id: 'A001',
        customerName: 'John Smith',
        service: 'Oil Change & Inspection',
        date: '2024-01-20',
        time: '09:00 AM',
        status: 'scheduled',
        priority: 'medium'
      },
      {
        id: 'A002',
        customerName: 'Sarah Johnson',
        service: 'Brake Repair',
        date: '2024-01-20',
        time: '11:00 AM',
        status: 'confirmed',
        priority: 'high'
      },
      {
        id: 'A003',
        customerName: 'Mike Davis',
        service: 'Transmission Service',
        date: '2024-01-21',
        time: '02:00 PM',
        status: 'scheduled',
        priority: 'low'
      }
    ])

    // Mock quotes
    setQuotes([
      {
        id: 'Q001',
        workOrder: 'WO-1001',
        customer: 'John Smith',
        vehicle: '2020 Toyota Camry',
        amount: 1200,
        status: 'pending',
        createdDate: '2024-01-18'
      },
      {
        id: 'Q002',
        workOrder: 'WO-1002',
        customer: 'Sarah Johnson',
        vehicle: '2019 Honda Civic',
        amount: 850,
        status: 'approved',
        createdDate: '2024-01-17'
      },
      {
        id: 'Q003',
        workOrder: 'WO-1003',
        customer: 'Mike Davis',
        vehicle: '2021 Ford F-150',
        amount: 1500,
        status: 'pending',
        createdDate: '2024-01-16'
      }
    ])
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'scheduled':
      case 'approved':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      case 'pending':
      case 'confirmed':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20'
      case 'completed':
      case 'in_progress':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20'
      case 'declined':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20'
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/20'
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20'
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
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
              <a className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors" href="/dashboard/front-desk">Dashboard</a>
              <a className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors" href="/quotes-pos">Quotes & POS</a>
              <a className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors" href="/inventory-management">Parts</a>
            </nav>
            <div className="flex items-center gap-4">
              <button className="relative rounded-full p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark focus:ring-primary">
                <Bell className="w-5 h-5 text-current" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">2</span>
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
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Front Desk Dashboard</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Welcome back, {user?.email?.split('@')[0] || 'Front Desk'}!</p>
              </div>
              <button className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                New Customer
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-background-dark/50 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Today&apos;s Appointments</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/20">
                    <Calendar className="w-5 h-5 text-current" />
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-background-dark/50 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Pending Quotes</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">5</p>
                  </div>
                  <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20">
                    <FileText className="w-5 h-5 text-current" />
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-background-dark/50 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Active Customers</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-100 text-green-600 dark:bg-green-900/20">
                    <Users className="w-5 h-5 text-current" />
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-background-dark/50 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Today&apos;s Revenue</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">$4,250</p>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/20">
                    <DollarSign className="w-5 h-5 text-current" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="mb-6">
              <div className="border-b border-gray-200 dark:border-gray-800">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setSelectedTab('customers')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      selectedTab === 'customers'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    Customers
                  </button>
                  <button
                    onClick={() => setSelectedTab('appointments')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      selectedTab === 'appointments'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    Appointments
                  </button>
                  <button
                    onClick={() => setSelectedTab('quotes')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      selectedTab === 'quotes'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    Quotes & POS
                  </button>
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            {selectedTab === 'customers' && (
              <div className="bg-white dark:bg-background-dark/50 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Customer Management</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Vehicle</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Visit</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                      {customers.map((customer) => (
                        <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{customer.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{customer.id}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">{customer.phone}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{customer.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{customer.vehicle}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{customer.lastVisit}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                              {customer.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-primary hover:text-primary/80 mr-4">Edit</button>
                            <button className="text-primary hover:text-primary/80">View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedTab === 'appointments' && (
              <div className="bg-white dark:bg-background-dark/50 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Appointment Scheduling</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Service</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date & Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Priority</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                      {appointments.map((appointment) => (
                        <tr key={appointment.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{appointment.customerName}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{appointment.id}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{appointment.service}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">{appointment.date}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{appointment.time}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(appointment.priority)}`}>
                              {appointment.priority}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                              {appointment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-primary hover:text-primary/80 mr-4">Reschedule</button>
                            <button className="text-primary hover:text-primary/80">Confirm</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedTab === 'quotes' && (
              <div className="bg-white dark:bg-background-dark/50 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Quotes & Point of Sale</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quote ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Vehicle</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                      {quotes.map((quote) => (
                        <tr key={quote.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{quote.id}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{quote.workOrder}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{quote.customer}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{quote.vehicle}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">${quote.amount.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(quote.status)}`}>
                              {quote.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-primary hover:text-primary/80 mr-4">Process Payment</button>
                            <button className="text-primary hover:text-primary/80">View Details</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <button className="group block rounded-lg p-6 bg-white dark:bg-background-dark/50 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-primary dark:hover:border-primary transition-all duration-300 w-full text-left">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <UserPlus className="w-5 h-5 text-current" />
                    </div>
                    <h4 className="text-base font-bold text-gray-800 dark:text-gray-200">Add Customer</h4>
                  </div>
                </button>
                <button className="group block rounded-lg p-6 bg-white dark:bg-background-dark/50 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-primary dark:hover:border-primary transition-all duration-300 w-full text-left">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <CalendarCheck className="w-5 h-5 text-current" />
                    </div>
                    <h4 className="text-base font-bold text-gray-800 dark:text-gray-200">Schedule Appointment</h4>
                  </div>
                </button>
                <a className="group block rounded-lg p-6 bg-white dark:bg-background-dark/50 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-primary dark:hover:border-primary transition-all duration-300" href="/quotes-pos">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <Receipt className="w-5 h-5 text-current" />
                    </div>
                    <h4 className="text-base font-bold text-gray-800 dark:text-gray-200">Create Quote</h4>
                  </div>
                </a>
                <button className="group block rounded-lg p-6 bg-white dark:bg-background-dark/50 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-primary dark:hover:border-primary transition-all duration-300 w-full text-left">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <CreditCard className="w-5 h-5 text-current" />
                    </div>
                    <h4 className="text-base font-bold text-gray-800 dark:text-gray-200">Process Payment</h4>
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