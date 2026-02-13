export type ChatTurn = { role: "user" | "assistant"; content: string };

type AskPayload = {
  question: string;
  context: string;
  memory: ChatTurn[];
};

const WORKER_URL = import.meta.env.VITE_AI_WORKER_URL as string;

const MAX_MESSAGE_LENGTH = 1000;
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const RATE_LIMIT_MAX = 10;

const requestTimestamps: number[] = [];

function isRateLimited(): boolean {
  const now = Date.now();
  // Remove old timestamps
  while (requestTimestamps.length > 0 && now - requestTimestamps[0] > RATE_LIMIT_WINDOW_MS) {
    requestTimestamps.shift();
  }
  return requestTimestamps.length >= RATE_LIMIT_MAX;
}

export async function askConciergeAI(payload: AskPayload): Promise<string> {
  if (!WORKER_URL) {
    throw new Error("Missing VITE_AI_WORKER_URL");
  }

  if (isRateLimited()) {
    return "You've sent several messages recently. Please wait a moment before trying again.";
  }

  // Validate and truncate input
  const sanitizedQuestion = payload.question.slice(0, MAX_MESSAGE_LENGTH).trim();
  if (!sanitizedQuestion) {
    return "Please enter a valid message.";
  }

  requestTimestamps.push(Date.now());

  const res = await fetch(WORKER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      question: sanitizedQuestion,
    }),
  });

  if (!res.ok) {
    throw new Error(`AI request failed: ${res.status}`);
  }

  const data = await res.json();
  return data?.reply ?? "I'm here to help. Please try again.";
}
