# Locomotion AI - Comprehensive Testing Guide

This document provides complete instructions for testing the production-ready Locomotion AI system, focusing on the 4 core areas:

1. **Multi-Entity Architecture** - Database schema with legal separation
2. **Authentication & Authorization** - Role-based access control
3. **CRUD Operations** - Work order management with permissions
4. **QR Code Integration** - Vehicle tracking system

## 🧪 Testing Architecture Overview

### Test Categories
- **Unit Tests**: Individual functions and components
- **Integration Tests**: Database operations and API endpoints
- **E2E Tests**: Complete user workflows
- **Security Tests**: Authentication and authorization
- **Performance Tests**: Load and scalability

### Test Environment Setup

#### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account with project
- Database schema applied (see Database Setup below)

#### Environment Variables
Create `.env.local` with:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

#### Test User Accounts
The system includes two pre-configured test accounts:

**Owner Account (Full Access):**
- Email: `fyves@owner.com`
- Password: `123test`
- Access: All entities, owner dashboard with KPI metrics

**Manager Account (Limited Access):**
- Email: `fyves@dev.com`
- Password: `123test`
- Access: LAT-ARL entity only, manager dashboard

## 🗄️ Database Setup

### Automated Setup (Recommended)
```bash
# 1. Apply database migrations
npm run db:migrate

# 2. Create test user accounts
npm run db:setup-users

# 3. Seed test data
npm run db:seed
```

### Manual Setup (Alternative)
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to your project's SQL Editor
3. Copy and execute: `supabase/migrations/001_initial_schema.sql`
4. Copy and execute: `tests/fixtures/test-data.sql`

## 🧪 Complete Test Run Instructions

### Phase 1: Environment Setup

```bash
# 1. Install dependencies
npm install

# 2. Set up test environment
cp .env.local .env.test.local
# Edit .env.test.local with test database credentials

# 3. Run database migrations
npm run db:migrate

# 4. Seed test data
npm run db:seed

# 5. Start test environment
npm run test:setup
```

### Phase 2: Unit Tests

```bash
# Run all unit tests
npm run test:unit

# Run specific component tests
npm run test:unit -- --testPathPattern=auth
npm run test:unit -- --testPathPattern=database
npm run test:unit -- --testPathPattern=qr
```

### Phase 3: Integration Tests

```bash
# Test database operations
npm run test:integration -- --testPathPattern=database

# Test API endpoints
npm run test:integration -- --testPathPattern=api

# Test authentication flows
npm run test:integration -- --testPathPattern=auth
```

### Phase 4: End-to-End Tests

```bash
# Start test application
npm run dev:test

# In another terminal, run E2E tests
npm run test:e2e

# Test specific user roles
npm run test:e2e -- --spec="cypress/e2e/owner-workflow.cy.ts"
npm run test:e2e -- --spec="cypress/e2e/technician-workflow.cy.ts"
npm run test:e2e -- --spec="cypress/e2e/multi-entity.cy.ts"
```

### Phase 5: Security Tests

```bash
# Authentication security tests
npm run test:security -- --testPathPattern=auth

# Authorization tests
npm run test:security -- --testPathPattern=rls

# Penetration testing
npm run test:security -- --testPathPattern=penetration
```

### Phase 6: Performance Tests

```bash
# Load testing
npm run test:performance -- --testPathPattern=load

# Database performance
npm run test:performance -- --testPathPattern=database

# API performance
npm run test:performance -- --testPathPattern=api
```

## 🎯 Core Feature Test Scenarios

### 1. Multi-Entity Architecture Tests

#### Test Entity Isolation
```typescript
// Verify users can only access their assigned entities
describe('Entity Isolation', () => {
  it('should prevent access to unassigned entities', async () => {
    const technicianUser = await createTestUser('technician', ['LAT-ARL']);
    const workOrder = await createTestWorkOrder('LAT-HOU'); // Different entity

    const result = await getWorkOrder(workOrder.id, technicianUser);
    expect(result.error).toContain('access denied');
  });

  it('should allow access to assigned entities', async () => {
    const managerUser = await createTestUser('manager', ['LAT-ARL', 'LAT-HOU']);
    const workOrder = await createTestWorkOrder('LAT-ARL');

    const result = await getWorkOrder(workOrder.id, managerUser);
    expect(result.data).toBeDefined();
  });
});
```

