import { useEffect, useState } from "react";
import { me } from "@/lib/auth/api";
import { clearToken } from "@/lib/auth/session";
import Admin from "@/pages/Admin"; 
import AdminLogin from "@/lib/auth/AdminLogin"; 

export default function AdminGate() {
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      try {
        await me();
        setOk(true);
      } catch {
        clearToken();
        setOk(false);
      }
    })();
  }, []);

  if (ok === null) {
    return (
      <div className="min-h-screen bg-charcoal text-cream flex items-center justify-center">
        Checking access…
      </div>
    );
  }

  if (ok) {
    return <Admin />;
  }

  return <AdminLogin />;
}