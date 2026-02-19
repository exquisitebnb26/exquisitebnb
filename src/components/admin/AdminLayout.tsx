import { useState } from "react";
import { Save, LogOut, RefreshCw, Check, AlertCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { theme } from "./theme";
import LogoImage from "@/assets/Exquisitebnb.png";
import type { SiteContent } from "@/lib/content";
import SiteEditor from "./editors/SiteEditor";
import HomeEditor from "./editors/HomeEditor";
import AboutEditor from "./editors/AboutEditor";
import PropertiesEditor from "./editors/PropertiesEditor";
import ReviewsEditor from "./editors/ReviewsEditor";
import FAQsEditor from "./editors/FAQsEditor";
import ContactEditor from "./editors/ContactEditor";
import BookEditor from "./editors/BookEditor";
import PartnershipEditor from "./editors/PartnershipEditor";
import PmsSync from "./PmsSync";
import { clearToken } from "@/lib/auth/session";

const logout = () => { clearToken(); window.location.href = "/admin"; };
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
  { id: "PMS", label: "PMS Sync", icon: "🔄" },
] as const;

type SectionId = (typeof sections)[number]["id"];

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
  "PMS": "PMS Sync",
};

// ── Editor router ─────────────────────────────────────────────────
function EditorPanel({ section, content, update }: {
  section: SectionId; content: SiteContent; update: (path: string, value: unknown) => void;
}) {
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
    case "PMS": return <PmsSync />;
    default:
  return <div>Section not found</div>;
  }
}

// ── Main Layout ────────────────────────────────────────────────────
interface AdminLayoutProps {
  content: SiteContent;
  update: (path: string, value: unknown) => void;
  onSave: () => void;
  onRefresh: () => void;
  onLogout: () => void;
  saving: boolean;
  loading: boolean;
  saved: boolean;
  error: string | null;
}

export default function AdminLayout({
  content, update, onSave, onRefresh, onLogout,
  saving, loading, saved, error,
}: AdminLayoutProps) {
  const [activeSection, setActiveSection] = useState<SectionId>("site");

  return (
    <div className={`min-h-screen flex ${theme.bg}`}>
      {/* ── Sidebar ── */}
      <aside className={`w-60 flex-shrink-0 ${theme.bgSidebar} border-r ${theme.border} flex flex-col`}>
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

        <div className={`p-4 border-t ${theme.border} space-y-2`}>
          <button
            onClick={logout}
            className={`w-full flex items-center gap-2 px-3 py-2 text-xs ${theme.textDim} hover:${theme.textMuted} transition-colors`}
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0">
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

        <ScrollArea className="flex-1">
          <div className="max-w-3xl mx-auto px-6 py-8">
            <EditorPanel section={activeSection} content={content} update={update} />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
