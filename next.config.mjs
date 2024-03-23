/** @type {import('next').NextConfig} */

const nextConfig = { sassOptions: { includePaths: ['./src'], prependData: `@import "@/styles/variables.scss";` } };

export default nextConfig;
