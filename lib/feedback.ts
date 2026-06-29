"use client";

// Feedback taktil & audio agar hitungan terasa walau mata tertutup.

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  // iOS/Safari: context bisa suspended sampai ada gesture
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function blip(freq: number, durationMs: number, gain = 0.08, type: OscillatorType = "sine") {
  const ac = getCtx();
  if (!ac) return;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  const now = ac.currentTime;
  const dur = durationMs / 1000;
  g.gain.setValueAtTime(0, now);
  g.gain.linearRampToValueAtTime(gain, now + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
  osc.connect(g);
  g.connect(ac.destination);
  osc.start(now);
  osc.stop(now + dur + 0.02);
}

function vibrate(pattern: number | number[]) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch {
      /* sebagian browser blokir tanpa gesture — abaikan */
    }
  }
}

interface Flags {
  sound: boolean;
  haptic: boolean;
}

/** Feedback ringan tiap +1 hitungan. */
export function feedbackTick({ sound, haptic }: Flags) {
  if (sound) blip(660, 60, 0.06, "sine");
  if (haptic) vibrate(12);
}

/** Feedback kuat saat target / kelipatan target tercapai. */
export function feedbackMilestone({ sound, haptic }: Flags) {
  if (sound) {
    blip(784, 120, 0.09, "triangle"); // G5
    window.setTimeout(() => blip(1175, 220, 0.09, "triangle"), 110); // D6
  }
  if (haptic) vibrate([30, 40, 80]);
}

/** Feedback untuk undo / reset. */
export function feedbackUndo({ sound, haptic }: Flags) {
  if (sound) blip(330, 70, 0.05, "sine");
  if (haptic) vibrate(20);
}
