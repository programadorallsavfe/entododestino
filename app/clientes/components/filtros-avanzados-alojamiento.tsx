"use client"
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { 
  Filter, 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Wifi, 
  Car, 
  Utensils, 
  Snowflake,
  Building,
  Globe,
  Eye,
  X
} from 'lucide-react'

interface FiltrosAvanzadosProps {
  filtros: {
    destino: string
    tipo: string
    categoria: string
    precioMin: string
    precioMax: string
    servicios: string[]
    fechaEntrada: string
    fechaSalida: string
    huespedes: string
    habitaciones: string
  }
  setFiltros: (filtros: any) => void
  onLimpiar: () => void
}

const serviciosDisponibles = [
  { id: 'wifi', nombre: 'WiFi', icono: Wifi },
  { id: 'aire', nombre: 'Aire Acondicionado', icono: Snowflake },
  { id: 'restaurante', nombre: 'Restaurante', icono: Utensils },
  { id: 'estacionamiento', nombre: 'Estacionamiento', icono: Car },
  { id: 'piscina', nombre: 'Piscina', icono: Building },
  { id: 'playa', nombre: 'Playa Privada', icono: Globe },
  { id: 'vista', nombre: 'Vista al Mar', icono: Eye },
  { id: 'spa', nombre: 'Spa', icono: Building },
  { id: 'gimnasio', nombre: 'Gimnasio', icono: Building },
  { id: 'bar', nombre: 'Bar', icono: Utensils }
]

export const FiltrosAvanzadosAlojamiento = ({ filtros, setFiltros, onLimpiar }: FiltrosAvanzadosProps) => {
  const [mostrarFiltros, setMostrarFiltros] = useState(false)

  const toggleServicio = (servicioId: string) => {
    const nuevosServicios = filtros.servicios.includes(servicioId)
      ? filtros.servicios.filter(s => s !== servicioId)
      : [...filtros.servicios, servicioId]
    
    setFiltros({ ...filtros, servicios: nuevosServicios })
  }

  const limpiarFiltros = () => {
    onLimpiar()
    setMostrarFiltros(false)
  }

  const filtrosActivos = [
    filtros.destino && `Destino: ${filtros.destino}`,
    filtros.tipo && `Tipo: ${filtros.tipo}`,
    filtros.categoria && `${filtros.categoria} estrellas`,
    filtros.precioMin && `Precio min: S/ ${filtros.precioMin}`,
    filtros.precioMax && `Precio max: S/ ${filtros.precioMax}`,
    filtros.servicios.length > 0 && `${filtros.servicios.length} servicios`,
    filtros.fechaEntrada && `Entrada: ${filtros.fechaEntrada}`,
    filtros.fechaSalida && `Salida: ${filtros.fechaSalida}`,
    filtros.huespedes && `${filtros.huespedes} huéspedes`,
    filtros.habitaciones && `${filtros.habitaciones} habitaciones`
  ].filter(Boolean)

  return (
    <div className="space-y-4">
      {/* Botón para mostrar/ocultar filtros */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setMostrarFiltros(!mostrarFiltros)}
          className="flex items-center space-x-2"
        >
          <Filter className="w-4 h-4" />
          <span>Filtros Avanzados</span>
        </Button>
        
        {filtrosActivos.length > 0 && (
          <Button variant="ghost" size="sm" onClick={limpiarFiltros}>
            Limpiar Filtros
          </Button>
        )}
      </div>

      {/* Filtros activos */}
      {filtrosActivos.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {filtrosActivos.map((filtro, index) => (
            <Badge key={index} variant="secondary" className="flex items-center space-x-1">
              <span>{filtro}</span>
              <X className="w-3 h-3 cursor-pointer" onClick={limpiarFiltros} />
            </Badge>
          ))}
        </div>
      )}

      {/* Panel de filtros avanzados */}
      {mostrarFiltros && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Filtros Detallados</span>
              <Button variant="ghost" size="sm" onClick={() => setMostrarFiltros(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Fechas y Huéspedes */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="fechaEntrada">Fecha de Entrada</Label>
                <div className="relative mt-1">
                  <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="fechaEntrada"
                    type="date"
                    value={filtros.fechaEntrada}
                    onChange={(e) => setFiltros({ ...filtros, fechaEntrada: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="fechaSalida">Fecha de Salida</Label>
                <div className="relative mt-1">
                  <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="fechaSalida"
                    type="date"
                    value={filtros.fechaSalida}
                    onChange={(e) => setFiltros({ ...filtros, fechaSalida: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="huespedes">Huéspedes</Label>
                <Select value={filtros.huespedes} onValueChange={(value) => setFiltros({ ...filtros, huespedes: value })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 huésped</SelectItem>
                    <SelectItem value="2">2 huéspedes</SelectItem>
                    <SelectItem value="3">3 huéspedes</SelectItem>
                    <SelectItem value="4">4 huéspedes</SelectItem>
                    <SelectItem value="5+">5+ huéspedes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="habitaciones">Habitaciones</Label>
                <Select value={filtros.habitaciones} onValueChange={(value) => setFiltros({ ...filtros, habitaciones: value })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 habitación</SelectItem>
                    <SelectItem value="2">2 habitaciones</SelectItem>
                    <SelectItem value="3">3 habitaciones</SelectItem>
                    <SelectItem value="4">4 habitaciones</SelectItem>
                    <SelectItem value="5+">5+ habitaciones</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            {/* Servicios */}
            <div>
              <Label className="text-base font-medium">Servicios Incluidos</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-3">
                {serviciosDisponibles.map((servicio) => {
                  const Icono = servicio.icono
                  return (
                    <div key={servicio.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={servicio.id}
                        checked={filtros.servicios.includes(servicio.id)}
                        onCheckedChange={() => toggleServicio(servicio.id)}
                      />
                      <Label htmlFor={servicio.id} className="flex items-center space-x-1 text-sm cursor-pointer">
                        <Icono className="w-4 h-4" />
                        <span>{servicio.nombre}</span>
                      </Label>
                    </div>
                  )
                })}
              </div>
            </div>

            <Separator />

            {/* Rango de Precios */}
            <div>
              <Label className="text-base font-medium">Rango de Precios (S/)</Label>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <Label htmlFor="precioMin">Precio Mínimo</Label>
                  <Input
                    id="precioMin"
                    type="number"
                    placeholder="0"
                    value={filtros.precioMin}
                    onChange={(e) => setFiltros({ ...filtros, precioMin: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="precioMax">Precio Máximo</Label>
                  <Input
                    id="precioMax"
                    type="number"
                    placeholder="5000"
                    value={filtros.precioMax}
                    onChange={(e) => setFiltros({ ...filtros, precioMax: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={limpiarFiltros}>
                Limpiar Todo
              </Button>
              <Button onClick={() => setMostrarFiltros(false)}>
                Aplicar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
