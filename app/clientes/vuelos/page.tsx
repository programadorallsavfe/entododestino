"use client"
import { useState, useEffect } from 'react'
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
  ChevronRight
} from 'lucide-react'

interface Vuelo {
  id: string
  aerolinea: string
  logo: string
  calificacion: number
  tipo: 'directo' | 'con-escalas'
  origen: string
  destino: string
  codigoOrigen: string
  codigoDestino: string
  fechaSalida: string
  fechaLlegada: string
  horaSalida: string
  horaLlegada: string
  duracion: string
  precio: number
  impuestos: number
  precioFinal: number
  equipaje: 'mano' | 'bodega' | 'ambos'
  escalas: number
}

export default function VuelosPage() {
  const [tipoVuelo, setTipoVuelo] = useState('ida-vuelta')
  const [origen, setOrigen] = useState('Lima, Lima, Perú')
  const [destino, setDestino] = useState('')
  const [fechaIda, setFechaIda] = useState('')
  const [fechaVuelta, setFechaVuelta] = useState('')
  const [pasajeros, setPasajeros] = useState('1')
  const [clase, setClase] = useState('economica')
  const [cualquierFecha, setCualquierFecha] = useState(false)
  const [vuelos, setVuelos] = useState<Vuelo[]>([])
  const [filtros, setFiltros] = useState({
    escalas: 'todas',
    equipaje: 'todas',
    precioMin: 414,
    precioMax: 1540,
    moneda: 'USD',
    aerolineas: [] as string[],
    duracionIda: [5, 28],
    duracionVuelta: [5, 28],
    horariosIda: [0, 24],
    horariosVuelta: [0, 24]
  })

  useEffect(() => {
    // Simular carga de datos de vuelos
    const vuelosData: Vuelo[] = [
      {
        id: '1',
        aerolinea: 'SKY Sky Airline',
        logo: '/assets/banner.jpg',
        calificacion: 6.8,
        tipo: 'directo',
        origen: 'Lima',
        destino: 'San Pablo',
        codigoOrigen: 'LIM',
        codigoDestino: 'GRU',
        fechaSalida: 'vie. 29 ago. 2025',
        fechaLlegada: 'vie. 29 ago. 2025',
        horaSalida: '00:25',
        horaLlegada: '07:30',
        duracion: '5 h 5 m',
        precio: 293,
        impuestos: 121,
        precioFinal: 414,
        equipaje: 'ambos',
        escalas: 0
      },
      {
        id: '2',
        aerolinea: 'LATAM',
        logo: '/assets/banner.jpg',
        calificacion: 7.7,
        tipo: 'directo',
        origen: 'Lima',
        destino: 'San Pablo',
        codigoOrigen: 'LIM',
        codigoDestino: 'GRU',
        fechaSalida: 'vie. 29 ago. 2025',
        fechaLlegada: 'vie. 29 ago. 2025',
        horaSalida: '08:15',
        horaLlegada: '15:20',
        duracion: '5 h 5 m',
        precio: 301,
        impuestos: 125,
        precioFinal: 426,
        equipaje: 'ambos',
        escalas: 0
      },
      {
        id: '3',
        aerolinea: 'Copa Airlines',
        logo: '/assets/banner.jpg',
        calificacion: 7.2,
        tipo: 'con-escalas',
        origen: 'Lima',
        destino: 'San Pablo',
        codigoOrigen: 'LIM',
        codigoDestino: 'GRU',
        fechaSalida: 'vie. 29 ago. 2025',
        fechaLlegada: 'vie. 29 ago. 2025',
        horaSalida: '10:30',
        horaLlegada: '22:45',
        duracion: '10 h 15 m',
        precio: 394,
        impuestos: 121,
        precioFinal: 515,
        equipaje: 'ambos',
        escalas: 1
      }
    ]
    setVuelos(vuelosData)
  }, [])

  const renderCalificacion = (calificacion: number) => {
    let texto = ''
    let color = ''
    
    if (calificacion >= 7.5) {
      texto = 'Muy Bueno'
      color = 'bg-green-100 text-green-800'
    } else if (calificacion >= 6.5) {
      texto = 'Bueno'
      color = 'bg-blue-100 text-blue-800'
    } else {
      texto = 'Regular'
      color = 'bg-yellow-100 text-yellow-800'
    }

    return (
      <Badge variant="secondary" className={color}>
        {calificacion} {texto}
      </Badge>
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

  const vuelosFiltrados = vuelos.filter(vuelo => {
    if (filtros.escalas === 'directo' && vuelo.tipo !== 'directo') return false
    if (filtros.escalas === '1-escala' && vuelo.escalas !== 1) return false
    if (vuelo.precioFinal < filtros.precioMin || vuelo.precioFinal > filtros.precioMax) return false
    return true
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Busca tu Vuelo Ideal</h1>
            <p className="text-xl text-primary-foreground/90">
              Encuentra las mejores ofertas en vuelos nacionales e internacionales
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs de Tipo de Vuelo */}
        <div className="flex justify-center mb-8">
          <Tabs value={tipoVuelo} onValueChange={setTipoVuelo} className="w-full max-w-4xl">
            <TabsList className="grid w-full grid-cols-4 bg-white p-1">
              <TabsTrigger 
                value="ida-vuelta" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Ida y Vuelta
              </TabsTrigger>
              <TabsTrigger 
                value="solo-ida" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Solo Ida
              </TabsTrigger>
              <TabsTrigger 
                value="multidestino" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Multidestino
              </TabsTrigger>
              <TabsTrigger 
                value="vuelo-alojamiento" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <Plane className="w-4 h-4 mr-2" />
                <Bed className="w-4 h-4 mr-2" />
                Vuelo + Alojamiento
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Badge de Ahorro */}
        {tipoVuelo === 'vuelo-alojamiento' && (
          <div className="flex justify-center mb-6">
            <Badge className="bg-green-500 text-white px-4 py-2 text-sm">
              Hasta 30% de ahorro
            </Badge>
          </div>
        )}

        {/* Formulario de Búsqueda */}
        <Card className="mb-8 bg-primary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Origen */}
              <div>
                <Label className="text-sm font-medium text-foreground">ORIGEN</Label>
                <div className="relative mt-1">
                  <div className="absolute left-3 top-3 w-3 h-3 bg-primary rounded-full"></div>
                  <Input
                    placeholder="Ciudad de origen"
                    value={origen}
                    onChange={(e) => setOrigen(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              {/* Botón de Intercambio */}
              <div className="flex items-end justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-10 h-10 rounded-full"
                  onClick={() => {
                    const temp = origen
                    setOrigen(destino)
                    setDestino(temp)
                  }}
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </Button>
              </div>

              {/* Destino */}
              <div>
                <Label className="text-sm font-medium text-foreground">DESTINO</Label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Ingresa hacia donde..."
                    value={destino}
                    onChange={(e) => setDestino(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Fechas */}
              <div className="lg:col-span-2">
                <Label className="text-sm font-medium text-foreground">FECHAS</Label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="date"
                      value={fechaIda}
                      onChange={(e) => setFechaIda(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="date"
                      value={fechaVuelta}
                      onChange={(e) => setFechaVuelta(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Segunda Fila */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {/* Pasajeros y Clase */}
              <div>
                <Label className="text-sm font-medium text-foreground">PASAJEROS Y CLASE</Label>
                <div className="relative mt-1">
                  <Users className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={`${pasajeros} persona, ${clase}`}
                    className="pl-10"
                    readOnly
                  />
                </div>
              </div>

              {/* Toggle de Fechas Baratas */}
              <div className="flex items-center space-x-2">
                <Switch
                  checked={cualquierFecha}
                  onCheckedChange={setCualquierFecha}
                />
                <Label className="text-sm text-muted-foreground">
                  Cualquier fecha más barata
                </Label>
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
                {/* Escalas */}
                <div>
                  <h3 className="font-medium mb-3">Escalas</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="todas-escalas" 
                          checked={filtros.escalas === 'todas'}
                          onCheckedChange={() => setFiltros({...filtros, escalas: 'todas'})}
                        />
                        <Label htmlFor="todas-escalas">Todas las escalas</Label>
                      </div>
                      <Badge variant="secondary">348</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="directo" 
                          checked={filtros.escalas === 'directo'}
                          onCheckedChange={() => setFiltros({...filtros, escalas: 'directo'})}
                        />
                        <Label htmlFor="directo">Directo</Label>
                      </div>
                      <Badge variant="secondary">65</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="1-escala" 
                          checked={filtros.escalas === '1-escala'}
                          onCheckedChange={() => setFiltros({...filtros, escalas: '1-escala'})}
                        />
                        <Label htmlFor="1-escala">1 Escala</Label>
                      </div>
                      <Badge variant="secondary">283</Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Equipaje */}
                <div>
                  <h3 className="font-medium mb-3">Equipaje</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="todas-opciones" defaultChecked />
                        <Label htmlFor="todas-opciones">Todas las opciones</Label>
                      </div>
                      <Badge variant="secondary">340</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="equipaje-mano" />
                        <Label htmlFor="equipaje-mano">Equipaje de mano</Label>
                      </div>
                      <Badge variant="secondary">200</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="equipaje-bodega" />
                        <Label htmlFor="equipaje-bodega">Equipaje en bodega</Label>
                      </div>
                      <Badge variant="secondary">140</Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Precio */}
                <div>
                  <h3 className="font-medium mb-3">Precio</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">US$</span>
                      <span className="text-sm text-muted-foreground">S/</span>
                    </div>
                    <Slider
                      value={[filtros.precioMin, filtros.precioMax]}
                      onValueChange={(value) => setFiltros({
                        ...filtros, 
                        precioMin: value[0], 
                        precioMax: value[1]
                      })}
                      max={2000}
                      min={0}
                      step={10}
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
            {/* Tabs de Navegación */}
            <div className="flex items-center justify-between mb-6">
              <Tabs value="vuelos" className="w-auto">
                <TabsList className="bg-white">
                  <TabsTrigger value="vuelos" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                    Vuelos ida y vuelta
                  </TabsTrigger>
                  <TabsTrigger value="arma-vuelo" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                    Arma tu vuelo
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <Tabs value="precios-aerolinea" className="w-auto">
                <TabsList className="bg-white">
                  <TabsTrigger value="precios-aerolinea" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                    Precios por aerolínea
                  </TabsTrigger>
                  <TabsTrigger value="precios-3dias" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                    Precios +/- 3 días
                  </TabsTrigger>
                  <TabsTrigger value="tendencia-precios" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                    Tendencia de precios
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Tabla de Precios por Aerolínea */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 font-medium">Aerolínea</th>
                        <th className="text-center py-3 font-medium">Directo</th>
                        <th className="text-center py-3 font-medium">Con Escalas</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vuelos.map((vuelo) => (
                        <tr key={vuelo.id} className="border-b">
                          <td className="py-3">
                            <div className="flex items-center space-x-3">
                              <img 
                                src={vuelo.logo} 
                                alt={vuelo.aerolinea} 
                                className="w-8 h-8 rounded"
                              />
                              <div>
                                <div className="font-medium">{vuelo.aerolinea}</div>
                                {renderCalificacion(vuelo.calificacion)}
                              </div>
                            </div>
                          </td>
                          <td className="text-center py-3">
                            {vuelo.tipo === 'directo' ? (
                              <span className="text-primary font-semibold">
                                US$ {vuelo.precioFinal}
                              </span>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </td>
                          <td className="text-center py-3">
                            {vuelo.tipo === 'con-escalas' ? (
                              <span className="text-primary font-semibold">
                                US$ {vuelo.precioFinal}
                              </span>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Botones de Recomendación */}
            <div className="flex items-center space-x-4 mb-6">
              <Button variant="default" className="bg-primary">
                Recomendados <span className="ml-2 text-sm">US$ 414</span>
              </Button>
              <Button variant="outline">
                Más baratos <span className="ml-2 text-sm">US$ 414</span>
              </Button>
              <Button variant="outline">
                Más rápidos <span className="ml-2 text-sm">US$ 512</span>
              </Button>
              <Button variant="outline">
                <Clock className="w-4 h-4 mr-2" />
                Crear alerta de precio
              </Button>
            </div>

            {/* Resultados de Vuelos */}
            <div className="space-y-4">
              {vuelosFiltrados.map((vuelo) => (
                <Card key={vuelo.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Información del Vuelo */}
                      <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">
                            Con esta combinación obtienes más opciones de viaje
                          </h3>
                          <Info className="w-5 h-5 text-muted-foreground" />
                        </div>

                        {/* Vuelo de Ida */}
                        <div className="bg-muted/30 rounded-lg p-4 mb-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="text-center">
                                <div className="text-sm text-muted-foreground">IDA</div>
                                <div className="font-medium">{vuelo.fechaSalida}</div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <img 
                                  src={vuelo.logo} 
                                  alt={vuelo.aerolinea} 
                                  className="w-8 h-8 rounded"
                                />
                                <span className="font-medium">{vuelo.aerolinea}</span>
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold">{vuelo.horaSalida}</div>
                              <div className="text-sm text-muted-foreground">{vuelo.codigoOrigen}</div>
                              <div className="text-xs text-muted-foreground">{vuelo.origen}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm text-muted-foreground">{vuelo.tipo === 'directo' ? 'Directo' : `${vuelo.escalas} escala`}</div>
                              <div className="text-sm font-medium">{vuelo.duracion}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold">{vuelo.horaLlegada}</div>
                              <div className="text-sm text-muted-foreground">{vuelo.codigoDestino}</div>
                              <div className="text-xs text-muted-foreground">{vuelo.destino}</div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className="text-sm text-muted-foreground">Equipaje</span>
                              {renderEquipaje(vuelo.equipaje)}
                            </div>
                          </div>
                        </div>

                        {/* Vuelo de Vuelta (solo para ida y vuelta) */}
                        {tipoVuelo === 'ida-vuelta' && (
                          <div className="bg-muted/30 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="text-center">
                                  <div className="text-sm text-muted-foreground">VUELTA</div>
                                  <div className="font-medium">{vuelo.fechaLlegada}</div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <img 
                                    src={vuelo.logo} 
                                    alt={vuelo.aerolinea} 
                                    className="w-8 h-8 rounded"
                                  />
                                  <span className="font-medium">{vuelo.aerolinea}</span>
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold">05:55</div>
                                <div className="text-sm text-muted-foreground">{vuelo.codigoDestino}</div>
                                <div className="text-xs text-muted-foreground">{vuelo.destino}</div>
                              </div>
                              <div className="text-center">
                                <div className="text-sm text-muted-foreground">Directo</div>
                                <div className="text-sm font-medium">5 h 30 m</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold">09:25</div>
                                <div className="text-sm text-muted-foreground">{vuelo.codigoOrigen}</div>
                                <div className="text-xs text-muted-foreground">{vuelo.origen}</div>
                              </div>
                              <div className="flex items-center space-x-1">
                                <span className="text-sm text-muted-foreground">Equipaje</span>
                                {renderEquipaje(vuelo.equipaje)}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Resumen de Precio */}
                      <div className="lg:col-span-1">
                        <div className="bg-muted/30 rounded-lg p-4">
                          <div className="text-center mb-4">
                            <div className="text-sm text-muted-foreground">Precio por adulto</div>
                            <div className="text-2xl font-bold text-primary">US$ {vuelo.precio}</div>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                              <span>1 Adulto:</span>
                              <span>US$ {vuelo.precio}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Impuestos, tasas y cargos:</span>
                              <span>US$ {vuelo.impuestos}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-semibold">
                              <span>Precio final:</span>
                              <span>US$ {vuelo.precioFinal}</span>
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Button variant="outline" size="icon">
                              <Heart className="w-4 h-4" />
                            </Button>
                            <Button className="flex-1 bg-primary hover:bg-primary/90">
                              Comprar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Sugerencias de SOFIA */}
            <Card className="mt-6 bg-accent/20 border-accent/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">Sugerencias de SOFIA basadas en tu búsqueda</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground">1/6</span>
                    <Button variant="outline" size="sm">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  ¡Felicitaciones! Tus fechas solicitadas son óptimas. Pero si buscas ahorrar, considera viajar en noviembre, donde los precios son un 10% más bajos.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
