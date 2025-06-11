import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb", // サーバーアクションのボディサイズ制限を1MBに設定
    },
  },
};

export default nextConfig;
