const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const achieversTable = import.meta.env.VITE_SUPABASE_ACHIEVERS_TABLE || "achievers";
const achieverBucket = import.meta.env.VITE_SUPABASE_ACHIEVER_BUCKET || "achiever-photos";

const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

function getHeaders(extraHeaders = {}) {
  return {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`,
    ...extraHeaders,
  };
}

async function parseResponse(response, fallbackMessage) {
  if (response.ok) {
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      return response.json();
    }

    return response.text();
  }

  let errorMessage = fallbackMessage;

  try {
    const errorPayload = await response.json();
    errorMessage = errorPayload.message || errorPayload.error_description || errorPayload.error || fallbackMessage;
  } catch {
    // Keep the fallback message if the error body is not JSON.
  }

  throw new Error(errorMessage);
}

export async function fetchAchievers() {
  if (!hasSupabaseConfig) {
    throw new Error("Supabase is not configured.");
  }

  const query = new URLSearchParams({
    select: "id,name,role,testimony,image_url,created_at",
    order: "created_at.desc",
  });

  const response = await fetch(`${supabaseUrl}/rest/v1/${achieversTable}?${query.toString()}`, {
    headers: getHeaders({
      Accept: "application/json",
    }),
  });

  return parseResponse(response, "Could not load achievers.");
}

export async function uploadAchieverPhoto(file) {
  if (!hasSupabaseConfig) {
    throw new Error("Supabase is not configured.");
  }

  if (!file) {
    return "";
  }

  const extension = file.name.split(".").pop() || "jpg";
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;
  const response = await fetch(`${supabaseUrl}/storage/v1/object/${achieverBucket}/${fileName}`, {
    method: "POST",
    headers: getHeaders({
      "Content-Type": file.type || "application/octet-stream",
      "x-upsert": "false",
    }),
    body: file,
  });

  await parseResponse(response, "Could not upload the achiever photo.");

  return `${supabaseUrl}/storage/v1/object/public/${achieverBucket}/${fileName}`;
}

export async function createAchieverEntry(entry) {
  if (!hasSupabaseConfig) {
    throw new Error("Supabase is not configured.");
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/${achieversTable}`, {
    method: "POST",
    headers: getHeaders({
      "Content-Type": "application/json",
      Prefer: "return=representation",
    }),
    body: JSON.stringify(entry),
  });

  const rows = await parseResponse(response, "Could not save the achiever entry.");
  return Array.isArray(rows) ? rows[0] : rows;
}

export { achieverBucket, achieversTable, hasSupabaseConfig };
