import { useState } from "react";
import { getToken } from "../../lib/auth/session";

export default function PmsSync() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const SYNC_WORKER_URL = import.meta.env.VITE_SYNC_WORKER_URL as string;

  const handleSync = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const token = getToken();

      if (!token) {
        setError("Unauthorized. Please login again.");
        setLoading(false);
        return;
      }

      const res = await fetch(`${SYNC_WORKER_URL}/pms/sync`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Sync failed");
      }

      setMessage("PMS Sync completed successfully.");
    } catch (err: any) {
      setError(err?.message || "Sync failed.");
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
        className="px-6 py-3 rounded-xl border border-gold text-gold hover:shadow-lg transition disabled:opacity-50"
      >
        {loading ? "Syncing PMS..." : "Run PMS Sync"}
      </button>

      {message && (
        <p className="text-green-500 text-sm">{message}</p>
      )}

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
}