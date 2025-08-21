"use client"

import { useState } from 'react'
import { Package, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import dynamic from 'next/dynamic'

// Importación dinámica del mapa para evitar errores de SSR
const SimpleMap = dynamic(
  () => import('../../clientes/components/SimpleMap').then(mod => ({ default: mod.SimpleMap })),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[500px] rounded-lg border bg-muted/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-muted-foreground">Cargando mapa...</p>
        </div>
      </div>
    )
  }
)

// Importación dinámica del panel constructor
const PanelIzquierdoConstructorItinerario = dynamic(
  () => import('../../clientes/components/panel-izquierdo-constructor-itinerario').then(mod => ({ default: mod.PanelIzquierdoConstructorItinerario })),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[500px] rounded-lg border bg-muted/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-muted-foreground">Cargando constructor...</p>
        </div>
      </div>
    )
  }
)

interface Destination {
  id: string
  name: string
  lat: number
  lng: number
  type: 'start' | 'destination' | 'end'
  image?: string
  description?: string
  nights?: number
  transportIncluded?: boolean
  accommodationIncluded?: boolean
}

interface ConstructorPaquetesProps {
  isOpen: boolean
  onClose: () => void
}

export const ConstructorPaquetes = ({ isOpen, onClose }: ConstructorPaquetesProps) => {
  // Estados para el nuevo paquete
  const [destinations, setDestinations] = useState<Destination[]>([
    {
      id: '1',
      name: 'Lima, Perú',
      lat: -12.0464,
      lng: -77.0428,
      type: 'start',
      image: '/assets/banner.jpg',
      description: 'Capital del Perú, centro gastronómico y cultura'
    },
    {
      id: '2',
      name: 'Buenos Aires',
      lat: -34.6118,
      lng: -58.3960,
      type: 'destination',
      image: '/assets/banner.jpg',
      description: 'Capital del tango y la cultura porteña',
      nights: 2,
      transportIncluded: true,
      accommodationIncluded: true
    }
  ])
  const [newDestination, setNewDestination] = useState('')
  const [packageInfo, setPackageInfo] = useState({
    name: 'Paquete Sudamericano',
    duration: '7 días',
    nights: 6,
    travelers: 2,
    startDate: '23 Sept 2025',
    endDate: '29 Sept 2025'
  })

  // Base de datos simple de destinos con imágenes
  const destinationDatabase = {
    'Río de Janeiro': { 
      lat: -22.9068, 
      lng: -43.1729,
      image: '/assets/banner.jpg',
      description: 'Ciudad maravillosa con playas y montañas icónicas'
    },
    'São Paulo': { 
      lat: -23.5505, 
      lng: -46.6333,
      image: '/assets/banner.jpg',
      description: 'Metrópolis financiera y cultural de Brasil'
    },
    'Buenos Aires': { 
      lat: -34.6118, 
      lng: -58.3960,
      image: '/assets/banner.jpg',
      description: 'Capital del tango y la cultura porteña'
    },
    'Santiago': { 
      lat: -33.4489, 
      lng: -70.6693,
      image: '/assets/banner.jpg',
      description: 'Capital de Chile entre la cordillera y el mar'
    },
    'Bogotá': { 
      lat: 4.7110, 
      lng: -74.0721,
      image: '/assets/banner.jpg',
      description: 'Capital de Colombia en los Andes'
    },
    'Quito': { 
      lat: -0.2299, 
      lng: -78.5249,
      image: '/assets/banner.jpg',
      description: 'Capital de Ecuador, patrimonio de la humanidad'
    },
    'La Paz': { 
      lat: -16.4897, 
      lng: -68.1193,
      image: '/assets/banner.jpg',
      description: 'Capital administrativa de Bolivia en el altiplano'
    },
    'Asunción': { 
      lat: -25.2802, 
      lng: -57.6341,
      image: '/assets/banner.jpg',
      description: 'Capital de Paraguay a orillas del río'
    },
    'Montevideo': { 
      lat: -34.9011, 
      lng: -56.1645,
      image: '/assets/banner.jpg',
      description: 'Capital de Uruguay con hermosas playas'
    },
    'Caracas': { 
      lat: 10.4806, 
      lng: -66.9036,
      image: '/assets/banner.jpg',
      description: 'Capital de Venezuela en el valle de Caracas'
    }
  }

  const addDestination = () => {
    if (!newDestination.trim()) return

    const destData = destinationDatabase[newDestination as keyof typeof destinationDatabase]
    
    if (destData) {
      const newDest: Destination = {
        id: Date.now().toString(),
        name: newDestination,
        lat: destData.lat,
        lng: destData.lng,
        type: 'destination',
        nights: 1,
        transportIncluded: true,
        accommodationIncluded: true,
        image: destData.image,
        description: destData.description
      }

      setDestinations(prev => [...prev, newDest])
      setNewDestination('')
      toast.success(`¡Destino "${newDestination}" agregado exitosamente al itinerario!`)
    } else {
      toast.error(`No se encontró el destino "${newDestination}". Por favor, intenta con otro nombre.`)
    }
  }

  const removeDestination = (id: string) => {
    setDestinations(prev => prev.filter(dest => dest.id !== id))
  }

  const updateDestination = (id: string, updates: Partial<Destination>) => {
    setDestinations(prev => 
      prev.map(dest => 
        dest.id === id ? { ...dest, ...updates } : dest
      )
    )
  }

  const finishItinerary = () => {
    // Agregar punto final
    const lastDest = destinations[destinations.length - 1]
    if (lastDest && lastDest.type !== 'end') {
      const endDest: Destination = {
        id: 'end',
        name: 'Lima, Perú',
        lat: -12.0464,
        lng: -77.0428,
        type: 'end'
      }
      setDestinations(prev => [...prev, endDest])
      toast.success('¡Itinerario completado! Se ha agregado el punto de retorno a Lima, Perú.')
    } else {
      toast.info('El itinerario ya está completo con punto de retorno.')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-xl w-[90vw] max-w-7xl h-[85vh] overflow-hidden shadow-2xl border">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-3 flex-1">
            <div className="p-2 bg-primary/10 rounded-full flex-shrink-0">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold text-foreground">Constructor de Paquetes Turísticos</h2>
              <p className="text-sm text-muted-foreground mt-1">Construye un nuevo paquete turístico con destinos, servicios y configuración completa</p>
              <p className="text-xs text-blue-600 mt-1">
                💡 Destinos disponibles: Río de Janeiro, São Paulo, Buenos Aires, Santiago, Bogotá, Quito, La Paz, Asunción, Montevideo, Caracas
              </p>
            </div>
          </div>
          
          {/* Tarjeta de Resumen del Paquete */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="bg-white rounded-lg p-3 border shadow-sm min-w-0">
              <div className="text-center">
                <div className="text-sm font-medium text-gray-600">Paquete en Construcción</div>
                <div className="text-base font-bold text-primary truncate">{packageInfo.name}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {packageInfo.startDate} - {packageInfo.endDate}
                </div>
                <div className="flex items-center justify-center gap-2 mt-2 text-xs text-gray-600">
                  <span>📅 {packageInfo.duration}</span>
                  <span>🌙 {packageInfo.nights} noches</span>
                  <span>👥 {packageInfo.travelers} viajeros</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                onClick={finishItinerary}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm h-10"
                disabled={destinations.length < 2}
              >
                Finalizar Paquete
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-10 w-10 hover:bg-red-100 hover:text-red-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Contenido Principal */}
        <div className="flex-1 overflow-hidden bg-gray-50 h-[calc(85vh-88px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full">
            {/* Panel Izquierdo - Constructor de itinerario */}
            <div className="h-full overflow-y-auto p-4 border-r border-gray-200 bg-white">
              <div className="max-w-lg mx-auto space-y-4">
                {/* Indicador de Progreso */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-800">Progreso del Itinerario</h3>
                    <span className="text-xs text-blue-600 font-medium bg-white px-2 py-1 rounded-full">
                      {destinations.length} destinos
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((destinations.length / 3) * 100, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span className="bg-white px-2 py-1 rounded-full">Inicio</span>
                    <span className="bg-white px-2 py-1 rounded-full">En progreso</span>
                    <span className="bg-white px-2 py-1 rounded-full">Completado</span>
                  </div>
                </div>

                {/* Estadísticas del Paquete */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white rounded-lg p-3 border text-center shadow-sm">
                    <div className="text-xl font-bold text-blue-600">{destinations.length}</div>
                    <div className="text-xs text-gray-600">Destinos</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border text-center shadow-sm">
                    <div className="text-xl font-bold text-green-600">
                      {destinations.reduce((total, dest) => total + (dest.nights || 0), 0)}
                    </div>
                    <div className="text-xs text-gray-600">Noches</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border text-center shadow-sm">
                    <div className="text-xl font-bold text-purple-600">
                      {destinations.filter(dest => dest.transportIncluded).length}
                    </div>
                    <div className="text-xs text-gray-600">Transportes</div>
                  </div>
                </div>

                {/* Panel Constructor de Itinerario */}
                <PanelIzquierdoConstructorItinerario
                  destinations={destinations}
                  newDestination={newDestination}
                  setNewDestination={setNewDestination}
                  addDestination={addDestination}
                  removeDestination={removeDestination}
                  updateDestination={updateDestination}
                  finishItinerary={finishItinerary}
                />

                {/* Footer con Información Adicional */}
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Información del Paquete</h4>
                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex justify-between items-center">
                      <span>Nombre del Paquete:</span>
                      <span className="font-medium text-primary">{packageInfo.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Duración Total:</span>
                      <span className="font-medium">{packageInfo.duration}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Total de Noches:</span>
                      <span className="font-medium text-green-600">{destinations.reduce((total, dest) => total + (dest.nights || 0), 0)} noches</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Viajeros:</span>
                      <span className="font-medium">{packageInfo.travelers} personas</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Panel Derecho - Mapa */}
            <div className="h-full bg-white">
              <div className="h-full w-full">
                <SimpleMap destinations={destinations} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConstructorPaquetes
