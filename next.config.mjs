/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'dealfuel.d8bb7118ec11456d9da275621d2bb992.r2.cloudflarestorage.com',
      'pub-b97365bc062549709fc9da4abab7da49.r2.dev'
    ],
  },
  webpack: (config) => {
    config.externals = [...config.externals, "bcrypt"];
    return config;
  },
};

export default nextConfig;
