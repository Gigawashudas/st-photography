export type ProjectCategory = "Interior Photography" | "Interior Cinematography";

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  year: number;
  description: string;
  coverImage: string;
  featured: boolean;
  featuredOrder: number;
  published: boolean;
  images: string[];
};

export const projects: Project[] = [
  {
    id: "01",
    slug: "house-of-stillness",
    title: "House of Stillness",
    category: "Interior Photography",
    location: "Dhaka",
    year: 2026,
    description: "A quiet residential interior shaped by natural light, warm materials, and restrained architectural details.",
    coverImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=90",
    featured: true,
    featuredOrder: 1,
    published: true,
    images: ["https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=90", "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2000&q=90", "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=90"],
  },
  {
    id: "02",
    slug: "concrete-and-light",
    title: "Concrete & Light",
    category: "Interior Photography",
    location: "Gulshan",
    year: 2026,
    description: "Contemporary architecture photographed through geometry, shadow, texture, and afternoon light.",
    coverImage: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=2000&q=90",
    featured: true,
    featuredOrder: 2,
    published: true,
    images: ["https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2000&q=90", "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=90", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90"],
  },
  {
    id: "03",
    slug: "the-quiet-residence",
    title: "The Quiet Residence",
    category: "Interior Cinematography",
    location: "Dhaka",
    year: 2026,
    description: "A cinematic study of movement, atmosphere, material, and spatial transitions.",
    coverImage: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=2000&q=90",
    featured: true,
    featuredOrder: 3,
    published: true,
    images: ["https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=90", "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=90"],
  },
  {
    id: "04",
    slug: "earth-form",
    title: "Earth / Form",
    category: "Interior Photography",
    location: "Banani",
    year: 2026,
    description: "Organic textures, natural materials, and architectural forms captured in a warm visual language.",
    coverImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2000&q=90",
    featured: false,
    featuredOrder: 0,
    published: true,
    images: ["https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=2000&q=90", "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=90"],
  },
  {
    id: "05",
    slug: "between-spaces",
    title: "Between Spaces",
    category: "Interior Photography",
    location: "Dhanmondi",
    year: 2026,
    description: "A visual study of how natural light moves through a modern residential interior.",
    coverImage: "https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=2000&q=90",
    featured: false,
    featuredOrder: 0,
    published: true,
    images: ["https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2000&q=90", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90"],
  },
  {
    id: "06",
    slug: "after-dark",
    title: "After Dark",
    category: "Interior Cinematography",
    location: "Dhaka",
    year: 2026,
    description: "An evening interior film focused on ambient lighting, mood, and architectural details.",
    coverImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=90",
    featured: false,
    featuredOrder: 0,
    published: true,
    images: ["https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=90"],
  },
];
