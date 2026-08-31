/**
 * Revelado de secciones/tarjetas al hacer scroll, dirigido por atributos:
 *
 * - `data-reveal`       → el elemento se revela por sí solo.
 * - `data-reveal-group` → contenedor cuyos hijos `data-reveal-item` se
 *                         revelan juntos con stagger (p. ej. una grid de tarjetas).
 *
 * Cada revelado dispara una sola vez (`once: true`): es una entrada, no un
 * efecto que deba repetirse al volver a hacer scroll hacia arriba.
 */
import { gsap, DURATION, EASE, STAGGER } from './config';

export function initScrollReveal(root: ParentNode = document): gsap.Context {
  return gsap.context(() => {
    const all = [
      ...gsap.utils.toArray<HTMLElement>('[data-reveal]', root as Element),
      ...gsap.utils.toArray<HTMLElement>('[data-reveal-item]', root as Element),
    ];

    try {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('[data-reveal]', root as Element).forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: DURATION.entrance,
              ease: EASE.out,
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                once: true,
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>('[data-reveal-group]', root as Element).forEach((group) => {
          const items = group.querySelectorAll<HTMLElement>('[data-reveal-item]');
          if (items.length === 0) return;

          gsap.fromTo(
            items,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: DURATION.entrance,
              ease: EASE.out,
              stagger: STAGGER.base,
              scrollTrigger: {
                trigger: group,
                start: 'top 85%',
                once: true,
              },
            },
          );
        });
      });

      // Movimiento reducido: el contenido queda visible sin depender del scroll.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(all, { opacity: 1, y: 0 });
      });
    } catch (error) {
      // Red de seguridad: un fallo a mitad de setup nunca debe dejar secciones
      // completas invisibles a la espera de un scroll que las revele.
      console.error('[nova-web] Scroll reveal falló, mostrando contenido sin animar.', error);
      gsap.set(all, { opacity: 1, y: 0, clearProps: 'transform' });
    }
  });
}
