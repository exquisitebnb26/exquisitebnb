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
    designedForRealLife?: {
      label: string; title: string; titleItalic: string; subtitle: string;
      items: Array<{ icon: string; title: string; description: string }>;
    };
    whyNotHotel?: {
      label: string; title: string; titleItalic: string;
      items: Array<{ point: string; detail: string }>;
    };
    propertiesPreview: { label: string; title: string; ctaText: string };
    testimonials: {
      label: string; title: string; platformNote: string;
      items: Array<{ rating: number; text: string; author: string; label: string }>;
    };
    cta: { title: string; titleItalic: string; subtitle: string; cta1Text: string; cta1Link: string; cta2Text: string; cta2Link: string };
  };
  about: {
  header: {
    label: string;
    title: {
      primary: string;
      accent: string;
    };
    subtitle: string;
  };
    story: { title: string; titleItalic: { primary: string; accent: string }; paragraphs: string[] };
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
      idealFor?: string[];
      reviews: Array<{ rating: number; text: string; author: string; label: string }>;
      bookingLinks: { airbnb: string; vrbo: string; bookingcom: string };
      bookingPlatforms: Array<{
  name: string;
  url: string;
}>;
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



async function fetchContent(): Promise<SiteContent> {
  const [contentRes, pmsRes] = await Promise.all([
    fetch(`/content.json?t=${Date.now()}`),
    fetch(`/pms.json?t=${Date.now()}`).catch(() => null),
  ]);

  const contentData = await contentRes.json();

  let pmsData = null;
  if (pmsRes && pmsRes.ok) {
    pmsData = await pmsRes.json();
  }

  // Normalize PMS structure
  let normalizedPmsProperties: any[] = [];

  if (Array.isArray(pmsData?.properties)) {
    // Standard structure
    normalizedPmsProperties = pmsData.properties;
  } else if (
    Array.isArray(pmsData?.items) &&
    Array.isArray(pmsData.items[0]?.properties)
  ) {
    // Nested structure: items[0].properties
    normalizedPmsProperties = pmsData.items[0].properties;
  }

  if (normalizedPmsProperties.length > 0) {
    contentData.properties.items = mergeProperties(
      contentData.properties.items || [],
      normalizedPmsProperties
    );
  }

  return contentData;
}

function mergeProperties(cmsItems: any[] = [], pmsItems: any[] = []) {
  if (!Array.isArray(pmsItems)) return cmsItems;

  return pmsItems.map((pmsProp) => {
    // PMS structure should contain id directly, not nested under properties
    const cmsProp = cmsItems.find((c) => c.id === pmsProp.id);

    return {
      ...cmsProp,   // CMS editable fields (optional overrides)
      ...pmsProp,   // PMS core fields
    };
  });
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

const cmsWorkerUrl = import.meta.env.VITE_CMS_WORKER_URL;

export async function fetchContentFromCMS() {
  const token = localStorage.getItem("cms_jwt");
  const res = await fetch(
    `${cmsWorkerUrl}cms/content`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.json();
}

export async function saveContentToCMS(content: SiteContent, sha: string) {
  const token = localStorage.getItem("cms_jwt");

  const res = await fetch(
    `${cmsWorkerUrl}/cms/content`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ content, sha })
    }
  );

  return res.json();
}


