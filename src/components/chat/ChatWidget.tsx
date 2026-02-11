import { useState } from "react";
import ChatWindow from "./ChatWindow";
import { MessageSquareText } from "lucide-react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ChatWindow open={open} onClose={handleClose} />

      <button
        onClick={() => setOpen((v) => !v)}
        className={[
          "fixed bottom-5 right-5 z-50",
          "h-14 w-14 rounded-full",
          "border backdrop-blur-md",
          "bg-cream/80 dark:bg-charcoal/70",
          "border-cream/60 dark:border-warm-white/10",
          "shadow-lg",
          "transition-all duration-300 ease-out",
          "hover:-translate-y-0.5",
          "hover:shadow-[0_0_22px_rgba(16,185,129,0.35)] dark:hover:shadow-[0_0_22px_rgba(212,175,55,0.35)]",
        ].join(" ")}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        <MessageSquareText className="w-6 h-6 mx-auto text-emerald-900 dark:text-gold" />
      </button>
    </>
  );
}