import { useEffect, useMemo, useRef, useState } from "react";

export const useInViewport = <T extends HTMLElement = any>() => {
  const ref = useRef<T>(null);
  const [inViewport, setInViewport] = useState(false);

  const observer = useMemo(() => {
    if (typeof IntersectionObserver === "undefined") {
      return null;
    }
    return new IntersectionObserver(([entry]) =>
      setInViewport(entry.isIntersecting)
    );
  }, []);

  useEffect(() => {
    if (ref.current && observer) {
      observer.observe(ref.current);
      return () => observer.disconnect();
    }
    return () => null;
  }, [observer]);

  return { ref, inViewport };
};
