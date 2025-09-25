-- ===========================================
-- LOCOMOTION AI DATABASE MIGRATION
-- Initial Schema Setup
-- Migration: 001_initial_schema
-- ===========================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ===========================================
-- CORE ENTITIES & MULTI-TENANCY
-- ===========================================

-- Business entities (tenants) - for legal separation
CREATE TABLE entities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL, -- e.g., 'LAT', 'LTP', 'LAS'
    type VARCHAR(100) NOT NULL, -- 'shop', 'parts', 'sales', 'inactive'
    locations JSONB, -- Array of locations with addresses
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User roles and permissions
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL, -- 'owner', 'manager', 'technician', 'front_desk'
    permissions JSONB, -- Array of permission strings
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users with multi-entity access
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role_id UUID REFERENCES roles(id),
    entity_access UUID[] DEFAULT '{}', -- Array of entity IDs user can access
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- CUSTOMER & VEHICLE MANAGEMENT
-- ===========================================

-- Customers (shared across entities where applicable)
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_id UUID REFERENCES entities(id), -- Primary entity
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    company_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    address JSONB, -- Structured address data
    customer_type VARCHAR(50) DEFAULT 'retail', -- 'retail', 'fleet', 'wholesale'
    tax_id VARCHAR(100), -- For invoicing
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vehicles
CREATE TABLE vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customers(id),
    vin VARCHAR(17) UNIQUE,
    make VARCHAR(100),
    model VARCHAR(100),
    year INTEGER,
    license_plate VARCHAR(20),
    color VARCHAR(50),
    mileage INTEGER,
    engine_type VARCHAR(100),
    transmission_type VARCHAR(100),
    qr_code VARCHAR(255) UNIQUE, -- Generated QR code string
    qr_generated_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- WORK ORDER MANAGEMENT
-- ===========================================

-- Work orders (ROs)
CREATE TABLE work_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_id UUID REFERENCES entities(id),
    ro_number VARCHAR(50) UNIQUE NOT NULL, -- Sequential per entity
    customer_id UUID REFERENCES customers(id),
    vehicle_id UUID REFERENCES vehicles(id),
    status VARCHAR(50) DEFAULT 'open', -- 'open', 'in_progress', 'completed', 'delivered'
    priority VARCHAR(20) DEFAULT 'normal', -- 'low', 'normal', 'high', 'urgent'
    description TEXT,
    estimated_completion TIMESTAMP WITH TIME ZONE,
    actual_completion TIMESTAMP WITH TIME ZONE,
    total_labor_cost DECIMAL(10,2) DEFAULT 0,
    total_parts_cost DECIMAL(10,2) DEFAULT 0,
    total_cost DECIMAL(10,2) DEFAULT 0,
    created_by UUID REFERENCES users(id),
    assigned_technician UUID REFERENCES users(id),
    bay_id UUID, -- Will reference bays table
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Work order line items
CREATE TABLE work_order_lines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    work_order_id UUID REFERENCES work_orders(id) ON DELETE CASCADE,
    line_type VARCHAR(50) NOT NULL, -- 'labor', 'part', 'sublet'
    description TEXT,
    quantity DECIMAL(10,2) DEFAULT 1,
    unit_cost DECIMAL(10,2),
    total_cost DECIMAL(10,2),
    part_id UUID, -- Will reference parts table
    technician_id UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- INVENTORY MANAGEMENT
-- ===========================================

-- Parts catalog
CREATE TABLE parts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_id UUID REFERENCES entities(id),
    part_number VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    manufacturer VARCHAR(100),
    unit_cost DECIMAL(10,2),
    retail_price DECIMAL(10,2),
    wholesale_price DECIMAL(10,2),
    min_stock INTEGER DEFAULT 0,
    max_stock INTEGER,
    current_stock INTEGER DEFAULT 0,
    location VARCHAR(100), -- Warehouse location
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Parts transactions (for tracking stock movements)
CREATE TABLE parts_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    part_id UUID REFERENCES parts(id),
    transaction_type VARCHAR(50) NOT NULL, -- 'purchase', 'sale', 'adjustment', 'transfer'
    quantity INTEGER NOT NULL,
    unit_cost DECIMAL(10,2),
    reference_id UUID, -- Work order, PO, etc.
    reference_type VARCHAR(50), -- 'work_order', 'purchase_order', etc.
    notes TEXT,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- SHOP OPERATIONS
-- ===========================================

-- Bays/lifts
CREATE TABLE bays (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_id UUID REFERENCES entities(id),
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) DEFAULT 'lift', -- 'lift', 'bay', 'storage'
    is_active BOOLEAN DEFAULT true,
    current_work_order UUID REFERENCES work_orders(id),
    qr_code VARCHAR(255) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Technician time tracking
