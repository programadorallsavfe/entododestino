import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useRouter } from 'next/navigation'
import { 
  Users, 
  Plane, 
  Hotel, 
  Plus, 
  Trash2,
  Search,
  Edit,
  RotateCcw,
  X,
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Star,
  TrendingUp,
  Route,
  Compass,
  Zap,
  Heart,
  Shield,
  Gift,
  BarChart3,
  ChevronLeft
} from 'lucide-react'
import { useState } from 'react'

export interface Destination {
  id: string
  name: string
  lat: number
  lng: number
  type: 'start' | 'destination' | 'end'
  nights?: number
  transportIncluded?: boolean
  accommodationIncluded?: boolean
  image?: string
  description?: string
  startDate?: string
  endDate?: string
}

interface PanelIzquierdoConstructorItinerarioProps {
  destinations: Destination[]
  newDestination: string
  setNewDestination: (value: string) => void
  addDestination: () => void
  removeDestination: (id: string) => void
  updateDestination: (id: string, updates: Partial<Destination>) => void
  finishItinerary: () => void
  onContinue?: () => void
  isWizard?: boolean
}

// Base de datos de destinos disponibles
const AVAILABLE_DESTINATIONS = [
  { name: 'Río de Janeiro', lat: -22.9068, lng: -43.1729, image: '/assets/banner.jpg', description: 'Ciudad maravillosa con playas y montañas icónicas' },
  { name: 'São Paulo', lat: -23.5505, lng: -46.6333, image: '/assets/banner.jpg', description: 'Metrópolis financiera y cultural de Brasil' },
  { name: 'Buenos Aires', lat: -34.6118, lng: -58.3960, image: '/assets/banner.jpg', description: 'Capital del tango y la cultura porteña' },
  { name: 'Santiago', lat: -33.4489, lng: -70.6693, image: '/assets/banner.jpg', description: 'Capital de Chile entre la cordillera y el mar' },
  { name: 'Bogotá', lat: 4.7110, lng: -74.0721, image: '/assets/banner.jpg', description: 'Capital de Colombia en los Andes' },
  { name: 'Quito', lat: -0.2299, lng: -78.5249, image: '/assets/banner.jpg', description: 'Capital de Ecuador, patrimonio de la humanidad' },
  { name: 'La Paz', lat: -16.4897, lng: -68.1193, image: '/assets/banner.jpg', description: 'Capital administrativa de Bolivia en el altiplano' },
  { name: 'Asunción', lat: -25.2802, lng: -57.6341, image: '/assets/banner.jpg', description: 'Capital de Paraguay a orillas del río' },
  { name: 'Montevideo', lat: -34.9011, lng: -56.1645, image: '/assets/banner.jpg', description: 'Capital de Uruguay con hermosas playas' },
  { name: 'Caracas', lat: 10.4806, lng: -66.9036, image: '/assets/banner.jpg', description: 'Capital de Venezuela en el valle de Caracas' }
]

export const PanelIzquierdoConstructorItinerario = ({
  destinations,
  newDestination,
  setNewDestination,
  addDestination,
  removeDestination,
  updateDestination,
  finishItinerary,
  onContinue,
  isWizard = false
}: PanelIzquierdoConstructorItinerarioProps) => {
  const router = useRouter()
  const [showStatsDrawer, setShowStatsDrawer] = useState(false)

  const handleFinishItinerario = () => {
    if (isWizard && onContinue) {
      onContinue()
    } else {
      const itinerarioData = {
        destinations,
        fechaInicio: '08 Septiembre 2025',
        fechaFin: '13 Septiembre 2025',
        duracion: 5,
        personas: 2,
        serviciosIncluidos: ['Hoteles', 'Tours', 'Visitas guiadas', 'Traslados', 'Alimentación'],
        precioTotal: 2899.99,
        precioDescuento: 2599.99
      }
      
      localStorage.setItem('itinerarioConfigurado', JSON.stringify(itinerarioData))
      router.push('/clientes/resumen-itinerario')
    }
  }

  // Calcular fechas totales del viaje
  const totalNights = destinations.reduce((total, dest) => total + (dest.nights || 0), 0)
  const startDate = destinations[0]?.startDate || '08 sept 2025'
  const endDate = destinations[destinations.length - 1]?.endDate || '13 sept 2025'

  // Filtrar destinos ya agregados para no mostrarlos en el selector
  const availableDestinations = AVAILABLE_DESTINATIONS.filter(
    dest => !destinations.some(existing => existing.name === dest.name)
  )

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl border border-blue-100 shadow-lg overflow-hidden">
      {/* Header del itinerario con diseño mejorado */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white p-6 flex-shrink-0">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Route className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Constructor de Itinerario</h2>
                <p className="text-white/90 text-sm">Diseña tu viaje perfecto paso a paso</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-full backdrop-blur-sm">
                <Users className="w-4 h-4" />
                <span>2 Adultos</span>
              </div>
            </div>
          </div>
          
          {/* Fechas del viaje con diseño mejorado */}
          <div className="flex items-center justify-between bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-white/90" />
                <span className="text-lg font-semibold">
                  {startDate} {'→'} {endDate}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">{totalNights} Noches</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="p-2 text-white/80 hover:text-white hover:bg-white/20">
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 text-white/80 hover:text-white hover:bg-white/20">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Botón compacto para estadísticas */}
      <div className="p-4 flex-shrink-0">
        <Button 
          onClick={() => setShowStatsDrawer(true)}
          variant="outline" 
          className="w-full bg-white/80 hover:bg-white border-blue-200 text-blue-700 hover:text-blue-800 shadow-sm"
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          Ver Estadísticas del Viaje
        </Button>
      </div>

      {/* Lista de destinos con diseño mejorado */}
      <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Compass className="w-5 h-5 text-primary" />
            Ruta del Viaje
          </h3>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {destinations.length} destinos configurados
          </Badge>
        </div>

        {destinations.map((destination, index) => (
          <div key={destination.id} className="relative">
            {/* Línea conectora mejorada */}
            {index > 0 && (
              <div className="absolute left-8 top-0 w-1 h-12 bg-gradient-to-b from-blue-400 to-purple-400">
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-full shadow-lg border border-blue-200">
                    <Plane className="w-4 h-4 text-blue-600" />
                    <Switch 
                      checked={destination.transportIncluded} 
                      onCheckedChange={(checked) => updateDestination(destination.id, { transportIncluded: checked })}
                      className="scale-75"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Tarjeta del destino mejorada */}
            <Card className="relative border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/30">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Badge numerado mejorado */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg ${
                    destination.type === 'start' ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 
                    destination.type === 'end' ? 'bg-gradient-to-br from-pink-500 to-pink-600' : 
                    'bg-gradient-to-br from-purple-500 to-purple-600'
                  }`}>
                    {destination.type === 'start' ? '1' : 
                     destination.type === 'end' ? '2' : index + 1}
                  </div>

                  {/* Contenido del destino */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{destination.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {destination.startDate} {'→'} {destination.endDate}
                        </p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeDestination(destination.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Controles de transporte y alojamiento mejorados */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Transporte */}
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Plane className="w-5 h-5 text-blue-600" />
                            <span className="font-medium text-blue-800">Transporte Incluido</span>
                          </div>
                          <Switch 
                            checked={destination.transportIncluded} 
                            onCheckedChange={(checked) => updateDestination(destination.id, { transportIncluded: checked })}
                          />
                        </div>
                        {destination.transportIncluded && (
                          <div className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                            ✓ Transporte configurado para este destino
                          </div>
                        )}
                      </div>

                      {/* Alojamiento */}
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Hotel className="w-5 h-5 text-green-600" />
                            <span className="font-medium text-green-800">Alojamiento</span>
                          </div>
                          <Switch 
                            checked={destination.accommodationIncluded} 
                            onCheckedChange={(checked) => updateDestination(destination.id, { accommodationIncluded: checked })}
                          />
                        </div>
                        
                        {destination.accommodationIncluded && (
                          <div className="space-y-3">
                            <div className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                              ✓ Alojamiento incluido
                            </div>
                            
                            {/* Selector de noches mejorado */}
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-green-700">Noches:</span>
                              <div className="flex items-center space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="w-8 h-8 p-0 border-green-300 text-green-600 hover:bg-green-100"
                                  onClick={() => {
                                    const currentNights = destination.nights || 1
                                    if (currentNights > 1) {
                                      updateDestination(destination.id, { nights: currentNights - 1 })
                                    }
                                  }}
                                >
                                  -
                                </Button>
                                <span className="w-8 text-center text-sm font-bold text-green-700">
                                  {destination.nights || 1}
                                </span>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="w-8 h-8 p-0 border-green-300 text-green-600 hover:bg-green-100"
                                  onClick={() => {
                                    const currentNights = destination.nights || 1
                                    updateDestination(destination.id, { nights: currentNights + 1 })
                                  }}
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}

        {/* Línea conectora para el próximo destino */}
        {destinations.length > 0 && availableDestinations.length > 0 && (
          <div className="relative">
            <div className="absolute left-8 top-0 w-1 h-12 bg-gradient-to-b from-blue-400 to-purple-400">
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-full shadow-lg border border-blue-200">
                  <Plane className="w-4 h-4 text-blue-600" />
                  <Switch defaultChecked className="scale-75" />
                </div>
              </div>
            </div>

            {/* Campo para agregar próximo destino mejorado */}
            <Card className="relative border-2 border-dashed border-blue-300 bg-blue-50/50 shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <Plus className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-blue-800">¿Tu próximo destino?</h4>
                      <p className="text-sm text-blue-600">Agrega más destinos a tu itinerario</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Select value={newDestination} onValueChange={setNewDestination}>
                      <SelectTrigger className="bg-white border-blue-200">
                        <SelectValue placeholder="Selecciona un destino" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableDestinations.map((dest) => (
                          <SelectItem key={dest.name} value={dest.name}>
                            <div className="flex items-center space-x-2">
                              <span>{dest.name}</span>
                              <span className="text-xs text-gray-500">🇵🇪</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {newDestination && (
                      <div className="bg-white rounded-lg p-4 border border-blue-200 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <MapPin className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <span className="font-medium text-gray-900">{newDestination}</span>
                              <p className="text-xs text-gray-500">sáb. 13 sept 2025 - Fin</p>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="p-1 text-gray-400 hover:text-gray-600"
                            onClick={() => setNewDestination('')}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>

                        <Button 
                          onClick={addDestination}
                          className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2"
                          size="sm"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Agregar Destino
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Mensaje cuando no hay más destinos disponibles */}
        {availableDestinations.length === 0 && destinations.length > 0 && (
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Compass className="w-8 h-8 text-yellow-600" />
              </div>
              <h4 className="text-lg font-semibold text-yellow-800 mb-2">¡Itinerario Completo!</h4>
              <p className="text-sm text-yellow-700">Todos los destinos disponibles han sido agregados a tu viaje</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Botón continuar mejorado */}
      <div className="px-6 pb-6 pt-4 flex-shrink-0">
        <Button 
          onClick={handleFinishItinerario}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          disabled={destinations.length < 2}
        >
          <Route className="w-5 h-5 mr-2" />
          {destinations.length < 2 ? 'Agrega al menos 2 destinos' : 'Continuar con el Itinerario'}
        </Button>
        
        {destinations.length < 2 && (
          <p className="text-center text-sm text-gray-500 mt-2">
            Necesitas configurar al menos 2 destinos para continuar
          </p>
        )}
      </div>

      {/* Drawer de Estadísticas */}
      {showStatsDrawer && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowStatsDrawer(false)}
          />
          
          {/* Drawer */}
          <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
            {/* Header del drawer */}
            <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Estadísticas del Viaje</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-2 text-white/80 hover:text-white hover:bg-white/20"
                  onClick={() => setShowStatsDrawer(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Contenido del drawer */}
            <div className="p-6 space-y-6 overflow-y-auto h-full">
              {/* Estadísticas del viaje */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <CardContent className="p-4 text-center">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-blue-700">{destinations.length}</div>
                    <div className="text-xs text-blue-600">Destinos</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                  <CardContent className="p-4 text-center">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-green-700">{totalNights}</div>
                    <div className="text-xs text-green-600">Noches</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                  <CardContent className="p-4 text-center">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Plane className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-purple-700">
                      {destinations.filter(d => d.transportIncluded).length}
                    </div>
                    <div className="text-xs text-purple-600">Transportes</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                  <CardContent className="p-4 text-center">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Hotel className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-orange-700">
                      {destinations.filter(d => d.accommodationIncluded).length}
                    </div>
                    <div className="text-xs text-orange-600">Alojamientos</div>
                  </CardContent>
                </Card>
              </div>

              {/* Resumen del viaje */}
              {destinations.length > 0 && (
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-purple-800">Resumen del Viaje</h4>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-700">{destinations.length}</div>
                        <div className="text-xs text-purple-600">Destinos</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-700">{totalNights}</div>
                        <div className="text-xs text-blue-600">Noches</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-700">
                          {destinations.filter(d => d.transportIncluded).length}
                        </div>
                        <div className="text-xs text-green-600">Transportes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-700">
                          {destinations.filter(d => d.accommodationIncluded).length}
                        </div>
                        <div className="text-xs text-orange-600">Alojamientos</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Información adicional */}
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-blue-800">Progreso del Itinerario</h4>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Destinos configurados</span>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        {destinations.length}/10
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(destinations.length / 10) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 text-center">
                      {destinations.length < 2 ? 'Agrega más destinos para continuar' : '¡Itinerario listo para continuar!'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PanelIzquierdoConstructorItinerario;     