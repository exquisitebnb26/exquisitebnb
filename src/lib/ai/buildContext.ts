// Builds a compact “knowledge snapshot” from your CMS content.
// Keep it small to avoid slow AI requests.

type AnyObj = Record<string, any>;

function safeText(v: any): string {
  if (!v) return "";
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return v.map(safeText).filter(Boolean).join("\n");
  if (typeof v === "object") return Object.values(v).map(safeText).filter(Boolean).join("\n");
  return "";
}

export function buildSiteContext(content: AnyObj): string {
  // Adjust paths to match YOUR content.json structure.
  // We’ll safely fall back if fields don’t exist.

  const home = content?.home ?? {};
  const about = content?.about ?? {};
  const faqs = content?.faqs?.items ?? content?.faqs ?? [];
  const properties = content?.properties?.items ?? content?.properties ?? [];

  const propertyLines = (Array.isArray(properties) ? properties : []).slice(0, 40).map((p: any) => {
    const name = p?.name ?? "";
    const location = p?.location ?? "";
    const guests = p?.guests ?? "";
    const desc = p?.description ?? "";
    const amenities = Array.isArray(p?.amenities) ? p.amenities.slice(0, 12).join(", ") : "";
    const idealFor = Array.isArray(p?.idealFor) ? p.idealFor.slice(0, 8).join(", ") : "";

    // bookingPlatforms expected: [{name,url}]
    const platforms = Array.isArray(p?.bookingPlatforms)
      ? p.bookingPlatforms
          .slice(0, 6)
          .map((b: any) => `${b?.name || ""} (${b?.url || ""})`.trim())
          .filter(Boolean)
          .join(", ")
      : "";

    return [
      `Property: ${name}`,
      location ? `Location: ${location}` : "",
      guests ? `Guests: ${guests}` : "",
      desc ? `About: ${desc}` : "",
      amenities ? `Amenities: ${amenities}` : "",
      idealFor ? `Ideal For: ${idealFor}` : "",
      platforms ? `Booking: ${platforms}` : "",
      `---`,
    ]
      .filter(Boolean)
      .join("\n");
  });

  const faqLines = (Array.isArray(faqs) ? faqs : []).slice(0, 30).map((f: any) => {
    const q = f?.question ?? f?.q ?? "";
    const a = f?.answer ?? f?.a ?? "";
    if (!q && !a) return "";
    return `Q: ${q}\nA: ${a}\n---`;
  }).filter(Boolean);

  const brandText = [
    "Brand: Exquisitebnb (boutique luxury short-term rentals)",
    "Tone: calm, elegant, professional, concierge-style",
    "Rules: do not claim live availability or pricing; direct to booking platforms; if unsure, advise contacting support.",
  ].join("\n");

  const siteText = [
    brandText,
    "\nHOME:\n" + safeText(home),
    "\nABOUT:\n" + safeText(about),
    "\nPROPERTIES:\n" + propertyLines.join("\n"),
    "\nFAQS:\n" + faqLines.join("\n"),
    "\nPARTNERSHIPS:\n" + safeText(content?.partnerships ?? []),
    "\nCONTACT:\n" + safeText(content?.contact ?? {}),
    "\nbooking platforms:\n" + safeText(content?.bookingPlatforms ?? []),
    "\nBOOKING INFO:\n" + safeText(content?.bookingInfo ?? {}),
  ].join("\n");

  // Keep context length controlled (important).
  return siteText.slice(0, 12000);
}