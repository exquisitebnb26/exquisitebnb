import { TextField, TextAreaField } from "../fields";
import type { SiteContent } from "@/lib/content";

interface EditorProps {
  content: SiteContent;
  update: (path: string, value: unknown) => void;
}

export default function SiteEditor({ content, update }: EditorProps) {
  const s = content.site;
  return (
    <div className="space-y-4">
      <TextField label="Brand Name" value={s.brandName} onChange={(v) => update("site.brandName", v)} />
      <TextField label="Tagline" value={s.tagline} onChange={(v) => update("site.tagline", v)} />
      <TextAreaField label="Description" value={s.description} onChange={(v) => update("site.description", v)} />
      <TextField label="Support Email" value={s.supportEmail} onChange={(v) => update("site.supportEmail", v)} />
      <TextField label="Phone" value={s.phone} onChange={(v) => update("site.phone", v)} />
      <TextField label="Address" value={s.address} onChange={(v) => update("site.address", v)} />
      <TextField label="Office Name" value={s.officeName} onChange={(v) => update("site.officeName", v)} />
      <TextField label="Map Embed URL" value={s.mapEmbedUrl} onChange={(v) => update("site.mapEmbedUrl", v)} />
      <TextField label="Instagram URL" value={s.instagram} onChange={(v) => update("site.instagram", v)} />
      <TextField label="Twitter URL" value={s.twitter} onChange={(v) => update("site.twitter", v)} />
      <TextField label="Copyright Text" value={s.copyrightText} onChange={(v) => update("site.copyrightText", v)} />
      <TextAreaField label="Footer Tagline" value={s.footerTagline} onChange={(v) => update("site.footerTagline", v)} />
    </div>
  );
}
