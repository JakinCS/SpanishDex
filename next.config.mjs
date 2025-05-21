/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vfs91husc0cqtvjj.public.blob.vercel-storage.com',
        port: '',
      },
    ],
  },
  serverExternalPackages: ['newrelic'],
};

export default nextConfig;
