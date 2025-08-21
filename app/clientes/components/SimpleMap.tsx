// components/ui/SimpleMap.tsx
"use client"
import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface Destination {
  id: string
  name: string
  lat: number
  lng: number
  type: 'start' | 'destination' | 'end'
  image?: string // URL de la imagen del destino
  description?: string // Descripción del destino
}

interface SimpleMapProps {
  destinations: Destination[]
  className?: string
}

export const SimpleMap = ({ destinations, className = "" }: SimpleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  // Función para centrar el mapa en todos los destinos
  const centerMapOnDestinations = () => {
    if (mapInstanceRef.current && destinations.length > 0) {
      const bounds = L.latLngBounds(destinations.map(dest => [dest.lat, dest.lng]))
      mapInstanceRef.current.fitBounds(bounds, {
        padding: [50, 50],
        maxZoom: 8
      })
    }
  }

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Crear mapa centrado en Sudamérica con navegación habilitada
    const map = L.map(mapRef.current, {
      zoomControl: true,
      scrollWheelZoom: true, // Habilitar zoom con scroll
      dragging: true, // Habilitar arrastrar el mapa
      touchZoom: true, // Habilitar zoom táctil
      doubleClickZoom: true, // Habilitar zoom con doble clic
      boxZoom: true, // Habilitar zoom con caja
      keyboard: true, // Habilitar controles de teclado
      bounceAtZoomLimits: true // Habilitar rebote en límites de zoom
    }).setView([-15.7801, -47.9292], 4)

    mapInstanceRef.current = map

    // Agregar capa OSM
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map)

    // Configurar límites de zoom para mantener una vista razonable
    map.setMinZoom(3)
    map.setMaxZoom(10)

    // Centrar el mapa en Sudamérica cuando se reinicie
    map.on('zoomend', () => {
      if (map.getZoom() < 3) {
        map.setZoom(3)
      }
    })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // Función para crear marcador con imagen personalizada
  const createImageMarker = (dest: Destination, index: number) => {
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

  // Agregar marcadores y líneas cuando cambien los destinos
  useEffect(() => {
    if (!mapInstanceRef.current || destinations.length < 2) return

    // Limpiar capas anteriores
    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        mapInstanceRef.current?.removeLayer(layer)
      }
    })

    // Limpiar también las capas de marcadores y líneas específicamente
    const layersToRemove: L.Layer[] = []
    mapInstanceRef.current.eachLayer((layer) => {
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
        icon: createImageMarker(dest, index)
      }).addTo(mapInstanceRef.current!)

      // Crear popup personalizado con imagen y descripción
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

    // SIEMPRE conectar el último destino con el primer destino (nodo de inicio) para crear el retorno
    if (destinations.length >= 2) {
      const lastDestination = destinations[destinations.length - 1]
      const firstDestination = destinations[0]
      
      // Línea de retorno con estilo diferente (más gruesa y color diferente)
      const returnLine = L.polyline(
        [[lastDestination.lat, lastDestination.lng], [firstDestination.lat, firstDestination.lng]],
        { 
          color: '#dc2626', // Color rojo para distinguir el retorno
          weight: 6, // Más gruesa que las líneas normales
          opacity: 0.9,
          dashArray: '15, 8' // Patrón de línea diferente
        }
      ).addTo(mapInstanceRef.current!)

      // Flecha de retorno en el medio de la línea
      const returnMidLat = (lastDestination.lat + firstDestination.lat) / 2
      const returnMidLng = (lastDestination.lng + firstDestination.lng) / 2
      
      L.marker([returnMidLat, returnMidLng], {
        icon: L.divIcon({
          className: 'custom-div-icon return-arrow-marker',
          html: `<div class="text-red-600 text-2xl drop-shadow-lg">↻</div>`, // Símbolo de retorno
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        })
      }).addTo(mapInstanceRef.current!)
    }

    // Ajustar el mapa para mostrar todos los destinos con un padding
    if (destinations.length > 0) {
      const bounds = L.latLngBounds(destinations.map(dest => [dest.lat, dest.lng]))
      mapInstanceRef.current.fitBounds(bounds, {
        padding: [50, 50], // Padding para que no queden los marcadores en el borde
        maxZoom: 8 // Limitar el zoom máximo para mantener contexto
      })
    }

  }, [destinations])

  return (
    <div 
      ref={mapRef} 
      className={`w-full h-full min-h-[500px] rounded-lg border map-container-navigable ${className}`}
    />
  )
}