import { createClient } from '@supabase/supabase-js';

// Vite requires env variables to start with VITE_
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase credentials missing! Check .env file.");
}

export const supabase = createClient(
    supabaseUrl || '',
    supabaseAnonKey || ''
);
