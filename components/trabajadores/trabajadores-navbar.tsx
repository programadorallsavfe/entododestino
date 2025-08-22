"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import { ChevronDown, User, Flag, HelpCircle, Menu, Users, Package, Calendar, Settings, Bell, X, ChevronLeft, ChevronRight, MapPin, Building, Hotel, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ModeToggle } from "@/components/mode-toggle"
import { useIsMobile } from "@/hooks/use-mobile"
import Image from "next/image"
import { NotificationsPanel } from "./notifications-panel"

interface TrabajadoresNavbarProps {
  className?: string
}

export const TrabajadoresNavbar = ({ className }: TrabajadoresNavbarProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const [selectedCurrency, setSelectedCurrency] = useState("S/ PEN")
  const [selectedLanguage, setSelectedLanguage] = useState("Español")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const notificationsButtonRef = useRef<HTMLButtonElement>(null)
  const isMobile = useIsMobile()

  // Inicializar CSS custom property para el ancho del sidebar
  useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-width', '16rem')
  }, [])

  // Efecto para agregar sombra al sidebar cuando está expandido
  useEffect(() => {
    const sidebar = document.querySelector('aside')
    if (sidebar) {
      if (sidebarExpanded) {
        sidebar.classList.add('shadow-2xl')
        sidebar.classList.remove('shadow-lg')
      } else {
        sidebar.classList.add('shadow-lg')
        sidebar.classList.remove('shadow-2xl')
      }
    }
  }, [sidebarExpanded])

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency)
  }

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
  }

  const handleNavigation = (route: string) => {
    router.push(route)
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  const toggleSidebar = () => {
    const newExpanded = !sidebarExpanded
    setSidebarExpanded(newExpanded)
    
    // Actualizar CSS custom property para que el layout se ajuste automáticamente
    document.documentElement.style.setProperty(
      '--sidebar-width', 
      newExpanded ? '16rem' : '4rem'
    )

    // Agregar efecto de transición suave
    const sidebar = document.querySelector('aside')
    if (sidebar) {
      sidebar.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    }
  }

  const isActiveRoute = (route: string) => {
    return pathname === route
  }

  const navigationItems = [
    {
      name: 'Dashboard',
      route: '/trabajadores',
      icon: HelpCircle,
      description: 'Panel principal'
    },
    {
      name: 'Clientes',
      route: '/trabajadores/lista-clientes',
      icon: Users,
      description: 'Gestión de clientes'
    },
    {
      name: 'Paquetes',
      route: '/trabajadores/lista-paquetes',
      icon: Package,
      description: 'Gestión de paquetes'
    },
    {
      name: 'Itinerarios',
      route: '/trabajadores/lista-itinerarios',
      icon: MapPin,
      description: 'Gestión de itinerarios'
    },
    {
      name: 'Cotizaciones',
      route: '/trabajadores/solicitudes-paquetes',
      icon: Calendar,
      description: 'Solicitud de cotizaciones'
    },
    {
      name: 'Tarifas',
      route: '/trabajadores/lista-tarifas',
      icon: Settings,
      description: 'Gestión de tarifas'
    },
    {
      name: 'Proveedores',
      route: '/trabajadores/lista-proveedores',
      icon: Building,
      description: 'Lista de proveedores'
    },
    {
      name: 'Hoteles',
      route: '/trabajadores/lista-hoteles',
      icon: Hotel,
      description: 'Gestión de hoteles'
    },
    {
      name: 'Vuelos',
      route: '/trabajadores/lista-vuelos',
      icon: Plane,
      description: 'Gestión de vuelos'
    }
  ]

  return (
    <>
      {/* Header superior */}
      <header className={`bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] border-b border-[#3C58CA] sticky top-0 z-50 shadow-lg ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo y Nombre */}
            <div className="flex items-center space-x-4">
              {/* Logo entododestino */}
              <div className="relative w-32 h-12 cursor-pointer transition-transform hover:scale-105" onClick={() => handleNavigation('/trabajadores')}>
                <Image
                  src="/assets/logoooo.png"
                  alt="entododestino - Panel de Trabajadores"
                  width={128}
                  height={48}
                  className="object-contain"
                  priority
                />
              </div>
              {/* Indicador de área de trabajadores */}
              <div className="hidden sm:block">
              
              </div>
            </div>

            {/* Utilidades derecha */}
            <div className="flex items-center space-x-3">
              {/* Notificaciones */}
              <div className="relative">
                <Button 
                  ref={notificationsButtonRef}
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:text-[#8ed1fc] hover:bg-[#3C58CA]/40 relative transition-all duration-200 hover:scale-105"
                  onClick={() => setNotificationsOpen(true)}
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-[#ec4899] to-[#f97316] text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                    3
                  </span>
                </Button>
                
                {/* Panel de Notificaciones */}
                <NotificationsPanel 
                  isOpen={notificationsOpen} 
                  onClose={() => setNotificationsOpen(false)}
                  triggerRef={notificationsButtonRef}
                />
              </div>

              {/* Selector de moneda */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white hover:text-[#8ed1fc] hover:bg-[#3C58CA]/40 font-medium transition-all duration-200 hover:scale-105 border border-transparent hover:border-[#8ed1fc]/30">
                    {selectedCurrency}
                    <ChevronDown className="w-4 h-4 ml-2 transition-transform duration-200" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-sm border-[#3C58CA]/20">
                  <DropdownMenuItem onClick={() => handleCurrencyChange("S/ PEN")} className="hover:bg-[#1e3a8a]/10">
                    🇵🇪 S/ PEN (Sol Peruano)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleCurrencyChange("$ USD")} className="hover:bg-[#1e3a8a]/10">
                    🇺🇸 $ USD (Dólar Estadounidense)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleCurrencyChange("€ EUR")} className="hover:bg-[#1e3a8a]/10">
                    🇪🇺 € EUR (Euro)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleCurrencyChange("$ COP")} className="hover:bg-[#1e3a8a]/10">
                    🇨🇴 $ COP (Peso Colombiano)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Perfil de trabajador */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white hover:text-[#8ed1fc] hover:bg-[#3C58CA]/40 font-medium transition-all duration-200 hover:scale-105 border border-transparent hover:border-[#8ed1fc]/30">
                    <User className="w-4 h-4 mr-2" />
                    Mi Perfil
                    <ChevronDown className="w-4 h-4 ml-2 transition-transform duration-200" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-sm border-[#3C58CA]/20">
                  <DropdownMenuItem className="hover:bg-[#1e3a8a]/10">
                    <User className="w-4 h-4 mr-2 text-[#1e3a8a]" />
                    Ver Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-[#1e3a8a]/10">
                    <Settings className="w-4 h-4 mr-2 text-[#1e3a8a]" />
                    Configuración
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600 hover:bg-red-50">
                    🚪 Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Selector de idioma */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white hover:text-[#8ed1fc] hover:bg-[#3C58CA]/40 font-medium transition-all duration-200 hover:scale-105 border border-transparent hover:border-[#8ed1fc]/30">
                    <Flag className="w-4 h-4 mr-2" />
                    {selectedLanguage}
                    <ChevronDown className="w-4 h-4 ml-2 transition-transform duration-200" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-sm border-[#3C58CA]/20">
                  <DropdownMenuItem onClick={() => handleLanguageChange("Español")} className="hover:bg-[#1e3a8a]/10">
                    🇪🇸 Español
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLanguageChange("English")} className="hover:bg-[#1e3a8a]/10">
                    🇺🇸 English
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLanguageChange("Français")} className="hover:bg-[#1e3a8a]/10">
                    🇫🇷 Français
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Botón de Dark Theme */}
              <div className="transition-all duration-200 hover:scale-105">
                <ModeToggle />
              </div>

              {/* Botón de menú móvil */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden text-white hover:text-[#8ed1fc] hover:bg-[#3C58CA]/40 transition-all duration-200 hover:scale-105"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Desktop - Expandible/Collapsible */}
      <aside className={`hidden lg:block fixed left-0 top-16 bg-[#1e3a8a] border-r border-[#3C58CA] z-40 overflow-y-auto transition-all duration-300 ease-in-out ${
        sidebarExpanded ? 'w-64' : 'w-16'
      } h-[calc(100vh-4rem)]`}>
        <div className="flex flex-col pt-5 pb-4">
          {/* Botón de toggle del sidebar */}
          <div className="flex justify-end px-4 mb-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-[#8ed1fc] hover:text-white hover:bg-[#3C58CA]/50 transition-all duration-300 hover:scale-110 hover:shadow-lg"
              onClick={toggleSidebar}
              title={sidebarExpanded ? "Contraer sidebar" : "Expandir sidebar"}
            >
              {sidebarExpanded ? (
                <ChevronLeft className="h-4 w-4 transition-transform duration-300" />
              ) : (
                <ChevronRight className="h-4 w-4 transition-transform duration-300" />
              )}
            </Button>
          </div>

          {/* Título del sidebar */}
          {sidebarExpanded && (
            <div className="flex items-center flex-shrink-0 px-4 mb-6">
              <h2 className="text-lg font-semibold text-white">Navegación</h2>
            </div>
          )}

          {/* Navegación */}
          <nav className="flex-1 px-2 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.name}
                  variant={isActiveRoute(item.route) ? "default" : "ghost"}
                  className={`w-full justify-start transition-all duration-200 ${
                    isActiveRoute(item.route)
                      ? "bg-[#3C58CA] text-white hover:bg-[#3C58CA]/90 shadow-lg"
                      : "text-[#8ed1fc] hover:bg-[#3C58CA]/30 hover:text-white"
                  } h-12 px-4 rounded-lg`}
                  onClick={() => handleNavigation(item.route)}
                  title={!sidebarExpanded ? item.name : undefined}
                >
                  <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                  {sidebarExpanded && (
                    <div className="flex flex-col items-start min-w-0">
                      <span className="font-medium truncate">{item.name}</span>
                      <span className={`text-xs ${
                        isActiveRoute(item.route) ? "text-blue-100" : "text-[#8ed1fc]/70"
                      } truncate`}>
                        {item.description}
                      </span>
                    </div>
                  )}
                </Button>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Sidebar Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 flex flex-col w-64 bg-[#1e3a8a] border-r border-[#3C58CA]">
            <div className="flex items-center justify-between h-16 px-4 bg-[#3C58CA] text-white border-b border-[#1e3a8a]">
              <h2 className="text-lg font-semibold">Navegación</h2>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-[#8ed1fc] hover:bg-[#1e3a8a]/30"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex-1 px-2 pt-5 pb-4 overflow-y-auto">
              <nav className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon
  return (
                    <Button
                      key={item.name}
                      variant={isActiveRoute(item.route) ? "default" : "ghost"}
                      className={`w-full justify-start transition-all duration-200 ${
                        isActiveRoute(item.route)
                          ? "bg-[#3C58CA] text-white hover:bg-[#3C58CA]/90 shadow-lg"
                          : "text-[#8ed1fc] hover:bg-[#3C58CA]/30 hover:text-white"
                      } h-12 px-4 rounded-lg`}
                      onClick={() => handleNavigation(item.route)}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{item.name}</span>
                        <span className={`text-xs ${
                          isActiveRoute(item.route) ? "text-blue-100" : "text-[#8ed1fc]/70"
                        }`}>
                          {item.description}
                        </span>
                      </div>
                    </Button>
                  )
                })}
              </nav>
            </div>
          </div>
    </div>
      )}

    </>
  )
}

export default TrabajadoresNavbar
