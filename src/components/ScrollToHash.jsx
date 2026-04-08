import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace("#", ""));
      if (el) {
        const yOffset = -80; // 👈 adjust based on navbar height
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  }, [hash]);

  return null;
}

export default ScrollToHash;