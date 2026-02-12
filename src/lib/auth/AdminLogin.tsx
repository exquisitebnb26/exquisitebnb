import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { login } from "@/lib/auth/api";
import { saveToken } from "@/lib/auth/session";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setErr(null);
    setLoading(true);
    try {
      const data = await login(email, password);
      saveToken(data.token);
      nav("/admin", { replace: true });
    } catch (e: any) {
      setErr(e.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal text-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-gold/20 bg-charcoal/70 backdrop-blur p-6 shadow-[0_0_30px_rgba(212,175,55,0.12)]">
        <h1 className="text-xl font-semibold tracking-wide">Admin Login</h1>
        <p className="text-sm text-cream-muted mt-1">Exquisitebnb CMS access</p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-xs text-cream-muted">Email</label>
            <input
              className="mt-1 w-full rounded-xl bg-transparent border border-warm-white/10 px-4 py-3 outline-none focus:border-gold/40"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="*****@exquisitebnb.com"
            />
          </div>

          <div>
            <label className="text-xs text-cream-muted">Password</label>
            <div className="mt-1 flex items-center rounded-xl border border-warm-white/10 focus-within:border-gold/40">
              <input
                className="w-full bg-transparent px-4 py-3 outline-none"
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="px-3 py-2 text-cream-muted hover:text-cream transition"
                onClick={() => setShow((s) => !s)}
                aria-label="Toggle password visibility"
              >
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {err ? (
            <div className="text-sm text-red-300 border border-red-500/20 bg-red-500/10 rounded-xl p-3">
              {err}
            </div>
          ) : null}

          <button
            onClick={onSubmit}
            disabled={loading}
            className="w-full rounded-xl border border-gold/30 bg-gold/10 hover:bg-gold/15 transition px-4 py-3 font-medium"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}