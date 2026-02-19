import { useState, useEffect, useCallback } from "react";
import { RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SiteContent,
  fetchContentFromCMS,
  saveSectionToCMS,
} from "@/lib/content";
import AdminLayout from "@/components/admin/AdminLayout";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// ── Main Admin Dashboard ──────────────────────────────────────────

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const loadContent = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const c = await fetchContentFromCMS();
      setContent(c);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      // Save each top-level section individually
      const entries = Object.entries(content);

      for (const [sectionKey, sectionValue] of entries) {
        await saveSectionToCMS(sectionKey, sectionValue);
      }

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
  const navigate = useNavigate();
  const token = localStorage.getItem("cms_jwt");
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("cms_jwt");
    navigate("/login", { replace: true });
  };

  return <AdminDashboard onLogout={handleLogout} />;
};

export default Admin;
