import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const city = import.meta.env.VITE_CITY;

export async function validateCode(code: string): Promise<{ valid: boolean; used: boolean; rowId: number | null }> {
  // First check if the code exists for this city
  const { data, error } = await supabase
    .from('Nike_photobooth')
    .select('id, name')
    .ilike('code', code)
    .ilike('city', city)
    .limit(1)
    .single();

  if (error || !data) {
    return { valid: false, used: false, rowId: null };
  }

  // If name is already filled, the code has been used
  if (data.name) {
    return { valid: false, used: true, rowId: null };
  }

  return { valid: true, used: false, rowId: data.id };
}

export async function uploadResultImage(
  imageDataUrl: string,
  fileName: string
): Promise<string | null> {
  // Convert data URL to blob
  const response = await fetch(imageDataUrl);
  const blob = await response.blob();

  const filePath = `${Date.now()}_${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('AI Artistry')
    .upload(filePath, blob, {
      contentType: blob.type,
      upsert: false,
    });

  if (uploadError) {
    console.error('Upload error:', uploadError);
    return null;
  }

  const { data: publicUrlData } = supabase.storage
    .from('AI Artistry')
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}

export async function updateRowWithResult(
  rowId: number,
  name: string,
  imageUrl: string
): Promise<boolean> {
  const { error } = await supabase
    .from('Nike_photobooth')
    .update({ name, image_url: imageUrl })
    .eq('id', rowId);

  if (error) {
    console.error('Update error:', error);
    return false;
  }

  return true;
}
