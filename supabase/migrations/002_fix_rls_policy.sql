-- ===========================================
-- FIX RLS POLICY INFINITE RECURSION
-- Migration: 002_fix_rls_policy
-- ===========================================

-- Fix the infinite recursion in users table RLS policy
-- Drop the problematic policy that causes circular references
DROP POLICY IF EXISTS "Users can access their entity users" ON users;

-- Create a simpler policy that allows users to access their own record
-- This is sufficient for authentication middleware
CREATE POLICY "Users can access their own record" ON users
    FOR ALL USING (id = auth.uid());

-- Note: Multi-entity user access will be handled at the application level
-- to avoid complex RLS policy recursion issues