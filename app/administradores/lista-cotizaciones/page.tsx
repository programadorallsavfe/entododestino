"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Search, 
  Filter, 
  Package, 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  Download,
  Plus,
  AlertCircle,
  Star,
  MapPin,
  Plane,
  Hotel,
  Car,
  X
} from "lucide-react"

// Función para obtener icono de servicio
const getServicioIcono = (servicio: string) => {
  switch (servicio) {
    case "hotel": return <Hotel className="w-4 h-4" />
    case "vuelos": return <Plane className="w-4 h-4" />
    case "transporte": return <Car className="w-4 h-4" />
    default: return <Star className="w-4 h-4" />
  }
}



// Tipos de datos
interface SolicitudPaquete {
  id: string
  cliente: string
  email: string
  telefono: string
  destino: string
  fechaInicio: string
  fechaFin: string
  personas: number
  presupuesto: number
  estado: "pendiente" | "en_revision" | "aprobada" | "rechazada" | "completada"
  prioridad: "baja" | "media" | "alta" | "urgente"
  servicios: string[]
  fechaSolicitud: string
  notas: string
}

// Datos mock para las solicitudes
const solicitudesMock: SolicitudPaquete[] = [
  {
    id: "SOL-001",
    cliente: "María González",
    email: "maria.gonzalez@email.com",
    telefono: "+51 999 123 456",
    destino: "Cusco, Perú",
    fechaInicio: "2024-03-15",
    fechaFin: "2024-03-22",
    personas: 4,
    presupuesto: 2500,
    estado: "pendiente",
    prioridad: "alta",
    servicios: ["hotel", "vuelos", "guía", "transporte"],
    fechaSolicitud: "2024-01-15",
    notas: "Familia con niños pequeños, preferencia por hoteles familiares"
  },
  {
    id: "SOL-002",
    cliente: "Carlos Rodríguez",
    email: "carlos.rodriguez@email.com",
    telefono: "+51 998 234 567",
    destino: "Arequipa, Perú",
    fechaInicio: "2024-04-10",
    fechaFin: "2024-04-15",
    personas: 2,
    presupuesto: 1800,
    estado: "en_revision",
    prioridad: "media",
    servicios: ["hotel", "vuelos", "tours"],
    fechaSolicitud: "2024-01-20",
    notas: "Pareja en luna de miel, buscan experiencias románticas"
  },
  {
    id: "SOL-003",
    cliente: "Ana Martínez",
    email: "ana.martinez@email.com",
    telefono: "+51 997 345 678",
    destino: "Lima, Perú",
    fechaInicio: "2024-05-01",
    fechaFin: "2024-05-08",
    personas: 6,
    presupuesto: 3200,
    estado: "aprobada",
    prioridad: "urgente",
    servicios: ["hotel", "vuelos", "transporte", "guía", "actividades"],
    fechaSolicitud: "2024-01-18",
    notas: "Grupo de amigos, intereses en gastronomía y cultura"
  },
  {
    id: "SOL-004",
    cliente: "Luis Fernández",
    email: "luis.fernandez@email.com",
    telefono: "+51 996 456 789",
    destino: "Machu Picchu, Perú",
    fechaInicio: "2024-06-20",
    fechaFin: "2024-06-25",
    personas: 3,
    presupuesto: 2100,
    estado: "pendiente",
    prioridad: "baja",
    servicios: ["hotel", "vuelos", "guía"],
    fechaSolicitud: "2024-01-22",
    notas: "Viaje de aventura, preferencia por alojamientos rústicos"
  },
  {
    id: "SOL-005",
    cliente: "Sofia Torres",
    email: "sofia.torres@email.com",
    telefono: "+51 995 567 890",
    destino: "Trujillo, Perú",
    fechaInicio: "2024-07-10",
    fechaFin: "2024-07-17",
    personas: 5,
    presupuesto: 2800,
    estado: "en_revision",
    prioridad: "media",
    servicios: ["hotel", "vuelos", "transporte", "tours"],
    fechaSolicitud: "2024-01-25",
    notas: "Familia numerosa, interés en arqueología y playas"
  }
]

