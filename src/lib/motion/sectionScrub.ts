/**
 * Transición de fondo ligada al scroll (no autónoma): interpola
 * `background-color` de navy a papel a medida que la sección de Studio
 * entra en el viewport — el corte de color entre secciones deja de ser un
 * salto duro y se convierte en un desplazamiento cinematográfico. Como
 * `scrub` liga la animación 1:1 a la posición de scroll (mismo patrón que
 * `progressLine.ts`), no hace falta gating de `prefers-reduced-motion`: no
 * hay movimiento autónomo, es una respuesta directa al gesto del usuario.
 *
 * Los colores están en rgb(), no en las variables oklch del sistema: GSAP
 * interpola color por canal numérico y necesita un formato que pueda leer
 * directamente. Son el equivalente sRGB exacto de --color-ground y
 * --color-paper (convertido una vez con un script ad-hoc) — si esos
 * tokens cambian en global.css, estos valores deben recalcularse a mano.
 *
 * Marcado esperado: `[data-scrub-bg]` en la sección a transicionar. La
 * clase Tailwind `bg-paper` se mantiene en el markup como estado final de
 * respaldo (por si JS falla, ver catch) — el estilo inline de GSAP la
 * sobrescribe mientras la animación corre.
 */
import { gsap } from './config';

const FROM = 'rgb(6, 14, 24)'; // --color-ground
const TO = 'rgb(246, 241, 233)'; // --color-paper

export function initSectionScrub(root: ParentNode = document): gsap.Context {
  return gsap.context(() => {
    const sections = gsap.utils.toArray<HTMLElement>('[data-scrub-bg]', root as Element);
    if (sections.length === 0) return;

    try {
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { backgroundColor: FROM },
          {
            backgroundColor: TO,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 90%',
              end: 'top 20%',
              scrub: 0.4,
            },
          },
        );
      });
    } catch (error) {
      console.error('[nova-web] Transición de fondo falló, mostrando color final.', error);
      gsap.set(sections, { backgroundColor: TO });
    }
  });
}
