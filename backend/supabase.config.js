// src/supabaseClient.js
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hntpjoaspbmrmjclgieq.supabase.co' // from Supabase dashboard
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhudHBqb2FzcGJtcm1qY2xnaWVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwNDcyNTEsImV4cCI6MjA1OTYyMzI1MX0.Y612Uq9wdurObVJbBEw7SD-O3zHH5hKNEBex-izD1Ro' // from Supabase > Project Settings > API

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase; // ✅ CommonJS export
