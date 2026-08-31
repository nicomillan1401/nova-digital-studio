/**
 * Hover magnético sutil: el elemento se desplaza levemente hacia el cursor
 * dentro de sus propios límites. Es delight puro (sin función más allá de
 * la sensación), así que se reserva para 1-2 CTAs primarios —nunca para
 * elementos que el usuario vea decenas de veces por sesión— y se apaga
 * por completo con reduced-motion, no solo se atenúa.
 *
 * Marcado esperado: `[data-magnetic]`.
 */
import { gsap, canHover, prefersReducedMotion } from './config';

const PULL_FACTOR = 0.25;
const MAX_OFFSET = 10;

export function initMagnetic(root: ParentNode = document): gsap.Context {
  return gsap.context(() => {
    if (!canHover() || prefersReducedMotion()) return;

    gsap.utils.toArray<HTMLElement>('[data-magnetic]', root as Element).forEach((el) => {
      const moveX = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
      const moveY = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });

      const onMove = (event: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const relX = event.clientX - (rect.left + rect.width / 2);
        const relY = event.clientY - (rect.top + rect.height / 2);
        moveX(gsap.utils.clamp(-MAX_OFFSET, MAX_OFFSET, relX * PULL_FACTOR));
        moveY(gsap.utils.clamp(-MAX_OFFSET, MAX_OFFSET, relY * PULL_FACTOR));
      };

      const onLeave = () => {
        moveX(0);
        moveY(0);
      };

      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
    });
  });
}
