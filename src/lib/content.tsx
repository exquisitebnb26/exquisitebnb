import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// ── Types ──────────────────────────────────────────────────────────

export interface SiteContent {
  site: {
    brandName: string;
    tagline: string;
    description: string;
    supportEmail: string;
    phone: string;
    address: string;
    officeName: string;
    mapEmbedUrl: string;
    instagram: string;
    twitter: string;
    copyrightText: string;
    footerTagline: string;
  };
  home: {
    hero: { label: string; title: string; titleItalic: string; subtitle: string; cta1Text: string; cta1Link: string; cta2Text: string; cta2Link: string };
    philosophy: { label: string; title: string; titleItalic: string; text: string };
    features: {
      label: string; title: string; titleAccent: string;
      items: Array<{ icon: string; title: string; description: string }>;
    };
    propertiesPreview: { label: string; title: string; ctaText: string };
    testimonials: {
      label: string; title: string; platformNote: string;
      items: Array<{ rating: number; text: string; author: string }>;
    };
    cta: { title: string; titleItalic: string; subtitle: string; cta1Text: string; cta1Link: string; cta2Text: string; cta2Link: string };
  };
  about: {
    header: { label: string; title: string; subtitle: string };
    story: { title: string; titleItalic: string; paragraphs: string[] };
    philosophy: {
      label: string; title: string;
      values: Array<{ icon: string; title: string; description: string }>;
    };
    closing: { title: string; titleItalic: string; text: string; signature: string };
  };
  properties: {
    header: { label: string; title: string; subtitle: string };
    bookingNote: string;
    platforms: string[];
    items: Array<{
      id: string; name: string; location: string; guests: number;
      bedrooms: number; bathrooms: number; rating: number; reviewCount: number;
      description: string; fullDescription: string;
      imageKey: string; galleryKeys: string[];
      amenities: string[];
      reviews: Array<{ rating: number; text: string; author: string }>;
      bookingLinks: { airbnb: string; vrbo: string; bookingcom: string };
      bookingPlatforms: string[];
    }>;
  };
  faqs: {
    header: { label: string; title: string; subtitle: string };
    items: Array<{ question: string; answer: string }>;
    contactCta: { text: string; linkText: string };
  };
  contact: {
    header: { label: string; title: string; subtitle: string };
    formNote: string;
    successTitle: string;
    successText: string;
  };
  book: {
    header: { label: string; title: string; subtitle: string };
    whyTrusted: {
      title: string; subtitle: string;
      features: Array<{ icon: string; title: string; description: string }>;
    };
    platforms: {
      title: string; subtitle: string;
      items: Array<{ name: string; description: string; url: string }>;
    };
    transparencyNote: string;
    browseCta: { title: string; subtitle: string; linkText: string };
  };
  partnership: {
    hero: { label: string; title: string; subtitle: string };
    whyPartner: {
      label: string; title: string; text: string;
      cards: Array<{ icon: string; title: string; description: string }>;
    };
    differentiators: {
      label: string; title: string;
      items: Array<{ title: string; description: string }>;
    };
    benefits: {
      label: string; title: string;
      items: Array<{ icon: string; title: string; description: string }>;
    };
    idealPartners: {
      label: string; title: string; items: string[];
      noteFull: { label: string; title: string; text1: string; text2: string };
    };
    process: {
      label: string; title: string; subtitle: string;
      steps: Array<{ step: string; title: string; description: string }>;
    };
    cta: { title: string; subtitle: string; ctaText: string; note: string };
  };
}

// ── Context ────────────────────────────────────────────────────────

interface ContentContextValue {
  content: SiteContent | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

const ContentContext = createContext<ContentContextValue>({
  content: null,
  isLoading: true,
  error: null,
  refresh: () => {},
});

// ── Provider ───────────────────────────────────────────────────────

// GitHub config – update these when you configure your repo
const GITHUB_OWNER = "OWNER";
const GITHUB_REPO = "REPO";
const CONTENT_PATH = "public/content.json";

async function fetchContent(): Promise<SiteContent> {
  // Try GitHub raw first (for live updates), fall back to local
  try {
    const res = await fetch(`/content.json?t=${Date.now()}`);
    if (!res.ok) throw new Error("Local fetch failed");
    return res.json();
  } catch {
    const res = await fetch(`/content.json`);
    return res.json();
  }
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setIsLoading(true);
    fetchContent()
      .then((data) => {
        setContent(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <ContentContext.Provider value={{ content, isLoading, error, refresh: load }}>
      {children}
    </ContentContext.Provider>
  );
}

// ── Hook ───────────────────────────────────────────────────────────


export function useContent() {
  const ctx = useContext(ContentContext);
  return ctx;
}

// ── GitHub API helpers (for admin) ─────────────────────────────────

export async function fetchContentFromGitHub(token: string): Promise<{ content: SiteContent; sha: string }> {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${CONTENT_PATH}`,
    { headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github.v3+json" } }
  );
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const data = await res.json();
  const decoded = JSON.parse(atob(data.content));
  return { content: decoded, sha: data.sha };
}

export async function saveContentToGitHub(
  token: string,
  content: SiteContent,
  sha: string,
  message = "Update site content via CMS"
): Promise<string> {
  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(content, null, 2))));
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${CONTENT_PATH}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, content: encoded, sha }),
    }
  );
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || `GitHub API error: ${res.status}`);
  }
  const data = await res.json();
  return data.content.sha;
}

export { GITHUB_OWNER, GITHUB_REPO, CONTENT_PATH };
