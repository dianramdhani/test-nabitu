/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/invoices/list',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
