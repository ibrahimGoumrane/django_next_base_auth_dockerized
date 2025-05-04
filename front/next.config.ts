import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.NEXT_PUBLIC_IMAGE_URL?.split(":")[0] || "localhost",
        port: process.env.NEXT_PUBLIC_IMAGE_PORT || "8000",
        pathname: "/exam_papers/**",
      },
    ],
  },
  output: "standalone",
};

export default nextConfig;
