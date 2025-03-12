import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://escyylkafiltunujfiyu.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzY3l5bGthZmlsdHVudWpmaXl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMzY0NzAsImV4cCI6MjA1NjgxMjQ3MH0.NGDwvH1tYB4rYaO2_ktEK9T_Gt08EKHSZzx7fzuiQbQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
