"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Search, 
  Filter,
  Clock,
  User,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  CheckCircle,
  XCircle,
  Eye,
  MessageSquare,
  Phone,
  Mail,
  Star,
  Plane,
  Hotel,
  Car,
  Utensils,
  Camera,
  Mountain,
  Waves,
  Building,
  Heart,
  AlertCircle,
  TrendingUp,
  TrendingDown
} from 'lucide-react'

interface SolicitudPaquete {
  id: string
  cliente: {
    nombre: string
    email: string
    telefono: string
    avatar: string
    pais: string
    calificacion: number
  }
  paquete: {
    nombre: string
    destino: string
    duracion: number
    personas: number
    precio: number
    tipo: 'aventura' | 'cultural' | 'relax' | 'gastronomico' | 'ecoturismo'
    servicios: string[]
    imagen: string
  }
  fechaSolicitud: string
  fechaViaje: string
  estado: 'pendiente' | 'aprobada' | 'rechazada' | 'en_revision'
  prioridad: 'baja' | 'media' | 'alta' | 'urgente'
  comentarios: string
  presupuesto: {
    min: number
    max: number
    moneda: string
  }
  preferencias: string[]
}

export default function SolicitudesPaquetesPage() {
  const [solicitudes, setSolicitudes] = useState<SolicitudPaquete[]>([])
  const [filtros, setFiltros] = useState({
    estado: 'todos',
    prioridad: 'todos',
    destino: 'todos',
    fechaDesde: '',
    fechaHasta: ''
  })
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState<SolicitudPaquete | null>(null)
  const [modalDetalle, setModalDetalle] = useState(false)
  const [modalDecision, setModalDecision] = useState(false)
  const [decision, setDecision] = useState<'aprobada' | 'rechazada'>('aprobada')
  const [comentarioDecision, setComentarioDecision] = useState('')

  useEffect(() => {
    // Simular carga de datos
    const solicitudesData: SolicitudPaquete[] = [
      {
        id: '1',
        cliente: {
          nombre: 'María González',
          email: 'maria.gonzalez@email.com',
          telefono: '+51 999 123 456',
          avatar: '/assets/banner.jpg',
          pais: 'Perú',
          calificacion: 4.8
        },
        paquete: {
          nombre: 'Aventura en Machu Picchu',
          destino: 'Cusco, Perú',
          duracion: 7,
          personas: 4,
          precio: 2800,
          tipo: 'aventura',
          servicios: ['Guía local', 'Transporte', 'Alojamiento', 'Alimentación'],
          imagen: '/assets/banner.jpg'
        },
        fechaSolicitud: '2024-01-15',
        fechaViaje: '2024-03-20',
        estado: 'pendiente',
        prioridad: 'alta',
        comentarios: 'Cliente VIP, solicita experiencia premium con guía privado',
        presupuesto: {
          min: 2500,
          max: 3500,
          moneda: 'USD'
        },
        preferencias: ['Guía privado', 'Alojamiento 4 estrellas', 'Comida local']
      },
      {
        id: '2',
        cliente: {
          nombre: 'Carlos Rodríguez',
          email: 'carlos.rodriguez@email.com',
          telefono: '+51 998 654 321',
          avatar: '/assets/banner.jpg',
          pais: 'Argentina',
          calificacion: 4.5
        },
        paquete: {
          nombre: 'Tour Gastronómico Lima',
          destino: 'Lima, Perú',
          duracion: 5,
          personas: 2,
          precio: 1200,
          tipo: 'gastronomico',
          servicios: ['Chef privado', 'Degustaciones', 'Alojamiento boutique'],
          imagen: '/assets/banner.jpg'
        },
        fechaSolicitud: '2024-01-14',
        fechaViaje: '2024-02-15',
        estado: 'en_revision',
        prioridad: 'media',
        comentarios: 'Interesado en experiencias culinarias únicas',
        presupuesto: {
          min: 1000,
          max: 1500,
          moneda: 'USD'
        },
        preferencias: ['Restaurantes exclusivos', 'Clases de cocina', 'Mercados locales']
      },
      {
        id: '3',
        cliente: {
          nombre: 'Ana Silva',
          email: 'ana.silva@email.com',
          telefono: '+51 997 789 123',
          avatar: '/assets/banner.jpg',
          pais: 'Brasil',
          calificacion: 4.9
        },
        paquete: {
          nombre: 'Ecoturismo en Amazonas',
          destino: 'Iquitos, Perú',
          duracion: 6,
          personas: 3,
          precio: 1800,
          tipo: 'ecoturismo',
          servicios: ['Guía especializado', 'Lodge ecológico', 'Actividades sostenibles'],
          imagen: '/assets/banner.jpg'
        },
        fechaSolicitud: '2024-01-13',
        fechaViaje: '2024-04-10',
        estado: 'pendiente',
        prioridad: 'urgente',
        comentarios: 'Cliente ambientalista, requiere certificaciones de sostenibilidad',
        presupuesto: {
          min: 1500,
          max: 2200,
          moneda: 'USD'
        },
        preferencias: ['Alojamiento eco-friendly', 'Actividades de conservación', 'Comida orgánica']
      },
      {
        id: '4',
        cliente: {
          nombre: 'Luis Torres',
          email: 'luis.torres@email.com',
          telefono: '+51 996 456 789',
          avatar: '/assets/banner.jpg',
          pais: 'Chile',
          calificacion: 4.2
        },
        paquete: {
          nombre: 'Relax en Paracas',
          destino: 'Paracas, Perú',
          duracion: 4,
          personas: 2,
          precio: 800,
          tipo: 'relax',
          servicios: ['Spa', 'Yoga', 'Alojamiento frente al mar'],
          imagen: '/assets/banner.jpg'
        },
        fechaSolicitud: '2024-01-12',
        fechaViaje: '2024-02-28',
        estado: 'aprobada',
        prioridad: 'baja',
        comentarios: 'Cliente regular, siempre satisfecho',
        presupuesto: {
          min: 700,
          max: 1000,
          moneda: 'USD'
        },
        preferencias: ['Habitación con vista al mar', 'Masajes relajantes', 'Silencio']
      }
    ]
    setSolicitudes(solicitudesData)
  }, [])

  const solicitudesFiltradas = solicitudes.filter(solicitud => {
    if (filtros.estado !== 'todos' && solicitud.estado !== filtros.estado) return false
    if (filtros.prioridad !== 'todos' && solicitud.prioridad !== filtros.prioridad) return false
    if (filtros.destino !== 'todos' && !solicitud.paquete.destino.includes(filtros.destino)) return false
    return true
  })

  const handleVerDetalle = (solicitud: SolicitudPaquete) => {
    setSolicitudSeleccionada(solicitud)
    setModalDetalle(true)
  }

  const handleDecision = (solicitud: SolicitudPaquete, decision: 'aprobada' | 'rechazada') => {
    setSolicitudSeleccionada(solicitud)
    setDecision(decision)
    setModalDecision(true)
  }

  const confirmarDecision = () => {
    if (solicitudSeleccionada) {
      setSolicitudes(prev => prev.map(s => 
        s.id === solicitudSeleccionada.id 
          ? { ...s, estado: decision, comentarios: comentarioDecision }
          : s
      ))
      setModalDecision(false)
      setComentarioDecision('')
    }
  }

  const renderEstado = (estado: string) => {
    const estados = {
      pendiente: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      en_revision: { color: 'bg-blue-100 text-blue-800', icon: Eye },
      aprobada: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      rechazada: { color: 'bg-red-100 text-red-800', icon: XCircle }
    }
    const { color, icon: Icon } = estados[estado as keyof typeof estados]
    
    return (
      <Badge className={color}>
        <Icon className="w-3 h-3 mr-1" />
        {estado.replace('_', ' ')}
      </Badge>
    )
  }

  const renderPrioridad = (prioridad: string) => {
    const prioridades = {
      baja: { color: 'bg-gray-100 text-gray-800', icon: TrendingDown },
      media: { color: 'bg-blue-100 text-blue-800', icon: TrendingUp },
      alta: { color: 'bg-orange-100 text-orange-800', icon: AlertCircle },
      urgente: { color: 'bg-red-100 text-red-800', icon: Heart }
    }
    const { color, icon: Icon } = prioridades[prioridad as keyof typeof prioridades]
    
    return (
      <Badge className={color}>
        <Icon className="w-3 h-3 mr-1" />
        {prioridad}
      </Badge>
    )
  }

  const renderTipoPaquete = (tipo: string) => {
    const tipos = {
      aventura: { color: 'bg-purple-100 text-purple-800', icon: Mountain },
      cultural: { color: 'bg-indigo-100 text-indigo-800', icon: Building },
      relax: { color: 'bg-teal-100 text-teal-800', icon: Waves },
      gastronomico: { color: 'bg-orange-100 text-orange-800', icon: Utensils },
      ecoturismo: { color: 'bg-green-100 text-green-800', icon: Mountain }
    }
    const { color, icon: Icon } = tipos[tipo as keyof typeof tipos]
    
    return (
      <Badge className={color}>
        <Icon className="w-3 h-3 mr-1" />
        {tipo}
      </Badge>
    )
  }

  const estadisticas = {
    total: solicitudes.length,
    pendientes: solicitudes.filter(s => s.estado === 'pendiente').length,
    enRevision: solicitudes.filter(s => s.estado === 'en_revision').length,
    aprobadas: solicitudes.filter(s => s.estado === 'aprobada').length,
    rechazadas: solicitudes.filter(s => s.estado === 'rechazada').length
  }

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Solicitudes de Paquetes</h1>
            <p className="text-muted-foreground">Gestiona y revisa las solicitudes de paquetes turísticos</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
            <Button>
              <Search className="w-4 h-4 mr-2" />
              Buscar
            </Button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold text-foreground">{estadisticas.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pendientes</p>
                  <p className="text-2xl font-bold text-yellow-600">{estadisticas.pendientes}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Eye className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">En Revisión</p>
                  <p className="text-2xl font-bold text-blue-600">{estadisticas.enRevision}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Aprobadas</p>
                  <p className="text-2xl font-bold text-green-600">{estadisticas.aprobadas}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-red-100 rounded-lg">
                  <XCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rechazadas</p>
                  <p className="text-2xl font-bold text-red-600">{estadisticas.rechazadas}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar de Filtros */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-primary" />
                <span>Filtros</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Estado */}
              <div>
                <h3 className="font-medium mb-2">Estado</h3>
                <div className="space-y-2">
                  {['todos', 'pendiente', 'en_revision', 'aprobada', 'rechazada'].map((estado) => (
                    <label key={estado} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="estado"
                        value={estado}
                        checked={filtros.estado === estado}
                        onChange={(e) => setFiltros({...filtros, estado: e.target.value})}
                        className="text-primary"
                      />
                      <span className="text-sm capitalize">{estado.replace('_', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Prioridad */}
              <div>
                <h3 className="font-medium mb-2">Prioridad</h3>
                <div className="space-y-2">
                  {['todos', 'baja', 'media', 'alta', 'urgente'].map((prioridad) => (
                    <label key={prioridad} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="prioridad"
                        value={prioridad}
                        checked={filtros.prioridad === prioridad}
                        onChange={(e) => setFiltros({...filtros, prioridad: e.target.value})}
                        className="text-primary"
                      />
                      <span className="text-sm capitalize">{prioridad}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Destino */}
              <div>
                <h3 className="font-medium mb-2">Destino</h3>
                <div className="space-y-2">
                  {['todos', 'Cusco', 'Lima', 'Iquitos', 'Paracas'].map((destino) => (
                    <label key={destino} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="destino"
                        value={destino}
                        checked={filtros.destino === destino}
                        onChange={(e) => setFiltros({...filtros, destino: e.target.value})}
                        className="text-primary"
                      />
                      <span className="text-sm">{destino}</span>
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Solicitudes */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Solicitudes ({solicitudesFiltradas.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {solicitudesFiltradas.map((solicitud) => (
                  <div key={solicitud.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-4">
                      {/* Avatar del Cliente */}
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={solicitud.cliente.avatar} />
                        <AvatarFallback>{solicitud.cliente.nombre.charAt(0)}</AvatarFallback>
                      </Avatar>

                      {/* Información Principal */}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-foreground">{solicitud.cliente.nombre}</h3>
                            <p className="text-sm text-muted-foreground">{solicitud.cliente.email}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {renderEstado(solicitud.estado)}
                            {renderPrioridad(solicitud.prioridad)}
                          </div>
                        </div>

                        {/* Detalles del Paquete */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <h4 className="font-medium text-foreground">{solicitud.paquete.nombre}</h4>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4" />
                              <span>{solicitud.paquete.destino}</span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{solicitud.paquete.duracion} días</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>{solicitud.paquete.personas} personas</span>
                              </div>
                            </div>
                            {renderTipoPaquete(solicitud.paquete.tipo)}
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Presupuesto:</span>
                              <span className="font-medium text-foreground">
                                {solicitud.presupuesto.moneda} {solicitud.presupuesto.min} - {solicitud.presupuesto.max}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Fecha Viaje:</span>
                              <span className="font-medium text-foreground">{solicitud.fechaViaje}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span className="text-sm text-muted-foreground">{solicitud.cliente.calificacion}</span>
                            </div>
                          </div>
                        </div>

                        {/* Comentarios */}
                        {solicitud.comentarios && (
                          <div className="bg-muted/30 rounded-lg p-3">
                            <p className="text-sm text-muted-foreground">{solicitud.comentarios}</p>
                          </div>
                        )}

                        {/* Acciones */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleVerDetalle(solicitud)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Ver Detalle
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Contactar
                            </Button>
                          </div>

                          {solicitud.estado === 'pendiente' && (
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleDecision(solicitud, 'aprobada')}
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Aprobar
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDecision(solicitud, 'rechazada')}
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Rechazar
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal de Detalle */}
      {modalDetalle && solicitudSeleccionada && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b p-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Detalle de Solicitud</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setModalDetalle(false)}
              >
                <XCircle className="w-6 h-6" />
              </Button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Información del Cliente */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-primary">Información del Cliente</h3>
                    <div className="flex items-center space-x-4 mb-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={solicitudSeleccionada.cliente.avatar} />
                        <AvatarFallback className="text-lg">{solicitudSeleccionada.cliente.nombre.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="text-lg font-semibold">{solicitudSeleccionada.cliente.nombre}</h4>
                        <p className="text-muted-foreground">{solicitudSeleccionada.cliente.pais}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm">{solicitudSeleccionada.cliente.calificacion}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{solicitudSeleccionada.cliente.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{solicitudSeleccionada.cliente.telefono}</span>
                      </div>
                    </div>
                  </div>

                  {/* Preferencias */}
                  <div>
                    <h4 className="font-medium mb-3">Preferencias del Cliente</h4>
                    <div className="space-y-2">
                      {solicitudSeleccionada.preferencias.map((preferencia, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-sm text-muted-foreground">{preferencia}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Información del Paquete */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-primary">Detalles del Paquete</h3>
                    <div className="space-y-4">
                      <div className="relative">
                        <img
                          src={solicitudSeleccionada.paquete.imagen}
                          alt={solicitudSeleccionada.paquete.nombre}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute top-3 right-3">
                          {renderTipoPaquete(solicitudSeleccionada.paquete.tipo)}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold">{solicitudSeleccionada.paquete.nombre}</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span>{solicitudSeleccionada.paquete.destino}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span>{solicitudSeleccionada.paquete.duracion} días</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span>{solicitudSeleccionada.paquete.personas} personas</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <DollarSign className="w-4 h-4 text-muted-foreground" />
                            <span>US$ {solicitudSeleccionada.paquete.precio}</span>
                          </div>
                        </div>
                      </div>

                      {/* Servicios */}
                      <div>
                        <h4 className="font-medium mb-3">Servicios Incluidos</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {solicitudSeleccionada.paquete.servicios.map((servicio, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-muted-foreground">{servicio}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Presupuesto */}
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Presupuesto</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Rango:</span>
                        <span className="font-semibold">
                          {solicitudSeleccionada.presupuesto.moneda} {solicitudSeleccionada.presupuesto.min} - {solicitudSeleccionada.presupuesto.max}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Fecha Solicitud:</span>
                        <span className="font-medium">{solicitudSeleccionada.fechaSolicitud}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Fecha Viaje:</span>
                        <span className="font-medium">{solicitudSeleccionada.fechaViaje}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Decisión */}
      {modalDecision && solicitudSeleccionada && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="text-center mb-6">
                <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                  decision === 'aprobada' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {decision === 'aprobada' ? (
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  ) : (
                    <XCircle className="w-8 h-8 text-red-600" />
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {decision === 'aprobada' ? 'Aprobar Solicitud' : 'Rechazar Solicitud'}
                </h3>
                <p className="text-muted-foreground">
                  {decision === 'aprobada' 
                    ? '¿Estás seguro de que quieres aprobar esta solicitud?'
                    : '¿Estás seguro de que quieres rechazar esta solicitud?'
                  }
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Comentario (opcional)</label>
                  <textarea
                    value={comentarioDecision}
                    onChange={(e) => setComentarioDecision(e.target.value)}
                    placeholder="Agrega un comentario sobre tu decisión..."
                    className="w-full p-3 border rounded-lg resize-none"
                    rows={3}
                  />
                </div>

                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setModalDecision(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className={`flex-1 ${
                      decision === 'aprobada' 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-red-600 hover:bg-red-700'
                    }`}
                    onClick={confirmarDecision}
                  >
                    {decision === 'aprobada' ? 'Aprobar' : 'Rechazar'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 