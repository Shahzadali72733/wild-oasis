import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xllthasqbpwnbmqkxrnr.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsbHRoYXNxYnB3bmJtcWt4cm5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwMjA5NDUsImV4cCI6MjA3MTU5Njk0NX0.RE8oa6N85ELff6iVOYLR43bsAcJGvGADpOQlnlGWcLc";
const supabase = createClient ( supabaseUrl , supabaseKey);
export default supabase;