// app/clientes/configurar-tour/page.tsx
"use client"
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

import { Destination, PanelIzquierdoConstructorItinerario } from '../components/panel-izquierdo-constructor-itinerario'

// Importación dinámica del mapa para evitar errores de SSR
const SimpleMap = dynamic(
  () => import('../components/SimpleMap').then(mod => ({ default: mod.SimpleMap })),
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

export default function ConfigurarTourPage() {
  const [destinations, setDestinations] = useState<Destination[]>([
    {
      id: '1',
      name: 'Lima, Perú',
      lat: -12.0464,
      lng: -77.0428,
      type: 'start'
    }
  ])

  const [newDestination, setNewDestination] = useState('')
  const [isClient, setIsClient] = useState(false)

  // Verificar que estamos en el cliente
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Base de datos simple de destinos
  const destinationDatabase = {
    'Río de Janeiro': { lat: -22.9068, lng: -43.1729 },
    'São Paulo': { lat: -23.5505, lng: -46.6333 },
    'Buenos Aires': { lat: -34.6118, lng: -58.3960 },
    'Santiago': { lat: -33.4489, lng: -70.6693 },
    'Bogotá': { lat: 4.7110, lng: -74.0721 },
    'Quito': { lat: -0.2299, lng: -78.5249 },
    'La Paz': { lat: -16.4897, lng: -68.1193 },
    'Asunción': { lat: -25.2802, lng: -57.6341 },
    'Montevideo': { lat: -34.9011, lng: -56.1645 },
    'Caracas': { lat: 10.4806, lng: -66.9036 }
  }

  const addDestination = () => {
    if (!newDestination.trim()) return

    const coords = destinationDatabase[newDestination as keyof typeof destinationDatabase]
    
    if (coords) {
      const newDest: Destination = {
        id: Date.now().toString(),
        name: newDestination,
        lat: coords.lat,
        lng: coords.lng,
        type: 'destination',
        nights: 1,
        transportIncluded: true,
        accommodationIncluded: true
      }

      setDestinations(prev => [...prev, newDest])
      setNewDestination('')
    } else {
      alert('Destino no encontrado. Prueba con: Río de Janeiro, São Paulo, Buenos Aires, Santiago, Bogotá, Quito, La Paz, Asunción, Montevideo, Caracas')
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
    }
  }

  return (
    <div className="bg-background p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-120px)]">
        
        {/* Panel izquierdo - Constructor de itinerario */}
        <div className="h-full overflow-y-auto">
          <PanelIzquierdoConstructorItinerario
            destinations={destinations}
            newDestination={newDestination}
            setNewDestination={setNewDestination}
            addDestination={addDestination}
            removeDestination={removeDestination}
            updateDestination={updateDestination}
            finishItinerary={finishItinerary}
          />
        </div>
        
        {/* Panel derecho - Mapa (Fijo) */}
        <div className="h-full sticky top-0">
          {isClient ? (
            <SimpleMap destinations={destinations} />
          ) : (
            <div className="w-full h-full min-h-[500px] rounded-lg border bg-muted/20 flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-muted-foreground">Cargando mapa...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}