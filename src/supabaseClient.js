import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fomfnlkfjhrqwutmrlzx.supabase.co';
const supabaseAnonKey = 'sb_publishable_AMzWH-mE-EuW3FUZ8RV0kA_wgB3LISg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);