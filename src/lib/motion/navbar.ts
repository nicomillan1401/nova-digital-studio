/**
 * Motion del navbar:
 * 1. Cambio de fondo/sombra al hacer scroll (ScrollTrigger).
 * 2. Resaltado del enlace de la sección activa (ScrollTrigger por sección).
 * 3. Apertura/cierre del menú móvil como timeline reversible (interrumpible),
 *    con stagger en los enlaces.
 *
 * Marcado esperado dentro de `root`:
 * - `[data-navbar]`      → el <header> sticky.
 * - `.nav-link`          → enlaces del nav de escritorio (href="#seccion").
 * - `[data-menu-toggle]` → botón hamburguesa.
 * - `[data-mobile-menu]` → panel del menú móvil.
 * - `[data-mobile-link]` → cada enlace/acción dentro del panel.
 * - Cada `<section id="...">` referenciada por un `.nav-link` participa en
 *   el resaltado automáticamente; no requiere marcado adicional.
 */
import { gsap, ScrollTrigger, DURATION, EASE, STAGGER } from './config';

/*
  Colores del fondo navy de NOVA (aprox. sRGB de --color-ground): GSAP
  tween necesita un formato que pueda interpolar de forma fiable, por eso
  van en rgba() y no oklch().
*/
const SCROLLED_STYLE = {
  backgroundColor: 'rgba(11, 14, 22, 0.92)',
  boxShadow: '0 1px 0 0 rgba(0, 0, 0, 0.3), 0 12px 24px -16px rgba(0, 0, 0, 0.5)',
};

const TOP_STYLE = {
  backgroundColor: 'rgba(11, 14, 22, 0.55)',
  boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
};

export function initNavbarMotion(root: ParentNode = document): gsap.Context {
  return gsap.context(() => {
    const nav = (root as Document | Element).querySelector<HTMLElement>('[data-navbar]');
    const toggle = (root as Document | Element).querySelector<HTMLButtonElement>(
      '[data-menu-toggle]',
    );
    const menu = (root as Document | Element).querySelector<HTMLElement>('[data-mobile-menu]');

    if (nav) {
      // `onToggle` reacciona a un único booleano (`isActive`), a diferencia de
      // coordinar `onEnter`/`onLeaveBack` por separado: si la página ya carga
      // scrolleada, o el usuario scrollea muy rápido, no hay forma de que un
      // lado del par se dispare sin el otro y deje el navbar en estado inconsistente.
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top -10',
        onToggle: (self) =>
          gsap.to(nav, {
            ...(self.isActive ? SCROLLED_STYLE : TOP_STYLE),
            duration: DURATION.base,
            ease: EASE.out,
            overwrite: true,
          }),
      });
    }

    // Resaltado de sección activa: cada .nav-link con href="#id" observa su
    // sección correspondiente y activa/desactiva `data-active` (leído por
    // el subrayado en CSS, ver .nav-link[data-active] en global.css).
    const navLinks = gsap.utils.toArray<HTMLAnchorElement>('.nav-link', root as Element);
    navLinks.forEach((link) => {
      const id = link.getAttribute('href');
      if (!id?.startsWith('#')) return;
      const section = document.querySelector(id);
      if (!section) return;

      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => {
          if (self.isActive) link.dataset.active = 'true';
          else delete link.dataset.active;
        },
      });
    });

    if (toggle && menu) {
      try {
        const links = gsap.utils.toArray<HTMLElement>('[data-mobile-link]', menu);

        gsap.set(menu, { autoAlpha: 0, y: -8 });
        if (links.length) gsap.set(links, { autoAlpha: 0, y: -6 });

        const tl = gsap.timeline({ paused: true }).to(menu, {
          autoAlpha: 1,
          y: 0,
          duration: DURATION.base,
          ease: EASE.out,
        });

        if (links.length) {
          tl.to(
            links,
            { autoAlpha: 1, y: 0, duration: DURATION.fast, ease: EASE.out, stagger: STAGGER.tight },
            '-=0.12',
          );
        }

        let isOpen = false;

        const setOpen = (open: boolean) => {
          isOpen = open;
          toggle.setAttribute('aria-expanded', String(open));
          toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
          // Cierre ligeramente más rápido que la apertura: la decisión del
          // usuario (abrir) puede tomarse con calma; la respuesta del sistema
          // al cerrar debe sentirse inmediata.
          tl.timeScale(open ? 1 : 1.3);
          if (open) tl.play();
          else tl.reverse();
        };

        toggle.addEventListener('click', () => setOpen(!isOpen));
        links.forEach((link) => link.addEventListener('click', () => setOpen(false)));

        // Si la ventana pasa a desktop con el menú abierto, ciérralo.
        const desktopQuery = window.matchMedia('(min-width: 768px)');
        desktopQuery.addEventListener('change', (event) => {
          if (event.matches && isOpen) setOpen(false);
        });
      } catch (error) {
        // Red de seguridad: el botón hamburguesa solo funciona vía JS (no hay
        // fallback nativo tipo <details>), así que si el setup del timeline
        // falla a mitad de camino, el menú NO puede quedar oculto sin forma
        // de abrirlo. Se revela de forma estática como último recurso.
        console.error('[nova-web] Motion del menú móvil falló, mostrando menú sin animar.', error);
        gsap.set(menu, { autoAlpha: 1, y: 0, clearProps: 'transform' });
      }
    }
  });
}
