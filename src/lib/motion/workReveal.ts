/**
 * Motion de la sección Trabajo — construido específicamente para esta
 * sección, no reutiliza `scrollReveal.ts` (fade+translateY): esa técnica
 * ya está en casi todo el resto del sitio, y Trabajo es exactamente la
 * sección que se pidió sacar de ese patrón — el "wow moment" necesita su
 * propio lenguaje de movimiento.
 *
 * Marcado esperado:
 * - `[data-work-panel]`   → contenedor de imagen (aspect-ratio fijo,
 *                           overflow hidden, position relative): recibe
 *                           el wipe diagonal de entrada.
 * - `[data-work-scale]`   → hijo de `[data-work-panel]` (absolute inset-0):
 *                           recibe el zoom-out continuo ligado al scroll,
 *                           dando sensación de profundidad/"entrar" al
 *                           proyecto a medida que se centra en pantalla.
 * - `[data-work-numeral]` → numeral grande (dentro o fuera del panel):
 *                           deriva verticalmente con el scroll (parallax).
 * - `[data-work-tag]`     → etiqueta pequeña ("Concepto — 01"): deriva
 *                           horizontalmente con el scroll.
 * - `[data-work-title]`   → título editorial gigante: wipe de entrada
 *                           (clip-path horizontal), una sola vez.
 */
import { gsap, DURATION, EASE } from './config';

export function initWorkReveal(root: ParentNode = document): gsap.Context {
  return gsap.context(() => {
    const panels = gsap.utils.toArray<HTMLElement>('[data-work-panel]', root as Element);
    const titles = gsap.utils.toArray<HTMLElement>('[data-work-title]', root as Element);
    if (panels.length === 0 && titles.length === 0) return;

    // --- Entradas de una sola vez: gateadas a reduced-motion.
    try {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        panels.forEach((panel) => {
          gsap.fromTo(
            panel,
            { clipPath: 'polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%)' },
            {
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
              duration: DURATION.entrance + 0.35,
              ease: EASE.inOut,
              scrollTrigger: { trigger: panel, start: 'top 82%', once: true },
            },
          );
        });

        titles.forEach((title) => {
          gsap.fromTo(
            title,
            { clipPath: 'inset(0 100% 0 0)' },
            {
              clipPath: 'inset(0 0% 0 0)',
              duration: DURATION.entrance + 0.2,
              ease: EASE.inOut,
              scrollTrigger: { trigger: title, start: 'top 88%', once: true },
            },
          );
        });
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(panels, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' });
        gsap.set(titles, { clipPath: 'inset(0 0% 0 0)' });
      });
    } catch (error) {
      console.error('[nova-web] Reveal de Trabajo falló, mostrando panel sin animar.', error);
      gsap.set(panels, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' });
      gsap.set(titles, { clipPath: 'inset(0 0% 0 0)' });
    }

    // --- Scrub continuo: respuesta directa a la posición de scroll, no
    // movimiento autónomo (mismo razonamiento que progressLine.ts), por
    // eso no requiere gating de reduced-motion — se mantiene siempre activo.
    try {
      panels.forEach((panel) => {
        const scaleTarget = panel.querySelector<HTMLElement>('[data-work-scale]');
        if (!scaleTarget) return;
        gsap.fromTo(
          scaleTarget,
          { scale: 1.12 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-work-numeral]', root as Element).forEach((numeral) => {
        gsap.fromTo(
          numeral,
          { y: -22 },
          {
            y: 22,
            ease: 'none',
            scrollTrigger: {
              trigger: numeral,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-work-tag]', root as Element).forEach((tag) => {
        gsap.fromTo(
          tag,
          { x: 0 },
          {
            x: -18,
            ease: 'none',
            scrollTrigger: { trigger: tag, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
          },
        );
      });
    } catch (error) {
      console.error('[nova-web] Parallax de Trabajo falló, mostrando elementos estáticos.', error);
    }
  });
}
