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
  Ticket,
  X,
  AlertTriangle,
  CheckCircle,
  Info,
  Globe
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { ConstructorPaquetes } from './constructor-paquetes'

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
  
  // Estados para modales y acciones
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [constructorPaquetesOpen, setConstructorPaquetesOpen] = useState(false)
  const [selectedPaquete, setSelectedPaquete] = useState<Paquete | null>(null)
  const [editingPaquete, setEditingPaquete] = useState<Paquete | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Mock data basado en paquetes reales
  const [paquetes, setPaquetes] = useState<Paquete[]>([
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
  ])

  const destinos = ['Arequipa', 'Cusco', 'Chachapoyas', 'Ayacucho', 'Cajamarca', 'Lima', 'Trujillo']
  const categorias = [
    'Turismo Cultural', 'Turismo de Aventura', 'Turismo de Naturaleza', 
    'Ecoturismo', 'Gastronomía', 'Turismo Rural', 'Turismo Místico'
  ]

  // Funciones para manejar acciones
  const handleView = (paquete: Paquete) => {
    setSelectedPaquete(paquete)
    setViewModalOpen(true)
  }

  const handleEdit = (paquete: Paquete) => {
    setEditingPaquete({ ...paquete })
    setEditModalOpen(true)
  }

  const handleDelete = (paquete: Paquete) => {
    setSelectedPaquete(paquete)
    setDeleteDialogOpen(true)
  }

  const handleNewPaquete = () => {
    setConstructorPaquetesOpen(true)
  }

  const confirmDelete = async () => {
    if (!selectedPaquete) return
    
    setIsLoading(true)
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setPaquetes(prev => prev.filter(p => p.id !== selectedPaquete.id))
      toast.success('Paquete eliminado exitosamente')
      setDeleteDialogOpen(false)
      setSelectedPaquete(null)
    } catch (error) {
      toast.error('Error al eliminar el paquete')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveEdit = async () => {
    if (!editingPaquete) return
    
    setIsLoading(true)
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setPaquetes(prev => prev.map(p => 
        p.id === editingPaquete.id ? editingPaquete : p
      ))
      toast.success('Paquete actualizado exitosamente')
      setEditModalOpen(false)
      setEditingPaquete(null)
    } catch (error) {
      toast.error('Error al actualizar el paquete')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof Paquete, value: any) => {
    if (!editingPaquete) return
    
    setEditingPaquete(prev => {
      if (!prev) return prev
      
      if (field === 'servicios' || field === 'idiomas') {
        // Manejar arrays
        const currentValue = prev[field] as string[]
        const newValue = value.includes(',') ? value.split(',').map((s: string) => s.trim()) : [value]
        return { ...prev, [field]: newValue }
      }
      
      if (field === 'precioOriginal' || field === 'precioDescuento' || field === 'capacidad' || field === 'reservas' || field === 'minimoPersonas') {
        // Manejar números
        return { ...prev, [field]: parseFloat(value) || 0 }
      }
      
      return { ...prev, [field]: value }
    })
  }

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

  // Funciones auxiliares para el itinerario
  const getDayName = (dayIndex: number, destino: string): string => {
    const dayNames = ['Llegada', 'Exploración', 'Aventura', 'Cultura', 'Naturaleza', 'Despedida']
    return dayNames[dayIndex] || `Día ${dayIndex + 1}`
  }

  const getDayActivities = (dayIndex: number, destino: string): string[] => {
    const activitiesByDestino: { [key: string]: string[][] } = {
      'Arequipa': [
        ['Plaza de Armas', 'Monasterio de Santa Catalina', 'Mirador de Yanahuara'],
        ['Valle del Colca', 'Mirador Cruz del Cóndor', 'Pueblo de Chivay'],
        ['Centro Histórico', 'Iglesia de la Compañía', 'Mercado San Camilo'],
        ['Barrio de San Lázaro', 'Mansión del Fundador', 'Cena de despedida']
      ],
      'Cusco': [
        ['Plaza de Armas', 'Catedral', 'Barrio de San Blas'],
        ['Machu Picchu', 'Ciudadela Inca', 'Templo del Sol'],
        ['Valle Sagrado', 'Pisac', 'Ollantaytambo'],
        ['Sacsayhuamán', 'Qenqo', 'Puka Pukara']
      ],
      'Chachapoyas': [
        ['Plaza de Armas', 'Museo', 'Casa de la Cultura'],
        ['Fortaleza de Kuélap', 'Mirador', 'Pueblo de María'],
        ['Sarcófagos de Karajía', 'Caverna de Quiocta'],
        ['Catarata de Gocta', 'Pueblo de Cocachimba'],
        ['Valle de Utcubamba', 'Mercado artesanal'],
        ['Museo de Sitio', 'Compras de recuerdos']
      ],
      'Ayacucho': [
        ['Plaza de Armas', 'Catedral', 'Iglesias coloniales'],
        ['Pampa de Ayacucho', 'Santuario histórico'],
        ['Centro artesanal', 'Mercado de artesanías']
      ]
    }
    
    const activities = activitiesByDestino[destino] || []
    return activities[dayIndex] || ['Actividades del día', 'Exploración del destino']
  }

  const getDayMeals = (dayIndex: number): string[] => {
    const meals = [
      ['Cena de bienvenida'],
      ['Desayuno', 'Almuerzo'],
      ['Desayuno', 'Almuerzo'],
      ['Desayuno', 'Almuerzo'],
      ['Desayuno', 'Almuerzo'],
      ['Desayuno', 'Almuerzo']
    ]
    return meals[dayIndex] || ['Desayuno', 'Almuerzo']
  }

  const getDayServices = (dayIndex: number, servicios: string[]): string[] => {
    // Distribuir servicios a lo largo de los días
    const servicesPerDay = Math.ceil(servicios.length / 6)
    const startIndex = dayIndex * servicesPerDay
    const endIndex = Math.min(startIndex + servicesPerDay, servicios.length)
    
    if (startIndex >= servicios.length) {
      return ['Traslados', 'Guía turístico']
    }
    
    return servicios.slice(startIndex, endIndex)
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
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleNewPaquete}>
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
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
                        onClick={() => handleView(paquete)}
                        title="Ver detalles"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-600"
                        onClick={() => handleEdit(paquete)}
                        title="Editar paquete"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-red-100"
                        onClick={() => handleDelete(paquete)}
                        title="Eliminar paquete"
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

      {/* Modal de Vista Detallada Personalizado */}
      {viewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header del Modal */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Detalles del Paquete Turístico</h2>
                  <p className="text-gray-600">Información completa y estructurada del paquete turístico</p>
                </div>
              </div>
              <button
                onClick={() => setViewModalOpen(false)}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            
            {/* Contenido del Modal */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6 space-y-8">
              {selectedPaquete && (
                <>
                  {/* Header del Paquete con Imagen de Fondo */}
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-50 to-indigo-100 p-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5"></div>
                    <div className="relative flex items-start gap-6">
                      <div className="w-24 h-24 bg-primary/10 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                        <Package className="w-12 h-12 text-primary" />
                      </div>
                      
                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="text-3xl font-bold text-gray-900 mb-2">{selectedPaquete.nombre}</h3>
                          <div className="flex items-center gap-3">
                            <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-lg font-medium">
                              {selectedPaquete.categoria}
                            </span>
                            {getStatusBadge(selectedPaquete.estado)}
                            {getTipoTuristaBadge(selectedPaquete.tipoTurista)}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <MapPin className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Destino</p>
                              <p className="font-semibold text-gray-900">{selectedPaquete.destino}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <Clock className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Duración</p>
                              <p className="font-semibold text-gray-900">{selectedPaquete.duracion}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Mín. Personas</p>
                              <p className="font-semibold text-gray-900">{selectedPaquete.minimoPersonas}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Línea del Tiempo del Itinerario */}
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        Itinerario Detallado
                      </h3>
                      <p className="text-gray-600 mt-1">Cronograma completo de actividades y servicios por día</p>
                    </div>
                    <div className="p-6">
                      <div className="space-y-6">
                        {Array.from({ length: parseInt(selectedPaquete.duracion.split(' ')[0]) }, (_, index) => (
                          <div key={index} className="relative">
                            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary to-gray-300"></div>
                            
                            <div className="flex items-start gap-6">
                              <div className="relative z-10 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                                {index + 1}
                              </div>
                              
                              <div className="flex-1 bg-gray-50 rounded-lg p-4 space-y-4">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-lg font-semibold text-gray-900">
                                    Día {index + 1} - {getDayName(index, selectedPaquete.destino)}
                                  </h4>
                                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                                    {index === 0 ? 'Llegada' : index === parseInt(selectedPaquete.duracion.split(' ')[0]) - 1 ? 'Partida' : 'Actividades'}
                                  </span>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-3">
                                    <h5 className="font-medium text-gray-900 flex items-center gap-2">
                                      <Eye className="w-4 h-4 text-blue-600" />
                                      Lugares a Visitar
                                    </h5>
                                    <div className="space-y-2">
                                      {getDayActivities(index, selectedPaquete.destino).map((lugar, lugarIndex) => (
                                        <div key={lugarIndex} className="flex items-center gap-2 text-sm">
                                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                          <span className="text-gray-700">{lugar}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <h5 className="font-medium text-gray-900 flex items-center gap-2">
                                      <UtensilsCrossed className="w-4 h-4 text-green-600" />
                                      Comidas Incluidas
                                    </h5>
                                    <div className="space-y-2">
                                      {getDayMeals(index).map((comida, comidaIndex) => (
                                        <div key={comidaIndex} className="flex items-center gap-2 text-sm">
                                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                          <span className="text-gray-700">{comida}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="pt-3 border-t border-gray-200">
                                  <h5 className="font-medium text-gray-900 flex items-center gap-2 mb-2">
                                    <Bus className="w-4 h-4 text-purple-600" />
                                    Servicios del Día
                                  </h5>
                                  <div className="flex flex-wrap gap-2">
                                    {getDayServices(index, selectedPaquete.servicios).map((servicio, servicioIndex) => (
                                      <span key={servicioIndex} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                        {servicio}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Información de Precios y Descuentos */}
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        Información de Precios
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-sm text-green-700 mb-1">Precio Final</p>
                          <p className="text-3xl font-bold text-green-600">
                            S/ {formatNumber(selectedPaquete.precioDescuento)}
                          </p>
                          <p className="text-xs text-green-600">por persona</p>
                        </div>
                        
                        <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <p className="text-sm text-gray-600 mb-1">Precio Original</p>
                          <p className="text-2xl font-bold text-gray-500 line-through">
                            S/ {formatNumber(selectedPaquete.precioOriginal)}
                          </p>
                          <p className="text-xs text-gray-500">por persona</p>
                        </div>
                        
                        {selectedPaquete.ahorro > 0 && (
                          <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                            <p className="text-sm text-orange-700 mb-1">Ahorro Total</p>
                            <p className="text-2xl font-bold text-orange-600">
                              S/ {formatNumber(selectedPaquete.ahorro)}
                            </p>
                            <p className="text-xs text-orange-600">por persona</p>
                          </div>
                        )}
                      </div>
                      
                      {selectedPaquete.ahorro > 0 && (
                        <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                          <div className="flex items-center gap-2 text-green-700">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-medium">¡Oferta Especial!</span>
                          </div>
                          <p className="text-sm text-green-600 mt-1">
                            Ahorras un {Math.round((selectedPaquete.ahorro / selectedPaquete.precioOriginal) * 100)}% en este paquete
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Capacidad y Reservas */}
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-600" />
                        Capacidad y Reservas
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-sm text-blue-700 mb-1">Capacidad Total</p>
                          <p className="text-2xl font-bold text-blue-600">{selectedPaquete.capacidad}</p>
                          <p className="text-xs text-blue-600">personas</p>
                        </div>
                        
                        <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                          <p className="text-sm text-orange-700 mb-1">Reservas Actuales</p>
                          <p className="text-2xl font-bold text-orange-600">{selectedPaquete.reservas}</p>
                          <p className="text-xs text-orange-600">personas</p>
                        </div>
                        
                        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-sm text-green-700 mb-1">Disponibilidad</p>
                          <p className="text-2xl font-bold text-green-600">
                            {selectedPaquete.capacidad - selectedPaquete.reservas}
                          </p>
                          <p className="text-xs text-green-600">plazas libres</p>
                        </div>
                      </div>
                      
                      <div className="mt-6 space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-gray-700">Nivel de Ocupación</span>
                          <span className="text-gray-500">
                            {ocupacionPorcentaje(selectedPaquete.reservas, selectedPaquete.capacidad)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                          <div 
                            className={`h-4 rounded-full transition-all duration-500 ${
                              ocupacionPorcentaje(selectedPaquete.reservas, selectedPaquete.capacidad) > 80 
                                ? 'bg-red-500' 
                                : ocupacionPorcentaje(selectedPaquete.reservas, selectedPaquete.capacidad) > 60 
                                  ? 'bg-yellow-500' 
                                  : 'bg-green-500'
                            }`}
                            style={{ width: `${ocupacionPorcentaje(selectedPaquete.reservas, selectedPaquete.capacidad)}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Baja ocupación</span>
                          <span>Media ocupación</span>
                          <span>Alta ocupación</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Servicios e Idiomas Detallados */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                      <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          Servicios Incluidos
                        </h3>
                        <p className="text-gray-600 mt-1">Todos los servicios que están incluidos en el paquete</p>
                      </div>
                      <div className="p-6">
                        <div className="grid grid-cols-2 gap-3">
                          {selectedPaquete.servicios.map((servicio, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-sm font-medium text-gray-700">{servicio}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                      <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                          <Globe className="w-5 h-5 text-blue-600" />
                          Idiomas Disponibles
                        </h3>
                        <p className="text-gray-600 mt-1">Idiomas en los que se ofrece el servicio</p>
                      </div>
                      <div className="p-6">
                        <div className="flex flex-wrap gap-2">
                          {selectedPaquete.idiomas.map((idioma, index) => (
                            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm border border-gray-200">
                              {idioma}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Información Adicional */}
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <Info className="w-5 h-5 text-purple-600" />
                        Información Adicional
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">ID del Paquete</p>
                          <p className="font-mono font-bold text-gray-900">#{selectedPaquete.id}</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Fecha de Creación</p>
                          <p className="font-medium text-gray-900">{new Date(selectedPaquete.fechaCreacion).toLocaleDateString('es-ES')}</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Calificación</p>
                          <div className="flex items-center justify-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-bold text-gray-900">{selectedPaquete.calificacion}</span>
                          </div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Estado</p>
                          {getStatusBadge(selectedPaquete.estado)}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Edición Personalizado */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header del Modal */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Edit className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Editar Paquete</h2>
                  <p className="text-gray-600">Modifica la información del paquete turístico</p>
                </div>
              </div>
              <button
                onClick={() => setEditModalOpen(false)}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            
            {/* Contenido del Modal */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6 space-y-8">
              {editingPaquete && (
                <>
                  {/* Información Básica */}
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Package className="w-5 h-5 text-primary" />
                        Información Básica
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                            Nombre del Paquete
                          </label>
                          <input
                            id="nombre"
                            type="text"
                            value={editingPaquete.nombre}
                            onChange={(e) => handleInputChange('nombre', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                            placeholder="Nombre del paquete"
                          />
                        </div>
                        
                        <div className="space-y-3">
                          <label htmlFor="destino" className="block text-sm font-medium text-gray-700">
                            Destino
                          </label>
                          <select
                            id="destino"
                            value={editingPaquete.destino}
                            onChange={(e) => handleInputChange('destino', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                          >
                            {destinos.map(destino => (
                              <option key={destino} value={destino}>{destino}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div className="space-y-3">
                          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
                            Categoría
                          </label>
                          <select
                            id="categoria"
                            value={editingPaquete.categoria}
                            onChange={(e) => handleInputChange('categoria', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                          >
                            {categorias.map(categoria => (
                              <option key={categoria} value={categoria}>{categoria}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="space-y-3">
                          <label htmlFor="tipoTurista" className="block text-sm font-medium text-gray-700">
                            Tipo de Turista
                          </label>
                          <select
                            id="tipoTurista"
                            value={editingPaquete.tipoTurista}
                            onChange={(e) => handleInputChange('tipoTurista', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                          >
                            <option value="nacional">Nacional</option>
                            <option value="extranjero">Extranjero</option>
                            <option value="ambos">Ambos</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Duración y Capacidad */}
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary" />
                        Duración y Capacidad
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-3">
                          <label htmlFor="duracion" className="block text-sm font-medium text-gray-700">
                            Duración
                          </label>
                          <input
                            id="duracion"
                            type="text"
                            value={editingPaquete.duracion}
                            onChange={(e) => handleInputChange('duracion', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                            placeholder="Ej: 4 Días / 3 Noches"
                          />
                        </div>
                        
                        <div className="space-y-3">
                          <label htmlFor="capacidad" className="block text-sm font-medium text-gray-700">
                            Capacidad
                          </label>
                          <input
                            id="capacidad"
                            type="number"
                            value={editingPaquete.capacidad}
                            onChange={(e) => handleInputChange('capacidad', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                          />
                        </div>
                        
                        <div className="space-y-3">
                          <label htmlFor="minimoPersonas" className="block text-sm font-medium text-gray-700">
                            Mín. Personas
                          </label>
                          <input
                            id="minimoPersonas"
                            type="number"
                            value={editingPaquete.minimoPersonas}
                            onChange={(e) => handleInputChange('minimoPersonas', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Precios */}
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        Información de Precios
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <label htmlFor="precioOriginal" className="block text-sm font-medium text-gray-700">
                            Precio Original
                          </label>
                          <input
                            id="precioOriginal"
                            type="number"
                            step="0.01"
                            value={editingPaquete.precioOriginal}
                            onChange={(e) => handleInputChange('precioOriginal', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                          />
                        </div>
                        
                        <div className="space-y-3">
                          <label htmlFor="precioDescuento" className="block text-sm font-medium text-gray-700">
                            Precio con Descuento
                          </label>
                          <input
                            id="precioDescuento"
                            type="number"
                            step="0.01"
                            value={editingPaquete.precioDescuento}
                            onChange={(e) => handleInputChange('precioDescuento', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Estado y Calificación */}
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Info className="w-5 h-5 text-purple-600" />
                        Estado y Calificación
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <label htmlFor="estado" className="block text-sm font-medium text-gray-700">
                            Estado
                          </label>
                          <select
                            id="estado"
                            value={editingPaquete.estado}
                            onChange={(e) => handleInputChange('estado', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                          >
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                            <option value="agotado">Agotado</option>
                            <option value="promocional">Promocional</option>
                          </select>
                        </div>
                        
                        <div className="space-y-3">
                          <label htmlFor="calificacion" className="block text-sm font-medium text-gray-700">
                            Calificación
                          </label>
                          <input
                            id="calificacion"
                            type="number"
                            step="0.1"
                            min="0"
                            max="5"
                            value={editingPaquete.calificacion}
                            onChange={(e) => handleInputChange('calificacion', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Servicios e Idiomas */}
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        Servicios e Idiomas
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <label htmlFor="servicios" className="block text-sm font-medium text-gray-700">
                            Servicios (separados por comas)
                          </label>
                          <textarea
                            id="servicios"
                            value={editingPaquete.servicios.join(', ')}
                            onChange={(e) => handleInputChange('servicios', e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                            placeholder="Hoteles, Tours, Español, Visitas guiadas"
                          />
                        </div>
                        
                        <div className="space-y-3">
                          <label htmlFor="idiomas" className="block text-sm font-medium text-gray-700">
                            Idiomas (separados por comas)
                          </label>
                          <textarea
                            id="idiomas"
                            value={editingPaquete.idiomas.join(', ')}
                            onChange={(e) => handleInputChange('idiomas', e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                            placeholder="Español, Inglés"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Botones de Acción */}
                  <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setEditModalOpen(false)}
                      disabled={isLoading}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 transition-colors disabled:opacity-50"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      disabled={isLoading}
                      className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 focus:ring-2 focus:ring-primary/20 transition-colors disabled:opacity-50"
                    >
                      {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Dialog de Confirmación de Eliminación */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              ¿Eliminar Paquete?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el paquete 
              <strong> "{selectedPaquete?.nombre}"</strong> y toda su información asociada.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isLoading ? 'Eliminando...' : 'Eliminar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Modal de Nuevo Paquete */}
      <ConstructorPaquetes 
        isOpen={constructorPaquetesOpen}
        onClose={() => setConstructorPaquetesOpen(false)}
      />
    </div>
  )
}

export default PaquetesTable