CREATE TABLE time_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    work_order_id UUID REFERENCES work_orders(id),
    bay_id UUID REFERENCES bays(id),
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE,
    activity_type VARCHAR(100), -- 'diagnosis', 'repair', 'qc', etc.
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- FINANCIAL TRACKING
-- ===========================================

-- Purchase orders
CREATE TABLE purchase_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_id UUID REFERENCES entities(id),
    po_number VARCHAR(50) UNIQUE NOT NULL,
    vendor_name VARCHAR(255),
    vendor_id VARCHAR(100), -- External vendor ID
    status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'approved', 'ordered', 'received'
    total_amount DECIMAL(10,2) DEFAULT 0,
    created_by UUID REFERENCES users(id),
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PO line items
CREATE TABLE purchase_order_lines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    purchase_order_id UUID REFERENCES purchase_orders(id) ON DELETE CASCADE,
    part_id UUID REFERENCES parts(id),
    quantity INTEGER NOT NULL,
    unit_cost DECIMAL(10,2),
    total_cost DECIMAL(10,2),
    received_quantity INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- AUDIT LOGGING
-- ===========================================

-- Audit log for sensitive operations
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    entity_id UUID REFERENCES entities(id),
    action VARCHAR(100) NOT NULL, -- 'create', 'update', 'delete', 'login', etc.
    resource_type VARCHAR(100) NOT NULL, -- 'work_order', 'customer', 'vehicle', etc.
    resource_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- INDEXES FOR PERFORMANCE
-- ===========================================

CREATE INDEX idx_work_orders_entity_status ON work_orders(entity_id, status);
CREATE INDEX idx_work_orders_customer ON work_orders(customer_id);
CREATE INDEX idx_work_orders_vehicle ON work_orders(vehicle_id);
CREATE INDEX idx_parts_entity_part_number ON parts(entity_id, part_number);
CREATE INDEX idx_vehicles_vin ON vehicles(vin);
CREATE INDEX idx_vehicles_qr_code ON vehicles(qr_code);
CREATE INDEX idx_bays_qr_code ON bays(qr_code);
CREATE INDEX idx_time_entries_user_date ON time_entries(user_id, start_time);
CREATE INDEX idx_parts_transactions_part_date ON parts_transactions(part_id, created_at);
CREATE INDEX idx_audit_logs_entity_action ON audit_logs(entity_id, action);
CREATE INDEX idx_audit_logs_user_date ON audit_logs(user_id, created_at);

-- ===========================================
-- ROW LEVEL SECURITY POLICIES
-- ===========================================

-- Enable RLS on all tables
ALTER TABLE entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_order_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE parts ENABLE ROW LEVEL SECURITY;
ALTER TABLE parts_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bays ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_order_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (users can only access data from entities they have access to)
CREATE POLICY "Users can access their entities" ON entities
    FOR ALL USING (id = ANY((SELECT entity_access FROM users WHERE id = auth.uid())));

