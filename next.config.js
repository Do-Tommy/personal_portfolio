/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media.california.com','bairesdev.mo.cloudinary.net']
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: { and: [/\.(js|ts|md)x?$/] },
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            prettier: false,
            svgo: true,
            svgoConfig: { plugins: [{ removeViewBox: false }] },
            titleProp: true,
          },
        },
      ],
    });
    return config;
  },
}

module.exports = nextConfig