#### Test Cross-Entity Operations
```typescript
describe('Cross-Entity Operations', () => {
  it('should log inter-entity transfers', async () => {
    const transfer = await createPartTransfer('LTP-ARL', 'LAT-ARL', 'PART-001');
    const auditLog = await getAuditLogs(transfer.id);

    expect(auditLog).toContain('transfer');
    expect(auditLog.entity_id).toBe('LTP-ARL');
  });
});
```

### 2. Authentication & Authorization Tests

#### Test Role-Based Access
```typescript
describe('Role-Based Access Control', () => {
  it('should enforce technician permissions', async () => {
    const technician = await createTestUser('technician');
    const workOrder = await createTestWorkOrder();

    // Technician can update their assigned work orders
    const updateResult = await updateWorkOrder(workOrder.id, { status: 'in_progress' }, technician);
    expect(updateResult.data).toBeDefined();

    // But cannot delete work orders
    const deleteResult = await deleteWorkOrder(workOrder.id, technician);
    expect(deleteResult.error).toContain('permission denied');
  });

  it('should validate entity access', async () => {
    const user = await createTestUser('manager', ['LAT-ARL']);
    const entities = await getUserEntities(user);

    expect(entities).toHaveLength(1);
    expect(entities[0].code).toBe('LAT-ARL');
  });
});
```

#### Test Session Security
```typescript
describe('Session Security', () => {
  it('should expire sessions properly', async () => {
    const user = await createTestUser();
    const session = await loginUser(user);

    // Fast-forward time past session expiry
    await advanceTime(3601); // 1 hour + 1 second

    const result = await getCurrentUser(session.token);
    expect(result.error).toContain('session expired');
  });

  it('should rotate refresh tokens', async () => {
    const user = await createTestUser();
    const session = await loginUser(user);

    const newSession = await refreshToken(session.refreshToken);
    expect(newSession.token).not.toBe(session.token);
    expect(session.refreshToken).toBeInvalid(); // Old refresh token should be invalidated
  });
});
```

### 3. CRUD Operations Tests

#### Test Work Order Management
```typescript
describe('Work Order CRUD', () => {
  it('should create work order with proper validation', async () => {
    const customer = await createTestCustomer();
    const vehicle = await createTestVehicle(customer.id);

    const workOrderData = {
      entity_id: 'LAT-ARL',
      customer_id: customer.id,
      vehicle_id: vehicle.id,
      description: 'Transmission rebuild',
      priority: 'high' as const
    };

    const result = await createWorkOrder(workOrderData);
    expect(result.data).toBeDefined();
    expect(result.data.ro_number).toMatch(/^RO-/);
    expect(result.data.status).toBe('open');
  });

  it('should update work order with audit logging', async () => {
    const workOrder = await createTestWorkOrder();
    const updateData = { status: 'in_progress', description: 'Updated description' };

    const result = await updateWorkOrder(workOrder.id, updateData);
    expect(result.data.status).toBe('in_progress');

    // Verify audit log
    const auditLogs = await getAuditLogs(workOrder.id, 'work_orders');
    expect(auditLogs).toHaveLength(1);
    expect(auditLogs[0].action).toBe('update');
  });

  it('should handle concurrent updates', async () => {
    const workOrder = await createTestWorkOrder();

    // Simulate concurrent updates
    const update1 = updateWorkOrder(workOrder.id, { status: 'in_progress' });
    const update2 = updateWorkOrder(workOrder.id, { status: 'completed' });

    const results = await Promise.all([update1, update2]);

    // One should succeed, one should fail with version conflict
    const successCount = results.filter(r => r.data).length;
    const failureCount = results.filter(r => r.error).length;

    expect(successCount).toBe(1);
    expect(failureCount).toBe(1);
  });
});
```

#### Test Bulk Operations
```typescript
describe('Bulk Operations', () => {
  it('should handle bulk work order creation', async () => {
    const workOrders = Array.from({ length: 100 }, (_, i) => ({
      entity_id: 'LAT-ARL',
      customer_id: 'test-customer-id',
      vehicle_id: 'test-vehicle-id',
      description: `Bulk work order ${i + 1}`
    }));

    const startTime = Date.now();
    const results = await createWorkOrdersBulk(workOrders);
    const endTime = Date.now();

    expect(results.successful).toHaveLength(100);
    expect(results.failed).toHaveLength(0);
    expect(endTime - startTime).toBeLessThan(5000); // Should complete within 5 seconds
  });
});
```

