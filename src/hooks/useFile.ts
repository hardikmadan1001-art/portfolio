import { useEffect, useState } from "react";

/**
 * True only once the file is confirmed reachable (HEAD probe — no 404 noise
 * in the console when the file is absent). While unknown/absent it returns
 * false so callers render their procedural fallback.
 */
export default function useFile(src?: string) {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (!src) {
      setOk(false);
      return;
    }
    let alive = true;
    setOk(false);
    fetch(src, { method: "HEAD", cache: "no-store" })
      .then((r) => {
        if (alive) setOk(r.ok);
      })
      .catch(() => {
        if (alive) setOk(false);
      });
    return () => {
      alive = false;
    };
  }, [src]);

  return ok;
}
