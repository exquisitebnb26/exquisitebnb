import { TextField, TextAreaField, SectionDivider, EditorCard, IconSelector, RepeatableList } from "../fields";
import type { SiteContent } from "@/lib/content";

interface EditorProps {
  content: SiteContent;
  update: (path: string, value: unknown) => void;
}

export default function AboutEditor({ content, update }: EditorProps) {
  const a = content.about;

  return (
    <div className="space-y-4">
      {/* Header */}
      <SectionDivider label="Header" />
      <TextField label="Label" value={a.header.label} onChange={(v) => update("about.header.label", v)} />
      <TextField label="Title (Primary)" value={a.header.title.primary} onChange={(v) => update("about.header.title.primary", v)} />
      <TextField label="Title (Accent)" value={a.header.title.accent} onChange={(v) => update("about.header.title.accent", v)} />
      <TextAreaField label="Subtitle" value={a.header.subtitle} onChange={(v) => update("about.header.subtitle", v)} />

      {/* Story */}
      <SectionDivider label="Story" />
      <TextField label="Title" value={a.story.title} onChange={(v) => update("about.story.title", v)} />
      <TextField label="Title Italic (Primary)" value={a.story.titleItalic.primary} onChange={(v) => update("about.story.titleItalic.primary", v)} />
      <TextField label="Title Italic (Accent)" value={a.story.titleItalic.accent} onChange={(v) => update("about.story.titleItalic.accent", v)} />

      <RepeatableList
        title="Paragraph"
        count={a.story.paragraphs.length}
        onAdd={() => update("about.story.paragraphs", [...a.story.paragraphs, ""])}
        addLabel="Add Paragraph"
      >
        {a.story.paragraphs.map((p, i) => (
          <EditorCard
            key={i}
            title={`Paragraph ${i + 1}`}
            onRemove={() => update("about.story.paragraphs", a.story.paragraphs.filter((_, j) => j !== i))}
          >
            <TextAreaField label="Text" value={p} rows={4} onChange={(v) => {
              const paras = [...a.story.paragraphs];
              paras[i] = v;
              update("about.story.paragraphs", paras);
            }} />
          </EditorCard>
        ))}
      </RepeatableList>

      {/* Philosophy / Values */}
      <SectionDivider label="Philosophy / Values" />
      <TextField label="Label" value={a.philosophy.label} onChange={(v) => update("about.philosophy.label", v)} />
      <TextField label="Title" value={a.philosophy.title} onChange={(v) => update("about.philosophy.title", v)} />

      <RepeatableList
        title="Value"
        count={a.philosophy.values.length}
        onAdd={() => update("about.philosophy.values", [...a.philosophy.values, { icon: "Sparkles", title: "", description: "" }])}
        addLabel="Add Value"
      >
        {a.philosophy.values.map((val, i) => (
          <EditorCard
            key={i}
            title={val.title || `Value ${i + 1}`}
            onRemove={() => update("about.philosophy.values", a.philosophy.values.filter((_, j) => j !== i))}
          >
            <IconSelector label="Icon" value={val.icon} onChange={(v) => {
              const values = [...a.philosophy.values];
              values[i] = { ...values[i], icon: v };
              update("about.philosophy.values", values);
            }} />
            <TextField label="Title" value={val.title} onChange={(v) => {
              const values = [...a.philosophy.values];
              values[i] = { ...values[i], title: v };
              update("about.philosophy.values", values);
            }} />
            <TextAreaField label="Description" value={val.description} onChange={(v) => {
              const values = [...a.philosophy.values];
              values[i] = { ...values[i], description: v };
              update("about.philosophy.values", values);
            }} />
          </EditorCard>
        ))}
      </RepeatableList>

      {/* Closing */}
      <SectionDivider label="Closing" />
      <TextField label="Title" value={a.closing.title} onChange={(v) => update("about.closing.title", v)} />
      <TextField label="Title (Italic)" value={a.closing.titleItalic} onChange={(v) => update("about.closing.titleItalic", v)} />
      <TextAreaField label="Text" value={a.closing.text} onChange={(v) => update("about.closing.text", v)} rows={3} />
      <TextField label="Signature" value={a.closing.signature} onChange={(v) => update("about.closing.signature", v)} />
    </div>
  );
}
