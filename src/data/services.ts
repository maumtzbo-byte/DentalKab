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
    name: "Dental Veneers",
    num: "01",
    tagline: "Thin, custom shells for a flawless smile",
    description:
      "Veneers correct chips, gaps, and discoloration in as few as two visits, giving you a natural-looking smile that lasts for years.",
    benefits: [
      "Custom-shaded to match your natural teeth",
      "Corrects chips, gaps, and uneven edges",
      "Stain-resistant and built to last",
    ],
  },
  {
    slug: "dental-crowns",
    name: "Dental Crowns",
    num: "02",
    tagline: "Restore strength to damaged teeth",
    description:
      "A crown caps a weakened or heavily filled tooth, restoring its shape, strength, and function while blending in with your bite.",
    benefits: [
      "Protects teeth after root canal treatment",
      "Restores full chewing strength",
      "Matched to your natural tooth color",
    ],
  },
  {
    slug: "teeth-whitening",
    name: "Teeth Whitening",
    num: "03",
    tagline: "A brighter smile in a single visit",
    description:
      "Our in-office whitening lifts years of staining safely, with a take-home kit to keep your results looking their best.",
    benefits: [
      "Visible results in one appointment",
      "Safe for enamel when done professionally",
      "Take-home kit included for touch-ups",
    ],
  },
  {
    slug: "dental-implants",
    name: "Dental Implants",
    num: "04",
    tagline: "Restore missing teeth, permanently",
    description:
      "Implants replace missing teeth from the root up, giving you a permanent, natural-feeling result backed by digital treatment planning.",
    benefits: [
      "Functions and feels like a natural tooth",
      "Prevents bone loss from missing teeth",
      "Planned digitally for a precise fit",
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
