/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fastly.picsum.photos',
        port: '',
        pathname: '/id/**',
      },
      {
        protocol: 'https',
        hostname: 'placeholder.photo',
        port: '',
        pathname: '/img/**',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        port: '',
        pathname: '/api/**',
      },
      {
        protocol: 'https',
        hostname: 'this-person-does-not-exist.com',
        port: '',
        pathname: '/img/**',
      },
    ]
  }
};

export default nextConfig;
