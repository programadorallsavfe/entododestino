"use client"

import { useState } from 'react'
import { 
  Search, 
  Filter, 
  Users, 
  MapPin, 
  Calendar, 
  Star, 
  Download,
  RefreshCw,
  Plus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface Cliente {
  id: string
  nombre: string
  email: string
  telefono: string
  pais: string
  ciudad: string
  fechaRegistro: string
  ultimaActividad: string
  estado: 'activo' | 'inactivo' | 'premium'
  calificacion: number
  totalReservas: number
  valorTotal: number
  preferencias: string[]
  avatar: string
}

export const FilterClientes = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [paisFilter, setPaisFilter] = useState<string>('todos')
  const [estadoFilter, setEstadoFilter] = useState<string>('todos')
  const [calificacionFilter, setCalificacionFilter] = useState<string>('todos')
  const [fechaDesde, setFechaDesde] = useState('')
  const [fechaHasta, setFechaHasta] = useState('')
  const [preferenciasFilter, setPreferenciasFilter] = useState<string[]>([])
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  // Mock data - En producción esto vendría de una API
  const clientes: Cliente[] = [
    {
      id: '1',
      nombre: 'María González',
      email: 'maria.gonzalez@email.com',
      telefono: '+51 999 123 456',
      pais: 'Perú',
      ciudad: 'Lima',
      fechaRegistro: '2024-01-15',
      ultimaActividad: '2024-03-20',
      estado: 'premium',
      calificacion: 4.8,
      totalReservas: 12,
      valorTotal: 8500,
      preferencias: ['Aventura', 'Cultural', 'Playa'],
      avatar: '/assets/avatar-1.jpg'
    },
    {
      id: '2',
      nombre: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@email.com',
      telefono: '+51 998 234 567',
      pais: 'Perú',
      ciudad: 'Cusco',
      fechaRegistro: '2024-02-01',
      ultimaActividad: '2024-03-18',
      estado: 'activo',
      calificacion: 4.5,
      totalReservas: 8,
      valorTotal: 5200,
      preferencias: ['Aventura', 'Ecoturismo'],
      avatar: '/assets/avatar-2.jpg'
    },
    {
      id: '3',
      nombre: 'Ana Silva',
      email: 'ana.silva@email.com',
      telefono: '+51 997 345 678',
      pais: 'Colombia',
      ciudad: 'Bogotá',
      fechaRegistro: '2024-01-20',
      ultimaActividad: '2024-03-15',
      estado: 'activo',
      calificacion: 4.9,
      totalReservas: 15,
      valorTotal: 12000,
      preferencias: ['Cultural', 'Playa', 'Gastronomía'],
      avatar: '/assets/avatar-3.jpg'
    },
    {
      id: '4',
      nombre: 'Luis Martínez',
      email: 'luis.martinez@email.com',
      telefono: '+51 996 456 789',
      pais: 'Chile',
      ciudad: 'Santiago',
      fechaRegistro: '2024-02-10',
      ultimaActividad: '2024-03-10',
      estado: 'inactivo',
      calificacion: 4.2,
      totalReservas: 3,
      valorTotal: 1800,
      preferencias: ['Aventura'],
      avatar: '/assets/avatar-4.jpg'
    }
  ]

  const paises = ['Perú', 'Colombia', 'Chile', 'Argentina', 'Brasil', 'Ecuador', 'Bolivia']
  const preferencias = ['Aventura', 'Cultural', 'Playa', 'Ecoturismo', 'Gastronomía', 'Relax']

  const getEstadoBadge = (estado: string) => {
    const variants = {
      activo: 'bg-green-100 text-green-800 border-green-200',
      inactivo: 'bg-gray-100 text-gray-800 border-gray-200',
      premium: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    }
    
    return (
      <Badge className={`${variants[estado as keyof typeof variants]} border`}>
        {estado === 'activo' ? 'Activo' : estado === 'inactivo' ? 'Inactivo' : 'Premium'}
      </Badge>
    )
  }

  const filteredClientes = clientes.filter(cliente => {
    const matchesSearch = cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cliente.ciudad.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPais = paisFilter === 'todos' || cliente.pais === paisFilter
    const matchesEstado = estadoFilter === 'todos' || cliente.estado === estadoFilter
    const matchesCalificacion = calificacionFilter === 'todos' || 
      (calificacionFilter === 'alta' && cliente.calificacion >= 4.5) ||
      (calificacionFilter === 'media' && cliente.calificacion >= 4.0 && cliente.calificacion < 4.5) ||
      (calificacionFilter === 'baja' && cliente.calificacion < 4.0)
    const matchesPreferencias = preferenciasFilter.length === 0 || 
      preferenciasFilter.some(pref => cliente.preferencias.includes(pref))
    
    return matchesSearch && matchesPais && matchesEstado && matchesCalificacion && matchesPreferencias
  })

  const limpiarFiltros = () => {
    setSearchTerm('')
    setPaisFilter('todos')
    setEstadoFilter('todos')
    setCalificacionFilter('todos')
    setFechaDesde('')
    setFechaHasta('')
    setPreferenciasFilter([])
  }

  const togglePreferencia = (preferencia: string) => {
    setPreferenciasFilter(prev => 
      prev.includes(preferencia)
        ? prev.filter(p => p !== preferencia)
        : [...prev, preferencia]
    )
  }

  return (
    <div className="space-y-6">
      {/* Header y Filtros Principales */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-primary" />
            <span>Filtro de Clientes</span>
            <Badge variant="secondary" className="ml-2">
              {filteredClientes.length} clientes encontrados
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Filtros principales */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre, email o ciudad..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-border bg-background text-foreground"
                />
              </div>
              
              <Select value={paisFilter} onValueChange={setPaisFilter}>
                <SelectTrigger className="border-border bg-background text-foreground">
                  <SelectValue placeholder="País" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los países</SelectItem>
                  {paises.map(pais => (
                    <SelectItem key={pais} value={pais}>{pais}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={estadoFilter} onValueChange={setEstadoFilter}>
                <SelectTrigger className="border-border bg-background text-foreground">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  <SelectItem value="activo">Activo</SelectItem>
                  <SelectItem value="inactivo">Inactivo</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>

              <Select value={calificacionFilter} onValueChange={setCalificacionFilter}>
                <SelectTrigger className="border-border bg-background text-foreground">
                  <SelectValue placeholder="Calificación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas las calificaciones</SelectItem>
                  <SelectItem value="alta">Alta (4.5+)</SelectItem>
                  <SelectItem value="media">Media (4.0-4.4)</SelectItem>
                  <SelectItem value="baja">Baja (menos de 4.0)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="border-border hover:bg-accent hover:text-accent-foreground"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros Avanzados
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={limpiarFiltros}
                  className="border-border hover:bg-accent hover:text-accent-foreground"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Limpiar
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="border-border hover:bg-accent hover:text-accent-foreground">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo Cliente
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filtros Avanzados */}
      {showAdvancedFilters && (
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="text-lg">Filtros Avanzados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Fechas */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">Rango de Fechas</Label>
                <div className="space-y-2">
                  <Input
                    type="date"
                    value={fechaDesde}
                    onChange={(e) => setFechaDesde(e.target.value)}
                    className="border-border bg-background text-foreground"
                  />
                  <Input
                    type="date"
                    value={fechaHasta}
                    onChange={(e) => setFechaHasta(e.target.value)}
                    className="border-border bg-background text-foreground"
                  />
                </div>
              </div>

              {/* Preferencias */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">Preferencias</Label>
                <div className="grid grid-cols-2 gap-2">
                  {preferencias.map(preferencia => (
                    <div key={preferencia} className="flex items-center space-x-2">
                      <Checkbox
                        id={preferencia}
                        checked={preferenciasFilter.includes(preferencia)}
                        onCheckedChange={() => togglePreferencia(preferencia)}
                        className="border-border"
                      />
                      <Label htmlFor={preferencia} className="text-sm text-foreground">
                        {preferencia}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Estadísticas rápidas */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">Estadísticas</Label>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Clientes:</span>
                    <span className="font-medium text-foreground">{clientes.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Activos:</span>
                    <span className="font-medium text-green-600">
                      {clientes.filter(c => c.estado === 'activo').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Premium:</span>
                    <span className="font-medium text-yellow-600">
                      {clientes.filter(c => c.estado === 'premium').length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Clientes Filtrados */}
      <Card>
        <CardHeader>
          <CardTitle>Clientes Encontrados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredClientes.map((cliente) => (
              <div key={cliente.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={cliente.avatar} alt={cliente.nombre} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {cliente.nombre.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-foreground">{cliente.nombre}</h3>
                    {getEstadoBadge(cliente.estado)}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{cliente.ciudad}, {cliente.pais}</span>
                    </span>
                    <span>{cliente.email}</span>
                    <span>{cliente.telefono}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="font-medium">{cliente.calificacion}</span>
                    </span>
                    <span className="text-muted-foreground">
                      {cliente.totalReservas} reservas
                    </span>
                    <span className="text-muted-foreground">
                      S/ {cliente.valorTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="border-border hover:bg-accent hover:text-accent-foreground">
                    Ver Detalles
                  </Button>
                  <Button variant="outline" size="sm" className="border-border hover:bg-accent hover:text-accent-foreground">
                    Editar
                  </Button>
                </div>
              </div>
            ))}

            {filteredClientes.length === 0 && (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No se encontraron clientes con los filtros aplicados</p>
                <Button variant="outline" onClick={limpiarFiltros} className="mt-4 border-border hover:bg-accent hover:text-accent-foreground">
                  Limpiar Filtros
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default FilterClientes
