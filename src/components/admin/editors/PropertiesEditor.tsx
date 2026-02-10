import { TextField, TextAreaField, NumberField, SectionDivider, EditorCard, RepeatableList, StarRatingSelector, ImageKeySelector, GalleryKeySelector } from "../fields";
import type { SiteContent } from "@/lib/content";

interface EditorProps {
  content: SiteContent;
  update: (path: string, value: unknown) => void;
}

export default function PropertiesEditor({ content, update }: EditorProps) {
  const p = content.properties;

  const updateItem = (index: number, field: string, value: unknown) => {
    const items = [...p.items];
    items[index] = { ...items[index], [field]: value };
    update("properties.items", items);
  };

  const addReviewToProperty = (propIndex: number) => {
    const items = [...p.items];
    items[propIndex] = {
      ...items[propIndex],
      reviews: [...items[propIndex].reviews, { rating: 5, text: "", author: "",label: "" }],
    };
    update("properties.items", items);
  };

  const removeReviewFromProperty = (propIndex: number, reviewIndex: number) => {
    const items = [...p.items];
    items[propIndex] = {
      ...items[propIndex],
      reviews: items[propIndex].reviews.filter((_, j) => j !== reviewIndex),
    };
    update("properties.items", items);
  };

  const updateReview = (propIndex: number, reviewIndex: number, field: string, value: unknown) => {
    const items = [...p.items];
    const reviews = [...items[propIndex].reviews];
    reviews[reviewIndex] = { ...reviews[reviewIndex], [field]: value };
    items[propIndex] = { ...items[propIndex], reviews };
    update("properties.items", items);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <SectionDivider label="Header" />
      <TextField label="Label" value={p.header.label} onChange={(v) => update("properties.header.label", v)} />
      <TextField label="Title" value={p.header.title} onChange={(v) => update("properties.header.title", v)} />
      <TextAreaField label="Subtitle" value={p.header.subtitle} onChange={(v) => update("properties.header.subtitle", v)} />
      <TextField label="Booking Note" value={p.bookingNote} onChange={(v) => update("properties.bookingNote", v)} />

      {/* Properties */}
      <SectionDivider label="Properties" />
      <RepeatableList
        title="Property"
        count={p.items.length}
        onAdd={() => update("properties.items", [...p.items, {
          id: `property-${Date.now()}`,
          name: "New Property",
          location: "",
          guests: 2,
          bedrooms: 1,
          bathrooms: 1,
          rating: 5,
          reviewCount: 0,
          description: "",
          fullDescription: "",
          imageKey: "hero",
          galleryKeys: ["hero"],
          amenities: [],
          idealFor: [],
          reviews: [],
          bookingPlatforms: [],
        }])}
        addLabel="Add Property"
      >
        {p.items.map((prop, i) => (
          <EditorCard
            key={prop.id}
            title={prop.name || `Property ${i + 1}`}
            onRemove={() => update("properties.items", p.items.filter((_, j) => j !== i))}
          >
            <TextField label="ID (slug)" value={prop.id} onChange={(v) => updateItem(i, "id", v)} />
            <TextField label="Name" value={prop.name} onChange={(v) => updateItem(i, "name", v)} />
            <TextField label="Location" value={prop.location} onChange={(v) => updateItem(i, "location", v)} />

            <div className="grid grid-cols-3 gap-3">
              <NumberField label="Guests" value={prop.guests} onChange={(v) => updateItem(i, "guests", v)} min={1} />
              <NumberField label="Bedrooms" value={prop.bedrooms} onChange={(v) => updateItem(i, "bedrooms", v)} min={1} />
              <NumberField label="Bathrooms" value={prop.bathrooms} onChange={(v) => updateItem(i, "bathrooms", v)} min={1} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <NumberField label="Rating" value={prop.rating} onChange={(v) => updateItem(i, "rating", v)} min={1} max={5} />
              <NumberField label="Review Count" value={prop.reviewCount} onChange={(v) => updateItem(i, "reviewCount", v)} min={0} />
            </div>

            <TextAreaField label="Short Description" value={prop.description} onChange={(v) => updateItem(i, "description", v)} />
            <TextAreaField label="Full Description" value={prop.fullDescription} rows={4} onChange={(v) => updateItem(i, "fullDescription", v)} />

            <ImageKeySelector label="Cover Image" value={prop.imageKey} onChange={(v) => updateItem(i, "imageKey", v)} />
            <GalleryKeySelector label="Gallery Images" value={prop.galleryKeys} onChange={(v) => updateItem(i, "galleryKeys", v)} />
            <TextField label="Amenities (comma-separated)" value={prop.amenities.join(", ")} onChange={(v) => updateItem(i, "amenities", v.split(",").map((s) => s.trim()).filter(Boolean))} />
            <SectionDivider/>

<TextField
  label="Ideal For (comma-separated)"
  value={(prop.idealFor || []).join(", ")}
  onChange={(v) =>
    updateItem(
      i,
      "idealFor",
      v.split(",").map((s) => s.trim()).filter(Boolean)
    )
  }
/>
            <SectionDivider label="Booking Platforms" />

            <RepeatableList
              title="Platform"
              count={prop.bookingPlatforms.length}
              onAdd={() =>
                updateItem(i, "bookingPlatforms", [
                  ...prop.bookingPlatforms,
                  { name: "", url: "" },
                ])
              }
              addLabel="Add Platform"
            >
              {prop.bookingPlatforms.map((platform, pi) => (
                <EditorCard
                  key={pi}
                  title={platform.name || `Platform ${pi + 1}`}
                  onRemove={() =>
                    updateItem(
                      i,
                      "bookingPlatforms",
                      prop.bookingPlatforms.filter((_, j) => j !== pi)
                    )
                  }
                >
                  <TextField
                    label="Platform Name"
                    value={platform.name}
                    onChange={(v) => {
                      const updated = [...prop.bookingPlatforms];
                      updated[pi] = { ...updated[pi], name: v };
                      updateItem(i, "bookingPlatforms", updated);
                    }}
                  />
                  <TextField
                    label="Platform URL"
                    value={platform.url}
                    onChange={(v) => {
                      const updated = [...prop.bookingPlatforms];
                      updated[pi] = { ...updated[pi], url: v };
                      updateItem(i, "bookingPlatforms", updated);
                    }}
                  />
                </EditorCard>
              ))}
            </RepeatableList>

            <SectionDivider label="Property Reviews" />
            {prop.reviews.map((review, ri) => (
              <EditorCard key={ri} title={`Review ${ri + 1}`} onRemove={() => removeReviewFromProperty(i, ri)}>
                <StarRatingSelector value={review.rating} onChange={(v) => updateReview(i, ri, "rating", v)} />
                <TextAreaField label="Text" value={review.text} onChange={(v) => updateReview(i, ri, "text", v)} />
                <TextField label="Author" value={review.author} onChange={(v) => updateReview(i, ri, "author", v)} />
                <TextField label="Label" value={review.label} onChange={(v) => updateReview(i, ri, "label", v)} />
              </EditorCard>
            ))}
            <button
              onClick={() => addReviewToProperty(i)}
              className="text-xs text-[hsl(43_40%_50%)] hover:opacity-80 uppercase tracking-wider"
            >
              + Add Review
            </button>
          </EditorCard>
        ))}
      </RepeatableList>
    </div>
  );
}
