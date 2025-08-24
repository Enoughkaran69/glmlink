/** @type {import('next').NextConfig} */
// next.config.mjs
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables ESLint check during build
  },
};

export default nextConfig;

