# NOVA Web — Template

Plantilla base de **NOVA Digital Studio** para sitios de restaurantes, negocios locales, marcas y servicios.

Este repositorio es un **template repo de GitHub**: contiene únicamente el código reutilizable — no proyectos de clientes, ni contenido comercial o de diseño interno. Cada sitio de cliente nuevo se crea desde aquí usando el botón **"Use this template"**.

> Los recursos internos de la agencia (procesos, contratos, diseño de marca, metadata de clientes) viven en un repositorio privado aparte: [`nova-web-hq`](https://github.com/nicomillan1401/nova-web-hq).

## Stack

- [Astro](https://astro.build) — framework principal, salida estática por defecto.
- [Tailwind CSS v4](https://tailwindcss.com) — vía plugin de Vite, sin archivo `tailwind.config` (configuración en `src/styles/global.css` con `@theme`).
- TypeScript en modo estricto.
- [GSAP](https://gsap.com) + ScrollTrigger — sistema de motion (hero, scroll/image reveal, línea de progreso, hover magnético, navbar), con `prefers-reduced-motion` respetado en todos los módulos.
- [Lucide](https://lucide.dev) (`@lucide/astro`) para iconos.
- ESLint (`eslint-plugin-astro`) + Prettier (`prettier-plugin-astro`, `prettier-plugin-tailwindcss`).

## Estructura

```
nova-web/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.astro       → navegación + menú móvil
│   │   ├── Footer.astro       → contacto, redes, navegación secundaria
│   │   ├── Button.astro       → botón reutilizable (variantes/tamaños)
│   │   └── sections/          → secciones de la página de inicio (Hero, Manifesto, Showcase, Process...)
│   ├── data/
│   │   └── site.ts            → datos de ejemplo (nombre, contacto, servicios)
│   ├── layouts/
│   │   └── BaseLayout.astro   → HTML base + metadatos SEO/Open Graph
│   ├── lib/motion/            → sistema de motion GSAP (config, reveals, hover, navbar)
│   ├── pages/
│   │   └── index.astro        → página de inicio de demostración
│   └── styles/
│       └── global.css         → entrada de Tailwind + tokens de marca
├── astro.config.mjs
├── eslint.config.mjs
├── tsconfig.json
├── .prettierrc.json
├── .env.example
└── PRODUCT.md                 → propósito y alcance de este template (contexto de producto)
```

## Instalación y desarrollo local

```bash
npm install
npm run dev        # http://localhost:4321
```

Otros comandos disponibles:

```bash
npm run check       # type-check de Astro
npm run lint         # ESLint
npm run format       # Prettier (escribe cambios)
npm run build         # check + build de producción a dist/
npm run preview      # sirve el build de producción localmente
```

## Cómo crear un proyecto de cliente nuevo a partir de este template

1. En GitHub, usar **"Use this template" → "Create a new repository"** sobre este repo, nombrando el nuevo repositorio `cliente-<nombre-negocio>`.
2. Clonar ese nuevo repositorio localmente.
3. Reemplazar **todo** el contenido de `src/data/site.ts` con la información real del cliente (nunca dejar los datos de ejemplo).
4. Ajustar la paleta de marca en `src/styles/global.css` (bloque `@theme`, variables `--color-brand-*`).
5. Sustituir `public/favicon.svg` por el favicon real del cliente.
6. Añadir o quitar secciones en `src/pages/index.astro` según el alcance acordado con el cliente.
7. Si el proyecto necesita backend, copiar `.env.example` como `.env.local` y completar las variables reales (Supabase, email, etc.) — nunca commitear ese archivo.

## Despliegue

- Cada proyecto de cliente se conecta a su propio proyecto de [Vercel](https://vercel.com): cada Pull Request genera una preview, cada merge a `main` despliega a producción.
- Variables de entorno y secretos se configuran en el dashboard de Vercel — nunca se commitean al repositorio.

## Pendiente (fuera del alcance de este template)

- Conexión a GitHub, Vercel, Supabase o Figma: se hace por proyecto de cliente, no en el template.
- Contenido, imágenes y textos reales: siempre específicos de cada cliente.

## Convenciones

- Ningún secreto o credencial se guarda en este repositorio — siempre en variables de entorno (`.env.local`, ignorado por Git) o en los dashboards de Vercel/Supabase.
- Herramientas de agentes IA instaladas localmente (`.claude/`, `.agents/`, `.codex/`, `skills-lock.json`) quedan fuera del repositorio (ver `.gitignore`): son configuración del entorno de desarrollo, no código del sitio.
- Este template se mantiene actualizado con las mejores prácticas aprendidas en cada proyecto entregado.
