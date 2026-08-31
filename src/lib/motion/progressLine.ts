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
