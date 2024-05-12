/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: process.env.FRONT_IMAGE_DOMAIN,
      },
    ],
  },
};

module.exports = nextConfig;
