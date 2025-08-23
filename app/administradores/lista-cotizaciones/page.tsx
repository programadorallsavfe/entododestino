"use client"

import { useState, useEffect } from "react"
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
  X,
  ChevronLeft,
  ChevronRight,
  TrendingDown
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
  tipoCliente: "A" | "B" // Tipo de cliente A (prioritario) o B (estándar)
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
  // Precio del paquete (único para todos los clientes)
  precio: {
    hotel: number
    vuelos: number
    transporte: number
    guia: number
    tours: number
    actividades: number
    total: number
  }
  // Historial de precios para detectar cambios
  historialPrecios: {
    fecha: string
    precio: number
    cambio: "subida" | "bajada" | "sin_cambio"
  }[]
}

// Datos mock para las solicitudes
const solicitudesMock: SolicitudPaquete[] = [
  {
    id: "SOL-001",
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
    precio: { hotel: 1200, vuelos: 500, transporte: 300, guia: 150, tours: 0, actividades: 0, total: 2150 },
    historialPrecios: [
      { fecha: "2024-01-15", precio: 2150, cambio: "sin_cambio" },
      { fecha: "2024-01-20", precio: 2200, cambio: "subida" },
      { fecha: "2024-01-25", precio: 2180, cambio: "bajada" }
    ]
  },
  {
    id: "SOL-002",
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
    precio: { hotel: 1000, vuelos: 450, transporte: 250, guia: 120, tours: 200, actividades: 0, total: 2020 },
    historialPrecios: [
      { fecha: "2024-01-20", precio: 2020, cambio: "sin_cambio" },
      { fecha: "2024-01-22", precio: 1950, cambio: "bajada" }
    ]
  },
  {
    id: "SOL-003",
    cliente: "Ana Martínez",
    email: "ana.martinez@email.com",
    telefono: "+51 997 345 678",
    tipoCliente: "A",
    destino: "Lima, Perú",
    fechaInicio: "2024-05-01",
    fechaFin: "2024-05-08",
    personas: 6,
    presupuesto: 3200,
    estado: "aprobada",
    prioridad: "urgente",
    servicios: ["hotel", "vuelos", "transporte", "guía", "actividades"],
    fechaSolicitud: "2024-01-18",
    notas: "Grupo de amigos, intereses en gastronomía y cultura",
    precio: { hotel: 1500, vuelos: 600, transporte: 400, guia: 200, tours: 0, actividades: 300, total: 3000 },
    historialPrecios: [
      { fecha: "2024-01-18", precio: 3000, cambio: "sin_cambio" },
      { fecha: "2024-01-23", precio: 3100, cambio: "subida" }
    ]
  },
  {
    id: "SOL-004",
    cliente: "Luis Fernández",
    email: "luis.fernandez@email.com",
    telefono: "+51 996 456 789",
    tipoCliente: "B",
    destino: "Machu Picchu, Perú",
    fechaInicio: "2024-06-20",
    fechaFin: "2024-06-25",
    personas: 3,
    presupuesto: 2100,
    estado: "pendiente",
    prioridad: "baja",
    servicios: ["hotel", "vuelos", "guía"],
    fechaSolicitud: "2024-01-22",
    notas: "Viaje de aventura, preferencia por alojamientos rústicos",
    precio: { hotel: 1200, vuelos: 520, transporte: 320, guia: 150, tours: 0, actividades: 0, total: 2090 },
    historialPrecios: [
      { fecha: "2024-01-22", precio: 2090, cambio: "sin_cambio" },
      { fecha: "2024-01-24", precio: 2040, cambio: "bajada" }
    ]
  },
  {
    id: "SOL-005",
    cliente: "Sofia Torres",
    email: "sofia.torres@email.com",
    telefono: "+51 995 567 890",
    tipoCliente: "A",
    destino: "Trujillo, Perú",
    fechaInicio: "2024-07-10",
    fechaFin: "2024-07-17",
    personas: 5,
    presupuesto: 2800,
    estado: "en_revision",
    prioridad: "media",
    servicios: ["hotel", "vuelos", "transporte", "tours"],
    fechaSolicitud: "2024-01-25",
    notas: "Familia numerosa, interés en arqueología y playas",
    precio: { hotel: 1300, vuelos: 550, transporte: 350, guia: 180, tours: 250, actividades: 0, total: 2630 },
    historialPrecios: [
      { fecha: "2024-01-25", precio: 2630, cambio: "sin_cambio" }
    ]
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
    tipoCliente: solicitud.tipoCliente,
    destino: solicitud.destino,
    fechaInicio: solicitud.fechaInicio,
    fechaFin: solicitud.fechaFin,
    personas: solicitud.personas,
    presupuesto: solicitud.presupuesto,
    estado: solicitud.estado,
    prioridad: solicitud.prioridad,
    servicios: [...solicitud.servicios],
    notas: solicitud.notas,
    precio: solicitud.precio,
    historialPrecios: [...solicitud.historialPrecios]
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
          <Label htmlFor="tipoCliente">Tipo de Cliente</Label>
          <Select value={datos.tipoCliente} onValueChange={(value) => setDatos(prev => ({ ...prev, tipoCliente: value as SolicitudPaquete["tipoCliente"] }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A">Tipo A</SelectItem>
              <SelectItem value="B">Tipo B</SelectItem>
            </SelectContent>
          </Select>
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
            <Label className="text-sm font-medium text-muted-foreground">Tipo de Cliente</Label>
            <p className="text-lg">{solicitud.tipoCliente}</p>
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

      {/* Precio del Paquete */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Precio del Paquete
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant={solicitud.tipoCliente === "A" ? "default" : "secondary"}>
                Cliente Tipo {solicitud.tipoCliente}
              </Badge>
              <span className="text-sm font-medium">
                {solicitud.tipoCliente === "A" ? "Cliente Prioritario" : "Cliente Estándar"}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Hotel:</span>
                <span className="font-medium">${solicitud.precio.hotel}</span>
              </div>
              <div className="flex justify-between">
                <span>Vuelos:</span>
                <span className="font-medium">${solicitud.precio.vuelos}</span>
              </div>
              <div className="flex justify-between">
                <span>Transporte:</span>
                <span className="font-medium">${solicitud.precio.transporte}</span>
              </div>
              <div className="flex justify-between">
                <span>Guía:</span>
                <span className="font-medium">${solicitud.precio.guia}</span>
              </div>
              {solicitud.precio.tours > 0 && (
                <div className="flex justify-between">
                  <span>Tours:</span>
                  <span className="font-medium">${solicitud.precio.tours}</span>
                </div>
              )}
              {solicitud.precio.actividades > 0 && (
                <div className="flex justify-between">
                  <span>Actividades:</span>
                  <span className="font-medium">${solicitud.precio.actividades}</span>
                </div>
              )}
              <div className="border-t pt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-primary">${solicitud.precio.total}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Historial de Precios - Carrusel */}
      {solicitud.historialPrecios.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Historial de Precios de fechas cercanas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PreciosCarousel historialPrecios={solicitud.historialPrecios} />
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

// Función para detectar cambios de precios
const detectarCambiosPrecios = (solicitud: SolicitudPaquete) => {
  if (solicitud.historialPrecios.length < 2) return null
  
  const ultimoPrecio = solicitud.historialPrecios[solicitud.historialPrecios.length - 1]
  const penultimoPrecio = solicitud.historialPrecios[solicitud.historialPrecios.length - 2]
  
  if (ultimoPrecio.cambio === "sin_cambio") return null
  
  const precioActual = ultimoPrecio.precio
  const precioAnterior = penultimoPrecio.precio
  
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

// Componente Carrusel de Precios
const PreciosCarousel = ({ historialPrecios }: { historialPrecios: SolicitudPaquete["historialPrecios"] }) => {
  const [indiceActivo, setIndiceActivo] = useState(0)
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>(historialPrecios[0]?.fecha || "")
  
  const siguiente = () => {
    setIndiceActivo((prev) => (prev + 1) % historialPrecios.length)
  }
  
  const anterior = () => {
    setIndiceActivo((prev) => (prev - 1 + historialPrecios.length) % historialPrecios.length)
  }
  
  const irAIndice = (indice: number) => {
    setIndiceActivo(indice)
  }
  
  const seleccionarFecha = (fecha: string) => {
    setFechaSeleccionada(fecha)
    // Aquí podrías agregar lógica adicional cuando se selecciona una fecha
    console.log(`Fecha seleccionada: ${fecha}`)
  }
  
  // Navegación con teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        anterior()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        siguiente()
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])
  
  const historialActual = historialPrecios[indiceActivo]
  const historialAnterior = indiceActivo > 0 ? historialPrecios[indiceActivo - 1] : null
  
  // Calcular cambio respecto al historial anterior
  const calcularCambio = () => {
    if (!historialAnterior) return null
    
    const cambio = historialActual.precio - historialAnterior.precio
    const porcentaje = ((cambio / historialAnterior.precio) * 100).toFixed(1)
    
    return {
      cambio: { cambio, porcentaje, tipo: cambio > 0 ? "subida" : cambio < 0 ? "bajada" : "sin_cambio" }
    }
  }
  
  const cambio = calcularCambio()
  
  return (
    <div className="space-y-6">
      {/* Header del Carrusel con Imagen de Fondo */}
      <div className="relative h-48 rounded-2xl overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/assets/banner.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        
        {/* Contenido del Header */}
        <div className="relative h-full flex items-center justify-between p-8">
          <div className="text-white">
            <h3 className="text-3xl font-bold mb-2">Historial de Precios</h3>
            <p className="text-lg opacity-90">Compara precios del mismo paquete en diferentes fechas</p>
            {fechaSeleccionada && (
              <div className="mt-2 px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
                <span className="text-sm">Fecha seleccionada: {new Date(fechaSeleccionada).toLocaleDateString('es-ES')}</span>
              </div>
            )}
          </div>
          
          {/* Indicadores de Navegación */}
          <div className="flex items-center gap-4">
            <button
              onClick={anterior}
              disabled={historialPrecios.length <= 1}
              className="p-3 rounded-full bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all backdrop-blur-sm border border-white/30"
              title="Anterior"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            
            <div className="flex gap-2">
              {historialPrecios.map((_, index) => (
                <button
                  key={index}
                  onClick={() => irAIndice(index)}
                  className={`w-4 h-4 rounded-full transition-all ${
                    index === indiceActivo 
                      ? "bg-white scale-125 shadow-lg" 
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                  title={`Ver precios del ${new Date(historialPrecios[index].fecha).toLocaleDateString('es-ES')}`}
                />
              ))}
            </div>
            
            <button
              onClick={siguiente}
              disabled={historialPrecios.length <= 1}
              className="p-3 rounded-full bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all backdrop-blur-sm border border-white/30"
              title="Siguiente"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Tarjeta Principal de Precios */}
      <div className="relative bg-card rounded-2xl p-8 border border-border shadow-lg">
        {/* Fecha y Posición */}
        <div className="text-center mb-8">
          <div className="text-4xl font-bold text-card-foreground mb-2">
            {new Date(historialActual.fecha).toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full border border-border">
            <span className="text-sm font-medium text-muted-foreground">
              {indiceActivo + 1} de {historialPrecios.length} fechas
            </span>
          </div>
        </div>
        
        {/* Indicadores de Cambio de Precios */}
        {cambio && cambio.cambio.tipo !== "sin_cambio" && (
          <div className="absolute top-6 right-6">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${
              cambio.cambio.tipo === "subida" 
                ? "bg-destructive text-destructive-foreground" 
                : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
            }`}>
              {cambio.cambio.tipo === "subida" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>Precio: {cambio.cambio.tipo === "subida" ? "Subió" : "Bajó"} {cambio.cambio.porcentaje}%</span>
            </div>
          </div>
        )}
        
        {/* Precios del Paquete */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-2xl p-6 border-2 border-border shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <div className="text-lg font-bold text-card-foreground">Precios del Paquete</div>
                <div className="text-sm text-muted-foreground">Fecha: {new Date(historialActual.fecha).toLocaleDateString('es-ES')}</div>
              </div>
            </div>
            
            <div className="space-y-4">
              {/* Precio del Paquete */}
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="font-bold text-lg text-primary">${historialActual.precio}</span>
              </div>
              
              {/* Cambio de Precios */}
              {cambio && cambio.cambio.tipo !== "sin_cambio" && (
                <div className="mt-4 p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <h4 className="font-semibold text-accent-foreground mb-2">Cambio respecto a la fecha anterior:</h4>
                  <div className={`flex items-center justify-between text-sm ${
                    cambio.cambio.tipo === "subida" 
                      ? "text-destructive" 
                      : "text-green-600 dark:text-green-400"
                  }`}>
                    <span className="flex items-center gap-1">
                      {cambio.cambio.tipo === "subida" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {cambio.cambio.tipo === "subida" ? "+" : ""}${Math.abs(cambio.cambio.cambio)} ({cambio.cambio.porcentaje}%)
                    </span>
                  </div>
                </div>
              )}
              
              {/* Botón Seleccionar */}
              <button
                onClick={() => seleccionarFecha(historialActual.fecha)}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
                  fechaSeleccionada === historialActual.fecha
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                }`}
              >
                {fechaSeleccionada === historialActual.fecha ? "✓ Fecha Seleccionada" : "Seleccionar Esta Fecha"}
              </button>
            </div>
          </div>
        </div>
        
        {/* Información de Comparación */}
        {cambio && (
          <div className="mt-8 pt-6 border-t border-border">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Comparado con {new Date(historialAnterior!.fecha).toLocaleDateString('es-ES')}
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Instrucciones de Navegación */}
      <div className="text-center p-4 bg-muted rounded-xl border border-border">
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Usa las flechas para navegar o haz clic en los puntos indicadores</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
      
      {/* Resumen de Cambios de Precios */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h4 className="text-xl font-bold text-card-foreground mb-6 text-center">Resumen de Cambios de Precios</h4>
        <div className="space-y-3">
          {historialPrecios.slice(1).map((historial, index) => {
            const historialPrevio = historialPrecios[index]
            const cambio = historial.precio - historialPrevio.precio
            const porcentaje = ((cambio / historialPrevio.precio) * 100).toFixed(1)
            
            return (
              <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-xl border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-card-foreground font-medium">
                    {new Date(historialPrevio.fecha).toLocaleDateString('es-ES')} → {new Date(historial.fecha).toLocaleDateString('es-ES')}
                  </span>
                </div>
                {cambio !== 0 && (
                  <div className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                    cambio > 0 
                      ? "bg-destructive/10 text-destructive border border-destructive/20" 
                      : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-700"
                  }`}>
                    <div className="flex items-center gap-2">
                      {cambio > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span>Precio: {cambio > 0 ? "Subió" : "Bajó"} {porcentaje}%</span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Componente principal
export default function SolicitudesPaquetesPage() {
  const router = useRouter()
  const [solicitudes, setSolicitudes] = useState<SolicitudPaquete[]>(solicitudesMock)
  const [filtroEstado, setFiltroEstado] = useState<string>("todos")
  const [filtroPrioridad, setFiltroPrioridad] = useState<string>("todos")
  const [filtroTipoCliente, setFiltroTipoCliente] = useState<string>("todos")
  const [busqueda, setBusqueda] = useState<string>("")
  const [tabActivo, setTabActivo] = useState<string>("todas")
  const [editarSolicitud, setEditarSolicitud] = useState<SolicitudPaquete | null>(null)
  const [verDetalle, setVerDetalle] = useState<SolicitudPaquete | null>(null)
  const [confirmarEliminar, setConfirmarEliminar] = useState<string | null>(null)

  // Filtrar solicitudes
  const solicitudesFiltradas = solicitudes.filter(solicitud => {
    const cumpleEstado = filtroEstado === "todos" || solicitud.estado === filtroEstado
    const cumplePrioridad = filtroPrioridad === "todos" || solicitud.prioridad === filtroPrioridad
    const cumpleTipoCliente = filtroTipoCliente === "todos" || solicitud.tipoCliente === filtroTipoCliente
    const cumpleBusqueda = solicitud.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
                           solicitud.destino.toLowerCase().includes(busqueda.toLowerCase()) ||
                           solicitud.id.toLowerCase().includes(busqueda.toLowerCase())
    
    return cumpleEstado && cumplePrioridad && cumpleTipoCliente && cumpleBusqueda
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
      .reduce((sum, s) => sum + s.presupuesto, 0),
    // Nuevas estadísticas de precios
    clientesTipoA: solicitudes.filter(s => s.tipoCliente === "A").length,
    clientesTipoB: solicitudes.filter(s => s.tipoCliente === "B").length,
    precioPromedio: solicitudes
      .reduce((sum, s) => sum + s.precio.total, 0) / 
      Math.max(solicitudes.length, 1),
    cambiosPrecios: solicitudes.filter(s => 
      s.historialPrecios.some(h => h.cambio !== "sin_cambio")
    ).length
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
    setVerDetalleCliente(solicitud)
  }

  // Función para eliminar solicitud
  const handleEliminar = (id: string) => {
    setSolicitudes(prev => prev.filter(s => s.id !== id))
    setConfirmarEliminar(null)
  }

  // Manejar tecla Escape para cerrar modales
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setVerDetalle(null)
        setEditarSolicitud(null)
        setConfirmarEliminar(null)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  // Prevenir scroll del body cuando los modales estén abiertos
  useEffect(() => {
    if (verDetalle || editarSolicitud || confirmarEliminar) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [verDetalle, editarSolicitud, confirmarEliminar])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="text-center lg:text-left mb-6 lg:mb-0">
              <h1 className="text-4xl font-bold mb-4">Solicitudes de Paquetes</h1>
              <p className="text-xl text-primary-foreground/90">Gestiona las solicitudes de paquetes turísticos de los clientes</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" size="sm" className="bg-white hover:bg-gray-100 text-primary border-0 px-6 py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                <Download className="w-5 h-5 mr-2" />
                Exportar
              </Button>
              <Button 
                size="sm" 
                className="bg-white hover:bg-gray-100 text-primary border-0 px-6 py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={() => router.push('/administradores/crear-cotizacion')}
              >
                <Plus className="w-5 h-5 mr-2" />
                Agregar Cotizaciones
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 py-8">
        {/* Header del contenido */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Panel de Control</h2>
              <p className="text-muted-foreground">
                Administra y monitorea todas las solicitudes del sistema
              </p>
            </div>
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
            <CardTitle className="text-sm font-medium">Precio Promedio</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              ${estadisticas.precioPromedio.toFixed(0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Promedio por solicitud
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
              Solicitudes con cambios
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

          {/* Tabla de Solicitudes */}
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
                  <TableHead>Precio del Paquete</TableHead>
                  <TableHead>Cambios</TableHead>
                  <TableHead>Cambios</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Prioridad</TableHead>
                  <TableHead>Servicios</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {solicitudesFiltradas.map((solicitud) => {
                  const cambioPrecio = detectarCambiosPrecios(solicitud)
                  
                  return (
                    <TableRow key={solicitud.id}>
                      <TableCell className="font-mono text-sm">
                        <div className="flex items-center gap-2">
                          {solicitud.id}
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
                          <div className="font-medium">{solicitud.cliente}</div>
                          <div className="text-sm text-muted-foreground">{solicitud.email}</div>
                          <div className="text-sm text-muted-foreground">{solicitud.telefono}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={solicitud.tipoCliente === "A" ? "default" : "secondary"}>
                          Tipo {solicitud.tipoCliente}
                        </Badge>
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
                        <div className="text-sm">
                          <div className="font-medium">${solicitud.precio.total.toLocaleString('en-US')}</div>
                          <div className="text-muted-foreground text-xs">
                            Hotel: ${solicitud.precio.hotel} | Vuelos: ${solicitud.precio.vuelos}
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
                  )
                })}
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
      </div>

      {/* Modal de Edición */}
      {editarSolicitud && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay de fondo */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setEditarSolicitud(null)}
          />
          
          {/* Modal */}
          <div className="relative w-full max-w-3xl max-h-[90vh] mx-4 bg-white dark:bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
            {/* Header del Modal */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Editar Solicitud - {editarSolicitud.id}
              </h2>
              <button
                onClick={() => setEditarSolicitud(null)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Contenido del Modal */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <EditarSolicitudForm 
                solicitud={editarSolicitud}
                onSave={handleGuardarEdicion}
                onCancel={() => setEditarSolicitud(null)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalle */}
      {verDetalle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay de fondo */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setVerDetalle(null)}
          />
          
          {/* Modal */}
          <div className="relative w-full max-w-4xl max-h-[90vh] mx-4 bg-white dark:bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
            {/* Header del Modal */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Detalle de Solicitud - {verDetalle.id}
              </h2>
              <button
                onClick={() => setVerDetalle(null)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Contenido del Modal */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <DetalleSolicitud solicitud={verDetalle} />
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación de Eliminación */}
      {confirmarEliminar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay de fondo */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setConfirmarEliminar(null)}
          />
          
          {/* Modal */}
          <div className="relative w-full max-w-md mx-4 bg-white dark:bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
            {/* Header del Modal */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Confirmar Eliminación
              </h2>
              <button
                onClick={() => setConfirmarEliminar(null)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Contenido del Modal */}
            <div className="p-6 space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                ¿Estás seguro de que quieres eliminar la solicitud <strong className="text-gray-900 dark:text-white">{confirmarEliminar}</strong>? 
                Esta acción no se puede deshacer.
              </p>
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setConfirmarEliminar(null)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleEliminar(confirmarEliminar!)}
                  className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
