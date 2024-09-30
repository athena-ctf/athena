/** @type {import('next').NextConfig} */
export default {
  transpilePackages: ["@repo/ui", "@repo/api", "@repo/config"],
  output: "standalone",
};
