// Database Types for Locomotion AI

export interface Entity {
  id: string;
  name: string;
  code: string;
  type: 'shop' | 'parts' | 'sales' | 'inactive';
  locations: Record<string, unknown>; // JSONB
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: string[];
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  role_id: string;
  entity_access: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id: string;
  entity_id: string;
  first_name?: string;
  last_name?: string;
  company_name?: string;
  email?: string;
  phone?: string;
  address?: Record<string, unknown>; // JSONB
  customer_type: 'retail' | 'fleet' | 'wholesale';
  tax_id?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Vehicle {
  id: string;
  customer_id: string;
  vin?: string;
  make?: string;
  model?: string;
  year?: number;
  license_plate?: string;
  color?: string;
  mileage?: number;
  engine_type?: string;
  transmission_type?: string;
  qr_code?: string;
  qr_generated_at?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface WorkOrder {
  id: string;
  entity_id: string;
  ro_number: string;
  customer_id: string;
  vehicle_id: string;
  status: 'open' | 'in_progress' | 'completed' | 'delivered';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  description?: string;
  estimated_completion?: string;
  actual_completion?: string;
  total_labor_cost: number;
  total_parts_cost: number;
  total_cost: number;
  created_by: string;
  assigned_technician?: string;
  bay_id?: string;
  created_at: string;
  updated_at: string;
}

export interface WorkOrderLine {
  id: string;
  work_order_id: string;
  line_type: 'labor' | 'part' | 'sublet';
  description?: string;
  quantity: number;
  unit_cost?: number;
  total_cost?: number;
  part_id?: string;
  technician_id?: string;
  created_at: string;
}

export interface Part {
  id: string;
  entity_id: string;
  part_number: string;
  description?: string;
  category?: string;
  manufacturer?: string;
  unit_cost?: number;
  retail_price?: number;
  wholesale_price?: number;
  min_stock: number;
  max_stock?: number;
  current_stock: number;
  location?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Bay {
  id: string;
  entity_id: string;
  name: string;
  type: 'lift' | 'bay' | 'storage';
  is_active: boolean;
  current_work_order?: string;
  qr_code?: string;
  created_at: string;
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  limit: number;
}

// Form types
export interface CreateWorkOrderData {
  entity_id: string;
  customer_id: string;
  vehicle_id: string;
  description?: string;
  priority?: WorkOrder['priority'];
  assigned_technician?: string;
}

export interface UpdateWorkOrderData {
  status?: WorkOrder['status'];
  priority?: WorkOrder['priority'];
  description?: string;
  estimated_completion?: string;
  assigned_technician?: string;
  bay_id?: string;
}

export interface CreateCustomerData {
  entity_id: string;
  first_name?: string;
  last_name?: string;
  company_name?: string;
  email?: string;
  phone?: string;
  address?: Record<string, unknown>;
  customer_type?: Customer['customer_type'];
  tax_id?: string;
  notes?: string;
}

export interface CreateVehicleData {
  customer_id: string;
  vin?: string;
  make?: string;
  model?: string;
  year?: number;
  license_plate?: string;
  color?: string;
  mileage?: number;
  engine_type?: string;
  transmission_type?: string;
  notes?: string;
}

// Extended types for joined data
export interface WorkOrderWithJoins extends WorkOrder {
  customers?: {
    id: string;
    first_name?: string;
    last_name?: string;
    company_name?: string;
    email?: string;
  };
  vehicles?: {
    id: string;
    make?: string;
    model?: string;
    year?: number;
    license_plate?: string;
  };
  users?: {
    id: string;
    full_name: string;
  };
  bays?: {
    id: string;
    name: string;
  };
}