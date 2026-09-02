/**
 * Contenido real del sitio de NOVA Digital Studio. A diferencia del
 * template de clientes (`nova-web`), este archivo NO es un placeholder:
 * datos de contacto y copy son los reales del estudio.
 *
 * Copy base rescatado y adaptado de versiones previas del sitio
 * (~/Downloads/NOVA_Digital_Studio_*.html) — se conservó lo que ya
 * funcionaba (headlines, estructura de "01/02/03" como narrativa real de
 * la página, la honestidad del portafolio como conceptos) y se reescribió
 * lo que sonaba genérico o geográficamente limitante.
 *
 * El logo definitivo de NOVA todavía no está aprobado — el wordmark en
 * Navbar/Footer es tipográfico e intencionalmente temporal. No se ha
 * inventado ningún cliente, resultado o cifra.
 */

export const siteConfig = {
  name: 'NOVA',
  fullName: 'NOVA Digital Studio',
  description:
    'NOVA es un estudio digital que diseña y desarrolla sitios web distintivos para negocios y marcas ambiciosos, sin importar dónde estén.',
  url: 'https://novadigital.studio',
  contact: {
    email: 'ventasnovadigitalstudio@gmail.com',
    whatsapp: '+58 412 631 9354',
    instagramHandle: '@soynova.web',
    instagramUrl: 'https://instagram.com/soynova.web',
  },
} as const;

const waNumber = siteConfig.contact.whatsapp.replace(/\D/g, '');

/** Link de WhatsApp con mensaje pre-rellenado según el contexto del CTA — reduce fricción real, no decorativo. */
function waLink(message: string) {
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
}

export const navLinks = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Trabajo', href: '#trabajo' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Studio', href: '#studio' },
] as const;

export const hero = {
  eyebrow: 'WEB DESIGN · DIGITAL STUDIO',
  headline: ['Haz que tu negocio', 'se vea grande.'],
  sub: 'No se trata solo de tener una página web. Se trata de que, cuando alguien encuentre tu negocio, piense: "esto es exactamente lo que estaba buscando."',
  ctas: [
    {
      label: 'Cuéntanos tu idea',
      href: waLink('Hola NOVA, quiero crear una web para mi negocio'),
      variant: 'primary' as const,
      external: true,
    },
    { label: 'Ver conceptos', href: '#trabajo', variant: 'ghost' as const, external: false },
  ],
} as const;

export const marqueeWords = [
  'Diseño web',
  'Desarrollo a medida',
  'Landing pages',
  'Motion & interacción',
  'Sitios para restaurantes',
  'Identidad digital',
] as const;

export const services = {
  eyebrow: 'Lo que hacemos',
  headline: ['Una web que', 'trabaja por ti.'],
  intro:
    'Diseñamos la presencia digital completa de negocios que quieren dejar de parecer pequeños en internet. Desde la primera impresión hasta el botón de contacto.',
  items: [
    {
      n: '01 / WEB',
      title: 'Web Design',
      desc: 'Diseño visual, estructura y experiencia pensados para que tu cliente entienda, confíe y actúe.',
    },
    {
      n: '02 / BRAND',
      title: 'Brand Experience',
      desc: 'Convertimos lo que hace especial a tu negocio en una identidad digital reconocible.',
    },
    {
      n: '03 / STRATEGY',
      title: 'Digital Strategy',
      desc: 'Ordenamos el mensaje, el contenido y los recorridos para que la web tenga un propósito.',
    },
    {
      n: '04 / GROWTH',
      title: 'Growth Ready',
      desc: 'Dejamos una base lista para campañas, reservas, ventas, contenido y nuevas etapas.',
    },
  ],
} as const;

/**
 * "Trabajo": NOVA está construyendo su portafolio activamente. Estos son
 * conceptos/exploraciones de dirección — nunca clientes reales, nunca
 * resultados inventados. Se presentan así, sin ambigüedad.
 */
export const work = {
  eyebrow: 'Conceptos',
  headline: ['Así puede', 'verse tu marca.'],
  intro:
    'Estos son conceptos visuales: ejemplos del tipo de dirección que podemos crear para restaurantes, marcas y negocios locales. No son clientes de NOVA.',
  /**
   * No hay fotografía real de estos conceptos (NOVA no fabrica clientes ni
   * proyectos falsos). Sin mockup de navegador ni ícono de categoría —
   * `n` alimenta el numeral con contorno que es el protagonista visual
   * del panel (ver `.numeral-outline` en global.css y `Work.astro`),
   * un recurso gráfico propio en vez de un placeholder de UI kit.
   */
  experiments: [
    {
      n: '01',
      category: 'Restaurante',
      description:
        'Sistema visual y estructura de sitio para un restaurante con reservaciones — foco en fotografía de producto y un menú fácil de escanear en móvil.',
      tone: 'gold' as const,
    },
    {
      n: '02',
      category: 'Servicios profesionales',
      description:
        'Sitio institucional para un negocio de servicios con múltiples sedes — jerarquía clara de información y un formulario de contacto que no se siente burocrático.',
      tone: 'raised' as const,
    },
  ],
} as const;

export const process = {
  eyebrow: 'Cómo trabajamos',
  headline: ['Del "tengo una idea"', 'al "ya está online".'],
  steps: [
    {
      n: '01 — DESCUBRIR',
      title: 'Entendemos',
      desc: 'Qué haces, para quién lo haces y qué necesitas conseguir.',
    },
    {
      n: '02 — DISEÑAR',
      title: 'Le damos forma',
      desc: 'Convertimos la estrategia en una dirección visual que tenga personalidad.',
    },
    {
      n: '03 — CONSTRUIR',
      title: 'Lo hacemos real',
      desc: 'Desarrollamos la experiencia para móvil, tablet y escritorio.',
    },
    {
      n: '04 — LANZAR',
      title: 'Lo ponemos a trabajar',
      desc: 'Revisamos, publicamos y dejamos todo listo para el siguiente paso.',
    },
  ],
} as const;

export const studio = {
  eyebrow: 'NOVA Studio',
  headline: 'Tu negocio ya tiene algo que contar.',
  headlineAccent: 'Nosotros hacemos que se note.',
  paragraphs: [
    'NOVA nace para crear experiencias digitales para negocios que tienen algo bueno entre manos, pero todavía no lo están mostrando como deberían.',
    'Nos obsesionan las primeras impresiones: el mensaje, la imagen, la navegación y ese pequeño detalle que hace que alguien quiera quedarse.',
  ],
  quote: 'Tu web puede ser el vendedor que nunca duerme. Hagamos que haga bien su trabajo.',
} as const;

export const contact = {
  eyebrow: 'Empecemos',
  headline: ['Tu próxima web', 'puede empezar hoy.'],
  sub: 'Escríbenos directamente por WhatsApp. Cuéntanos qué negocio tienes, qué quieres mejorar y qué tienes en mente.',
  buttonLabel: 'WhatsApp · +58 412 631 9354',
  buttonHref: waLink('Hola NOVA, quiero hablar sobre mi proyecto'),
  note: 'RESPUESTA DIRECTA, SIN INTERMEDIARIOS',
} as const;

/** CTA flotante persistente (esquina inferior, todas las páginas). */
export const floatingWhatsapp = {
  href: waLink('Hola NOVA, quiero información sobre una web'),
  label: 'Contactar NOVA por WhatsApp',
} as const;
