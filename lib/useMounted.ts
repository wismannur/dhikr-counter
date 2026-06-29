"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** True setelah komponen ter-mount di klien (false saat SSR/hidrasi).
 * Memakai useSyncExternalStore agar tidak memicu set-state di effect dan
 * tetap aman dari mismatch hidrasi. */
export function useMounted(): boolean {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false
  );
}
