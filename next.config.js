/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  siteUrl: "https://stupendouscms.com",
  generateRobotsTxt: true,
  exclude: [
    "/app/dashboard",
    "/app/models",
    "/app/projects",
    "/app/objects",
    "/app/editor",
    "/app/media",
  ], // For sitemap
  swcMinify: true,
};

module.exports = nextConfig;