CREATE POLICY "Users can access their entity users" ON users
    FOR ALL USING (id = auth.uid() OR entity_access && (SELECT entity_access FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can access their entity customers" ON customers
    FOR ALL USING (entity_id = ANY((SELECT entity_access FROM users WHERE id = auth.uid())));

CREATE POLICY "Users can access their entity vehicles" ON vehicles
    FOR ALL USING (customer_id IN (
        SELECT id FROM customers WHERE entity_id = ANY((SELECT entity_access FROM users WHERE id = auth.uid()))
    ));

CREATE POLICY "Users can access their entity work orders" ON work_orders
    FOR ALL USING (entity_id = ANY((SELECT entity_access FROM users WHERE id = auth.uid())));

CREATE POLICY "Users can access their entity work order lines" ON work_order_lines
    FOR ALL USING (work_order_id IN (
        SELECT id FROM work_orders WHERE entity_id = ANY((SELECT entity_access FROM users WHERE id = auth.uid()))
    ));

CREATE POLICY "Users can access their entity parts" ON parts
    FOR ALL USING (entity_id = ANY((SELECT entity_access FROM users WHERE id = auth.uid())));

CREATE POLICY "Users can access their entity parts transactions" ON parts_transactions
    FOR ALL USING (part_id IN (
        SELECT id FROM parts WHERE entity_id = ANY((SELECT entity_access FROM users WHERE id = auth.uid()))
    ));

CREATE POLICY "Users can access their entity bays" ON bays
    FOR ALL USING (entity_id = ANY((SELECT entity_access FROM users WHERE id = auth.uid())));

CREATE POLICY "Users can access their time entries" ON time_entries
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Users can access their entity purchase orders" ON purchase_orders
    FOR ALL USING (entity_id = ANY((SELECT entity_access FROM users WHERE id = auth.uid())));

CREATE POLICY "Users can access their entity purchase order lines" ON purchase_order_lines
    FOR ALL USING (purchase_order_id IN (
        SELECT id FROM purchase_orders WHERE entity_id = ANY((SELECT entity_access FROM users WHERE id = auth.uid()))
    ));

CREATE POLICY "Users can access their entity audit logs" ON audit_logs
    FOR ALL USING (entity_id = ANY((SELECT entity_access FROM users WHERE id = auth.uid())));

-- ===========================================
-- TRIGGERS FOR UPDATED_AT
-- ===========================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to relevant tables
CREATE TRIGGER update_entities_updated_at BEFORE UPDATE ON entities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON vehicles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_work_orders_updated_at BEFORE UPDATE ON work_orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_parts_updated_at BEFORE UPDATE ON parts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_purchase_orders_updated_at BEFORE UPDATE ON purchase_orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ===========================================
-- AUDIT TRIGGER FUNCTION
-- ===========================================

CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
DECLARE
    old_row JSONB;
    new_row JSONB;
    action_type TEXT;
BEGIN
    -- Determine action type
    IF TG_OP = 'INSERT' THEN
        action_type := 'create';
        old_row := NULL;
        new_row := to_jsonb(NEW);
    ELSIF TG_OP = 'UPDATE' THEN
        action_type := 'update';
        old_row := to_jsonb(OLD);
        new_row := to_jsonb(NEW);
    ELSIF TG_OP = 'DELETE' THEN
        action_type := 'delete';
        old_row := to_jsonb(OLD);
        new_row := NULL;
    END IF;

    -- Insert audit log entry
    INSERT INTO audit_logs (
        user_id,
        entity_id,
        action,
        resource_type,
        resource_id,
        old_values,
        new_values
    ) VALUES (
        auth.uid(),
        CASE
            WHEN TG_TABLE_NAME = 'work_orders' THEN (SELECT entity_id FROM work_orders WHERE id = COALESCE(NEW.id, OLD.id))
            WHEN TG_TABLE_NAME = 'customers' THEN (SELECT entity_id FROM customers WHERE id = COALESCE(NEW.id, OLD.id))
            WHEN TG_TABLE_NAME = 'parts' THEN (SELECT entity_id FROM parts WHERE id = COALESCE(NEW.id, OLD.id))
            WHEN TG_TABLE_NAME = 'purchase_orders' THEN (SELECT entity_id FROM purchase_orders WHERE id = COALESCE(NEW.id, OLD.id))
            WHEN TG_TABLE_NAME = 'bays' THEN (SELECT entity_id FROM bays WHERE id = COALESCE(NEW.id, OLD.id))
            ELSE NULL
        END,
        action_type,
        TG_TABLE_NAME,
        COALESCE(NEW.id, OLD.id),
        old_row,
        new_row
    );

    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply audit triggers to sensitive tables
CREATE TRIGGER audit_work_orders AFTER INSERT OR UPDATE OR DELETE ON work_orders
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_customers AFTER INSERT OR UPDATE OR DELETE ON customers
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_vehicles AFTER INSERT OR UPDATE OR DELETE ON vehicles
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_parts AFTER INSERT OR UPDATE OR DELETE ON parts
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

-- ===========================================
-- INITIAL DATA SEEDING
-- ===========================================

-- Insert business entities
INSERT INTO entities (name, code, type, locations, is_active) VALUES
('Locomotion Automatic Transmissions - Arlington', 'LAT-ARL', 'shop',
 '{"locations": [{"city": "Arlington", "state": "TX"}]}', true),
('Locomotion Automatic Transmissions - Mansfield', 'LAT-MAN', 'shop',
 '{"locations": [{"city": "Mansfield", "state": "TX"}]}', true),
('Locomotion Automatic Transmissions - Houston', 'LAT-HOU', 'shop',
 '{"locations": [{"city": "Houston", "state": "TX"}]}', true),
('Locomotion Transmission Parts - Arlington', 'LTP-ARL', 'parts',
 '{"locations": [{"city": "Arlington", "state": "TX"}]}', true),
('Locomotion Transmission Parts - Houston', 'LTP-HOU', 'parts',
 '{"locations": [{"city": "Houston", "state": "TX"}]}', true),
('Locomotion Auto Sales', 'LAS', 'sales', '{}', true),
('Locomotion Parts S de RL de CV', 'LTP-MEX', 'shop',
 '{"locations": [{"city": "Chihuahua", "country": "Mexico"}]}', true);

-- Insert basic roles
INSERT INTO roles (name, permissions) VALUES
('owner', '["all"]'),
('manager', '["read", "write", "approve", "manage_users"]'),
('technician', '["read", "write_own", "update_status"]'),
('front_desk', '["read", "create_work_orders", "update_customer"]');

-- Insert default admin user (will be updated with proper auth)
-- Note: This will be handled by the application auth system
-- INSERT INTO users (email, full_name, role_id, entity_access) VALUES
-- ('admin@locomotiontx.com', 'System Administrator',
--  (SELECT id FROM roles WHERE name = 'owner'),
--  (SELECT array_agg(id) FROM entities));

COMMIT;