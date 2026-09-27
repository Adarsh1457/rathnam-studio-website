/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  allowedDevOrigins: ['192.168.0.127'],
  images: {
    unoptimized: true,
    qualities: [30, 75],
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