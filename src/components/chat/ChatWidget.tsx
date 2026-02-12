import { useEffect, useState } from "react";
import ChatWindow from "./ChatWindow";
import { MessageCircle, MessageCircleCode, MessageSquareText } from "lucide-react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (open) {
      setShowToast(false);
      return;
    }

    const interval = setInterval(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }, 6000);

    return () => clearInterval(interval);
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ChatWindow open={open} onClose={handleClose} />

      {showToast && !open && (
        <div
          className="
            fixed bottom-24 right-5 z-50
            px-4 py-2 rounded-xl
            text-sm font-medium
            bg-cream dark:bg-charcoal
            text-emerald-900 dark:text-gold
            border border-cream/70 dark:border-warm-white/10
            shadow-lg
            animate-fade-in
          "
        >
          Hey! 👋 I’m here.
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className={`
          fixed bottom-5 right-5 z-50
          h-14 w-14 rounded-full
          border backdrop-blur-md
          bg-cream/80 dark:bg-green-900
          border-cream/60 dark:border-warm-white/10
          shadow-lg
          transition-all duration-300 ease-out
          hover:-translate-y-0.5
          hover:shadow-[0_0_22px_rgba(16,185,129,0.35)]
          dark:hover:shadow-[0_0_22px_rgba(212,175,55,0.35)]
          ${!open ? "luxury-bounce" : ""}
        `}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        <MessageCircle className="w-6 h-6 mx-auto text-emerald-900 dark:text-cream dark:bg-green-900/10" />
      </button>
    </>
  );
}