export type ChatTurn = { role: "user" | "assistant"; content: string };

type AskPayload = {
  question: string;
  memory?: ChatTurn[];
  propertyId?: string;
  arrivalDate?: string;
  departureDate?: string;
  conversationId?: string;
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
export async function submitLead(data: {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  preferences?: any;
  source?: string;
  conversationId?: string;
}) {
  const res = await fetch(`${WORKER_URL}/agent/lead`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source: data.source || "chat",
      name: data.name || null,
      email: data.email || null,
      phone: data.phone || null,
      message: data.message || null,
      preferences: data.preferences || null,
      conversationId: data.conversationId || null,
    }),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return await res.json();
}

export async function askConciergeAI(payload: AskPayload): Promise<any> {
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

  const res = await fetch(`${WORKER_URL}/agent/chat`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      question: sanitizedQuestion,
      memory: payload.memory ?? [],
      propertyId: payload.propertyId ?? undefined,
      arrivalDate: payload.arrivalDate ?? undefined,
      departureDate: payload.departureDate ?? undefined,
      conversationId: payload.conversationId ?? undefined
    }),
  });

  if (!res.ok) {
    let errorMessage = `AI request failed: ${res.status}`;
    try {
      const err = await res.json();
      if (err?.error) errorMessage = err.error;
    } catch {
      // ignore parsing error
    }
    throw new Error(errorMessage);
  }

  const data = await res.json();

  if (!data || typeof data.reply !== "string") {
    return { reply: "I'm here to help. Please try again." };
  }

  return data;
}
