import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function isTokenExpired(token: string) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload.exp;
    if (!exp) return true;

    const now = Date.now() / 1000;
    return exp < now;
  } catch {
    return true;
  }
}

export default function RequireAuth({ children }: Props) {
  const token = localStorage.getItem("cms_token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (isTokenExpired(token)) {
    localStorage.removeItem("cms_token");
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}