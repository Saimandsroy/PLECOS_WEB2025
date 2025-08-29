/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export", // 👈 This is the key for Amplify static hosting
};

export default nextConfig;
