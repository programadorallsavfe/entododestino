"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { 
  Bell, 
  Clock, 
  MapPin, 
  Users, 
  Calendar, 
  DollarSign, 
  Star, 
  CheckCircle, 
  XCircle, 
  Clock3,
  TrendingUp,
  AlertCircle,
  MessageCircle,
  Settings,
  MoreHorizontal,
  Eye,
  EyeOff
} from "lucide-react"

// Tipos de datos para las notificaciones
interface SolicitudViaje {
  id: string
  cliente: {
    nombre: string
    email: string
    telefono: string
    avatar: string
    calificacion: number
    viajesAnteriores: number
  }
  viaje: {
    destino: string
    fechaInicio: string
    fechaFin: string
    personas: number
    presupuesto: number
    tipo: 'aventura' | 'cultural' | 'relax' | 'gastronomico' | 'ecoturismo'
    descripcion: string
    imagen: string
  }
  estado: 'pendiente' | 'en_revision' | 'aprobada' | 'rechazada'
  fechaSolicitud: string
  prioridad: 'baja' | 'media' | 'alta' | 'urgente'
  mensajes: number
  tiempoRestante?: string
  leida: boolean
}

// Datos de ejemplo para las solicitudes
const solicitudesEjemplo: SolicitudViaje[] = [
  {
    id: "SOL001",
    cliente: {
      nombre: "María González",
      email: "maria.gonzalez@email.com",
      telefono: "+51 999 123 456",
      avatar: "/assets/banner.jpg",
      calificacion: 4.8,
      viajesAnteriores: 3
    },
    viaje: {
      destino: "Cusco",
      fechaInicio: "2024-03-15",
      fechaFin: "2024-03-20",
      personas: 4,
      presupuesto: 2500,
      tipo: "cultural",
      descripcion: "Quiero conocer Machu Picchu y los sitios arqueológicos más importantes de Cusco. Preferencia por hoteles céntricos y guías certificados.",
      imagen: "/assets/banner.jpg"
    },
    estado: "pendiente",
    fechaSolicitud: "2024-01-20",
    prioridad: "alta",
    mensajes: 2,
    tiempoRestante: "2 días",
    leida: false
  },
  {
    id: "SOL002",
    cliente: {
      nombre: "Carlos Rodríguez",
      email: "carlos.rodriguez@email.com",
      telefono: "+51 999 789 012",
      avatar: "/assets/banner.jpg",
      calificacion: 4.9,
      viajesAnteriores: 7
    },
    viaje: {
      destino: "Arequipa",
      fechaInicio: "2024-04-10",
      fechaFin: "2024-04-15",
      personas: 2,
      presupuesto: 1800,
      tipo: "aventura",
      descripcion: "Interesado en el Valle del Colca, rafting y senderismo. Busco experiencias de aventura con seguridad garantizada.",
      imagen: "/assets/banner.jpg"
    },
    estado: "en_revision",
    fechaSolicitud: "2024-01-19",
    prioridad: "media",
    mensajes: 1,
    tiempoRestante: "5 días",
    leida: false
  },
  {
    id: "SOL003",
    cliente: {
      nombre: "Ana Martínez",
      email: "ana.martinez@email.com",
      telefono: "+51 999 345 678",
      avatar: "/assets/banner.jpg",
      calificacion: 4.7,
      viajesAnteriores: 1
    },
    viaje: {
      destino: "Lima",
      fechaInicio: "2024-02-28",
      fechaFin: "2024-03-02",
      personas: 6,
      presupuesto: 3200,
      tipo: "gastronomico",
      descripcion: "Viaje familiar enfocado en la gastronomía limeña. Restaurantes recomendados, tours culinarios y visitas culturales.",
      imagen: "/assets/banner.jpg"
    },
    estado: "pendiente",
    fechaSolicitud: "2024-01-18",
    prioridad: "urgente",
    mensajes: 3,
    tiempoRestante: "1 día",
    leida: true
  },
  {
    id: "SOL004",
    cliente: {
      nombre: "Luis Fernández",
      email: "luis.fernandez@email.com",
      telefono: "+51 999 567 890",
      avatar: "/assets/banner.jpg",
      calificacion: 4.6,
      viajesAnteriores: 5
    },
    viaje: {
      destino: "Puno",
      fechaInicio: "2024-05-01",
      fechaFin: "2024-05-05",
      personas: 3,
      presupuesto: 2100,
      tipo: "ecoturismo",
      descripcion: "Visita al Lago Titicaca, islas flotantes y comunidades locales. Interés en turismo responsable y sostenible.",
      imagen: "/assets/banner.jpg"
    },
    estado: "pendiente",
    fechaSolicitud: "2024-01-17",
    prioridad: "baja",
    mensajes: 0,
    tiempoRestante: "8 días",
    leida: true
  }
]

interface NotificationsPanelProps {
  isOpen: boolean
  onClose: () => void
  triggerRef?: React.RefObject<HTMLButtonElement | null>
}

export const NotificationsPanel = ({ isOpen, onClose, triggerRef }: NotificationsPanelProps) => {
  const [selectedSolicitud, setSelectedSolicitud] = useState<SolicitudViaje | null>(null)
  const [filterEstado, setFilterEstado] = useState<string>("todos")
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  const solicitudesFiltradas = solicitudesEjemplo.filter(solicitud => {
    const matchesEstado = filterEstado === "todos" || solicitud.estado === filterEstado
    const matchesUnread = !showUnreadOnly || !solicitud.leida
    return matchesEstado && matchesUnread
  })

  // Cerrar panel al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current && 
        !panelRef.current.contains(event.target as Node) &&
        triggerRef?.current && 
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose, triggerRef])

  const getEstadoBadge = (estado: string) => {
    const variants = {
      pendiente: "bg-yellow-100 text-yellow-800 border-yellow-200",
      en_revision: "bg-blue-100 text-blue-800 border-blue-200",
      aprobada: "bg-green-100 text-green-800 border-green-200",
      rechazada: "bg-red-100 text-red-800 border-red-200"
    }
    return <Badge className={`${variants[estado as keyof typeof variants]} border text-xs font-medium`}>{estado.replace('_', ' ')}</Badge>
  }

  const getPrioridadBadge = (prioridad: string) => {
    const variants = {
      baja: "bg-gray-100 text-gray-800",
      media: "bg-blue-100 text-blue-800",
      alta: "bg-orange-100 text-orange-800",
      urgente: "bg-red-100 text-red-800"
    }
    return <Badge className={`${variants[prioridad as keyof typeof variants]} text-xs font-medium`}>{prioridad}</Badge>
  }

  const getTipoBadge = (tipo: string) => {
    const variants = {
      aventura: "bg-green-100 text-green-800",
      cultural: "bg-purple-100 text-purple-800",
      relax: "bg-blue-100 text-blue-800",
      gastronomico: "bg-orange-100 text-orange-800",
      ecoturismo: "bg-emerald-100 text-emerald-800"
    }
    return <Badge className={`${variants[tipo as keyof typeof variants]} text-xs font-medium`}>{tipo}</Badge>
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return "hace unos minutos"
    if (diffInHours < 24) return `hace ${diffInHours} horas`
    if (diffInHours < 48) return "hace 1 día"
    return `hace ${Math.floor(diffInHours / 24)} días`
  }

  const handleAprobar = (id: string) => {
    console.log("Aprobando solicitud:", id)
  }

  const handleRechazar = (id: string) => {
    console.log("Rechazando solicitud:", id)
  }

  const handleContactar = (email: string) => {
    window.open(`mailto:${email}`, '_blank')
  }

  const handleMarkAsRead = (id: string) => {
    console.log("Marcando como leída:", id)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Panel flotante estilo YouTube - Optimizado para contenido completo sin scroll */}
      <div 
        ref={panelRef}
        className="absolute top-full right-0 mt-2 w-[500px] max-h-[85vh] bg-card rounded-xl shadow-2xl border border-border overflow-hidden z-50"
        style={{
          transform: 'translateX(calc(100% - 48px))' // Alinear con el botón de notificaciones
        }}
      >
        {/* Header elegante con gradiente sutil */}
        <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground p-3 border-b border-primary/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-white/25 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Bell className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Solicitudes de Viajes</h3>
                <p className="text-white/90 text-xs">Gestiona las solicitudes de tus clientes</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-200"
                onClick={() => setShowUnreadOnly(!showUnreadOnly)}
                title={showUnreadOnly ? "Mostrar todas" : "Solo no leídas"}
              >
                {showUnreadOnly ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-200"
                title="Configuración"
              >
                <Settings className="w-3 h-3" />
              </Button>
            </div>
          </div>
          
          {/* Filtros elegantes con mejor contraste */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-white/95">Filtrar:</span>
            <div className="flex space-x-1">
              {["todos", "pendiente", "en_revision", "aprobada", "rechazada"].map((estado) => (
                <Button
                  key={estado}
                  variant={filterEstado === estado ? "default" : "ghost"}
                  size="sm"
                  className={`h-6 px-2 text-xs font-medium transition-all duration-200 ${
                    filterEstado === estado 
                      ? "bg-white text-primary shadow-lg hover:bg-white/90" 
                      : "text-white/80 hover:text-white hover:bg-white/20 border border-white/20"
                  }`}
                  onClick={() => setFilterEstado(estado)}
                >
                  {estado === "todos" ? "Todas" : estado.replace('_', ' ')}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Contenido principal optimizado para mostrar todo sin scroll */}
        <div className="max-h-[calc(85vh-110px)] overflow-y-auto bg-background">
          {selectedSolicitud ? (
            // Vista detallada de una solicitud - Layout optimizado
            <div className="p-4 space-y-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedSolicitud(null)}
                className="mb-2 text-muted-foreground hover:text-foreground h-8 px-3 text-sm font-medium hover:bg-muted/50"
              >
                ← Volver a la lista
              </Button>
              
              <Card className="border border-border shadow-lg bg-card">
                <CardHeader className="bg-gradient-to-r from-muted/40 to-muted/20 border-b border-border p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base text-foreground mb-1">
                        Solicitud #{selectedSolicitud.id}
                      </CardTitle>
                      <p className="text-muted-foreground text-xs">
                        Solicitado {formatTimeAgo(selectedSolicitud.fechaSolicitud)}
                      </p>
                    </div>
                    <div className="flex flex-col space-y-1">
                      {getEstadoBadge(selectedSolicitud.estado)}
                      {getPrioridadBadge(selectedSolicitud.prioridad)}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {/* Información del cliente - Compacta */}
                    <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/20">
                      <Avatar className="w-12 h-12 border-2 border-primary/30 flex-shrink-0">
                        <AvatarImage src={selectedSolicitud.cliente.avatar} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                          {selectedSolicitud.cliente.nombre.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground text-sm mb-1">{selectedSolicitud.cliente.nombre}</h4>
                        <p className="text-xs text-muted-foreground mb-1">{selectedSolicitud.cliente.email}</p>
                        <p className="text-xs text-muted-foreground mb-2">{selectedSolicitud.cliente.telefono}</p>
                        <div className="flex items-center space-x-3 text-xs">
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span className="font-medium text-foreground">{selectedSolicitud.cliente.calificacion}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-3 h-3 text-primary" />
                            <span className="text-muted-foreground">{selectedSolicitud.cliente.viajesAnteriores} viajes</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Detalles del viaje - Grid compacto */}
                    <div className="grid grid-cols-2 gap-3 p-3 bg-gradient-to-r from-secondary/5 to-accent/5 rounded-lg border border-secondary/20">
                      <h4 className="text-sm font-semibold text-foreground col-span-full mb-2">Detalles del Viaje</h4>
                      
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                        <div>
                          <span className="text-xs text-muted-foreground">Destino</span>
                          <p className="font-medium text-foreground text-sm">{selectedSolicitud.viaje.destino}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                        <div>
                          <span className="text-xs text-muted-foreground">Fechas</span>
                          <p className="font-medium text-foreground text-xs">
                            {new Date(selectedSolicitud.viaje.fechaInicio).toLocaleDateString()} - {new Date(selectedSolicitud.viaje.fechaFin).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-primary flex-shrink-0" />
                        <div>
                          <span className="text-xs text-muted-foreground">Personas</span>
                          <p className="font-medium text-foreground text-sm">{selectedSolicitud.viaje.personas} personas</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-primary flex-shrink-0" />
                        <div>
                          <span className="text-xs text-muted-foreground">Presupuesto</span>
                          <p className="font-medium text-foreground text-sm">S/ {selectedSolicitud.viaje.presupuesto.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 col-span-full">
                        <TrendingUp className="w-4 h-4 text-primary flex-shrink-0" />
                        <div>
                          <span className="text-xs text-muted-foreground">Tipo de Viaje</span>
                          <div className="mt-1">{getTipoBadge(selectedSolicitud.viaje.tipo)}</div>
                        </div>
                      </div>
                    </div>

                    {/* Imagen del destino - Compacta */}
                    <div className="relative w-full h-28 rounded-lg overflow-hidden border border-border shadow-md">
                      <img
                        src={selectedSolicitud.viaje.imagen}
                        alt={selectedSolicitud.viaje.destino}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-2 left-3 text-white">
                        <h4 className="font-semibold text-sm">{selectedSolicitud.viaje.destino}</h4>
                      </div>
                    </div>

                    {/* Descripción - Compacta */}
                    <div className="p-3 bg-gradient-to-r from-muted/30 to-muted/20 rounded-lg border border-border">
                      <h4 className="font-semibold text-foreground text-sm mb-2">Descripción del Viaje</h4>
                      <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3">{selectedSolicitud.viaje.descripcion}</p>
                    </div>

                    {/* Acciones - Botones compactos y bien organizados */}
                    <div className="flex flex-col space-y-3 pt-3 border-t border-border">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center space-x-2">
                          <MessageCircle className="w-3 h-3" />
                          <span>{selectedSolicitud.mensajes} mensajes</span>
                        </span>
                        {selectedSolicitud.tiempoRestante && (
                          <span className="flex items-center space-x-2 text-orange-600 font-medium">
                            <Clock className="w-3 h-3" />
                            <span>{selectedSolicitud.tiempoRestante} restantes</span>
                          </span>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleContactar(selectedSolicitud.cliente.email)}
                          className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground h-8 text-xs font-medium transition-all duration-200"
                        >
                          Contactar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRechazar(selectedSolicitud.id)}
                          className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground h-8 text-xs font-medium transition-all duration-200"
                        >
                          Rechazar
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleAprobar(selectedSolicitud.id)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white h-8 text-xs font-medium transition-all duration-200 shadow-lg"
                        >
                          Aprobar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            // Lista de solicitudes - Layout compacto
            <div className="divide-y divide-border/50">
              {solicitudesFiltradas.map((solicitud) => (
                <div 
                  key={solicitud.id} 
                  className={`p-3 hover:bg-muted/30 transition-all duration-200 cursor-pointer ${
                    !solicitud.leida ? 'bg-gradient-to-r from-primary/5 to-secondary/5 border-l-4 border-l-primary' : ''
                  }`}
                  onClick={() => setSelectedSolicitud(solicitud)}
                >
                  <div className="flex items-start space-x-3">
                    {/* Avatar del cliente - Compacto */}
                    <Avatar className="w-9 h-9 flex-shrink-0 border-2 border-primary/30">
                      <AvatarImage src={solicitud.cliente.avatar} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                        {solicitud.cliente.nombre.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    {/* Contenido principal - Compacto */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-foreground text-sm">
                              {solicitud.cliente.nombre}
                            </h3>
                            {!solicitud.leida && (
                              <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-lg"></div>
                            )}
                          </div>
                          <p className="text-muted-foreground text-xs mb-2 leading-relaxed">
                            ha solicitado un viaje a <span className="font-semibold text-foreground">{solicitud.viaje.destino}</span>
                          </p>
                          
                          {/* Información del viaje - Grid compacto */}
                          <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mb-2">
                            <span className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(solicitud.viaje.fechaInicio).toLocaleDateString()}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Users className="w-3 h-3" />
                              <span>{solicitud.viaje.personas} personas</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <DollarSign className="w-3 h-3" />
                              <span>S/ {solicitud.viaje.presupuesto.toLocaleString()}</span>
                            </span>
                          </div>
                          
                          {/* Badges - Compactos */}
                          <div className="flex items-center space-x-2 mb-2">
                            {getEstadoBadge(solicitud.estado)}
                            {getPrioridadBadge(solicitud.prioridad)}
                            {getTipoBadge(solicitud.viaje.tipo)}
                          </div>
                        </div>
                        
                        {/* Imagen del destino - Compacta */}
                        <div className="relative w-18 h-14 rounded overflow-hidden border border-border ml-2 flex-shrink-0 shadow-sm">
                          <img
                            src={solicitud.viaje.imagen}
                            alt={solicitud.viaje.destino}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        </div>
                      </div>
                      
                      {/* Footer de la notificación - Compacto */}
                      <div className="flex items-center justify-between pt-2 border-t border-border/50">
                        <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                          <span className="font-medium text-foreground">{formatTimeAgo(solicitud.fechaSolicitud)}</span>
                          {solicitud.mensajes > 0 && (
                            <span className="flex items-center space-x-1">
                              <MessageCircle className="w-3 h-3" />
                              <span>{solicitud.mensajes} mensajes</span>
                            </span>
                          )}
                          {solicitud.tiempoRestante && (
                            <span className="flex items-center space-x-1 text-orange-600 font-medium">
                              <Clock className="w-3 h-3" />
                              <span>{solicitud.tiempoRestante}</span>
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-5 w-5 p-0 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleMarkAsRead(solicitud.id)
                            }}
                            title={solicitud.leida ? "Marcar como no leída" : "Marcar como leída"}
                          >
                            {solicitud.leida ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-5 w-5 p-0 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
                            onClick={(e) => e.stopPropagation()}
                            title="Más opciones"
                          >
                            <MoreHorizontal className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Estado vacío - Compacto */}
          {solicitudesFiltradas.length === 0 && (
            <div className="text-center py-12">
              <div className="w-12 h-12 mx-auto bg-gradient-to-br from-muted/50 to-muted/30 rounded-full flex items-center justify-center mb-3 border border-border">
                <Bell className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1">No hay solicitudes</h3>
              <p className="text-muted-foreground text-xs max-w-xs mx-auto">
                No se encontraron solicitudes con los filtros aplicados.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
