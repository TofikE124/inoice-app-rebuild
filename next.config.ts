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
  devIndicators: {
    position: "bottom-right",
  },
};

export default nextConfig;
