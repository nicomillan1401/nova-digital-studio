/**
 * Contenido de la demo de la plantilla: representa a NOVA Digital Studio
 * (Caracas, Venezuela) mostrando su propia capacidad de diseño/desarrollo.
 * Los casos de "Trabajo seleccionado" son ilustrativos, no clientes reales
 * (ver aviso en la sección correspondiente).
 *
 * Al clonar `_template` para un cliente nuevo, sustituye todo este archivo
 * por la información real de ese negocio.
 */

export const siteConfig = {
  name: 'NOVA Digital Studio',
  /** Descriptor corto mostrado junto al logotipo (navbar) y en el footer. */
  subtitle: 'Web Design',
  tagline: 'Estudio de diseño y desarrollo web',
  description:
    'Creamos presencia digital para emprendimientos y negocios en Venezuela y Latinoamérica: diseño de marca, desarrollo web y estrategia digital con estándares internacionales.',
  url: 'https://example.com',
  contact: {
    email: 'hola@novadigital.studio',
    /** Único número de contacto del sitio: se usa en el footer y en el CTA final (ver `whatsappLink`). */
    whatsapp: '+58 412 6319354',
    address: 'Caracas, Venezuela',
  },
  social: {
    instagram: 'https://instagram.com/ejemplo',
    facebook: 'https://facebook.com/ejemplo',
  },
} as const;

/** Link directo a WhatsApp a partir del número configurado (solo dígitos). */
export const whatsappLink = `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, '')}`;

export const navLinks = [
  { label: 'Estudio', href: '#estudio' },
  { label: 'Trabajo', href: '#trabajo' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Contacto', href: '#contacto' },
] as const;

export const hero = {
  eyebrow: 'Estudio digital — Caracas, Venezuela',
  /**
   * Cada elemento es una línea con salto de línea intencional (decisión de
   * diseño editorial: no dejar que el texto reflowee de forma orgánica en
   * el titular principal). El resto del texto sí usa reveal por línea
   * detectada en tiempo real — ver `src/lib/motion/textReveal.ts`.
   */
  headline: ['Convertimos negocios', 'en marcas digitales', 'imposibles de ignorar.'],
  sub: 'Creamos presencia digital para emprendimientos y negocios en Venezuela y Latinoamérica que quieren verse como lo que son: la mejor opción en su categoría.',
  ctas: [
    { label: 'Ver trabajo', href: '#trabajo', variant: 'primary' as const },
    { label: 'Iniciar un proyecto', href: '#contacto', variant: 'ghost' as const },
  ],
} as const;

export const marqueeWords = [
  'Diseño de marca',
  'Desarrollo web',
  'Motion design',
  'Estrategia digital',
  'Identidad visual',
  'SEO técnico',
] as const;

export const manifesto = {
  eyebrow: 'El estudio',
  paragraph:
    'Creemos que un sitio web no es un trámite, es la primera impresión de tu negocio. Por eso no partimos de un componente reciclado: partimos de tu marca, tu audiencia y el problema real que tu sitio tiene que resolver. Trabajamos con emprendimientos y negocios de Venezuela y Latinoamérica para construir una presencia digital rápida, cuidada al detalle y hecha para durar.',
  stats: [
    { value: '40+', label: 'proyectos entregados' },
    { value: '98', label: 'puntaje promedio de performance' },
    { value: '6 años', label: 'de oficio' },
  ],
} as const;

export const work = [
  {
    year: '2025',
    category: 'Identidad + Web',
    title: 'Casa Marea',
    description:
      'Restaurante de cocina de autor en la costa. Sistema visual completo y sitio con reservaciones.',
    tone: 'ink',
  },
  {
    year: '2024',
    category: 'E-commerce',
    title: 'Terra Studio',
    description:
      'Marca de cerámica artesanal. Tienda en línea con un enfoque editorial, no de catálogo genérico.',
    tone: 'accent',
  },
  {
    year: '2024',
    category: 'Plataforma web',
    title: 'Nimbus Clínica',
    description:
      'Sistema de citas y presencia digital para una red de clínicas con múltiples sedes.',
    tone: 'dim',
  },
] as const;

export const process = [
  {
    n: '01',
    title: 'Descubrimiento',
    desc: 'Entendemos el negocio, la audiencia y el problema real antes de abrir cualquier herramienta de diseño.',
  },
  {
    n: '02',
    title: 'Diseño',
    desc: 'Exploramos dirección visual y la validamos contigo antes de escribir una sola línea de código.',
  },
  {
    n: '03',
    title: 'Desarrollo',
    desc: 'Construimos sobre una base rápida, accesible y fácil de mantener a largo plazo.',
  },
  {
    n: '04',
    title: 'Lanzamiento',
    desc: 'Publicamos, medimos resultados y dejamos el proyecto listo para crecer contigo.',
  },
] as const;

export const capabilities = [
  {
    n: '01',
    title: 'Diseño de marca',
    desc: 'Identidad visual, tono de voz y un sistema de diseño coherente en cada punto de contacto.',
  },
  {
    n: '02',
    title: 'Desarrollo web',
    desc: 'Sitios rápidos y mantenibles, construidos con tecnología moderna y buenas prácticas.',
  },
  {
    n: '03',
    title: 'Motion e interacción',
    desc: 'Animación con intención: cada movimiento comunica algo, nada se mueve porque sí.',
  },
  {
    n: '04',
    title: 'Estrategia digital',
    desc: 'Contenido, SEO técnico y estructura pensados para convertir visitas en clientes.',
  },
] as const;

export const cta = {
  eyebrow: '¿Empezamos?',
  headline: 'Hablemos de tu próximo proyecto.',
  sub: 'Cuéntanos qué necesitas y te compartimos una propuesta clara, sin compromisos.',
  buttonLabel: 'Escríbenos',
} as const;
