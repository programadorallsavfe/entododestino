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
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  Plane, 
  Bed,
  ArrowRightLeft,
  Clock,
  BaggageClaim,
  Heart,
  Info,
  ArrowRight,
  Star,
  DollarSign,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Building,
  Car,
  Bus,
  Wifi,
  Snowflake,
  Car as Parking,
  Utensils,
  ThumbsUp,
  Edit,
  Plus,
  Map,
  Eye,
  Play,
  Phone,
  Mail,
  Globe
} from 'lucide-react'

// Componente SVG de WhatsApp
const WhatsAppIcon = () => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className="w-5 h-5"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
  </svg>
)

interface Paquete {
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
  }
  disponibilidad: number
  reservaFlexible: boolean
  cuotasSinInteres: boolean
  puntosLoyalty: number
}

export default function PaquetesPage() {
  const [origen, setOrigen] = useState('Lima, Lima, Perú')
  const [destino, setDestino] = useState('Buenos Aires, Argentina')
  const [fechaInicio, setFechaInicio] = useState('sáb. 23 ago. 2025')
  const [fechaFin, setFechaFin] = useState('lun. 1 sep. 2025')
  const [noches, setNoches] = useState(9)
  const [habitaciones, setHabitaciones] = useState(1)
  const [personas, setPersonas] = useState(2)
  const [paquetes, setPaquetes] = useState<Paquete[]>([])
  const [paqueteSeleccionado, setPaqueteSeleccionado] = useState<Paquete | null>(null)
  const [modalAbierto, setModalAbierto] = useState(false)
  const [filtros, setFiltros] = useState({
    tipoAlojamiento: 'todos',
    alimentacion: 'todas',
    servicios: [] as string[],
    precioMin: 500,
    precioMax: 2000,
    calificacion: 0,
    estrellas: 0
  })

  const router = useRouter()

  useEffect(() => {
    // Simular carga de datos de paquetes
    const paquetesData: Paquete[] = [
      {
        id: '1',
        nombre: 'Hotel Sarmiento Palace',
        tipo: 'hotel',
        ubicacion: 'Buenos Aires, Montserrat',
        distanciaCentro: 'A 688 m del centro',
        calificacion: 7.5,
        estrellas: 3,
        duracion: 9,
        noches: 9,
        fechaInicio: 'sáb. 23 ago. 2025',
        fechaFin: 'lun. 1 sep. 2025',
        precio: 704,
        precioDescuento: 75,
        descuentoTarjeta: 75,
        imagen: '/assets/banner.jpg',
        servicios: ['Wi-Fi', 'Estacionamiento', 'Restaurante', 'Aire acondicionado'],
        personas: 2,
        vuelo: {
          aerolinea: 'SKY',
          tipo: 'con-escalas',
          origen: 'Lima',
          destino: 'Buenos Aires',
          codigoOrigen: 'LIM',
          codigoDestino: 'AEP',
          horaSalida: '16:30',
          horaLlegada: '03:40+1',
          escalas: 1,
          equipaje: 'ambos'
        },
        disponibilidad: 1,
        reservaFlexible: true,
        cuotasSinInteres: true,
        puntosLoyalty: 1407
      },
      {
        id: '2',
        nombre: 'Alquileres Temporarios by CLH Rentals',
        tipo: 'apartamento',
        ubicacion: 'Buenos Aires, Centro',
        distanciaCentro: 'A 500 m del centro',
        calificacion: 7.9,
        estrellas: 4,
        duracion: 10,
        noches: 10,
        fechaInicio: 'viernes 12 Set',
        fechaFin: 'lunes 22 Set',
        precio: 662,
        precioDescuento: 75,
        descuentoTarjeta: 75,
        imagen: '/assets/banner.jpg',
        servicios: ['Wi-Fi', 'Estacionamiento', 'Cocina', 'Aire acondicionado'],
        personas: 2,
        vuelo: {
          aerolinea: 'LATAM',
          tipo: 'con-escalas',
          origen: 'Lima',
          destino: 'Buenos Aires',
          codigoOrigen: 'LIM',
          codigoDestino: 'BUE',
          horaSalida: '14:20',
          horaLlegada: '01:15+1',
          escalas: 1,
          equipaje: 'ambos'
        },
        disponibilidad: 3,
        reservaFlexible: true,
        cuotasSinInteres: true,
        puntosLoyalty: 1321
      },
      {
        id: '3',
        nombre: 'Hilton Buenos Aires',
        tipo: 'hotel',
        ubicacion: 'Buenos Aires, Puerto Madero',
        distanciaCentro: 'A 1.2 km del centro',
        calificacion: 9.0,
        estrellas: 5,
        duracion: 8,
        noches: 8,
        fechaInicio: 'viernes 12 Set',
        fechaFin: 'domingo 21 Set',
        precio: 1575,
        precioDescuento: 100,
        descuentoTarjeta: 100,
        imagen: '/assets/banner.jpg',
        servicios: ['Wi-Fi', 'Estacionamiento', 'Piscina', 'Spa', 'Restaurante', 'Aire acondicionado'],
        personas: 2,
        vuelo: {
          aerolinea: 'SKY',
          tipo: 'directo',
          origen: 'Lima',
          destino: 'Buenos Aires',
          codigoOrigen: 'LIM',
          codigoDestino: 'AEP',
          horaSalida: '08:15',
          horaLlegada: '19:30',
          escalas: 0,
          equipaje: 'ambos'
        },
        disponibilidad: 5,
        reservaFlexible: false,
        cuotasSinInteres: true,
        puntosLoyalty: 3150
      }
    ]
    setPaquetes(paquetesData)
  }, [])

  const renderCalificacion = (calificacion: number) => {
    let texto = ''
    let color = ''
    
    if (calificacion >= 8.5) {
      texto = 'Excelente'
      color = 'bg-green-100 text-green-800'
    } else if (calificacion >= 7.5) {
      texto = 'Muy Bueno'
      color = 'bg-blue-100 text-blue-800'
    } else if (calificacion >= 6.5) {
      texto = 'Bueno'
      color = 'bg-yellow-100 text-yellow-800'
    } else {
      texto = 'Regular'
      color = 'bg-red-100 text-red-800'
    }

    return (
      <Badge variant="secondary" className={color}>
        {calificacion} {texto}
      </Badge>
    )
  }

  const renderEstrellas = (estrellas: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < estrellas ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  const renderEquipaje = (equipaje: string) => {
    if (equipaje === 'ambos') {
      return (
        <div className="flex space-x-1">
          <BaggageClaim className="w-4 h-4 text-green-600" />
          <BaggageClaim className="w-4 h-4 text-green-600" />
        </div>
      )
    } else if (equipaje === 'mano') {
      return <BaggageClaim className="w-4 h-4 text-blue-600" />
    } else {
      return <BaggageClaim className="w-4 h-4 text-orange-600" />
    }
  }

  const paquetesFiltrados = paquetes.filter(paquete => {
    if (filtros.tipoAlojamiento !== 'todos' && paquete.tipo !== filtros.tipoAlojamiento) return false
    if (paquete.precio < filtros.precioMin || paquete.precio > filtros.precioMax) return false
    if (filtros.calificacion > 0 && paquete.calificacion < filtros.calificacion) return false
    if (filtros.estrellas > 0 && paquete.estrellas < filtros.estrellas) return false
    return true
  })

  const handleVerDetalle = (paquete: Paquete) => {
    router.push(`/clientes/detalle-paquete?id=${paquete.id}`)
  }

  const handleCerrarModal = () => {
    setModalAbierto(false)
    setPaqueteSeleccionado(null)
  }

  const handleEnviarWhatsApp = (paquete: Paquete) => {
    const mensaje = `🚀 *Cotización de Paquete Turístico*

🏨 *${paquete.nombre}*
📍 ${paquete.ubicacion}
⭐ ${paquete.calificacion}/10 - ${paquete.estrellas} estrellas
👥 ${paquete.personas} personas
🌙 ${paquete.noches} noches

✈️ *Vuelo ${paquete.vuelo.tipo === 'directo' ? 'Directo' : `con ${paquete.vuelo.escalas} escala`}*
🛫 ${paquete.vuelo.codigoOrigen} → ${paquete.vuelo.codigoDestino}
🏢 ${paquete.vuelo.aerolinea}

💰 *Precio por persona:* US$ ${paquete.precio}
💳 *Total ${paquete.personas} personas:* US$ ${paquete.precio * paquete.personas}
${paquete.descuentoTarjeta ? `🎯 *Descuento tarjeta:* US$ ${paquete.descuentoTarjeta}` : ''}

🎁 *Puntos a ganar:* ${paquete.puntosLoyalty}

¿Te interesa este paquete? ¡Contáctanos para más detalles!`

    const numeroWhatsApp = '51999999999' // Número de WhatsApp de la empresa
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`
    window.open(urlWhatsApp, '_blank')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Paquetes Turísticos</h1>
            <p className="text-xl text-primary-foreground/90">
              Encuentra los mejores paquetes con vuelo y alojamiento
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Formulario de Búsqueda Principal */}
        <Card className="mb-8 bg-primary text-white border-primary">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Origen */}
              <div>
                <Label className="text-sm font-medium text-white">ORIGEN</Label>
                <div className="relative mt-1">
                  <div className="absolute left-3 top-3 w-3 h-3 bg-white rounded-full"></div>
                  <Input
                    placeholder="Ciudad de origen"
                    value={origen}
                    onChange={(e) => setOrigen(e.target.value)}
                    className="pl-8 bg-white text-gray-900"
                  />
                </div>
              </div>

              {/* Botón de Intercambio */}
              <div className="flex items-end justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-10 h-10 rounded-full bg-white hover:bg-gray-100"
                  onClick={() => {
                    const temp = origen
                    setOrigen(destino)
                    setDestino(temp)
                  }}
                >
                  <ArrowRightLeft className="w-4 h-4 text-primary" />
                </Button>
              </div>

              {/* Destino */}
              <div>
                <Label className="text-sm font-medium text-white">DESTINO</Label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                  <Input
                    placeholder="Ciudad de destino"
                    value={destino}
                    onChange={(e) => setDestino(e.target.value)}
                    className="pl-10 bg-white text-gray-900"
                  />
                </div>
              </div>

              {/* Fechas */}
              <div>
                <Label className="text-sm font-medium text-white">FECHAS</Label>
                <div className="mt-1">
                  <Input
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                    className="bg-white text-gray-900"
                  />
                </div>
              </div>

              {/* Noches */}
              <div>
                <Label className="text-sm font-medium text-white">{noches} NOCHES</Label>
                <div className="mt-1">
                  <Input
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                    className="bg-white text-gray-900"
                  />
                </div>
              </div>
            </div>

            {/* Segunda Fila */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {/* Habitaciones y Personas */}
              <div>
                <Label className="text-sm font-medium text-white">HABITACIONES</Label>
                <div className="relative mt-1">
                  <Bed className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                  <Input
                    value={`${habitaciones} habitación, ${personas} personas`}
                    className="pl-10 bg-white text-gray-900"
                    readOnly
                  />
                </div>
              </div>

              {/* Enlaces de Acción */}
              <div className="flex items-center space-x-4">
                <Button variant="ghost" className="text-white hover:text-primary-foreground p-0 h-auto">
                  <Edit className="w-4 h-4 mr-2" />
                  Cambiar ciudad o fechas del alojamiento
                </Button>
                <Button variant="ghost" className="text-white hover:text-primary-foreground p-0 h-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar segundo destino para alojarme
                </Button>
              </div>

              {/* Botón de Búsqueda */}
              <div className="flex justify-end">
                <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-2">
                  <Search className="w-4 h-4 mr-2" />
                  Buscar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Banner de Promoción */}
        <div className="space-y-4 mb-6">
          {/* Banner Principal */}
         

          {/* Banner de Pago del 50% */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <span className="font-semibold text-green-800 text-lg">¡Asegura tu paquete!</span>
                    <div className="text-sm text-green-700">Pagando solo el 50% del monto total</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-green-100 px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-green-800">50% OFF</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resultados y Filtros */}
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
              <CardContent className="space-y-6">
                {/* Mapa */}
                <div className="bg-muted/30 rounded-lg p-4 text-center">
                  <Map className="w-8 h-8 text-primary mx-auto mb-2" />
                  <Button variant="ghost" className="text-primary">
                    Explorar mapa <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>

                {/* Tipo de Alojamiento */}
                <div>
                  <h3 className="font-medium mb-3">Tipo de alojamiento</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="todos-alojamientos" 
                          defaultChecked
                        />
                        <Label htmlFor="todos-alojamientos">Todos los alojamientos</Label>
                      </div>
                      <Badge variant="secondary">221</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="hoteles" />
                        <Label htmlFor="hoteles">Hoteles</Label>
                      </div>
                      <Badge variant="secondary">140</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="apartamentos" />
                        <Label htmlFor="apartamentos">Apartamentos</Label>
                      </div>
                      <Badge variant="secondary">60</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="boutique" />
                        <Label htmlFor="boutique">Hoteles Boutique</Label>
                      </div>
                      <Badge variant="secondary">4</Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Alimentación */}
                <div>
                  <h3 className="font-medium mb-3">Alimentación</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="todas-opciones" defaultChecked />
                        <Label htmlFor="todas-opciones">Todas las opciones</Label>
                      </div>
                      <Badge variant="secondary">221</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="desayuno" />
                        <Label htmlFor="desayuno">Desayuno</Label>
                      </div>
                      <Badge variant="secondary">112</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="solo-hospedaje" />
                        <Label htmlFor="solo-hospedaje">Sólo hospedaje</Label>
                      </div>
                      <Badge variant="secondary">153</Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Servicios Destacados */}
                <div>
                  <h3 className="font-medium mb-3">Servicios destacados</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="estacionamiento" />
                        <Label htmlFor="estacionamiento">Estacionamiento</Label>
                      </div>
                      <Badge variant="secondary">104</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground ml-6">
                      Opciones con y sin costo adicional
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="piscina" />
                        <Label htmlFor="piscina">Piscina</Label>
                      </div>
                      <Badge variant="secondary">52</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground ml-6">
                      Piscina climatizada, interior y/o al aire libre
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="mascotas" />
                        <Label htmlFor="mascotas">Acepta mascotas</Label>
                      </div>
                      <Badge variant="secondary">21</Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Precio */}
                <div>
                  <h3 className="font-medium mb-3">Precio</h3>
                  <div className="space-y-3">
                    <Slider
                      value={[filtros.precioMin, filtros.precioMax]}
                      onValueChange={(value) => setFiltros({
                        ...filtros, 
                        precioMin: value[0], 
                        precioMax: value[1]
                      })}
                      max={3000}
                      min={0}
                      step={50}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>US$ {filtros.precioMin}</span>
                      <span>US$ {filtros.precioMax}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contenido Principal */}
          <div className="lg:col-span-3">
            {/* Paquetes Más Convenientes */}
            <Card className="mb-6 bg-orange-50 border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-orange-600" />
                    <h3 className="text-lg font-semibold text-orange-800">
                      ¡Paquetes más convenientes!
                    </h3>
                    <div className="flex space-x-1">
                      <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                      <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                      <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-orange-700 mb-4">
                  Cercanos a tu fecha, estos paquetes te pueden resultar más favorables.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-white rounded-lg border border-orange-200">
                    <div className="text-sm font-medium text-orange-800">10 noches</div>
                    <div className="text-xs text-orange-600">viernes 12 Set - lunes 22 Set</div>
                    <div className="text-lg font-bold text-orange-800">US$ 617</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg border border-orange-200">
                    <div className="text-sm font-medium text-orange-800">8 noches</div>
                    <div className="text-xs text-orange-600">sábado 13 Set - domingo 21 Set</div>
                    <div className="text-lg font-bold text-orange-800">US$ 607</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg border border-orange-200">
                    <div className="text-sm font-medium text-orange-800">7 noches</div>
                    <div className="text-xs text-orange-600">domingo 14 Set - domingo 21 Set</div>
                    <div className="text-lg font-bold text-orange-800">US$ 580</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg border border-orange-200">
                    <div className="text-sm font-medium text-orange-800">7 noches</div>
                    <div className="text-xs text-orange-600">lunes 15 Set - lunes 22 Set</div>
                    <div className="text-lg font-bold text-orange-800">US$ 608</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resultados de Paquetes */}
            <div className="space-y-4">
              {paquetesFiltrados.map((paquete) => (
                <Card key={paquete.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Información del Paquete */}
                      <div className="lg:col-span-2">
                        <div className="flex items-start space-x-4">
                          {/* Imagen */}
                          <div className="relative">
                            <img
                              src={paquete.imagen}
                              alt={paquete.nombre}
                              className="w-32 h-24 object-cover rounded-lg"
                            />
                            {paquete.disponibilidad <= 3 && (
                              <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs">
                                Solo queda {paquete.disponibilidad}
                              </Badge>
                            )}
                          </div>

                          {/* Detalles */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-lg font-semibold">{paquete.nombre}</h3>
                              <Badge variant="secondary" className="capitalize">
                                {paquete.tipo}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center space-x-2 mb-2">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                {paquete.ubicacion}. {paquete.distanciaCentro}
                              </span>
                              <Button variant="ghost" size="sm" className="text-primary p-0 h-auto">
                                Ver en mapa
                              </Button>
                            </div>

                            <div className="flex items-center space-x-4 mb-3">
                              {renderCalificacion(paquete.calificacion)}
                              {renderEstrellas(paquete.estrellas)}
                              <div className="flex items-center space-x-2">
                                <Wifi className="w-4 h-4 text-green-600" />
                                <Parking className="w-4 h-4 text-blue-600" />
                                <Utensils className="w-4 h-4 text-orange-600" />
                                <Snowflake className="w-4 h-4 text-blue-600" />
                              </div>
                            </div>

                            <div className="flex items-center space-x-2 mb-3">
                              <span className="text-sm text-muted-foreground">
                                {paquete.personas} personas
                              </span>
                            </div>

                            {/* Información del Vuelo */}
                            <div className="bg-muted/30 rounded-lg p-3 mb-3">
                              <div className="flex items-center space-x-2">
                                <Plane className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium">
                                  Vuelo {paquete.vuelo.tipo === 'directo' ? 'directo' : `con ${paquete.vuelo.escalas} escala`} {paquete.vuelo.codigoOrigen} ⇄ {paquete.vuelo.codigoDestino}
                                </span>
                                {renderEquipaje(paquete.vuelo.equipaje)}
                              </div>
                            </div>

                            {/* Características */}
                            <div className="space-y-1">
                              {paquete.reservaFlexible && (
                                <div className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  <span className="text-sm text-green-700">Reserva flexible</span>
                                </div>
                              )}
                              {paquete.descuentoTarjeta && (
                                <div className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  <span className="text-sm text-green-700">
                                    US$ {paquete.descuentoTarjeta} de descuento extra con tarjetas seleccionadas
                                  </span>
                                </div>
                              )}
                              {paquete.cuotasSinInteres && (
                                <Button variant="ghost" size="sm" className="text-blue-600 p-0 h-auto">
                                  Ver hasta 12 cuotas sin interés
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Resumen de Precio */}
                      <div className="lg:col-span-1">
                        <div className="bg-muted/30 rounded-lg p-4">
                          <div className="text-center mb-4">
                            <div className="text-sm text-muted-foreground">Vuelo + Alojamiento</div>
                            <div className="text-sm text-muted-foreground">Precio final por persona</div>
                            <div className="flex items-center justify-center space-x-1">
                              <Info className="w-4 h-4 text-muted-foreground" />
                              <div className="text-2xl font-bold text-primary">US$ {paquete.precio}</div>
                            </div>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                              <span>Final {paquete.personas} personas:</span>
                              <span>US$ {paquete.precio * paquete.personas}</span>
                            </div>
                            <div className="text-xs text-muted-foreground text-center">
                              Incluye impuestos, tasas y cargos
                            </div>
                          </div>

                                                                                <div className="space-y-2">
                             <Button 
                               className="w-full bg-primary hover:bg-primary/90"
                               onClick={() => handleVerDetalle(paquete)}
                             >
                               Ver detalle
                             </Button>
                             <Button 
                               variant="outline"
                               size="sm"
                               className="w-full bg-green-50 hover:bg-green-100 border-green-200 text-green-700"
                               onClick={() => handleEnviarWhatsApp(paquete)}
                             >
                               <WhatsAppIcon />
                               <span className="ml-2">Cotizar por WhatsApp</span>
                             </Button>
                             <div className="flex items-center justify-center space-x-2 text-sm">
                               <Play className="w-4 h-4 text-red-500" />
                               <span className="text-muted-foreground">Pasaporte Despegar</span>
                               <span className="font-medium">Sumarías {paquete.puntosLoyalty} puntos</span>
                             </div>
                           </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
                 </div>
       </div>

       {/* Modal de Detalle del Paquete */}
       {modalAbierto && paqueteSeleccionado && (
         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
           <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
             <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
               <h2 className="text-2xl font-bold text-primary">{paqueteSeleccionado.nombre}</h2>
               <Button
                 variant="ghost"
                 size="icon"
                 onClick={handleCerrarModal}
                 className="hover:bg-gray-100"
               >
                 <X className="w-6 h-6" />
               </Button>
             </div>
             
             <div className="p-6">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 {/* Columna Izquierda - Información del Alojamiento */}
                 <div className="space-y-6">
                   <div>
                     <h3 className="text-xl font-semibold mb-4 text-primary">Información del Alojamiento</h3>
                     
                     {/* Imagen Principal */}
                     <div className="relative mb-4">
                       <img
                         src={paqueteSeleccionado.imagen}
                         alt={paqueteSeleccionado.nombre}
                         className="w-full h-64 object-cover rounded-lg"
                       />
                       {paqueteSeleccionado.disponibilidad <= 3 && (
                         <Badge className="absolute top-4 right-4 bg-red-500 text-white">
                           Solo queda {paqueteSeleccionado.disponibilidad}
                         </Badge>
                       )}
                     </div>

                     {/* Detalles del Hotel */}
                     <div className="space-y-4">
                       <div className="flex items-center justify-between">
                         <div className="flex items-center space-x-2">
                           <MapPin className="w-5 h-5 text-primary" />
                           <span className="font-medium">{paqueteSeleccionado.ubicacion}</span>
                         </div>
                         <Badge variant="secondary" className="capitalize">
                           {paqueteSeleccionado.tipo}
                         </Badge>
                       </div>
                       
                       <div className="flex items-center space-x-4">
                         {renderCalificacion(paqueteSeleccionado.calificacion)}
                         {renderEstrellas(paqueteSeleccionado.estrellas)}
                       </div>

                       <div className="text-sm text-muted-foreground">
                         {paqueteSeleccionado.distanciaCentro}
                       </div>

                       {/* Servicios */}
                       <div>
                         <h4 className="font-medium mb-2">Servicios Incluidos</h4>
                         <div className="grid grid-cols-2 gap-2">
                           {paqueteSeleccionado.servicios.map((servicio, index) => (
                             <div key={index} className="flex items-center space-x-2 text-sm">
                               <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                               <span>{servicio}</span>
                             </div>
                           ))}
                         </div>
                       </div>
                     </div>
                   </div>

                   {/* Información del Vuelo */}
                   <div>
                     <h3 className="text-xl font-semibold mb-4 text-primary">Información del Vuelo</h3>
                     <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                       <div className="flex items-center justify-between">
                         <span className="font-medium">Aerolínea:</span>
                         <span>{paqueteSeleccionado.vuelo.aerolinea}</span>
                       </div>
                       <div className="flex items-center justify-between">
                         <span className="font-medium">Tipo:</span>
                         <Badge variant="secondary">
                           {paqueteSeleccionado.vuelo.tipo === 'directo' ? 'Directo' : `${paqueteSeleccionado.vuelo.escalas} escala(s)`}
                         </Badge>
                       </div>
                       <div className="flex items-center justify-between">
                         <span className="font-medium">Ruta:</span>
                         <span className="font-mono">{paqueteSeleccionado.vuelo.codigoOrigen} → {paqueteSeleccionado.vuelo.codigoDestino}</span>
                       </div>
                       <div className="flex items-center justify-between">
                         <span className="font-medium">Equipaje:</span>
                         <div className="flex items-center space-x-2">
                           {renderEquipaje(paqueteSeleccionado.vuelo.equipaje)}
                           <span className="text-sm text-muted-foreground">
                             {paqueteSeleccionado.vuelo.equipaje === 'ambos' ? 'Mano + Bodega' : 
                              paqueteSeleccionado.vuelo.equipaje === 'mano' ? 'Solo Mano' : 'Solo Bodega'}
                           </span>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>

                 {/* Columna Derecha - Precios y Reserva */}
                 <div className="space-y-6">
                   <div>
                     <h3 className="text-xl font-semibold mb-4 text-primary">Resumen de Precios</h3>
                     <div className="bg-muted/30 rounded-lg p-6 space-y-4">
                       <div className="text-center">
                         <div className="text-sm text-muted-foreground">Vuelo + Alojamiento</div>
                         <div className="text-3xl font-bold text-primary">US$ {paqueteSeleccionado.precio}</div>
                         <div className="text-sm text-muted-foreground">por persona</div>
                       </div>
                       
                       <Separator />
                       
                       <div className="space-y-2">
                         <div className="flex justify-between">
                           <span>Precio por persona:</span>
                           <span>US$ {paqueteSeleccionado.precio}</span>
                         </div>
                         <div className="flex justify-between">
                           <span>Total {paqueteSeleccionado.personas} personas:</span>
                           <span className="font-semibold">US$ {paqueteSeleccionado.precio * paqueteSeleccionado.personas}</span>
                         </div>
                         {paqueteSeleccionado.descuentoTarjeta && (
                           <div className="flex justify-between text-green-600">
                             <span>Descuento tarjeta:</span>
                             <span>-US$ {paqueteSeleccionado.descuentoTarjeta}</span>
                           </div>
                         )}
                         <Separator />
                         <div className="flex justify-between font-semibold text-lg">
                           <span>Precio final:</span>
                           <span className="text-primary">
                             US$ {(paqueteSeleccionado.precio * paqueteSeleccionado.personas) - (paqueteSeleccionado.descuentoTarjeta || 0)}
                           </span>
                         </div>
                       </div>
                       
                       <div className="text-xs text-muted-foreground text-center">
                         Incluye impuestos, tasas y cargos
                       </div>
                     </div>
                   </div>

                   {/* Características Especiales */}
                   <div>
                     <h3 className="text-xl font-semibold mb-4 text-primary">Características Especiales</h3>
                     <div className="space-y-3">
                       {paqueteSeleccionado.reservaFlexible && (
                         <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
                           <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                           <span className="text-green-700 font-medium">Reserva flexible</span>
                         </div>
                       )}
                       {paqueteSeleccionado.descuentoTarjeta && (
                         <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                           <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                           <span className="text-blue-700 font-medium">
                             US$ {paqueteSeleccionado.descuentoTarjeta} de descuento extra con tarjetas seleccionadas
                           </span>
                         </div>
                       )}
                       {paqueteSeleccionado.cuotasSinInteres && (
                         <div className="flex items-center space-x-2 p-3 bg-purple-50 rounded-lg">
                           <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                           <span className="text-purple-700 font-medium">Hasta 12 cuotas sin interés</span>
                         </div>
                       )}
                     </div>
                   </div>

                   {/* Puntos de Lealtad */}
                   <div className="bg-accent/20 rounded-lg p-4">
                     <div className="flex items-center space-x-2 mb-2">
                       <Play className="w-5 h-5 text-red-500" />
                       <span className="font-medium">Pasaporte Despegar</span>
                     </div>
                     <p className="text-sm text-muted-foreground">
                       Sumarías <span className="font-semibold text-primary">{paqueteSeleccionado.puntosLoyalty} puntos</span> con esta reserva
                     </p>
                   </div>

                                       {/* Botones de Acción */}
                    <div className="space-y-3">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg">
                        <Phone className="w-5 h-5 mr-2" />
                        Llamar para Reservar
                      </Button>
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
                        onClick={() => handleEnviarWhatsApp(paqueteSeleccionado)}
                      >
                        <WhatsAppIcon />
                        <span className="ml-2">Enviar Cotización por WhatsApp</span>
                      </Button>
                      <Button variant="outline" className="w-full py-3">
                        <Mail className="w-5 h-5 mr-2" />
                        Solicitar Cotización
                      </Button>
                      
                    </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       )}
     </div>
   )
 }
