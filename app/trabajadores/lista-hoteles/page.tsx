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
  MapPin,
  Star,
  Users,
  DollarSign,
  Calendar,
  Clock,
  Building,
  Wifi,
  Car,
  Utensils,
  Eye,
  Edit,
  Trash2,
  Plus,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  AlertCircle,
  Phone,
  Mail,
  Globe
} from 'lucide-react'

interface Hotel {
  id: string
  nombre: string
  cadena: string
  categoria: number
  direccion: string
  ciudad: string
  pais: string
  telefono: string
  email: string
  sitioWeb: string
  coordenadas: {
    lat: number
    lng: number
  }
  descripcion: string
  servicios: string[]
  habitaciones: {
    total: number
    disponibles: number
    ocupadas: number
    mantenimiento: number
  }
  precios: {
    simple: number
    doble: number
    suite: number
    moneda: string
  }
  calificacion: number
  reseñas: number
  estado: 'activo' | 'inactivo' | 'mantenimiento'
  ultimaActualizacion: string
  imagenes: string[]
  contacto: {
    gerente: string
    telefonoGerente: string
    emailGerente: string
  }
  politicas: {
    checkIn: string
    checkOut: string
    cancelacion: string
    mascotas: boolean
    fumadores: boolean
  }
}

export default function ListaHotelesPage() {
  const [hoteles, setHoteles] = useState<Hotel[]>([])
  const [filtros, setFiltros] = useState({
    categoria: 'todos',
    ciudad: 'todos',
    estado: 'todos',
    precio: 'todos',
    servicios: 'todos'
  })
  const [hotelSeleccionado, setHotelSeleccionado] = useState<Hotel | null>(null)
  const [modalDetalle, setModalDetalle] = useState(false)
  const [modalEditar, setModalEditar] = useState(false)
  const [modalEliminar, setModalEliminar] = useState(false)

  useEffect(() => {
    // Simular carga de datos de hoteles
    const hotelesData: Hotel[] = [
      {
        id: '1',
        nombre: 'Hotel Plaza Mayor',
        cadena: 'Plaza Hotels',
        categoria: 5,
        direccion: 'Av. Principal 123',
        ciudad: 'Lima',
        pais: 'Perú',
        telefono: '+51 1 234 5678',
        email: 'info@plazamayor.com',
        sitioWeb: 'www.plazamayor.com',
        coordenadas: { lat: -12.0464, lng: -77.0428 },
        descripcion: 'Hotel de lujo en el corazón histórico de Lima, con vistas panorámicas y servicio de primera clase.',
        servicios: ['WiFi gratuito', 'Estacionamiento', 'Restaurante', 'Piscina', 'Spa', 'Gimnasio', 'Room service 24h'],
        habitaciones: { total: 150, disponibles: 45, ocupadas: 95, mantenimiento: 10 },
        precios: { simple: 120, doble: 180, suite: 350, moneda: 'USD' },
        calificacion: 4.8,
        reseñas: 1247,
        estado: 'activo',
        ultimaActualizacion: '2024-01-15',
        imagenes: ['/assets/banner.jpg', '/assets/banner.jpg'],
        contacto: {
          gerente: 'Carlos Mendoza',
          telefonoGerente: '+51 1 234 5679',
          emailGerente: 'gerente@plazamayor.com'
        },
        politicas: {
          checkIn: '15:00',
          checkOut: '11:00',
          cancelacion: '24h antes',
          mascotas: true,
          fumadores: false
        }
      },
      {
        id: '2',
        nombre: 'Cusco Heritage Inn',
        cadena: 'Heritage Collection',
        categoria: 4,
        direccion: 'Calle San Agustín 456',
        ciudad: 'Cusco',
        pais: 'Perú',
        telefono: '+51 84 234 567',
        email: 'info@cuscoheritage.com',
        sitioWeb: 'www.cuscoheritage.com',
        coordenadas: { lat: -13.5225, lng: -71.9682 },
        descripcion: 'Hotel boutique colonial en el centro histórico de Cusco, perfecto para explorar la ciudad inca.',
        servicios: ['WiFi gratuito', 'Desayuno incluido', 'Tours guiados', 'Bar', 'Terraza', 'Recepción 24h'],
        habitaciones: { total: 45, disponibles: 12, ocupadas: 28, mantenimiento: 5 },
        precios: { simple: 85, doble: 120, suite: 200, moneda: 'USD' },
        calificacion: 4.6,
        reseñas: 892,
        estado: 'activo',
        ultimaActualizacion: '2024-01-14',
        imagenes: ['/assets/banner.jpg', '/assets/banner.jpg'],
        contacto: {
          gerente: 'Ana Quispe',
          telefonoGerente: '+51 84 234 568',
          emailGerente: 'gerente@cuscoheritage.com'
        },
        politicas: {
          checkIn: '14:00',
          checkOut: '10:00',
          cancelacion: '48h antes',
          mascotas: false,
          fumadores: false
        }
      },
      {
        id: '3',
        nombre: 'Paracas Beach Resort',
        cadena: 'Beach Resorts',
        categoria: 5,
        direccion: 'Km 245 Panamericana Sur',
        ciudad: 'Paracas',
        pais: 'Perú',
        telefono: '+51 56 234 567',
        email: 'info@paracasbeach.com',
        sitioWeb: 'www.paracasbeach.com',
        coordenadas: { lat: -13.7500, lng: -76.1667 },
        descripcion: 'Resort de lujo frente al mar con acceso directo a la playa y actividades acuáticas.',
        servicios: ['WiFi gratuito', 'Piscina infinita', 'Spa', 'Restaurante gourmet', 'Actividades acuáticas', 'Kids club'],
        habitaciones: { total: 120, disponibles: 25, ocupadas: 85, mantenimiento: 10 },
        precios: { simple: 200, doble: 280, suite: 450, moneda: 'USD' },
        calificacion: 4.9,
        reseñas: 1567,
        estado: 'activo',
        ultimaActualizacion: '2024-01-16',
        imagenes: ['/assets/banner.jpg', '/assets/banner.jpg'],
        contacto: {
          gerente: 'María González',
          telefonoGerente: '+51 56 234 568',
          emailGerente: 'gerente@paracasbeach.com'
        },
        politicas: {
          checkIn: '16:00',
          checkOut: '12:00',
          cancelacion: '72h antes',
          mascotas: true,
          fumadores: false
        }
      },
      {
        id: '4',
        nombre: 'Arequipa Colonial Hotel',
        cadena: 'Colonial Hotels',
        categoria: 3,
        direccion: 'Calle La Merced 789',
        ciudad: 'Arequipa',
        pais: 'Perú',
        telefono: '+51 54 234 567',
        email: 'info@arequipacolonial.com',
        sitioWeb: 'www.arequipacolonial.com',
        coordenadas: { lat: -16.4090, lng: -71.5375 },
        descripcion: 'Hotel colonial restaurado en el centro histórico de Arequipa, con arquitectura tradicional.',
        servicios: ['WiFi gratuito', 'Desayuno continental', 'Patio interior', 'Recepción 24h'],
        habitaciones: { total: 35, disponibles: 8, ocupadas: 22, mantenimiento: 5 },
        precios: { simple: 65, doble: 95, suite: 150, moneda: 'USD' },
        calificacion: 4.3,
        reseñas: 456,
        estado: 'activo',
        ultimaActualizacion: '2024-01-13',
        imagenes: ['/assets/banner.jpg', '/assets/banner.jpg'],
        contacto: {
          gerente: 'Luis Torres',
          telefonoGerente: '+51 54 234 568',
          emailGerente: 'gerente@arequipacolonial.com'
        },
        politicas: {
          checkIn: '14:00',
          checkOut: '10:00',
          cancelacion: '24h antes',
          mascotas: false,
          fumadores: false
        }
      },
      {
        id: '5',
        nombre: 'Iquitos Amazon Lodge',
        cadena: 'Amazon Lodges',
        categoria: 4,
        direccion: 'Río Amazonas Km 15',
        ciudad: 'Iquitos',
        pais: 'Perú',
        telefono: '+51 65 234 567',
        email: 'info@iquitosamazon.com',
        sitioWeb: 'www.iquitosamazon.com',
        coordenadas: { lat: -3.7450, lng: -73.2422 },
        descripcion: 'Lodge ecológico en la selva amazónica con experiencias de naturaleza y aventura.',
        servicios: ['WiFi limitado', 'Alimentación incluida', 'Guías locales', 'Actividades de selva', 'Observación de fauna'],
        habitaciones: { total: 25, disponibles: 5, ocupadas: 18, mantenimiento: 2 },
        precios: { simple: 150, doble: 220, suite: 320, moneda: 'USD' },
        calificacion: 4.7,
        reseñas: 678,
        estado: 'activo',
        ultimaActualizacion: '2024-01-17',
        imagenes: ['/assets/banner.jpg', '/assets/banner.jpg'],
        contacto: {
          gerente: 'Roberto Silva',
          telefonoGerente: '+51 65 234 568',
          emailGerente: 'gerente@iquitosamazon.com'
        },
        politicas: {
          checkIn: '13:00',
          checkOut: '09:00',
          cancelacion: '7 días antes',
          mascotas: false,
          fumadores: false
        }
      }
    ]
    setHoteles(hotelesData)
  }, [])

  const hotelesFiltrados = hoteles.filter(hotel => {
    if (filtros.categoria !== 'todos' && hotel.categoria !== parseInt(filtros.categoria)) return false
    if (filtros.ciudad !== 'todos' && hotel.ciudad !== filtros.ciudad) return false
    if (filtros.estado !== 'todos' && hotel.estado !== filtros.estado) return false
    if (filtros.precio !== 'todos') {
      const precioPromedio = (hotel.precios.simple + hotel.precios.doble) / 2
      if (filtros.precio === 'economico' && precioPromedio > 100) return false
      if (filtros.precio === 'medio' && (precioPromedio <= 100 || precioPromedio > 200)) return false
      if (filtros.precio === 'lujo' && precioPromedio <= 200) return false
    }
    return true
  })

  const handleVerDetalle = (hotel: Hotel) => {
    setHotelSeleccionado(hotel)
    setModalDetalle(true)
  }

  const handleEditar = (hotel: Hotel) => {
    setHotelSeleccionado(hotel)
    setModalEditar(true)
  }

  const handleEliminar = (hotel: Hotel) => {
    setHotelSeleccionado(hotel)
    setModalEliminar(true)
  }

  const confirmarEliminar = () => {
    if (hotelSeleccionado) {
      setHoteles(prev => prev.filter(h => h.id !== hotelSeleccionado.id))
      setModalEliminar(false)
    }
  }

  const renderCategoria = (categoria: number) => {
    const estrellas = '★'.repeat(categoria) + '☆'.repeat(5 - categoria)
    return (
      <div className="flex items-center space-x-1">
        <span className="text-yellow-500 text-sm">{estrellas}</span>
        <span className="text-xs text-muted-foreground">({categoria})</span>
      </div>
    )
  }

  const renderEstado = (estado: string) => {
    const estados = {
      activo: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      inactivo: { color: 'bg-gray-100 text-gray-800', icon: XCircle },
      mantenimiento: { color: 'bg-orange-100 text-orange-800', icon: AlertCircle }
    }
    const { color, icon: Icon } = estados[estado as keyof typeof estados]
    
    return (
      <Badge className={color}>
        <Icon className="w-3 h-3 mr-1" />
        {estado}
      </Badge>
    )
  }

  const estadisticas = {
    total: hoteles.length,
    activos: hoteles.filter(h => h.estado === 'activo').length,
    inactivos: hoteles.filter(h => h.estado === 'inactivo').length,
    mantenimiento: hoteles.filter(h => h.estado === 'mantenimiento').length,
    cincoEstrellas: hoteles.filter(h => h.categoria === 5).length,
    cuatroEstrellas: hoteles.filter(h => h.categoria === 4).length,
    tresEstrellas: hoteles.filter(h => h.categoria === 3).length
  }

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestión de Hoteles</h1>
            <p className="text-muted-foreground">Administra todos los hoteles del sistema</p>
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
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Building className="w-5 h-5 text-blue-600" />
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
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Activos</p>
                  <p className="text-2xl font-bold text-green-600">{estadisticas.activos}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mantenimiento</p>
                  <p className="text-2xl font-bold text-orange-600">{estadisticas.mantenimiento}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Star className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">5 Estrellas</p>
                  <p className="text-2xl font-bold text-yellow-600">{estadisticas.cincoEstrellas}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Star className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">4 Estrellas</p>
                  <p className="text-2xl font-bold text-blue-600">{estadisticas.cuatroEstrellas}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Star className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">3 Estrellas</p>
                  <p className="text-2xl font-bold text-purple-600">{estadisticas.tresEstrellas}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Users className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ocupación</p>
                  <p className="text-2xl font-bold text-gray-600">
                    {Math.round((hoteles.reduce((total, h) => total + h.habitaciones.ocupadas, 0) / 
                                 hoteles.reduce((total, h) => total + h.habitaciones.total, 0)) * 100)}%
                  </p>
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
              {/* Categoría */}
              <div>
                <h3 className="font-medium mb-2">Categoría</h3>
                <div className="space-y-2">
                  {['todos', '3', '4', '5'].map((categoria) => (
                    <label key={categoria} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="categoria"
                        value={categoria}
                        checked={filtros.categoria === categoria}
                        onChange={(e) => setFiltros({...filtros, categoria: e.target.value})}
                        className="text-primary"
                      />
                      <span className="text-sm">
                        {categoria === 'todos' ? 'Todas las categorías' : `${categoria} Estrellas`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Ciudad */}
              <div>
                <h3 className="font-medium mb-2">Ciudad</h3>
                <div className="space-y-2">
                  {['todos', 'Lima', 'Cusco', 'Paracas', 'Arequipa', 'Iquitos'].map((ciudad) => (
                    <label key={ciudad} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="ciudad"
                        value={ciudad}
                        checked={filtros.ciudad === ciudad}
                        onChange={(e) => setFiltros({...filtros, ciudad: e.target.value})}
                        className="text-primary"
                      />
                      <span className="text-sm">{ciudad}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Estado */}
              <div>
                <h3 className="font-medium mb-2">Estado</h3>
                <div className="space-y-2">
                  {['todos', 'activo', 'inactivo', 'mantenimiento'].map((estado) => (
                    <label key={estado} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="estado"
                        value={estado}
                        checked={filtros.estado === estado}
                        onChange={(e) => setFiltros({...filtros, estado: e.target.value})}
                        className="text-primary"
                      />
                      <span className="text-sm capitalize">{estado}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Precio */}
              <div>
                <h3 className="font-medium mb-2">Rango de Precio</h3>
                <div className="space-y-2">
                  {['todos', 'economico', 'medio', 'lujo'].map((precio) => (
                    <label key={precio} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="precio"
                        value={precio}
                        checked={filtros.precio === precio}
                        onChange={(e) => setFiltros({...filtros, precio: e.target.value})}
                        className="text-primary"
                      />
                      <span className="text-sm capitalize">{precio}</span>
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Hoteles */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Hoteles ({hotelesFiltrados.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hotelesFiltrados.map((hotel) => (
                  <div key={hotel.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-4">
                      {/* Imagen del Hotel */}
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <img
                          src={hotel.imagenes[0]}
                          alt={hotel.nombre}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute top-2 right-2">
                          {renderEstado(hotel.estado)}
                        </div>
                      </div>

                      {/* Información Principal */}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-foreground text-lg">{hotel.nombre}</h3>
                            <p className="text-sm text-muted-foreground">{hotel.cadena}</p>
                            <div className="flex items-center space-x-4 mt-1">
                              {renderCategoria(hotel.categoria)}
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                <span className="text-sm text-muted-foreground">{hotel.calificacion}</span>
                                <span className="text-xs text-muted-foreground">({hotel.reseñas})</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Detalles del Hotel */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4" />
                              <span>{hotel.ciudad}, {hotel.pais}</span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>{hotel.habitaciones.disponibles} disponibles</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>Check-in: {hotel.politicas.checkIn}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-muted-foreground">Precios desde:</span>
                              <span className="font-medium text-foreground">
                                {hotel.precios.moneda} {hotel.precios.simple}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex flex-wrap gap-1">
                              {hotel.servicios.slice(0, 4).map((servicio, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {servicio}
                                </Badge>
                              ))}
                              {hotel.servicios.length > 4 && (
                                <Badge variant="outline" className="text-xs">
                                  +{hotel.servicios.length - 4} más
                                </Badge>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Última actualización: {hotel.ultimaActualizacion}
                            </div>
                          </div>
                        </div>

                        {/* Acciones */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleVerDetalle(hotel)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Ver Detalle
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditar(hotel)}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </Button>
                          </div>

                          
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
      {modalDetalle && hotelSeleccionado && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg max-w-4xl w-full max-h-[95vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b p-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Detalle del Hotel</h2>
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
                {/* Columna 1: Información General */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-primary">Información General</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Nombre</label>
                        <p className="font-medium">{hotelSeleccionado.nombre}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Cadena</label>
                        <p className="font-medium">{hotelSeleccionado.cadena}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Categoría</label>
                        <div className="flex items-center space-x-2">
                          {renderCategoria(hotelSeleccionado.categoria)}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Dirección</label>
                        <p className="font-medium">{hotelSeleccionado.direccion}</p>
                        <p className="text-sm text-muted-foreground">{hotelSeleccionado.ciudad}, {hotelSeleccionado.pais}</p>
                      </div>
                    </div>
                  </div>

                  {/* Contacto */}
                  <div>
                    <h4 className="font-medium mb-3">Información de Contacto</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{hotelSeleccionado.telefono}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span>{hotelSeleccionado.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <span>{hotelSeleccionado.sitioWeb}</span>
                      </div>
                    </div>
                  </div>

                  {/* Políticas */}
                  <div>
                    <h4 className="font-medium mb-3">Políticas del Hotel</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <label className="text-muted-foreground">Check-in</label>
                        <p className="font-medium">{hotelSeleccionado.politicas.checkIn}</p>
                      </div>
                      <div>
                        <label className="text-muted-foreground">Check-out</label>
                        <p className="font-medium">{hotelSeleccionado.politicas.checkOut}</p>
                      </div>
                      <div>
                        <label className="text-muted-foreground">Cancelación</label>
                        <p className="font-medium">{hotelSeleccionado.politicas.cancelacion}</p>
                      </div>
                      <div>
                        <label className="text-muted-foreground">Mascotas</label>
                        <p className="font-medium">{hotelSeleccionado.politicas.mascotas ? 'Permitidas' : 'No permitidas'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Columna 2: Servicios y Precios */}
                <div className="space-y-6">
                  {/* Servicios */}
                  <div>
                    <h4 className="font-medium mb-3">Servicios Disponibles</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {hotelSeleccionado.servicios.map((servicio, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-muted-foreground">{servicio}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Precios */}
                  <div>
                    <h4 className="font-medium mb-3">Tarifas</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm">Habitación Simple</span>
                        <span className="font-semibold">{hotelSeleccionado.precios.moneda} {hotelSeleccionado.precios.simple}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm">Habitación Doble</span>
                        <span className="font-semibold">{hotelSeleccionado.precios.moneda} {hotelSeleccionado.precios.doble}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm">Suite</span>
                        <span className="font-semibold">{hotelSeleccionado.precios.moneda} {hotelSeleccionado.precios.suite}</span>
                      </div>
                    </div>
                  </div>

                  {/* Habitaciones */}
                  <div>
                    <h4 className="font-medium mb-3">Estado de Habitaciones</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{hotelSeleccionado.habitaciones.disponibles}</div>
                        <div className="text-sm text-blue-600">Disponibles</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{hotelSeleccionado.habitaciones.ocupadas}</div>
                        <div className="text-sm text-green-600">Ocupadas</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">{hotelSeleccionado.habitaciones.mantenimiento}</div>
                        <div className="text-sm text-orange-600">Mantenimiento</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-600">{hotelSeleccionado.habitaciones.total}</div>
                        <div className="text-sm text-gray-600">Total</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Eliminar */}
      {modalEliminar && hotelSeleccionado && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-red-100">
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Eliminar Hotel</h3>
                <p className="text-muted-foreground">
                  ¿Estás seguro de que quieres eliminar el hotel "{hotelSeleccionado.nombre}"? Esta acción no se puede deshacer.
                </p>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setModalEliminar(false)}
                >
                  Cancelar
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={confirmarEliminar}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
