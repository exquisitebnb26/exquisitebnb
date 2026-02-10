import { useState, useEffect, useCallback } from "react";
import { RefreshCw, AlertCircle, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SiteContent,
  fetchContentFromGitHub,
  saveContentToGitHub,
} from "@/lib/content";
import AdminLayout from "@/components/admin/AdminLayout";
import LogoImage from "@/assets/Exquisitebnb.png";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

// ── Auth Gate ──────────────────────────────────────────────────────

function AdminLogin({ onAuth }: { onAuth: (token: string) => void }) {
  const [token, setToken] = useState("");
  const [showToken, setShowToken] = useState(false);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_7%)] flex items-center justify-center px-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-white rounded-full p-2 w-fit h-fit flex items-center justify-center">
              <img src={LogoImage} alt="Exquisitebnb" className="w-10 h-10 object-contain" />
            </div>
          </div>
          <div>
            <p className="text-[hsl(43_40%_50%)] text-sm tracking-[0.25em] uppercase">
              Admin Access
            </p>
            <h1 className="text-3xl font-serif text-[hsl(40_20%_90%)] mt-1">
              Exquisite<span className="text-[hsl(43_40%_50%)]">bnb</span> CMS
            </h1>
          </div>
          <p className="text-[hsl(40_10%_55%)] text-sm">
            Enter your GitHub Personal Access Token to manage site content.
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Input
              type={showToken ? "text" : "password"}
              placeholder="ghp_token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="bg-[hsl(0_0%_13%)] border-[hsl(0_0%_18%)] text-[hsl(40_20%_90%)] focus-visible:ring-[hsl(43_40%_50%)] pr-10"
            />
            <button
              type="button"
              onClick={() => setShowToken(!showToken)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(40_10%_55%)] hover:text-[hsl(43_40%_50%)]"
            >
              {showToken ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <button
            className="w-full py-3 bg-[hsl(43_40%_50%)] hover:bg-[hsl(43_35%_45%)] text-[hsl(0_0%_8%)] font-medium tracking-widest uppercase text-xs rounded-sm transition-colors disabled:opacity-50"
            disabled={!token.trim()}
            onClick={() => onAuth(token.trim())}
          >
            Authenticate
          </button>
        </div>

        <p className="text-[hsl(40_10%_40%)] text-xs text-center leading-relaxed">
          Your token is stored in this browser session only and is never persisted.
          <br />
          Requires <code className="text-[hsl(43_40%_50%_/_0.6)]">repo</code> scope on the content repository.
        </p>
      </div>
    </div>
  );
}

// ── Main Admin Dashboard ──────────────────────────────────────────

function AdminDashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [sha, setSha] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const loadContent = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { content: c, sha: s } = await fetchContentFromGitHub(token);
      setContent(c);
      setSha(s);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const newSha = await saveContentToGitHub(token, content, sha);
      setSha(newSha);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const update = (path: string, value: unknown) => {
    if (!content) return;
    const newContent = JSON.parse(JSON.stringify(content));
    const keys = path.split(".");
    let obj = newContent;
    for (let i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    setContent(newContent);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[hsl(0_0%_7%)] flex items-center justify-center">
        <div className="text-center space-y-4">
          <RefreshCw className="w-8 h-8 text-[hsl(43_40%_50%)] mx-auto animate-spin" />
          <p className="text-[hsl(40_10%_55%)] text-sm">Loading content…</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-[hsl(0_0%_7%)] flex items-center justify-center px-6">
        <div className="text-center space-y-4">
          <AlertCircle className="w-8 h-8 text-[hsl(0_55%_55%)] mx-auto" />
          <p className="text-[hsl(0_55%_55%)]">{error || "Failed to load content"}</p>
          <Button variant="outline" onClick={loadContent} className="border-[hsl(0_0%_18%)] text-[hsl(40_20%_90%)]">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout
      content={content}
      update={update}
      onSave={handleSave}
      onRefresh={loadContent}
      onLogout={onLogout}
      saving={saving}
      loading={loading}
      saved={saved}
      error={error}
    />
  );
}

// ── Root ────────────────────────────────────────────────────────────

const Admin = () => {
  const [adminUnlocked, setAdminUnlocked] = useState<boolean>(() => sessionStorage.getItem("admin_unlocked") === "true");
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [adminPasswordError, setAdminPasswordError] = useState<string | null>(null);

  const [token, setToken] = useState<string | null>(() =>
    sessionStorage.getItem("cms_token")
  );


  const handleAuth = (t: string) => {
  const cleanToken = t.trim();
  sessionStorage.setItem("cms_token", cleanToken);
  setToken(cleanToken);
};

  const handleLogout = () => {
    sessionStorage.removeItem("cms_token");
    sessionStorage.removeItem("admin_unlocked");
    setToken(null);
    setAdminUnlocked(false);
  };

  const handleAdminUnlock = () => {
    if (adminPasswordInput === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_unlocked", "true");
      setAdminUnlocked(true);
      setAdminPasswordError(null);
      setAdminPasswordInput("");
    } else {
      setAdminPasswordError("Invalid admin password");
    }
  };

  if (!adminUnlocked) {
    return (
      <div className="min-h-screen bg-[hsl(0_0%_7%)] flex items-center justify-center px-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-white rounded-full p-2 w-fit h-fit flex items-center justify-center">
                <img src={LogoImage} alt="Exquisitebnb" className="w-10 h-10 object-contain" />
              </div>
            </div>
            <div>
              <p className="text-[hsl(43_40%_50%)] text-sm tracking-[0.25em] uppercase">
                Admin Access
              </p>
              <h1 className="text-3xl font-serif text-[hsl(40_20%_90%)] mt-1">
                Exquisite<span className="text-[hsl(43_40%_50%)]">bnb</span> CMS
              </h1>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Input
                type={showAdminPassword ? "text" : "password"}
                placeholder="Enter admin password"
                value={adminPasswordInput}
                onChange={(e) => setAdminPasswordInput(e.target.value)}
                className="bg-[hsl(0_0%_13%)] border-[hsl(0_0%_18%)] text-[hsl(40_20%_90%)] focus-visible:ring-[hsl(43_40%_50%)] pr-10"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAdminUnlock();
                  }
                }}
              />
              <button
                type="button"
                onClick={() => setShowAdminPassword(!showAdminPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(40_10%_55%)] hover:text-[hsl(43_40%_50%)]"
              >
                {showAdminPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <button
              className="w-full py-3 bg-[hsl(43_40%_50%)] hover:bg-[hsl(43_35%_45%)] text-[hsl(0_0%_8%)] font-medium tracking-widest uppercase text-xs rounded-sm transition-colors disabled:opacity-50"
              onClick={handleAdminUnlock}
              disabled={!adminPasswordInput.trim()}
            >
              Unlock Admin
            </button>
            {adminPasswordError && (
              <p className="text-[hsl(0_55%_55%)] text-xs text-center">{adminPasswordError}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!token) return <AdminLogin onAuth={handleAuth} />;
  return <AdminDashboard token={token} onLogout={handleLogout} />;
};

export default Admin;
