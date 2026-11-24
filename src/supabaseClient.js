import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'VITE_SUPABASE_URL=https://fomfnlkfjhrqwutmrlzx.supabase.co';
const supabaseAnonKey = 'VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_AMzWH-mE-EuW3FUZ8RV0kA_wgB3LISg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);