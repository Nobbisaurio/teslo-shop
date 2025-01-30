import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        hostname: 'static.vecteezy.com',
        protocol: 'https'
      }
    ]
  }
};

export default nextConfig;
