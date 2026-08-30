import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "jboptjdzvncpcvdgiecg.supabase.co",
        pathname: "/storage/v1/object/public/project-images/**",
      },
    ],
  },
};

export default nextConfig;
