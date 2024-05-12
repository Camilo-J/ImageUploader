/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: process.env.CLOUDFRONTDOMAIN,
      },
    ],
  },
};

module.exports = nextConfig;
