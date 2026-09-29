import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: process.env.GITHUB_PAGES === "true" && process.env.GEEK_JR_CUSTOM_DOMAIN !== "geekjr.xyz" ? "/geek-jr" : "",
};

export default nextConfig;
