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
  X
} from 'lucide-react'

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
    <div className="h-full space-y-6 bg-white rounded-lg p-6">
      {/* Header del itinerario */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Cree el itinerario de su viaje</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>2 Adultos</span>
          </div>
        </div>
        
        {/* Fechas del viaje */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">
              {startDate} {'>'} {endDate}
            </span>
            <span className="text-sm text-gray-500">{totalNights} Noches</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="p-2">
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Lista de destinos */}
      <div className="space-y-4">
        {destinations.map((destination, index) => (
          <div key={destination.id} className="relative">
            {/* Línea conectora */}
            {index > 0 && (
              <div className="absolute left-6 top-0 w-0.5 h-8 bg-gray-300 border-l-2 border-dashed border-gray-400">
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="flex items-center space-x-2 bg-white px-2 py-1 rounded-full shadow-sm">
                    <Plane className="w-3 h-3 text-blue-600" />
                    <Switch 
                      checked={destination.transportIncluded} 
                      onCheckedChange={(checked) => updateDestination(destination.id, { transportIncluded: checked })}
                      className="scale-75"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Tarjeta del destino */}
            <Card className="relative border border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  {/* Badge numerado */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    destination.type === 'start' ? 'bg-blue-500' : 
                    destination.type === 'end' ? 'bg-pink-500' : 'bg-purple-500'
                  }`}>
                    {destination.type === 'start' ? '1' : 
                     destination.type === 'end' ? '2' : index + 1}
                  </div>

                  {/* Contenido del destino */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">{destination.name}</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-1 text-red-500 hover:text-red-700"
                        onClick={() => removeDestination(destination.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Fechas del destino */}
                    <p className="text-sm text-gray-600">
                      {destination.startDate} {'>'} {destination.endDate}
                    </p>

                    {/* Controles de transporte y alojamiento */}
                    <div className="space-y-3">
                      {/* Transporte */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Plane className="w-4 h-4 text-blue-600" />
                        </div>
                        <Switch 
                          checked={destination.transportIncluded} 
                          onCheckedChange={(checked) => updateDestination(destination.id, { transportIncluded: checked })}
                        />
                      </div>

                      {/* Alojamiento */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Hotel className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-700">Alojamiento incluido</span>
                        </div>
                        <Switch 
                          checked={destination.accommodationIncluded} 
                          onCheckedChange={(checked) => updateDestination(destination.id, { accommodationIncluded: checked })}
                        />
                      </div>

                      {/* Selector de noches */}
                      {destination.accommodationIncluded && (
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-gray-700">Noches</span>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-8 h-8 p-0"
                              onClick={() => {
                                const currentNights = destination.nights || 1
                                if (currentNights > 1) {
                                  updateDestination(destination.id, { nights: currentNights - 1 })
                                }
                              }}
                            >
                              -
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">
                              {destination.nights || 1}
                            </span>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-8 h-8 p-0"
                              onClick={() => {
                                const currentNights = destination.nights || 1
                                updateDestination(destination.id, { nights: currentNights + 1 })
                              }}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      )}
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
            <div className="absolute left-6 top-0 w-0.5 h-8 bg-gray-300 border-l-2 border-dashed border-gray-400">
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="flex items-center space-x-2 bg-white px-2 py-1 rounded-full shadow-sm">
                  <Plane className="w-3 h-3 text-blue-600" />
                  <span className="text-xs text-gray-600">Transporte incluido</span>
                  <Switch defaultChecked className="scale-75" />
                </div>
              </div>
            </div>

            {/* Campo para agregar próximo destino */}
            <Card className="relative border border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700">¿Tu próximo destino?</h4>
                  
                  <div className="space-y-3">
                    <Select value={newDestination} onValueChange={setNewDestination}>
                      <SelectTrigger>
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
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-900">{newDestination}</span>
                          <span className="text-xs text-gray-500">🇵🇪</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">sáb. 13 sept 2025 - Fin</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="p-1"
                            onClick={() => setNewDestination('')}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {newDestination && (
                      <Button 
                        onClick={addDestination}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        size="sm"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Agregar Destino
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Mensaje cuando no hay más destinos disponibles */}
        {availableDestinations.length === 0 && destinations.length > 0 && (
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Todos los destinos disponibles han sido agregados</p>
          </div>
        )}
      </div>

      {/* Botón continuar */}
      <div className="pt-4">
        <Button 
          onClick={handleFinishItinerario}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3"
          disabled={destinations.length < 2}
        >
          Continuar
        </Button>
      </div>
    </div>
  )
}

export default PanelIzquierdoConstructorItinerario;     