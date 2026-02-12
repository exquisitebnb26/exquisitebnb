import { useState } from "react";

export default function PmsSync() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSync = async () => {
    setLoading(true);
    setMessage("");
        console.log("Starting PMS sync...");
        console.log("Using sync secret:", import.meta.env.VITE_SYNC_SECRET);
    try {
      const res = await fetch(
        "https://exquisitebnb-sync.exquisitebnb-ai.workers.dev/sync",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-sync-secret": import.meta.env.VITE_SYNC_SECRET,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Sync failed");
      }

      setMessage(data.message || "Sync completed");
    } catch (err) {
      setMessage("Sync failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">PMS Sync</h2>

      <button
        onClick={handleSync}
        disabled={loading}
        className="px-6 py-3 rounded-xl border border-gold text-gold hover:shadow-lg transition"
      >
        {loading ? "Syncing..." : "Sync Now"}
      </button>

      {message && (
        <p className="text-sm opacity-70">{message}</p>
      )}
    </div>
  );
}