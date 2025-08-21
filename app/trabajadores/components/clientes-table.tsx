"use client"

import { useState } from 'react'
import { 
  Users, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Plus,
  MapPin,
  Star,
  Calendar,
  Phone,
  Mail
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface Cliente {
  id: string
  nombre: string
  email: string
  telefono: string
  pais: string
  ciudad: string
  fechaRegistro: string
  estado: 'activo' | 'inactivo' | 'premium'
  calificacion: number
  totalReservas: number
  valorTotal: number
}

export const ClientesTable = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [estadoFilter, setEstadoFilter] = useState<string>('todos')
  const [paisFilter, setPaisFilter] = useState<string>('todos')

  // Datos de ejemplo
  const clientes: Cliente[] = [
    {
      id: '1',
      nombre: 'María González',
      email: 'maria.gonzalez@email.com',
      telefono: '+51 999 123 456',
      pais: 'Perú',
      ciudad: 'Lima',
      fechaRegistro: '2024-01-15',
      estado: 'premium',
      calificacion: 4.8,
      totalReservas: 12,
      valorTotal: 8500
    },
    {
      id: '2',
      nombre: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@email.com',
      telefono: '+51 998 234 567',
      pais: 'Perú',
      ciudad: 'Cusco',
      fechaRegistro: '2024-02-01',
      estado: 'activo',
      calificacion: 4.5,
      totalReservas: 8,
      valorTotal: 5200
    },
    {
      id: '3',
      nombre: 'Ana Silva',
      email: 'ana.silva@email.com',
      telefono: '+51 997 345 678',
      pais: 'Colombia',
      ciudad: 'Bogotá',
      fechaRegistro: '2024-01-20',
      estado: 'activo',
      calificacion: 4.9,
      totalReservas: 15,
      valorTotal: 12000
    },
    {
      id: '4',
      nombre: 'Luis Martínez',
      email: 'luis.martinez@email.com',
      telefono: '+51 996 456 789',
      pais: 'Chile',
      ciudad: 'Santiago',
      fechaRegistro: '2024-02-10',
      estado: 'inactivo',
      calificacion: 4.2,
      totalReservas: 3,
      valorTotal: 1800
    }
  ]

  const paises = ['Perú', 'Colombia', 'Chile', 'Argentina', 'Brasil', 'Ecuador', 'Bolivia']

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
                         cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesEstado = estadoFilter === 'todos' || cliente.estado === estadoFilter
    const matchesPais = paisFilter === 'todos' || cliente.pais === paisFilter
    
    return matchesSearch && matchesEstado && matchesPais
  })

  const limpiarFiltros = () => {
    setSearchTerm('')
    setEstadoFilter('todos')
    setPaisFilter('todos')
  }

  return (
    <div className="space-y-6">
      {/* Header y Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-primary" />
            <span>Gestión de Clientes</span>
            <Badge variant="secondary" className="ml-2">
              {filteredClientes.length} clientes
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-border bg-background text-foreground"
              />
            </div>
            
            <Select value={estadoFilter} onValueChange={setEstadoFilter}>
              <SelectTrigger className="w-full sm:w-40 border-border bg-background text-foreground">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="activo">Activo</SelectItem>
                <SelectItem value="inactivo">Inactivo</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>

            <Select value={paisFilter} onValueChange={setPaisFilter}>
              <SelectTrigger className="w-full sm:w-40 border-border bg-background text-foreground">
                <SelectValue placeholder="País" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los países</SelectItem>
                {paises.map(pais => (
                  <SelectItem key={pais} value={pais}>{pais}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={limpiarFiltros}
                className="border-border hover:bg-accent hover:text-accent-foreground"
              >
                <Filter className="w-4 h-4 mr-2" />
                Limpiar
              </Button>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Cliente
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
{/* Resumen */}
<Card className="bg-muted/30">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{clientes.length}</div>
              <div className="text-sm text-muted-foreground">Total Clientes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {clientes.filter(c => c.estado === 'activo').length}
              </div>
              <div className="text-sm text-muted-foreground">Activos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {clientes.filter(c => c.estado === 'premium').length}
              </div>
              <div className="text-sm text-muted-foreground">Premium</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                S/ {clientes.reduce((sum, c) => sum + c.valorTotal, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Valor Total</div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Tabla de Clientes */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Cliente</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Ubicación</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Calificación</TableHead>
                <TableHead>Reservas</TableHead>
                <TableHead>Valor Total</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClientes.map((cliente) => (
                <TableRow key={cliente.id} className="hover:bg-muted/30">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={`/assets/avatar-${cliente.id}.jpg`} alt={cliente.nombre} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {cliente.nombre.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-foreground">{cliente.nombre}</div>
                        <div className="text-sm text-muted-foreground">
                          Registrado: {new Date(cliente.fechaRegistro).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="w-3 h-3 text-muted-foreground" />
                        <span className="text-foreground">{cliente.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="w-3 h-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{cliente.telefono}</span>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm text-foreground">
                        {cliente.ciudad}, {cliente.pais}
                      </span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    {getEstadoBadge(cliente.estado)}
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{cliente.calificacion}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="text-sm text-foreground">
                      {cliente.totalReservas} reservas
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="font-medium text-foreground">
                      S/ {cliente.valorTotal.toLocaleString()}
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
export default ClientesTable

