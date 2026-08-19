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
    slug: "endodoncia",
    name: "Endodoncia",
    num: "01",
    tagline: "Trata la infección desde la raíz y salva tu diente natural",
    description:
      "La endodoncia elimina el tejido dañado o infectado dentro del diente, aliviando el dolor y evitando la extracción, para que conserves tu diente natural por más tiempo.",
    benefits: [
      "Elimina el dolor causado por infección o inflamación",
      "Evita la pérdida del diente natural",
      "Procedimiento seguro con anestesia local",
    ],
  },
  {
    slug: "ortodoncia",
    name: "Ortodoncia",
    num: "02",
    tagline: "Alinea tu sonrisa con brackets o alineadores",
    description:
      "Corregimos la posición de tus dientes y tu mordida con tratamientos de ortodoncia personalizados, mejorando tanto la función como la estética de tu sonrisa.",
    benefits: [
      "Corrige dientes chuecos y problemas de mordida",
      "Opciones con brackets tradicionales o alineadores",
      "Planes de tratamiento personalizados",
    ],
  },
  {
    slug: "ortodoncia-pediatrica",
    name: "Ortodoncia Pediátrica",
    num: "03",
    tagline: "Cuidado ortodóntico temprano para los más pequeños",
    description:
      "Detectamos y corregimos problemas de alineación y crecimiento dental desde temprana edad, guiando el desarrollo de una sonrisa sana en niños y adolescentes.",
    benefits: [
      "Detección temprana de problemas de mordida",
      "Guía el crecimiento correcto de la mandíbula",
      "Ambiente amigable pensado para niños",
    ],
  },
  {
    slug: "cirugia-maxilofacial",
    name: "Cirugía Maxilofacial",
    num: "04",
    tagline: "Atención especializada para casos complejos",
    description:
      "Realizamos procedimientos quirúrgicos especializados para tratar afecciones de los dientes, la mandíbula y los tejidos faciales, con la más alta seguridad y experiencia.",
    benefits: [
      "Extracción de terceros molares e implantes complejos",
      "Tratamiento de traumatismos y lesiones faciales",
      "Equipo especializado y anestesia segura",
    ],
  },
  {
    slug: "blanqueamientos",
    name: "Blanqueamientos",
    num: "05",
    tagline: "Una sonrisa más blanca en una sola visita",
    description:
      "Nuestro blanqueamiento dental elimina manchas y aclara el color de tus dientes de forma segura, con resultados visibles desde la primera sesión.",
    benefits: [
      "Resultados visibles en una sola cita",
      "Seguro para el esmalte al realizarse profesionalmente",
      "Kit de mantenimiento disponible para casa",
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
