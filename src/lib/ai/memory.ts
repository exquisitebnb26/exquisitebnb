import type { ChatTurn } from "@/lib/ai/huggingface";

const KEY = "exq_chat_memory_v1";

export function loadMemory(): ChatTurn[] {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveMemory(turns: ChatTurn[]) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(turns.slice(-12)));
  } catch {
    // ignore
  }
}

export function clearMemory() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}