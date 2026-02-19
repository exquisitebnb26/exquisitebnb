import { TextField, TextAreaField, NumberField, SectionDivider, EditorCard, RepeatableList, StarRatingSelector, ImageKeySelector, GalleryKeySelector } from "../fields";
import type { SiteContent } from "@/lib/content";

interface EditorProps {
  content: SiteContent;
  update: (path: string, value: unknown) => void;
}

export default function PropertiesEditor({ content, update }: EditorProps) {
const p = (content as any)?.properties_header?.content || {};
  if (!p || !p.header) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <SectionDivider label="Header" />
      <TextField label="Label" value={p.header.label} onChange={(v) => update("properties_page.content.header.label", v)} />
      <TextField label="Title" value={p.header.title} onChange={(v) => update("properties_page.content.header.title", v)} />
      <TextAreaField label="Subtitle" value={p.header.subtitle} onChange={(v) => update("properties_page.content.header.subtitle", v)} />
      <TextField label="Booking Note" value={p.bookingNote} onChange={(v) => update("properties_page.content.bookingNote", v)} />

      <SectionDivider label="Booking Platforms" />
      <TextField
        label="Platforms (comma-separated)"
        value={(p.platforms || []).join(", ")}
        onChange={(v) =>
          update(
            "properties_page.content.platforms",
            v.split(",").map((s) => s.trim()).filter(Boolean)
          )
        }
      />
    </div>
  );
}
