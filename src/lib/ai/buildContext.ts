

type AnyObj = Record<string, any>;

type VectorSnippet = {
  title?: string;
  text: string;
  score?: number;
};

type BuildContextOptions = {
  /** Optional: top semantic snippets returned from vector search for the current user question */
  vectorSnippets?: VectorSnippet[] | string[];
  /** Optional: limit total context characters (defaults to 8000) */
  maxChars?: number;
  /** Optional: max number of properties to include (defaults to 10) */
  maxProperties?: number;
  /** Optional: max number of FAQ items to include (defaults to 12) */
  maxFaqs?: number;
};

function isObject(v: any): v is Record<string, any> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

function clean(s: string): string {
  return (s || "")
    .replace(/\s+/g, " ")
    .replace(/\u00A0/g, " ")
    .trim();
}

function clampText(s: string, maxLen: number): string {
  const t = clean(s);
  if (!t) return "";
  if (t.length <= maxLen) return t;
  return t.slice(0, maxLen - 1).trimEnd() + "…";
}

function safeText(v: any, maxLen = 700): string {
  if (!v) return "";
  if (typeof v === "string") return clampText(v, maxLen);
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  if (Array.isArray(v)) {
    const parts = v
      .map((x) => safeText(x, Math.min(maxLen, 400)))
      .map(clean)
      .filter(Boolean);
    return clampText(parts.join(" | "), maxLen);
  }
  if (isObject(v)) {
    // Avoid dumping giant objects. Prefer the most human-friendly fields.
    const preferredKeys = [
      "label",
      "title",
      "titleItalic",
      "subtitle",
      "text",
      "description",
      "ctaText",
      "cta1Text",
      "cta2Text",
      "note",
      "platformNote",
      "bookingNote",
    ];

    const picked: string[] = [];
    for (const k of preferredKeys) {
      if (v[k]) {
        const chunk = safeText(v[k], Math.min(maxLen, 400));
        if (chunk) picked.push(chunk);
      }
    }

    // If we still have nothing, take a shallow value scan but keep it short.
    if (!picked.length) {
      const shallow = Object.values(v)
        .slice(0, 8)
        .map((x) => safeText(x, 250))
        .map(clean)
        .filter(Boolean);
      picked.push(...shallow);
    }

    return clampText(picked.join(" | "), maxLen);
  }
  return "";
}

function formatList(items: string[], prefix = "- "): string {
  const lines = items.map((s) => clean(s)).filter(Boolean);
  return lines.length ? lines.map((x) => `${prefix}${x}`).join("\n") : "";
}

function formatVectorSnippets(snips?: VectorSnippet[] | string[], max = 5): string {
  if (!snips || !Array.isArray(snips) || snips.length === 0) return "";

  const normalized: VectorSnippet[] = snips
    .slice(0, max)
    .map((s: any) =>
      typeof s === "string" ? { text: s } : { title: s?.title, text: s?.text ?? "", score: s?.score }
    )
    .filter((s) => clean(s.text).length > 0)
    .map((s) => ({
      title: s.title ? clampText(String(s.title), 80) : undefined,
      text: clampText(String(s.text), 280),
      score: typeof s.score === "number" ? s.score : undefined,
    }));

  if (!normalized.length) return "";

  const lines = normalized.map((s, i) => {
    const score = typeof s.score === "number" ? ` (score ${s.score.toFixed(3)})` : "";
    const title = s.title ? `${s.title}${score}` : `Result ${i + 1}${score}`;
    return `• ${title}: ${s.text}`;
  });

  return [
    "RELEVANT MATCHES (use these first):",
    ...lines,
    "",
  ].join("\n");
}

