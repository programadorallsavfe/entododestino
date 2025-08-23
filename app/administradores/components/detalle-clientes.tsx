"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Package, 
  CheckCircle, 
  Clock, 
  XCircle, 
  TrendingUp, 
  TrendingDown,
  Star,
  FileText,
  CreditCard,
  Plane,
  Hotel,
  Car,
  Building,
  Eye,
  Download,
  Share2
} from "lucide-react"

// Interfaces para los datos del cliente
interface Cliente {
  id: string
  nombre: string
  email: string
  telefono: string
  dni: string
  tipoCliente: "A" | "B"
  fechaRegistro: string
  direccion: string
  ciudad: string
  pais: string
  preferencias: string[]
  notas: string
}

interface Cotizacion {
  id: string
  fecha: string
  destino: string
  personas: number
  presupuesto: number
  estado: "cotizacion" | "aprobada" | "rechazada" | "cancelada"
  precio: number
  servicios: string[]
  prioridad: "baja" | "media" | "alta" | "urgente"
  notas: string
}

interface Compra {
  id: string
  fechaCompra: string
  fechaViaje: string
  destino: string
  personas: number
  precioTotal: number
  estado: "pendiente" | "confirmada" | "completada" | "cancelada"
  servicios: string[]
  calificacion?: number
  comentarios?: string
  factura: string
}

interface DetalleClienteProps {
  cliente: Cliente
  cotizaciones: Cotizacion[]
  compras: Compra[]
  onClose: () => void
}

// Función para obtener icono de servicio
const getServicioIcono = (servicio: string) => {
  switch (servicio) {
    case "hotel": return <Hotel className="w-4 h-4" />
    case "vuelos": return <Plane className="w-4 h-4" />
    case "transporte": return <Car className="w-4 h-4" />
    case "guia": return <User className="w-4 h-4" />
    case "tours": return <MapPin className="w-4 h-4" />
    case "actividades": return <Star className="w-4 h-4" />
    default: return <Package className="w-4 h-4" />
  }
}

