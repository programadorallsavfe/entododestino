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
  const [currentStep, setCurrentStep] = useState(1)
  const [packageInfo, setPackageInfo] = useState({
    name: 'Paquete Sudamericano',
    duration: '7 días',
    nights: 6,
    travelers: 2,
    startDate: '23 Sept 2025',
    endDate: '29 Sept 2025',
    price: 2899.99,
    discountPrice: 2599.99,
    description: 'Paquete turístico completo por Sudamérica',
    category: 'Aventura',
    difficulty: 'Fácil',
    maxTravelers: 8,
    includes: ['Hoteles', 'Tours', 'Visitas guiadas', 'Traslados', 'Alimentación'],
    notIncludes: ['Vuelos internacionales', 'Seguro de viaje', 'Propinas']
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

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFinishPackage = () => {
    // Aquí se guardaría el paquete completo
    toast.success('¡Paquete turístico creado exitosamente!')
    onClose()
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
              <p className="text-sm text-muted-foreground mt-1">Paso {currentStep} de 2: {currentStep === 1 ? 'Construir Itinerario' : 'Configurar Paquete'}</p>
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
              {currentStep === 2 && (
                <Button
                  onClick={handleFinishPackage}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm h-10"
                >
                  Crear Paquete
                </Button>
              )}
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

        {/* Indicador de Pasos */}
        <div className="bg-white border-b px-6 py-3">
          <div className="flex items-center justify-center space-x-8">
            <div className={`flex items-center space-x-2 ${currentStep >= 1 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                1
              </div>
              <span className="text-sm font-medium">Construir Itinerario</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-200"></div>
            <div className={`flex items-center space-x-2 ${currentStep >= 2 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                2
              </div>
              <span className="text-sm font-medium">Configurar Paquete</span>
            </div>
          </div>
        </div>
        
        {/* Contenido Principal */}
        <div className="flex-1 overflow-hidden bg-gray-50 h-[calc(85vh-140px)]">
          {currentStep === 1 ? (
            // PASO 1: Constructor de Itinerario
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
                    onContinue={nextStep}
                    isWizard={true}
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
          ) : (
            // PASO 2: Configuración del Paquete
            <div className="h-full overflow-y-auto p-6 bg-white">
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Configuración del Paquete Turístico</h3>
                  <p className="text-gray-600">Completa los detalles finales de tu paquete turístico</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Información Básica */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">Información Básica</h4>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Paquete</label>
                        <input
                          type="text"
                          value={packageInfo.name}
                          onChange={(e) => setPackageInfo(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                        <textarea
                          value={packageInfo.description}
                          onChange={(e) => setPackageInfo(prev => ({ ...prev, description: e.target.value }))}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                          <select
                            value={packageInfo.category}
                            onChange={(e) => setPackageInfo(prev => ({ ...prev, category: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          >
                            <option value="Aventura">Aventura</option>
                            <option value="Cultural">Cultural</option>
                            <option value="Relax">Relax</option>
                            <option value="Gastronómico">Gastronómico</option>
                            <option value="Ecoturismo">Ecoturismo</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Dificultad</label>
                          <select
                            value={packageInfo.difficulty}
                            onChange={(e) => setPackageInfo(prev => ({ ...prev, difficulty: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          >
                            <option value="Fácil">Fácil</option>
                            <option value="Moderado">Moderado</option>
                            <option value="Difícil">Difícil</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Precios y Capacidad */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">Precios y Capacidad</h4>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Precio Base (USD)</label>
                        <input
                          type="number"
                          value={packageInfo.price}
                          onChange={(e) => setPackageInfo(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Precio con Descuento (USD)</label>
                        <input
                          type="number"
                          value={packageInfo.discountPrice}
                          onChange={(e) => setPackageInfo(prev => ({ ...prev, discountPrice: parseFloat(e.target.value) }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Máximo de Viajeros</label>
                        <input
                          type="number"
                          value={packageInfo.maxTravelers}
                          onChange={(e) => setPackageInfo(prev => ({ ...prev, maxTravelers: parseInt(e.target.value) }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Servicios Incluidos y No Incluidos */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">Servicios Incluidos</h4>
                    <div className="space-y-2">
                      {packageInfo.includes.map((service, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={service}
                            onChange={(e) => {
                              const newIncludes = [...packageInfo.includes]
                              newIncludes[index] = e.target.value
                              setPackageInfo(prev => ({ ...prev, includes: newIncludes }))
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                          <button
                            onClick={() => {
                              const newIncludes = packageInfo.includes.filter((_, i) => i !== index)
                              setPackageInfo(prev => ({ ...prev, includes: newIncludes }))
                            }}
                            className="px-2 py-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => setPackageInfo(prev => ({ ...prev, includes: [...prev.includes, ''] }))}
                        className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-primary hover:text-primary transition-colors"
                      >
                        + Agregar Servicio
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">Servicios No Incluidos</h4>
                    <div className="space-y-2">
                      {packageInfo.notIncludes.map((service, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={service}
                            onChange={(e) => {
                              const newNotIncludes = [...packageInfo.notIncludes]
                              newNotIncludes[index] = e.target.value
                              setPackageInfo(prev => ({ ...prev, notIncludes: newNotIncludes }))
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                          <button
                            onClick={() => {
                              const newNotIncludes = packageInfo.notIncludes.filter((_, i) => i !== index)
                              setPackageInfo(prev => ({ ...prev, notIncludes: newNotIncludes }))
                            }}
                            className="px-2 py-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => setPackageInfo(prev => ({ ...prev, notIncludes: [...prev.notIncludes, ''] }))}
                        className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-primary hover:text-primary transition-colors"
                      >
                        + Agregar Servicio
                      </button>
                    </div>
                  </div>
                </div>

                {/* Resumen del Itinerario */}
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Resumen del Itinerario</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{destinations.length}</div>
                      <div className="text-sm text-gray-600">Destinos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {destinations.reduce((total, dest) => total + (dest.nights || 0), 0)}
                      </div>
                      <div className="text-sm text-gray-600">Noches</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {destinations.filter(dest => dest.transportIncluded).length}
                      </div>
                      <div className="text-sm text-gray-600">Transportes</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navegación entre Pasos */}
        <div className="bg-white border-t px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {currentStep > 1 && (
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="px-6 py-2"
                >
                  ← Anterior
                </Button>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              {currentStep === 1 && (
                <Button
                  onClick={nextStep}
                  disabled={destinations.length < 2}
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-2"
                >
                  Siguiente →
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConstructorPaquetes
