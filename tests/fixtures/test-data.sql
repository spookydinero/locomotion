-- ===========================================
-- LOCOMOTION AI TEST DATA
-- Test fixtures for comprehensive testing
-- ===========================================

-- Insert test roles (if not already inserted by migration)
INSERT INTO roles (name, permissions) VALUES
('owner', '["all"]'),
('manager', '["read", "write", "approve", "manage_users"]'),
('technician', '["read", "write_own", "update_status"]'),
('front_desk', '["read", "create_work_orders", "update_customer"]')
ON CONFLICT (name) DO NOTHING;

-- Insert test users with specific credentials
INSERT INTO users (email, full_name, role_id, entity_access, is_active) VALUES
('fyves@owner.com', 'Fyves Owner', (SELECT id FROM roles WHERE name = 'owner'), (SELECT array_agg(id) FROM entities), true),
('fyves@dev.com', 'Fyves Manager', (SELECT id FROM roles WHERE name = 'manager'), ARRAY[(SELECT id FROM entities WHERE code = 'LAT-ARL')], true),
('manager-arl@test.com', 'ARL Manager', (SELECT id FROM roles WHERE name = 'manager'), ARRAY[(SELECT id FROM entities WHERE code = 'LAT-ARL')], true),
('manager-multi@test.com', 'Multi-Entity Manager', (SELECT id FROM roles WHERE name = 'manager'), ARRAY[(SELECT id FROM entities WHERE code IN ('LAT-ARL', 'LAT-HOU'))[1], (SELECT id FROM entities WHERE code IN ('LAT-ARL', 'LAT-HOU'))[2]], true),
('technician-arl@test.com', 'ARL Technician', (SELECT id FROM roles WHERE name = 'technician'), ARRAY[(SELECT id FROM entities WHERE code = 'LAT-ARL')], true),
('technician-hou@test.com', 'HOU Technician', (SELECT id FROM roles WHERE name = 'technician'), ARRAY[(SELECT id FROM entities WHERE code = 'LAT-HOU')], true),
('front-desk@test.com', 'Front Desk', (SELECT id FROM roles WHERE name = 'front_desk'), ARRAY[(SELECT id FROM entities WHERE code = 'LAT-ARL')], true);

-- Insert test customers
INSERT INTO customers (entity_id, first_name, last_name, company_name, email, phone, customer_type, tax_id) VALUES
((SELECT id FROM entities WHERE code = 'LAT-ARL'), 'John', 'Smith', NULL, 'john.smith@email.com', '555-0101', 'retail', 'TAX001'),
((SELECT id FROM entities WHERE code = 'LAT-ARL'), 'Jane', 'Doe', 'Doe Enterprises', 'jane@doeenterprises.com', '555-0102', 'fleet', 'TAX002'),
((SELECT id FROM entities WHERE code = 'LAT-HOU'), 'Bob', 'Johnson', NULL, 'bob.johnson@email.com', '555-0103', 'retail', 'TAX003'),
((SELECT id FROM entities WHERE code = 'LAT-HOU'), NULL, NULL, 'FleetCorp Inc', 'contact@fleetcorp.com', '555-0104', 'fleet', 'TAX004'),
((SELECT id FROM entities WHERE code = 'LTP-ARL'), 'Alice', 'Brown', NULL, 'alice.brown@email.com', '555-0105', 'wholesale', 'TAX005');

-- Insert test vehicles
INSERT INTO vehicles (customer_id, vin, make, model, year, license_plate, color, mileage, engine_type, transmission_type, notes) VALUES
((SELECT id FROM customers WHERE email = 'john.smith@email.com'), '1HGBH41JXMN109186', 'Honda', 'Civic', 2020, 'ABC-123', 'Blue', 45000, '2.0L 4-cylinder', 'CVT', 'Regular maintenance customer'),
((SELECT id FROM customers WHERE email = 'jane@doeenterprises.com'), '1FTFW1ET6DFC12345', 'Ford', 'F-150', 2019, 'XYZ-789', 'White', 32000, '3.5L V6', '10-speed automatic', 'Fleet vehicle'),
((SELECT id FROM customers WHERE email = 'bob.johnson@email.com'), 'JM1BL1U78D1234567', 'Mazda', 'Mazda3', 2021, 'DEF-456', 'Red', 15000, '2.5L 4-cylinder', '6-speed manual', 'New customer'),
((SELECT id FROM customers WHERE email = 'contact@fleetcorp.com'), '1GCNCPEX8DZ123456', 'Chevrolet', 'Silverado 1500', 2018, 'GHI-012', 'Black', 78000, '5.3L V8', '8-speed automatic', 'High mileage truck'),
((SELECT id FROM customers WHERE email = 'alice.brown@email.com'), '2T1BURHE0FC123456', 'Toyota', 'Corolla', 2017, 'JKL-345', 'Silver', 62000, '1.8L 4-cylinder', 'CVT', 'Wholesale parts customer');

-- Insert test parts
INSERT INTO parts (entity_id, part_number, description, category, manufacturer, unit_cost, retail_price, wholesale_price, min_stock, current_stock, location) VALUES
((SELECT id FROM entities WHERE code = 'LAT-ARL'), 'TRNS-001', '6L80 Transmission Assembly', 'Transmission', 'Lokomotion Parts', 1200.00, 2400.00, 1800.00, 1, 3, 'Aisle A-1'),
((SELECT id FROM entities WHERE code = 'LAT-ARL'), 'FLTR-001', 'Transmission Filter Kit', 'Filters', 'ACDelco', 45.00, 89.99, 67.50, 5, 12, 'Aisle B-2'),
((SELECT id FROM entities WHERE code = 'LAT-HOU'), 'TRNS-002', '8L90 Transmission Assembly', 'Transmission', 'Lokomotion Parts', 1500.00, 3000.00, 2250.00, 1, 2, 'Bay 3'),
((SELECT id FROM entities WHERE code = 'LTP-ARL'), 'TCONV-001', 'Torque Converter 6L80', 'Torque Converters', 'Lokomotion Parts', 350.00, 700.00, 525.00, 2, 8, 'Shelf C-1'),
((SELECT id FROM entities WHERE code = 'LTP-ARL'), 'PUMP-001', 'Transmission Pump 6L80', 'Pumps', 'Lokomotion Parts', 180.00, 360.00, 270.00, 3, 15, 'Shelf D-2');

-- Insert test bays
INSERT INTO bays (entity_id, name, type, is_active) VALUES
((SELECT id FROM entities WHERE code = 'LAT-ARL'), 'Bay 1', 'lift', true),
((SELECT id FROM entities WHERE code = 'LAT-ARL'), 'Bay 2', 'lift', true),
((SELECT id FROM entities WHERE code = 'LAT-ARL'), 'Bay 3', 'bay', true),
((SELECT id FROM entities WHERE code = 'LAT-HOU'), 'Bay A', 'lift', true),
((SELECT id FROM entities WHERE code = 'LAT-HOU'), 'Bay B', 'lift', true);

-- Insert test work orders
INSERT INTO work_orders (entity_id, ro_number, customer_id, vehicle_id, status, priority, description, total_labor_cost, total_parts_cost, total_cost, created_by) VALUES
((SELECT id FROM entities WHERE code = 'LAT-ARL'), 'RO-TEST-001', (SELECT id FROM customers WHERE email = 'john.smith@email.com'), (SELECT id FROM vehicles WHERE vin = '1HGBH41JXMN109186'), 'open', 'normal', 'Transmission fluid change and filter replacement', 120.00, 89.99, 209.99, (SELECT id FROM users WHERE email = 'front-desk@test.com')),
((SELECT id FROM entities WHERE code = 'LAT-ARL'), 'RO-TEST-002', (SELECT id FROM customers WHERE email = 'jane@doeenterprises.com'), (SELECT id FROM vehicles WHERE vin = '1FTFW1ET6DFC12345'), 'in_progress', 'high', 'Complete transmission rebuild', 480.00, 2400.00, 2880.00, (SELECT id FROM users WHERE email = 'manager-arl@test.com')),
((SELECT id FROM entities WHERE code = 'LAT-HOU'), 'RO-TEST-003', (SELECT id FROM customers WHERE email = 'bob.johnson@email.com'), (SELECT id FROM vehicles WHERE vin = 'JM1BL1U78D1234567'), 'completed', 'normal', 'Clutch replacement', 360.00, 450.00, 810.00, (SELECT id FROM users WHERE email = 'technician-hou@test.com')),
((SELECT id FROM entities WHERE code = 'LAT-HOU'), 'RO-TEST-004', (SELECT id FROM customers WHERE email = 'contact@fleetcorp.com'), (SELECT id FROM vehicles WHERE vin = '1GCNCPEX8DZ123456'), 'open', 'urgent', 'Emergency transmission repair', 600.00, 3000.00, 3600.00, (SELECT id FROM users WHERE email = 'manager-multi@test.com'));

-- Assign technicians to work orders
UPDATE work_orders SET assigned_technician = (SELECT id FROM users WHERE email = 'technician-arl@test.com') WHERE ro_number = 'RO-TEST-001';
UPDATE work_orders SET assigned_technician = (SELECT id FROM users WHERE email = 'technician-arl@test.com') WHERE ro_number = 'RO-TEST-002';
UPDATE work_orders SET assigned_technician = (SELECT id FROM users WHERE email = 'technician-hou@test.com') WHERE ro_number = 'RO-TEST-003';
UPDATE work_orders SET assigned_technician = (SELECT id FROM users WHERE email = 'technician-hou@test.com') WHERE ro_number = 'RO-TEST-004';

-- Insert work order lines
INSERT INTO work_order_lines (work_order_id, line_type, description, quantity, unit_cost, total_cost, technician_id) VALUES
((SELECT id FROM work_orders WHERE ro_number = 'RO-TEST-001'), 'labor', 'Transmission service', 1, 120.00, 120.00, (SELECT id FROM users WHERE email = 'technician-arl@test.com')),
((SELECT id FROM work_orders WHERE ro_number = 'RO-TEST-001'), 'part', 'Transmission filter', 1, 89.99, 89.99, NULL),
((SELECT id FROM work_orders WHERE ro_number = 'RO-TEST-002'), 'labor', 'Transmission rebuild', 1, 480.00, 480.00, (SELECT id FROM users WHERE email = 'technician-arl@test.com')),
((SELECT id FROM work_orders WHERE ro_number = 'RO-TEST-002'), 'part', '6L80 Transmission', 1, 2400.00, 2400.00, NULL),
((SELECT id FROM work_orders WHERE ro_number = 'RO-TEST-003'), 'labor', 'Clutch replacement', 1, 360.00, 360.00, (SELECT id FROM users WHERE email = 'technician-hou@test.com')),
((SELECT id FROM work_orders WHERE ro_number = 'RO-TEST-003'), 'part', 'Clutch kit', 1, 450.00, 450.00, NULL);

-- Insert time entries
INSERT INTO time_entries (user_id, work_order_id, start_time, end_time, activity_type, notes) VALUES
((SELECT id FROM users WHERE email = 'technician-arl@test.com'), (SELECT id FROM work_orders WHERE ro_number = 'RO-TEST-001'), NOW() - INTERVAL '2 hours', NOW() - INTERVAL '1 hour', 'diagnosis', 'Initial vehicle inspection'),
((SELECT id FROM users WHERE email = 'technician-arl@test.com'), (SELECT id FROM work_orders WHERE ro_number = 'RO-TEST-002'), NOW() - INTERVAL '4 hours', NOW() - INTERVAL '1 hour', 'repair', 'Transmission rebuild in progress');

-- Insert purchase orders
INSERT INTO purchase_orders (entity_id, po_number, vendor_name, status, total_amount, created_by) VALUES
((SELECT id FROM entities WHERE code = 'LAT-ARL'), 'PO-TEST-001', 'ACDelco', 'approved', 450.00, (SELECT id FROM users WHERE email = 'manager-arl@test.com')),
((SELECT id FROM entities WHERE code = 'LTP-ARL'), 'PO-TEST-002', 'Transmission Parts Inc', 'ordered', 1200.00, (SELECT id FROM users WHERE email = 'owner@test.com'));

-- Insert PO lines
INSERT INTO purchase_order_lines (purchase_order_id, part_id, quantity, unit_cost, total_cost) VALUES
((SELECT id FROM purchase_orders WHERE po_number = 'PO-TEST-001'), (SELECT id FROM parts WHERE part_number = 'FLTR-001'), 5, 45.00, 225.00),
((SELECT id FROM purchase_orders WHERE po_number = 'PO-TEST-002'), (SELECT id FROM parts WHERE part_number = 'TCONV-001'), 3, 350.00, 1050.00);

-- Insert parts transactions
INSERT INTO parts_transactions (part_id, transaction_type, quantity, unit_cost, reference_type, notes, created_by) VALUES
((SELECT id FROM parts WHERE part_number = 'FLTR-001'), 'sale', -1, 89.99, 'work_order', 'Used in RO-TEST-001', (SELECT id FROM users WHERE email = 'technician-arl@test.com')),
((SELECT id FROM parts WHERE part_number = 'TRNS-001'), 'sale', -1, 2400.00, 'work_order', 'Used in RO-TEST-002', (SELECT id FROM users WHERE email = 'technician-arl@test.com')),
((SELECT id FROM parts WHERE part_number = 'FLTR-001'), 'purchase', 5, 45.00, 'purchase_order', 'Received from ACDELCO', (SELECT id FROM users WHERE email = 'manager-arl@test.com'));

-- Update vehicle QR codes (this will be handled by the application, but for testing we set them)
UPDATE vehicles SET qr_code = CONCAT('VQR-', id, '-', EXTRACT(epoch FROM NOW())::text) WHERE qr_code IS NULL;
UPDATE vehicles SET qr_generated_at = NOW() WHERE qr_generated_at IS NULL;

-- Update bay QR codes
UPDATE bays SET qr_code = CONCAT('BQR-', id, '-', EXTRACT(epoch FROM NOW())::text) WHERE qr_code IS NULL;

COMMIT;

-- Verification queries (run these to verify test data)
-- SELECT 'Entities:' as check, COUNT(*) as count FROM entities;
-- SELECT 'Users:' as check, COUNT(*) as count FROM users;
-- SELECT 'Customers:' as check, COUNT(*) as count FROM customers;
-- SELECT 'Vehicles:' as check, COUNT(*) as count FROM vehicles;
-- SELECT 'Work Orders:' as check, COUNT(*) as count FROM work_orders;
-- SELECT 'Parts:' as check, COUNT(*) as count FROM parts;
-- SELECT 'Bays:' as check, COUNT(*) as count FROM bays;