### 4. QR Code Integration Tests

#### Test QR Code Generation
```typescript
describe('QR Code Generation', () => {
  it('should generate unique QR codes for vehicles', async () => {
    const vehicle1 = await createTestVehicle();
    const vehicle2 = await createTestVehicle();

    expect(vehicle1.qr_code).toBeDefined();
    expect(vehicle2.qr_code).toBeDefined();
    expect(vehicle1.qr_code).not.toBe(vehicle2.qr_code);
  });

  it('should encode correct vehicle data', async () => {
    const vehicle = await createTestVehicle({
      vin: '1HGBH41JXMN109186',
      make: 'Honda',
      model: 'Civic',
      year: 2020
    });

    const decoded = parseVehicleQRData(vehicle.qr_code);
    expect(decoded.vin).toBe('1HGBH41JXMN109186');
    expect(decoded.make).toBe('Honda');
    expect(decoded.model).toBe('Civic');
    expect(decoded.year).toBe(2020);
  });
});
```

#### Test QR Code Scanning
```typescript
describe('QR Code Scanning', () => {
  it('should retrieve vehicle data from QR scan', async () => {
    const vehicle = await createTestVehicle();
    const qrData = parseVehicleQRData(vehicle.qr_code);

    const retrievedVehicle = await getVehicleByQR(qrData.id);
    expect(retrievedVehicle.id).toBe(vehicle.id);
    expect(retrievedVehicle.vin).toBe(vehicle.vin);
  });

  it('should handle invalid QR codes gracefully', async () => {
    const invalidQR = 'INVALID_QR_CODE';
    const result = parseVehicleQRData(invalidQR);

    expect(result).toBeNull();
  });

  it('should create work order from QR scan', async () => {
    const vehicle = await createTestVehicle();
    const customer = await getCustomerById(vehicle.customer_id);

    const workOrder = await createWorkOrderFromQR(vehicle.qr_code, {
      description: 'QR-scanned repair request'
    });

    expect(workOrder.vehicle_id).toBe(vehicle.id);
    expect(workOrder.customer_id).toBe(vehicle.customer_id);
  });
});
```

## 📊 Test Results & Reporting

### Automated Test Reports
```bash
# Generate HTML test reports
npm run test:report

# Generate coverage reports
npm run test:coverage

# Generate performance reports
npm run test:performance:report
```

### Manual Verification Checklist

#### Multi-Entity Architecture ✅
- [ ] Users can only access assigned entities
- [ ] Data is properly isolated between entities
- [ ] Cross-entity transfers are logged
- [ ] Financial reports are entity-specific

#### Authentication & Authorization ✅
- [ ] Users can login/logout securely
- [ ] Sessions expire properly
- [ ] Role permissions are enforced
- [ ] Entity access is validated

#### CRUD Operations ✅
- [ ] Work orders can be created, read, updated, deleted
- [ ] Data validation works correctly
- [ ] Bulk operations perform efficiently
- [ ] Audit logs capture all changes

#### QR Code Integration ✅
- [ ] QR codes are generated uniquely
- [ ] QR codes contain correct vehicle data
- [ ] QR scanning retrieves vehicle information
- [ ] Invalid QR codes are handled gracefully

## 🚀 Production Deployment Checklist

Before deploying to production:

1. **Database Migration**: Run migrations on production Supabase instance
2. **Environment Variables**: Set production Supabase credentials
3. **SSL/TLS**: Ensure HTTPS is enabled
4. **Backup**: Set up automated database backups
5. **Monitoring**: Configure error tracking and performance monitoring
6. **Security**: Enable rate limiting and security headers
7. **Testing**: Run full test suite against production environment

## 🆘 Troubleshooting

### Common Issues

**Migration Failures**
```bash
# Reset database (CAUTION: destroys data)
npm run db:reset

# Re-run migrations
npm run db:migrate
```

**Authentication Issues**
```bash
# Clear auth sessions
npm run auth:clear

# Reset user permissions
npm run db:seed:permissions
```

**QR Code Issues**
```bash
# Regenerate QR codes for all vehicles
npm run qr:regenerate

# Validate QR code integrity
npm run qr:validate
```

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review test logs in `tests/logs/`
3. Check Supabase dashboard for database issues
4. Contact development team with specific error messages