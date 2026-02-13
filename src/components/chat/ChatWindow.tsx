import { useEffect, useRef, useState, useMemo } from "react";
import MessageBubble from "./MessageBubble";
import type { ChatMessage } from "./types";
import { X, Send } from "lucide-react";
import { useContent } from "@/lib/content"; // adjust if your hook path differs
import { buildSiteContext } from "@/lib/ai/buildContext";
import { askConciergeAI } from "@/lib/ai/huggingface";
import type { ChatTurn } from "@/lib/ai/huggingface";
import { loadMemory, saveMemory } from "@/lib/ai/memory";
import TypingIndicator from "./TypingIndicator";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ChatWindow({ open, onClose }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Welcome — I’m Exquisite Concierge. How may I help you today?",
      ts: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [memory, setMemory] = useState<ChatTurn[]>(() => loadMemory());
const content = useContent();

const context = useMemo(() => {
  if (!content) return "";
  return buildSiteContext(content);
}, [content]);

  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (!el) return;

    const isNearBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < 120;

    if (isNearBottom) {
      requestAnimationFrame(() => {
        el.scrollTo({
          top: el.scrollHeight,
          behavior: "smooth",
        });
      });
    }
  }, [messages, open]);

  const onSend = async () => {
    const text = input.trim();
    if (!text) return;
    if (!context) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant" as const,
          text: "I’m preparing your concierge experience. Please try again in a moment.",
          ts: Date.now(),
        },
      ]);
      return;
    }

    const userMsg = {
      id: crypto.randomUUID(),
      role: "user" as const,
      text,
      ts: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const nextMemory: ChatTurn[] = ([
      ...memory,
      { role: "user" as const, content: text },
    ] as ChatTurn[]).slice(-12);

    setMemory(nextMemory);
    saveMemory(nextMemory);

    setIsTyping(true);

    try {
      const reply = await askConciergeAI({
        question: text,
        context,
        memory: nextMemory,
      });

      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }

      const botMsg = {
        id: crypto.randomUUID(),
        role: "assistant" as const,
        text: reply,
        ts: Date.now(),
      };

      setMessages((prev) => [...prev, botMsg]);

      const updatedMemory: ChatTurn[] = ([
        ...nextMemory,
        { role: "assistant" as const, content: reply },
      ] as ChatTurn[]).slice(-12);

      setMemory(updatedMemory);
      saveMemory(updatedMemory);
    } catch (e) {
      const fallback =
        "I’m here to assist. For availability, pricing details, or special arrangements, please use our contact form and our team will respond promptly.";
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant" as const,
          text: fallback,
          ts: Date.now(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") onSend();
  };

  return (
    <div
      className={[
        "fixed bottom-20 right-5 z-50 w-[360px] max-w-[calc(100vw-2rem)]",
        "rounded-2xl overflow-hidden",
        "border shadow-lg",
        "bg-cream/90 dark:bg-charcoal/85",
        "border-cream/60 dark:border-warm-white/10",
        "backdrop-blur-md",
        "transition-all duration-300 ease-out",
        open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none",
      ].join(" ")}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-cream/60 dark:border-warm-white/10">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-charcoal dark:text-cream">
            Exquisite Concierge
          </span>
          <span className="text-xs text-emerald dark:text-cream-muted">
            24/7 quick guidance
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-xl hover:bg-charcoal/5 dark:hover:bg-warm-white/5 transition"
          aria-label="Close chat"
        >
          <X className="w-4 h-4 text-charcoal dark:text-cream" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="px-4 py-3 h-[360px] overflow-y-auto space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="animate-fade-in-up"
          >
            <MessageBubble
              message={{
                ...msg,
                text: msg.text,
                ts: msg.ts,
              }}
            />
            <div className="text-[10px] mt-1 text-charcoal/40 dark:text-cream-muted/50">
              {new Date(msg.ts).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        ))}
        {isTyping ? <TypingIndicator /> : null}
      </div>

      {/* Input */}
      <div className="px-3 py-3 border-t border-cream/60 dark:border-warm-white/10">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Ask about properties, amenities, booking…"
            className={[
              "w-full px-4 py-3 rounded-xl outline-none",
              "bg-transparent",
              "border border-cream/70 dark:border-warm-white/10",
              "text-charcoal dark:text-cream",
              "placeholder:text-charcoal/40 dark:placeholder:text-cream-muted/60",
              "focus:border-emerald/40 dark:focus:border-gold/40",
              "transition",
            ].join(" ")}
          />
          <button
            onClick={onSend}
            className={[
              "h-[46px] w-[46px] rounded-xl flex items-center justify-center",
              "border",
              "border-emerald/30 dark:border-gold/30",
              "hover:shadow-[0_0_18px_rgba(16,185,129,0.35)] dark:hover:shadow-[0_0_18px_rgba(212,175,55,0.35)]",
              "transition-all duration-300",
            ].join(" ")}
            aria-label="Send message"
          >
            <Send className="w-4 h-4 text-emerald-800 dark:text-gold" />
          </button>
        </div>

        <p className="mt-2 text-[11px] text-emerald dark:text-cream-muted">
          For reservations, you’ll be redirected to secure booking platforms.
        </p>
      </div>
      <audio
        ref={audioRef}
        src="/chat-notification.mp3"
        preload="auto"
      />
    </div>
  );
}