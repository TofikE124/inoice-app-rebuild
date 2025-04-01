import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/invoices",
        permanent: true,
      },
    ];
  },
  devIndicators: false,
};

export default nextConfig;
