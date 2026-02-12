import type { ChatMessage } from "./types";

type Props = {
  message?: ChatMessage;
};

export default function MessageBubble({ message }: Props) {
  if (!message) return null;

  const isUser = message.role === "user";

  return (
    <div className={`w-full flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}>
      
      {/* Assistant Icon */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full border-2 border-white bg-green-900 dark:bg-green-900 flex items-center justify-center shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
          </svg>
        </div>
      )}

      {/* Message Bubble */}
      <div
        className={[
          "max-w-[82%] px-4 py-3 text-sm leading-relaxed",
          "border transition-colors",
          "bg-green-900 text-white dark:text-cream border-green-900 dark:bg-charcoal",
        ].join(" ")}
        style={{ borderRadius: 14 }}
      >
        {message.text}
      </div>
    </div>
  );
}