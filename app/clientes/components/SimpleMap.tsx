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
}

interface SimpleMapProps {
  destinations: Destination[]
  className?: string
}

export const SimpleMap = ({ destinations, className = "" }: SimpleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Crear mapa centrado en Sudamérica con zoom fijo
    const map = L.map(mapRef.current, {
      zoomControl: true,
      scrollWheelZoom: false, // Deshabilitar zoom con scroll
      dragging: false, // Deshabilitar arrastrar el mapa
      touchZoom: false, // Deshabilitar zoom táctil
      doubleClickZoom: false, // Deshabilitar zoom con doble clic
      boxZoom: false, // Deshabilitar zoom con caja
      keyboard: false, // Deshabilitar controles de teclado
      bounceAtZoomLimits: false // Deshabilitar rebote en límites de zoom
    }).setView([-15.7801, -47.9292], 4)

    mapInstanceRef.current = map

    // Agregar capa OSM
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map)

    // Fijar el zoom y centro del mapa
    map.setMaxBounds(map.getBounds())
    map.setMinZoom(3)
    map.setMaxZoom(6)

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // Agregar marcadores y líneas cuando cambien los destinos
  useEffect(() => {
    if (!mapInstanceRef.current || destinations.length < 2) return

    // Limpiar capas anteriores
    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        mapInstanceRef.current?.removeLayer(layer)
      }
    })

    // Agregar marcadores
    destinations.forEach((dest, index) => {
      const marker = L.marker([dest.lat, dest.lng])
        .addTo(mapInstanceRef.current!)
        .bindPopup(`
          <div class="text-center">
            <strong>${dest.name}</strong><br>
            <span class="text-sm text-gray-600">${dest.type}</span>
          </div>
        `)

      // Personalizar marcadores según tipo
      if (dest.type === 'start') {
        marker.setIcon(L.divIcon({
          className: 'custom-div-icon start-marker',
          html: `<div class="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">I</div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        }))
      } else if (dest.type === 'end') {
        marker.setIcon(L.divIcon({
          className: 'custom-div-icon end-marker',
          html: `<div class="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">F</div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        }))
      } else {
        marker.setIcon(L.divIcon({
          className: 'custom-div-icon destination-marker',
          html: `<div class="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">${index}</div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        }))
      }
    })

    // Agregar líneas simples entre destinos consecutivos
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
          html: `<div class="text-blue-600 text-2xl">→</div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        })
      }).addTo(mapInstanceRef.current!)
    }

  }, [destinations])

  return (
    <div 
      ref={mapRef} 
      className={`w-full h-full min-h-[500px] rounded-lg border map-container-static ${className}`}
      style={{
        position: 'sticky',
        top: '0',
        zIndex: 10
      }}
    />
  )
}