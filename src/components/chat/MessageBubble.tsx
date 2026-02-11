

import type { ChatMessage } from "./types";

type Props = {
  message?: ChatMessage;
};

export default function MessageBubble({ message }: Props) {
  if (!message) return null;

  const isUser = message.role === "user";

  return (
    <div className={`w-full flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={[
          "max-w-[82%] px-4 py-3 text-sm leading-relaxed",
          "border backdrop-blur-sm transition-colors",
          isUser
            ? "bg-emerald/15 border-emerald/30 text-emerald-900 dark:bg-gold/10 dark:border-gold/25 dark:text-cream"
            : "bg-cream/70 border-cream/60 text-charcoal dark:bg-charcoal/60 dark:border-warm-white/10 dark:text-cream-muted",
        ].join(" ")}
        style={{ borderRadius: 14 }}
      >
        {message.text}
      </div>
    </div>
  );
}