function pickHomeSummary(home: AnyObj): string {
  const hero = home?.hero ?? {};
  const philosophy = home?.philosophy ?? {};

  const heroLine = [
    safeText(hero?.title, 90),
    safeText(hero?.titleItalic, 90),
    safeText(hero?.subtitle, 180),
  ]
    .map(clean)
    .filter(Boolean)
    .join(" | ");

  const philosophyLine = safeText(philosophy?.text ?? philosophy, 220);

  const lines: string[] = [];
  if (heroLine) lines.push(`Hero: ${heroLine}`);
  if (philosophyLine) lines.push(`Approach: ${philosophyLine}`);

  return lines.length ? lines.join("\n") : "";
}

function pickAboutSummary(about: AnyObj): string {
  const header = about?.header ?? {};
  const story = about?.story ?? {};

  const headerLine = [safeText(header?.title?.primary ?? header?.title, 60), safeText(header?.subtitle, 180)]
    .map(clean)
    .filter(Boolean)
    .join(" | ");

  const storyLine = safeText(story?.paragraphs ?? story?.text ?? story, 260);

  const lines: string[] = [];
  if (headerLine) lines.push(`About: ${headerLine}`);
  if (storyLine) lines.push(`Story: ${storyLine}`);

  return lines.length ? lines.join("\n") : "";
}

function formatProperties(properties: any[], maxProperties: number): string {
  const list = (Array.isArray(properties) ? properties : []).slice(0, maxProperties);
  if (!list.length) return "";

  const lines = list
    .map((p: any) => {
      const id = clean(p?.id ?? "");
      const name = clean(p?.name ?? "");
      const location = clean(p?.location ?? "");
      const guests = p?.guests ? `Sleeps ${p.guests}` : "";
      const beds = p?.bedrooms ? `${p.bedrooms} BR` : "";
      const baths = p?.bathrooms ? `${p.bathrooms} BA` : "";
      const rating = p?.rating ? `★ ${p.rating}` : "";
      const about = clampText(p?.description ?? "", 180);

      const amenities = Array.isArray(p?.amenities)
        ? p.amenities.slice(0, 10).map(clean).filter(Boolean).join(", ")
        : "";

      const platforms = Array.isArray(p?.bookingPlatforms)
        ? p.bookingPlatforms
            .slice(0, 5)
            .map((b: any) => clean(b?.name ?? ""))
            .filter(Boolean)
            .join(", ")
        : "";

      const meta = [location, guests, beds, baths, rating].map(clean).filter(Boolean).join(" | ");
      const head = [name || id || "Property", meta].map(clean).filter(Boolean).join(" — ");

      const detailBits = [about ? `About: ${about}` : "", amenities ? `Amenities: ${amenities}` : "", platforms ? `Booking: ${platforms}` : ""]
        .filter(Boolean)
        .join(" | ");

      return `• ${head}${detailBits ? `\n  ${detailBits}` : ""}`;
    })
    .filter(Boolean);

  return lines.join("\n");
}

function formatFaqs(faqs: any[], maxFaqs: number): string {
  const list = (Array.isArray(faqs) ? faqs : []).slice(0, maxFaqs);
  if (!list.length) return "";

  const lines = list
    .map((f: any) => {
      const q = clean(f?.question ?? f?.q ?? "");
      const a = clampText(String(f?.answer ?? f?.a ?? ""), 260);
      if (!q && !a) return "";
      if (!q) return `• ${a}`;
      if (!a) return `• Q: ${q}`;
      return `• Q: ${q}\n  A: ${a}`;
    })
    .filter(Boolean);

  return lines.join("\n");
}

