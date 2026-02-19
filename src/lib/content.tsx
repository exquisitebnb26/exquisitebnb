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



function safeJsonParse(value: string | null | undefined) {

  try {
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}

async function fetchContent(): Promise<SiteContent> {
  const baseUrl = import.meta.env.VITE_CMS_WORKER_URL;
  // 1️⃣ Fetch all CMS sections (except properties.items)
  const contentRes = await fetch(`${baseUrl}/public/content`);
  if (!contentRes.ok) {
    throw new Error("Failed to fetch CMS content");
  }
  const contentData = await contentRes.json();

  if (!contentData?.sections) {
    throw new Error("Invalid CMS response format");
  }

  // Normalize array response -> object keyed by section key
  const sectionsArray = contentData.sections;
  const sections: any = {};

  if (Array.isArray(sectionsArray)) {
    for (const section of sectionsArray) {
      if (section?.key && section?.content) {
        sections[section.key] = section.content;
      }
    }
  } else {
    Object.assign(sections, sectionsArray);
  }

  // 2️⃣ Fetch live properties from properties table
  const propertiesRes = await fetch(`${baseUrl}/public/properties`);
  if (!propertiesRes.ok) {
    throw new Error("Failed to fetch properties");
  }

  const propertiesData = await propertiesRes.json();

  // Expected: { properties: [...] }
  if (Array.isArray(propertiesData?.properties)) {
    const normalized = propertiesData.properties.map((p: any) => ({
      ...p,
      galleryKeys: typeof p.gallery_keys === "string"
        ? safeJsonParse(p.gallery_keys)
        : p.galleryKeys || [],
      amenities: typeof p.amenities === "string"
        ? safeJsonParse(p.amenities)
        : p.amenities || [],
      idealFor: typeof p.ideal_for === "string"
        ? safeJsonParse(p.ideal_for)
        : p.idealFor || [],
      bookingPlatforms: typeof p.booking_platforms === "string"
        ? safeJsonParse(p.booking_platforms)
        : p.bookingPlatforms || [],
      reviews: typeof p.reviews === "string"
        ? safeJsonParse(p.reviews)
        : Array.isArray(p.reviews)
        ? p.reviews
        : [],
    }));

    sections.properties = {
      ...sections.properties,
      items: normalized
    };
  }

  return sections;
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
    `${cmsWorkerUrl}/admin/content`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch admin CMS content");
  }

  const data = await res.json();

  if (!data?.sections) {
    throw new Error("Invalid admin CMS response format");
  }

  const sectionsArray = data.sections;
  const normalized: any = {};

  if (Array.isArray(sectionsArray)) {
    for (const section of sectionsArray) {
      if (section?.key && section?.content) {
        normalized[section.key] = section;
      }
    }
  } else {
    Object.assign(normalized, sectionsArray);
  }

  return normalized as SiteContent;
}


export async function saveSectionToCMS(sectionKey: string, content: any) {
  const token = localStorage.getItem("cms_jwt");

  const res = await fetch(
    `${cmsWorkerUrl}/admin/section/${sectionKey}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ content })
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to save section: ${sectionKey}`);
  }

  return res.json();
}


