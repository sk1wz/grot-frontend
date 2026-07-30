"use client";

import { useEffect } from "react";

const interactiveSelector = "button, a, [role='button']";

export function TouchHoverReset() {
  useEffect(() => {
    if (!window.matchMedia("(hover: none), (pointer: coarse)").matches) {
      return;
    }

    const resetActiveElement = (event: PointerEvent | TouchEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const interactiveElement = target.closest(interactiveSelector);

      if (interactiveElement instanceof HTMLElement) {
        interactiveElement.blur();
      }
    };

    document.addEventListener("pointerup", resetActiveElement, true);
    document.addEventListener("touchend", resetActiveElement, true);

    return () => {
      document.removeEventListener("pointerup", resetActiveElement, true);
      document.removeEventListener("touchend", resetActiveElement, true);
    };
  }, []);

  return null;
}
