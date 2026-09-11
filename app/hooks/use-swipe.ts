"use client";

import { useRef } from "react";
import type { PointerEvent, TouchEvent } from "react";

interface UseSwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  /** Minimum horizontal distance (px) to count as a swipe. */
  threshold?: number;
}

interface SwipeHandlers {
  onTouchStart: (e: TouchEvent) => void;
  onTouchEnd: (e: TouchEvent) => void;
  onPointerDown: (e: PointerEvent) => void;
  onPointerUp: (e: PointerEvent) => void;
}

/**
 * Detects horizontal swipe gestures for mobile web.
 * Returns handlers to spread onto the swipeable element.
 * Ignores mostly-vertical drags so it doesn't hijack scrolling.
 */
export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
}: UseSwipeOptions): SwipeHandlers {
  const start = useRef<{ x: number; y: number } | null>(null);

  const begin = (x: number, y: number) => {
    start.current = { x, y };
  };

  const end = (x: number, y: number) => {
    if (!start.current) return;
    const deltaX = x - start.current.x;
    const deltaY = y - start.current.y;
    start.current = null;

    // Only treat as a swipe when the movement is mostly horizontal.
    if (Math.abs(deltaX) < threshold || Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }

    if (deltaX < 0) {
      onSwipeLeft?.();
    } else {
      onSwipeRight?.();
    }
  };

  return {
    onTouchStart: (e) => begin(e.touches[0].clientX, e.touches[0].clientY),
    onTouchEnd: (e) =>
      end(e.changedTouches[0].clientX, e.changedTouches[0].clientY),
    onPointerDown: (e) => {
      // Only track primary mouse button / touch / pen.
      if (e.pointerType === "mouse" && e.button !== 0) return;
      begin(e.clientX, e.clientY);
    },
    onPointerUp: (e) => end(e.clientX, e.clientY),
  };
}
