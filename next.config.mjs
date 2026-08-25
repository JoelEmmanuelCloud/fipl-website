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
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/register-with-us', destination: '/register', permanent: true },
      { source: '/blog', destination: '/news', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/media', destination: '/news', permanent: true },
      { source: '/fipl-foundation', destination: '/sustainability', permanent: true },
      { source: '/our-plants', destination: '/power-plants', permanent: true },
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
