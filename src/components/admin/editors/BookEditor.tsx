import { TextField, TextAreaField, SectionDivider, EditorCard, IconSelector, RepeatableList } from "../fields";
import type { SiteContent } from "@/lib/content";

interface EditorProps {
  content: SiteContent;
  update: (path: string, value: unknown) => void;
}

export default function BookEditor({ content, update }: EditorProps) {
const b=(content as any)?.book?.content || {};
  if (!b || !b.header) {
    return null;
  }
  return (
    <div className="space-y-4">
      {/* Header */}
      <SectionDivider label="Header" />
      <TextField label="Label" value={b.header.label} onChange={(v) => update("book.content.header.label", v)} />
      <TextField label="Title" value={b.header.title} onChange={(v) => update("book.content.header.title", v)} />
      <TextAreaField label="Subtitle" value={b.header.subtitle} onChange={(v) => update("book.content.header.subtitle", v)} />

      {/* Why Trusted */}
      <SectionDivider label="Why Trusted" />
      <TextField label="Title" value={b.whyTrusted.title} onChange={(v) => update("book.content.whyTrusted.title", v)} />
      <TextAreaField label="Subtitle" value={b.whyTrusted.subtitle} onChange={(v) => update("book.content.whyTrusted.subtitle", v)} />

      <RepeatableList
        title="Feature"
        count={b.whyTrusted.features.length}
        onAdd={() => update("book.content.whyTrusted.features", [...b.whyTrusted.features, { icon: "Shield", title: "", description: "" }])}
        addLabel="Add Feature"
      >
        {b.whyTrusted.features.map((feat, i) => (
          <EditorCard
            key={i}
            title={feat.title || `Feature ${i + 1}`}
            onRemove={() => update("book.content.whyTrusted.features", b.whyTrusted.features.filter((_, j) => j !== i))}
          >
            <IconSelector label="Icon" value={feat.icon} onChange={(v) => {
              const features = [...b.whyTrusted.features];
              features[i] = { ...features[i], icon: v };
              update("book.content.whyTrusted.features", features);
            }} />
            <TextField label="Title" value={feat.title} onChange={(v) => {
              const features = [...b.whyTrusted.features];
              features[i] = { ...features[i], title: v };
              update("book.content.whyTrusted.features", features);
            }} />
            <TextAreaField label="Description" value={feat.description} onChange={(v) => {
              const features = [...b.whyTrusted.features];
              features[i] = { ...features[i], description: v };
              update("book.content.whyTrusted.features", features);
            }} />
          </EditorCard>
        ))}
      </RepeatableList>

      {/* Platforms */}
      <SectionDivider label="Platforms" />
      <TextField label="Title" value={b.platforms.title} onChange={(v) => update("book.content.platforms.title", v)} />
      <TextField label="Subtitle" value={b.platforms.subtitle} onChange={(v) => update("book.content.platforms.subtitle", v)} />

      <RepeatableList
        title="Platform"
        count={b.platforms.items.length}
        onAdd={() => update("book.content.platforms.items", [...b.platforms.items, { name: "", description: "", url: "#" }])}
        addLabel="Add Platform"
      >
        {b.platforms.items.map((plat, i) => (
          <EditorCard
            key={i}
            title={plat.name || `Platform ${i + 1}`}
            onRemove={() => update("book.content.platforms.items", b.platforms.items.filter((_, j) => j !== i))}
          >
            <TextField label="Name" value={plat.name} onChange={(v) => {
              const items = [...b.platforms.items];
              items[i] = { ...items[i], name: v };
              update("book.content.platforms.items", items);
            }} />
            <TextAreaField label="Description" value={plat.description} onChange={(v) => {
              const items = [...b.platforms.items];
              items[i] = { ...items[i], description: v };
              update("book.content.platforms.items", items);
            }} />
            <TextField label="URL" value={plat.url} onChange={(v) => {
              const items = [...b.platforms.items];
              items[i] = { ...items[i], url: v };
              update("book.content.platforms.items", items);
            }} />
          </EditorCard>
        ))}
      </RepeatableList>

      {/* Transparency & Browse CTA */}
      <SectionDivider label="Footer" />
      <TextAreaField label="Transparency Note" value={b.transparencyNote} onChange={(v) => update("book.content.transparencyNote", v)} rows={3} />
      <TextField label="Browse CTA Title" value={b.browseCta.title} onChange={(v) => update("book.content.browseCta.title", v)} />
      <TextField label="Browse CTA Subtitle" value={b.browseCta.subtitle} onChange={(v) => update("book.content.browseCta.subtitle", v)} />
      <TextField label="Browse CTA Link Text" value={b.browseCta.linkText} onChange={(v) => update("book.content.browseCta.linkText", v)} />
    </div>
  );
}
