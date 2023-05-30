/** @type {import('next').NextConfig} */
const withFonts = require("next-fonts");

module.exports = withFonts({
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config, options) {
    return config;
  },
});
