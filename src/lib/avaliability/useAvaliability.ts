import { useEffect, useState } from "react";
import { fetchAvailability } from "./api";

export function useAvailability(propertyId: string) {
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!propertyId) return;

    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        const data = await fetchAvailability(propertyId);
        console.log("Fetched availability:", data);
        if (mounted) {
          const dates = (data.blockedDates || []).map((d: string) => {
            // Force midnight to avoid timezone shifts
            return new Date(d + "T00:00:00");
          });
          setBlockedDates(dates);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || "Failed to load availability");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [propertyId]);

  return { blockedDates, loading, error };
}