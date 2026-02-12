import { getToken } from "./session";

const AUTH_BASE = import.meta.env.VITE_CMS_AUTH_URL;
export async function login(email: string, password: string) {
  const res = await fetch(`${AUTH_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || "Login failed");
  return data as { token: string; user: { id: string; email: string; role: string } };
}

export async function me() {
  const token = getToken();
  if (!token) throw new Error("No token");

  const res = await fetch(`${AUTH_BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || "Unauthorized");
  return data as { user: { id: string; email: string; role: string } };
}