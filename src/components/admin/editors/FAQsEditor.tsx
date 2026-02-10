import { TextField, TextAreaField, EditorCard, RepeatableList, SectionDivider } from "../fields";
import type { SiteContent } from "@/lib/content";

interface EditorProps {
  content: SiteContent;
  update: (path: string, value: unknown) => void;
}

export default function FAQsEditor({ content, update }: EditorProps) {
  const f = content.faqs;
  const items = f.items;

  return (
    <div className="space-y-4">
      <SectionDivider label="Header" />
      <TextField label="Label" value={f.header.label} onChange={(v) => update("faqs.header.label", v)} />
      <TextField label="Title" value={f.header.title} onChange={(v) => update("faqs.header.title", v)} />
      <TextAreaField label="Subtitle" value={f.header.subtitle} onChange={(v) => update("faqs.header.subtitle", v)} />

      <SectionDivider label="Contact CTA" />
      <TextField label="Text" value={f.contactCta.text} onChange={(v) => update("faqs.contactCta.text", v)} />
      <TextField label="Link Text" value={f.contactCta.linkText} onChange={(v) => update("faqs.contactCta.linkText", v)} />

      <SectionDivider label="Questions" />
      <RepeatableList
        title="FAQ"
        count={items.length}
        onAdd={() => update("faqs.items", [...items, { question: "", answer: "" }])}
        addLabel="Add FAQ"
      >
        {items.map((faq, i) => (
          <EditorCard
            key={i}
            title={faq.question || `FAQ ${i + 1}`}
            onRemove={() => update("faqs.items", items.filter((_, j) => j !== i))}
          >
            <TextField label="Question" value={faq.question} onChange={(v) => {
              const newItems = [...items];
              newItems[i] = { ...newItems[i], question: v };
              update("faqs.items", newItems);
            }} />
            <TextAreaField label="Answer" value={faq.answer} rows={3} onChange={(v) => {
              const newItems = [...items];
              newItems[i] = { ...newItems[i], answer: v };
              update("faqs.items", newItems);
            }} />
          </EditorCard>
        ))}
      </RepeatableList>
    </div>
  );
}
