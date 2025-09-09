import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL(
        "https://good-car-market-ap-southeast-7.s3.ap-southeast-7.amazonaws.com/**",
      ),
    ],
    qualities: [50, 75, 100],
  },
};

export default nextConfig;
