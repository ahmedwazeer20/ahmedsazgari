import { createClient } from "@supabase/supabase-js";

// Same project, same publishable key as the static site — this key is meant
// to be public (RLS governs actual access), so no env var is required for parity.
const supabaseUrl = "https://unzlwbmoxturkdsbijqt.supabase.co";
const supabaseKey = "sb_publishable_fL2Eyod5AsbBaNfie3Rivw_Q2eJjBBb";

export const supabaseClient = createClient(supabaseUrl, supabaseKey);
