export default {
  async fetch(request: Request, env: any) {
    const url = new URL(request.url);

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // 1️⃣ PUBLIC: Get availability
    if (request.method === "GET" && url.pathname === "/api/availability") {
      const propertyId = url.searchParams.get("propertyId");
      if (!propertyId) {
        return json({ error: "Missing propertyId" }, 400, corsHeaders);
      }

      const rows = await env.DB.prepare(
        "SELECT date FROM availability WHERE property_id = ? AND status = 'blocked'"
      )
        .bind(propertyId)
        .all();

      return json(
        {
          blockedDates: rows.results.map((r: any) => r.date)
        },
        200,
        corsHeaders
      );
    }

    // 2️⃣ WEBHOOK: Hostaway pushes update
    if (request.method === "POST" && url.pathname === "/webhook/hostaway") {
      const body = await request.json();

      /*
        Sample Hostaway-style payload:
        {
          propertyId: "mock-1",
          blockedDates: ["2026-02-20","2026-02-21"]
        }
      */

      const { propertyId, blockedDates } = body;

      if (!propertyId || !blockedDates) {
        return json({ error: "Invalid payload" }, 400, corsHeaders);
      }

      // Remove existing blocked dates
      await env.DB.prepare(
        "DELETE FROM availability WHERE property_id = ?"
      )
        .bind(propertyId)
        .run();

      // Insert new blocked dates
      for (const date of blockedDates) {
        await env.DB.prepare(
          "INSERT OR IGNORE INTO availability (id, property_id, date, status) VALUES (?, ?, ?, 'blocked')"
        )
          .bind(crypto.randomUUID(), propertyId, date)
          .run();
      }

      return json({ success: true }, 200, corsHeaders);
    }

    return json({ error: "Not Found" }, 404, corsHeaders);
  }
};

function json(data: any, status: number, headers: any) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...headers
    }
  });
}