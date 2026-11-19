import confetti from 'canvas-confetti';

/**
 * Gentle confetti burst for small achievements, star milestones, or daily mission completion.
 */
export function fireGentleConfetti(options?: { count?: number; spread?: number }) {
  const count = options?.count ?? 45;
  const spread = options?.spread ?? 60;
  
  try {
    confetti({
      particleCount: count,
      spread: spread,
      origin: { y: 0.7 },
      colors: ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6', '#FBBF24'],
      ticks: 200,
      gravity: 0.9,
      scalar: 1,
      disableForReducedMotion: true,
    });
  } catch (err) {
    console.warn('Confetti error:', err);
  }
}

/**
 * Dual-cannon celebratory festive burst for badge unlocks and major milestones.
 */
export function fireBadgeUnlockConfetti() {
  try {
    // Left side cannon
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 60,
      origin: { x: 0.05, y: 0.7 },
      colors: ['#F59E0B', '#FBBF24', '#34D399', '#60A5FA', '#F472B6', '#A78BFA'],
      ticks: 240,
      scalar: 1.1,
      disableForReducedMotion: true,
    });
    // Right side cannon
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 60,
      origin: { x: 0.95, y: 0.7 },
      colors: ['#F59E0B', '#FBBF24', '#34D399', '#60A5FA', '#F472B6', '#A78BFA'],
      ticks: 240,
      scalar: 1.1,
      disableForReducedMotion: true,
    });
  } catch (err) {
    console.warn('Confetti error:', err);
  }
}

/**
 * Star explosion shower when reaching star thresholds (e.g. 25, 50, 75, 100 stars).
 */
export function fireStarMilestoneConfetti() {
  try {
    // Golden stars explosion
    confetti({
      particleCount: 70,
      spread: 90,
      origin: { y: 0.55 },
      colors: ['#F59E0B', '#FBBF24', '#FEF08A', '#D97706', '#FDE047'],
      shapes: ['star', 'circle'],
      scalar: 1.3,
      ticks: 250,
      disableForReducedMotion: true,
    });
  } catch (err) {
    console.warn('Confetti error:', err);
  }
}
