# NOVA Digital Studio — Sitio oficial

El sitio web público de **NOVA Digital Studio**: diseño y desarrollo web para negocios y marcas ambiciosos, sin importar dónde estén.

## Stack

- [Astro](https://astro.build) — framework principal, salida estática.
- [Tailwind CSS v4](https://tailwindcss.com) — vía plugin de Vite, tokens de marca en `src/styles/global.css` (`@theme`).
- TypeScript en modo estricto.
- [GSAP](https://gsap.com) + ScrollTrigger — sistema de motion (hero, scroll/image reveal, línea de progreso, hover magnético, navbar), con `prefers-reduced-motion` respetado en todos los módulos.
- [Lucide](https://lucide.dev) para iconos.
- Tipografía: [Unbounded](https://fonts.google.com/specimen/Unbounded) (display) + [Manrope](https://fonts.google.com/specimen/Manrope) (texto) + [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) (acentos/etiquetas).

## Identidad visual

Sistema de diseño propio del estudio — **deliberadamente distinto** del template que se clona para clientes ([`nova-web`](https://github.com/nicomillan1401/nova-web)): NOVA no puede verse como "otro cliente de su propio template".

- **Fondo:** navy casi negro (`--color-ground`) por defecto; un único respiro claro en la sección "Studio".
- **Acento:** dorado/ámbar (`--color-gold-*`) — cálido, premium, deliberadamente distinto del terracota del template de clientes y de cualquier púrpura/verde genérico de "IA".
- **Logo:** el logo definitivo de NOVA **todavía no está aprobado**. El wordmark en navbar/footer es tipográfico e intencionalmente temporal — fácil de reemplazar sin tocar el layout cuando el logo final esté listo.
- **Portafolio:** la sección "Trabajo" muestra conceptos/exploraciones internas, explícitamente etiquetados como tal — no hay clientes, resultados ni cifras inventadas.

## Instalación y desarrollo local

```bash
npm install
npm run dev        # http://localhost:4321
```

Otros comandos:

```bash
npm run check     # type-check de Astro
npm run lint       # ESLint
npm run format     # Prettier (escribe cambios)
npm run build       # check + build de producción a dist/
npm run preview    # sirve el build de producción localmente
```

## Contenido real

A diferencia del template de clientes, `src/data/site.ts` contiene información **real** del estudio (contacto, servicios, copy) — no placeholders. Cualquier cambio a datos de contacto, precios o servicios se hace ahí.

## Despliegue

Conectado a Vercel (`nova-digital-studio`): cada Pull Request genera una preview, cada merge a `main` despliega a producción.

## Convenciones

- Ningún secreto o credencial se guarda en este repositorio — variables de entorno en `.env.local` (ignorado por Git) o en el dashboard de Vercel.
- Herramientas de agentes IA instaladas localmente (`.claude/`, `.agents/`, `.codex/`, `skills-lock.json`) quedan fuera del repositorio.
