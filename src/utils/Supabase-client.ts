import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ykkxvbkcaiuajmeecmxe.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlra3h2YmtjYWl1YWptZWVjbXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzNjMwNzcsImV4cCI6MjA2MzkzOTA3N30.p8r7Yd3Gce8kP7Aejuw3lWnmu8ekqL6qPz7-gjwjMow"
);
export default supabase;
