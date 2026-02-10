import { Star, Plus, Trash2, GripVertical, X, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { theme } from "./theme";
import { iconRegistry, iconNames } from "./icons";

import heroImage from "@/assets/hero-living-room.jpg";
import bedroomImage from "@/assets/property-bedroom.jpg";
import kitchenImage from "@/assets/property-kitchen.jpg";
import bathroomImage from "@/assets/property-bathroom.jpg";

const imageKeyMap: Record<string, string> = {
  hero: heroImage,
  bedroom: bedroomImage,
  kitchen: kitchenImage,
  bathroom: bathroomImage,
};

export const availableImageKeys = Object.keys(imageKeyMap);

// ── Basic Fields ───────────────────────────────────────────────────

export function TextField({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className={`text-xs ${theme.textDim} uppercase tracking-wider`}>{label}</label>
      <Input
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${theme.bgInput} ${theme.border} ${theme.text} ${theme.ring} border rounded-sm`}
      />
    </div>
  );
}

export function TextAreaField({ label, value, onChange, rows = 3 }: {
  label: string; value: string; onChange: (v: string) => void; rows?: number;
}) {
  return (
    <div className="space-y-1.5">
      <label className={`text-xs ${theme.textDim} uppercase tracking-wider`}>{label}</label>
      <Textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className={`${theme.bgInput} ${theme.border} ${theme.text} ${theme.ring} border rounded-sm resize-none`}
      />
    </div>
  );
}

export function NumberField({ label, value, onChange, min, max }: {
  label: string; value: number; onChange: (v: number) => void; min?: number; max?: number;
}) {
  return (
    <div className="space-y-1.5">
      <label className={`text-xs ${theme.textDim} uppercase tracking-wider`}>{label}</label>
      <Input
        type="number"
        value={value ?? 0}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        className={`${theme.bgInput} ${theme.border} ${theme.text} ${theme.ring} border rounded-sm w-24`}
      />
    </div>
  );
}

// ── Section Divider ───────────────────────────────────────────────

export function SectionDivider({ label }: { label: string }) {
  return (
    <>
      <div className={`h-px bg-[hsl(0_0%_16%)] my-4`} />
      <p className={`text-xs ${theme.textDim} uppercase tracking-wider font-medium`}>{label}</p>
    </>
  );
}

// ── Card wrapper ──────────────────────────────────────────────────

export function EditorCard({ title, onRemove, children }: {
  title: string; onRemove?: () => void; children: React.ReactNode;
}) {
  return (
    <div className={`border ${theme.border} rounded-sm ${theme.bgInput} overflow-hidden`}>
      <div className={`flex items-center justify-between px-4 py-3 border-b ${theme.border}`}>
        <div className="flex items-center gap-2">
          <GripVertical className={`w-3.5 h-3.5 ${theme.textDim}`} />
          <span className={`text-xs ${theme.textDim} uppercase tracking-wider font-medium`}>{title}</span>
        </div>
        {onRemove && (
          <button onClick={onRemove} className="text-[hsl(0_55%_50%)] hover:text-[hsl(0_55%_60%)] transition-colors p-1" title="Remove">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      <div className="p-4 space-y-3">{children}</div>
    </div>
  );
}

// ── Icon Selector ─────────────────────────────────────────────────

export function IconSelector({ label, value, onChange }: {
  label: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <label className={`text-xs ${theme.textDim} uppercase tracking-wider`}>{label}</label>
      <div className="flex flex-wrap gap-1.5">
        {iconNames.map((name) => {
          const Icon = iconRegistry[name];
          const isActive = value === name;
          return (
            <button
              key={name}
              type="button"
              onClick={() => onChange(name)}
              className={`p-2 rounded-sm border transition-colors ${
                isActive
                  ? "border-[hsl(43_40%_50%)] bg-[hsl(43_40%_50%_/_0.15)]"
                  : `${theme.border} hover:border-[hsl(0_0%_25%)]`
              }`}
              title={name}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-[hsl(43_40%_50%)]" : theme.textMuted}`} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Star Rating ───────────────────────────────────────────────────

export function StarRatingSelector({ value, onChange }: {
  value: number; onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1.5">
      <label className={`text-xs ${theme.textDim} uppercase tracking-wider`}>Rating</label>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button key={star} type="button" onClick={() => onChange(star)} className="p-0.5 transition-colors">
            <Star className={`w-5 h-5 ${star <= value ? "fill-[hsl(43_40%_50%)] text-[hsl(43_40%_50%)]" : "fill-transparent text-[hsl(0_0%_25%)]"}`} />
          </button>
        ))}
        <span className={`text-xs ${theme.textDim} ml-2`}>{value}/5</span>
      </div>
    </div>
  );
}

