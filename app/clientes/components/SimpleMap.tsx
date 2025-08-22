"use client"
import { useEffect, useRef, useState } from 'react'

interface Destination {
  id: string
  name: string
  lat: number
  lng: number
  type: 'start' | 'destination' | 'end'
  image?: string
  description?: string
}

interface SimpleMapProps {
  destinations: Destination[]
  className?: string
}

export const SimpleMap = ({ destinations, className = "" }: SimpleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [isCreatingMap, setIsCreatingMap] = useState(false)

  // Si estamos en SSR, mostrar un placeholder
  if (typeof window === 'undefined') {
    return (
      <div className={`${className} flex items-center justify-center bg-muted rounded-lg`}>
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <p className="text-sm text-muted-foreground">Cargando mapa...</p>
        </div>
      </div>
    )
  }

  // Función para centrar el mapa en todos los destinos
  const centerMapOnDestinations = (L: any) => {
    if (mapInstanceRef.current && destinations.length > 0) {
      const bounds = L.latLngBounds(destinations.map(dest => [dest.lat, dest.lng]))
      mapInstanceRef.current.fitBounds(bounds, {
        padding: [50, 50],
        maxZoom: 8
      })
    }
  }

  // Función para crear marcador con imagen personalizada
  const createImageMarker = (dest: Destination, index: number, L: any) => {
    const markerSize = 48
    const iconSize: [number, number] = [markerSize, markerSize]
    const iconAnchor: [number, number] = [markerSize / 2, markerSize / 2]

    // Crear marcador con imagen
    if (dest.image) {
      return L.divIcon({
        className: 'custom-image-marker',
        html: `
          <div class="relative group">
            <div class="w-12 h-12 rounded-full overflow-hidden border-3 border-white shadow-lg cursor-pointer transition-transform hover:scale-110">
              <img 
                src="${dest.image}" 
                alt="${dest.name}"
                class="w-full h-full object-cover"
                onerror="this.src='/assets/banner.jpg'; this.onerror=null;"
                style="width: 100%; height: 100%; object-fit: cover;"
              />
            </div>
            <div class="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
              dest.type === 'start' ? 'bg-green-500' : 
              dest.type === 'end' ? 'bg-red-500' : 'bg-blue-500'
            }">
              ${dest.type === 'start' ? 'I' : dest.type === 'end' ? 'F' : index + 1}
            </div>
          </div>
        `,
        iconSize,
        iconAnchor
      })
    }

    // Marcador por defecto sin imagen
    return L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm border-3 border-white shadow-lg ${
          dest.type === 'start' ? 'bg-green-500' : 
          dest.type === 'end' ? 'bg-red-500' : 'bg-blue-500'
        }">
          ${dest.type === 'start' ? 'I' : dest.type === 'end' ? 'F' : index + 1}
        </div>
      `,
      iconSize,
      iconAnchor
    })
  }

  // Función para crear el mapa
  const createMap = async () => {
    if (!mapRef.current || isCreatingMap) return

    try {
      setIsCreatingMap(true)
      
      // Limpiar instancia anterior si existe
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }

      // Verificar que el contenedor no tenga ya un mapa
      if ((mapRef.current as any)._leaflet_id) {
        setIsCreatingMap(false)
        return
      }

      // Importar Leaflet dinámicamente
      const L = await import('leaflet')
      
      // Cargar CSS solo una vez
      if (!document.querySelector('link[href*="leaflet.css"]')) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY='
        link.crossOrigin = ''
        document.head.appendChild(link)
      }

      // Crear mapa centrado en Sudamérica
      const map = L.map(mapRef.current, {
        zoomControl: true,
        scrollWheelZoom: true,
        dragging: true,
        touchZoom: true,
        doubleClickZoom: true,
        boxZoom: true,
        keyboard: true,
        bounceAtZoomLimits: true
      }).setView([-15.7801, -47.9292], 4)

      mapInstanceRef.current = map

      // Agregar capa OSM
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map)

      // Configurar límites de zoom
      map.setMinZoom(3)
      map.setMaxZoom(10)

      // Centrar el mapa en Sudamérica cuando se reinicie
      map.on('zoomend', () => {
        if (map.getZoom() < 3) {
          map.setZoom(3)
        }
      })

      setIsMapLoaded(true)
    } catch (error) {
      console.error('Error loading Leaflet:', error)
    } finally {
      setIsCreatingMap(false)
    }
  }

  // Crear mapa cuando el componente se monta
  useEffect(() => {
    createMap()

    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove()
        } catch (error) {
          // Ignorar errores de limpieza
        }
        mapInstanceRef.current = null
      }
      
      // Limpiar también el contenedor
      if (mapRef.current && (mapRef.current as any)._leaflet_id) {
        delete (mapRef.current as any)._leaflet_id
      }
    }
  }, [])

  // Agregar marcadores y líneas cuando cambien los destinos
  useEffect(() => {
    if (!mapInstanceRef.current || destinations.length < 2 || !isMapLoaded) return

    const updateMap = async () => {
      try {
        const L = await import('leaflet')
        
        // Limpiar capas anteriores
        const layersToRemove: any[] = []
        mapInstanceRef.current.eachLayer((layer: any) => {
          if (layer instanceof L.Marker || layer instanceof L.Polyline) {
            layersToRemove.push(layer)
          }
        })
        
        layersToRemove.forEach(layer => {
          mapInstanceRef.current?.removeLayer(layer)
        })

        // Agregar marcadores con imágenes
        destinations.forEach((dest, index) => {
          const marker = L.marker([dest.lat, dest.lng], {
            icon: createImageMarker(dest, index, L)
          }).addTo(mapInstanceRef.current!)

          // Crear popup personalizado
          const popupContent = `
            <div class="p-3 min-w-[200px]">
              <div class="flex items-center space-x-3 mb-2">
                ${dest.image ? `
                  <div class="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src="${dest.image}" 
                      alt="${dest.name}"
                      class="w-full h-full object-cover"
                      onerror="this.src='/assets/banner.jpg'"
                    />
                  </div>
                ` : ''}
                <div>
                  <h3 class="font-semibold text-gray-800 text-sm">${dest.name}</h3>
                  <span class="text-xs px-2 py-1 rounded-full text-white ${
                    dest.type === 'start' ? 'bg-green-500' : 
                    dest.type === 'end' ? 'bg-red-500' : 'bg-blue-500'
                  }">${dest.type === 'start' ? 'Inicio' : dest.type === 'end' ? 'Final' : 'Destino'}</span>
                </div>
              </div>
              ${dest.description ? `<p class="text-xs text-gray-600">${dest.description}</p>` : ''}
            </div>
          `

          marker.bindPopup(popupContent, {
            maxWidth: 250,
            className: 'custom-popup'
          })
        })

        // Agregar líneas con flechas entre destinos consecutivos
        for (let i = 0; i < destinations.length - 1; i++) {
          const current = destinations[i]
          const next = destinations[i + 1]
          
          const line = L.polyline(
            [[current.lat, current.lng], [next.lat, next.lng]],
            { 
              color: '#1605ac', 
              weight: 4, 
              opacity: 0.8,
              dashArray: '10, 5'
            }
          ).addTo(mapInstanceRef.current!)

          // Agregar flecha en el medio de la línea
          const midLat = (current.lat + next.lat) / 2
          const midLng = (current.lng + next.lng) / 2
          
          L.marker([midLat, midLng], {
            icon: L.divIcon({
              className: 'custom-div-icon arrow-marker',
              html: `<div class="text-blue-600 text-2xl drop-shadow-lg">→</div>`,
              iconSize: [24, 24],
              iconAnchor: [12, 12]
            })
          }).addTo(mapInstanceRef.current!)
        }

        // Centrar mapa en los destinos
        centerMapOnDestinations(L)
      } catch (error) {
        console.error('Error updating map:', error)
      }
    }

    updateMap()
  }, [destinations, isMapLoaded])

  return (
    <div 
      ref={mapRef} 
      className={`${className} bg-muted rounded-lg overflow-hidden`}
      style={{ minHeight: '400px' }}
    />
  )
}