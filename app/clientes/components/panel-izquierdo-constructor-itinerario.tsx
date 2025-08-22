import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
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
                    <span className="text-xs text-gray-600">Transporte incluido</span>
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
                      <Button variant="ghost" size="sm" className="p-1">
                        <span className="sr-only">Opciones</span>
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
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
                          <span className="text-sm text-gray-700">Transporte incluido</span>
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
        {destinations.length > 0 && (
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
                  
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Destino"
                      value={newDestination}
                      onChange={(e) => setNewDestination(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Destino sugerido */}
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">Lima, Perú</span>
                      <span className="text-xs text-gray-500">🇵🇪</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">sáb. 13 sept 2025 - Fin</span>
                      <Button variant="ghost" size="sm" className="p-1">
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Botón continuar */}
      <div className="pt-4">
        <Button 
          onClick={handleFinishItinerario}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3"
        >
          Continuar
        </Button>
      </div>
    </div>
  )
}

export default PanelIzquierdoConstructorItinerario;     