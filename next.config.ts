import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Silences Turbopack's workspace-root auto-detection, which otherwise
  // walks up to an unrelated package-lock.json in the user's home folder.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
