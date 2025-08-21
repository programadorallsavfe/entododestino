"use client"
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Star, 
  Wifi, 
  Car, 
  Utensils, 
  Snowflake,
  Building,
  Heart,
  Eye,
  Phone,
  Globe,
  MapPin
} from 'lucide-react'

interface Alojamiento {
  id: string
  nombre: string
  tipo: 'hotel' | 'hostal' | 'casa' | 'apartamento' | 'resort'
  categoria: number
  ubicacion: string
  distanciaCentro: string
  precio: number
  precioDescuento?: number
  descuento?: number
  imagen: string
  calificacion: number
  numResenas: number
  servicios: string[]
  descripcion: string
  habitacionesDisponibles: number
  fechaReferencia: string
  puntosLoyalty: number
}

interface TarjetaAlojamientoProps {
  alojamiento: Alojamiento
  onVerDetalles: (id: string) => void
  onContactar: (id: string) => void
  onFavorito: (id: string) => void
  onVistaRapida: (id: string) => void
}

export const TarjetaAlojamiento = ({ 
  alojamiento, 
  onVerDetalles, 
  onContactar, 
  onFavorito, 
  onVistaRapida 
}: TarjetaAlojamientoProps) => {
  
  const renderEstrellas = (categoria: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < categoria ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ))
  }

  const renderServicios = (servicios: string[]) => {
    const iconosServicios: { [key: string]: any } = {
      'Wifi': Wifi,
      'Aire acondicionado': Snowflake,
      'Restaurante': Utensils,
      'Estacionamiento': Car,
      'Piscina': Building,
      'Playa privada': Globe,
      'Vista al mar': Eye
    }

    return servicios.map((servicio, index) => {
      const Icono = iconosServicios[servicio]
      return (
        <div key={index} className="flex items-center space-x-1 text-xs text-muted-foreground">
          {Icono && <Icono className="w-3 h-3" />}
          <span>{servicio}</span>
        </div>
      )
    })
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      {/* Imagen */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={alojamiento.imagen}
          alt={alojamiento.nombre}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Botones de acción flotantes */}
        <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button 
            size="sm" 
            variant="ghost" 
            className="bg-white/90 hover:bg-white"
            onClick={() => onFavorito(alojamiento.id)}
          >
            <Heart className="w-4 h-4 text-red-500" />
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className="bg-white/90 hover:bg-white"
            onClick={() => onVistaRapida(alojamiento.id)}
          >
            <Eye className="w-4 h-4 text-blue-600" />
          </Button>
        </div>
        
        {/* Badge de descuento */}
        {alojamiento.descuento && (
          <Badge className="absolute top-3 left-3 bg-red-500 text-white animate-pulse">
            -{alojamiento.descuento}%
          </Badge>
        )}
        
        {/* Overlay de información rápida */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end">
          <div className="w-full p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-sm font-medium">{alojamiento.descripcion}</p>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Tipo y Categoría */}
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs">
            {alojamiento.tipo.toUpperCase()}
          </Badge>
          <div className="flex items-center space-x-1">
            {renderEstrellas(alojamiento.categoria)}
          </div>
        </div>

        {/* Nombre del Hotel */}
        <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {alojamiento.nombre}
        </h3>

        {/* Ubicación y Distancia */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-3">
          <MapPin className="w-4 h-4" />
          <span>{alojamiento.ubicacion}</span>
          <span>•</span>
          <span>{alojamiento.distanciaCentro}</span>
        </div>

        {/* Calificación */}
        <div className="flex items-center space-x-2 mb-3">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            {alojamiento.calificacion}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {alojamiento.numResenas} reseñas
          </span>
        </div>

        {/* Servicios */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {renderServicios(alojamiento.servicios.slice(0, 4))}
        </div>

        <Separator className="my-4" />

        {/* Precios */}
        <div className="flex items-center justify-between mb-3">
          <div>
            {alojamiento.precioDescuento ? (
              <>
                <span className="text-sm text-muted-foreground line-through">
                  S/ {alojamiento.precio}
                </span>
                <div className="text-xl font-bold text-primary">
                  S/ {alojamiento.precioDescuento}
                </div>
              </>
            ) : (
              <div className="text-xl font-bold text-primary">
                S/ {alojamiento.precio}
              </div>
            )}
            <div className="text-xs text-muted-foreground">
              por noche
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-muted-foreground">
              {alojamiento.habitacionesDisponibles} habitaciones disponibles
            </div>
            <div className="text-xs text-muted-foreground">
              Ref: {alojamiento.fechaReferencia}
            </div>
          </div>
        </div>

        {/* Puntos Loyalty */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
              🎯 {alojamiento.puntosLoyalty} puntos
            </Badge>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="grid grid-cols-2 gap-2">
          <Button 
            className="w-full" 
            size="sm"
            onClick={() => onVerDetalles(alojamiento.id)}
          >
            Ver Detalles
          </Button>
          <Button 
            variant="outline" 
            className="w-full" 
            size="sm"
            onClick={() => onContactar(alojamiento.id)}
          >
            <Phone className="w-4 h-4 mr-2" />
            Contactar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
