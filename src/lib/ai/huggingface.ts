export type ChatTurn = { role: "user" | "assistant"; content: string };

type AskPayload = {
  question: string;
  context: string;
  memory: ChatTurn[];
};

const WORKER_URL = import.meta.env.VITE_AI_WORKER_URL as string;


export async function askConciergeAI(payload: AskPayload): Promise<string> {
  if (!WORKER_URL) {
    throw new Error("Missing VITE_AI_WORKER_URL");
  }

  const res = await fetch(WORKER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`AI request failed: ${res.status}`);
  }

  const data = await res.json();
  return data?.reply ?? "I’m here to help. Please try again.";
}