/** @type {import('next').NextConfig} */
import Analyzer from "@next/bundle-analyzer";
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  // experimental: {
  //   webpackBuildWorker: true,
  // },
  // eslint: { ignoreDuringBuilds: true },
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
};

const WithAnalyzer = Analyzer({ enabled: process.env.ANALYZE === "true" });

export default WithAnalyzer(nextConfig);
