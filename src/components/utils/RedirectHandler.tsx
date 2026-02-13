import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ALLOWED_PREFIXES = [
  "/properties", "/about", "/contact", "/faqs", "/book",
  "/partnership", "/admin", "/login",
];

export default function RedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");

    if (
      redirect &&
      redirect.startsWith("/") &&
      !redirect.startsWith("//") &&
      !redirect.includes("://") &&
      ALLOWED_PREFIXES.some((p) => redirect === p || redirect.startsWith(p + "/"))
    ) {
      navigate(redirect, { replace: true });
    }
  }, [navigate]);

  return null;
}
