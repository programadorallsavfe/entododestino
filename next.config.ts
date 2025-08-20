import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración para manejar componentes que dependen del navegador
  experimental: {
    // Mejorar el manejo de componentes del lado del cliente
    optimizePackageImports: ['leaflet'],
  },
  
  // Configuración de webpack para Leaflet
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Configuración específica para el cliente
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },
  
  // Configuración de imágenes
  images: {
    domains: ['localhost'],
    unoptimized: true, // Para evitar problemas con imágenes locales
  },
  
  // Configuración de tipos
  typescript: {
    // Ignorar errores de TypeScript durante el build
    ignoreBuildErrors: false,
  },
  
  // Configuración de ESLint
  eslint: {
    // Ignorar errores de ESLint durante el build
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
