/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "rqcoa3ubmzn9qpsj.public.blob.vercel-storage.com",
        hostname: "w1xhyohsja8eiz2g.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
