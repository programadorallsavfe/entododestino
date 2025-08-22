"use client"

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  ArrowLeft,
  Plane,
  Bed,
  Car,
  Utensils,
  Clock,
  MapPin,
  Star,
  Users,
  Heart,
  Share2,
  CreditCard,
  Shield,
  CheckCircle,
  Phone,
  Mail,
  Globe,
  Bus,
  Train,
  Ship,
  Wifi,
  Snowflake,
  Building,
  Eye,
  BaggageClaim,
  Calendar,
  Navigation,
  Award,
  Zap,
  Gift,
  DollarSign,
  Info,
  ArrowRight,
  ChevronRight,
  Map,
  Camera,
  Play,
  Pause,
  SkipForward,
  SkipBack
} from 'lucide-react'

interface PaqueteDetalles {
  id: string
  nombre: string
  tipo: 'hotel' | 'apartamento' | 'hostal' | 'boutique'
  ubicacion: string
  distanciaCentro: string
  calificacion: number
  estrellas: number
  duracion: number
  noches: number
  fechaInicio: string
  fechaFin: string
  precio: number
  precioDescuento?: number
  descuentoTarjeta?: number
  imagen: string
  servicios: string[]
  personas: number
  descripcion: string
  vuelo: {
    aerolinea: string
    tipo: 'directo' | 'con-escalas'
    origen: string
    destino: string
    codigoOrigen: string
    codigoDestino: string
    horaSalida: string
    horaLlegada: string
    escalas: number
    equipaje: 'mano' | 'bodega' | 'ambos'
    duracion: string
  }
  hotel: {
    nombre: string
    tipo: string
    estrellas: number
    ubicacion: string
    servicios: string[]
    habitacion: string
    desayuno: boolean
    almuerzo: boolean
    cena: boolean
    wifi: boolean
    estacionamiento: boolean
    piscina: boolean
    spa: boolean
  }
  transporte: {
    tipo: 'avion' | 'bus' | 'tren' | 'barco' | 'auto'
    descripcion: string
    incluido: boolean
    detalles: string
  }
  itinerario: {
    dia: number
    actividades: string[]
    comidas: string[]
    transporte: string
    alojamiento: string
  }[]
  disponibilidad: number
  reservaFlexible: boolean
  cuotasSinInteres: boolean
  puntosLoyalty: number
  politicas: {
    cancelacion: string
    cambio: string
    equipaje: string
    checkIn: string
  }
}

