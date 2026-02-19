const MAX_MESSAGE_LENGTH = 1000;
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const RATE_LIMIT_MAX = 10;

const requestTimestamps: number[] = [];

function isRateLimited(): boolean {
  const now = Date.now();
  while (requestTimestamps.length > 0 && now - requestTimestamps[0] > RATE_LIMIT_WINDOW_MS) {
    requestTimestamps.shift();
  }
  return requestTimestamps.length >= RATE_LIMIT_MAX;
}

export async function askAI(message: string): Promise<string> {
  if (isRateLimited()) {
    return "You've sent several messages recently. Please wait a moment before trying again.";
  }

  const sanitized = message.slice(0, MAX_MESSAGE_LENGTH).trim();
  if (!sanitized) {
    return "Please enter a valid message.";
  }

  requestTimestamps.push(Date.now());

  const response = await fetch(
    `${import.meta.env.VITE_AI_WORKER_URL}/agent/chat`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: sanitized }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("AI Worker error:", response.status, errorText);
    return "Our concierge is temporarily unavailable. Please try again shortly.";
  }

  const data = await response.json();

  if (!data?.reply) {
    console.warn("Unexpected AI response:", data);
    return "I’m here to assist with your stay. How may I help you today?";
  }

  return data.reply;
}
