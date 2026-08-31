/**
 * Configuración central del sistema de motion de NOVA Web.
 *
 * Única fuente de verdad para:
 * - Registro de GSAP + ScrollTrigger (una sola vez por sesión de página).
 * - Tokens de duración/easing compartidos por todos los módulos de `src/lib/motion/`.
 * - Helpers de accesibilidad (reduced motion, capacidad de hover real).
 *
 * No importar `gsap` directamente en componentes: importar desde aquí para
 * que el registro del plugin y los tokens se mantengan consistentes.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Curvas de easing.
 *
 * Se usan los eases nativos "power" de GSAP en vez de un `CustomEase` con
 * cubic-bezier a medida: los `power` de GSAP ya son curvas fuertes (no las
 * débiles de CSS por defecto), así que dan la sensación "premium" sin sumar
 * un plugin extra al bundle.
 */
export const EASE = {
  /** Entradas / revelado: rápido al inicio, se asienta con fuerza. */
  out: 'power3.out',
  /** Movimiento en pantalla (navbar, menú): aceleración y frenado naturales. */
  inOut: 'power2.inOut',
  /** Microinteracciones de hover: más suave, casi imperceptible. */
  hover: 'power2.out',
} as const;

/** Duraciones en segundos (unidad nativa de GSAP). */
export const DURATION = {
  /** Feedback de botón/tarjeta al presionar u hover. */
  fast: 0.18,
  /** Cambios de estado del navbar, apertura de menú. */
  base: 0.28,
  /** Entrada del hero y revelado de secciones (contenido de marketing). */
  entrance: 0.7,
} as const;

/** Stagger corto entre elementos que entran en grupo (Kowalski: 30–80ms). */
export const STAGGER = {
  tight: 0.06,
  base: 0.08,
} as const;

/** El usuario prefiere movimiento reducido (mareos, vestibular, etc). */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Dispositivo con hover real y puntero preciso (evita falsos hovers táctiles). */
export function canHover(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

export { gsap, ScrollTrigger };