// Componente para editar solicitud
const EditarSolicitudForm = ({ 
  solicitud, 
  onSave, 
  onCancel 
}: { 
  solicitud: SolicitudPaquete
  onSave: (datos: Partial<SolicitudPaquete>) => void
  onCancel: () => void
}) => {
  const [datos, setDatos] = useState({
    cliente: solicitud.cliente,
    email: solicitud.email,
    telefono: solicitud.telefono,
    destino: solicitud.destino,
    fechaInicio: solicitud.fechaInicio,
    fechaFin: solicitud.fechaFin,
    personas: solicitud.personas,
    presupuesto: solicitud.presupuesto,
    estado: solicitud.estado,
    prioridad: solicitud.prioridad,
    servicios: [...solicitud.servicios],
    notas: solicitud.notas
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(datos)
  }

  const toggleServicio = (servicio: string) => {
    setDatos(prev => ({
      ...prev,
      servicios: prev.servicios.includes(servicio)
        ? prev.servicios.filter(s => s !== servicio)
        : [...prev.servicios, servicio]
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cliente">Nombre del Cliente</Label>
          <Input
            id="cliente"
            value={datos.cliente}
            onChange={(e) => setDatos(prev => ({ ...prev, cliente: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={datos.email}
            onChange={(e) => setDatos(prev => ({ ...prev, email: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="telefono">Teléfono</Label>
          <Input
            id="telefono"
            value={datos.telefono}
            onChange={(e) => setDatos(prev => ({ ...prev, telefono: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="destino">Destino</Label>
          <Input
            id="destino"
            value={datos.destino}
            onChange={(e) => setDatos(prev => ({ ...prev, destino: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="fechaInicio">Fecha de Inicio</Label>
          <Input
            id="fechaInicio"
            type="date"
            value={datos.fechaInicio}
            onChange={(e) => setDatos(prev => ({ ...prev, fechaInicio: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="fechaFin">Fecha de Fin</Label>
          <Input
            id="fechaFin"
            type="date"
            value={datos.fechaFin}
            onChange={(e) => setDatos(prev => ({ ...prev, fechaFin: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="personas">Número de Personas</Label>
          <Input
            id="personas"
            type="number"
            min="1"
            value={datos.personas}
            onChange={(e) => setDatos(prev => ({ ...prev, personas: parseInt(e.target.value) }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="presupuesto">Presupuesto (USD)</Label>
          <Input
            id="presupuesto"
            type="number"
            min="0"
            value={datos.presupuesto}
            onChange={(e) => setDatos(prev => ({ ...prev, presupuesto: parseInt(e.target.value) }))}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="estado">Estado</Label>
          <Select value={datos.estado} onValueChange={(value) => setDatos(prev => ({ ...prev, estado: value as SolicitudPaquete["estado"] }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pendiente">Pendiente</SelectItem>
              <SelectItem value="en_revision">En Revisión</SelectItem>
              <SelectItem value="aprobada">Aprobada</SelectItem>
              <SelectItem value="rechazada">Rechazada</SelectItem>
              <SelectItem value="completada">Completada</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="prioridad">Prioridad</Label>
          <Select value={datos.prioridad} onValueChange={(value) => setDatos(prev => ({ ...prev, prioridad: value as SolicitudPaquete["prioridad"] }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="baja">Baja</SelectItem>
              <SelectItem value="media">Media</SelectItem>
              <SelectItem value="alta">Alta</SelectItem>
              <SelectItem value="urgente">Urgente</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label>Servicios Incluidos</Label>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {['hotel', 'vuelos', 'transporte', 'guía', 'tours', 'actividades'].map((servicio) => (
            <Button
              key={servicio}
              type="button"
              variant={datos.servicios.includes(servicio) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleServicio(servicio)}
              className="justify-start"
            >
              {getServicioIcono(servicio)}
              <span className="ml-2 capitalize">{servicio}</span>
            </Button>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="notas">Notas Adicionales</Label>
        <Textarea
          id="notas"
          value={datos.notas}
          onChange={(e) => setDatos(prev => ({ ...prev, notas: e.target.value }))}
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-[#1605ac] hover:bg-[#1605ac]/90">
          Guardar Cambios
        </Button>
      </div>
    </form>
  )
}

// Componente para mostrar detalles de la solicitud
const DetalleSolicitud = ({ solicitud }: { solicitud: SolicitudPaquete }) => {
  return (
    <div className="space-y-6">
      {/* Información del Cliente */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Información del Cliente
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Nombre</Label>
            <p className="text-lg font-medium">{solicitud.cliente}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Email</Label>
            <p className="text-lg">{solicitud.email}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Teléfono</Label>
            <p className="text-lg">{solicitud.telefono}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Fecha de Solicitud</Label>
            <p className="text-lg">{new Date(solicitud.fechaSolicitud).toLocaleDateString('es-ES')}</p>
          </div>
        </CardContent>
      </Card>

      {/* Detalles del Viaje */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Detalles del Viaje
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Destino</Label>
            <p className="text-lg font-medium">{solicitud.destino}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Número de Personas</Label>
            <p className="text-lg">{solicitud.personas}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Fecha de Inicio</Label>
            <p className="text-lg">{new Date(solicitud.fechaInicio).toLocaleDateString('es-ES')}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Fecha de Fin</Label>
            <p className="text-lg">{new Date(solicitud.fechaFin).toLocaleDateString('es-ES')}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Presupuesto</Label>
            <p className="text-lg font-medium text-green-600">${solicitud.presupuesto.toLocaleString('en-US')}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Duración</Label>
            <p className="text-lg">
              {Math.ceil((new Date(solicitud.fechaFin).getTime() - new Date(solicitud.fechaInicio).getTime()) / (1000 * 60 * 60 * 24))} días
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Estado y Prioridad */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Estado y Prioridad
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Estado</Label>
            <Badge className={`mt-2 ${getEstadoColor(solicitud.estado)}`}>
              {solicitud.estado.replace("_", " ")}
            </Badge>
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Prioridad</Label>
            <Badge className={`mt-2 ${getPrioridadColor(solicitud.prioridad)}`}>
              {solicitud.prioridad}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Servicios */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Servicios Incluidos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {solicitud.servicios.map((servicio, index) => (
              <div key={index} className="flex items-center gap-2 p-2 border rounded-lg">
                {getServicioIcono(servicio)}
                <span className="capitalize">{servicio}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notas */}
      {solicitud.notas && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              Notas Adicionales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">{solicitud.notas}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Función para obtener color del estado
const getEstadoColor = (estado: string) => {
  switch (estado) {
    case "pendiente": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
    case "en_revision": return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
    case "aprobada": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
    case "rechazada": return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
    case "completada": return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300"
    default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
  }
}

// Función para obtener color de prioridad
const getPrioridadColor = (prioridad: string) => {
  switch (prioridad) {
    case "baja": return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
    case "media": return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
    case "alta": return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300"
    case "urgente": return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
    default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
  }
}

// Componente principal
export default function SolicitudesPaquetesPage() {
  const router = useRouter()
  const [solicitudes, setSolicitudes] = useState<SolicitudPaquete[]>(solicitudesMock)
  const [filtroEstado, setFiltroEstado] = useState<string>("todos")
  const [filtroPrioridad, setFiltroPrioridad] = useState<string>("todos")
  const [busqueda, setBusqueda] = useState<string>("")
  const [tabActivo, setTabActivo] = useState<string>("todas")
  const [editarSolicitud, setEditarSolicitud] = useState<SolicitudPaquete | null>(null)
  const [verDetalle, setVerDetalle] = useState<SolicitudPaquete | null>(null)
  const [confirmarEliminar, setConfirmarEliminar] = useState<string | null>(null)

  // Filtrar solicitudes
  const solicitudesFiltradas = solicitudes.filter(solicitud => {
    const cumpleEstado = filtroEstado === "todos" || solicitud.estado === filtroEstado
    const cumplePrioridad = filtroPrioridad === "todos" || solicitud.prioridad === filtroPrioridad
    const cumpleBusqueda = solicitud.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
                           solicitud.destino.toLowerCase().includes(busqueda.toLowerCase()) ||
                           solicitud.id.toLowerCase().includes(busqueda.toLowerCase())
    
    return cumpleEstado && cumplePrioridad && cumpleBusqueda
  })

  // Obtener estadísticas
  const estadisticas = {
    total: solicitudes.length,
    pendientes: solicitudes.filter(s => s.estado === "pendiente").length,
    enRevision: solicitudes.filter(s => s.estado === "en_revision").length,
    aprobadas: solicitudes.filter(s => s.estado === "aprobada").length,
    rechazadas: solicitudes.filter(s => s.estado === "rechazada").length,
    completadas: solicitudes.filter(s => s.estado === "completada").length,
    ingresosPotenciales: solicitudes
      .filter(s => ["pendiente", "en_revision", "aprobada"].includes(s.estado))
      .reduce((sum, s) => sum + s.presupuesto, 0)
  }

  // Función para cambiar estado
  const handleCambiarEstado = (id: string, nuevoEstado: SolicitudPaquete["estado"]) => {
    setSolicitudes(prev => 
      prev.map(s => s.id === id ? { ...s, estado: nuevoEstado } : s)
    )
  }

  // Función para editar solicitud
  const handleEditar = (solicitud: SolicitudPaquete) => {
    setEditarSolicitud(solicitud)
  }

  // Función para guardar edición
  const handleGuardarEdicion = (datosEditados: Partial<SolicitudPaquete>) => {
    if (editarSolicitud) {
      setSolicitudes(prev => 
        prev.map(s => s.id === editarSolicitud.id ? { ...s, ...datosEditados } : s)
      )
      setEditarSolicitud(null)
    }
  }

  // Función para ver detalle
  const handleVerDetalle = (solicitud: SolicitudPaquete) => {
    setVerDetalle(solicitud)
  }

  // Función para eliminar solicitud
  const handleEliminar = (id: string) => {
    setSolicitudes(prev => prev.filter(s => s.id !== id))
    setConfirmarEliminar(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Solicitudes de Paquetes</h1>
          <p className="text-muted-foreground">
            Gestiona las solicitudes de paquetes turísticos de los clientes
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button 
            size="sm" 
            className="bg-[#1605ac] hover:bg-[#1605ac]/90"
            onClick={() => router.push('/trabajadores/crear-cotizacion')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar Cotizaciones
          </Button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Solicitudes</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estadisticas.total}</div>
            <p className="text-xs text-muted-foreground">
              Solicitudes en el sistema
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{estadisticas.pendientes}</div>
            <p className="text-xs text-muted-foreground">
              Requieren atención
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Revisión</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{estadisticas.enRevision}</div>
            <p className="text-xs text-muted-foreground">
              En proceso de evaluación
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Potenciales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
                         <div className="text-2xl font-bold text-green-600">
               ${estadisticas.ingresosPotenciales.toLocaleString('en-US')}
             </div>
            <p className="text-xs text-muted-foreground">
              Valor total de solicitudes activas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs y Filtros */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Tabs value={tabActivo} onValueChange={setTabActivo} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="todas">Todas ({estadisticas.total})</TabsTrigger>
                <TabsTrigger value="pendientes">Pendientes ({estadisticas.pendientes})</TabsTrigger>
                <TabsTrigger value="en_revision">En Revisión ({estadisticas.enRevision})</TabsTrigger>
                <TabsTrigger value="aprobadas">Aprobadas ({estadisticas.aprobadas})</TabsTrigger>
                <TabsTrigger value="completadas">Completadas ({estadisticas.completadas})</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar por cliente, destino o ID..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={filtroEstado} onValueChange={setFiltroEstado}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="pendiente">Pendiente</SelectItem>
                <SelectItem value="en_revision">En Revisión</SelectItem>
                <SelectItem value="aprobada">Aprobada</SelectItem>
                <SelectItem value="rechazada">Rechazada</SelectItem>
                <SelectItem value="completada">Completada</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filtroPrioridad} onValueChange={setFiltroPrioridad}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por prioridad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas las prioridades</SelectItem>
                <SelectItem value="baja">Baja</SelectItem>
                <SelectItem value="media">Media</SelectItem>
                <SelectItem value="alta">Alta</SelectItem>
                <SelectItem value="urgente">Urgente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tabla de Solicitudes */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Destino</TableHead>
                  <TableHead>Fechas</TableHead>
                  <TableHead>Personas</TableHead>
                  <TableHead>Presupuesto</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Prioridad</TableHead>
                  <TableHead>Servicios</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {solicitudesFiltradas.map((solicitud) => (
                  <TableRow key={solicitud.id}>
                    <TableCell className="font-mono text-sm">{solicitud.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{solicitud.cliente}</div>
                        <div className="text-sm text-muted-foreground">{solicitud.email}</div>
                        <div className="text-sm text-muted-foreground">{solicitud.telefono}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        {solicitud.destino}
                      </div>
                    </TableCell>
                                         <TableCell>
                       <div className="text-sm">
                         <div>Inicio: {new Date(solicitud.fechaInicio).toLocaleDateString('en-US')}</div>
                         <div>Fin: {new Date(solicitud.fechaFin).toLocaleDateString('en-US')}</div>
                       </div>
                     </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">{solicitud.personas}</Badge>
                    </TableCell>
                                         <TableCell>
                       <div className="font-medium">${solicitud.presupuesto.toLocaleString('en-US')}</div>
                     </TableCell>
                    <TableCell>
                      <Badge className={getEstadoColor(solicitud.estado)}>
                        {solicitud.estado.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPrioridadColor(solicitud.prioridad)}>
                        {solicitud.prioridad}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {solicitud.servicios.map((servicio, index) => (
                          <div key={index} className="flex items-center gap-1 text-xs">
                            {getServicioIcono(servicio)}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleVerDetalle(solicitud)}
                          title="Ver detalles"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditar(solicitud)}
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setConfirmarEliminar(solicitud.id)}
                          title="Eliminar"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Paginación */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Mostrando {solicitudesFiltradas.length} de {solicitudes.length} solicitudes
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
              <Button variant="outline" size="sm" disabled>
                Siguiente
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>



      {/* Modal de Edición */}
      <Dialog open={!!editarSolicitud} onOpenChange={() => setEditarSolicitud(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Solicitud - {editarSolicitud?.id}</DialogTitle>
          </DialogHeader>
          
          {editarSolicitud && (
            <EditarSolicitudForm 
              solicitud={editarSolicitud}
              onSave={handleGuardarEdicion}
              onCancel={() => setEditarSolicitud(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Detalle */}
      <Dialog open={!!verDetalle} onOpenChange={() => setVerDetalle(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalle de Solicitud - {verDetalle?.id}</DialogTitle>
          </DialogHeader>
          
          {verDetalle && (
            <DetalleSolicitud solicitud={verDetalle} />
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Confirmación de Eliminación */}
      <Dialog open={!!confirmarEliminar} onOpenChange={() => setConfirmarEliminar(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-muted-foreground">
              ¿Estás seguro de que quieres eliminar la solicitud <strong>{confirmarEliminar}</strong>? 
              Esta acción no se puede deshacer.
            </p>
            
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => setConfirmarEliminar(null)}
              >
                Cancelar
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => handleEliminar(confirmarEliminar!)}
              >
                Eliminar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
