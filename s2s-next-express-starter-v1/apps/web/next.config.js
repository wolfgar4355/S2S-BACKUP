/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites(){
    return [
      { source: '/api/privacy/:path*', destination: 'http://localhost:4000/api/privacy/:path*' }
    ]
  }
};
module.exports = nextConfig;
