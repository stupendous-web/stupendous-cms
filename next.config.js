/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  siteUrl: "https://stupendouscms.com",
  generateRobotsTxt: true,
  exclude: [
    "/onboard",
    "/app",
    "/app/models",
    "/app/projects",
    "/app/objects",
    "/app/editor",
    "/app/files",
    "/app/account",
    "/app/users",
  ], // For sitemap
  swcMinify: true,
};

module.exports = nextConfig;
