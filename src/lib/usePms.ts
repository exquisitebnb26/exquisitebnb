import { useEffect, useState } from "react";
export function usePms() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/pms.json")
      .then(res => res.json())
      .then(setData)
      .catch(() => setData(null));
  }, []);

  return data;
}