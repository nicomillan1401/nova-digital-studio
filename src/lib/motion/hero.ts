/**
 * Entrada cinematográfica del hero: eyebrow → líneas del titular (reveal
 * enmascarado) → descripción → CTAs, en una sola timeline secuenciada.
 * Se ejecuta una sola vez al cargar la página (no está atada a scroll).
 *
 * Marcado esperado dentro de `root`:
 * - `[data-hero-item]` → eyebrow, descripción, fila de CTAs (fade+translateY).
 * - `[data-hero-line]` → span interior de cada línea del titular, ya
 *   envuelto en `.reveal-line-mask` (overflow hidden) en el markup.
 */
import { gsap, DURATION, EASE, STAGGER } from './config';
import { revealLines } from './textReveal';

export function initHero(root: ParentNode = document): gsap.Context {
  return gsap.context(() => {
    const items = gsap.utils.toArray<HTMLElement>('[data-hero-item]', root as Element);
    const lines = gsap.utils.toArray<HTMLElement>('[data-hero-line]', root as Element);
    if (items.length === 0 && lines.length === 0) return;

    try {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ delay: 0.1 });

        // El eyebrow entra primero, antes que el titular, para dar una
        // pequeña anticipación antes del momento principal.
        const eyebrow = items[0];
        if (eyebrow) {
          tl.set(eyebrow, { opacity: 0, y: 12 }).to(eyebrow, {
            opacity: 1,
            y: 0,
            duration: DURATION.base,
            ease: EASE.out,
          });
        }

        revealLines(lines, { timeline: tl, position: eyebrow ? '-=0.1' : 0 });

        const rest = items.slice(1);
        if (rest.length) {
          tl.set(rest, { opacity: 0, y: 16 }).to(
            rest,
            {
              opacity: 1,
              y: 0,
              duration: DURATION.entrance,
              ease: EASE.out,
              stagger: STAGGER.base,
            },
            '-=0.35',
          );
        }
      });

      // Movimiento reducido: un fade corto, sin desplazamiento ni máscaras.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set([...items, ...lines], { opacity: 0, y: 0, yPercent: 0 });
        gsap.to([...items, ...lines], {
          opacity: 1,
          duration: DURATION.fast,
          ease: EASE.out,
        });
      });
    } catch (error) {
      // Red de seguridad: si algo falla a mitad del setup (después de ocultar
      // los elementos pero antes de animarlos), nunca deben quedar invisibles.
      console.error('[nova-web] Hero motion falló, mostrando contenido sin animar.', error);
      gsap.set(items, { opacity: 1, y: 0, clearProps: 'transform' });
      gsap.set(lines, { yPercent: 0, clearProps: 'transform' });
    }
  });
}
