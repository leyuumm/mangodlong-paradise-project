-- Supabase SQL Migration: Create bookings table
-- Run this in your Supabase SQL Editor (https://app.supabase.com → SQL Editor)

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_ref TEXT NOT NULL UNIQUE,
  
  -- Guest info
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_mobile TEXT NOT NULL,
  
  -- Guests
  adults INTEGER NOT NULL DEFAULT 2,
  children INTEGER NOT NULL DEFAULT 0,
  pets INTEGER NOT NULL DEFAULT 0,
  
  -- Room
  room_type TEXT NOT NULL,
  room_name TEXT NOT NULL,
  room_rate NUMERIC(10,2) NOT NULL,
  
  -- Dates
  checkin_date DATE NOT NULL,
  checkout_date DATE NOT NULL,
  nights INTEGER NOT NULL,
  
  -- Pricing
  subtotal NUMERIC(10,2) NOT NULL,
  tax_amount NUMERIC(10,2) NOT NULL,
  total NUMERIC(10,2) NOT NULL,
  
  -- Status
  status TEXT NOT NULL DEFAULT 'confirmed',
  payment_status TEXT NOT NULL DEFAULT 'paid',
  
  -- Email
  confirmation_email_sent BOOLEAN DEFAULT FALSE,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookup by booking reference
CREATE INDEX IF NOT EXISTS idx_bookings_ref ON bookings(booking_ref);

-- Index for lookup by guest email
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(guest_email);

-- Enable Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policy: Allow inserts from the anon role (for public booking form)
CREATE POLICY "Allow public booking inserts"
  ON bookings
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow users to read their own bookings by email
CREATE POLICY "Allow read own bookings"
  ON bookings
  FOR SELECT
  TO anon
  USING (true);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
