# 🚀 Locomotion AI Authentication Setup Guide

## 🎯 **Objective**
Set up authentication so that:
- **Owner** (`fyves@owner.com` / `123test`) → **Owner Dashboard** with KPI metrics
- **Manager** (`fyves@dev.com` / `123test`) → **Manager Dashboard** with work order management

## 📋 **Complete Setup Steps (IN ORDER)**

### **Step 1: Apply Database Schema**
```bash
npm run db:migrate
```
**What this does:**
- Creates all database tables (users, roles, entities, work_orders, etc.)
- Sets up Row Level Security (RLS) policies
- Creates initial roles: 'owner', 'manager', 'technician', 'front_desk'
- Creates business entities: LAT-ARL, LAT-HOU, LTP-ARL, etc.

**Expected output:** "✅ Successfully executed: SQL statement" messages

---

### **Step 2: Create Authentication Users**
```bash
npm run db:create-users
```
**What this does:**
- Creates Supabase Auth users for fyves@owner.com and fyves@dev.com
- Provides manual creation instructions if automated fails

**Manual Alternative:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to **Authentication → Users**
3. Click **"Add user"** for each:

   **Owner Account:**
   - Email: `fyves@owner.com`
   - Password: `123test`
   - Auto-confirm user: ✅ **ON**
   - User metadata: `{"full_name": "Fyves Owner"}`

   **Manager Account:**
   - Email: `fyves@dev.com`
   - Password: `123test`
   - Auto-confirm user: ✅ **ON**
   - User metadata: `{"full_name": "Fyves Manager"}`

---

### **Step 3: Seed User Profiles & Permissions**
```bash
npm run db:seed
```
**What this does:**
- Creates database user profiles linked to auth users
- Assigns roles: 'owner' vs 'manager'
- Sets entity access permissions:
  - **Owner**: Access to ALL entities
  - **Manager**: Access to LAT-ARL only
- Creates test data (customers, vehicles, work orders)

**Critical:** This step links the Supabase Auth users to database profiles with correct roles.

---

### **Step 4: Verify Setup**
```bash
# Automated verification
npm run db:verify
```
This will check:
- ✅ All database tables exist
- ✅ User profiles are created with correct roles
- ✅ Entity access permissions are set
- ✅ Business entities are configured

**Manual verification** (in Supabase SQL Editor):
```sql
-- Check users and roles
SELECT u.email, r.name as role, u.entity_access
FROM users u
JOIN roles r ON u.role_id = r.id;

-- Check entities
SELECT code, name FROM entities;
```

---

### **Step 5: Start Application**
```bash
npm run dev
```

---

### **Step 6: Test Authentication Flow**

#### **Test Owner Login:**
1. Go to `http://localhost:3000`
2. Login with: `fyves@owner.com` / `123test`
3. **Expected:** Redirect to **Owner Dashboard** with KPI metrics
4. **Verify:** See real-time business metrics, PLOOP model, entity filtering

#### **Test Manager Login:**
1. Logout or open incognito window
2. Login with: `fyves@dev.com` / `123test`
3. **Expected:** Redirect to **Manager Dashboard**
4. **Verify:** See work order management, limited to LAT-ARL entity

---

## 🔍 **Troubleshooting**

### **"Invalid login credentials"**
**Cause:** Database schema not applied before user creation
**Fix:** Run `npm run db:migrate` first, then recreate users

### **"User profile not found"**
**Cause:** Auth user created but database profile missing
**Fix:** Run `npm run db:seed` to create user profiles

### **Wrong dashboard shown**
**Cause:** Incorrect role assignment in database
**Fix:** Check user roles in database:
```sql
SELECT u.email, r.name FROM users u JOIN roles r ON u.role_id = r.id;
```

### **Entity access issues**
**Cause:** Entity permissions not set correctly
**Fix:** Check entity access array:
```sql
SELECT email, entity_access FROM users WHERE email LIKE 'fyves@%';
```

---

## 🏗️ **System Architecture**

### **Authentication Flow:**
```
Login Form → Supabase Auth → Database User Profile → Role Check → Dashboard Redirect
```

### **Role-Based Routing:**
```typescript
// In src/app/page.tsx
if (profile?.roles?.name === 'owner') {
  return <OwnerDashboard />;  // KPI Metrics
} else {
  return <ManagerDashboard />; // Work Order Management
}
```

### **Permission System:**
- **Owner**: `["all"]` permissions, access to all entities
- **Manager**: `["read", "write", "approve"]`, limited entity access
- **Technician**: `["read", "write_own", "update_status"]`
- **Front Desk**: `["read", "create_work_orders", "update_customer"]`

---

## ✅ **Success Criteria**

### **Owner Dashboard:**
- [ ] Shows KPI metrics from documentation
- [ ] Displays PLOOP business model (21/20/30/10/19%)
- [ ] Entity filtering (Automatic Transmissions vs Transmission Parts)
- [ ] Real-time data with trend indicators
- [ ] Time range selection (Today/Week/Month)

### **Manager Dashboard:**
- [ ] Shows work order management interface
- [ ] Limited to LAT-ARL entity access
- [ ] Navigation to different modules
- [ ] Proper permission enforcement

### **Authentication:**
- [ ] Both users can login successfully
- [ ] Correct dashboard routing based on role
- [ ] Session persistence
- [ ] Proper logout functionality

---

## 🚀 **Quick Setup Command**

```bash
# One-command setup (if all scripts work)
npm run db:migrate && npm run db:create-users && npm run db:seed && npm run dev
```

## 📞 **Support**

If issues persist:
1. Check Supabase dashboard for user creation
2. Verify database tables exist
3. Check browser console for errors
4. Ensure `.env.local` has correct credentials

**Final Test:** Both users should see their respective dashboards with appropriate permissions and data access.