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
import { CustomCalendar } from '@/components/ui/custom-calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { 
  ArrowLeft,
  MapPin, 
  Calendar as CalendarIcon, 
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
  Globe,
  Save,
  Trash2,
  Copy,
  Settings,
  Package,
  Hotel,
  UtensilsCrossed,
  PlaneTakeoff,
  Car as CarIcon,
  Ship,
  Train,
  Camera,
  Music,
  ShoppingBag,
  Heart as HeartIcon,
  Shield,
  Award,
  Zap
} from 'lucide-react'

interface Hotel {
  id: string
  nombre: string
  ubicacion: string
  estrellas: number
  calificacion: number
  precio: number
  imagen: string
  servicios: string[]
  habitaciones: number
  disponible: boolean
}

interface Restaurante {
  id: string
  nombre: string
  ubicacion: string
  tipo: string
  calificacion: number
  precio: number
  imagen: string
  especialidades: string[]
  horario: string
  disponible: boolean
}

interface Vuelo {
  id: string
  aerolinea: string
  origen: string
  destino: string
  codigoOrigen: string
  codigoDestino: string
  horaSalida: string
  horaLlegada: string
  precio: number
  tipo: 'directo' | 'con-escalas'
  escalas: number
  equipaje: 'mano' | 'bodega' | 'ambos'
  disponible: boolean
}

interface PaqueteConfigurado {
  id: string
  nombre: string
  descripcion: string
  hotel: Hotel | null
  restaurantes: Restaurante[]
  vuelo: Vuelo | null
  actividades: string[]
  transporte: string[]
  precioTotal: number
  duracion: number
  personas: number
  fechaInicio: Date | null
  fechaFin: Date | null
  activo: boolean
}