export default function DetallePaquetePage() {
  const searchParams = useSearchParams()
  const paqueteId = searchParams.get('id')
  
  const [paquete, setPaquete] = useState<PaqueteDetalles | null>(null)

  // Datos simulados del paquete
  useEffect(() => {
    if (paqueteId) {
      const mockPaquete: PaqueteDetalles = {
        id: paqueteId,
        nombre: "Paquete Cusco Mágico - 4 Días",
        tipo: 'hotel',
        ubicacion: 'Cusco, Perú',
        distanciaCentro: '500m del centro histórico',
        calificacion: 9.2,
        estrellas: 4,
        duracion: 4,
        noches: 3,
        fechaInicio: '2025-08-15',
        fechaFin: '2025-08-18',
        precio: 899,
        precioDescuento: 799,
        descuentoTarjeta: 50,
        imagen: '/assets/banner.jpg',
        servicios: ['WiFi', 'Desayuno incluido', 'Traslados', 'Guía turístico', 'Seguro de viaje'],
        personas: 2,
        descripcion: "Descubre la magia de Cusco con este paquete completo que incluye vuelo directo, alojamiento en hotel 4 estrellas, traslados, guía turístico y las mejores experiencias de la ciudad imperial.",
        vuelo: {
          aerolinea: 'LATAM',
          tipo: 'directo',
          origen: 'Lima',
          destino: 'Cusco',
          codigoOrigen: 'LIM',
          codigoDestino: 'CUZ',
          horaSalida: '08:00',
          horaLlegada: '09:15',
          escalas: 0,
          equipaje: 'ambos',
          duracion: '1h 15m'
        },
        hotel: {
          nombre: 'Hotel Cusco Imperial',
          tipo: 'Hotel 4 Estrellas',
          estrellas: 4,
          ubicacion: 'Calle San Agustín 123, Cusco',
          servicios: ['WiFi gratuito', 'Restaurante', 'Bar', 'Spa', 'Gimnasio', 'Piscina'],
          habitacion: 'Habitación Superior con vista a la ciudad',
          desayuno: true,
          almuerzo: false,
          cena: false,
          wifi: true,
          estacionamiento: true,
          piscina: true,
          spa: true
        },
        transporte: {
          tipo: 'auto',
          descripcion: 'Traslados privados desde/hacia el aeropuerto',
          incluido: true,
          detalles: 'Incluye traslados privados en vehículos modernos con aire acondicionado'
        },
        itinerario: [
          {
            dia: 1,
            actividades: ['Llegada a Cusco', 'Check-in en hotel', 'Cena de bienvenida', 'Descanso para aclimatación'],
            comidas: ['Cena incluida'],
            transporte: 'Traslado desde aeropuerto',
            alojamiento: 'Hotel Cusco Imperial'
          },
          {
            dia: 2,
            actividades: ['Desayuno en hotel', 'City tour por Cusco', 'Visita a Sacsayhuamán', 'Tiempo libre en Plaza de Armas'],
            comidas: ['Desayuno incluido', 'Almuerzo en restaurante local'],
            transporte: 'Bus turístico + caminata',
            alojamiento: 'Hotel Cusco Imperial'
          },
          {
            dia: 3,
            actividades: ['Excursión al Valle Sagrado', 'Visita a Pisac y Ollantaytambo', 'Mercado artesanal'],
            comidas: ['Desayuno incluido', 'Almuerzo buffet en Valle Sagrado'],
            transporte: 'Bus turístico con guía',
            alojamiento: 'Hotel Cusco Imperial'
          },
          {
            dia: 4,
            actividades: ['Desayuno en hotel', 'Check-out', 'Compras de última hora', 'Traslado al aeropuerto'],
            comidas: ['Desayuno incluido'],
            transporte: 'Traslado al aeropuerto',
            alojamiento: 'N/A'
          }
        ],
        disponibilidad: 15,
        reservaFlexible: true,
        cuotasSinInteres: true,
        puntosLoyalty: 180,
        politicas: {
          cancelacion: 'Gratuita hasta 48h antes',
          cambio: 'Permitido con cargo hasta 24h antes',
          equipaje: '1 maleta de mano + 1 equipaje facturado',
          checkIn: '15:00 - Check-out: 11:00'
        }
      }
      setPaquete(mockPaquete)
    }
  }, [paqueteId])

  const handleWhatsAppContact = () => {
    if (!paquete) return
    
    const message = `Cotización de Paquete Turístico

${paquete.nombre}
${paquete.ubicacion}
${paquete.calificacion}/10 - ${paquete.estrellas} estrellas
${paquete.personas} personas
${paquete.noches} noches

Vuelo ${paquete.vuelo.tipo === 'directo' ? 'Directo' : `con ${paquete.vuelo.escalas} escala`}
${paquete.vuelo.codigoOrigen} → ${paquete.vuelo.codigoDestino}
${paquete.vuelo.aerolinea}

Precio por persona: US$ ${paquete.precio}
Total ${paquete.personas} personas: US$ ${paquete.precio * paquete.personas}
${paquete.descuentoTarjeta ? `Descuento tarjeta: US$ ${paquete.descuentoTarjeta}` : ''}

Puntos a ganar: ${paquete.puntosLoyalty}

¿Te interesa este paquete? ¡Contáctanos para más detalles!`

    const numeroWhatsApp = '51999999999'
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(message)}`
    window.open(urlWhatsApp, '_blank')
  }

  const handleReservar = () => {
    alert('¡Reserva realizada con éxito! Te contactaremos pronto.')
  }

  if (!paquete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando detalles del paquete...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header con navegación */}
      <div className="bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Section con imagen principal */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={paquete.imagen}
                alt={paquete.nombre}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Badge de calificación */}
              <div className="absolute top-6 right-6">
                <Badge className="bg-white/90 text-foreground px-3 py-2 text-sm font-semibold">
                  <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                  {paquete.calificacion}/10
                </Badge>
              </div>

              {/* Información principal superpuesta */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="flex items-center space-x-2 mb-3">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {paquete.tipo}
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    <MapPin className="w-3 h-3 mr-1" />
                    {paquete.distanciaCentro}
                  </Badge>
                </div>
                <h1 className="text-4xl font-bold mb-3">{paquete.nombre}</h1>
                <p className="text-lg text-white/90 max-w-2xl">{paquete.descripcion}</p>
              </div>
            </div>

            {/* Información del viaje en cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="text-center p-4 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-sm font-medium text-muted-foreground">Duración</div>
                <div className="text-2xl font-bold text-primary">{paquete.duracion} días</div>
              </Card>
              <Card className="text-center p-4 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <Bed className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-sm font-medium text-muted-foreground">Noches</div>
                <div className="text-2xl font-bold text-primary">{paquete.noches}</div>
              </Card>
              <Card className="text-center p-4 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-sm font-medium text-muted-foreground">Personas</div>
                <div className="text-2xl font-bold text-primary">{paquete.personas}</div>
              </Card>
              <Card className="text-center p-4 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-sm font-medium text-muted-foreground">Disponible</div>
                <div className="text-2xl font-bold text-primary">{paquete.disponibilidad}</div>
              </Card>
            </div>

            {/* Detalles del vuelo */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center">
                  <Plane className="w-6 h-6 mr-3 text-primary" />
                  Detalles del Vuelo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">{paquete.vuelo.horaSalida}</div>
                      <div className="text-sm text-muted-foreground font-mono">{paquete.vuelo.codigoOrigen}</div>
                      <div className="text-xs text-muted-foreground">{paquete.vuelo.origen}</div>
                    </div>
                    <div className="flex-1 mx-6">
                      <div className="flex items-center justify-center">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <div className="flex-1 h-1 bg-gradient-to-r from-primary to-primary/50 mx-3"></div>
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                      </div>
                      <div className="text-center text-sm text-muted-foreground mt-3 font-medium">
                        {paquete.vuelo.duracion}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">{paquete.vuelo.horaLlegada}</div>
                      <div className="text-sm text-muted-foreground font-mono">{paquete.vuelo.codigoDestino}</div>
                      <div className="text-xs text-muted-foreground">{paquete.vuelo.destino}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-center">
                    <div className="bg-white/60 rounded-lg p-3">
                      <div className="text-sm text-muted-foreground">Aerolínea</div>
                      <div className="font-semibold">{paquete.vuelo.aerolinea}</div>
                    </div>
                    <div className="bg-white/60 rounded-lg p-3">
                      <div className="text-sm text-muted-foreground">Tipo</div>
                      <div className="font-semibold">
                        {paquete.vuelo.tipo === 'directo' ? 'Directo' : `Con ${paquete.vuelo.escalas} escala`}
                      </div>
                    </div>
                    <div className="bg-white/60 rounded-lg p-3">
                      <div className="text-sm text-muted-foreground">Equipaje</div>
                      <div className="font-semibold capitalize">{paquete.vuelo.equipaje}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detalles del hotel */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center">
                  <Building className="w-6 h-6 mr-3 text-primary" />
                  Alojamiento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-xl">{paquete.hotel.nombre}</h4>
                      <p className="text-muted-foreground">{paquete.hotel.tipo}</p>
                      <div className="flex items-center mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < paquete.hotel.estrellas ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-sm px-3 py-1">
                      {paquete.hotel.habitacion}
                    </Badge>
                  </div>
                  
                  {/* Servicios del hotel */}
                  <div>
                    <h5 className="font-medium mb-3 text-muted-foreground">Servicios Incluidos</h5>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {paquete.hotel.servicios.map((servicio, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm bg-white/60 rounded-lg p-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{servicio}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Comidas incluidas */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                    <h5 className="font-medium mb-3 flex items-center">
                      <Utensils className="w-5 h-5 mr-2 text-green-600" />
                      Plan de Comidas
                    </h5>
                    <div className="grid grid-cols-3 gap-4">
                      <div className={`text-center p-3 rounded-lg ${paquete.hotel.desayuno ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                        <div className="text-sm font-medium">Desayuno</div>
                        <div className="text-xs">{paquete.hotel.desayuno ? 'Incluido' : 'No incluido'}</div>
                      </div>
                      <div className={`text-center p-3 rounded-lg ${paquete.hotel.almuerzo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                        <div className="text-sm font-medium">Almuerzo</div>
                        <div className="text-xs">{paquete.hotel.almuerzo ? 'Incluido' : 'No incluido'}</div>
                      </div>
                      <div className={`text-center p-3 rounded-lg ${paquete.hotel.cena ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                        <div className="text-sm font-medium">Cena</div>
                        <div className="text-xs">{paquete.hotel.cena ? 'Incluido' : 'No incluido'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transporte */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center">
                  {paquete.transporte.tipo === 'avion' && <Plane className="w-6 h-6 mr-3 text-primary" />}
                  {paquete.transporte.tipo === 'bus' && <Bus className="w-6 h-6 mr-3 text-primary" />}
                  {paquete.transporte.tipo === 'tren' && <Train className="w-6 h-6 mr-3 text-primary" />}
                  {paquete.transporte.tipo === 'barco' && <Ship className="w-6 h-6 mr-3 text-primary" />}
                  {paquete.transporte.tipo === 'auto' && <Car className="w-6 h-6 mr-3 text-primary" />}
                  Transporte
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-lg">{paquete.transporte.descripcion}</h4>
                      <p className="text-muted-foreground">{paquete.transporte.detalles}</p>
                    </div>
                    <Badge variant={paquete.transporte.incluido ? 'default' : 'secondary'} className="text-sm px-4 py-2">
                      {paquete.transporte.incluido ? 'Incluido' : 'No incluido'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Itinerario día a día */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center">
                  <Navigation className="w-6 h-6 mr-3 text-primary" />
                  Itinerario del Viaje
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {paquete.itinerario.map((dia, index) => (
                    <div key={dia.dia} className="relative">
                      {/* Línea de tiempo */}
                      {index < paquete.itinerario.length - 1 && (
                        <div className="absolute left-6 top-16 w-0.5 h-16 bg-gradient-to-b from-primary to-primary/30"></div>
                      )}
                      
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg z-10 relative">
                            {dia.dia}
                          </div>
                        </div>
                        
                        <div className="flex-1 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-6">
                          <div className="flex items-start justify-between mb-4">
                            <h4 className="font-semibold text-lg">Día {dia.dia}</h4>
                            <Badge variant="outline" className="bg-white/60">
                              {dia.alojamiento}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                              <h5 className="font-medium text-sm text-muted-foreground mb-3 flex items-center">
                                <Play className="w-4 h-4 mr-2 text-primary" />
                                Actividades
                              </h5>
                              <ul className="space-y-2">
                                {dia.actividades.map((actividad, actIndex) => (
                                  <li key={actIndex} className="text-sm flex items-start">
                                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    {actividad}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h5 className="font-medium text-sm text-muted-foreground mb-3 flex items-center">
                                <Utensils className="w-4 h-4 mr-2 text-primary" />
                                Comidas
                              </h5>
                              <ul className="space-y-2">
                                {dia.comidas.map((comida, comIndex) => (
                                  <li key={comIndex} className="text-sm flex items-start">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    {comida}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h5 className="font-medium text-sm text-muted-foreground mb-3 flex items-center">
                                <Car className="w-4 h-4 mr-2 text-primary" />
                                Transporte
                              </h5>
                              <p className="text-sm">{dia.transporte}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Políticas */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-primary" />
                  Políticas del Paquete
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                    <span className="text-sm font-medium">Cancelación</span>
                    <span className="text-sm text-muted-foreground">{paquete.politicas.cancelacion}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                    <span className="text-sm font-medium">Cambios</span>
                    <span className="text-sm text-muted-foreground">{paquete.politicas.cambio}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                    <span className="text-sm font-medium">Equipaje</span>
                    <span className="text-sm text-muted-foreground">{paquete.politicas.equipaje}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
                    <span className="text-sm font-medium">Check-in/out</span>
                    <span className="text-sm text-muted-foreground">{paquete.politicas.checkIn}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar de reserva */}
          <div className="space-y-6">
            {/* Tarjeta de reserva */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-t-lg">
                <CardTitle className="text-xl text-white">Reservar Paquete</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Precio destacado */}
                <div className="text-center bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <div className="text-sm text-green-600 font-medium mb-2">Precio por persona</div>
                  <div className="text-4xl font-bold text-green-700 mb-2">
                    US$ {paquete.precio}
                  </div>
                  <div className="text-sm text-green-600">
                    Total {paquete.personas} personas: US$ {paquete.precio * paquete.personas}
                  </div>
                </div>

                {/* Descuentos */}
                {paquete.descuentoTarjeta && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Gift className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">Descuento tarjeta</span>
                      </div>
                      <span className="text-lg font-bold text-blue-700">-US$ {paquete.descuentoTarjeta}</span>
                    </div>
                  </div>
                )}

                {/* Precio final */}
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">Precio final</span>
                    <span className="text-2xl font-bold text-primary">
                      US$ {(paquete.precio * paquete.personas) - (paquete.descuentoTarjeta || 0)}
                    </span>
                  </div>
                </div>

                {/* Botón de reserva */}
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white py-6 text-lg font-semibold shadow-lg" 
                  size="lg"
                  onClick={handleReservar}
                >
                  <CreditCard className="w-5 h-5 mr-3" />
                  Reservar Ahora
                </Button>

                {/* Información adicional */}
                <div className="space-y-3 text-center text-sm text-muted-foreground">
                  <div className="flex items-center justify-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>Reserva segura</span>
                  </div>
                  {paquete.reservaFlexible && (
                    <div className="flex items-center justify-center space-x-2">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span>Reserva flexible disponible</span>
                    </div>
                  )}
                  {paquete.cuotasSinInteres && (
                    <div className="flex items-center justify-center space-x-2">
                      <CreditCard className="w-4 h-4 text-blue-500" />
                      <span>Cuotas sin interés</span>
                    </div>
                  )}
                  <div className="flex items-center justify-center space-x-2">
                    <Award className="w-4 h-4 text-purple-500" />
                    <span>{paquete.puntosLoyalty} puntos a ganar</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Información de contacto */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-primary" />
                  Contacto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* WhatsApp */}
                <Button 
                  variant="outline" 
                  className="w-full bg-green-500 text-white hover:bg-green-600 border-green-500 shadow-lg"
                  onClick={handleWhatsAppContact}
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Contactar por WhatsApp
                </Button>

                {/* Otros contactos */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">+51 999 999 999</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                    <Mail className="w-4 h-4 text-green-600" />
                    <span className="text-sm">reservas@turismo.com</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                    <Globe className="w-4 h-4 text-purple-600" />
                    <span className="text-sm">www.turismo.com</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
