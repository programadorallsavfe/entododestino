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
  Mail,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import DetalleCliente from '@/app/administradores/components/detalle-clientes'

interface Cliente {
  id: string
  nombre: string
  apellido: string
  email: string
  telefono: string
  dni: string
  pais: string
  ciudad: string
  direccion: string
  fechaRegistro: string
  estado: 'lead' | 'cliente'
  prioridad: 'A' | 'B'
  calificacion: number
  totalReservas: number
  valorTotal: number
  notas?: string
}

interface NuevoCliente {
  nombre: string
  apellido: string
  email: string
  telefono: string
  dni: string
  pais: string
  ciudad: string
  direccion: string
  estado: 'lead' | 'cliente'
  prioridad: 'A' | 'B'
  notas: string
}

export const ClientesTable = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [estadoFilter, setEstadoFilter] = useState<string>('todos')
  const [paisFilter, setPaisFilter] = useState<string>('todos')
  const [prioridadFilter, setPrioridadFilter] = useState<string>('todos')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [nuevoCliente, setNuevoCliente] = useState<NuevoCliente>({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    dni: '',
    pais: '',
    ciudad: '',
    direccion: '',
    estado: 'lead',
    prioridad: 'B',
    notas: ''
  })

  // Datos de ejemplo
  const [clientes, setClientes] = useState<Cliente[]>([
    {
      id: '1',
      nombre: 'María',
      apellido: 'González',
      email: 'maria.gonzalez@email.com',
      telefono: '+51 999 123 456',
      dni: '12345678',
      pais: 'Perú',
      ciudad: 'Lima',
      direccion: 'Av. Arequipa 123, Lima',
      fechaRegistro: '2024-01-15',
      estado: 'cliente',
      prioridad: 'A',
      calificacion: 4.8,
      totalReservas: 12,
      valorTotal: 8500,
      notas: 'Cliente frecuente, prefiere hoteles de 4-5 estrellas'
    },
    {
      id: '2',
      nombre: 'Carlos',
      apellido: 'Rodríguez',
      email: 'carlos.rodriguez@email.com',
      telefono: '+51 998 234 567',
      dni: '23456789',
      pais: 'Perú',
      ciudad: 'Cusco',
      direccion: 'Calle San Agustín 456, Cusco',
      fechaRegistro: '2024-02-01',
      estado: 'cliente',
      prioridad: 'A',
      calificacion: 4.5,
      totalReservas: 8,
      valorTotal: 5200,
      notas: 'Interesado en tours culturales'
    },
    {
      id: '3',
      nombre: 'Ana',
      apellido: 'Silva',
      email: 'ana.silva@email.com',
      telefono: '+51 997 345 678',
      dni: '34567890',
      pais: 'Colombia',
      ciudad: 'Bogotá',
      direccion: 'Carrera 15 #45-67, Bogotá',
      fechaRegistro: '2024-01-20',
      estado: 'cliente',
      prioridad: 'A',
      calificacion: 4.9,
      totalReservas: 15,
      valorTotal: 12000,
      notas: 'Cliente VIP, viaja frecuentemente por trabajo'
    },
    {
      id: '4',
      nombre: 'Luis',
      apellido: 'Martínez',
      email: 'luis.martinez@email.com',
      telefono: '+51 996 456 789',
      dni: '45678901',
      pais: 'Chile',
      ciudad: 'Santiago',
      direccion: 'Av. Providencia 2345, Santiago',
      fechaRegistro: '2024-02-10',
      estado: 'lead',
      prioridad: 'B',
      calificacion: 4.2,
      totalReservas: 0,
      valorTotal: 0,
      notas: 'Lead caliente, interesado en paquetes a Perú'
    },
    {
      id: '5',
      nombre: 'Carmen',
      apellido: 'López',
      email: 'carmen.lopez@email.com',
      telefono: '+51 995 567 890',
      dni: '56789012',
      pais: 'Perú',
      ciudad: 'Arequipa',
      direccion: 'Calle San Francisco 789, Arequipa',
      fechaRegistro: '2024-02-15',
      estado: 'lead',
      prioridad: 'B',
      calificacion: 4.0,
      totalReservas: 0,
      valorTotal: 0,
      notas: 'Interesada en tours gastronómicos'
    }
  ])

  const paises = ['Perú', 'Colombia', 'Chile', 'Argentina', 'Brasil', 'Ecuador', 'Bolivia']

  // Filtrar clientes
  const filteredClientes = clientes.filter(cliente => {
    const matchesSearch = cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cliente.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cliente.telefono.includes(searchTerm) ||
                         cliente.dni.includes(searchTerm)
    
    const matchesEstado = estadoFilter === 'todos' || cliente.estado === estadoFilter
    const matchesPais = paisFilter === 'todos' || cliente.pais === paisFilter
    const matchesPrioridad = prioridadFilter === 'todos' || cliente.prioridad === prioridadFilter
    
    return matchesSearch && matchesEstado && matchesPais && matchesPrioridad
  })

  const limpiarFiltros = () => {
    setSearchTerm('')
    setEstadoFilter('todos')
    setPaisFilter('todos')
    setPrioridadFilter('todos')
  }

  const getEstadoBadge = (estado: string) => {
    if (estado === 'cliente') {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Cliente</Badge>
    } else {
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Lead</Badge>
    }
  }

  const getPrioridadBadge = (prioridad: string) => {
    if (prioridad === 'A') {
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">
          Prioridad A
        </Badge>
      )
    } else {
      return (
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200">
          Prioridad B
        </Badge>
      )
    }
  }

  const handleInputChange = (field: keyof NuevoCliente, value: string) => {
    setNuevoCliente(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const [editingClienteId, setEditingClienteId] = useState<string | null>(null)
  const [verDetalleCliente, setVerDetalleCliente] = useState<Cliente | null>(null)

  const handleSubmit = () => {
    if (!nuevoCliente.nombre || !nuevoCliente.apellido || !nuevoCliente.email || !nuevoCliente.telefono || !nuevoCliente.dni) {
      alert('Por favor completa todos los campos obligatorios')
      return
    }

    if (editingClienteId) {
      // Editar cliente existente
      setClientes(prev => prev.map(cliente => 
        cliente.id === editingClienteId 
          ? { ...cliente, ...nuevoCliente }
          : cliente
      ))
      setEditingClienteId(null)
    } else {
      // Crear nuevo cliente
      const nuevoClienteCompleto: Cliente = {
        id: (clientes.length + 1).toString(),
        ...nuevoCliente,
        fechaRegistro: new Date().toISOString().split('T')[0],
        calificacion: 0,
        totalReservas: 0,
        valorTotal: 0
      }
      setClientes(prev => [...prev, nuevoClienteCompleto])
    }
    
    // Limpiar formulario
    setNuevoCliente({
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      dni: '',
      pais: '',
      ciudad: '',
      direccion: '',
      estado: 'lead',
      prioridad: 'B',
      notas: ''
    })
    
    setEditingClienteId(null)
    setIsModalOpen(false)
  }

  const resetForm = () => {
    setNuevoCliente({
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      dni: '',
      pais: '',
      ciudad: '',
      direccion: '',
      estado: 'lead',
      prioridad: 'B',
      notas: ''
    })
    setEditingClienteId(null)
  }

  const handleDeleteCliente = (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
      setClientes(prev => prev.filter(cliente => cliente.id !== id))
    }
  }

  const handleEditCliente = (cliente: Cliente) => {
    setNuevoCliente({
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      email: cliente.email,
      telefono: cliente.telefono,
      dni: cliente.dni,
      pais: cliente.pais,
      ciudad: cliente.ciudad,
      direccion: cliente.direccion,
      estado: cliente.estado,
      prioridad: cliente.prioridad,
      notas: cliente.notas || ''
    })
    setEditingClienteId(cliente.id)
    setIsModalOpen(true)
  }

  const handleVerDetalleCliente = (cliente: Cliente) => {
    setVerDetalleCliente(cliente)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-6 h-6" />
            <span>Gestión de Clientes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            {/* Filtros */}
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar por nombre, email, teléfono o DNI..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={estadoFilter} onValueChange={setEstadoFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  <SelectItem value="cliente">Clientes</SelectItem>
                  <SelectItem value="lead">Leads</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={paisFilter} onValueChange={setPaisFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="País" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los países</SelectItem>
                  <SelectItem value="Perú">Perú</SelectItem>
                  <SelectItem value="Colombia">Colombia</SelectItem>
                  <SelectItem value="Chile">Chile</SelectItem>
                  <SelectItem value="Argentina">Argentina</SelectItem>
                  <SelectItem value="México">México</SelectItem>
                  <SelectItem value="España">España</SelectItem>
                  <SelectItem value="Estados Unidos">Estados Unidos</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={prioridadFilter} onValueChange={setPrioridadFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Prioridad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas las prioridades</SelectItem>
                  <SelectItem value="A">Prioridad A - Atención especial</SelectItem>
                  <SelectItem value="B">Prioridad B - Clientes normales</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Botones de acción */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={limpiarFiltros}
                className="border-border hover:bg-accent hover:text-accent-foreground"
              >
                <Filter className="w-4 h-4 mr-2" />
                Limpiar
              </Button>
              
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Nuevo Cliente
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                     <DialogHeader>
                     <DialogTitle className="flex items-center space-x-2">
                       {editingClienteId ? (
                         <>
                           <Edit className="w-5 h-5" />
                           <span>Editar Cliente</span>
                         </>
                       ) : (
                         <>
                           <Plus className="w-5 h-5" />
                           <span>Registrar Nuevo Cliente</span>
                         </>
                       )}
                     </DialogTitle>
                   </DialogHeader>
                  
                  <div className="space-y-6">
                    {/* Información Personal */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold border-b pb-2">Información Personal</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nombre">Nombre *</Label>
                          <Input
                            id="nombre"
                            value={nuevoCliente.nombre}
                            onChange={(e) => handleInputChange('nombre', e.target.value)}
                            placeholder="Ingresa el nombre"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="apellido">Apellido *</Label>
                          <Input
                            id="apellido"
                            value={nuevoCliente.apellido}
                            onChange={(e) => handleInputChange('apellido', e.target.value)}
                            placeholder="Ingresa el apellido"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dni">DNI *</Label>
                          <Input
                            id="dni"
                            value={nuevoCliente.dni}
                            onChange={(e) => handleInputChange('dni', e.target.value)}
                            placeholder="Ingresa el DNI"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="estado">Estado *</Label>
                          <Select value={nuevoCliente.estado} onValueChange={(value) => handleInputChange('estado', value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="lead">Lead</SelectItem>
                              <SelectItem value="cliente">Cliente</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="prioridad">Prioridad *</Label>
                          <Select value={nuevoCliente.prioridad} onValueChange={(value) => handleInputChange('prioridad', value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="A">Prioridad A - Clientes concurrentes que requieren atención especial</SelectItem>
                              <SelectItem value="B">Prioridad B - Clientes normales</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Información de Contacto */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold border-b pb-2">Información de Contacto</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={nuevoCliente.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="correo@ejemplo.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="telefono">Teléfono *</Label>
                          <Input
                            id="telefono"
                            value={nuevoCliente.telefono}
                            onChange={(e) => handleInputChange('telefono', e.target.value)}
                            placeholder="+51 999 999 999"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Información de Ubicación */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold border-b pb-2">Información de Ubicación</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="pais">País</Label>
                          <Select value={nuevoCliente.pais} onValueChange={(value) => handleInputChange('pais', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un país" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Perú">Perú</SelectItem>
                              <SelectItem value="Colombia">Colombia</SelectItem>
                              <SelectItem value="Chile">Chile</SelectItem>
                              <SelectItem value="Argentina">Argentina</SelectItem>
                              <SelectItem value="México">México</SelectItem>
                              <SelectItem value="España">España</SelectItem>
                              <SelectItem value="Estados Unidos">Estados Unidos</SelectItem>
                              <SelectItem value="Otro">Otro</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ciudad">Ciudad</Label>
                          <Input
                            id="ciudad"
                            value={nuevoCliente.ciudad}
                            onChange={(e) => handleInputChange('ciudad', e.target.value)}
                            placeholder="Ingresa la ciudad"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="direccion">Dirección</Label>
                        <Input
                          id="direccion"
                          value={nuevoCliente.direccion}
                          onChange={(e) => handleInputChange('direccion', e.target.value)}
                          placeholder="Ingresa la dirección completa"
                        />
                      </div>
                    </div>

                    {/* Notas Adicionales */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold border-b pb-2">Notas Adicionales</h3>
                      <div className="space-y-2">
                        <Label htmlFor="notas">Observaciones</Label>
                        <Textarea
                          id="notas"
                          value={nuevoCliente.notas}
                          onChange={(e) => handleInputChange('notas', e.target.value)}
                          placeholder="Información adicional sobre el cliente..."
                          rows={3}
                        />
                      </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex justify-end space-x-3 pt-4 border-t">
                      <Button
                        variant="outline"
                        onClick={resetForm}
                        type="button"
                      >
                        Limpiar
                      </Button>
                                             <Button
                         onClick={handleSubmit}
                         className="bg-primary text-primary-foreground hover:bg-primary/90"
                       >
                         {editingClienteId ? (
                           <>
                             <Edit className="w-4 h-4 mr-2" />
                             Actualizar Cliente
                           </>
                         ) : (
                           <>
                             <Plus className="w-4 h-4 mr-2" />
                             Registrar Cliente
                           </>
                         )}
                       </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resumen */}
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{clientes.length}</div>
              <div className="text-sm text-muted-foreground">Total Clientes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {clientes.filter(c => c.estado === 'cliente').length}
              </div>
              <div className="text-sm text-muted-foreground">Clientes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {clientes.filter(c => c.estado === 'lead').length}
              </div>
              <div className="text-sm text-muted-foreground">Leads</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {clientes.filter(c => c.prioridad === 'A').length}
              </div>
              <div className="text-sm text-muted-foreground">Prioridad A</div>
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
                <TableHead>Prioridad</TableHead>
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
                        <AvatarImage src={`/assets/avatar-${cliente.id}.jpg`} alt={`${cliente.nombre} ${cliente.apellido}`} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {cliente.nombre[0]}{cliente.apellido[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-foreground">{cliente.nombre} {cliente.apellido}</div>
                        <div className="text-sm text-muted-foreground">
                          DNI: {cliente.dni}
                        </div>
                        <div className="text-xs text-muted-foreground">
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
                    {getPrioridadBadge(cliente.prioridad)}
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
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0" 
                        title="Ver detalles"
                        onClick={() => handleVerDetalleCliente(cliente)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0" 
                        title="Editar cliente"
                        onClick={() => handleEditCliente(cliente)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive" 
                        title="Eliminar cliente"
                        onClick={() => handleDeleteCliente(cliente.id)}
                      >
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

      {/* Modal de Detalle de Cliente */}
      {verDetalleCliente && (
        <DetalleCliente
          cliente={{
            id: verDetalleCliente.id,
            nombre: `${verDetalleCliente.nombre} ${verDetalleCliente.apellido}`,
            email: verDetalleCliente.email,
            telefono: verDetalleCliente.telefono,
            dni: verDetalleCliente.dni,
            tipoCliente: verDetalleCliente.prioridad,
            fechaRegistro: verDetalleCliente.fechaRegistro,
            direccion: verDetalleCliente.direccion,
            ciudad: verDetalleCliente.ciudad,
            pais: verDetalleCliente.pais,
            preferencias: ['hotel', 'vuelos', 'transporte'],
            notas: verDetalleCliente.notas || ''
          }}
          cotizaciones={[
            {
              id: 'COT-001',
              fecha: '2024-01-15',
              destino: 'Cusco, Perú',
              personas: 4,
              presupuesto: 2500,
              estado: 'aprobada',
              precio: 2150,
              servicios: ['hotel', 'vuelos', 'transporte'],
              prioridad: 'alta',
              notas: 'Familia con niños pequeños'
            },
            {
              id: 'COT-002',
              fecha: '2024-02-20',
              destino: 'Arequipa, Perú',
              personas: 2,
              presupuesto: 1800,
              estado: 'cotizacion',
              precio: 1950,
              servicios: ['hotel', 'vuelos'],
              prioridad: 'media',
              notas: 'Pareja en luna de miel'
            }
          ]}
          compras={[
            {
              id: 'COMP-001',
              fechaCompra: '2024-01-20',
              fechaViaje: '2024-03-15',
              destino: 'Cusco, Perú',
              personas: 4,
              precioTotal: 2150,
              estado: 'completada',
              servicios: ['hotel', 'vuelos', 'transporte'],
              calificacion: 5,
              comentarios: 'Excelente experiencia, todo perfecto',
              factura: 'FAC-2024-001'
            }
          ]}
          onClose={() => setVerDetalleCliente(null)}
        />
      )}
      
    </div>
  )
}
export default ClientesTable

