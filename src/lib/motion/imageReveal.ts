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

/**
 * Cortina diagonal: variante de `initImageReveal` para el panel full-bleed
 * de Trabajo (uno de los "momentos memorables" del sitio) — un corte
 * asimétrico en vez del inset horizontal estándar, acompañado de un
 * zoom-out muy sutil (1.08 → 1) para dar sensación de profundidad al
 * asentarse. Sigue usando solo `clip-path`/`transform`/`opacity`.
 *
 * Marcado esperado: `[data-image-curtain]` en el contenedor, con la imagen
 * o panel de contenido como único hijo directo (recibe el zoom-out; el
 * `clip-path` va en el contenedor para que el corte no se deforme).
 */
export function initImageCurtain(root: ParentNode = document): gsap.Context {
  return gsap.context(() => {
    const wrappers = gsap.utils.toArray<HTMLElement>('[data-image-curtain]', root as Element);
    if (wrappers.length === 0) return;

    try {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        wrappers.forEach((wrapper) => {
          const content = wrapper.firstElementChild as HTMLElement | null;
          const tl = gsap.timeline({
            scrollTrigger: { trigger: wrapper, start: 'top 80%', once: true },
          });

          {
            /*
              Colapsado a la esquina inferior izquierda (no un inset
              horizontal simple): el rectángulo crece en diagonal hacia la
              esquina opuesta, dando un barrido angular en vez de la
              cortina vertical estándar de initImageReveal.
            */
          }
          tl.fromTo(
            wrapper,
            { clipPath: 'polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%)' },
            {
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
              duration: DURATION.entrance + 0.4,
              ease: EASE.inOut,
            },
          );

          if (content) {
            tl.fromTo(
              content,
              { scale: 1.08 },
              { scale: 1, duration: DURATION.entrance + 0.4, ease: EASE.inOut },
              0,
            );
          }
        });
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(wrappers, { clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)' });
      });
    } catch (error) {
      console.error('[nova-web] Cortina de imagen falló, mostrando panel sin animar.', error);
      gsap.set(wrappers, { clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)' });
    }
  });
}
