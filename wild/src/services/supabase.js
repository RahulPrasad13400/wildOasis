import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://vfmgvdufuahvohrnxdgb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmbWd2ZHVmdWFodm9ocm54ZGdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2NzYzMTksImV4cCI6MjA1MDI1MjMxOX0.VwzTNZiNqPIQUEBIk5-f1ryadOf_7NAcQre4JZQ9xlQ'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase