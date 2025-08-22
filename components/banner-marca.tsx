"use client"

import { Heart } from 'lucide-react'

export const BannerMarca = () => {
  return (
    <div className="sticky bottom-0 bg-white border-t-2 border-primary shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center space-x-2 text-sm">
          <span className="text-gray-600">Realizado por</span>
          <a 
            href="https://monstruocreativo.com/software/?v=dd07de856139" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-bold text-primary text-lg hover:text-primary/80 transition-colors duration-200 cursor-pointer"
          >
            @Mounstro Creativo
          </a>
        </div>
      </div>
    </div>
  )
}
            