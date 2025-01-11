/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["th.bing.com","lh3.googleusercontent.com",
      "pranaytwitter.s3.ap-south-1.amazonaws.com"
    ]
  }
};

export default nextConfig;
