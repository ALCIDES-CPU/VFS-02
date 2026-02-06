-- Drop existing tables if they exist (clean slate)
DROP TABLE IF EXISTS public.blocked_dates CASCADE;
DROP TABLE IF EXISTS public.contact_messages CASCADE;
DROP TABLE IF EXISTS public.time_slots CASCADE;
DROP TABLE IF EXISTS public.appointments CASCADE;

-- Appointments table (visa_type, location, appointment_date, appointment_time are now optional)
CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_number TEXT UNIQUE NOT NULL,
  visa_type TEXT,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  nationality TEXT NOT NULL,
  passport_number TEXT NOT NULL,
  passport_expiry DATE NOT NULL,
  gender TEXT NOT NULL,
  marital_status TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  location TEXT,
  appointment_date DATE,
  appointment_time TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  amount NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Time slots table
CREATE TABLE public.time_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location TEXT NOT NULL,
  slot_date DATE NOT NULL,
  slot_time TEXT NOT NULL,
  is_blocked BOOLEAN NOT NULL DEFAULT false,
  is_booked BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (location, slot_date, slot_time)
);

-- Contact messages table
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Blocked dates table
CREATE TABLE public.blocked_dates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location TEXT NOT NULL,
  blocked_date DATE NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (location, blocked_date)
);

-- Enable RLS on all tables
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.time_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocked_dates ENABLE ROW LEVEL SECURITY;

-- Appointments: anyone can insert, service role handles reads/updates via API
CREATE POLICY "Anyone can insert appointments" ON public.appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can select appointments" ON public.appointments FOR SELECT USING (true);
CREATE POLICY "Anyone can update appointments" ON public.appointments FOR UPDATE USING (true);

-- Time slots: anyone can read, anyone can update (booking via API)
CREATE POLICY "Anyone can read time slots" ON public.time_slots FOR SELECT USING (true);
CREATE POLICY "Anyone can update time slots" ON public.time_slots FOR UPDATE USING (true);
CREATE POLICY "Anyone can insert time slots" ON public.time_slots FOR INSERT WITH CHECK (true);

-- Contact messages: anyone can insert and read
CREATE POLICY "Anyone can insert contact messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read contact messages" ON public.contact_messages FOR SELECT USING (true);

-- Blocked dates: anyone can read
CREATE POLICY "Anyone can read blocked dates" ON public.blocked_dates FOR SELECT USING (true);
CREATE POLICY "Anyone can insert blocked dates" ON public.blocked_dates FOR INSERT WITH CHECK (true);

-- Seed time slots for the next 90 days (9:00 to 16:00, 30-min intervals, weekdays only)
DO $$
DECLARE
  loc TEXT;
  d DATE;
  t TEXT;
  h INT;
  m INT;
BEGIN
  FOR loc IN SELECT unnest(ARRAY['Praia', 'Mindelo', 'Sal'])
  LOOP
    FOR d IN SELECT generate_series(CURRENT_DATE, CURRENT_DATE + INTERVAL '90 days', '1 day')::date
    LOOP
      -- Skip weekends (0 = Sunday, 6 = Saturday)
      IF EXTRACT(DOW FROM d) NOT IN (0, 6) THEN
        FOR h IN 9..15
        LOOP
          FOR m IN SELECT unnest(ARRAY[0, 30])
          LOOP
            -- Skip 15:30 (last slot is 15:00)
            IF h = 15 AND m = 30 THEN
              CONTINUE;
            END IF;
            t := LPAD(h::text, 2, '0') || ':' || LPAD(m::text, 2, '0');
            INSERT INTO public.time_slots (location, slot_date, slot_time)
            VALUES (loc, d, t)
            ON CONFLICT (location, slot_date, slot_time) DO NOTHING;
          END LOOP;
        END LOOP;
      END IF;
    END LOOP;
  END LOOP;
END;
$$;
