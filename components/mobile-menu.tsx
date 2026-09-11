"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function MobileMenu({ label, children }: { label: string; children: ReactNode }) {
  const menu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const element = menu.current;
    const closeOnLink = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest("a") && element) element.open = false;
    };
    const closeOutside = (event: PointerEvent) => {
      if (menu.current && !menu.current.contains(event.target as Node)) menu.current.open = false;
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu.current?.open) {
        menu.current.open = false;
        menu.current.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    element?.addEventListener("click", closeOnLink);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
      element?.removeEventListener("click", closeOnLink);
    };
  }, []);

  return (
    <details className="mobile-menu" ref={menu}>
      <summary>{label}</summary>
      <div className="mobile-menu-panel">
        {children}
      </div>
    </details>
  );
}
