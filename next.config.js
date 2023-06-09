// next.config.js
require('dotenv').config();

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
}

module.exports = nextConfig