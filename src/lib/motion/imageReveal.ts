/**
 * Reveal de imágenes/paneles visuales al entrar en el viewport, mediante
 * `clip-path` (no `width`/`height`): una cortina que se abre de abajo hacia
 * arriba. `clip-path` es una de las cuatro propiedades permitidas para
 * animar sin disparar layout/paint (junto a transform/opacity).
 *
 * Marcado esperado: `[data-image-reveal]` en el panel a revelar.
 */
import { gsap, DURATION, EASE } from './config';

export function initImageReveal(root: ParentNode = document): gsap.Context {
  return gsap.context(() => {
    const panels = gsap.utils.toArray<HTMLElement>('[data-image-reveal]', root as Element);
    if (panels.length === 0) return;

    try {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        panels.forEach((panel) => {
          gsap.fromTo(
            panel,
            { clipPath: 'inset(0 0 100% 0)' },
            {
              clipPath: 'inset(0 0 0% 0)',
              duration: DURATION.entrance + 0.3,
              ease: EASE.inOut,
              scrollTrigger: {
                trigger: panel,
                start: 'top 85%',
                once: true,
              },
            },
          );
        });
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(panels, { clipPath: 'inset(0 0 0% 0)' });
      });
    } catch (error) {
      console.error('[nova-web] Image reveal falló, mostrando paneles sin animar.', error);
      gsap.set(panels, { clipPath: 'inset(0 0 0% 0)' });
    }
  });
}
