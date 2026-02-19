import { TextField, TextAreaField, StarRatingSelector, EditorCard, RepeatableList } from "../fields";
import type { SiteContent } from "@/lib/content";

interface EditorProps {
  content: SiteContent;
  update: (path: string, value: unknown) => void;
}

export default function ReviewsEditor({ content, update }: EditorProps) {
  const items = content.home?.content?.testimonials?.items ?? [];
  
  const updateReview = (index: number, field: string, value: unknown) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    update("home.content.testimonials.items", newItems);
  };

  return (
    <RepeatableList
      title="Review"
      count={items.length}
      onAdd={() =>
        update("home.content.testimonials.items", [
          ...items,
          { rating: 5, text: "", author: "", label: "" }
        ])
      }
      addLabel="Add Review"
    >
      {items.map((t, i) => (
        <EditorCard
          key={i}
          title={t.author || `Review ${i + 1}`}
          onRemove={() =>
            update(
              "home.content.testimonials.items",
              items.filter((_, j) => j !== i)
            )
          }
        >
          <StarRatingSelector value={t.rating} onChange={(v) => updateReview(i, "rating", v)} />
          <TextAreaField label="Review Text" value={t.text} onChange={(v) => updateReview(i, "text", v)} />
          <TextField label="Author" value={t.author} onChange={(v) => updateReview(i, "author", v)} />
          <TextField label="Label" value={t.label} onChange={(v) => updateReview(i, "label", v)} />
        </EditorCard>
      ))}
    </RepeatableList>
  );
}
