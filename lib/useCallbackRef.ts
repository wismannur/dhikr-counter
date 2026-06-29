"use client";

import { useCallback, useInsertionEffect, useRef } from "react";

/**
 * Mengembalikan fungsi dengan identitas stabil yang selalu memanggil versi
 * terbaru dari `fn`. Berguna agar event listener (mis. keydown) tidak perlu
 * di-subscribe ulang tiap render, tapi tetap memakai state terkini.
 */
export function useCallbackRef<Args extends unknown[], R>(
  fn: (...args: Args) => R
): (...args: Args) => R {
  const ref = useRef(fn);
  useInsertionEffect(() => {
    ref.current = fn;
  });
  return useCallback((...args: Args) => ref.current(...args), []);
}
