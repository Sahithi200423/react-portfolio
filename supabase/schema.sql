-- ============================================================================
-- SUPABASE SCHEMA: PORTFOLIO CONTACT MESSAGES & ROW LEVEL SECURITY (RLS)
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ============================================================================

-- 1. Create the 'messages' table with strict column types and constraints
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,

    -- Security & Data Hygiene Constraints:
    CONSTRAINT name_length CHECK (char_length(trim(name)) >= 2 AND char_length(name) <= 100),
    CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT subject_length CHECK (char_length(trim(subject)) >= 3 AND char_length(subject) <= 150),
    CONSTRAINT message_length CHECK (char_length(trim(message)) >= 10 AND char_length(message) <= 3000)
);

-- 2. Add an index on created_at for fast administrative querying
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages (created_at DESC);

-- 3. Enable Row Level Security (RLS)
-- This ensures that NO ONE can access rows unless an explicit policy allows it.
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- 4. INSERT Policy: Allow public anonymous visitors to insert a message
-- Anonymous visitors can ONLY insert their message; they CANNOT see or query other messages.
DROP POLICY IF EXISTS "Allow anonymous visitors to insert messages" ON public.messages;
CREATE POLICY "Allow anonymous visitors to insert messages"
ON public.messages
FOR INSERT
TO anon, authenticated
WITH CHECK (
    char_length(trim(name)) >= 2 AND
    char_length(trim(subject)) >= 3 AND
    char_length(trim(message)) >= 10
);

-- ============================================================================
-- SECURITY ASSURANCE & ANTI-SPAM NOTICE:
-- 1. Notice there is NO 'SELECT' policy created for anon.
--    This ensures random visitors cannot read or leak private messages!
-- 2. Only the project owner / authenticated service role in the Supabase Dashboard
--    can view submitted messages in the Table Editor.
-- 3. In high-traffic production environments, consider adding a Supabase Edge Function
--    with Cloudflare Turnstile or reCAPTCHA to prevent automated spam bot scripts.
-- ============================================================================
