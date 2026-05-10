/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // picsum.photos — used as placeholder images during development.
      // Remove once all real assets are in place.
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
    // Skip optimisation in development so missing local paths
    // return a clean 404 instead of a 400 from /_next/image.
    unoptimized: process.env.NODE_ENV === 'development',
  },
}
export default nextConfig
