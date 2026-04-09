const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const achieversTable = import.meta.env.VITE_SUPABASE_ACHIEVERS_TABLE || "achievers";
const campaignsTable = import.meta.env.VITE_SUPABASE_CAMPAIGNS_TABLE || "campaigns";
const campaignMembershipsTable =
  import.meta.env.VITE_SUPABASE_CAMPAIGN_MEMBERSHIPS_TABLE || "campaign_memberships";
const achieverBucket = import.meta.env.VITE_SUPABASE_ACHIEVER_BUCKET || "achiever-photos";
const reportsTable = import.meta.env.VITE_SUPABASE_REPORTS_TABLE || "plastic_reports";
const reportBucket = import.meta.env.VITE_SUPABASE_REPORT_BUCKET || "plastic-report-photos";
const sessionStorageKey = "plastic-management-auth-session";

const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

function getHeaders(extraHeaders = {}, bearerToken = supabaseAnonKey) {
  return {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${bearerToken}`,
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
    errorMessage =
      errorPayload.message ||
      errorPayload.error_description ||
      errorPayload.msg ||
      errorPayload.error ||
      fallbackMessage;
  } catch {
    // Keep fallback message when the response body is not JSON.
  }

  throw new Error(errorMessage);
}

function ensureSupabaseConfig() {
  if (!hasSupabaseConfig) {
    throw new Error("Supabase is not configured.");
  }
}

export function getStoredSession() {
  try {
    const rawSession = window.localStorage.getItem(sessionStorageKey);
    return rawSession ? JSON.parse(rawSession) : null;
  } catch {
    return null;
  }
}

function storeSession(session) {
  window.localStorage.setItem(sessionStorageKey, JSON.stringify(session));
}

export function clearStoredSession() {
  window.localStorage.removeItem(sessionStorageKey);
}

export async function fetchCurrentUser(accessToken) {
  ensureSupabaseConfig();

  const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: getHeaders(
      {
        Accept: "application/json",
      },
      accessToken
    ),
  });

  return parseResponse(response, "Could not load the current user.");
}

export async function signUpWithEmail({ email, password, fullName }) {
  ensureSupabaseConfig();

  const response = await fetch(`${supabaseUrl}/auth/v1/signup`, {
    method: "POST",
    headers: getHeaders({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      email,
      password,
      data: {
        full_name: fullName,
      },
    }),
  });

  const payload = await parseResponse(response, "Could not sign up.");

  if (payload.session) {
    storeSession(payload.session);
  }

  return payload;
}

export async function signInWithEmail({ email, password }) {
  ensureSupabaseConfig();

  const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: getHeaders({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const payload = await parseResponse(response, "Could not sign in.");

  if (payload.access_token) {
    const session = {
      access_token: payload.access_token,
      refresh_token: payload.refresh_token,
      token_type: payload.token_type,
      expires_in: payload.expires_in,
      expires_at: payload.expires_at,
      user: payload.user,
    };
    storeSession(session);
    return session;
  }

  throw new Error("Could not sign in.");
}

export async function signOutUser(accessToken) {
  ensureSupabaseConfig();

  try {
    await fetch(`${supabaseUrl}/auth/v1/logout`, {
      method: "POST",
      headers: getHeaders({}, accessToken),
    });
  } finally {
    clearStoredSession();
  }
}

export async function fetchAchievers() {
  ensureSupabaseConfig();

  const query = new URLSearchParams({
    select: "id,name,role,testimony,image_url,video_url,created_at",
    order: "created_at.desc",
  });

  const response = await fetch(`${supabaseUrl}/rest/v1/${achieversTable}?${query.toString()}`, {
    headers: getHeaders({
      Accept: "application/json",
    }),
  });

  return parseResponse(response, "Could not load achievers.");
}

async function uploadAssetToBucket(file, bucketName, fallbackMessage) {
  ensureSupabaseConfig();

  if (!file) {
    return "";
  }

  const extension = file.name.split(".").pop() || "jpg";
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;
  const response = await fetch(`${supabaseUrl}/storage/v1/object/${bucketName}/${fileName}`, {
    method: "POST",
    headers: getHeaders({
      "Content-Type": file.type || "application/octet-stream",
      "x-upsert": "false",
    }),
    body: file,
  });

  await parseResponse(response, fallbackMessage);

  return `${supabaseUrl}/storage/v1/object/public/${bucketName}/${fileName}`;
}

export async function uploadAchieverPhoto(file) {
  return uploadAssetToBucket(file, achieverBucket, "Could not upload the achiever photo.");
}

export async function uploadAchieverVideo(file) {
  return uploadAssetToBucket(file, achieverBucket, "Could not upload the achiever video.");
}

export async function uploadReportPhoto(file) {
  return uploadAssetToBucket(file, reportBucket, "Could not upload the report photo.");
}

export async function createAchieverEntry(entry) {
  ensureSupabaseConfig();

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

export async function fetchCampaigns() {
  ensureSupabaseConfig();

  const query = new URLSearchParams({
    select:
      "id,name,organizer,contact_email,cities,plastic_collected,joined_people,social_followers,next_drive,description,owner_user_id,is_active,created_at",
    order: "created_at.desc",
  });

  const response = await fetch(`${supabaseUrl}/rest/v1/${campaignsTable}?${query.toString()}`, {
    headers: getHeaders({
      Accept: "application/json",
    }),
  });

  return parseResponse(response, "Could not load campaigns.");
}

export async function createCampaign(entry, accessToken) {
  ensureSupabaseConfig();

  const response = await fetch(`${supabaseUrl}/rest/v1/${campaignsTable}`, {
    method: "POST",
    headers: getHeaders(
      {
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      accessToken
    ),
    body: JSON.stringify(entry),
  });

  const rows = await parseResponse(response, "Could not create the campaign.");
  return Array.isArray(rows) ? rows[0] : rows;
}

export async function fetchUserCampaignMemberships(userId, accessToken) {
  ensureSupabaseConfig();

  const query = new URLSearchParams({
    select: "id,user_id,campaign_id,created_at",
    user_id: `eq.${userId}`,
    order: "created_at.desc",
  });

  const response = await fetch(
    `${supabaseUrl}/rest/v1/${campaignMembershipsTable}?${query.toString()}`,
    {
      headers: getHeaders(
        {
          Accept: "application/json",
        },
        accessToken
      ),
    }
  );

  return parseResponse(response, "Could not load joined campaigns.");
}

export async function joinCampaign(entry, accessToken) {
  ensureSupabaseConfig();

  const response = await fetch(`${supabaseUrl}/rest/v1/${campaignMembershipsTable}`, {
    method: "POST",
    headers: getHeaders(
      {
        "Content-Type": "application/json",
        Prefer: "resolution=ignore-duplicates,return=representation",
      },
      accessToken
    ),
    body: JSON.stringify(entry),
  });

  const rows = await parseResponse(response, "Could not join the campaign.");
  return Array.isArray(rows) ? rows[0] ?? null : rows;
}

export async function fetchPlasticReports() {
  ensureSupabaseConfig();

  const query = new URLSearchParams({
    select: "id,reporter_name,area,address,image_url,created_at",
    order: "created_at.desc",
  });

  const response = await fetch(`${supabaseUrl}/rest/v1/${reportsTable}?${query.toString()}`, {
    headers: getHeaders({
      Accept: "application/json",
    }),
  });

  return parseResponse(response, "Could not load plastic reports.");
}

export async function createPlasticReport(entry) {
  ensureSupabaseConfig();

  const response = await fetch(`${supabaseUrl}/rest/v1/${reportsTable}`, {
    method: "POST",
    headers: getHeaders({
      "Content-Type": "application/json",
      Prefer: "return=representation",
    }),
    body: JSON.stringify(entry),
  });

  const rows = await parseResponse(response, "Could not create the plastic report.");
  return Array.isArray(rows) ? rows[0] : rows;
}

export {
  achieverBucket,
  achieversTable,
  campaignsTable,
  campaignMembershipsTable,
  reportBucket,
  reportsTable,
  hasSupabaseConfig,
};
