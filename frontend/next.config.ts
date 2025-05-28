/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "beats-uploads.s3.eu-north-1.amazonaws.com",
      },
    ],
  },
  experimental: {
    serverActions: {},
  },
  transpilePackages: ["@clerk/nextjs"],
};

module.exports = nextConfig;
