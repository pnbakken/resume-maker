/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    workerThreads: true,
    cpus: 1,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
