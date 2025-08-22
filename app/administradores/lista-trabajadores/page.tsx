"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Trash2, Search, Filter, Users, Shield, UserCheck } from 'lucide-react'
import { toast } from 'sonner'

interface Worker {
  id: string
  nombre: string
  apellido: string
  dni: string
  telefono: string
  rol: 'vendedor' | 'administrador'
  estado: 'activo' | 'inactivo'
  fechaCreacion: string
}

export default function ListaTrabajadoresPageAdministradores() {
  const [workers, setWorkers] = useState<Worker[]>([])
  const [filteredWorkers, setFilteredWorkers] = useState<Worker[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('todos')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingWorker, setEditingWorker] = useState<Worker | null>(null)
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    telefono: '',
    rol: 'vendedor' as 'vendedor' | 'administrador'
  })

  // Datos simulados de trabajadores
  useEffect(() => {
    const mockWorkers: Worker[] = [
      {
        id: '1',
        nombre: 'María',
        apellido: 'González',
        dni: '12345678',
        telefono: '+51 999 123 456',
        rol: 'vendedor',
        estado: 'activo',
        fechaCreacion: '2024-01-15'
      },
      {
        id: '2',
        nombre: 'Carlos',
        apellido: 'Rodríguez',
        dni: '87654321',
        telefono: '+51 999 654 321',
        rol: 'administrador',
        estado: 'activo',
        fechaCreacion: '2024-01-10'
      },
      {
        id: '3',
        nombre: 'Ana',
        apellido: 'López',
        dni: '11223344',
        telefono: '+51 999 111 222',
        rol: 'vendedor',
        estado: 'activo',
        fechaCreacion: '2024-01-20'
      },
      {
        id: '4',
        nombre: 'Luis',
        apellido: 'Martínez',
        dni: '55667788',
        telefono: '+51 999 333 444',
        rol: 'vendedor',
        estado: 'inactivo',
        fechaCreacion: '2024-01-05'
      },
      {
        id: '5',
        nombre: 'Sofia',
        apellido: 'Hernández',
        dni: '99887766',
        telefono: '+51 999 555 666',
        rol: 'administrador',
        estado: 'activo',
        fechaCreacion: '2024-01-12'
      }
    ]
    setWorkers(mockWorkers)
    setFilteredWorkers(mockWorkers)
  }, [])

  // Filtrar trabajadores
  useEffect(() => {
    let filtered = workers

    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(worker =>
        worker.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.dni.includes(searchTerm)
      )
    }

    // Filtro por rol
    if (roleFilter !== 'todos') {
      filtered = filtered.filter(worker => worker.rol === roleFilter)
    }

    setFilteredWorkers(filtered)
  }, [workers, searchTerm, roleFilter])

  const handleAddWorker = () => {
    if (!formData.nombre || !formData.apellido || !formData.dni || !formData.telefono) {
      toast.error('Por favor complete todos los campos')
      return
    }

    // Validar DNI único
    if (workers.some(worker => worker.dni === formData.dni)) {
      toast.error('El DNI ya existe en el sistema')
      return
    }

    const newWorker: Worker = {
      id: Date.now().toString(),
      ...formData,
      estado: 'activo',
      fechaCreacion: new Date().toISOString().split('T')[0]
    }

    setWorkers([...workers, newWorker])
    resetForm()
    setIsAddDialogOpen(false)
    toast.success('Trabajador agregado exitosamente')
  }

  const handleEditWorker = () => {
    if (!editingWorker || !formData.nombre || !formData.apellido || !formData.dni || !formData.telefono) {
      toast.error('Por favor complete todos los campos')
      return
    }

    // Validar DNI único (excluyendo el trabajador actual)
    if (workers.some(worker => worker.dni === formData.dni && worker.id !== editingWorker.id)) {
      toast.error('El DNI ya existe en el sistema')
      return
    }

    const updatedWorkers = workers.map(worker =>
      worker.id === editingWorker.id
        ? { ...worker, ...formData }
        : worker
    )

    setWorkers(updatedWorkers)
    resetForm()
    setIsEditDialogOpen(false)
    setEditingWorker(null)
    toast.success('Trabajador actualizado exitosamente')
  }

  const handleDeleteWorker = (id: string) => {
    const worker = workers.find(w => w.id === id)
    if (worker) {
      setWorkers(workers.filter(w => w.id !== id))
      toast.success(`Trabajador ${worker.nombre} ${worker.apellido} eliminado`)
    }
  }

  const handleEditClick = (worker: Worker) => {
    setEditingWorker(worker)
    setFormData({
      nombre: worker.nombre,
      apellido: worker.apellido,
      dni: worker.dni,
      telefono: worker.telefono,
      rol: worker.rol
    })
    setIsEditDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      nombre: '',
      apellido: '',
      dni: '',
      telefono: '',
      rol: 'vendedor'
    })
  }

  const getRoleBadge = (rol: string) => {
    if (rol === 'administrador') {
      return <Badge className="bg-[#1605ac] text-white">Administrador</Badge>
    }
    return <Badge className="bg-green-600 text-white">Vendedor</Badge>
  }

  const getStatusBadge = (estado: string) => {
    if (estado === 'activo') {
      return <Badge className="bg-green-600 text-white">Activo</Badge>
    }
    return <Badge className="bg-gray-500 text-white">Inactivo</Badge>
  }

  return (
    <div className="min-h-screen bg-background">
      
      {/* Contenido principal */}
      <div className="">
        <div className="p-2 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Lista de Trabajadores
                </h1>
                <p className="text-muted-foreground">
                  Gestiona todos los trabajadores de la agencia de viajes
                </p>
              </div>
              
              {/* Estadísticas */}
              <div className="flex gap-4">
                <Card className="bg-gradient-to-r from-[#1605ac] to-[#1e40af] text-white">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Users className="w-8 h-8" />
                      <div>
                        <p className="text-sm opacity-90">Total Trabajadores</p>
                        <p className="text-2xl font-bold">{workers.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <UserCheck className="w-8 h-8" />
                      <div>
                        <p className="text-sm opacity-90">Vendedores</p>
                        <p className="text-2xl font-bold">
                          {workers.filter(w => w.rol === 'vendedor').length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Shield className="w-8 h-8" />
                      <div>
                        <p className="text-sm opacity-90">Administradores</p>
                        <p className="text-2xl font-bold">
                          {workers.filter(w => w.rol === 'administrador').length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Controles y Filtros */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col lg:flex-row gap-4 flex-1">
                  {/* Búsqueda */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Buscar por nombre, apellido o DNI..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Filtro por rol */}
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filtrar por rol" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos los roles</SelectItem>
                        <SelectItem value="vendedor">Vendedores</SelectItem>
                        <SelectItem value="administrador">Administradores</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Botón Agregar */}
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      className="bg-[#1605ac] hover:bg-[#1605ac]/90 text-white"
                      onClick={() => {
                        resetForm()
                        setIsAddDialogOpen(true)
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Agregar Trabajador
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Agregar Nuevo Trabajador</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="nombre">Nombre</Label>
                          <Input
                            id="nombre"
                            value={formData.nombre}
                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                            placeholder="Nombre"
                          />
                        </div>
                        <div>
                          <Label htmlFor="apellido">Apellido</Label>
                          <Input
                            id="apellido"
                            value={formData.apellido}
                            onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                            placeholder="Apellido"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="dni">DNI</Label>
                          <Input
                            id="dni"
                            value={formData.dni}
                            onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                            placeholder="12345678"
                            maxLength={8}
                          />
                        </div>
                        <div>
                          <Label htmlFor="telefono">Teléfono</Label>
                          <Input
                            id="telefono"
                            value={formData.telefono}
                            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                            placeholder="+51 999 123 456"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="rol">Rol</Label>
                        <Select 
                          value={formData.rol} 
                          onValueChange={(value: 'vendedor' | 'administrador') => 
                            setFormData({ ...formData, rol: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar rol" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vendedor">Vendedor</SelectItem>
                            <SelectItem value="administrador">Administrador</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleAddWorker} className="bg-[#1605ac] hover:bg-[#1605ac]/90">
                        Agregar
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Tabla de Trabajadores */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Trabajadores ({filteredWorkers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre Completo</TableHead>
                      <TableHead>DNI</TableHead>
                      <TableHead>Teléfono</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Fecha Creación</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredWorkers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          No se encontraron trabajadores
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredWorkers.map((worker) => (
                        <TableRow key={worker.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {worker.nombre} {worker.apellido}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono">{worker.dni}</TableCell>
                          <TableCell>{worker.telefono}</TableCell>
                          <TableCell>{getRoleBadge(worker.rol)}</TableCell>
                          <TableCell>{getStatusBadge(worker.estado)}</TableCell>
                          <TableCell>{worker.fechaCreacion}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditClick(worker)}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteWorker(worker.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialog de Edición */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Trabajador</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-nombre">Nombre</Label>
                <Input
                  id="edit-nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  placeholder="Nombre"
                />
              </div>
              <div>
                <Label htmlFor="edit-apellido">Apellido</Label>
                <Input
                  id="edit-apellido"
                  value={formData.apellido}
                  onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                  placeholder="Apellido"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-dni">DNI</Label>
                <Input
                  id="edit-dni"
                  value={formData.dni}
                  onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                  placeholder="12345678"
                  maxLength={8}
                />
              </div>
              <div>
                <Label htmlFor="edit-telefono">Teléfono</Label>
                <Input
                  id="edit-telefono"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  placeholder="+51 999 123 456"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-rol">Rol</Label>
              <Select 
                value={formData.rol} 
                onValueChange={(value: 'vendedor' | 'administrador') => 
                  setFormData({ ...formData, rol: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vendedor">Vendedor</SelectItem>
                  <SelectItem value="administrador">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditWorker} className="bg-[#1605ac] hover:bg-[#1605ac]/90">
              Actualizar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
