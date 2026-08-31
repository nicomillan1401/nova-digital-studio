/**
 * Reveal de texto — dos técnicas distintas para dos casos distintos:
 *
 * 1. `revealLines()` — para titulares con saltos de línea art-dirigidos
 *    (el hero): cada línea ya es un nodo propio en el markup, envuelto en
 *    `.reveal-line-mask` (overflow hidden). Solo animamos translateY del
 *    contenido interior — no hay que dividir texto en tiempo de ejecución,
 *    así que es robusto ante cualquier tamaño de viewport.
 *
 * 2. `scrubWords()` — para párrafos largos (el manifiesto) cuyo salto de
 *    línea SÍ depende del viewport: se divide el texto en palabras y su
 *    opacidad se liga al progreso de scroll ("se iluminan" al pasar por la
 *    sección), sin depender de dónde caiga cada salto de línea.
 */
import { gsap, DURATION, EASE, STAGGER } from './config';

/** Anima las líneas ya enmascaradas de un titular (ver `[data-hero-line]`). */
export function revealLines(
  lines: HTMLElement[],
  opts: { position?: number | string; timeline?: gsap.core.Timeline } = {},
): gsap.core.Timeline {
  const tl = opts.timeline ?? gsap.timeline();
  if (lines.length === 0) return tl;

  tl.set(lines, { yPercent: 110 }).to(
    lines,
    {
      yPercent: 0,
      duration: DURATION.entrance,
      ease: EASE.out,
      stagger: STAGGER.base,
    },
    opts.position ?? 0,
  );

  return tl;
}

/** Divide el texto de `el` en palabras envueltas en spans, in-place. */
function splitWords(el: HTMLElement): HTMLElement[] {
  const text = el.textContent ?? '';
  const words = text.split(/\s+/).filter(Boolean);

  el.textContent = '';
  const spans = words.map((word, i) => {
    const span = document.createElement('span');
    span.textContent = word;
    span.style.display = 'inline-block';
    el.appendChild(span);
    if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
    return span;
  });

  return spans;
}

/**
 * "Ilumina" un párrafo palabra por palabra a medida que se scrollea a
 * través de él (scrub, no una entrada de una sola vez): imita la técnica
 * editorial de atenuar el texto y encenderlo con el progreso del usuario.
 */
export function scrubWords(el: HTMLElement | null): gsap.Context {
  return gsap.context(() => {
    if (!el) return;

    const words = splitWords(el);
    if (words.length === 0) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.set(words, { opacity: 0.2 });
      gsap.to(words, {
        opacity: 1,
        stagger: 0.02,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
          end: 'bottom 55%',
          scrub: 0.4,
        },
      });
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(words, { opacity: 1 });
    });
  });
}