function formatAvailabilitySummary(content: AnyObj): string {
  // Expect one of these shapes (you can adapt later as you finalize your schema):
  // 1) content.availabilitySummary: { [propertyId]: { nextBlocked?: string[], note?: string } }
  // 2) content.availabilityByProperty: { [propertyId]: [{start_date,end_date,status}] }
  // 3) content.availability: same as (2)
  const byProp =
    content?.availabilityByProperty ??
    content?.availability ??
    content?.availability_summary ??
    content?.availabilitySummary;

  if (!byProp) return "";

  const lines: string[] = [];

  if (isObject(byProp)) {
    const entries = Object.entries(byProp).slice(0, 12);
    for (const [propertyId, v] of entries) {
      if (Array.isArray(v)) {
        const ranges = v
          .slice(0, 6)
          .map((r: any) => {
            const s = clean(r?.start_date ?? r?.startDate ?? "");
            const e = clean(r?.end_date ?? r?.endDate ?? "");
            const st = clean(r?.status ?? "");
            const label = st ? st.toUpperCase() : "UNAVAILABLE";
            if (s && e) return `${s} → ${e} (${label})`;
            if (s) return `${s} (${label})`;
            return "";
          })
          .filter(Boolean);
        if (ranges.length) lines.push(`• ${propertyId}: ${ranges.join(" | ")}`);
      } else if (isObject(v)) {
        const next = Array.isArray((v as any).nextBlocked) ? (v as any).nextBlocked.slice(0, 6).join(", ") : "";
        const note = safeText((v as any).note ?? "", 160);
        const parts = [next ? `Blocked: ${next}` : "", note ? `Note: ${note}` : ""].filter(Boolean);
        if (parts.length) lines.push(`• ${propertyId}: ${parts.join(" | ")}`);
      }
    }
  }

  // If availability is a flat list, show first few.
  if (Array.isArray(byProp)) {
    const ranges = byProp
      .slice(0, 10)
      .map((r: any) => {
        const pid = clean(r?.propertyId ?? r?.property_id ?? "");
        const s = clean(r?.start_date ?? r?.startDate ?? "");
        const e = clean(r?.end_date ?? r?.endDate ?? "");
        const st = clean(r?.status ?? "");
        const label = st ? st.toUpperCase() : "UNAVAILABLE";
        if (pid && s && e) return `• ${pid}: ${s} → ${e} (${label})`;
        return "";
      })
      .filter(Boolean);
    lines.push(...ranges);
  }

  if (!lines.length) return "";

  return [
    "AVAILABILITY SUMMARY (informational only — not live):",
    ...lines,
    "",
  ].join("\n");
}

function formatPricingHints(content: AnyObj): string {
  // Expected shapes (optional):
  // content.pricingHints: { note?: string, byLocation?: {...}, byBedrooms?: {...} }
  // content.pricingRules:  {...}
  const hints = content?.pricingHints ?? content?.pricing_rules ?? content?.pricingRules;
  if (!hints) return "";

  if (typeof hints === "string") {
    const s = clampText(hints, 380);
    return s
      ? [
          "PRICING HINTS (estimates only — not real-time):",
          `• ${s}`,
          "",
        ].join("\n")
      : "";
  }

  const note = safeText((hints as any)?.note ?? "", 260);
  const weekend = (hints as any)?.weekendMultiplier ?? (hints as any)?.weekend_mult;
  const peak = (hints as any)?.peakMultiplier ?? (hints as any)?.peak_mult;

  const lines: string[] = [];
  if (note) lines.push(`• ${note}`);
  if (typeof weekend === "number") lines.push(`• Weekend multiplier: ${weekend}`);
  if (typeof peak === "number") lines.push(`• Peak-season multiplier: ${peak}`);

  // Small, safe summary of base rates if present.
  const base = (hints as any)?.baseRates ?? (hints as any)?.base_rates;
  if (isObject(base)) {
    const baseLines = Object.entries(base)
      .slice(0, 8)
      .map(([k, v]) => {
        const key = clean(k);
        const val = typeof v === "number" ? `$${v}` : clean(String(v));
        return key && val ? `${key}: ${val}` : "";
      })
      .filter(Boolean);
    if (baseLines.length) lines.push(`• Base: ${baseLines.join(" | ")}`);
  }

  if (!lines.length) return "";

  return [
    "PRICING HINTS (estimates only — not real-time):",
    ...lines,
    "",
  ].join("\n");
}

