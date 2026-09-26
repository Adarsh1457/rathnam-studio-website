/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Trims framer-motion/lucide-react imports to only the modules actually
  // used per file instead of pulling in the whole library, shrinking the JS
  // shipped to the browser without changing any behavior.
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
}

export default nextConfig