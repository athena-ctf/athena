/** @type {import('next').NextConfig} */
export default {
  transpilePackages: ["@repo/ui", "@repo/api", "@repo/config"],
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gravatar.com",
        port: "",
        pathname: "/avatar/**",
      },
    ],
  },
};
