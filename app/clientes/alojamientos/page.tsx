"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FiltrosAvanzadosAlojamiento } from '../components/filtros-avanzados-alojamiento'
import { TarjetaAlojamiento } from '../components/tarjeta-alojamiento'
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Wifi, 
  Car, 
  Utensils, 
  Snowflake,
  Building,
  Filter,
  Heart,
  Eye,
  Phone,
  Mail,
  Globe,
  Bed,
  Plane,
  Car as CarIcon
} from 'lucide-react'

interface Alojamiento {
  id: string
  nombre: string
  tipo: 'hotel' | 'hostal' | 'casa' | 'apartamento' | 'resort'
  categoria: number // estrellas
  ubicacion: string
  distanciaCentro: string
  precio: number
  precioDescuento?: number
  descuento?: number
  imagen: string
  calificacion: number
  numResenas: number
  servicios: string[]
  descripcion: string
  habitacionesDisponibles: number
  fechaReferencia: string
  puntosLoyalty: number
}

export default function AlojamientosPage() {
  const [alojamientos, setAlojamientos] = useState<Alojamiento[]>([])
  const [filtros, setFiltros] = useState({
    destino: '',
    tipo: '',
    categoria: '',
    precioMin: '',
    precioMax: '',
    servicios: [] as string[],
    fechaEntrada: '',
    fechaSalida: '',
    huespedes: '',
    habitaciones: ''
  })
  const [ordenarPor, setOrdenarPor] = useState('recomendados')
  const router = useRouter()

  useEffect(() => {
    // Simular carga de datos
    const alojamientosData: Alojamiento[] = [
      {
        id: '1',
        nombre: 'Hotel Costa del Sol Wyndham Cusco',
        tipo: 'hotel',
        categoria: 4,
        ubicacion: 'Cusco, Perú',
        distanciaCentro: '238 m del centro',
        precio: 592,
        precioDescuento: 462,
        descuento: 22,
        imagen: '/assets/banner.jpg',
        calificacion: 9.4,
        numResenas: 1247,
        servicios: ['Wifi', 'Aire acondicionado', 'Restaurante', 'Estacionamiento'],
        descripcion: 'Hotel de lujo en el corazón del Cusco histórico, con vistas panorámicas y servicio de primera clase.',
        habitacionesDisponibles: 8,
        fechaReferencia: '6 diciembre 2025',
        puntosLoyalty: 131
      },
      {
        id: '2',
        nombre: 'Riu Palace Bavaro - All Inclusive',
        tipo: 'resort',
        categoria: 5,
        ubicacion: 'Punta Cana, República Dominicana',
        distanciaCentro: '20.03 km del centro',
        precio: 2141,
        precioDescuento: 1070,
        descuento: 50,
        imagen: '/assets/banner.jpg',
        calificacion: 8.3,
        numResenas: 892,
        servicios: ['Wifi', 'Aire acondicionado', 'Restaurante', 'Piscina', 'Playa privada'],
        descripcion: 'Resort todo incluido de lujo con acceso directo a la playa y múltiples restaurantes.',
        habitacionesDisponibles: 15,
        fechaReferencia: '18 setiembre 2025',
        puntosLoyalty: 303
      },
      {
        id: '3',
        nombre: 'qp Hotels Arequipa',
        tipo: 'hotel',
        categoria: 3,
        ubicacion: 'Arequipa, Perú',
        distanciaCentro: '445 m del centro',
        precio: 357,
        precioDescuento: 296,
        descuento: 17,
        imagen: '/assets/banner.jpg',
        calificacion: 8.7,
        numResenas: 456,
        servicios: ['Wifi', 'Aire acondicionado', 'Restaurante'],
        descripcion: 'Hotel moderno y confortable en el centro histórico de Arequipa.',
        habitacionesDisponibles: 12,
        fechaReferencia: '26 agosto 2025',
        puntosLoyalty: 84
      },
      {
        id: '4',
        nombre: 'Rio Othon Palace',
        tipo: 'hotel',
        categoria: 4,
        ubicacion: 'Rio de Janeiro, Brasil',
        distanciaCentro: '8.46 km del centro',
        precio: 747,
        precioDescuento: 747,
        imagen: '/assets/banner.jpg',
        calificacion: 8.3,
        numResenas: 678,
        servicios: ['Wifi', 'Aire acondicionado', 'Piscina', 'Vista al mar'],
        descripcion: 'Hotel emblemático con vistas espectaculares a la bahía de Guanabara.',
        habitacionesDisponibles: 6,
        fechaReferencia: '1 setiembre 2025',
        puntosLoyalty: 212
      }
    ]
    setAlojamientos(alojamientosData)
  }, [])

  const alojamientosFiltrados = alojamientos.filter(alojamiento => {
    if (filtros.destino && !alojamiento.ubicacion.toLowerCase().includes(filtros.destino.toLowerCase())) return false
    if (filtros.tipo && alojamiento.tipo !== filtros.tipo) return false
    if (filtros.categoria && alojamiento.categoria !== parseInt(filtros.categoria)) return false
    if (filtros.precioMin && alojamiento.precio < parseInt(filtros.precioMin)) return false
    if (filtros.precioMax && alojamiento.precio > parseInt(filtros.precioMax)) return false
    return true
  })

  const limpiarFiltros = () => {
    setFiltros({
      destino: '',
      tipo: '',
      categoria: '',
      precioMin: '',
      precioMax: '',
      servicios: [],
      fechaEntrada: '',
      fechaSalida: '',
      huespedes: '',
      habitaciones: ''
    })
  }

  // Event handlers para las tarjetas
  const handleVerDetalles = (id: string) => {
    router.push(`/clientes/detalles-alojamientos?id=${id}`)
  }

  const handleContactar = (id: string) => {
    console.log('Contactar alojamiento:', id)
    // Aquí iría la lógica de contacto
  }

  const handleFavorito = (id: string) => {
    console.log('Agregar a favoritos:', id)
    // Aquí iría la lógica de favoritos
  }

  const handleVistaRapida = (id: string) => {
    console.log('Vista rápida del alojamiento:', id)
    // Aquí iría la lógica de vista rápida
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Encuentra tu Alojamiento Ideal</h1>
            <p className="text-xl text-primary-foreground/90">
              Descubre las mejores ofertas en hoteles, resorts y más
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filtros Principales */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-primary" />
              <span>Búsqueda Rápida</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="¿Dónde le gustaría ir?"
                    value={filtros.destino}
                    onChange={(e) => setFiltros({ ...filtros, destino: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <Select value={filtros.tipo} onValueChange={(value) => setFiltros({ ...filtros, tipo: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hotel">Hotel</SelectItem>
                    <SelectItem value="resort">Resort</SelectItem>
                    <SelectItem value="hostal">Hostal</SelectItem>
                    <SelectItem value="casa">Casa</SelectItem>
                    <SelectItem value="apartamento">Apartamento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select value={filtros.categoria} onValueChange={(value) => setFiltros({ ...filtros, categoria: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Estrella</SelectItem>
                    <SelectItem value="2">2 Estrellas</SelectItem>
                    <SelectItem value="3">3 Estrellas</SelectItem>
                    <SelectItem value="4">4 Estrellas</SelectItem>
                    <SelectItem value="5">5 Estrellas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Input
                  placeholder="Precio min"
                  type="number"
                  value={filtros.precioMin}
                  onChange={(e) => setFiltros({ ...filtros, precioMin: e.target.value })}
                />
              </div>
              
              <div>
                <Input
                  placeholder="Precio max"
                  type="number"
                  value={filtros.precioMax}
                  onChange={(e) => setFiltros({ ...filtros, precioMax: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filtros Avanzados */}
        <FiltrosAvanzadosAlojamiento 
          filtros={filtros}
          setFiltros={setFiltros}
          onLimpiar={limpiarFiltros}
        />

        {/* Ordenamiento y Resultados */}
        <div className="flex justify-between items-center mb-6 mt-8">
          <h2 className="text-2xl font-bold text-foreground">
            {alojamientosFiltrados.length} alojamientos encontrados
          </h2>
          
          <Select value={ordenarPor} onValueChange={setOrdenarPor}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recomendados">Más recomendados</SelectItem>
              <SelectItem value="precio-bajo">Precio más bajo</SelectItem>
              <SelectItem value="precio-alto">Precio más alto</SelectItem>
              <SelectItem value="calificacion">Mejor calificación</SelectItem>
              <SelectItem value="distancia">Más cerca del centro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Grid de Alojamientos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alojamientosFiltrados.map((alojamiento) => (
            <TarjetaAlojamiento
              key={alojamiento.id}
              alojamiento={alojamiento}
              onVerDetalles={handleVerDetalles}
              onContactar={handleContactar}
              onFavorito={handleFavorito}
              onVistaRapida={handleVistaRapida}
            />
          ))}
        </div>

        {/* Paginación */}
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">Anterior</Button>
            <Button variant="outline" size="sm">1</Button>
            <Button size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">Siguiente</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
