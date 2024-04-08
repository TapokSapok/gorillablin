/** @type {import('next').NextConfig} */

const nextConfig = {
  sassOptions: {
    includePaths: ["./src"],
    prependData: `@import "@/styles/variables.scss";`,
  },
  images: {
    path: "/",
    loaderFile: "public",
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "s3.amazonaws.com",
      //   port: "",
      //   pathname: "/my-bucket/**",
      // },
    ],
  },
};

export default nextConfig;
