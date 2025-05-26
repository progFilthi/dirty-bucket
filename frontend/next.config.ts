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
};

module.exports = nextConfig;
