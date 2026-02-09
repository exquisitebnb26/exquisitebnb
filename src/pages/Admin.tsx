import { useState, useEffect, useCallback } from "react";
import { Save, LogOut, RefreshCw, ChevronDown, ChevronRight, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  SiteContent,
  fetchContentFromGitHub,
  saveContentToGitHub,
} from "@/lib/content";

// ── Auth Gate ──────────────────────────────────────────────────────

function AdminLogin({ onAuth }: { onAuth: (token: string) => void }) {
  const [token, setToken] = useState("");

  return (
    <div className="min-h-screen bg-cream-warm dark:bg-charcoal flex items-center justify-center px-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <p className="text-[hsl(var(--forest-dark))] dark:text-gold text-sm tracking-[0.25em] uppercase">
            Admin Access
          </p>
          <h1 className="text-3xl font-serif text-[hsl(var(--forest-dark))] dark:text-cream">
            Exquisitebnb CMS
          </h1>
          <p className="text-[hsl(var(--forest-dark))]/60 dark:text-cream-muted text-sm">
            Enter your GitHub Personal Access Token to manage site content.
          </p>
        </div>

        <div className="space-y-4">
          <Input
            type="password"
            placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="bg-cream dark:bg-charcoal-light border-[hsl(var(--forest-dark))] dark:border-border text-[hsl(var(--forest-dark))] dark:text-cream"
          />
          <Button
            variant="luxuryGold"
            className="w-full"
            disabled={!token.trim()}
            onClick={() => onAuth(token.trim())}
          >
            Authenticate
          </Button>
        </div>

        <p className="text-[hsl(var(--forest-dark))]/40 dark:text-cream-muted/60 text-xs text-center leading-relaxed">
          Your token is stored in this browser session only and is never persisted.
          <br />
          Requires <code className="text-[hsl(var(--forest-dark))]/60 dark:text-gold/60">repo</code> scope on the content repository.
        </p>
      </div>
    </div>
  );
}

// ── Section Editor ─────────────────────────────────────────────────

function SectionEditor({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-[hsl(var(--forest-dark))]/20 dark:border-border rounded-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 bg-cream-soft dark:bg-charcoal-light hover:bg-cream dark:hover:bg-card transition-colors text-left"
      >
        <span className="font-serif text-lg text-[hsl(var(--forest-dark))] dark:text-cream">
          {title}
        </span>
        {open ? (
          <ChevronDown className="w-5 h-5 text-[hsl(var(--forest-dark))]/60 dark:text-cream-muted" />
        ) : (
          <ChevronRight className="w-5 h-5 text-[hsl(var(--forest-dark))]/60 dark:text-cream-muted" />
        )}
      </button>
      {open && <div className="p-6 space-y-4 bg-cream dark:bg-card">{children}</div>}
    </div>
  );
}

// ── Field Components ───────────────────────────────────────────────

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted uppercase tracking-wider">
        {label}
      </label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-cream-soft dark:bg-charcoal-light border-[hsl(var(--forest-dark))]/20 dark:border-border text-[hsl(var(--forest-dark))] dark:text-cream"
      />
    </div>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted uppercase tracking-wider">
        {label}
      </label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="bg-cream-soft dark:bg-charcoal-light border-[hsl(var(--forest-dark))]/20 dark:border-border text-[hsl(var(--forest-dark))] dark:text-cream resize-none"
      />
    </div>
  );
}

