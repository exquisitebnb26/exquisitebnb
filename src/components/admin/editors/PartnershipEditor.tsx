import { TextField, TextAreaField, SectionDivider, EditorCard, IconSelector, RepeatableList } from "../fields";
import type { SiteContent } from "@/lib/content";

interface EditorProps {
  content: SiteContent;
  update: (path: string, value: unknown) => void;
}

export default function PartnershipEditor({ content, update }: EditorProps) {
  const p=(content as any)?.partnership?.content || {};
  if (!p || !p.header) {
    return null;
  }
  return (
    <div className="space-y-4">
      {/* Hero */}
      <SectionDivider label="Hero" />
      <TextField label="Label" value={p.hero.label} onChange={(v) => update("partnership.content.hero.label", v)} />
      <TextField label="Title" value={p.hero.title} onChange={(v) => update("partnership.content.hero.title", v)} />
      <TextAreaField label="Subtitle" value={p.hero.subtitle} onChange={(v) => update("partnership.content.hero.subtitle", v)} />

      {/* Why Partner */}
      <SectionDivider label="Why Partner" />
      <TextField label="Label" value={p.whyPartner.label} onChange={(v) => update("partnership.content.whyPartner.label", v)} />
      <TextField label="Title" value={p.whyPartner.title} onChange={(v) => update("partnership.content.whyPartner.title", v)} />
      <TextAreaField label="Text" value={p.whyPartner.text} onChange={(v) => update("partnership.content.whyPartner.text", v)} rows={3} />

      <RepeatableList
        title="Card"
        count={p.whyPartner.cards.length}
        onAdd={() => update("partnership.content.whyPartner.cards", [...p.whyPartner.cards, { icon: "Shield", title: "", description: "" }])}
        addLabel="Add Card"
      >
        {p.whyPartner.cards.map((card, i) => (
          <EditorCard
            key={i}
            title={card.title || `Card ${i + 1}`}
            onRemove={() => update("partnership.content.whyPartner.cards", p.whyPartner.cards.filter((_, j) => j !== i))}
          >
            <IconSelector label="Icon" value={card.icon} onChange={(v) => {
              const cards = [...p.whyPartner.cards]; cards[i] = { ...cards[i], icon: v };
              update("partnership.content.whyPartner.cards", cards);
            }} />
            <TextField label="Title" value={card.title} onChange={(v) => {
              const cards = [...p.whyPartner.cards]; cards[i] = { ...cards[i], title: v };
              update("partnership.content.whyPartner.cards", cards);
            }} />
            <TextAreaField label="Description" value={card.description} onChange={(v) => {
              const cards = [...p.whyPartner.cards]; cards[i] = { ...cards[i], description: v };
              update("partnership.content.whyPartner.cards", cards);
            }} />
          </EditorCard>
        ))}
      </RepeatableList>

      {/* Differentiators */}
      <SectionDivider label="Differentiators" />
      <TextField label="Label" value={p.differentiators.label} onChange={(v) => update("partnership.content.differentiators.label", v)} />
      <TextField label="Title" value={p.differentiators.title} onChange={(v) => update("partnership.content.differentiators.title", v)} />

      <RepeatableList
        title="Differentiator"
        count={p.differentiators.items.length}
        onAdd={() => update("partnership.content.differentiators.items", [...p.differentiators.items, { title: "", description: "" }])}
        addLabel="Add Differentiator"
      >
        {p.differentiators.items.map((item, i) => (
          <EditorCard
            key={i}
            title={item.title || `Differentiator ${i + 1}`}
            onRemove={() => update("partnership.content.differentiators.items", p.differentiators.items.filter((_, j) => j !== i))}
          >
            <TextField label="Title" value={item.title} onChange={(v) => {
              const items = [...p.differentiators.items]; items[i] = { ...items[i], title: v };
              update("partnership.content.differentiators.items", items);
            }} />
            <TextAreaField label="Description" value={item.description} onChange={(v) => {
              const items = [...p.differentiators.items]; items[i] = { ...items[i], description: v };
              update("partnership.content.differentiators.items", items);
            }} />
          </EditorCard>
        ))}
      </RepeatableList>

      {/* Benefits */}
      <SectionDivider label="Benefits" />
      <TextField label="Label" value={p.benefits.label} onChange={(v) => update("partnership.content.benefits.label", v)} />
      <TextField label="Title" value={p.benefits.title} onChange={(v) => update("partnership.content.benefits.title", v)} />

      <RepeatableList
        title="Benefit"
        count={p.benefits.items.length}
        onAdd={() => update("partnership.content.benefits.items", [...p.benefits.items, { icon: "Sparkles", title: "", description: "" }])}
        addLabel="Add Benefit"
      >
        {p.benefits.items.map((item, i) => (
          <EditorCard
            key={i}
            title={item.title || `Benefit ${i + 1}`}
            onRemove={() => update("partnership.content.benefits.items", p.benefits.items.filter((_, j) => j !== i))}
          >
            <IconSelector label="Icon" value={item.icon} onChange={(v) => {
              const items = [...p.benefits.items]; items[i] = { ...items[i], icon: v };
              update("partnership.content.benefits.items", items);
            }} />
            <TextField label="Title" value={item.title} onChange={(v) => {
              const items = [...p.benefits.items]; items[i] = { ...items[i], title: v };
              update("partnership.content.benefits.items", items);
            }} />
            <TextAreaField label="Description" value={item.description} onChange={(v) => {
              const items = [...p.benefits.items]; items[i] = { ...items[i], description: v };
              update("partnership.content.benefits.items", items);
            }} />
          </EditorCard>
        ))}
      </RepeatableList>

      {/* Ideal Partners */}
      <SectionDivider label="Ideal Partners" />
      <TextField label="Label" value={p.idealPartners.label} onChange={(v) => update("partnership.content.idealPartners.label", v)} />
      <TextField label="Title" value={p.idealPartners.title} onChange={(v) => update("partnership.content.idealPartners.title", v)} />

      <RepeatableList
        title="Partner Type"
        count={p.idealPartners.items.length}
        onAdd={() => update("partnership.content.idealPartners.items", [...p.idealPartners.items, ""])}
        addLabel="Add Partner Type"
      >
        {p.idealPartners.items.map((item, i) => (
          <EditorCard
            key={i}
            title={`Partner Type ${i + 1}`}
            onRemove={() => update("partnership.content.idealPartners.items", p.idealPartners.items.filter((_, j) => j !== i))}
          >
            <TextField label="Description" value={item} onChange={(v) => {
              const items = [...p.idealPartners.items]; items[i] = v;
              update("partnership.content.idealPartners.items", items);
            }} />
          </EditorCard>
        ))}
      </RepeatableList>

      <SectionDivider label="Not a Fit Note" />
      <TextField label="Label" value={p.idealPartners.noteFull.label} onChange={(v) => update("partnership.content.idealPartners.noteFull.label", v)} />
      <TextField label="Title" value={p.idealPartners.noteFull.title} onChange={(v) => update("partnership.content.idealPartners.noteFull.title", v)} />
      <TextAreaField label="Text 1" value={p.idealPartners.noteFull.text1} onChange={(v) => update("partnership.content.idealPartners.noteFull.text1", v)} />
      <TextAreaField label="Text 2" value={p.idealPartners.noteFull.text2} onChange={(v) => update("partnership.content.idealPartners.noteFull.text2", v)} />

      {/* Process */}
      <SectionDivider label="Process" />
      <TextField label="Label" value={p.process.label} onChange={(v) => update("partnership.content.process.label", v)} />
      <TextField label="Title" value={p.process.title} onChange={(v) => update("partnership.content.process.title", v)} />
      <TextAreaField label="Subtitle" value={p.process.subtitle} onChange={(v) => update("partnership.content.process.subtitle", v)} />

      <RepeatableList
        title="Step"
        count={p.process.steps.length}
        onAdd={() => update("partnership.content.process.steps", [...p.process.steps, { step: String(p.process.steps.length + 1).padStart(2, "0"), title: "", description: "" }])}
        addLabel="Add Step"
      >
        {p.process.steps.map((step, i) => (
          <EditorCard
            key={i}
            title={step.title || `Step ${i + 1}`}
            onRemove={() => update("partnership.content.process.steps", p.process.steps.filter((_, j) => j !== i))}
          >
            <TextField label="Step Number" value={step.step} onChange={(v) => {
              const steps = [...p.process.steps]; steps[i] = { ...steps[i], step: v };
              update("partnership.content.process.steps", steps);
            }} />
            <TextField label="Title" value={step.title} onChange={(v) => {
              const steps = [...p.process.steps]; steps[i] = { ...steps[i], title: v };
              update("partnership.content.process.steps", steps);
            }} />
            <TextAreaField label="Description" value={step.description} onChange={(v) => {
              const steps = [...p.process.steps]; steps[i] = { ...steps[i], description: v };
              update("partnership.content.process.steps", steps);
            }} />
          </EditorCard>
        ))}
      </RepeatableList>

      {/* CTA */}
      <SectionDivider label="CTA" />
      <TextField label="Title" value={p.cta.title} onChange={(v) => update("partnership.content.cta.title", v)} />
      <TextAreaField label="Subtitle" value={p.cta.subtitle} onChange={(v) => update("partnership.content.cta.subtitle", v)} />
      <TextField label="CTA Text" value={p.cta.ctaText} onChange={(v) => update("partnership.content.cta.ctaText", v)} />
      <TextField label="Note" value={p.cta.note} onChange={(v) => update("partnership.content.cta.note", v)} />
    </div>
  );
}
