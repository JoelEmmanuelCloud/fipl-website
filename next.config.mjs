/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
  },
  experimental: {
    staleTimes: {
      dynamic: 0,
    },
  },
}
export default nextConfig
