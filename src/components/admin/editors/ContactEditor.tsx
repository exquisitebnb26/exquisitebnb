import { TextField, TextAreaField } from "../fields";
import type { SiteContent } from "@/lib/content";

interface EditorProps {
  content: SiteContent;
  update: (path: string, value: unknown) => void;
}

export default function ContactEditor({ content, update }: EditorProps) {
  const c = content.contact;
  return (
    <div className="space-y-4">
      <TextField label="Label" value={c.header.label} onChange={(v) => update("contact.header.label", v)} />
      <TextField label="Title" value={c.header.title} onChange={(v) => update("contact.header.title", v)} />
      <TextAreaField label="Subtitle" value={c.header.subtitle} onChange={(v) => update("contact.header.subtitle", v)} />
      <TextAreaField label="Form Note" value={c.formNote} onChange={(v) => update("contact.formNote", v)} />
      <TextField label="Success Title" value={c.successTitle} onChange={(v) => update("contact.successTitle", v)} />
      <TextAreaField label="Success Text" value={c.successText} onChange={(v) => update("contact.successText", v)} />
    </div>
  );
}
