const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  async redirects() {
    return [
      {
        source: "/(en|ja)/:path*",
        destination: "/:path*",
        permanent: true,
      },
      {
        source: "/blog/:path*",
        destination: "/posts/:path*",
        permanent: true,
      },
    ];
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = withContentlayer(nextConfig);
