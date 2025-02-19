/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["image.tmdb.org","img.icons8.com"],
    },
    env:{
      stripe_public_key: process.env.STRIPE_PUBLIC_KEY
    }
  };
  
  export default nextConfig;
  