import { useEffect, useState } from "react";
import fetchAvailability from "./api";

type Availability = string[];

export function useAvailability(propertyId?: string) {
  const [availability, setAvailability] = useState<Availability | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!propertyId) return;

    let alive = true;
    setIsLoading(true);
    setError(null);

    fetchAvailability(propertyId)
      .then((data) => {
        if (!alive) return;
        setAvailability(data?.blockedDates ?? []);
      })
      .catch((e) => {
        if (!alive) return;
        console.error("Error fetching availability:", e);
        setError(e?.message ?? "Failed to load availability");
      })
      .finally(() => {
        if (!alive) return;
        setIsLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [propertyId]);

  return { availability, isLoading, error };
}