/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    domains: [],
    unoptimized: false
  },
};

module.exports = nextConfig;
