import { useState } from "react";
import { Save, LogOut, RefreshCw, Check, AlertCircle, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import LogoImage from "@/assets/Exquisitebnb.png";
import type { SiteContent } from "@/lib/content";

// ── Admin-scoped tokens (always dark, gold accents) ────────────────
const theme = {
  bg: "bg-[hsl(0_0%_7%)]",
  bgSidebar: "bg-[hsl(0_0%_9%)]",
  bgPanel: "bg-[hsl(0_0%_10%)]",
  bgInput: "bg-[hsl(0_0%_13%)]",
  bgHover: "bg-[hsl(0_0%_14%)]",
  text: "text-[hsl(40_20%_90%)]",
  textMuted: "text-[hsl(40_10%_60%)]",
  textDim: "text-[hsl(40_10%_45%)]",
  gold: "text-[hsl(43_40%_50%)]",
  goldBg: "bg-[hsl(43_40%_50%)]",
  goldBgHover: "hover:bg-[hsl(43_35%_45%)]",
  border: "border-[hsl(0_0%_16%)]",
  borderGold: "border-[hsl(43_40%_50%)]",
  ring: "focus-visible:ring-[hsl(43_40%_50%)]",
};

// ── Nav sections ───────────────────────────────────────────────────
const sections = [
  { id: "site", label: "Site Settings", icon: "⚙" },
  { id: "home", label: "Home", icon: "🏠" },
  { id: "about", label: "About", icon: "📖" },
  { id: "properties", label: "Properties", icon: "🏘" },
  { id: "reviews", label: "Reviews", icon: "⭐" },
  { id: "faqs", label: "FAQs", icon: "❓" },
  { id: "contact", label: "Contact", icon: "📬" },
  { id: "book", label: "Book", icon: "📅" },
  { id: "partnership", label: "Partnership", icon: "🤝" },
] as const;

type SectionId = (typeof sections)[number]["id"];

// ── Field helpers ──────────────────────────────────────────────────

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1.5">
      <label className={`text-xs ${theme.textDim} uppercase tracking-wider`}>{label}</label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${theme.bgInput} ${theme.border} ${theme.text} ${theme.ring} border rounded-sm`}
      />
    </div>
  );
}

function TextAreaField({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div className="space-y-1.5">
      <label className={`text-xs ${theme.textDim} uppercase tracking-wider`}>{label}</label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className={`${theme.bgInput} ${theme.border} ${theme.text} ${theme.ring} border rounded-sm resize-none`}
      />
    </div>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <>
      <div className={`h-px ${theme.border.replace("border", "bg")} my-4`} />
      <p className={`text-xs ${theme.textDim} uppercase tracking-wider font-medium`}>{label}</p>
    </>
  );
}

// ── Section Editors ────────────────────────────────────────────────

function SiteEditor({ content, update }: EditorProps) {
  return (
    <div className="space-y-4">
      <TextField label="Brand Name" value={content.site.brandName} onChange={(v) => update("site.brandName", v)} />
      <TextField label="Tagline" value={content.site.tagline} onChange={(v) => update("site.tagline", v)} />
      <TextAreaField label="Description" value={content.site.description} onChange={(v) => update("site.description", v)} />
      <TextField label="Support Email" value={content.site.supportEmail} onChange={(v) => update("site.supportEmail", v)} />
      <TextField label="Phone" value={content.site.phone} onChange={(v) => update("site.phone", v)} />
      <TextField label="Address" value={content.site.address} onChange={(v) => update("site.address", v)} />
      <TextField label="Instagram URL" value={content.site.instagram} onChange={(v) => update("site.instagram", v)} />
      <TextField label="Twitter URL" value={content.site.twitter} onChange={(v) => update("site.twitter", v)} />
    </div>
  );
}

function HomeEditor({ content, update }: EditorProps) {
  return (
    <div className="space-y-4">
      <SectionDivider label="Hero" />
      <TextField label="Label" value={content.home.hero.label} onChange={(v) => update("home.hero.label", v)} />
      <TextField label="Title" value={content.home.hero.title} onChange={(v) => update("home.hero.title", v)} />
      <TextField label="Title (Italic)" value={content.home.hero.titleItalic} onChange={(v) => update("home.hero.titleItalic", v)} />
      <TextAreaField label="Subtitle" value={content.home.hero.subtitle} onChange={(v) => update("home.hero.subtitle", v)} />
      <TextField label="CTA 1 Text" value={content.home.hero.cta1Text} onChange={(v) => update("home.hero.cta1Text", v)} />
      <TextField label="CTA 2 Text" value={content.home.hero.cta2Text} onChange={(v) => update("home.hero.cta2Text", v)} />

      <SectionDivider label="Philosophy" />
      <TextField label="Title" value={content.home.philosophy.title} onChange={(v) => update("home.philosophy.title", v)} />
      <TextField label="Title (Italic)" value={content.home.philosophy.titleItalic} onChange={(v) => update("home.philosophy.titleItalic", v)} />
      <TextAreaField label="Text" value={content.home.philosophy.text} onChange={(v) => update("home.philosophy.text", v)} rows={4} />

      <SectionDivider label="CTA Section" />
      <TextField label="Title" value={content.home.cta.title} onChange={(v) => update("home.cta.title", v)} />
      <TextField label="Title (Italic)" value={content.home.cta.titleItalic} onChange={(v) => update("home.cta.titleItalic", v)} />
      <TextAreaField label="Subtitle" value={content.home.cta.subtitle} onChange={(v) => update("home.cta.subtitle", v)} />
    </div>
  );
}

function AboutEditor({ content, update }: EditorProps) {
  return (
    <div className="space-y-4">
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
    </div>
  );
}

function PropertiesEditor({ content, update }: EditorProps) {
  return (
    <div className="space-y-4">
      <TextField label="Header Title" value={content.properties.header.title} onChange={(v) => update("properties.header.title", v)} />
      <TextAreaField label="Header Subtitle" value={content.properties.header.subtitle} onChange={(v) => update("properties.header.subtitle", v)} />
      {content.properties.items.map((prop, i) => (
        <div key={prop.id} className={`border ${theme.border} rounded-sm p-4 space-y-3`}>
          <p className={`font-serif ${theme.text}`}>{prop.name}</p>
          <TextField label="Name" value={prop.name} onChange={(v) => { const items = [...content.properties.items]; items[i] = { ...items[i], name: v }; update("properties.items", items); }} />
          <TextField label="Location" value={prop.location} onChange={(v) => { const items = [...content.properties.items]; items[i] = { ...items[i], location: v }; update("properties.items", items); }} />
          <TextAreaField label="Short Description" value={prop.description} onChange={(v) => { const items = [...content.properties.items]; items[i] = { ...items[i], description: v }; update("properties.items", items); }} />
          <TextAreaField label="Full Description" value={prop.fullDescription} rows={4} onChange={(v) => { const items = [...content.properties.items]; items[i] = { ...items[i], fullDescription: v }; update("properties.items", items); }} />
          <TextField label="Airbnb URL" value={prop.bookingLinks.airbnb} onChange={(v) => { const items = [...content.properties.items]; items[i] = { ...items[i], bookingLinks: { ...items[i].bookingLinks, airbnb: v } }; update("properties.items", items); }} />
          <TextField label="VRBO URL" value={prop.bookingLinks.vrbo} onChange={(v) => { const items = [...content.properties.items]; items[i] = { ...items[i], bookingLinks: { ...items[i].bookingLinks, vrbo: v } }; update("properties.items", items); }} />
          <TextField label="Booking.com URL" value={prop.bookingLinks.bookingcom} onChange={(v) => { const items = [...content.properties.items]; items[i] = { ...items[i], bookingLinks: { ...items[i].bookingLinks, bookingcom: v } }; update("properties.items", items); }} />
        </div>
      ))}
    </div>
  );
}

function ReviewsEditor({ content, update }: EditorProps) {
  const items = content.home.testimonials.items;

  const addReview = () => {
    const newItems = [...items, { rating: 5, text: "", author: "" }];
    update("home.testimonials.items", newItems);
  };

  const removeReview = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    update("home.testimonials.items", newItems);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className={`text-sm ${theme.textMuted}`}>{items.length} review{items.length !== 1 ? "s" : ""}</p>
        <button
          onClick={addReview}
          className={`flex items-center gap-1.5 text-xs ${theme.gold} hover:opacity-80 transition-opacity uppercase tracking-wider font-medium`}
        >
          <Plus className="w-3.5 h-3.5" />
          Add Review
        </button>
      </div>

      <div className={`border ${theme.border} rounded-sm overflow-hidden`}>
        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className="p-4 space-y-4">
            {items.map((t, i) => (
              <div key={i} className={`border ${theme.border} rounded-sm p-4 space-y-3 ${theme.bgInput}`}>
                <div className="flex items-start justify-between">
                  <span className={`text-xs ${theme.textDim} uppercase tracking-wider`}>Review {i + 1}</span>
                  <button
                    onClick={() => removeReview(i)}
                    className="text-[hsl(0_55%_50%)] hover:text-[hsl(0_55%_60%)] transition-colors p-1"
                    title="Remove review"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <TextAreaField
                  label="Review Text"
                  value={t.text}
                  onChange={(v) => {
                    const newItems = [...items];
                    newItems[i] = { ...newItems[i], text: v };
                    update("home.testimonials.items", newItems);
                  }}
                />
                <TextField
                  label="Author"
                  value={t.author}
                  onChange={(v) => {
                    const newItems = [...items];
                    newItems[i] = { ...newItems[i], author: v };
                    update("home.testimonials.items", newItems);
                  }}
                />
              </div>
            ))}
            {items.length === 0 && (
              <p className={`text-center py-12 ${theme.textDim} text-sm`}>
                No reviews yet. Click "+ Add Review" to get started.
              </p>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

function FAQsEditor({ content, update }: EditorProps) {
  return (
    <div className="space-y-4">
      {content.faqs.items.map((faq, i) => (
        <div key={i} className={`border ${theme.border} rounded-sm p-4 space-y-3`}>
          <TextField label={`Question ${i + 1}`} value={faq.question} onChange={(v) => { const items = [...content.faqs.items]; items[i] = { ...items[i], question: v }; update("faqs.items", items); }} />
          <TextAreaField label="Answer" value={faq.answer} rows={3} onChange={(v) => { const items = [...content.faqs.items]; items[i] = { ...items[i], answer: v }; update("faqs.items", items); }} />
        </div>
      ))}
    </div>
  );
}

function ContactEditor({ content, update }: EditorProps) {
  return (
    <div className="space-y-4">
      <TextField label="Title" value={content.contact.header.title} onChange={(v) => update("contact.header.title", v)} />
      <TextAreaField label="Subtitle" value={content.contact.header.subtitle} onChange={(v) => update("contact.header.subtitle", v)} />
      <TextField label="Success Title" value={content.contact.successTitle} onChange={(v) => update("contact.successTitle", v)} />
      <TextAreaField label="Success Text" value={content.contact.successText} onChange={(v) => update("contact.successText", v)} />
      <TextAreaField label="Form Note" value={content.contact.formNote} onChange={(v) => update("contact.formNote", v)} />
    </div>
  );
}

function BookEditor({ content, update }: EditorProps) {
  return (
    <div className="space-y-4">
      <TextField label="Title" value={content.book.header.title} onChange={(v) => update("book.header.title", v)} />
      <TextAreaField label="Subtitle" value={content.book.header.subtitle} onChange={(v) => update("book.header.subtitle", v)} />
      <TextAreaField label="Transparency Note" value={content.book.transparencyNote} onChange={(v) => update("book.transparencyNote", v)} rows={3} />
      {content.book.platforms.items.map((plat, i) => (
        <div key={i} className={`border ${theme.border} rounded-sm p-4 space-y-3`}>
          <TextField label="Platform Name" value={plat.name} onChange={(v) => { const items = [...content.book.platforms.items]; items[i] = { ...items[i], name: v }; update("book.platforms.items", items); }} />
          <TextAreaField label="Description" value={plat.description} onChange={(v) => { const items = [...content.book.platforms.items]; items[i] = { ...items[i], description: v }; update("book.platforms.items", items); }} />
          <TextField label="URL" value={plat.url} onChange={(v) => { const items = [...content.book.platforms.items]; items[i] = { ...items[i], url: v }; update("book.platforms.items", items); }} />
        </div>
      ))}
    </div>
  );
}

function PartnershipEditor({ content, update }: EditorProps) {
  return (
    <div className="space-y-4">
      <TextField label="Hero Title" value={content.partnership.hero.title} onChange={(v) => update("partnership.hero.title", v)} />
      <TextAreaField label="Hero Subtitle" value={content.partnership.hero.subtitle} onChange={(v) => update("partnership.hero.subtitle", v)} />
      <TextField label="CTA Title" value={content.partnership.cta.title} onChange={(v) => update("partnership.cta.title", v)} />
      <TextAreaField label="CTA Subtitle" value={content.partnership.cta.subtitle} onChange={(v) => update("partnership.cta.subtitle", v)} />
      <TextField label="CTA Button Text" value={content.partnership.cta.ctaText} onChange={(v) => update("partnership.cta.ctaText", v)} />
    </div>
  );
}

// ── Types ──────────────────────────────────────────────────────────

interface EditorProps {
  content: SiteContent;
  update: (path: string, value: any) => void;
}

// ── Section title map ─────────────────────────────────────────────

const sectionTitles: Record<SectionId, string> = {
  site: "Site Settings",
  home: "Home Page",
  about: "About Page",
  properties: "Properties",
  reviews: "Reviews",
  faqs: "FAQs",
  contact: "Contact Page",
  book: "Book Page",
  partnership: "Partnership Page",
};

// ── Editor router ─────────────────────────────────────────────────

function EditorPanel({ section, content, update }: { section: SectionId; content: SiteContent; update: (path: string, value: any) => void }) {
  switch (section) {
    case "site": return <SiteEditor content={content} update={update} />;
    case "home": return <HomeEditor content={content} update={update} />;
    case "about": return <AboutEditor content={content} update={update} />;
    case "properties": return <PropertiesEditor content={content} update={update} />;
    case "reviews": return <ReviewsEditor content={content} update={update} />;
    case "faqs": return <FAQsEditor content={content} update={update} />;
    case "contact": return <ContactEditor content={content} update={update} />;
    case "book": return <BookEditor content={content} update={update} />;
    case "partnership": return <PartnershipEditor content={content} update={update} />;
  }
}

// ── Main Layout ────────────────────────────────────────────────────

interface AdminLayoutProps {
  content: SiteContent;
  update: (path: string, value: any) => void;
  onSave: () => void;
  onRefresh: () => void;
  onLogout: () => void;
  saving: boolean;
  loading: boolean;
  saved: boolean;
  error: string | null;
}

export default function AdminLayout({
  content,
  update,
  onSave,
  onRefresh,
  onLogout,
  saving,
  loading,
  saved,
  error,
}: AdminLayoutProps) {
  const [activeSection, setActiveSection] = useState<SectionId>("site");

  return (
    <div className={`min-h-screen flex ${theme.bg}`}>
      {/* ── Sidebar ── */}
      <aside className={`w-60 flex-shrink-0 ${theme.bgSidebar} border-r ${theme.border} flex flex-col`}>
        {/* Brand */}
        <div className={`p-5 border-b ${theme.border}`}>
          <div className="flex items-center gap-2.5">
            <div className="bg-white rounded-full p-1.5 w-fit h-fit flex items-center justify-center flex-shrink-0">
              <img src={LogoImage} alt="Exquisitebnb" className="w-7 h-7 object-contain" />
            </div>
            <div className="flex flex-col">
              <span className={`text-sm font-serif tracking-wide ${theme.text}`}>
                Exquisite<span className={theme.gold}>bnb</span>
              </span>
              <span className={`text-[10px] ${theme.textDim} uppercase tracking-widest`}>CMS</span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3">
          {sections.map((s) => {
            const isActive = activeSection === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center gap-3 px-5 py-2.5 text-left text-sm transition-colors ${
                  isActive
                    ? `${theme.gold} bg-[hsl(43_40%_50%_/_0.08)] border-r-2 border-[hsl(43_40%_50%)]`
                    : `${theme.textMuted} hover:${theme.text} hover:bg-[hsl(0_0%_12%)]`
                }`}
              >
                <span className="text-base w-5 text-center">{s.icon}</span>
                <span className="tracking-wide">{s.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className={`p-4 border-t ${theme.border} space-y-2`}>
          <button
            onClick={onLogout}
            className={`w-full flex items-center gap-2 px-3 py-2 text-xs ${theme.textDim} hover:${theme.textMuted} transition-colors`}
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className={`h-14 flex-shrink-0 flex items-center justify-between px-6 border-b ${theme.border} ${theme.bgPanel}`}>
          <h1 className={`font-serif text-lg ${theme.text}`}>{sectionTitles[activeSection]}</h1>

          <div className="flex items-center gap-3">
            {error && (
              <span className="text-[hsl(0_55%_55%)] text-xs flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {error}
              </span>
            )}
            {saved && (
              <span className={`${theme.gold} text-xs flex items-center gap-1`}>
                <Check className="w-3 h-3" /> Saved
              </span>
            )}
            <button
              onClick={onRefresh}
              disabled={loading}
              className={`flex items-center gap-1.5 text-xs ${theme.textMuted} hover:${theme.text} transition-colors disabled:opacity-50`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              onClick={onSave}
              disabled={saving}
              className={`flex items-center gap-1.5 text-xs px-4 py-2 rounded-sm ${theme.goldBg} ${theme.goldBgHover} text-[hsl(0_0%_8%)] font-medium tracking-wider uppercase transition-colors disabled:opacity-50`}
            >
              <Save className="w-3.5 h-3.5" />
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </header>

        {/* Editor content */}
        <ScrollArea className="flex-1">
          <div className="max-w-3xl mx-auto px-6 py-8">
            <EditorPanel section={activeSection} content={content} update={update} />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
