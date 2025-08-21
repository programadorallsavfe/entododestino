"use client"

import { useState, useEffect } from "react"
import { ChevronDown, User, Flag, HelpCircle, ShoppingCart, Heart, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ModeToggle } from "@/components/mode-toggle"
import { useIsMobile } from "@/hooks/use-mobile"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"

interface ClientNavbarProps {
  className?: string
}

const ClientNavbar = ({ className }: ClientNavbarProps) => {
  const [selectedCurrency, setSelectedCurrency] = useState("S/ PEN")
  const [selectedLanguage, setSelectedLanguage] = useState("English")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useIsMobile()
  const router = useRouter()
  const pathname = usePathname()

  const handleNavigation = (route: string) => {
    router.push(route)
  }

  // Cerrar menú móvil cuando cambie la ruta
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency)
  }

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
  }

  return (
    <header className={`bg-[#1e3a8a] border-b border-[#3C58CA] sticky top-0 z-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y Nombre */}
          <div className="flex items-center space-x-3">
            {/* Logo entododestino */}
            <div 
              className="relative w-32 h-12 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => handleNavigation('/')}
            >
              <Image
                src="/assets/logoooo.png"
                alt="entododestino - Siempre contigo"
                width={128}
                height={48}
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Navegación principal - Solo visible en desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Button 
              variant="ghost" 
              className={`font-medium transition-colors ${
                pathname === '/clientes/alojamientos' 
                  ? 'text-[#8ed1fc] bg-[#3C58CA]/30' 
                  : 'text-white hover:text-[#8ed1fc] hover:bg-[#3C58CA]/20'
              }`}
              onClick={() => handleNavigation('/clientes/alojamientos')}
            >
              Alojamientos
            </Button>
            <Button 
              variant="ghost" 
              className={`font-medium transition-colors ${
                pathname === '/clientes/vuelos' 
                  ? 'text-[#8ed1fc] bg-[#3C58CA]/30' 
                  : 'text-white hover:text-[#8ed1fc] hover:bg-[#3C58CA]/20'
              }`}
              onClick={() => handleNavigation('/clientes/vuelos')}
            >
              Vuelos
            </Button>
            <Button 
              variant="ghost" 
              className={`font-medium transition-colors ${
                pathname === '/clientes/paquetes' 
                  ? 'text-[#8ed1fc] bg-[#8ed1fc] bg-[#3C58CA]/30' 
                  : 'text-white hover:text-[#8ed1fc] hover:bg-[#3C58CA]/20'
              }`}
              onClick={() => handleNavigation('/clientes/paquetes')}
            >
              Paquetes
            </Button>
          </nav>

          {/* Utilidades derecha */}
          <div className="flex items-center space-x-4">
            {/* Selector de moneda */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:text-[#8ed1fc] hover:bg-[#3C58CA]/20 font-medium">
                  {selectedCurrency}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => handleCurrencyChange("S/ PEN")}>
                  S/ PEN (Sol Peruano)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleCurrencyChange("$ USD")}>
                  $ USD (Dólar Estadounidense)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleCurrencyChange("€ EUR")}>
                  € EUR (Euro)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleCurrencyChange("$ COP")}>
                  $ COP (Peso Colombiano)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Carrito de compras */}
            <Button variant="ghost" size="icon" className="text-white hover:text-[#8ed1fc] hover:bg-[#3C58CA]/20 relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-[#ec4899] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                0
              </span>
            </Button>

            {/* Lista de deseos */}
            <Button variant="ghost" size="icon" className="text-white hover:text-[#8ed1fc] hover:bg-[#3C58CA]/20 relative">
              <Heart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-[#ec4899] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                0
              </span>
            </Button>

            {/* Selector de idioma */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:text-[#8ed1fc] hover:bg-[#3C58CA]/20 font-medium">
                  <Flag className="w-4 h-4 mr-2 text-[#8ed1fc]" />
                  {selectedLanguage}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => handleLanguageChange("English")}>
                  <Flag className="w-4 h-4 mr-2 text-[#3C58CA]" />
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("Español")}>
                  <Flag className="w-4 h-4 mr-2 text-[#ec4899]" />
                  Español
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("Français")}>
                  <Flag className="w-4 h-4 mr-2 text-[#8ed1fc]" />
                  Français
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Botón de Dark Theme */}
            <ModeToggle />

            {/* Botón de menú móvil */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden text-white hover:text-[#8ed1fc] hover:bg-[#3C58CA]/20"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1e3a8a] border-t border-[#3C58CA]">
          <div className="px-4 py-4 space-y-3">
            <Button 
              variant="ghost" 
              className={`w-full justify-start font-medium transition-colors ${
                pathname === '/clientes/alojamientos' 
                  ? 'text-[#8ed1fc] bg-[#3C58CA]/30' 
                  : 'text-white hover:text-[#8ed1fc] hover:bg-[#3C58CA]/20'
              }`}
              onClick={() => {
                handleNavigation('/clientes/alojamientos')
                setMobileMenuOpen(false)
              }}
            >
              Alojamientos
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-start font-medium transition-colors ${
                pathname === '/clientes/vuelos' 
                  ? 'text-[#8ed1fc] bg-[#3C58CA]/30' 
                  : 'text-white hover:text-[#8ed1fc] hover:bg-[#3C58CA]/20'
              }`}
              onClick={() => {
                handleNavigation('/clientes/vuelos')
                setMobileMenuOpen(false)
              }}
            >
              Vuelos
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-start font-medium transition-colors ${
                pathname === '/clientes/paquetes' 
                  ? 'text-[#8ed1fc] bg-[#3C58CA]/30' 
                  : 'text-white hover:text-[#8ed1fc] hover:bg-[#3C58CA]/20'
              }`}
              onClick={() => {
                handleNavigation('/clientes/paquetes')
                setMobileMenuOpen(false)
              }}
            >
              Paquetes
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

export default ClientNavbar
