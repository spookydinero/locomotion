'use client'

import { useState, useEffect, useCallback } from 'react'
import { getWorkOrders, createWorkOrder, updateWorkOrder, deleteWorkOrder, getEntities, getCustomers, getVehicles } from '@/lib/database'
import { useAuth, usePermissions } from '@/lib/auth'
import type { WorkOrderWithJoins, Customer, Vehicle, Entity } from '@/lib/types'

export default function WorkOrdersPage() {
  const { user, loading: authLoading } = useAuth()
  const { hasPermission, userEntities } = usePermissions()

  const [workOrders, setWorkOrders] = useState<WorkOrderWithJoins[]>([])
  const [entities, setEntities] = useState<Entity[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedEntity, setSelectedEntity] = useState<string>('')
  const [selectedCustomer, setSelectedCustomer] = useState<string>('')
  const [selectedVehicle, setSelectedVehicle] = useState<string>('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<'low' | 'normal' | 'high' | 'urgent'>('normal')

  // Check permissions
  const canCreateWorkOrders = hasPermission('write') || hasPermission('all')
  const canUpdateWorkOrders = hasPermission('write') || hasPermission('all')
  const canDeleteWorkOrders = hasPermission('write') || hasPermission('all')

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const [workOrdersRes, entitiesRes, customersRes, vehiclesRes] = await Promise.all([
        getWorkOrders(),
        getEntities(),
        getCustomers(),
        getVehicles()
      ])

      if (workOrdersRes.data) setWorkOrders(workOrdersRes.data.data)
      if (entitiesRes.data) {
        // Filter entities based on user access
        const accessibleEntities = entitiesRes.data.filter(entity => userEntities.includes(entity.id))
        setEntities(accessibleEntities)
      }
      if (customersRes.data) setCustomers(customersRes.data.data)
      if (vehiclesRes.data) setVehicles(vehiclesRes.data.data)
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }, [userEntities])

  useEffect(() => {
    if (!authLoading && user) {
      loadData()
    }
  }, [authLoading, user, loadData])

  const handleCreateWorkOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedEntity || !selectedCustomer || !selectedVehicle) {
      alert('Please select entity, customer, and vehicle')
      return
    }

    const result = await createWorkOrder({
      entity_id: selectedEntity,
      customer_id: selectedCustomer,
      vehicle_id: selectedVehicle,
      description,
      priority
    })

    if (result.data) {
      setWorkOrders([result.data, ...workOrders])
      setShowCreateForm(false)
      resetForm()
    } else {
      alert(result.error || 'Failed to create work order')
    }
  }

  const handleStatusChange = async (id: string, status: WorkOrderWithJoins['status']) => {
    const result = await updateWorkOrder(id, { status })
    if (result.data) {
      setWorkOrders(workOrders.map(wo => wo.id === id ? result.data! : wo))
    } else {
      alert(result.error || 'Failed to update work order')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this work order?')) return

    const result = await deleteWorkOrder(id)
    if (result.data) {
      setWorkOrders(workOrders.filter(wo => wo.id !== id))
    } else {
      alert(result.error || 'Failed to delete work order')
    }
  }

  const resetForm = () => {
    setSelectedEntity('')
    setSelectedCustomer('')
    setSelectedVehicle('')
    setDescription('')
    setPriority('normal')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800'
      case 'in_progress': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'delivered': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800'
      case 'normal': return 'bg-blue-100 text-blue-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'urgent': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading work orders...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Please sign in to access work orders.</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Work Orders</h1>
          {canCreateWorkOrders && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              Create Work Order
            </button>
          )}
        </div>

        {/* Create Form Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Create New Work Order</h2>
              <form onSubmit={handleCreateWorkOrder}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Entity</label>
                    <select
                      value={selectedEntity}
                      onChange={(e) => setSelectedEntity(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    >
                      <option value="">Select Entity</option>
                      {entities.map(entity => (
                        <option key={entity.id} value={entity.id}>{entity.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Customer</label>
                    <select
                      value={selectedCustomer}
                      onChange={(e) => setSelectedCustomer(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    >
                      <option value="">Select Customer</option>
                      {customers.map(customer => (
                        <option key={customer.id} value={customer.id}>
                          {customer.company_name || `${customer.first_name} ${customer.last_name}`}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Vehicle</label>
                    <select
                      value={selectedVehicle}
                      onChange={(e) => setSelectedVehicle(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    >
                      <option value="">Select Vehicle</option>
                      {vehicles.map(vehicle => (
                        <option key={vehicle.id} value={vehicle.id}>
                          {vehicle.year} {vehicle.make} {vehicle.model} - {vehicle.license_plate}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as 'low' | 'normal' | 'high' | 'urgent')}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      <option value="low">Low</option>
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Work Orders Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  RO Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {workOrders.map((workOrder) => (
                <tr key={workOrder.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {workOrder.ro_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {(workOrder.customers as { company_name?: string; first_name?: string; last_name?: string })?.company_name ||
                     `${(workOrder.customers as { first_name?: string; last_name?: string })?.first_name || ''} ${(workOrder.customers as { first_name?: string; last_name?: string })?.last_name || ''}`.trim()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {(workOrder.vehicles as { year?: number; make?: string; model?: string })?.year} {(workOrder.vehicles as { make?: string })?.make} {(workOrder.vehicles as { model?: string })?.model}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {canUpdateWorkOrders ? (
                      <select
                        value={workOrder.status}
                        onChange={(e) => handleStatusChange(workOrder.id, e.target.value as WorkOrderWithJoins['status'])}
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full border-0 ${getStatusColor(workOrder.status)}`}
                      >
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    ) : (
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(workOrder.status)}`}>
                        {workOrder.status.replace('_', ' ')}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(workOrder.priority)}`}>
                      {workOrder.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(workOrder.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {canDeleteWorkOrders && (
                      <button
                        onClick={() => handleDelete(workOrder.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {workOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No work orders found. Create your first work order to get started.</p>
          </div>
        )}
      </div>
    </div>
  )
}