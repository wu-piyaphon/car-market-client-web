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
  },
};

export default nextConfig;
