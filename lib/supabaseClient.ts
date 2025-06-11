import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Attempt to read Supabase URL and Anon Key from environment variables
// For Vite projects, environment variables are accessed via import.meta.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if the environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Supabase URL and Anon Key are required. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file.'
  );
}

// Initialize the Supabase client
// The generic type argument for createClient can be used for full type safety
// with your database schema, but is optional for basic usage.
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);