export function buildSiteContext(content: AnyObj, opts: BuildContextOptions = {}): string {
  const maxChars = opts.maxChars ?? 8000;
  const maxProperties = opts.maxProperties ?? 10;
  const maxFaqs = opts.maxFaqs ?? 12;

  // Your DB returns JSON strings in `content` sometimes (e.g. cms_content.content).
  // If someone passes a record like { key, content: "{...}" }, unwrap it.
  const maybeJson = (content as any)?.content;
  if (typeof maybeJson === "string") {
    try {
      content = JSON.parse(maybeJson);
    } catch {
      // ignore
    }
  }

  const site = content?.site ?? {};
  const home = content?.home ?? {};
  const about = content?.about ?? {};
  const contact = content?.contact ?? {};
  const booking = content?.book ?? content?.booking ?? {};
  const partnership = content?.partnership ?? content?.partnerships ?? {};

  const faqs = content?.faqs?.items ?? content?.faqs ?? [];
  const properties = content?.properties?.items ?? content?.properties ?? [];

  // If the agent worker passes vector results separately, prefer opts.vectorSnippets.
  // If not, allow content.__vectorSnippets as a fallback.
  const vectorSnips = opts.vectorSnippets ?? (content as any)?.__vectorSnippets ?? (content as any)?.__vectorContext;

  const guidelines = [
    "ROLE: Exquisite Concierge for Exquisitebnb (boutique luxury short-term rentals).",
    "TONE: warm, refined, confident, never pushy.",
    "RULES: use only this context; if missing, suggest Contact page.",
    "DO NOT: claim live availability or real-time pricing.",
    "DO: guide guests to trusted booking platforms when appropriate.",
  ].join("\n");

  const brand = [
    site?.brandName ? `Brand: ${clean(site.brandName)}` : "Brand: Exquisitebnb",
    site?.tagline ? `Tagline: ${clampText(site.tagline, 120)}` : "",
    site?.description ? `Positioning: ${clampText(site.description, 220)}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const support = [
    site?.supportEmail ? `Email: ${clean(site.supportEmail)}` : "",
    site?.phone ? `Phone: ${clean(site.phone)}` : "",
    site?.address ? `Address: ${clampText(site.address, 120)}` : "",
  ]
    .filter(Boolean)
    .join(" | ");

  const homeSummary = pickHomeSummary(home);
  const aboutSummary = pickAboutSummary(about);
  const propertyText = formatProperties(Array.isArray(properties) ? properties : [], maxProperties);
  const faqText = formatFaqs(Array.isArray(faqs) ? faqs : [], maxFaqs);

  const availabilityText = formatAvailabilitySummary(content);
  const pricingText = formatPricingHints(content);

  const vectorText = formatVectorSnippets(vectorSnips, 5);

  // Keep booking + partnership short but useful.
  const bookingText = safeText(booking?.header ?? booking, 360);
  const partnershipText = safeText(partnership?.hero ?? partnership, 360);
  const contactText = safeText(contact?.header ?? contact, 320);

  const contextParts = [
    guidelines,
    "",
    vectorText ? vectorText.trimEnd() : "",
    brand,
    support ? `Support: ${support}` : "",
    "",
    homeSummary ? `HOME:\n${homeSummary}` : "",
    aboutSummary ? `ABOUT:\n${aboutSummary}` : "",
    propertyText ? `PROPERTIES (top):\n${propertyText}` : "",
    availabilityText ? availabilityText.trimEnd() : "",
    pricingText ? pricingText.trimEnd() : "",
    faqText ? `FAQ:\n${faqText}` : "",
    partnershipText ? `PARTNERSHIPS:\n${partnershipText}` : "",
    bookingText ? `BOOKING:\n${bookingText}` : "",
    contactText ? `CONTACT:\n${contactText}` : "",
  ]
    .map((s) => (typeof s === "string" ? s.trim() : ""))
    .filter(Boolean);

  const final = contextParts.join("\n\n").trim();
  return final.length > maxChars ? final.slice(0, maxChars - 1).trimEnd() + "…" : final;
}