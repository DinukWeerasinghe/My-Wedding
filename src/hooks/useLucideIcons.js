import { useEffect } from "react";

export function useLucideIcons(dependencies = []) {
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, dependencies);
}
