import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// FUTURES PROP FIRMS
export async function getFuturesPropFirms() {
  const { data, error } = await supabase
    .from('futures_prop_firms')
    .select('*')
    .order('featured', { ascending: false })
    .order('rating', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getFuturesPropFirmBySlug(slug: string) {
  const { data, error } = await supabase
    .from('futures_prop_firms')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getFeaturedFuturesFirms() {
  const { data, error } = await supabase
    .from('futures_prop_firms')
    .select('*')
    .eq('featured', true)
    .order('rating', { ascending: false });

  if (error) throw error;
  return data;
}

// CFD PROP FIRMS
export async function getCFDPropFirms() {
  const { data, error } = await supabase
    .from('cfd_prop_firms')
    .select('*')
    .order('featured', { ascending: false })
    .order('rating', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getCFDPropFirmBySlug(slug: string) {
  const { data, error } = await supabase
    .from('cfd_prop_firms')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getFeaturedCFDFirms() {
  const { data, error } = await supabase
    .from('cfd_prop_firms')
    .select('*')
    .eq('featured', true)
    .order('rating', { ascending: false });

  if (error) throw error;
  return data;
}

// FUTURES REVIEWS
export async function getFuturesReviews(futuresFirmId: string) {
  const { data, error } = await supabase
    .from('futures_reviews')
    .select('*')
    .eq('futures_firm_id', futuresFirmId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// CFD REVIEWS
export async function getCFDReviews(cfdFirmId: string) {
  const { data, error } = await supabase
    .from('cfd_reviews')
    .select('*')
    .eq('cfd_firm_id', cfdFirmId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// FUTURES EDUCATION
export async function getFuturesGuidesByCategory(category: string) {
  const { data, error } = await supabase
    .from('futures_education_guides')
    .select('*')
    .eq('category', category)
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getAllFuturesGuides() {
  const { data, error } = await supabase
    .from('futures_education_guides')
    .select('*')
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getFuturesGuideBySlug(slug: string) {
  const { data, error } = await supabase
    .from('futures_education_guides')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw error;
  return data;
}

// CFD EDUCATION
export async function getCFDGuidesByCategory(category: string) {
  const { data, error } = await supabase
    .from('cfd_education_guides')
    .select('*')
    .eq('category', category)
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getAllCFDGuides() {
  const { data, error } = await supabase
    .from('cfd_education_guides')
    .select('*')
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getCFDGuideBySlug(slug: string) {
  const { data, error } = await supabase
    .from('cfd_education_guides')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw error;
  return data;
}

// COMPARISONS
export async function getComparisonPair(slug: string, type: 'futures' | 'cfd') {
  const { data, error } = await supabase
    .from('comparison_pairs')
    .select('*')
    .eq('comparison_slug', slug)
    .eq('type', type)
    .maybeSingle();

  if (error) throw error;
  return data;
}