// ── Repeatable List ───────────────────────────────────────────────

// ── Image Key Selector ────────────────────────────────────────────

export function ImageKeySelector({ label, value, onChange }: {
  label: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <label className={`text-xs ${theme.textDim} uppercase tracking-wider`}>{label}</label>
      <div className="flex flex-wrap gap-2">
        {availableImageKeys.map((key) => {
          const isActive = value === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onChange(key)}
              className={`relative rounded-sm overflow-hidden border-2 transition-all ${
                isActive
                  ? "border-[hsl(43_40%_50%)] ring-1 ring-[hsl(43_40%_50%_/_0.4)]"
                  : "border-[hsl(0_0%_16%)] hover:border-[hsl(0_0%_25%)]"
              }`}
              title={key}
            >
              <img src={imageKeyMap[key]} alt={key} className="w-16 h-12 object-cover" />
              {isActive && (
                <div className="absolute inset-0 bg-[hsl(43_40%_50%_/_0.25)] flex items-center justify-center">
                  <Check className="w-4 h-4 text-[hsl(43_40%_90%)]" />
                </div>
              )}
              <span className={`block text-[10px] text-center py-0.5 ${isActive ? "text-[hsl(43_40%_50%)]" : theme.textDim}`}>{key}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Gallery Key Selector ──────────────────────────────────────────

export function GalleryKeySelector({ label, value, onChange }: {
  label: string; value: string[]; onChange: (v: string[]) => void;
}) {
  const toggle = (key: string) => {
    if (value.includes(key)) {
      onChange(value.filter((k) => k !== key));
    } else {
      onChange([...value, key]);
    }
  };

  return (
    <div className="space-y-1.5">
      <label className={`text-xs ${theme.textDim} uppercase tracking-wider`}>{label} <span className="normal-case opacity-60">({value.length} selected)</span></label>
      <div className="flex flex-wrap gap-2">
        {availableImageKeys.map((key) => {
          const isActive = value.includes(key);
          return (
            <button
              key={key}
              type="button"
              onClick={() => toggle(key)}
              className={`relative rounded-sm overflow-hidden border-2 transition-all ${
                isActive
                  ? "border-[hsl(43_40%_50%)] ring-1 ring-[hsl(43_40%_50%_/_0.4)]"
                  : "border-[hsl(0_0%_16%)] hover:border-[hsl(0_0%_25%)]"
              }`}
              title={key}
            >
              <img src={imageKeyMap[key]} alt={key} className="w-16 h-12 object-cover" />
              {isActive && (
                <div className="absolute inset-0 bg-[hsl(43_40%_50%_/_0.25)] flex items-center justify-center">
                  <Check className="w-4 h-4 text-[hsl(43_40%_90%)]" />
                </div>
              )}
              <span className={`block text-[10px] text-center py-0.5 ${isActive ? "text-[hsl(43_40%_50%)]" : theme.textDim}`}>{key}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Repeatable List ───────────────────────────────────────────────

export function RepeatableList({ title, count, onAdd, addLabel, children, emptyMessage }: {
  title: string; count: number; onAdd: () => void; addLabel: string;
  children: React.ReactNode; emptyMessage?: string;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className={`text-sm ${theme.textMuted}`}>{count} {title}{count !== 1 ? "s" : ""}</p>
        <button
          onClick={onAdd}
          className={`flex items-center gap-1.5 text-xs ${theme.gold} hover:opacity-80 transition-opacity uppercase tracking-wider font-medium`}
        >
          <Plus className="w-3.5 h-3.5" />
          {addLabel}
        </button>
      </div>
      <div className={`border ${theme.border} rounded-sm overflow-hidden`}>
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="p-4 space-y-4">
            {children}
            {count === 0 && (
              <p className={`text-center py-12 ${theme.textDim} text-sm`}>
                {emptyMessage || `No ${title.toLowerCase()}s yet. Click "${addLabel}" to get started.`}
              </p>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}