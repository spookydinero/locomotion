import { createClient } from './supabase';
import { generateVehicleQRCode } from './qr';
import type {
  WorkOrder,
  CreateWorkOrderData,
  UpdateWorkOrderData,
  Customer,
  CreateCustomerData,
  Vehicle,
  CreateVehicleData,
  ApiResponse,
  PaginatedResponse
} from './types';

const supabase = createClient();

// ===========================================
// WORK ORDER OPERATIONS
// ===========================================

export async function getWorkOrders(
  entityId?: string,
  status?: string,
  page = 1,
  limit = 20
): Promise<ApiResponse<PaginatedResponse<WorkOrder>>> {
  try {
    let query = supabase
      .from('work_orders')
      .select(`
        *,
        customers:customer_id (
          id,
          first_name,
          last_name,
          company_name,
          email
        ),
        vehicles:vehicle_id (
          id,
          make,
          model,
          year,
          license_plate
        ),
        users:assigned_technician (
          id,
          full_name
        )
      `)
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (entityId) {
      query = query.eq('entity_id', entityId);
    }

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error, count } = await query;

    if (error) {
      return { error: error.message };
    }

    return {
      data: {
        data: data || [],
        count: count || 0,
        page,
        limit
      }
    };
  } catch (err) {
    return { error: 'Failed to fetch work orders' };
  }
}

export async function getWorkOrderById(id: string): Promise<ApiResponse<WorkOrder>> {
  try {
    const { data, error } = await supabase
      .from('work_orders')
      .select(`
        *,
        customers:customer_id (
          id,
          first_name,
          last_name,
          company_name,
          email,
          phone
        ),
        vehicles:vehicle_id (
          id,
          vin,
          make,
          model,
          year,
          license_plate,
          mileage
        ),
        work_order_lines (*),
        users:assigned_technician (
          id,
          full_name
        ),
        bays:bay_id (
          id,
          name
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      return { error: error.message };
    }

    return { data };
  } catch (err) {
    return { error: 'Failed to fetch work order' };
  }
}

export async function createWorkOrder(
  workOrderData: CreateWorkOrderData
): Promise<ApiResponse<WorkOrder>> {
  try {
    // Generate RO number (this is simplified - in production, you'd want sequential numbering per entity)
    const timestamp = Date.now();
    const roNumber = `RO-${timestamp}`;

    const { data, error } = await supabase
      .from('work_orders')
      .insert({
        ...workOrderData,
        ro_number: roNumber,
        status: 'open',
        priority: workOrderData.priority || 'normal',
        total_labor_cost: 0,
        total_parts_cost: 0,
        total_cost: 0
      })
      .select()
      .single();

    if (error) {
      return { error: error.message };
    }

    return { data };
  } catch (err) {
    return { error: 'Failed to create work order' };
  }
}

export async function updateWorkOrder(
  id: string,
  updates: UpdateWorkOrderData
): Promise<ApiResponse<WorkOrder>> {
  try {
    const { data, error } = await supabase
      .from('work_orders')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return { error: error.message };
    }

    return { data };
  } catch (err) {
    return { error: 'Failed to update work order' };
  }
}

export async function deleteWorkOrder(id: string): Promise<ApiResponse<boolean>> {
  try {
    const { error } = await supabase
      .from('work_orders')
      .delete()
      .eq('id', id);

    if (error) {
      return { error: error.message };
    }

    return { data: true };
  } catch (err) {
    return { error: 'Failed to delete work order' };
  }
}

// ===========================================
// CUSTOMER OPERATIONS
// ===========================================

export async function getCustomers(
  entityId?: string,
  search?: string,
  page = 1,
  limit = 20
): Promise<ApiResponse<PaginatedResponse<Customer>>> {
  try {
    let query = supabase
      .from('customers')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (entityId) {
      query = query.eq('entity_id', entityId);
    }

    if (search) {
      query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,company_name.ilike.%${search}%,email.ilike.%${search}%`);
    }

    const { data, error, count } = await query;

    if (error) {
      return { error: error.message };
    }

    return {
      data: {
        data: data || [],
        count: count || 0,
        page,
        limit
      }
    };
  } catch (err) {
    return { error: 'Failed to fetch customers' };
  }
}

export async function createCustomer(
  customerData: CreateCustomerData
): Promise<ApiResponse<Customer>> {
  try {
    const { data, error } = await supabase
      .from('customers')
      .insert(customerData)
      .select()
      .single();

    if (error) {
      return { error: error.message };
    }

    return { data };
  } catch (err) {
    return { error: 'Failed to create customer' };
  }
}

// ===========================================
// VEHICLE OPERATIONS
// ===========================================

export async function getVehicles(
  customerId?: string,
  search?: string,
  page = 1,
  limit = 20
): Promise<ApiResponse<PaginatedResponse<Vehicle>>> {
  try {
    let query = supabase
      .from('vehicles')
      .select(`
        *,
        customers:customer_id (
          id,
          first_name,
          last_name,
          company_name
        )
      `, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (customerId) {
      query = query.eq('customer_id', customerId);
    }

    if (search) {
      query = query.or(`vin.ilike.%${search}%,make.ilike.%${search}%,model.ilike.%${search}%,license_plate.ilike.%${search}%`);
    }

    const { data, error, count } = await query;

    if (error) {
      return { error: error.message };
    }

    return {
      data: {
        data: data || [],
        count: count || 0,
        page,
        limit
      }
    };
  } catch (err) {
    return { error: 'Failed to fetch vehicles' };
  }
}

export async function createVehicle(
  vehicleData: CreateVehicleData
): Promise<ApiResponse<Vehicle>> {
  try {
    // First create the vehicle to get the ID
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .insert(vehicleData)
      .select()
      .single();

    if (vehicleError) {
      return { error: vehicleError.message };
    }

    // Generate QR code for the vehicle
    const qrCode = generateVehicleQRCode(vehicle.id);

    // Update the vehicle with the QR code
    const { data: updatedVehicle, error: updateError } = await supabase
      .from('vehicles')
      .update({
        qr_code: qrCode,
        qr_generated_at: new Date().toISOString()
      })
      .eq('id', vehicle.id)
      .select()
      .single();

    if (updateError) {
      return { error: updateError.message };
    }

    return { data: updatedVehicle };
  } catch (err) {
    return { error: 'Failed to create vehicle' };
  }
}

// ===========================================
// UTILITY FUNCTIONS
// ===========================================

export async function getEntities(): Promise<ApiResponse<any[]>> {
  try {
    const { data, error } = await supabase
      .from('entities')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) {
      return { error: error.message };
    }

    return { data };
  } catch (err) {
    return { error: 'Failed to fetch entities' };
  }
}

export async function getCurrentUser(): Promise<ApiResponse<any>> {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      return { error: error.message };
    }

    if (!user) {
      return { error: 'No user logged in' };
    }

    // Get the session to access the token
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.access_token) {
      return { error: 'No valid session' };
    }

    // Use the server-side API route to fetch user profile
    const response = await fetch('/api/user', {
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error || 'Failed to fetch user profile' };
    }

    const profileData = await response.json();
    return profileData;

  } catch (err) {
    return { error: 'Failed to get current user' };
  }
}