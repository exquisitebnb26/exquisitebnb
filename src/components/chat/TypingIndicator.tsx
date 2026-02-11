export default function TypingIndicator() {
  return (
    <div className="w-full flex justify-start">
      <div
        className="px-4 py-3 text-sm border backdrop-blur-sm
          bg-cream/70 border-cream/60 text-charcoal
          dark:bg-charcoal/60 dark:border-warm-white/10 dark:text-cream-muted"
        style={{ borderRadius: 14 }}
      >
        <span className="inline-flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full animate-bounce bg-charcoal/60 dark:bg-cream-muted/70" />
          <span className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:120ms] bg-charcoal/60 dark:bg-cream-muted/70" />
          <span className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:240ms] bg-charcoal/60 dark:bg-cream-muted/70" />
        </span>
      </div>
    </div>
  );
}
