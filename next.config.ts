import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "car-market-storage-bucket.s3.ap-southeast-7.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
    qualities: [50, 75, 100],
    unoptimized: true,
  },
  async redirects() {
    return [
      // Redirect old WordPress tag pages to 404
      {
        source: "/tag/:tagPath*",
        destination: "/404",
        permanent: true,
      },
      // Redirect old WordPress feed URLs to 404
      {
        source: "/feed/:feedPath*",
        destination: "/404",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
