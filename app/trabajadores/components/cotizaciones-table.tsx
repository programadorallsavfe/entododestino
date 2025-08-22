"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
  X,
  ChevronLeft,
  ChevronRight,
  TrendingDown
} from "lucide-react"

// Tipos de datos
interface Cotizacion {
  id: string
  cliente: string
  email: string
  telefono: string
  tipoCliente: "A" | "B"
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
  preciosClienteA: {
    hotel: number
    vuelos: number
    transporte: number
    guia: number
    tours: number
    actividades: number
    total: number
  }
  preciosClienteB: {
    hotel: number
    vuelos: number
    transporte: number
    guia: number
    tours: number
    actividades: number
    total: number
  }
  historialPrecios: {
    fecha: string
    preciosClienteA: number
    preciosClienteB: number
    cambio: "subida" | "bajada" | "sin_cambio"
  }[]
}

// Datos mock para las cotizaciones
const cotizacionesMock: Cotizacion[] = [
  {
    id: "COT-001",
    cliente: "María González",
    email: "maria.gonzalez@email.com",
    telefono: "+51 999 123 456",
    tipoCliente: "A",
    destino: "Cusco, Perú",
    fechaInicio: "2024-03-15",
    fechaFin: "2024-03-22",
    personas: 4,
    presupuesto: 2500,
    estado: "pendiente",
    prioridad: "alta",
    servicios: ["hotel", "vuelos", "guía", "transporte"],
    fechaSolicitud: "2024-01-15",
    notas: "Familia con niños pequeños, preferencia por hoteles familiares",
    preciosClienteA: { hotel: 1200, vuelos: 500, transporte: 300, guia: 150, tours: 0, actividades: 0, total: 2150 },
    preciosClienteB: { hotel: 1300, vuelos: 550, transporte: 350, guia: 180, tours: 0, actividades: 0, total: 2430 },
    historialPrecios: [
      { fecha: "2024-01-15", preciosClienteA: 2150, preciosClienteB: 2430, cambio: "sin_cambio" },
      { fecha: "2024-01-20", preciosClienteA: 2200, preciosClienteB: 2480, cambio: "subida" },
      { fecha: "2024-01-25", preciosClienteA: 2180, preciosClienteB: 2450, cambio: "bajada" }
    ]
  },
  {
    id: "COT-002",
    cliente: "Carlos Rodríguez",
    email: "carlos.rodriguez@email.com",
    telefono: "+51 998 234 567",
    tipoCliente: "B",
    destino: "Arequipa, Perú",
    fechaInicio: "2024-04-10",
    fechaFin: "2024-04-15",
    personas: 2,
    presupuesto: 1800,
    estado: "en_revision",
    prioridad: "media",
    servicios: ["hotel", "vuelos", "tours"],
    fechaSolicitud: "2024-01-20",
    notas: "Pareja en luna de miel, buscan experiencias románticas",
    preciosClienteA: { hotel: 1000, vuelos: 450, transporte: 250, guia: 120, tours: 200, actividades: 0, total: 2020 },
    preciosClienteB: { hotel: 1100, vuelos: 500, transporte: 300, guia: 130, tours: 220, actividades: 0, total: 2250 },
    historialPrecios: [
      { fecha: "2024-01-20", preciosClienteA: 2020, preciosClienteB: 2250, cambio: "sin_cambio" },
      { fecha: "2024-01-22", preciosClienteA: 1950, preciosClienteB: 2180, cambio: "bajada" }
    ]
  }
]

