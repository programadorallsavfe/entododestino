"use client"

import { Phone, Mail, MapPin, Home, Facebook, Instagram, Youtube, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

export const FooterHome = () => {
    return (
        <footer className="w-full bg-[#1a408c] text-white">
            {/* Top Section */}
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
                    {/* Left Side - Contact Information */}
                    <div className="flex-1 space-y-6">
                        <div>
                            <h3 className="text-3xl font-bold mb-2">En todo destino</h3>
                            <h4 className="text-xl font-semibold text-white/90">Contacto</h4>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-white/80" />
                                <span className="text-lg">+52 33 2874 0440</span>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-white/80" />
                                <span className="text-lg">afiliados@entododestino.com</span>
                            </div>
                            
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-white/80 mt-1 flex-shrink-0" />
                                <span className="text-lg leading-relaxed">
                                    Prisciliano Sanchez 1024 Rancho Blanco, 45560 - Tlaquepaque
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Logo */}
                    <div className="flex-shrink-0">
                        <div className="relative">
                            {/* Logo Container */}
                            <div className="w-48 h-32 rounded-lg overflow-hidden">
                                <img
                                    src="/assets/logoooo.png"
                                    alt="En todo destino - Siempre contigo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Divider Line */}
            <div className="border-t border-white/20" />

            {/* Bottom Section */}
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Left Side - Copyright and Policies */}
                    <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-white/80">
                        <span>All rights reserved  Mounstro Creativo</span>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-white transition-colors">
                                Política de cookies
                            </a>
                            <a href="#" className="hover:text-white transition-colors">
                                Política de privacidad
                            </a>
                        </div>
                    </div>

                    {/* Right Side - Social Media Icons */}
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white/80 hover:text-white hover:bg-white/10"
                        >
                            <Home className="w-5 h-5" />
                        </Button>
                        
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white/80 hover:text-white hover:bg-white/10"
                        >
                            <Facebook className="w-5 h-5" />
                        </Button>
                        
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white/80 hover:text-white hover:bg-white/10"
                        >
                            <Instagram className="w-5 h-5" />
                        </Button>
                        
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white/80 hover:text-white hover:bg-white/10"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                            </svg>
                        </Button>
                        
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white/80 hover:text-white hover:bg-white/10"
                        >
                            <Youtube className="w-5 h-5" />
                        </Button>
                        
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white/80 hover:text-white hover:bg-white/10"
                        >
                            <Linkedin className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </footer>
    )
}