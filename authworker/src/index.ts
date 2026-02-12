import { SignJWT, jwtVerify } from "jose";

type Env = {
  exquisitebnb_cms: D1Database;
  JWT_SECRET: string;
  CORS_ORIGIN: string;
  ADMIN_SEED_EMAIL: string;
  ADMIN_SEED_PASSWORD: string;
};

const cors = (env: Env) => ({
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
});

function json(env: Env, data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...cors(env),
    },
  });
}

function bad(env: Env, message: string, status = 400) {
  return json(env, { error: message }, status);
}

async function sha256(text: string) {
  const enc = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", enc);
  return btoa(String.fromCharCode(...new Uint8Array(digest)));
}

/**
 * Password hashing (simple + safe enough for small admin use):
 * - Use scrypt would be ideal, but WebCrypto doesn't provide scrypt easily.
 * - For Cloudflare Workers, we can do PBKDF2 with SHA-256.
 */
async function hashPassword(password: string, saltBase64?: string) {
  const salt = saltBase64
    ? Uint8Array.from(atob(saltBase64), (c) => c.charCodeAt(0))
    : crypto.getRandomValues(new Uint8Array(16));

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt,
      iterations: 100000,
    },
    keyMaterial,
    256
  );

  const hash = new Uint8Array(bits);
  const hashB64 = btoa(String.fromCharCode(...hash));
  const saltB64 = btoa(String.fromCharCode(...salt));
  return `${saltB64}.${hashB64}`;
}

async function verifyPassword(password: string, stored: string) {
  const [saltB64] = stored.split(".");
  const computed = await hashPassword(password, saltB64);
  return computed === stored;
}

async function signToken(env: Env, payload: { sub: string; email: string; role: string }) {
  const secret = new TextEncoder().encode(env.JWT_SECRET);
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secret);
}

async function requireAuth(env: Env, request: Request) {
  const auth = request.headers.get("Authorization");
  if (!auth?.startsWith("Bearer ")) return null;

  const token = auth.slice("Bearer ".length);
  try {
    const secret = new TextEncoder().encode(env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload as any;
  } catch {
    return null;
  }
}

async function ensureSeedAdmin(env: Env) {
  const email = env.ADMIN_SEED_EMAIL?.trim()?.toLowerCase();
  const pass = env.ADMIN_SEED_PASSWORD;
  
  if (!email || !pass) return;
  const existing = await env.exquisitebnb_cms.prepare("SELECT id FROM users WHERE email = ?")
    .bind(email)
    .first();

  if (existing) return;

  const id = crypto.randomUUID();
  const password_hash = await hashPassword(pass);

  await env.exquisitebnb_cms.prepare(
    "INSERT INTO users (id, email, password_hash, role, created_at) VALUES (?, ?, ?, 'admin', ?)"
  )
    .bind(id, email, password_hash, new Date().toISOString())
    .run();
}


export default {
  async fetch(request: Request, env: Env) {
    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors(env) });
    }

	

    // Make sure seed admin exists (safe to run each request)
    await ensureSeedAdmin(env);

    const url = new URL(request.url);
    const path = url.pathname;

    // Health check
    if (request.method === "GET" && path === "/") {
      return json(env, { ok: true, service: "cms-auth" });
    }
		if (path === "/debug") {
  return json(env, {
    hasDB: !!env.exquisitebnb_cms,
    hasJWT: !!env.JWT_SECRET,
    hasSeedEmail: !!env.ADMIN_SEED_EMAIL
  });
}
    // POST /auth/login
    if (request.method === "POST" && path === "/auth/login") {
      const body = await request.json().catch(() => null) as any;
      const email = body?.email?.trim()?.toLowerCase();
      const password = body?.password;
      if (!email || !password) return bad(env, "Missing email/password", 400);

      const user = await env.exquisitebnb_cms.prepare("SELECT id, email, password_hash, role FROM users WHERE email = ?")
        .bind(email)
        .first<any>();
      if (!user) return bad(env, "Invalid credentials", 401);

      const ok = await verifyPassword(password, user.password_hash);
      if (!ok) return bad(env, "Invalid credentials", 401);

      const token = await signToken(env, {
        sub: user.id,
        email: user.email,
        role: user.role,
      });

      return json(env, { token, user: { id: user.id, email: user.email, role: user.role } });
    }

    // GET /auth/me
    if (request.method === "GET" && path === "/auth/me") {
      const payload = await requireAuth(env, request);
      if (!payload) return bad(env, "Unauthorized", 401);
      return json(env, { user: { id: payload.sub, email: payload.email, role: payload.role } });
    }

    return bad(env, "Not found", 404);
  },
};