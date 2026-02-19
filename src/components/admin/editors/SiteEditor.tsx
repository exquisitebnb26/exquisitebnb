import { TextField, TextAreaField } from "../fields";
import type { SiteContent } from "@/lib/content";

interface EditorProps {
  content: SiteContent;
  update: (path: string, value: unknown) => void;
}

export default function SiteEditor({ content, update }: EditorProps) {
  const s = (content.site as any)?.content || {};
  if (!s) return null;

  return (
    <div className="space-y-4">
      {/* Brand name locked (non-editable) */}
      <TextField
        label="Brand Name"
        value="Exquisitebnb"
        onChange={() => {}}
        disabled
      />

      <TextField
        label="Tagline"
        value={s.tagline ?? ""}
        onChange={(v) => update("site.content.tagline", v)}
      />

      <TextAreaField
        label="Description"
        value={s.description ?? ""}
        onChange={(v) => update("site.content.description", v)}
      />

      <TextField
        label="Support Email"
        value={s.supportEmail ?? ""}
        onChange={(v) => update("site.content.supportEmail", v)}
      />

      <TextField
        label="Phone"
        value={s.phone ?? ""}
        onChange={(v) => update("site.content.phone", v)}
      />

      <TextField
        label="Address"
        value={s.address ?? ""}
        onChange={(v) => update("site.content.address", v)}
      />

      <TextField
        label="Office Name"
        value={s.officeName ?? ""}
        onChange={(v) => update("site.content.officeName", v)}
      />

      <TextField
        label="Map Embed URL"
        value={s.mapEmbedUrl ?? ""}
        onChange={(v) => update("site.content.mapEmbedUrl", v)}
      />

      <TextField
        label="Instagram URL"
        value={s.instagram ?? ""}
        onChange={(v) => update("site.content.instagram", v)}
      />

      <TextField
        label="Twitter URL"
        value={s.twitter ?? ""}
        onChange={(v) => update("site.content.twitter", v)}
      />

      <TextField
        label="Copyright Text"
        value={s.copyrightText ?? ""}
        onChange={(v) => update("site.content.copyrightText", v)}
      />

      <TextAreaField
        label="Footer Tagline"
        value={s.footerTagline ?? ""}
        onChange={(v) => update("site.content.footerTagline", v)}
      />
    </div>
  );
}