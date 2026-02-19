import { TextField, TextAreaField, SectionDivider, EditorCard, IconSelector, RepeatableList } from "../fields";
import type { SiteContent } from "@/lib/content";

interface EditorProps {
  content: SiteContent;
  update: (path: string, value: unknown) => void;
}

export default function HomeEditor({ content, update }: EditorProps) {
  const h = (content as any)?.home?.content || {};
  if (!h || !h.hero) {
    return null;
  }
  const updateFeatureItem = (index: number, field: string, value: unknown) => {
    const items = [...h.features.items];
    items[index] = { ...items[index], [field]: value };
    update("home.content.features.items", items);
  };

  const updateDesignedItem = (index: number, field: string, value: unknown) => {
    const items = [...(h.designedForRealLife?.items || [])];
    items[index] = { ...items[index], [field]: value };
    update("home.content.designedForRealLife.items", items);
  };

  const updateWhyNotItem = (index: number, field: string, value: unknown) => {
    const items = [...(h.whyNotHotel?.items || [])];
    items[index] = { ...items[index], [field]: value };
    update("home.content.whyNotHotel.items", items);
  };

  return (
    <div className="space-y-4">
      {/* Hero */}
      <SectionDivider label="Hero" />
      <TextField label="Label" value={h.hero.label} onChange={(v) => update("home.content.hero.label", v)} />
      <TextField label="Title" value={h.hero.title} onChange={(v) => update("home.content.hero.title", v)} />
      <TextField label="Title (Italic)" value={h.hero.titleItalic} onChange={(v) => update("home.content.hero.titleItalic", v)} />
      <TextAreaField label="Subtitle" value={h.hero.subtitle} onChange={(v) => update("home.content.hero.subtitle", v)} />
      <TextField label="CTA 1 Text" value={h.hero.cta1Text} onChange={(v) => update("home.content.hero.cta1Text", v)} />
      <TextField label="CTA 1 Link" value={h.hero.cta1Link} onChange={(v) => update("home.content.hero.cta1Link", v)} />
      <TextField label="CTA 2 Text" value={h.hero.cta2Text} onChange={(v) => update("home.content.hero.cta2Text", v)} />
      <TextField label="CTA 2 Link" value={h.hero.cta2Link} onChange={(v) => update("home.content.hero.cta2Link", v)} />

      {/* Philosophy */}
      <SectionDivider label="Philosophy" />
      <TextField label="Label" value={h.philosophy.label} onChange={(v) => update("home.content.philosophy.label", v)} />
      <TextField label="Title" value={h.philosophy.title} onChange={(v) => update("home.content.philosophy.title", v)} />
      <TextField label="Title (Italic)" value={h.philosophy.titleItalic} onChange={(v) => update("home.content.philosophy.titleItalic", v)} />
      <TextAreaField label="Text" value={h.philosophy.text} onChange={(v) => update("home.content.philosophy.text", v)} rows={4} />

      {/* Features */}
      <SectionDivider label="Features" />
      <TextField label="Label" value={h.features.label} onChange={(v) => update("home.content.features.label", v)} />
      <TextField label="Title" value={h.features.title} onChange={(v) => update("home.content.features.title", v)} />
      <TextField label="Title Accent" value={h.features.titleAccent} onChange={(v) => update("home.content.features.titleAccent", v)} />

      <RepeatableList
        title="Feature"
        count={h.features.items.length}
        onAdd={() => update("home.content.features.items", [...h.features.items, { icon: "Sparkles", title: "", description: "" }])}
        addLabel="Add Feature"
      >
        {h.features.items.map((item, i) => (
          <EditorCard
            key={i}
            title={item.title || `Feature ${i + 1}`}
            onRemove={() => update("home.content.features.items", h.features.items.filter((_, j) => j !== i))}
          >
            <IconSelector label="Icon" value={item.icon} onChange={(v) => updateFeatureItem(i, "icon", v)} />
            <TextField label="Title" value={item.title} onChange={(v) => updateFeatureItem(i, "title", v)} />
            <TextAreaField label="Description" value={item.description} onChange={(v) => updateFeatureItem(i, "description", v)} />
          </EditorCard>
        ))}
      </RepeatableList>

      {/* Designed for Real Life */}
      {h.designedForRealLife && (
        <>
          <SectionDivider label="Designed for Real Life" />
          <TextField label="Label" value={h.designedForRealLife.label} onChange={(v) => update("home.content.designedForRealLife.label", v)} />
          <TextField label="Title" value={h.designedForRealLife.title} onChange={(v) => update("home.content.designedForRealLife.title", v)} />
          <TextField label="Title (Italic)" value={h.designedForRealLife.titleItalic} onChange={(v) => update("home.content.designedForRealLife.titleItalic", v)} />
          <TextAreaField label="Subtitle" value={h.designedForRealLife.subtitle} onChange={(v) => update("home.content.designedForRealLife.subtitle", v)} />

          <RepeatableList
            title="Item"
            count={h.designedForRealLife.items.length}
            onAdd={() => update("home.content.designedForRealLife.items", [...h.designedForRealLife!.items, { icon: "Wifi", title: "", description: "" }])}
            addLabel="Add Item"
          >
            {h.designedForRealLife.items.map((item, i) => (
              <EditorCard
                key={i}
                title={item.title || `Item ${i + 1}`}
                onRemove={() => update("home.content.designedForRealLife.items", h.designedForRealLife!.items.filter((_, j) => j !== i))}
              >
                <IconSelector label="Icon" value={item.icon} onChange={(v) => updateDesignedItem(i, "icon", v)} />
                <TextField label="Title" value={item.title} onChange={(v) => updateDesignedItem(i, "title", v)} />
                <TextAreaField label="Description" value={item.description} onChange={(v) => updateDesignedItem(i, "description", v)} />
              </EditorCard>
            ))}
          </RepeatableList>
        </>
      )}

      {/* Why Not a Hotel */}
      {h.whyNotHotel && (
        <>
          <SectionDivider label="Why Not a Hotel" />
          <TextField label="Label" value={h.whyNotHotel.label} onChange={(v) => update("home.content.whyNotHotel.label", v)} />
          <TextField label="Title" value={h.whyNotHotel.title} onChange={(v) => update("home.content.whyNotHotel.title", v)} />
          <TextField label="Title (Italic)" value={h.whyNotHotel.titleItalic} onChange={(v) => update("home.content.whyNotHotel.titleItalic", v)} />

          <RepeatableList
            title="Comparison"
            count={h.whyNotHotel.items.length}
            onAdd={() => update("home.content.whyNotHotel.items", [...h.whyNotHotel!.items, { point: "", detail: "" }])}
            addLabel="Add Comparison"
          >
            {h.whyNotHotel.items.map((item, i) => (
              <EditorCard
                key={i}
                title={item.point || `Comparison ${i + 1}`}
                onRemove={() => update("home.content.whyNotHotel.items", h.whyNotHotel!.items.filter((_, j) => j !== i))}
              >
                <TextField label="Point" value={item.point} onChange={(v) => updateWhyNotItem(i, "point", v)} />
                <TextAreaField label="Detail" value={item.detail} onChange={(v) => updateWhyNotItem(i, "detail", v)} />
              </EditorCard>
            ))}
          </RepeatableList>
        </>
      )}

      {/* Properties Preview */}
      <SectionDivider label="Properties Preview" />
      <TextField label="Label" value={h.propertiesPreview.label} onChange={(v) => update("home.content.propertiesPreview.label", v)} />
      <TextField label="Title" value={h.propertiesPreview.title} onChange={(v) => update("home.content.propertiesPreview.title", v)} />
      <TextField label="CTA Text" value={h.propertiesPreview.ctaText} onChange={(v) => update("home.content.propertiesPreview.ctaText", v)} />

      {/* Testimonials Header */}
      <SectionDivider label="Testimonials Header" />
      <TextField label="Label" value={h.testimonials.label} onChange={(v) => update("home.content.testimonials.label", v)} />
      <TextField label="Title" value={h.testimonials.title} onChange={(v) => update("home.content.testimonials.title", v)} />
      <TextField label="Platform Note" value={h.testimonials.platformNote} onChange={(v) => update("home.content.testimonials.platformNote", v)} />

      {/* CTA Section */}
      <SectionDivider label="CTA Section" />
      <TextField label="Title" value={h.cta.title} onChange={(v) => update("home.content.cta.title", v)} />
      <TextField label="Title (Italic)" value={h.cta.titleItalic} onChange={(v) => update("home.content.cta.titleItalic", v)} />
      <TextAreaField label="Subtitle" value={h.cta.subtitle} onChange={(v) => update("home.content.cta.subtitle", v)} />
      <TextField label="CTA 1 Text" value={h.cta.cta1Text} onChange={(v) => update("home.content.cta.cta1Text", v)} />
      <TextField label="CTA 1 Link" value={h.cta.cta1Link} onChange={(v) => update("home.content.cta.cta1Link", v)} />
      <TextField label="CTA 2 Text" value={h.cta.cta2Text} onChange={(v) => update("home.content.cta.cta2Text", v)} />
      <TextField label="CTA 2 Link" value={h.cta.cta2Link} onChange={(v) => update("home.content.cta.cta2Link", v)} />
    </div>
  );
}