// Función para obtener icono de servicio
const getServicioIcono = (servicio: string) => {
  switch (servicio) {
    case "hotel": return <Hotel className="w-4 h-4" />
    case "vuelos": return <Plane className="w-4 h-4" />
    case "transporte": return <Car className="w-4 h-4" />
    default: return <Star className="w-4 h-4" />
  }
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

// Función para detectar cambios de precios
const detectarCambiosPrecios = (cotizacion: Cotizacion) => {
  if (cotizacion.historialPrecios.length < 2) return null
  
  const ultimoPrecio = cotizacion.historialPrecios[cotizacion.historialPrecios.length - 1]
  const penultimoPrecio = cotizacion.historialPrecios[cotizacion.historialPrecios.length - 2]
  
  if (ultimoPrecio.cambio === "sin_cambio") return null
  
  const precioActual = cotizacion.tipoCliente === "A" ? ultimoPrecio.preciosClienteA : ultimoPrecio.preciosClienteB
  const precioAnterior = cotizacion.tipoCliente === "A" ? penultimoPrecio.preciosClienteA : penultimoPrecio.preciosClienteB
  
  return {
    tipo: ultimoPrecio.cambio,
    precioAnterior,
    precioActual,
    diferencia: precioActual - precioAnterior,
    porcentaje: ((precioActual - precioAnterior) / precioAnterior * 100).toFixed(1)
  }
}

// Función para obtener icono de cambio de precio
const getIconoCambioPrecio = (tipo: string) => {
  switch (tipo) {
    case "subida": return <TrendingUp className="w-4 h-4 text-red-500" />
    case "bajada": return <TrendingUp className="w-4 h-4 text-green-500 rotate-180" />
    default: return null
  }
}

// Función para obtener color de cambio de precio
const getColorCambioPrecio = (tipo: string) => {
  switch (tipo) {
    case "subida": return "text-red-600 dark:text-red-400"
    case "bajada": return "text-green-600 dark:text-green-400"
    default: return "text-gray-600 dark:text-gray-400"
  }
}

// Componente principal
export function CotizacionesTable() {
  const [cotizaciones, setCotizaciones] = useState<Cotizacion[]>(cotizacionesMock)
  const [filtroEstado, setFiltroEstado] = useState<string>("todos")
  const [filtroPrioridad, setFiltroPrioridad] = useState<string>("todos")
  const [filtroTipoCliente, setFiltroTipoCliente] = useState<string>("todos")
  const [busqueda, setBusqueda] = useState<string>("")
  const [tabActivo, setTabActivo] = useState<string>("todas")

  // Filtrar cotizaciones
  const cotizacionesFiltradas = cotizaciones.filter(cotizacion => {
    const cumpleEstado = filtroEstado === "todos" || cotizacion.estado === filtroEstado
    const cumplePrioridad = filtroPrioridad === "todos" || cotizacion.prioridad === filtroPrioridad
    const cumpleTipoCliente = filtroTipoCliente === "todos" || cotizacion.tipoCliente === filtroTipoCliente
    const cumpleBusqueda = cotizacion.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
                           cotizacion.destino.toLowerCase().includes(busqueda.toLowerCase()) ||
                           cotizacion.id.toLowerCase().includes(busqueda.toLowerCase())
    
    return cumpleEstado && cumplePrioridad && cumpleTipoCliente && cumpleBusqueda
  })

  // Obtener estadísticas
  const estadisticas = {
    total: cotizaciones.length,
    pendientes: cotizaciones.filter(c => c.estado === "pendiente").length,
    enRevision: cotizaciones.filter(c => c.estado === "en_revision").length,
    aprobadas: cotizaciones.filter(c => c.estado === "aprobada").length,
    rechazadas: cotizaciones.filter(c => c.estado === "rechazada").length,
    completadas: cotizaciones.filter(c => c.estado === "completada").length,
    ingresosPotenciales: cotizaciones
      .filter(c => ["pendiente", "en_revision", "aprobada"].includes(c.estado))
      .reduce((sum, c) => sum + c.presupuesto, 0),
    clientesTipoA: cotizaciones.filter(c => c.tipoCliente === "A").length,
    clientesTipoB: cotizaciones.filter(c => c.tipoCliente === "B").length,
    precioPromedioA: cotizaciones
      .filter(c => c.tipoCliente === "A")
      .reduce((sum, c) => sum + c.preciosClienteA.total, 0) / 
      Math.max(cotizaciones.filter(c => c.tipoCliente === "A").length, 1),
    precioPromedioB: cotizaciones
      .filter(c => c.tipoCliente === "B")
      .reduce((sum, c) => sum + c.preciosClienteB.total, 0) / 
      Math.max(cotizaciones.filter(c => c.tipoCliente === "B").length, 1),
    cambiosPrecios: cotizaciones.filter(c => 
      c.historialPrecios.some(h => h.cambio !== "sin_cambio")
    ).length
  }

  return (
    <div className="space-y-6">
      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cotizaciones</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estadisticas.total}</div>
            <p className="text-xs text-muted-foreground">
              Cotizaciones en el sistema
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
              Valor total de cotizaciones activas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Estadísticas de Precios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Tipo A</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{estadisticas.clientesTipoA}</div>
            <p className="text-xs text-muted-foreground">
              Precios preferenciales
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Tipo B</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{estadisticas.clientesTipoB}</div>
            <p className="text-xs text-muted-foreground">
              Precios estándar
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Precio Promedio A</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              ${estadisticas.precioPromedioA.toFixed(0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Promedio por cotización
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cambios de Precios</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{estadisticas.cambiosPrecios}</div>
            <p className="text-xs text-muted-foreground">
              Cotizaciones con cambios
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de Cotizaciones */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Cotizaciones</CardTitle>
              <p className="text-sm text-muted-foreground">
                Gestiona todas las cotizaciones de paquetes turísticos
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
              <Button size="sm" className="bg-[#1605ac] hover:bg-[#1605ac]/90">
                <Plus className="w-4 h-4 mr-2" />
                Nueva Cotización
              </Button>
            </div>
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

            <Select value={filtroTipoCliente} onValueChange={setFiltroTipoCliente}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los tipos</SelectItem>
                <SelectItem value="A">Tipo A</SelectItem>
                <SelectItem value="B">Tipo B</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tabla */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Destino</TableHead>
                  <TableHead>Fechas</TableHead>
                  <TableHead>Personas</TableHead>
                  <TableHead>Precio Cliente A</TableHead>
                  <TableHead>Precio Cliente B</TableHead>
                  <TableHead>Precio Actual</TableHead>
                  <TableHead>Cambios</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Prioridad</TableHead>
                  <TableHead>Servicios</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cotizacionesFiltradas.map((cotizacion) => {
                  const cambioPrecio = detectarCambiosPrecios(cotizacion)
                  const precioActual = cotizacion.tipoCliente === "A" 
                    ? cotizacion.preciosClienteA.total 
                    : cotizacion.preciosClienteB.total
                   
                  return (
                    <TableRow key={cotizacion.id}>
                      <TableCell className="font-mono text-sm">
                        <div className="flex items-center gap-2">
                          {cotizacion.id}
                          {cambioPrecio && (
                            <Badge 
                              variant="destructive" 
                              className="text-xs px-1 py-0"
                              title={`Precio ${cambioPrecio.tipo === "subida" ? "subió" : "bajó"} ${cambioPrecio.porcentaje}%`}
                            >
                              {cambioPrecio.tipo === "subida" ? "↗" : "↘"}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{cotizacion.cliente}</div>
                          <div className="text-sm text-muted-foreground">{cotizacion.email}</div>
                          <div className="text-sm text-muted-foreground">{cotizacion.telefono}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={cotizacion.tipoCliente === "A" ? "default" : "secondary"}>
                          Tipo {cotizacion.tipoCliente}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          {cotizacion.destino}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>Inicio: {new Date(cotizacion.fechaInicio).toLocaleDateString('en-US')}</div>
                          <div>Fin: {new Date(cotizacion.fechaFin).toLocaleDateString('en-US')}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">{cotizacion.personas}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">${cotizacion.preciosClienteA.total.toLocaleString('en-US')}</div>
                          <div className="text-muted-foreground text-xs">
                            Hotel: ${cotizacion.preciosClienteA.hotel} | Vuelos: ${cotizacion.preciosClienteA.vuelos}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">${cotizacion.preciosClienteB.total.toLocaleString('en-US')}</div>
                          <div className="text-muted-foreground text-xs">
                            Hotel: ${cotizacion.preciosClienteB.hotel} | Vuelos: ${cotizacion.preciosClienteB.vuelos}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className={`font-medium ${cotizacion.tipoCliente === "A" ? "text-blue-600" : "text-purple-600"}`}>
                            ${precioActual.toLocaleString('en-US')}
                          </div>
                          <div className="text-muted-foreground text-xs">
                            Precio para Tipo {cotizacion.tipoCliente}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {cambioPrecio ? (
                          <div className="flex items-center gap-1">
                            {getIconoCambioPrecio(cambioPrecio.tipo)}
                            <div className={`text-xs ${getColorCambioPrecio(cambioPrecio.tipo)}`}>
                              {cambioPrecio.tipo === "subida" ? "+" : ""}{cambioPrecio.porcentaje}%
                            </div>
                          </div>
                        ) : (
                          <div className="text-xs text-muted-foreground">Sin cambios</div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={getEstadoColor(cotizacion.estado)}>
                          {cotizacion.estado.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPrioridadColor(cotizacion.prioridad)}>
                          {cotizacion.prioridad}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {cotizacion.servicios.map((servicio, index) => (
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
                            title="Ver detalles"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            title="Editar"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            title="Eliminar"
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>

          {/* Paginación */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Mostrando {cotizacionesFiltradas.length} de {cotizaciones.length} cotizaciones
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
    </div>
  )
}