// ── Main Admin ─────────────────────────────────────────────────────

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

  // Helper to update nested content
  const update = (path: string, value: any) => {
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
      <div className="min-h-screen bg-cream-warm dark:bg-charcoal flex items-center justify-center">
        <div className="text-center space-y-4">
          <RefreshCw className="w-8 h-8 text-[hsl(var(--forest-dark))] dark:text-gold mx-auto animate-spin" />
          <p className="text-[hsl(var(--forest-dark))]/70 dark:text-cream-muted text-sm">Loading content…</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-cream-warm dark:bg-charcoal flex items-center justify-center px-6">
        <div className="text-center space-y-4">
          <AlertCircle className="w-8 h-8 text-red-400 mx-auto" />
          <p className="text-red-400">{error || "Failed to load content"}</p>
          <Button variant="luxuryOutline" onClick={loadContent}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-warm dark:bg-charcoal">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-cream-warm/95 dark:bg-charcoal/95 backdrop-blur-sm border-b border-[hsl(var(--forest-dark))]/10 dark:border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-xl text-[hsl(var(--forest-dark))] dark:text-cream">
              Content Manager
            </h1>
            <p className="text-xs text-[hsl(var(--forest-dark))]/50 dark:text-cream-muted">
              Exquisitebnb CMS
            </p>
          </div>

          <div className="flex items-center gap-3">
            {error && (
              <span className="text-red-400 text-xs flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {error}
              </span>
            )}
            {saved && (
              <span className="text-green-500 text-xs flex items-center gap-1">
                <Check className="w-3 h-3" /> Saved
              </span>
            )}
            <Button
              variant="luxuryOutline"
              size="sm"
              onClick={loadContent}
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 mr-1 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button
              variant="luxuryGold"
              size="sm"
              onClick={handleSave}
              disabled={saving}
            >
              <Save className="w-4 h-4 mr-1" />
              {saving ? "Saving…" : "Save to GitHub"}
            </Button>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content Editor */}
      <div className="container mx-auto px-6 py-8 max-w-4xl space-y-4">
        {/* Site */}
        <SectionEditor title="🏠 Site Settings" defaultOpen>
          <TextField label="Brand Name" value={content.site.brandName} onChange={(v) => update("site.brandName", v)} />
          <TextField label="Tagline" value={content.site.tagline} onChange={(v) => update("site.tagline", v)} />
          <TextAreaField label="Description" value={content.site.description} onChange={(v) => update("site.description", v)} />
          <TextField label="Support Email" value={content.site.supportEmail} onChange={(v) => update("site.supportEmail", v)} />
          <TextField label="Phone" value={content.site.phone} onChange={(v) => update("site.phone", v)} />
          <TextField label="Address" value={content.site.address} onChange={(v) => update("site.address", v)} />
          <TextField label="Instagram URL" value={content.site.instagram} onChange={(v) => update("site.instagram", v)} />
          <TextField label="Twitter URL" value={content.site.twitter} onChange={(v) => update("site.twitter", v)} />
        </SectionEditor>

        {/* Home */}
        <SectionEditor title="🏡 Home Page">
          <p className="text-xs text-[hsl(var(--forest-dark))]/50 dark:text-cream-muted uppercase tracking-wider font-medium">Hero</p>
          <TextField label="Label" value={content.home.hero.label} onChange={(v) => update("home.hero.label", v)} />
          <TextField label="Title" value={content.home.hero.title} onChange={(v) => update("home.hero.title", v)} />
          <TextField label="Title (Italic)" value={content.home.hero.titleItalic} onChange={(v) => update("home.hero.titleItalic", v)} />
          <TextAreaField label="Subtitle" value={content.home.hero.subtitle} onChange={(v) => update("home.hero.subtitle", v)} />
          <TextField label="CTA 1 Text" value={content.home.hero.cta1Text} onChange={(v) => update("home.hero.cta1Text", v)} />
          <TextField label="CTA 2 Text" value={content.home.hero.cta2Text} onChange={(v) => update("home.hero.cta2Text", v)} />

          <div className="h-px bg-[hsl(var(--forest-dark))]/10 dark:bg-border my-4" />
          <p className="text-xs text-[hsl(var(--forest-dark))]/50 dark:text-cream-muted uppercase tracking-wider font-medium">Philosophy</p>
          <TextField label="Title" value={content.home.philosophy.title} onChange={(v) => update("home.philosophy.title", v)} />
          <TextField label="Title (Italic)" value={content.home.philosophy.titleItalic} onChange={(v) => update("home.philosophy.titleItalic", v)} />
          <TextAreaField label="Text" value={content.home.philosophy.text} onChange={(v) => update("home.philosophy.text", v)} rows={4} />

          <div className="h-px bg-[hsl(var(--forest-dark))]/10 dark:bg-border my-4" />
          <p className="text-xs text-[hsl(var(--forest-dark))]/50 dark:text-cream-muted uppercase tracking-wider font-medium">CTA Section</p>
          <TextField label="Title" value={content.home.cta.title} onChange={(v) => update("home.cta.title", v)} />
          <TextField label="Title (Italic)" value={content.home.cta.titleItalic} onChange={(v) => update("home.cta.titleItalic", v)} />
          <TextAreaField label="Subtitle" value={content.home.cta.subtitle} onChange={(v) => update("home.cta.subtitle", v)} />
        </SectionEditor>

        {/* About */}
        <SectionEditor title="📖 About Page">
          <TextField label="Header Title" value={content.about.header.title} onChange={(v) => update("about.header.title", v)} />
          <TextAreaField label="Header Subtitle" value={content.about.header.subtitle} onChange={(v) => update("about.header.subtitle", v)} />
          <TextField label="Story Title" value={content.about.story.title} onChange={(v) => update("about.story.title", v)} />
          {content.about.story.paragraphs.map((p, i) => (
            <TextAreaField
              key={i}
              label={`Story Paragraph ${i + 1}`}
              value={p}
              rows={3}
              onChange={(v) => {
                const paras = [...content.about.story.paragraphs];
                paras[i] = v;
                update("about.story.paragraphs", paras);
              }}
            />
          ))}
          <TextField label="Closing Title" value={content.about.closing.title} onChange={(v) => update("about.closing.title", v)} />
          <TextAreaField label="Closing Text" value={content.about.closing.text} onChange={(v) => update("about.closing.text", v)} rows={3} />
          <TextField label="Signature" value={content.about.closing.signature} onChange={(v) => update("about.closing.signature", v)} />
        </SectionEditor>

        {/* Properties */}
        <SectionEditor title="🏘️ Properties">
          <TextField label="Header Title" value={content.properties.header.title} onChange={(v) => update("properties.header.title", v)} />
          <TextAreaField label="Header Subtitle" value={content.properties.header.subtitle} onChange={(v) => update("properties.header.subtitle", v)} />
          {content.properties.items.map((prop, i) => (
            <div key={prop.id} className="border border-[hsl(var(--forest-dark))]/10 dark:border-border rounded-sm p-4 space-y-3">
              <p className="font-serif text-[hsl(var(--forest-dark))] dark:text-cream">{prop.name}</p>
              <TextField label="Name" value={prop.name} onChange={(v) => { const items = [...content.properties.items]; items[i] = { ...items[i], name: v }; update("properties.items", items); }} />
              <TextField label="Location" value={prop.location} onChange={(v) => { const items = [...content.properties.items]; items[i] = { ...items[i], location: v }; update("properties.items", items); }} />
              <TextAreaField label="Short Description" value={prop.description} onChange={(v) => { const items = [...content.properties.items]; items[i] = { ...items[i], description: v }; update("properties.items", items); }} />
              <TextAreaField label="Full Description" value={prop.fullDescription} rows={4} onChange={(v) => { const items = [...content.properties.items]; items[i] = { ...items[i], fullDescription: v }; update("properties.items", items); }} />
              <TextField label="Airbnb URL" value={prop.bookingLinks.airbnb} onChange={(v) => { const items = [...content.properties.items]; items[i] = { ...items[i], bookingLinks: { ...items[i].bookingLinks, airbnb: v } }; update("properties.items", items); }} />
              <TextField label="VRBO URL" value={prop.bookingLinks.vrbo} onChange={(v) => { const items = [...content.properties.items]; items[i] = { ...items[i], bookingLinks: { ...items[i].bookingLinks, vrbo: v } }; update("properties.items", items); }} />
              <TextField label="Booking.com URL" value={prop.bookingLinks.bookingcom} onChange={(v) => { const items = [...content.properties.items]; items[i] = { ...items[i], bookingLinks: { ...items[i].bookingLinks, bookingcom: v } }; update("properties.items", items); }} />
            </div>
          ))}
        </SectionEditor>

        {/* FAQs */}
        <SectionEditor title="❓ FAQs">
          {content.faqs.items.map((faq, i) => (
            <div key={i} className="border border-[hsl(var(--forest-dark))]/10 dark:border-border rounded-sm p-4 space-y-3">
              <TextField label={`Question ${i + 1}`} value={faq.question} onChange={(v) => { const items = [...content.faqs.items]; items[i] = { ...items[i], question: v }; update("faqs.items", items); }} />
              <TextAreaField label="Answer" value={faq.answer} rows={3} onChange={(v) => { const items = [...content.faqs.items]; items[i] = { ...items[i], answer: v }; update("faqs.items", items); }} />
            </div>
          ))}
        </SectionEditor>

        {/* Contact */}
        <SectionEditor title="📬 Contact Page">
          <TextField label="Title" value={content.contact.header.title} onChange={(v) => update("contact.header.title", v)} />
          <TextAreaField label="Subtitle" value={content.contact.header.subtitle} onChange={(v) => update("contact.header.subtitle", v)} />
          <TextField label="Success Title" value={content.contact.successTitle} onChange={(v) => update("contact.successTitle", v)} />
          <TextAreaField label="Success Text" value={content.contact.successText} onChange={(v) => update("contact.successText", v)} />
          <TextAreaField label="Form Note" value={content.contact.formNote} onChange={(v) => update("contact.formNote", v)} />
        </SectionEditor>

        {/* Book */}
        <SectionEditor title="📅 Book Page">
          <TextField label="Title" value={content.book.header.title} onChange={(v) => update("book.header.title", v)} />
          <TextAreaField label="Subtitle" value={content.book.header.subtitle} onChange={(v) => update("book.header.subtitle", v)} />
          <TextAreaField label="Transparency Note" value={content.book.transparencyNote} onChange={(v) => update("book.transparencyNote", v)} rows={3} />
          {content.book.platforms.items.map((plat, i) => (
            <div key={i} className="border border-[hsl(var(--forest-dark))]/10 dark:border-border rounded-sm p-4 space-y-3">
              <TextField label="Platform Name" value={plat.name} onChange={(v) => { const items = [...content.book.platforms.items]; items[i] = { ...items[i], name: v }; update("book.platforms.items", items); }} />
              <TextAreaField label="Description" value={plat.description} onChange={(v) => { const items = [...content.book.platforms.items]; items[i] = { ...items[i], description: v }; update("book.platforms.items", items); }} />
              <TextField label="URL" value={plat.url} onChange={(v) => { const items = [...content.book.platforms.items]; items[i] = { ...items[i], url: v }; update("book.platforms.items", items); }} />
            </div>
          ))}
        </SectionEditor>

        {/* Partnership */}
        <SectionEditor title="🤝 Partnership Page">
          <TextField label="Hero Title" value={content.partnership.hero.title} onChange={(v) => update("partnership.hero.title", v)} />
          <TextAreaField label="Hero Subtitle" value={content.partnership.hero.subtitle} onChange={(v) => update("partnership.hero.subtitle", v)} />
          <TextField label="CTA Title" value={content.partnership.cta.title} onChange={(v) => update("partnership.cta.title", v)} />
          <TextAreaField label="CTA Subtitle" value={content.partnership.cta.subtitle} onChange={(v) => update("partnership.cta.subtitle", v)} />
          <TextField label="CTA Button Text" value={content.partnership.cta.ctaText} onChange={(v) => update("partnership.cta.ctaText", v)} />
        </SectionEditor>

        {/* Testimonials */}
        <SectionEditor title="⭐ Testimonials">
          {content.home.testimonials.items.map((t, i) => (
            <div key={i} className="border border-[hsl(var(--forest-dark))]/10 dark:border-border rounded-sm p-4 space-y-3">
              <TextAreaField label={`Review ${i + 1}`} value={t.text} onChange={(v) => { const items = [...content.home.testimonials.items]; items[i] = { ...items[i], text: v }; update("home.testimonials.items", items); }} />
              <TextField label="Author" value={t.author} onChange={(v) => { const items = [...content.home.testimonials.items]; items[i] = { ...items[i], author: v }; update("home.testimonials.items", items); }} />
            </div>
          ))}
        </SectionEditor>
      </div>
    </div>
  );
}

// ── Root ────────────────────────────────────────────────────────────

const Admin = () => {
  const [token, setToken] = useState<string | null>(() =>
    sessionStorage.getItem("cms_token")
  );

  const handleAuth = (t: string) => {
    sessionStorage.setItem("cms_token", t);
    setToken(t);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("cms_token");
    setToken(null);
  };

  if (!token) return <AdminLogin onAuth={handleAuth} />;
  return <AdminDashboard token={token} onLogout={handleLogout} />;
};

export default Admin;
