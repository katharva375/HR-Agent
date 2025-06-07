import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Attempt to read Supabase URL and Anon Key from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Check if the environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Supabase URL and Anon Key are required. Make sure SUPABASE_URL and SUPABASE_ANON_KEY are set in your environment variables.'
  );
}

// Initialize the Supabase client
// The generic type argument for createClient can be used for full type safety
// with your database schema, but is optional for basic usage.
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);
