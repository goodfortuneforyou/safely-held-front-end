/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["ipfs.io"],
    loader: "akamai",
    path: "",
    unoptimized: true,
  },
};

module.exports = nextConfig;
