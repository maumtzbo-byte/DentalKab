export type Service = {
  slug: string;
  name: string;
  num: string;
  tagline: string;
  description: string;
  benefits: string[];
};

export const services: Service[] = [
  {
    slug: "dental-veneers",
    name: "Carillas Dentales",
    num: "01",
    tagline: "Láminas delgadas y personalizadas para una sonrisa perfecta",
    description:
      "Las carillas corrigen astillas, espacios y manchas en tan solo dos visitas, dándote una sonrisa de apariencia natural que dura años.",
    benefits: [
      "Tono personalizado para igualar tus dientes naturales",
      "Corrige astillas, espacios y bordes desiguales",
      "Resistentes a manchas y duraderas",
    ],
  },
  {
    slug: "dental-crowns",
    name: "Coronas Dentales",
    num: "02",
    tagline: "Devuelve fuerza a los dientes dañados",
    description:
      "Una corona cubre un diente debilitado o muy dañado, restaurando su forma, fuerza y función mientras se integra con tu mordida.",
    benefits: [
      "Protege el diente después de un tratamiento de conducto",
      "Restaura la fuerza completa de masticación",
      "Igualada al color natural de tu diente",
    ],
  },
  {
    slug: "teeth-whitening",
    name: "Blanqueamiento Dental",
    num: "03",
    tagline: "Una sonrisa más brillante en una sola visita",
    description:
      "Nuestro blanqueamiento en consultorio elimina años de manchas de forma segura, con un kit para casa que mantiene tus resultados.",
    benefits: [
      "Resultados visibles en una sola cita",
      "Seguro para el esmalte al realizarse profesionalmente",
      "Incluye kit para casa para retoques",
    ],
  },
  {
    slug: "dental-implants",
    name: "Implantes Dentales",
    num: "04",
    tagline: "Recupera los dientes perdidos, de forma permanente",
    description:
      "Los implantes reemplazan dientes perdidos desde la raíz, dándote un resultado permanente y de sensación natural respaldado por planeación digital.",
    benefits: [
      "Funciona y se siente como un diente natural",
      "Previene la pérdida ósea por dientes faltantes",
      "Planeado digitalmente para un ajuste preciso",
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
