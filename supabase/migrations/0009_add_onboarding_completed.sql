-- Add onboarding_completed column to profiles table
-- This column tracks whether a user has completed the onboarding flow after signup.
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false;

-- Backfill: mark existing profiles as completed so returning users aren't sent back to onboarding.
UPDATE public.profiles
SET onboarding_completed = true
WHERE onboarding_completed IS NULL OR onboarding_completed = false;

-- Allow authenticated users to insert their own profile row.
-- This is a safety net for cases where the DB trigger (handle_new_user) fails to create
-- the profile automatically (e.g. during OAuth signup). Without this, the upsert in
-- completeOnboarding() would silently fail for those users.
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
