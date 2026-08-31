/**
 * Hover compuesto de tarjetas: la tarjeta eleva y escala muy sutilmente,
 * y su icono se mueve/escala un poco más — dos elementos coordinados en el
 * mismo gesto, por eso usa GSAP en vez de dos transiciones CSS sueltas.
 *
 * Marcado esperado: `data-hover-card` en la tarjeta, `data-hover-icon` en el
 * icono dentro de ella (opcional).
 *
 * Gateado a dispositivos con hover real: en táctil no se añaden listeners.
 */
import { gsap, DURATION, EASE, canHover } from './config';

/**
 * `overwrite: 'auto'` (no `true`) es intencional: solo mata tweens que
 * compitan por las MISMAS propiedades (y/scale) sobre este target, dejando
 * intacto cualquier otro tween que otro módulo tenga corriendo sobre el
 * mismo elemento — como la opacidad de `scrollReveal` si el cursor pasa
 * sobre la tarjeta mientras su entrada todavía está en curso. Con
 * `overwrite: true` ese cruce mata el tween de entrada a mitad de camino y
 * la tarjeta queda congelada casi invisible para siempre.
 */
export function initCardHover(root: ParentNode = document): gsap.Context {
  return gsap.context(() => {
    if (!canHover()) return;

    gsap.utils.toArray<HTMLElement>('[data-hover-card]', root as Element).forEach((card) => {
      const icon = card.querySelector<HTMLElement>('[data-hover-icon]');

      const enter = () => {
        gsap.set([card, icon].filter(Boolean), { willChange: 'transform' });
        gsap.to(card, {
          y: -6,
          scale: 1.015,
          duration: DURATION.fast,
          ease: EASE.hover,
          overwrite: 'auto',
        });
        if (icon) {
          gsap.to(icon, {
            y: -2,
            scale: 1.08,
            duration: DURATION.fast,
            ease: EASE.hover,
            overwrite: 'auto',
          });
        }
      };

      const leave = () => {
        const clearWillChange = () =>
          gsap.set([card, icon].filter(Boolean), { willChange: 'auto' });
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: DURATION.fast,
          ease: EASE.hover,
          overwrite: 'auto',
          onComplete: clearWillChange,
        });
        if (icon) {
          gsap.to(icon, {
            y: 0,
            scale: 1,
            duration: DURATION.fast,
            ease: EASE.hover,
            overwrite: 'auto',
          });
        }
      };

      card.addEventListener('mouseenter', enter);
      card.addEventListener('mouseleave', leave);
      card.addEventListener('focusin', enter);
      card.addEventListener('focusout', leave);
    });
  });
}
