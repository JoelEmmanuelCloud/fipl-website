/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.fipl-ng.com' }],
        destination: 'https://fipl-ng.com/:path*',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  experimental: {
    staleTimes: {
      dynamic: 0,
    },
    cpus: 1,
    workerThreads: false,
  },
}
export default nextConfig
