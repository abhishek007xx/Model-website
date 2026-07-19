// =====================================================================
//  MIZUHARA — Portfolio Content
// ---------------------------------------------------------------------
//  Edit this file to update text, stats, and images on the site.
//
//  >>> HOW TO REPLACE THE PLACEHOLDER PHOTOS WITH MIZUHARA'S REAL PHOTOS
//  1. Drop your photos into:  /public/portfolio/
//  2. Either:
//       • name them the SAME as the files below (hero.jpg, gallery-1.jpg…)
//         and overwrite the placeholders, OR
//       • put them with any name and update the `src` values below.
//  The gallery will automatically use whatever paths are listed here.
// =====================================================================

export const MODEL = {
  name: "Mizuhara",
  fullName: "Mizuhara",
  tagline: "International Fashion Model",
  location: "Tokyo · Paris · New York",
  email: "booking@mizuhara.model",
  phone: "+1 (212) 555-0148",
  instagram: "@mizuhara",
  agency: "Elite Management",
  // Hero collage images
  heroMain: "/portfolio/hero.jpg",
  heroCloseup: "/portfolio/gallery-2.jpg",
  heroAlt: "/portfolio/gallery-4.jpg",
  heroIntro:
    "Editorial muse. Runway presence. A face that frames a story — Mizuhara moves between couture, campaign, and cinema with quiet command.",
  // Editorial metadata (magazine-style credits)
  issue: "N° 01",
  season: "SS / 25",
  shotBy: "Studio Archive",
  shotAt: "Paris",
};

export const ABOUT = {
  image: "/portfolio/about.jpg",
  secondary: "/portfolio/gallery-1.jpg",
  heading: "About",
  paragraphs: [
    "Mizuhara is an international fashion model known for an editorial sensibility that is at once modern and timeless. With a gaze that holds the lens and a presence that translates across cultures, she has become a sought-after face for houses that value restraint and character over noise.",
    "Her work spans print editorials, global campaigns, and the runway — a practice built on discipline, curiosity, and a genuine love for the craft of image-making. Every frame is a conversation between the garment, the light, and the woman wearing it.",
  ],
  highlights: [
    { value: "08+", label: "Years in industry" },
    { value: "04", label: "Continents" },
    { value: "32", label: "Editorials" },
    { value: "03", label: "Languages" },
  ],
};

// Comp-card vital statistics (edit freely)
export const VITAL_STATS: { label: string; value: string }[] = [
  { label: "Height", value: "178 cm" },
  { label: "Bust", value: "82 cm" },
  { label: "Waist", value: "60 cm" },
  { label: "Hips", value: "89 cm" },
  { label: "Hair", value: "Dark Brown" },
  { label: "Eyes", value: "Brown" },
  { label: "Shoes", value: "39 EU" },
  { label: "Dress", value: "34 EU" },
];

// Gallery — each item is one image with a caption + category + number.
// `aspect` controls the cinematic pacing of the asymmetric layout:
//   "tall"  = 3/4 portrait,  "square" = 1/1,  "wide" = 16/9,  "std" = 4/5
export type GalleryItem = {
  src: string;
  title: string;
  category: string;
  aspect: "tall" | "square" | "wide" | "std";
};

export const GALLERY: GalleryItem[] = [
  { src: "/portfolio/gallery-1.jpg", title: "Quiet Strength", category: "Editorial", aspect: "tall" },
  { src: "/portfolio/gallery-2.jpg", title: "Beauty Study",   category: "Beauty",    aspect: "square" },
  { src: "/portfolio/gallery-3.jpg", title: "Couture Moment", category: "Runway",    aspect: "tall" },
  { src: "/portfolio/gallery-4.jpg", title: "Linen & Light",  category: "Editorial", aspect: "std" },
  { src: "/portfolio/gallery-5.jpg", title: "Golden Hour",    category: "Campaign",  aspect: "square" },
  { src: "/portfolio/gallery-6.jpg", title: "Noir",           category: "Editorial", aspect: "tall" },
  { src: "/portfolio/gallery-7.jpg", title: "Reverie",        category: "Editorial", aspect: "wide" },
  { src: "/portfolio/gallery-8.jpg", title: "Touch",          category: "Beauty",    aspect: "square" },
  { src: "/portfolio/gallery-9.jpg", title: "In Motion",      category: "Runway",    aspect: "tall" },
  { src: "/portfolio/gallery-10.jpg", title: "Terracotta",    category: "Campaign",  aspect: "std" },
  { src: "/portfolio/gallery-11.jpg", title: "Detail",        category: "Beauty",    aspect: "square" },
  { src: "/portfolio/gallery-12.jpg", title: "Silhouette",    category: "Editorial", aspect: "tall" },
];

// Experience — publications & houses she has worked with
export const CREDITS: { publications: string[]; houses: string[] } = {
  publications: [
    "Vogue",
    "Harper's Bazaar",
    "Elle",
    "Numéro",
    "W Magazine",
    "i-D",
    "Dazed",
    "Marie Claire",
  ],
  houses: [
    "Chanel",
    "Dior",
    "Louis Vuitton",
    "Prada",
    "Valentino",
    "Saint Laurent",
    "Givenchy",
    "Loewe",
  ],
};

// Services she offers
export const SERVICES: {
  icon: string;
  title: string;
  description: string;
}[] = [
  {
    icon: "Camera",
    title: "Editorial",
    description:
      "Magazine editorials, covers, and artistic collaborations with photographers and creative directors worldwide.",
  },
  {
    icon: "Footprints",
    title: "Runway",
    description:
      "Fashion week appearances for couture and ready-to-wear houses — show openings, closings, and exclusives.",
  },
  {
    icon: "Sparkles",
    title: "Campaign",
    description:
      "Global brand campaigns across beauty, fashion, and lifestyle — print, film, and digital.",
  },
  {
    icon: "Clapperboard",
    title: "Film & Motion",
    description:
      "Short films, brand films, and motion editorials that extend a story beyond the still frame.",
  },
];

export const NAV_LINKS: { label: string; href: string }[] = [
  { label: "About", href: "#about" },
  { label: "Stats", href: "#stats" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];
