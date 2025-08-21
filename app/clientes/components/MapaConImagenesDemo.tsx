"use client"
import { SimpleMap } from './SimpleMap'
import { destinosEjemplo, Destination } from '@/utils/mockdata-destinos'

export const MapaConImagenesDemo = () => {
  // Usar los destinos de ejemplo que incluyen imágenes
  const destinations: Destination[] = destinosEjemplo

  return (
    <div className="w-full h-full">
      <div className="mb-4 p-4 bg-card border rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Mapa con Imágenes de Destinos</h3>
        <p className="text-sm text-muted-foreground">
          Cada marcador en el mapa muestra la imagen del destino correspondiente.
          Las imágenes se cargan desde <code className="bg-muted px-1 rounded">/assets/banner.jpg</code>
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {destinations.map((dest) => (
            <div key={dest.id} className="flex items-center space-x-2 bg-muted/50 px-3 py-2 rounded-md">
              <div className="w-6 h-6 rounded-full overflow-hidden">
                <img 
                  src={dest.image || "/assets/banner.jpg"} 
                  alt={dest.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-medium">{dest.name}</span>
              <span className={`text-xs px-2 py-1 rounded-full text-white ${
                dest.type === 'start' ? 'bg-green-500' : 
                dest.type === 'end' ? 'bg-red-500' : 'bg-blue-500'
              }`}>
                {dest.type === 'start' ? 'Inicio' : dest.type === 'end' ? 'Final' : 'Destino'}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <SimpleMap destinations={destinations} className="h-96" />
    </div>
  )
}
