export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Handle preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {

      // ===============================
      // 1️⃣ GET AVAILABILITY
      // ===============================
      if (request.method === "GET" && url.pathname === "/api/availability") {
        const propertyId = url.searchParams.get("propertyId");

        if (!propertyId) {
          return json({ error: "Missing propertyId" }, 400, corsHeaders);
        }

        const result = await env.DB.prepare(`
          SELECT date, status FROM availability
          WHERE property_id = ?
        `).bind(propertyId).all();

        return json(result.results, 200, corsHeaders);
      }

      // ===============================
      // 2️⃣ WEBHOOK AVAILABILITY INSERT
      // ===============================
      if (request.method === "POST" && url.pathname === "/webhook/availability") {

        const body = await request.json();

        const { propertyId, arrivalDate, departureDate } = body;

        if (!propertyId || !arrivalDate || !departureDate) {
          return json({ error: "Missing required fields" }, 400, corsHeaders);
        }

        const dates = generateDateRange(arrivalDate, departureDate);

        for (const date of dates) {
          await env.DB.prepare(`
            INSERT OR REPLACE INTO availability (id, property_id, date, status)
            VALUES (?, ?, ?, ?)
          `)
          .bind(crypto.randomUUID(), propertyId, date, "booked")
          .run();
        }

        return json({ success: true }, 200, corsHeaders);
      }

      return json({ error: "Not found" }, 404, corsHeaders);

    } catch (err: any) {
      return json({ error: err.message }, 500, corsHeaders);
    }
  }
  
};
function generateDateRange(start: string, end: string) {
  const dates: string[] = [];
  const current = new Date(start);
  const last = new Date(end);

  while (current < last) {
    dates.push(current.toISOString().split("T")[0]);
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

function json(data: any, status: number, headers: any) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...headers
    }
  });
}