// Función para obtener color del estado
const getEstadoColor = (estado: string) => {
  switch (estado) {
    case "cotizacion": return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
    case "aprobada": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
    case "rechazada": return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
    case "cancelada": return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
    case "pendiente": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
    case "confirmada": return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
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

// Función para obtener estadísticas
const getEstadisticas = (cotizaciones: Cotizacion[], compras: Compra[]) => {
  const totalCotizaciones = cotizaciones.length
  const cotizacionesAprobadas = cotizaciones.filter(c => c.estado === "aprobada").length
  const cotizacionesRechazadas = cotizaciones.filter(c => c.estado === "rechazada").length
  const cotizacionesPendientes = cotizaciones.filter(c => c.estado === "cotizacion").length
  
  const totalCompras = compras.length
  const comprasCompletadas = compras.filter(c => c.estado === "completada").length
  const comprasPendientes = compras.filter(c => c.estado === "pendiente").length
  
  const valorTotalCotizaciones = cotizaciones.reduce((sum, c) => sum + c.precio, 0)
  const valorTotalCompras = compras.reduce((sum, c) => sum + c.precioTotal, 0)
  
  const tasaConversion = totalCotizaciones > 0 ? (cotizacionesAprobadas / totalCotizaciones * 100).toFixed(1) : "0"
  
  return {
    totalCotizaciones,
    cotizacionesAprobadas,
    cotizacionesRechazadas,
    cotizacionesPendientes,
    totalCompras,
    comprasCompletadas,
    comprasPendientes,
    valorTotalCotizaciones,
    valorTotalCompras,
    tasaConversion
  }
}

export default function DetalleCliente({ cliente, cotizaciones, compras, onClose }: DetalleClienteProps) {
  const [tabActivo, setTabActivo] = useState("general")
  const estadisticas = getEstadisticas(cotizaciones, compras)

  // Prevenir scroll del body cuando el modal esté abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  // Manejar tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay de fondo */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal personalizado sin límite de ancho */}
      <div className="relative w-full max-w-7xl max-h-[95vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header del Modal */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary to-primary/80 text-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{cliente.nombre}</h2>
              <p className="text-white/90">Cliente Tipo {cliente.tipoCliente} - {cliente.tipoCliente === "A" ? "Prioritario" : "Estándar"}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="bg-white/20 hover:bg-white/30 border-white/30 text-white">
              <Share2 className="w-4 h-4 mr-2" />
              Compartir
            </Button>
            <Button variant="outline" size="sm" className="bg-white/20 hover:bg-white/30 border-white/30 text-white">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Contenido del Modal */}
        <div className="p-6 overflow-y-auto max-h-[calc(95vh-120px)]">
          {/* Tabs de Navegación */}
          <Tabs value={tabActivo} onValueChange={setTabActivo} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="general">Información General</TabsTrigger>
              <TabsTrigger value="cotizaciones">
                Cotizaciones ({cotizaciones.length})
              </TabsTrigger>
              <TabsTrigger value="compras">
                Historial de Compras ({compras.length})
              </TabsTrigger>
              <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
            </TabsList>

            {/* Tab: Información General */}
            <TabsContent value="general" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Información Personal */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Información Personal
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Nombre Completo</label>
                        <p className="text-lg font-medium">{cliente.nombre}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">DNI</label>
                        <p className="text-lg">{cliente.dni}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Email</label>
                        <p className="text-lg flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          {cliente.email}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Teléfono</label>
                        <p className="text-lg flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          {cliente.telefono}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Información de Ubicación */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Ubicación
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Dirección</label>
                      <p className="text-lg">{cliente.direccion}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Ciudad</label>
                        <p className="text-lg">{cliente.ciudad}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">País</label>
                        <p className="text-lg">{cliente.pais}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Información del Cliente */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Información del Cliente
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Tipo de Cliente</label>
                        <Badge variant={cliente.tipoCliente === "A" ? "default" : "secondary"} className="mt-2">
                          Tipo {cliente.tipoCliente}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          {cliente.tipoCliente === "A" ? "Cliente Prioritario" : "Cliente Estándar"}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Fecha de Registro</label>
                        <p className="text-lg flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          {new Date(cliente.fechaRegistro).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Preferencias y Notas */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      Preferencias y Notas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Servicios Preferidos</label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {cliente.preferencias.map((preferencia, index) => (
                          <Badge key={index} variant="outline" className="flex items-center gap-1">
                            {getServicioIcono(preferencia)}
                            {preferencia}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {cliente.notas && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Notas Adicionales</label>
                        <p className="text-sm mt-2 p-3 bg-muted rounded-lg">{cliente.notas}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Tab: Cotizaciones */}
            <TabsContent value="cotizaciones" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Historial de Cotizaciones</h3>
                <Badge variant="outline" className="text-sm">
                  Total: {cotizaciones.length} cotizaciones
                </Badge>
              </div>

              {cotizaciones.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium text-muted-foreground">No hay cotizaciones registradas</p>
                    <p className="text-sm text-muted-foreground">Este cliente aún no ha recibido cotizaciones</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {cotizaciones.map((cotizacion) => (
                    <Card key={cotizacion.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{cotizacion.destino}</CardTitle>
                          <Badge className={getEstadoColor(cotizacion.estado)}>
                            {cotizacion.estado.charAt(0).toUpperCase() + cotizacion.estado.slice(1)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(cotizacion.fecha).toLocaleDateString('es-ES')}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {cotizacion.personas} personas
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Presupuesto:</span>
                          <span className="text-lg font-bold text-green-600">
                            ${cotizacion.presupuesto.toLocaleString('en-US')}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Precio Cotizado:</span>
                          <span className="text-lg font-bold text-primary">
                            ${cotizacion.precio.toLocaleString('en-US')}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge className={getPrioridadColor(cotizacion.prioridad)}>
                            {cotizacion.prioridad}
                          </Badge>
                          {cotizacion.estado === "aprobada" && (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Aprobada
                            </Badge>
                          )}
                        </div>

                                                 <div>
                           <span className="text-sm font-medium">Servicios:</span>
                           <div className="flex flex-wrap gap-2 mt-2">
                             {cotizacion.servicios.map((servicio, index) => (
                               <Badge key={index} variant="outline" className="flex items-center gap-1">
                                 {getServicioIcono(servicio)}
                                 {servicio}
                               </Badge>
                             ))}
                           </div>
                         </div>

                        {cotizacion.notas && (
                          <div>
                            <span className="text-sm font-medium">Notas:</span>
                            <p className="text-sm text-muted-foreground mt-1 p-2 bg-muted rounded">
                              {cotizacion.notas}
                            </p>
                          </div>
                        )}

                        <div className="flex gap-2 pt-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Detalles
                          </Button>
                          <Button variant="outline" size="sm">
                            <FileText className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Tab: Historial de Compras */}
            <TabsContent value="compras" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Historial de Compras</h3>
                <Badge variant="outline" className="text-sm">
                  Total: {compras.length} compras
                </Badge>
              </div>

              {compras.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <CreditCard className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium text-muted-foreground">No hay compras registradas</p>
                    <p className="text-sm text-muted-foreground">Este cliente aún no ha realizado compras</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {compras.map((compra) => (
                    <Card key={compra.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{compra.destino}</CardTitle>
                          <Badge className={getEstadoColor(compra.estado)}>
                            {compra.estado.charAt(0).toUpperCase() + compra.estado.slice(1)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Compra: {new Date(compra.fechaCompra).toLocaleDateString('es-ES')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Viaje: {new Date(compra.fechaViaje).toLocaleDateString('es-ES')}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Personas:</span>
                          <span className="text-lg font-medium">{compra.personas}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Precio Total:</span>
                          <span className="text-2xl font-bold text-primary">
                            ${compra.precioTotal.toLocaleString('en-US')}
                          </span>
                        </div>

                                                 <div>
                           <span className="text-sm font-medium">Servicios:</span>
                           <div className="flex flex-wrap gap-2 mt-2">
                             {compra.servicios.map((servicio, index) => (
                               <Badge key={index} variant="outline" className="flex items-center gap-1">
                                 {getServicioIcono(servicio)}
                                 {servicio}
                               </Badge>
                             ))}
                           </div>
                         </div>

                        {compra.calificacion && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Calificación:</span>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${
                                    i < compra.calificacion! 
                                      ? "text-yellow-500 fill-current" 
                                      : "text-gray-300"
                                  }`} 
                                />
                              ))}
                              <span className="text-sm text-muted-foreground ml-2">
                                ({compra.calificacion}/5)
                              </span>
                            </div>
                          </div>
                        )}

                        {compra.comentarios && (
                          <div>
                            <span className="text-sm font-medium">Comentarios:</span>
                            <p className="text-sm text-muted-foreground mt-1 p-2 bg-muted rounded">
                              {compra.comentarios}
                            </p>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2">
                          <span className="text-sm font-medium">Factura:</span>
                          <span className="text-sm font-mono bg-muted px-2 py-1 rounded">
                            {compra.factura}
                          </span>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Detalles
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Tab: Estadísticas */}
            <TabsContent value="estadisticas" className="space-y-6">
              <h3 className="text-xl font-semibold">Análisis y Estadísticas del Cliente</h3>
              
              {/* Resumen General */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Cotizaciones</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{estadisticas.totalCotizaciones}</div>
                    <p className="text-xs text-muted-foreground">
                      Solicitudes realizadas
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tasa de Conversión</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{estadisticas.tasaConversion}%</div>
                    <p className="text-xs text-muted-foreground">
                      Cotizaciones aprobadas
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Compras</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">{estadisticas.totalCompras}</div>
                    <p className="text-xs text-muted-foreground">
                      Transacciones completadas
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">
                      ${estadisticas.valorTotalCompras.toLocaleString('en-US')}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      En compras realizadas
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Detalle de Estados */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Estados de Cotizaciones */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Estados de Cotizaciones
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Aprobadas</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${(estadisticas.cotizacionesAprobadas / estadisticas.totalCotizaciones) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{estadisticas.cotizacionesAprobadas}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Pendientes</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-500 h-2 rounded-full" 
                            style={{ width: `${(estadisticas.cotizacionesPendientes / estadisticas.totalCotizaciones) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{estadisticas.cotizacionesPendientes}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Rechazadas</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-red-500 h-2 rounded-full" 
                            style={{ width: `${(estadisticas.cotizacionesRechazadas / estadisticas.totalCotizaciones) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{estadisticas.cotizacionesRechazadas}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Estados de Compras */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Estados de Compras
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Completadas</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full" 
                            style={{ width: `${estadisticas.totalCompras > 0 ? (estadisticas.comprasCompletadas / estadisticas.totalCompras) * 100 : 0}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{estadisticas.comprasCompletadas}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Pendientes</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${estadisticas.totalCompras > 0 ? (estadisticas.comprasPendientes / estadisticas.totalCompras) * 100 : 0}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{estadisticas.comprasPendientes}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Análisis de Valor */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Análisis de Valor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        ${estadisticas.valorTotalCotizaciones.toLocaleString('en-US')}
                      </div>
                      <p className="text-sm text-muted-foreground">Valor Total Cotizaciones</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        ${estadisticas.valorTotalCompras.toLocaleString('en-US')}
                      </div>
                      <p className="text-sm text-muted-foreground">Valor Total Compras</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {estadisticas.totalCotizaciones > 0 ? ((estadisticas.valorTotalCompras / estadisticas.valorTotalCotizaciones) * 100).toFixed(1) : 0}%
                      </div>
                      <p className="text-sm text-muted-foreground">Ratio de Conversión</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
