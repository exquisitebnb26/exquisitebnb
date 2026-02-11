type Env = {
  HF_API_KEY: string;
};

type Payload = {
  question: string;
  context: string;
  memory: Array<{ role: "user" | "assistant"; content: string }>;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://exqusitebnb.com/",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function buildPrompt(p: Payload) {
  const rules = `
You are "Exquisite Concierge" for Exquisitebnb, a boutique luxury short-term rental brand.

Your personality:
- Warm, composed, refined
- Confident but never pushy
- Speak directly to the guest as if welcoming them personally

Guidelines:
- Use ONLY the provided EXQUISITEBNB CONTEXT.
- If information is not available, politely suggest the Contact page.
- Do NOT claim live availability or real-time pricing.
- Guide guests toward booking platforms when appropriate.
- Be helpful and proactive — suggest what you *can* help with.
- Responses should feel premium, natural, and complete (4–8 sentences).
- Never show reasoning, analysis, or internal thoughts.
- Do not mention “context” or “rules.”
`;

  const memoryText = (p.memory || [])
    .slice(-10)
    .map((t) => `${t.role.toUpperCase()}: ${t.content}`)
    .join("\n");

  return `
${rules}

EXQUISITEBNB CONTEXT:
${p.context}

CONVERSATION SO FAR:
${memoryText}

USER QUESTION:
${p.question}

ASSISTANT ANSWER:
`.trim();
}

export default {
  async fetch(request: Request, env: Env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
    }

    let payload: Payload;
    try {
      payload = (await request.json()) as Payload;
    } catch {
      return new Response(JSON.stringify({ reply: "Invalid request." }), { 
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    // Basic guard rails
    if (!payload?.question || !payload?.context) {
      return new Response(JSON.stringify({ reply: "Missing question or context." }), { 
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    const prompt = buildPrompt(payload);

    // Hugging Face Router (chat completion API)
    const hfRes = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/Meta-Llama-3-8B-Instruct",
          messages: [
            { role: "system", content: "You are Exquisite Concierge for Exquisitebnb. Answer only using the provided context. If unsure, suggest contacting support." },
            { role: "user", content: prompt }
          ],
          temperature: 0.2,
          max_tokens: 220
        }),
      }
    );

    if (!hfRes.ok) {
      const errText = await hfRes.text();
      console.log("HF HTTP ERROR:", hfRes.status, errText);
      return new Response(
        JSON.stringify({ reply: "AI service is temporarily unavailable. Please try again shortly." }),
        {
          status: 502,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    let data: any;
    try {
      data = await hfRes.json();
    } catch {
      return new Response(JSON.stringify({ reply: "AI service returned an invalid response." }), { 
        status: 502,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    console.log("HF RAW RESPONSE:", JSON.stringify(data));

    if (data?.error) {
      return new Response(
        JSON.stringify({ reply: "AI service is temporarily unavailable. Please try again shortly." }),
        {
          status: 502,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // HF can return different shapes depending on model state/errors
    let reply = data?.choices?.[0]?.message?.content ?? "";

if (typeof reply === "string") {
  // Remove any <think>...</think> blocks
  reply = reply.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

  // Remove any remaining stray tags
  reply = reply.replace(/<\/?[^>]+(>|$)/g, "").trim();
}

const finalReply =
  reply && reply.length > 3
    ? reply
    : "I’m here to assist with questions about our properties, amenities, or booking process. How may I help you?";

    return new Response(JSON.stringify({ reply: finalReply }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  },
};