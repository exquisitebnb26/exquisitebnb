// Frontend helper to fetch availability from Cloudflare Worker

export async function fetchAvailability(propertyId: string) {
  const res = await fetch(
    `${import.meta.env.VITE_CALENDER_WORKER_URL}/api/availability?propertyId=${propertyId}`
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to fetch availability");
  }

  const data = await res.json();

  // Worker returns array of rows: [{ start_date, end_date, status }]
  const blockedDates: string[] = [];

  (data || [])
    .filter((d: any) => d.status === "booked")
    .forEach((d: any) => {
      const start = new Date(d.start_date);
      const end = new Date(d.end_date);

      // Expand date range into individual days
      for (
        let dt = new Date(start);
        dt < end;
        dt.setDate(dt.getDate() + 1)
      ) {
        blockedDates.push(dt.toISOString().split("T")[0]);
      }
    });

  return { blockedDates };
}
