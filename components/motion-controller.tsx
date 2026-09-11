"use client";

import { useEffect } from "react";

export function MotionController() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const groups = Array.from(document.querySelectorAll<HTMLElement>(
      ".hero-orbit, .practice-graphic, .case-media, .contact-signal, .practice-hero-visual, .deliverables-signal, .cycle-shell",
    ));
    const motionObserver = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        (target as HTMLElement).dataset.motion = isIntersecting ? "running" : "paused";
      });
    }, { rootMargin: "80px" });
    groups.forEach((element) => {
      element.dataset.motion = "paused";
      motionObserver.observe(element);
    });
    const syncVisibility = () => {
      document.documentElement.dataset.pageMotion = document.hidden ? "paused" : "running";
    };
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);

    // Prepare only offscreen content so already visible text never flashes.
    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-reveal] > .section-intro, [data-reveal] > .integration-copy, [data-reveal] > .standards-heading, [data-reveal] > .contact-copy, [data-reveal] > .practice-grid, [data-reveal] > .case-grid, [data-reveal] > .method-grid, [data-reveal] > .standards-list, [data-reveal] > .cycle-shell, [data-reveal] > .deliverables-signal, [data-reveal] > .related-links",
      ),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.enter = "ready";
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "60px", threshold: 0 },
    );
    if (!reducedMotion.matches) {
      revealElements.forEach((element) => {
        if (element.getBoundingClientRect().top <= window.innerHeight + 24) return;
        element.dataset.enter = "pending";
        observer.observe(element);
      });
    }
    const syncPreference = () => {
      if (!reducedMotion.matches) return;
      observer.disconnect();
      revealElements.forEach((element) => { delete element.dataset.enter; });
    };
    reducedMotion.addEventListener("change", syncPreference);

    const parallaxElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]"),
    );
    const cleanups = parallaxElements.map((element) => {
      let frame = 0;
      const onPointerMove = (event: PointerEvent) => {
        if (reducedMotion.matches || !finePointer.matches || event.pointerType === "touch") return;
        window.cancelAnimationFrame(frame);
        frame = window.requestAnimationFrame(() => {
          const rect = element.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          element.style.setProperty("--pointer-x", `${(x * 14).toFixed(2)}px`);
          element.style.setProperty("--pointer-y", `${(y * 14).toFixed(2)}px`);
        });
      };
      const onPointerLeave = () => {
        window.cancelAnimationFrame(frame);
        element.style.setProperty("--pointer-x", "0px");
        element.style.setProperty("--pointer-y", "0px");
      };
      element.addEventListener("pointermove", onPointerMove);
      element.addEventListener("pointerleave", onPointerLeave);
      finePointer.addEventListener("change", onPointerLeave);
      reducedMotion.addEventListener("change", onPointerLeave);
      return () => {
        onPointerLeave();
        element.removeEventListener("pointermove", onPointerMove);
        element.removeEventListener("pointerleave", onPointerLeave);
        finePointer.removeEventListener("change", onPointerLeave);
        reducedMotion.removeEventListener("change", onPointerLeave);
      };
    });

    return () => {
      observer.disconnect();
      motionObserver.disconnect();
      groups.forEach((element) => { delete element.dataset.motion; });
      revealElements.forEach((element) => { delete element.dataset.enter; });
      delete document.documentElement.dataset.pageMotion;
      document.removeEventListener("visibilitychange", syncVisibility);
      reducedMotion.removeEventListener("change", syncPreference);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return null;
}
