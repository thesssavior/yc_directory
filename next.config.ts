import type { NextConfig } from "next";

// internationalization
// module.exports = {
//   i18n: {
//     locales: ['en', 'kr'], // List of supported languages
//     defaultLocale: 'kr',        // Default language
//   },
// };

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      }
    ]
  },
};

export default nextConfig;
