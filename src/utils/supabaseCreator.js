import { createClient } from '@supabase/supabase-js'


const supabase = createClient(
    "https://uibbkatwgyqootsrapta.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMTE4NjcxNSwiZXhwIjoxOTM2NzYyNzE1fQ.oL8U2Ak9a_51iJgjHk-9ZAXLsOJHoBnnMSdq0KxiDPI"
);

export default supabase