export default function ConfigurarPaquetePage() {
  const router = useRouter()
  const [pasoActual, setPasoActual] = useState(1)
  const [paqueteConfigurado, setPaqueteConfigurado] = useState<PaqueteConfigurado>({
    id: '',
    nombre: '',
    descripcion: '',
    hotel: null,
    restaurantes: [],
    vuelo: null,
    actividades: [],
    transporte: [],
    precioTotal: 0,
    duracion: 1,
    personas: 2,
    fechaInicio: null,
    fechaFin: null,
    activo: true
  })

  const [hoteles, setHoteles] = useState<Hotel[]>([])
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([])
  const [vuelos, setVuelos] = useState<Vuelo[]>([])
  const [filtros, setFiltros] = useState({
    precioMin: 0,
    precioMax: 5000,
    estrellas: 0,
    calificacion: 0,
    servicios: [] as string[]
  })

  // Cargar datos de ejemplo
  useEffect(() => {
    const hotelesData: Hotel[] = [
      {
        id: '1',
        nombre: 'Hotel Sarmiento Palace',
        ubicacion: 'Buenos Aires, Montserrat',
        estrellas: 3,
        calificacion: 7.5,
        precio: 120,
        imagen: '/assets/banner.jpg',
        servicios: ['Wi-Fi', 'Estacionamiento', 'Restaurante', 'Aire acondicionado'],
        habitaciones: 45,
        disponible: true
      },
      {
        id: '2',
        nombre: 'Hilton Buenos Aires',
        ubicacion: 'Buenos Aires, Puerto Madero',
        estrellas: 5,
        calificacion: 9.0,
        precio: 280,
        imagen: '/assets/banner.jpg',
        servicios: ['Wi-Fi', 'Estacionamiento', 'Piscina', 'Spa', 'Restaurante', 'Gimnasio'],
        habitaciones: 120,
        disponible: true
      },
      {
        id: '3',
        nombre: 'Alquileres Temporarios CLH',
        ubicacion: 'Buenos Aires, Centro',
        estrellas: 4,
        calificacion: 7.9,
        precio: 95,
        imagen: '/assets/banner.jpg',
        servicios: ['Wi-Fi', 'Cocina', 'Aire acondicionado', 'Lavadora'],
        habitaciones: 25,
        disponible: true
      }
    ]

    const restaurantesData: Restaurante[] = [
      {
        id: '1',
        nombre: 'La Cabrera',
        ubicacion: 'Buenos Aires, Palermo',
        tipo: 'Parrilla Argentina',
        calificacion: 9.2,
        precio: 45,
        imagen: '/assets/banner.jpg',
        especialidades: ['Asado', 'Choripán', 'Empanadas'],
        horario: '12:00 - 23:00',
        disponible: true
      },
      {
        id: '2',
        nombre: 'Don Julio',
        ubicacion: 'Buenos Aires, Palermo',
        tipo: 'Parrilla Premium',
        calificacion: 9.5,
        precio: 65,
        imagen: '/assets/banner.jpg',
        especialidades: ['Bife de Chorizo', 'Vacío', 'Provoleta'],
        horario: '12:00 - 00:00',
        disponible: true
      },
      {
        id: '3',
        nombre: 'Café Tortoni',
        ubicacion: 'Buenos Aires, Centro',
        tipo: 'Café Histórico',
        calificacion: 8.8,
        precio: 25,
        imagen: '/assets/banner.jpg',
        especialidades: ['Café', 'Medialunas', 'Tortas'],
        horario: '08:00 - 23:00',
        disponible: true
      }
    ]

    const vuelosData: Vuelo[] = [
      {
        id: '1',
        aerolinea: 'SKY',
        origen: 'Lima',
        destino: 'Buenos Aires',
        codigoOrigen: 'LIM',
        codigoDestino: 'AEP',
        horaSalida: '16:30',
        horaLlegada: '03:40+1',
        precio: 350,
        tipo: 'con-escalas',
        escalas: 1,
        equipaje: 'ambos',
        disponible: true
      },
      {
        id: '2',
        aerolinea: 'LATAM',
        origen: 'Lima',
        destino: 'Buenos Aires',
        codigoOrigen: 'LIM',
        codigoDestino: 'BUE',
        horaSalida: '14:20',
        horaLlegada: '01:15+1',
        precio: 420,
        tipo: 'con-escalas',
        escalas: 1,
        equipaje: 'ambos',
        disponible: true
      },
      {
        id: '3',
        aerolinea: 'SKY',
        origen: 'Lima',
        destino: 'Buenos Aires',
        codigoOrigen: 'LIM',
        codigoDestino: 'AEP',
        horaSalida: '08:15',
        horaLlegada: '19:30',
        precio: 580,
        tipo: 'directo',
        escalas: 0,
        equipaje: 'ambos',
        disponible: true
      }
    ]

    setHoteles(hotelesData)
    setRestaurantes(restaurantesData)
    setVuelos(vuelosData)
  }, [])

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

  const handleGuardarPaquete = () => {
    console.log('Paquete guardado:', paqueteConfigurado)
    
    // Simular guardado exitoso
    toast.success('¡Paquete guardado correctamente!', {
      description: 'El paquete turístico ha sido guardado en el sistema',
      duration: 4000,
      position: 'top-center',
      action: {
        label: 'Ver paquetes',
        onClick: () => router.push('/administradores/lista-paquetes')
      }
    })
    
    // Aquí implementarías la lógica para guardar en la base de datos
    // Por ejemplo: await savePaquete(paqueteConfigurado)
  }

  const handlePasoAnterior = () => {
    if (pasoActual > 1) {
      setPasoActual(pasoActual - 1)
      
      // Toast informativo al retroceder
      toast.info('Paso anterior', {
        description: 'Puedes modificar la configuración del paso anterior',
        duration: 2000,
        position: 'top-center'
      })
    }
  }

  const handlePasoSiguiente = () => {
    if (pasoActual < 4) {
      setPasoActual(pasoActual + 1)
      
      // Toast de confirmación al avanzar
      if (pasoActual === 1) {
        toast.success('Paso completado', {
          description: 'Información básica configurada correctamente',
          duration: 2000,
          position: 'top-center'
        })
      } else if (pasoActual === 2) {
        toast.success('Paso completado', {
          description: 'Alojamiento seleccionado correctamente',
          duration: 2000,
          position: 'top-center'
        })
      } else if (pasoActual === 3) {
        toast.success('Paso completado', {
          description: 'Vuelos y transporte configurados correctamente',
          duration: 2000,
          position: 'top-center'
        })
      }
    }
  }

  const calcularPrecioTotal = () => {
    let total = 0
    if (paqueteConfigurado.hotel) total += paqueteConfigurado.hotel.precio * paqueteConfigurado.duracion
    if (paqueteConfigurado.vuelo) total += paqueteConfigurado.vuelo.precio * paqueteConfigurado.personas
    paqueteConfigurado.restaurantes.forEach(r => total += r.precio * paqueteConfigurado.duracion)
    return total
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="text-center lg:text-left mb-6 lg:mb-0">
              <div className="flex items-center space-x-4 mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                  onClick={() => router.back()}
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                  <h1 className="text-4xl font-bold">Configurar Paquete Turístico</h1>
                  <p className="text-xl text-primary-foreground/90">
                    Crea paquetes personalizados para tus clientes
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline"
                className="bg-white hover:bg-gray-100 text-primary border-0 px-6 py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={() => {
                  toast.info('Duplicando paquete...', {
                    description: 'Se está creando una copia del paquete actual',
                    duration: 3000,
                    position: 'top-center'
                  })
                }}
              >
                <Copy className="w-5 h-5 mr-2" />
                Duplicar Paquete
              </Button>
              <Button 
                className="bg-white hover:bg-gray-100 text-primary border-0 px-6 py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={handleGuardarPaquete}
              >
                <Save className="w-5 h-5 mr-2" />
                Guardar Paquete
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Barra de Progreso */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((paso) => (
                <div key={paso} className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    paso <= pasoActual 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {paso}
                  </div>
                  <span className={`text-sm font-medium ${
                    paso <= pasoActual ? 'text-primary' : 'text-gray-500'
                  }`}>
                    {paso === 1 && 'Información Básica'}
                    {paso === 2 && 'Alojamiento'}
                    {paso === 3 && 'Vuelos & Transporte'}
                    {paso === 4 && 'Actividades & Finalizar'}
                  </span>
                  {paso < 4 && (
                    <ChevronRight className={`w-4 h-4 ${
                      paso <= pasoActual ? 'text-primary' : 'text-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Barra de progreso visual */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(pasoActual / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar de Resumen */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="w-5 h-5 text-primary" />
                  <span>Resumen del Paquete</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Información Básica */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Información Básica</h4>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>Nombre: {paqueteConfigurado.nombre || 'Sin definir'}</div>
                    <div>Duración: {paqueteConfigurado.duracion} días</div>
                    <div>Personas: {paqueteConfigurado.personas}</div>
                  </div>
                </div>

                <Separator />

                {/* Alojamiento */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Alojamiento</h4>
                  {paqueteConfigurado.hotel ? (
                    <div className="text-xs text-muted-foreground">
                      <div className="font-medium">{paqueteConfigurado.hotel.nombre}</div>
                      <div>{paqueteConfigurado.hotel.estrellas} estrellas</div>
                      <div>US$ {paqueteConfigurado.hotel.precio}/noche</div>
                    </div>
                  ) : (
                    <div className="text-xs text-muted-foreground">Sin seleccionar</div>
                  )}
                </div>

                <Separator />

                {/* Vuelo */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Vuelo</h4>
                  {paqueteConfigurado.vuelo ? (
                    <div className="text-xs text-muted-foreground">
                      <div className="font-medium">{paqueteConfigurado.vuelo.aerolinea}</div>
                      <div>{paqueteConfigurado.vuelo.codigoOrigen} → {paqueteConfigurado.vuelo.codigoDestino}</div>
                      <div>US$ {paqueteConfigurado.vuelo.precio}/persona</div>
                    </div>
                  ) : (
                    <div className="text-xs text-muted-foreground">Sin seleccionar</div>
                  )}
                </div>

                <Separator />

                {/* Precio Total */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Precio Total</h4>
                  <div className="text-lg font-bold text-primary">
                    US$ {calcularPrecioTotal()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    por {paqueteConfigurado.personas} personas
                  </div>
                </div>

                {/* Botones de Navegación */}
                <div className="space-y-2 pt-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handlePasoAnterior}
                    disabled={pasoActual === 1}
                  >
                    Anterior
                  </Button>
                  <Button
                    className="w-full"
                    onClick={handlePasoSiguiente}
                    disabled={pasoActual === 4}
                  >
                    {pasoActual === 4 ? 'Finalizar' : 'Siguiente'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contenido Principal */}
          <div className="lg:col-span-3">
            <Tabs value={pasoActual.toString()} className="w-full">
              <TabsContent value="1" className="space-y-6">
                {/* Paso 1: Información Básica */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="w-5 h-5 text-primary" />
                      <span>Información Básica del Paquete</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre del Paquete</Label>
                        <Input
                          id="nombre"
                          placeholder="Ej: Buenos Aires Premium 5 días"
                          value={paqueteConfigurado.nombre}
                          onChange={(e) => setPaqueteConfigurado({
                            ...paqueteConfigurado,
                            nombre: e.target.value
                          })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="duracion">Duración (días)</Label>
                        <Input
                          id="duracion"
                          type="number"
                          min="1"
                          max="30"
                          value={paqueteConfigurado.duracion}
                          onChange={(e) => setPaqueteConfigurado({
                            ...paqueteConfigurado,
                            duracion: parseInt(e.target.value)
                          })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="personas">Número de Personas</Label>
                        <Select
                          value={paqueteConfigurado.personas.toString()}
                          onValueChange={(value) => setPaqueteConfigurado({
                            ...paqueteConfigurado,
                            personas: parseInt(value)
                          })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} {num === 1 ? 'persona' : 'personas'}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="fechaInicio">Fecha de Inicio</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {paqueteConfigurado.fechaInicio 
                                ? paqueteConfigurado.fechaInicio.toLocaleDateString('es-ES')
                                : 'Seleccionar fecha'
                              }
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                                                         <CustomCalendar
                               selected={paqueteConfigurado.fechaInicio || undefined}
                               onSelect={(date) => setPaqueteConfigurado({
                                 ...paqueteConfigurado,
                                 fechaInicio: date
                               })}
                               disabled={(date) => date < new Date()}
                             />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="descripcion">Descripción del Paquete</Label>
                      <Textarea
                        id="descripcion"
                        placeholder="Describe los detalles del paquete, qué incluye, experiencias únicas..."
                        rows={4}
                        value={paqueteConfigurado.descripcion}
                        onChange={(e) => setPaqueteConfigurado({
                          ...paqueteConfigurado,
                          descripcion: e.target.value
                        })}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="activo"
                        checked={paqueteConfigurado.activo}
                        onCheckedChange={(checked) => setPaqueteConfigurado({
                          ...paqueteConfigurado,
                          activo: checked
                        })}
                      />
                      <Label htmlFor="activo">Paquete activo para clientes</Label>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="2" className="space-y-6">
                {/* Paso 2: Alojamiento */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Hotel className="w-5 h-5 text-primary" />
                      <span>Seleccionar Alojamiento</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Filtros */}
                    <div className="mb-6 p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-medium mb-3">Filtros</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm">Rango de Precio</Label>
                          <Slider
                            value={[filtros.precioMin, filtros.precioMax]}
                            onValueChange={(value) => setFiltros({
                              ...filtros,
                              precioMin: value[0],
                              precioMax: value[1]
                            })}
                            max={1000}
                            min={0}
                            step={10}
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>US$ {filtros.precioMin}</span>
                            <span>US$ {filtros.precioMax}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="text-sm">Estrellas Mínimas</Label>
                          <Select
                            value={filtros.estrellas.toString()}
                            onValueChange={(value) => setFiltros({
                              ...filtros,
                              estrellas: parseInt(value)
                            })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Cualquier" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">Cualquier</SelectItem>
                              <SelectItem value="3">3+ estrellas</SelectItem>
                              <SelectItem value="4">4+ estrellas</SelectItem>
                              <SelectItem value="5">5 estrellas</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm">Calificación Mínima</Label>
                          <Select
                            value={filtros.calificacion.toString()}
                            onValueChange={(value) => setFiltros({
                              ...filtros,
                              calificacion: parseInt(value)
                            })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Cualquier" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">Cualquier</SelectItem>
                              <SelectItem value="7">7+</SelectItem>
                              <SelectItem value="8">8+</SelectItem>
                              <SelectItem value="9">9+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Lista de Hoteles */}
                    <div className="space-y-4">
                      {hoteles
                        .filter(hotel => 
                          hotel.precio >= filtros.precioMin && 
                          hotel.precio <= filtros.precioMax &&
                          hotel.estrellas >= filtros.estrellas &&
                          hotel.calificacion >= filtros.calificacion
                        )
                        .map((hotel) => (
                          <Card 
                            key={hotel.id} 
                            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                              paqueteConfigurado.hotel?.id === hotel.id 
                                ? 'ring-2 ring-primary bg-primary/5' 
                                : ''
                            }`}
                            onClick={() => setPaqueteConfigurado({
                              ...paqueteConfigurado,
                              hotel: paqueteConfigurado.hotel?.id === hotel.id ? null : hotel
                            })}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start space-x-4">
                                <img
                                  src={hotel.imagen}
                                  alt={hotel.nombre}
                                  className="w-24 h-20 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                  <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-lg font-semibold">{hotel.nombre}</h3>
                                    <Badge variant="secondary">
                                      {hotel.estrellas} estrellas
                                    </Badge>
                                  </div>
                                  
                                  <div className="flex items-center space-x-2 mb-2">
                                    <MapPin className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">
                                      {hotel.ubicacion}
                                    </span>
                                  </div>

                                  <div className="flex items-center space-x-4 mb-3">
                                    {renderEstrellas(hotel.estrellas)}
                                    <Badge variant="outline">
                                      {hotel.calificacion}/10
                                    </Badge>
                                  </div>

                                  <div className="flex items-center space-x-2 mb-3">
                                    {hotel.servicios.slice(0, 4).map((servicio, index) => (
                                      <Badge key={index} variant="secondary" className="text-xs">
                                        {servicio}
                                      </Badge>
                                    ))}
                                  </div>

                                  <div className="flex items-center justify-between">
                                    <div className="text-sm text-muted-foreground">
                                      {hotel.habitaciones} habitaciones disponibles
                                    </div>
                                    <div className="text-lg font-bold text-primary">
                                      US$ {hotel.precio}/noche
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="3" className="space-y-6">
                {/* Paso 3: Vuelos y Transporte */}
                <div className="space-y-6">
                  {/* Selección de Vuelos */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <PlaneTakeoff className="w-5 h-5 text-primary" />
                        <span>Seleccionar Vuelo</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {vuelos.map((vuelo) => (
                          <Card 
                            key={vuelo.id} 
                            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                              paqueteConfigurado.vuelo?.id === vuelo.id 
                                ? 'ring-2 ring-primary bg-primary/5' 
                                : ''
                            }`}
                            onClick={() => setPaqueteConfigurado({
                              ...paqueteConfigurado,
                              vuelo: paqueteConfigurado.vuelo?.id === vuelo.id ? null : vuelo
                            })}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div className="text-center">
                                    <div className="text-sm font-medium">{vuelo.horaSalida}</div>
                                    <div className="text-xs text-muted-foreground">{vuelo.codigoOrigen}</div>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                                    <Badge variant="outline">
                                      {vuelo.tipo === 'directo' ? 'Directo' : `${vuelo.escalas} escala`}
                                    </Badge>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-sm font-medium">{vuelo.horaLlegada}</div>
                                    <div className="text-xs text-muted-foreground">{vuelo.codigoDestino}</div>
                                  </div>
                                </div>
                                
                                <div className="text-right">
                                  <div className="text-sm font-medium">{vuelo.aerolinea}</div>
                                  <div className="text-lg font-bold text-primary">
                                    US$ {vuelo.precio}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    por persona
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Selección de Transporte */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <CarIcon className="w-5 h-5 text-primary" />
                        <span>Transporte Local</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { id: 'taxi', nombre: 'Taxi', icono: CarIcon, precio: 15 },
                          { id: 'uber', nombre: 'Uber', icono: CarIcon, precio: 12 },
                          { id: 'bus', nombre: 'Bus Público', icono: Bus, precio: 2 },
                          { id: 'metro', nombre: 'Metro', icono: Train, precio: 1.5 }
                        ].map((transporte) => (
                          <Card 
                            key={transporte.id}
                            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                              paqueteConfigurado.transporte.includes(transporte.id)
                                ? 'ring-2 ring-primary bg-primary/5' 
                                : ''
                            }`}
                            onClick={() => {
                              const nuevosTransportes = paqueteConfigurado.transporte.includes(transporte.id)
                                ? paqueteConfigurado.transporte.filter(t => t !== transporte.id)
                                : [...paqueteConfigurado.transporte, transporte.id]
                              setPaqueteConfigurado({
                                ...paqueteConfigurado,
                                transporte: nuevosTransportes
                              })
                            }}
                          >
                            <CardContent className="p-4 text-center">
                              <transporte.icono className="w-8 h-8 text-primary mx-auto mb-2" />
                              <div className="font-medium">{transporte.nombre}</div>
                              <div className="text-sm text-muted-foreground">
                                US$ {transporte.precio}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="4" className="space-y-6">
                {/* Paso 4: Actividades y Finalizar */}
                <div className="space-y-6">
                  {/* Selección de Restaurantes */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <UtensilsCrossed className="w-5 h-5 text-primary" />
                        <span>Seleccionar Restaurantes</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {restaurantes.map((restaurante) => (
                          <Card 
                            key={restaurante.id} 
                            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                              paqueteConfigurado.restaurantes.some(r => r.id === restaurante.id)
                                ? 'ring-2 ring-primary bg-primary/5' 
                                : ''
                            }`}
                            onClick={() => {
                              const nuevosRestaurantes = paqueteConfigurado.restaurantes.some(r => r.id === restaurante.id)
                                ? paqueteConfigurado.restaurantes.filter(r => r.id !== restaurante.id)
                                : [...paqueteConfigurado.restaurantes, restaurante]
                              setPaqueteConfigurado({
                                ...paqueteConfigurado,
                                restaurantes: nuevosRestaurantes
                              })
                            }}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start space-x-4">
                                <img
                                  src={restaurante.imagen}
                                  alt={restaurante.nombre}
                                  className="w-24 h-20 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                  <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-lg font-semibold">{restaurante.nombre}</h3>
                                    <Badge variant="secondary">
                                      {restaurante.tipo}
                                    </Badge>
                                  </div>
                                  
                                  <div className="flex items-center space-x-2 mb-2">
                                    <MapPin className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">
                                      {restaurante.ubicacion}
                                    </span>
                                  </div>

                                  <div className="flex items-center space-x-4 mb-3">
                                    <Badge variant="outline">
                                      {restaurante.calificacion}/10
                                    </Badge>
                                    <div className="text-sm text-muted-foreground">
                                      {restaurante.horario}
                                    </div>
                                  </div>

                                  <div className="flex items-center space-x-2 mb-3">
                                    {restaurante.especialidades.slice(0, 3).map((especialidad, index) => (
                                      <Badge key={index} variant="secondary" className="text-xs">
                                        {especialidad}
                                      </Badge>
                                    ))}
                                  </div>

                                  <div className="text-lg font-bold text-primary">
                                    US$ {restaurante.precio} por comida
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Actividades Adicionales */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Zap className="w-5 h-5 text-primary" />
                        <span>Actividades Adicionales</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { id: 'city-tour', nombre: 'City Tour', icono: Map, precio: 45 },
                          { id: 'tango-show', nombre: 'Show de Tango', icono: Music, precio: 35 },
                          { id: 'wine-tasting', nombre: 'Degustación de Vinos', icono: HeartIcon, precio: 55 },
                          { id: 'shopping', nombre: 'Tour de Compras', icono: ShoppingBag, precio: 25 },
                          { id: 'photo-tour', nombre: 'Tour Fotográfico', icono: Camera, precio: 40 },
                          { id: 'cooking-class', nombre: 'Clase de Cocina', icono: Utensils, precio: 65 },
                          { id: 'boat-tour', nombre: 'Paseo en Barco', icono: Ship, precio: 75 },
                          { id: 'museum-pass', nombre: 'Pase de Museos', icono: Award, precio: 30 }
                        ].map((actividad) => (
                          <Card 
                            key={actividad.id}
                            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                              paqueteConfigurado.actividades.includes(actividad.id)
                                ? 'ring-2 ring-primary bg-primary/5' 
                                : ''
                            }`}
                            onClick={() => {
                              const nuevasActividades = paqueteConfigurado.actividades.includes(actividad.id)
                                ? paqueteConfigurado.actividades.filter(a => a !== actividad.id)
                                : [...paqueteConfigurado.actividades, actividad.id]
                              setPaqueteConfigurado({
                                ...paqueteConfigurado,
                                actividades: nuevasActividades
                              })
                            }}
                          >
                            <CardContent className="p-4 text-center">
                              <actividad.icono className="w-8 h-8 text-primary mx-auto mb-2" />
                              <div className="font-medium text-sm">{actividad.nombre}</div>
                              <div className="text-sm text-muted-foreground">
                                US$ {actividad.precio}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Resumen Final */}
                  <Card className="bg-primary/5 border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-primary">Resumen Final del Paquete</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-medium">Componentes Seleccionados</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Alojamiento:</span>
                              <span className="font-medium">
                                {paqueteConfigurado.hotel ? paqueteConfigurado.hotel.nombre : 'No seleccionado'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Vuelo:</span>
                              <span className="font-medium">
                                {paqueteConfigurado.vuelo ? `${paqueteConfigurado.vuelo.aerolinea} - ${paqueteConfigurado.vuelo.codigoOrigen}→${paqueteConfigurado.vuelo.codigoDestino}` : 'No seleccionado'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Restaurantes:</span>
                              <span className="font-medium">
                                {paqueteConfigurado.restaurantes.length} seleccionados
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Actividades:</span>
                              <span className="font-medium">
                                {paqueteConfigurado.actividades.length} seleccionadas
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="font-medium">Precio Desglosado</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Alojamiento ({paqueteConfigurado.duracion} noches):</span>
                              <span>
                                US$ {paqueteConfigurado.hotel ? paqueteConfigurado.hotel.precio * paqueteConfigurado.duracion : 0}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Vuelo ({paqueteConfigurado.personas} personas):</span>
                              <span>
                                US$ {paqueteConfigurado.vuelo ? paqueteConfigurado.vuelo.precio * paqueteConfigurado.personas : 0}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Restaurantes:</span>
                              <span>
                                US$ {paqueteConfigurado.restaurantes.reduce((total, r) => total + r.precio * paqueteConfigurado.duracion, 0)}
                              </span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-bold text-lg">
                              <span>Total:</span>
                              <span className="text-primary">US$ {calcularPrecioTotal()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
