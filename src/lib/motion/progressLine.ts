/**
 * Línea de progreso ligada al scroll (sección "Proceso"): se dibuja de
 * izquierda a derecha a medida que el usuario avanza por la sección.
 * `scrub` liga la animación directamente a la posición de scroll —no a un
 * tiempo fijo—, así que no hace falta gating de reduced-motion: no hay
 * movimiento autónomo, es una respuesta 1:1 al gesto del propio usuario.
 *
 * Marcado esperado: `[data-progress-track]` (contenedor) con un
 * `[data-progress-fill]` dentro (origin-left, escala inicial 0).
 */
import { gsap } from './config';

export function initProgressLine(root: ParentNode = document): gsap.Context {
  return gsap.context(() => {
    const tracks = gsap.utils.toArray<HTMLElement>('[data-progress-track]', root as Element);

    try {
      tracks.forEach((track) => {
        const fill = track.querySelector<HTMLElement>('[data-progress-fill]');
        if (!fill) return;

        gsap.fromTo(
          fill,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: track,
              start: 'top 70%',
              end: 'bottom 60%',
              scrub: 0.3,
            },
          },
        );
      });
    } catch (error) {
      console.error('[nova-web] Línea de progreso falló, mostrándola completa.', error);
      tracks.forEach((track) => {
        const fill = track.querySelector<HTMLElement>('[data-progress-fill]');
        if (fill) gsap.set(fill, { scaleX: 1 });
      });
    }
  });
}

/**
 * Énfasis de escala en el numeral del paso "activo" de Proceso: cada
 * `[data-step-numeral]` crece y se aclara cuando su paso cruza el centro
 * del viewport, y vuelve a su estado base al salir — un índice editorial
 * vivo, no solo cuatro columnas idénticas. `toggleActions` (no `scrub`)
 * porque es un cambio de estado binario por paso, no una animación
 * continua; tampoco necesita gating de reduced-motion: es un cambio de
 * escala pequeño y disparado por scroll, no un movimiento autónomo.
 */
export function initStepEmphasis(root: ParentNode = document): gsap.Context {
  return gsap.context(() => {
    const numerals = gsap.utils.toArray<HTMLElement>('[data-step-numeral]', root as Element);
    if (numerals.length === 0) return;

    try {
      numerals.forEach((numeral) => {
        gsap.to(numeral, {
          scale: 1.15,
          color: 'var(--color-gold-400)',
          duration: 0.25,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: numeral,
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play reverse play reverse',
          },
        });
      });
    } catch (error) {
      console.error('[nova-web] Énfasis de numeral falló, dejándolos en estado base.', error);
    }
  });
}
