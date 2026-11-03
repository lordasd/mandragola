"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { PauseIcon, PlayIcon } from "@/components/ui/icons";

const REDUCE = "(prefers-reduced-motion: reduce)";

type Props = {
  video: { webm: string; mp4: string };
  labels: { pause: string; play: string };
};

/** Desktop only, motion allowed, no Data Saver: the file is never requested on mobile. */
function canPlay() {
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  return matchMedia("(min-width: 48rem)").matches && !matchMedia(REDUCE).matches && !saveData;
}

/**
 * Decorative hero background loop. Renders nothing on the server or before `window` load + idle,
 * so the h1 stays the LCP. Includes a pause/play toggle (WCAG 2.2.2) and pauses if the user
 * switches to reduced motion. Sits under the hero overlay (-z-20 vs -z-10).
 */
export function HeroVideo({ video, labels }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);

  // Mount after load, when the browser is idle.
  useEffect(() => {
    let idle: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const mount = () => canPlay() && setMounted(true);
    const schedule = () => {
      if ("requestIdleCallback" in window) idle = requestIdleCallback(mount, { timeout: 2000 });
      else timer = setTimeout(mount, 200);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      if (idle !== undefined) cancelIdleCallback(idle);
      clearTimeout(timer);
    };
  }, []);

  // Pause if the reduced-motion preference turns on while mounted.
  useEffect(() => {
    if (!mounted) return;
    const mq = matchMedia(REDUCE);
    const onChange = () => mq.matches && ref.current?.pause();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [mounted]);

  if (!mounted) return null;

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) void v.play().catch(() => {});
    else v.pause();
  };

  return (
    <>
      <video
        ref={ref}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        onPlaying={() => setPlaying(true)}
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
        className={cn(
          "absolute inset-0 -z-20 size-full object-cover opacity-0 motion-safe:transition-opacity motion-safe:duration-300",
          playing && "opacity-100",
        )}
      >
        <source src={video.webm} type="video/webm" />
        <source src={video.mp4} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={paused ? labels.play : labels.pause}
        // Subtle on purpose (kept for WCAG 2.2.2): 32px (>= 24px target, 2.5.8), white icon on ink/70 stays >= 3:1.
        className="absolute end-4 bottom-4 inline-flex size-8 items-center justify-center rounded-full bg-ink/70 text-on-ink/80 motion-safe:transition-colors motion-safe:duration-150 hover:bg-ink hover:text-on-ink focus-visible:bg-ink focus-visible:text-on-ink"
      >
        {paused ? <PlayIcon size={14} /> : <PauseIcon size={14} />}
      </button>
    </>
  );
}
