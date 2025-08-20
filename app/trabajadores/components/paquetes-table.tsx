"use client"

import { useState } from 'react'
import { 
  Package, 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, 
  Edit, 
  Trash2, 
  Eye,
  Star,
  Clock,
  Hotel,
  Bus,
  UtensilsCrossed,
  Ticket
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface Paquete {
  id: string
  nombre: string
  destino: string
  duracion: string
  precioOriginal: number
  precioDescuento: number
  ahorro: number
  capacidad: number
  reservas: number
  estado: 'activo' | 'inactivo' | 'agotado' | 'promocional'
  calificacion: number
  imagen: string
  fechaCreacion: string
  categoria: string
  tipoTurista: 'nacional' | 'extranjero' | 'ambos'
  servicios: string[]
  idiomas: string[]
  minimoPersonas: number
}

export const PaquetesTable = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('todos')
  const [categoryFilter, setCategoryFilter] = useState<string>('todos')
  const [destinoFilter, setDestinoFilter] = useState<string>('todos')

  // Mock data basado en paquetes reales
  const paquetes: Paquete[] = [
    {
      id: '1',
      nombre: 'Arequipa Aventurero',
      destino: 'Arequipa',
      duracion: '5 Días / 4 Noches',
      precioOriginal: 1048.75,
      precioDescuento: 888.25,
      ahorro: 160.50,
      capacidad: 20,
      reservas: 18,
      estado: 'promocional',
      calificacion: 4.8,
      imagen: '/assets/arequipa-aventurero.jpg',
      fechaCreacion: '2024-01-15',
      categoria: 'Turismo de Aventura',
      tipoTurista: 'nacional',
      servicios: ['Hoteles', 'Tours', 'Español', 'Visitas guiadas'],
      idiomas: ['Español'],
      minimoPersonas: 2
    },
    {
      id: '2',
      nombre: 'Arequipa Clásico',
      destino: 'Arequipa',
      duracion: '4 Días / 3 Noches',
      precioOriginal: 1159.00,
      precioDescuento: 1012.23,
      ahorro: 146.78,
      capacidad: 15,
      reservas: 12,
      estado: 'activo',
      calificacion: 4.5,
      imagen: '/assets/arequipa-clasico.jpg',
      fechaCreacion: '2024-01-20',
      categoria: 'Turismo Cultural',
      tipoTurista: 'nacional',
      servicios: ['Hoteles', 'Tours', 'Español', 'Visitas guiadas'],
      idiomas: ['Español'],
      minimoPersonas: 2
    },
    {
      id: '3',
      nombre: 'Cusco Amanecer',
      destino: 'Cusco',
      duracion: '4 Días / 3 Noches',
      precioOriginal: 1789.30,
      precioDescuento: 1692.46,
      ahorro: 96.85,
      capacidad: 25,
      reservas: 22,
      estado: 'activo',
      calificacion: 4.9,
      imagen: '/assets/cusco-amanecer.jpg',
      fechaCreacion: '2024-01-10',
      categoria: 'Turismo Cultural',
      tipoTurista: 'nacional',
      servicios: ['Hoteles', 'Tours', 'Español', 'Visitas guiadas'],
      idiomas: ['Español'],
      minimoPersonas: 2
    },
    {
      id: '4',
      nombre: 'Cusco Amanecer (Turista Extranjero)',
      destino: 'Cusco',
      duracion: '4 Días / 3 Noches',
      precioOriginal: 2787.00,
      precioDescuento: 2293.89,
      ahorro: 493.12,
      capacidad: 20,
      reservas: 15,
      estado: 'activo',
      calificacion: 4.7,
      imagen: '/assets/cusco-amanecer-extranjero.jpg',
      fechaCreacion: '2024-01-25',
      categoria: 'Turismo Cultural',
      tipoTurista: 'extranjero',
      servicios: ['Hoteles', 'Tours', 'Español/Inglés', 'Visitas guiadas'],
      idiomas: ['Español', 'Inglés'],
      minimoPersonas: 2
    },
    {
      id: '5',
      nombre: 'Chachapoyas Extremo',
      destino: 'Chachapoyas',
      duracion: '6 Días / 5 Noches',
      precioOriginal: 988.75,
      precioDescuento: 808.45,
      ahorro: 180.30,
      capacidad: 12,
      reservas: 12,
      estado: 'agotado',
      calificacion: 4.9,
      imagen: '/assets/chachapoyas-extremo.jpg',
      fechaCreacion: '2024-01-10',
      categoria: 'Turismo de Aventura',
      tipoTurista: 'ambos',
      servicios: ['Hoteles', 'Tours', 'Español/Inglés', 'Visitas guiadas'],
      idiomas: ['Español', 'Inglés'],
      minimoPersonas: 2
    },
    {
      id: '6',
      nombre: 'Ayacucho Express',
      destino: 'Ayacucho',
      duracion: '3 Días / 2 Noches',
      precioOriginal: 338.00,
      precioDescuento: 283.61,
      ahorro: 54.39,
      capacidad: 18,
      reservas: 5,
      estado: 'inactivo',
      calificacion: 4.2,
      imagen: '/assets/ayacucho-express.jpg',
      fechaCreacion: '2024-01-25',
      categoria: 'Turismo Cultural',
      tipoTurista: 'nacional',
      servicios: ['Hoteles', 'Tours', 'Español', 'Visitas guiadas'],
      idiomas: ['Español'],
      minimoPersonas: 2
    }
  ]

  const destinos = ['Arequipa', 'Cusco', 'Chachapoyas', 'Ayacucho', 'Cajamarca', 'Lima', 'Trujillo']
  const categorias = [
    'Turismo Cultural', 'Turismo de Aventura', 'Turismo de Naturaleza', 
    'Ecoturismo', 'Gastronomía', 'Turismo Rural', 'Turismo Místico'
  ]

  const getStatusBadge = (estado: string) => {
    const variants = {
      activo: 'bg-green-100 text-green-800 border-green-200',
      inactivo: 'bg-gray-100 text-gray-800 border-gray-200',
      agotado: 'bg-red-100 text-red-800 border-red-200',
      promocional: 'bg-orange-100 text-orange-800 border-orange-200'
    }
    
    return (
      <Badge className={`${variants[estado as keyof typeof variants]} border`}>
        {estado === 'activo' ? 'Activo' : 
         estado === 'inactivo' ? 'Inactivo' : 
         estado === 'agotado' ? 'Agotado' : 'Promocional'}
      </Badge>
    )
  }

  const getCategoryBadge = (categoria: string) => {
    const colors = {
      'Turismo Cultural': 'bg-purple-100 text-purple-800 border-purple-200',
      'Turismo de Aventura': 'bg-blue-100 text-blue-800 border-blue-200',
      'Turismo de Naturaleza': 'bg-green-100 text-green-800 border-green-200',
      'Ecoturismo': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'Gastronomía': 'bg-orange-100 text-orange-800 border-orange-200',
      'Turismo Rural': 'bg-amber-100 text-amber-800 border-amber-200',
      'Turismo Místico': 'bg-indigo-100 text-indigo-800 border-indigo-200'
    }
    
    return (
      <Badge className={`${colors[categoria as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200'} border`}>
        {categoria}
      </Badge>
    )
  }

  const getTipoTuristaBadge = (tipo: string) => {
    const variants = {
      nacional: 'bg-blue-100 text-blue-800 border-blue-200',
      extranjero: 'bg-green-100 text-green-800 border-green-200',
      ambos: 'bg-purple-100 text-purple-800 border-purple-200'
    }
    
    return (
      <Badge className={`${variants[tipo as keyof typeof variants]} border text-xs`}>
        {tipo === 'nacional' ? 'Nacional' : 
         tipo === 'extranjero' ? 'Extranjero' : 'Ambos'}
      </Badge>
    )
  }

  const filteredPaquetes = paquetes.filter(paquete => {
    const matchesSearch = paquete.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paquete.destino.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'todos' || paquete.estado === statusFilter
    const matchesCategory = categoryFilter === 'todos' || paquete.categoria === categoryFilter
    const matchesDestino = destinoFilter === 'todos' || paquete.destino === destinoFilter
    
    return matchesSearch && matchesStatus && matchesCategory && matchesDestino
  })

  const ocupacionPorcentaje = (reservas: number, capacidad: number) => {
    return Math.round((reservas / capacidad) * 100)
  }

  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <div className="space-y-6">
      {/* Header y Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-primary" />
            <span>Gestión de Paquetes Turísticos</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar por nombre o destino..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-border bg-background text-foreground"
              />
            </div>
            <Select value={destinoFilter} onValueChange={setDestinoFilter}>
              <SelectTrigger className="w-full lg:w-40 border-border bg-background text-foreground">
                <SelectValue placeholder="Destino" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los destinos</SelectItem>
                {destinos.map(destino => (
                  <SelectItem key={destino} value={destino}>{destino}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full lg:w-40 border-border bg-background text-foreground">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="activo">Activo</SelectItem>
                <SelectItem value="inactivo">Inactivo</SelectItem>
                <SelectItem value="agotado">Agotado</SelectItem>
                <SelectItem value="promocional">Promocional</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full lg:w-40 border-border bg-background text-foreground">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas las categorías</SelectItem>
                {categorias.map(categoria => (
                  <SelectItem key={categoria} value={categoria}>{categoria}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Package className="w-4 h-4 mr-2" />
              Nuevo Paquete
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de Paquetes */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-12">ID</TableHead>
                <TableHead className="w-12">Imagen</TableHead>
                <TableHead>Paquete</TableHead>
                <TableHead>Destino</TableHead>
                <TableHead>Duración</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Ocupación</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Calificación</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPaquetes.map((paquete) => (
                <TableRow key={paquete.id} className="hover:bg-muted/30">
                  <TableCell>
                    <div className="text-sm font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                      #{paquete.id}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={paquete.imagen} alt={paquete.nombre} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        <Package className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div>
                        <div className="font-medium text-foreground">{paquete.nombre}</div>
                        <div className="text-sm text-muted-foreground">{paquete.categoria}</div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {paquete.servicios.map((servicio, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {servicio}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        {getTipoTuristaBadge(paquete.tipoTurista)}
                        <span className="text-xs text-muted-foreground">
                          Mín. {paquete.minimoPersonas} personas
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm">{paquete.destino}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm">{paquete.duracion}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium text-foreground">
                        S/ {formatNumber(paquete.precioDescuento)}
                      </div>
                      {paquete.ahorro > 0 && (
                        <div className="text-xs text-muted-foreground line-through">
                          S/ {formatNumber(paquete.precioOriginal)}
                        </div>
                      )}
                      {paquete.ahorro > 0 && (
                        <div className="text-xs text-green-600 font-medium">
                          Ahorras S/ {formatNumber(paquete.ahorro)}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Users className="w-3 h-3 text-muted-foreground" />
                        <span className="text-sm">{paquete.reservas}/{paquete.capacidad}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            ocupacionPorcentaje(paquete.reservas, paquete.capacidad) > 80 
                              ? 'bg-red-500' 
                              : ocupacionPorcentaje(paquete.reservas, paquete.capacidad) > 60 
                                ? 'bg-yellow-500' 
                                : 'bg-green-500'
                          }`}
                          style={{ width: `${ocupacionPorcentaje(paquete.reservas, paquete.capacidad)}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(paquete.estado)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{paquete.calificacion}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      
    
    </div>
  )
}

export default PaquetesTable
