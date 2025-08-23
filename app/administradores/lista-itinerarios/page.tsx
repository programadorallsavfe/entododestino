"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Plus, 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Eye, 
  Edit, 
  Trash2,
  Clock,
  Tag,
  Building,
  Plane,
  Car,
  Utensils,
  Ticket,
  Mountain,
  Camera,
  Heart,
  X,
  Save,
  Image as ImageIcon
} from "lucide-react"

// Tipos de datos
interface Itinerario {
  id: string
  nombre: string
  destino: string
  duracion: number
  personas: number
  precio: number
  precioDescuento?: number
  categoria: string
  tipo: 'tour' | 'paquete'
  servicios: string[]
  idiomas: string[]
  estado: 'activo' | 'inactivo' | 'borrador'
  fechaCreacion: string
  calificacion: number
  reservas: number
  imagen: string
  descripcion: string
}

// Datos de ejemplo basados en la información proporcionada
const itinerariosEjemplo: Itinerario[] = [
  {
    id: "IT001",
    nombre: "Arequipa Aventurero",
    destino: "Arequipa",
    duracion: 5,
    personas: 2,
    precio: 1048.75,
    precioDescuento: 888.25,
    categoria: "Turismo de Aventura",
    tipo: "paquete",
    servicios: ["Hoteles", "Tours", "Visitas guiadas"],
    idiomas: ["Español"],
    estado: "activo",
    fechaCreacion: "2024-01-15",
    calificacion: 4.8,
    reservas: 12,
    imagen: "/assets/banner.jpg",
    descripcion: "Disfruta de 5 días sumergido entre las maravillas arquitectónicas, culturas gastronómica y los impresionantes sitios naturales..."
  },
  {
    id: "IT002",
    nombre: "Cusco Amanecer",
    destino: "Cusco",
    duracion: 4,
    personas: 2,
    precio: 1789.30,
    precioDescuento: 1692.46,
    categoria: "Turismo Cultural",
    tipo: "paquete",
    servicios: ["Hoteles", "Tours", "Visitas guiadas"],
    idiomas: ["Español"],
    estado: "activo",
    fechaCreacion: "2024-01-10",
    calificacion: 4.9,
    reservas: 18,
    imagen: "/assets/banner.jpg",
    descripcion: "Descubre los lugares turísticos más representativos y la ciudad cosmopolita más importante de Perú, la ciudad del Cusco."
  },
  {
    id: "IT003",
    nombre: "Chachapoyas Extremo",
    destino: "Chachapoyas",
    duracion: 6,
    personas: 2,
    precio: 988.75,
    precioDescuento: 808.45,
    categoria: "Turismo de Aventura",
    tipo: "paquete",
    servicios: ["Hoteles", "Tours", "Visitas guiadas"],
    idiomas: ["Español", "Inglés"],
    estado: "activo",
    fechaCreacion: "2024-01-20",
    calificacion: 4.7,
    reservas: 8,
    imagen: "/assets/banner.jpg",
    descripcion: "Si dispones de más días, este es el mejor programa siendo el más completo y aventurero para visitar Chachapoyas."
  }
]

const categorias = [
  "Alimentación",
  "Boletos de Ingreso",
  "Ecoturismo",
  "Gastronomía",
  "Traslados",
  "Turismo Cultural",
  "Turismo de Aventura",
  "Turismo de Naturaleza",
  "Turismo Experimental",
  "Turismo Místico",
  "Turismo Rural"
]

const duraciones = [2, 3, 4, 5, 6, 7, 9, 10]
const destinos = ["Arequipa", "Cusco", "Lima", "Ayacucho", "Cajamarca", "Chachapoyas", "Puno", "Trujillo"]
const servicios = ["Hoteles", "Tours", "Visitas guiadas", "Traslados", "Alimentación", "Boletos de Ingreso", "Ecoturismo"]
const idiomas = ["Español", "Inglés", "Portugués", "Francés", "Alemán"]

// Función para obtener el icono del servicio
const getServicioIcon = (servicio: string) => {
  const iconMap: { [key: string]: any } = {
    "Hoteles": Building,
    "Tours": Camera,
    "Visitas guiadas": Eye,
    "Traslados": Car,
    "Alimentación": Utensils,
    "Boletos de Ingreso": Ticket,
    "Ecoturismo": Mountain
  }
  const Icon = iconMap[servicio] || Tag
  return <Icon className="w-4 h-4" />
}

// Componente Modal para Ver Detalles del Itinerario
const VerDetalleItinerarioModal = ({ 
  isOpen, 
  onClose, 
  itinerario 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  itinerario: Itinerario | null 
}) => {
  if (!isOpen || !itinerario) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl shadow-2xl border border-border max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground p-6 rounded-t-xl flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{itinerario.nombre}</h2>
              <p className="text-primary-foreground/90 mt-1">Detalles completos del itinerario turístico</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Imagen principal */}
            <div className="lg:col-span-1">
              <div className="relative w-full h-64 rounded-lg overflow-hidden border border-border shadow-lg">
                <img
                  src={itinerario.imagen}
                  alt={itinerario.nombre}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-purple-100 text-purple-800 border-0">
                    {itinerario.tipo}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge className="bg-green-100 text-green-800 border-0">
                    {itinerario.estado}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Información principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Información básica */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2">
                  Información Básica
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Destino:</span>
                    <span className="font-medium">{itinerario.destino}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Duración:</span>
                    <span className="font-medium">{itinerario.duracion} días</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Personas:</span>
                    <span className="font-medium">{itinerario.personas}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Tag className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Categoría:</span>
                    <span className="font-medium">{itinerario.categoria}</span>
                  </div>
                </div>
              </div>

              {/* Precios */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2">
                  Precios
                </h3>
                
                <div className="bg-muted/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Precio Regular</p>
                      <p className="text-2xl font-bold text-foreground">S/ {itinerario.precio.toFixed(2)}</p>
                    </div>
                    {itinerario.precioDescuento && (
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Precio con Descuento</p>
                        <p className="text-2xl font-bold text-primary">S/ {itinerario.precioDescuento.toFixed(2)}</p>
                        <p className="text-sm text-green-600">
                          Ahorro: S/ {(itinerario.precio - itinerario.precioDescuento).toFixed(2)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Servicios */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2">
                  Servicios Incluidos
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  {itinerario.servicios.map((servicio, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                      {getServicioIcon(servicio)}
                      <span>{servicio}</span>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Idiomas */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2">
                  Idiomas Disponibles
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  {itinerario.idiomas.map((idioma, index) => (
                    <Badge key={index} variant="outline">
                      {idioma}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Descripción */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2">
                  Descripción
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {itinerario.descripcion}
                </p>
              </div>

              {/* Estadísticas */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2">
                  Estadísticas
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-muted/20 rounded-lg">
                    <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">{itinerario.calificacion}</p>
                    <p className="text-xs text-muted-foreground">Calificación</p>
                  </div>
                  <div className="text-center p-3 bg-muted/20 rounded-lg">
                    <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">{itinerario.reservas}</p>
                    <p className="text-xs text-muted-foreground">Reservas</p>
                  </div>
                  <div className="text-center p-3 bg-muted/20 rounded-lg">
                    <Clock className="w-6 h-6 text-green-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">{itinerario.duracion}</p>
                    <p className="text-xs text-muted-foreground">Días</p>
                  </div>
                  <div className="text-center p-3 bg-muted/20 rounded-lg">
                    <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">{itinerario.personas}</p>
                    <p className="text-xs text-muted-foreground">Personas</p>
                  </div>
                </div>
              </div>

              {/* Información adicional */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2">
                  Información Adicional
                </h3>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">ID:</span>
                    <span className="ml-2 font-medium">{itinerario.id}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Fecha de Creación:</span>
                    <span className="ml-2 font-medium">
                      {new Date(itinerario.fechaCreacion).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Estado:</span>
                    <span className="ml-2 font-medium capitalize">{itinerario.estado}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Tipo:</span>
                    <span className="ml-2 font-medium capitalize">{itinerario.tipo}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border bg-muted/20 p-6 rounded-b-xl flex-shrink-0">
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente Modal para Editar Itinerario
const EditarItinerarioModal = ({ 
  isOpen, 
  onClose, 
  itinerario,
  onSave
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  itinerario: Itinerario | null,
  onSave: (itinerario: Itinerario) => void
}) => {
  const [formData, setFormData] = useState<Itinerario | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadError, setUploadError] = useState<string>("")
  const [uploadSuccess, setUploadSuccess] = useState<string>("")

  useEffect(() => {
    if (itinerario) {
      setFormData({ ...itinerario })
    }
  }, [itinerario])

  const handleInputChange = (field: string, value: any) => {
    if (formData) {
      setFormData(prev => ({ ...prev!, [field]: value }))
    }
  }

  const handleServicioToggle = (servicio: string) => {
    if (formData) {
      setFormData(prev => ({
        ...prev!,
        servicios: prev!.servicios.includes(servicio)
          ? prev!.servicios.filter(s => s !== servicio)
          : [...prev!.servicios, servicio]
      }))
    }
  }

  const handleIdiomaToggle = (idioma: string) => {
    if (formData) {
      setFormData(prev => ({
        ...prev!,
        idiomas: prev!.idiomas.includes(idioma)
          ? prev!.idiomas.filter(i => i !== idioma)
          : [...prev!.idiomas, idioma]
      }))
    }
  }

  const handleFileUpload = (file: File) => {
    setUploadError("")
    setUploadSuccess("")
    
    if (!file.type.startsWith('image/')) {
      setUploadError("Solo se permiten archivos de imagen (JPG, PNG, GIF, WebP)")
      return
    }
    
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      setUploadError("El archivo es demasiado grande. Máximo 10MB permitido.")
      return
    }
    
    const img = new Image()
    img.onload = () => {
      if (img.width < 400 || img.height < 300) {
        setUploadError("La imagen es muy pequeña. Se recomienda mínimo 1200x800 píxeles.")
        return
      }
      
      const reader = new FileReader()
      reader.onload = (e) => {
        handleInputChange('imagen', e.target?.result as string)
        setUploadSuccess(`Imagen "${file.name}" actualizada correctamente`)
        setTimeout(() => setUploadSuccess(""), 3000)
      }
      reader.readAsDataURL(file)
    }
    
    img.onerror = () => {
      setUploadError("No se pudo procesar la imagen. Verifica que el archivo sea válido.")
    }
    
    img.src = URL.createObjectURL(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData) {
      onSave(formData)
      onClose()
    }
  }

  if (!isOpen || !itinerario || !formData) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl shadow-2xl border border-border max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground p-6 rounded-t-xl flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Editar Itinerario</h2>
              <p className="text-primary-foreground/90 mt-1">Modifica la información del itinerario: {itinerario.nombre}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Información Básica */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                Información Básica
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="edit-nombre" className="text-sm font-medium text-foreground">
                      Nombre del Itinerario *
                    </Label>
                    <Input
                      id="edit-nombre"
                      value={formData.nombre}
                      onChange={(e) => handleInputChange('nombre', e.target.value)}
                      placeholder="Ej: Arequipa Aventurero"
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="edit-destino" className="text-sm font-medium text-foreground">
                      Destino *
                    </Label>
                    <Select value={formData.destino} onValueChange={(value) => handleInputChange('destino', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un destino" />
                      </SelectTrigger>
                      <SelectContent>
                        {destinos.map((destino) => (
                          <SelectItem key={destino} value={destino}>
                            {destino}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="edit-categoria" className="text-sm font-medium text-foreground">
                      Categoría *
                    </Label>
                    <Select value={formData.categoria} onValueChange={(value) => handleInputChange('categoria', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categorias.map((categoria) => (
                          <SelectItem key={categoria} value={categoria}>
                            {categoria}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="edit-tipo" className="text-sm font-medium text-foreground">
                      Tipo *
                    </Label>
                    <Select value={formData.tipo} onValueChange={(value) => handleInputChange('tipo', value as 'tour' | 'paquete')}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tour">Tour</SelectItem>
                        <SelectItem value="paquete">Paquete</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="edit-duracion" className="text-sm font-medium text-foreground">
                      Duración (días) *
                    </Label>
                    <Select value={formData.duracion.toString()} onValueChange={(value) => handleInputChange('duracion', parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {duraciones.map((duracion) => (
                          <SelectItem key={duracion} value={duracion.toString()}>
                            {duracion} Días
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="edit-personas" className="text-sm font-medium text-foreground">
                      Número de Personas *
                    </Label>
                    <Input
                      id="edit-personas"
                      type="number"
                      min="1"
                      max="20"
                      value={formData.personas}
                      onChange={(e) => handleInputChange('personas', parseInt(e.target.value))}
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="edit-precio" className="text-sm font-medium text-foreground">
                      Precio Regular (S/) *
                    </Label>
                    <Input
                      id="edit-precio"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.precio}
                      onChange={(e) => handleInputChange('precio', parseFloat(e.target.value))}
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="edit-precioDescuento" className="text-sm font-medium text-foreground">
                      Precio con Descuento (S/)
                    </Label>
                    <Input
                      id="edit-precioDescuento"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.precioDescuento || ''}
                      onChange={(e) => handleInputChange('precioDescuento', e.target.value ? parseFloat(e.target.value) : undefined)}
                      className="mt-1"
                      placeholder="Opcional"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Servicios */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                Servicios Incluidos
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {servicios.map((servicio) => (
                  <div key={servicio} className="flex items-center space-x-2">
                    <Checkbox
                      id={`edit-${servicio}`}
                      checked={formData.servicios.includes(servicio)}
                      onCheckedChange={() => handleServicioToggle(servicio)}
                    />
                    <Label htmlFor={`edit-${servicio}`} className="text-sm text-muted-foreground cursor-pointer">
                      {servicio}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Idiomas */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                Idiomas Disponibles
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {idiomas.map((idioma) => (
                  <div key={idioma} className="flex items-center space-x-2">
                    <Checkbox
                      id={`edit-${idioma}`}
                      checked={formData.idiomas.includes(idioma)}
                      onCheckedChange={() => handleIdiomaToggle(idioma)}
                    />
                    <Label htmlFor={`edit-${idioma}`} className="text-sm text-muted-foreground cursor-pointer">
                      {idioma}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Estado */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                Estado del Itinerario
              </h3>
              <div>
                <Label htmlFor="edit-estado" className="text-sm font-medium text-foreground">
                  Estado *
                </Label>
                <Select value={formData.estado} onValueChange={(value) => handleInputChange('estado', value as 'activo' | 'inactivo' | 'borrador')}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="borrador">Borrador</SelectItem>
                    <SelectItem value="activo">Activo</SelectItem>
                    <SelectItem value="inactivo">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Descripción */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                Descripción
              </h3>
              <div>
                <Label htmlFor="edit-descripcion" className="text-sm font-medium text-foreground">
                  Descripción del Itinerario *
                </Label>
                <Textarea
                  id="edit-descripcion"
                  value={formData.descripcion}
                  onChange={(e) => handleInputChange('descripcion', e.target.value)}
                  placeholder="Describe los detalles del itinerario, atracciones principales, experiencias incluidas..."
                  className="mt-1 min-h-[100px]"
                  required
                />
              </div>
            </div>

            {/* Imagen */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                Imagen del Itinerario
              </h3>
              <div className="space-y-3">
                {/* Upload de archivo */}
                <div className="relative">
                  <input
                    type="file"
                    id="edit-imagen"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        handleFileUpload(file)
                      }
                    }}
                    className="hidden"
                  />
                  
                  <label
                    htmlFor="edit-imagen"
                    className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 ${
                      isDragOver 
                        ? 'border-primary bg-primary/5 scale-105 shadow-lg' 
                        : 'border-border bg-muted/20 hover:bg-muted/40'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <ImageIcon className={`w-8 h-8 mb-2 transition-colors ${
                        isDragOver ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                      <p className={`mb-2 text-sm transition-colors ${
                        isDragOver ? 'text-primary font-semibold' : 'text-muted-foreground'
                      }`}>
                        {isDragOver ? (
                          <span className="font-semibold">¡Suelta la imagen aquí!</span>
                        ) : (
                          <span className="font-semibold">Haz clic para subir</span>
                        )}
                        {!isDragOver && ' o arrastra y suelta'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG, GIF hasta 10MB
                      </p>
                    </div>
                  </label>
                </div>
                
                {/* Vista previa de imagen */}
                {formData.imagen && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border shadow-lg">
                    <img
                      src={formData.imagen}
                      alt="Vista previa del itinerario"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white">
                      <p className="text-sm font-medium">Vista previa de la imagen</p>
                    </div>
                    
                    {/* Botón para cambiar imagen */}
                    <div className="absolute top-3 right-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const input = document.getElementById('edit-imagen') as HTMLInputElement
                          if (input) input.click()
                          setUploadError("")
                          setUploadSuccess("")
                        }}
                        className="bg-white/90 hover:bg-white text-foreground border-0 shadow-lg"
                      >
                        <ImageIcon className="w-4 h-4 mr-1" />
                        Cambiar
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Información adicional */}
                <div className="text-xs text-muted-foreground">
                  <p>• Formatos soportados: JPG, PNG, GIF, WebP</p>
                  <p>• Tamaño máximo: 10 MB</p>
                  <p>• Resolución recomendada: 1200x800 píxeles</p>
                </div>
                
                {/* Mensajes de estado */}
                {uploadError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-700 flex items-center">
                      <X className="w-4 h-4 mr-2" />
                      {uploadError}
                    </p>
                  </div>
                )}
                
                {uploadSuccess && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-700 flex items-center">
                      <ImageIcon className="w-4 h-4 mr-2" />
                      {uploadSuccess}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="border-t border-border bg-muted/20 p-6 rounded-b-xl flex-shrink-0">
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Save className="w-4 h-4 mr-2" />
              Guardar Cambios
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente Modal para Confirmar Eliminación
const ConfirmarEliminacionModal = ({ 
  isOpen, 
  onClose, 
  itinerario,
  onConfirm
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  itinerario: Itinerario | null,
  onConfirm: () => void
}) => {
  if (!isOpen || !itinerario) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl shadow-2xl border border-border max-w-md w-full">
        {/* Header */}
        <div className="bg-red-500 text-white p-6 rounded-t-xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Confirmar Eliminación</h2>
              <p className="text-red-100 text-sm">Esta acción no se puede deshacer</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <Trash2 className="w-8 h-8 text-red-600" />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                ¿Eliminar itinerario?
              </h3>
              <p className="text-muted-foreground mt-2">
                Estás a punto de eliminar el itinerario <strong>"{itinerario.nombre}"</strong>.
                Esta acción eliminará permanentemente todos los datos asociados.
              </p>
            </div>

            <div className="bg-muted/20 p-4 rounded-lg text-left">
              <h4 className="font-medium text-foreground mb-2">Detalles del itinerario:</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>• Destino: {itinerario.destino}</p>
                <p>• Duración: {itinerario.duracion} días</p>
                <p>• Precio: S/ {itinerario.precio.toFixed(2)}</p>
                <p>• Estado: {itinerario.estado}</p>
                <p>• Reservas: {itinerario.reservas}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-6 rounded-b-xl">
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              onClick={onConfirm}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Eliminar Definitivamente
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente Modal para Crear Itinerario
const CrearItinerarioModal = ({ isOpen, onClose, onSave }: { 
  isOpen: boolean, 
  onClose: () => void, 
  onSave: (itinerario: Omit<Itinerario, 'id' | 'fechaCreacion' | 'calificacion' | 'reservas'>) => void 
}) => {
  const [formData, setFormData] = useState({
    nombre: "",
    destino: "",
    duracion: 3,
    personas: 2,
    precio: 0,
    precioDescuento: 0,
    categoria: "",
    tipo: "paquete" as 'tour' | 'paquete',
    servicios: [] as string[],
    idiomas: ["Español"],
    estado: "borrador" as 'activo' | 'inactivo' | 'borrador',
    imagen: "/assets/banner.jpg",
    descripcion: ""
  })

  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [showTemplateSelector, setShowTemplateSelector] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadError, setUploadError] = useState<string>("")
  const [uploadSuccess, setUploadSuccess] = useState<string>("")

  // Datos de ejemplo de solicitudes para autocompletado
  const solicitudesEjemplo = [
    {
      id: "SOL001",
      nombre: "Arequipa Aventurero Premium",
      destino: "Arequipa",
      duracion: 5,
      personas: 4,
      precio: 1200,
      precioDescuento: 980,
      categoria: "Turismo de Aventura",
      tipo: "paquete" as 'tour' | 'paquete',
      servicios: ["Hoteles", "Tours", "Visitas guiadas", "Traslados"],
      idiomas: ["Español", "Inglés"],
      descripcion: "Experiencia premium de 5 días en Arequipa con Valle del Colca, rafting y senderismo. Incluye hoteles 4 estrellas y guías certificados.",
      imagen: "/assets/banner.jpg",
      destacado: true
    },
    {
      id: "SOL002",
      nombre: "Cusco Cultural Express",
      destino: "Cusco",
      duracion: 4,
      personas: 2,
      precio: 1800,
      precioDescuento: 1500,
      categoria: "Turismo Cultural",
      tipo: "paquete" as 'tour' | 'paquete',
      servicios: ["Hoteles", "Tours", "Visitas guiadas", "Boletos de Ingreso"],
      idiomas: ["Español"],
      descripcion: "Tour cultural de 4 días por Cusco, Machu Picchu y sitios arqueológicos. Ideal para conocer la historia inca.",
      imagen: "/assets/banner.jpg",
      destacado: false
    },
    {
      id: "SOL003",
      nombre: "Lima Gastronómica Familiar",
      destino: "Lima",
      duracion: 3,
      personas: 6,
      precio: 900,
      precioDescuento: 750,
      categoria: "Gastronomía",
      tipo: "tour" as 'tour' | 'paquete',
      servicios: ["Tours", "Alimentación", "Visitas guiadas"],
      idiomas: ["Español", "Inglés"],
      descripcion: "Experiencia gastronómica de 3 días en Lima. Restaurantes top, tours culinarios y visitas culturales.",
      imagen: "/assets/banner.jpg",
      destacado: true
    },
    {
      id: "SOL004",
      nombre: "Puno Místico y Natural",
      destino: "Puno",
      duracion: 4,
      personas: 3,
      precio: 1100,
      precioDescuento: 950,
      categoria: "Turismo Místico",
      tipo: "paquete" as 'tour' | 'paquete',
      servicios: ["Hoteles", "Tours", "Ecoturismo", "Traslados"],
      idiomas: ["Español"],
      descripcion: "Viaje místico de 4 días al Lago Titicaca, islas flotantes y comunidades locales. Turismo responsable y sostenible.",
      imagen: "/assets/banner.jpg",
      destacado: false
    }
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleServicioToggle = (servicio: string) => {
    setFormData(prev => ({
      ...prev,
      servicios: prev.servicios.includes(servicio)
        ? prev.servicios.filter(s => s !== servicio)
        : [...prev.servicios, servicio]
    }))
  }

  const handleIdiomaToggle = (idioma: string) => {
    setFormData(prev => ({
      ...prev,
      idiomas: prev.idiomas.includes(idioma)
        ? prev.idiomas.filter(i => i !== idioma)
        : [...prev.idiomas, idioma]
    }))
  }

  const handleFileUpload = (file: File) => {
    // Limpiar mensajes anteriores
    setUploadError("")
    setUploadSuccess("")
    
    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      setUploadError("Solo se permiten archivos de imagen (JPG, PNG, GIF, WebP)")
      return
    }
    
    // Validar tamaño (10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB en bytes
    if (file.size > maxSize) {
      setUploadError("El archivo es demasiado grande. Máximo 10MB permitido.")
      return
    }
    
    // Validar dimensiones recomendadas
    const img = new Image()
    img.onload = () => {
      if (img.width < 400 || img.height < 300) {
        setUploadError("La imagen es muy pequeña. Se recomienda mínimo 1200x800 píxeles.")
        return
      }
      
      // Si todo está bien, procesar la imagen
      const reader = new FileReader()
      reader.onload = (e) => {
        handleInputChange('imagen', e.target?.result as string)
        setUploadSuccess(`Imagen "${file.name}" subida correctamente`)
        
        // Limpiar mensaje de éxito después de 3 segundos
        setTimeout(() => setUploadSuccess(""), 3000)
      }
      reader.readAsDataURL(file)
    }
    
    img.onerror = () => {
      setUploadError("No se pudo procesar la imagen. Verifica que el archivo sea válido.")
    }
    
    img.src = URL.createObjectURL(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleTemplateSelect = (templateId: string) => {
    const template = solicitudesEjemplo.find(s => s.id === templateId)
    if (template) {
      setFormData({
        nombre: template.nombre,
        destino: template.destino,
        duracion: template.duracion,
        personas: template.personas,
        precio: template.precio,
        precioDescuento: template.precioDescuento,
        categoria: template.categoria,
        tipo: template.tipo,
        servicios: template.servicios,
        idiomas: template.idiomas,
        estado: "borrador",
        imagen: template.imagen,
        descripcion: template.descripcion
      })
      setSelectedTemplate(templateId)
      setShowTemplateSelector(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
    // Reset form
    setFormData({
      nombre: "",
      destino: "",
      duracion: 3,
      personas: 2,
      precio: 0,
      precioDescuento: 0,
      categoria: "",
      tipo: "paquete",
      servicios: [],
      idiomas: ["Español"],
      estado: "borrador",
      imagen: "/assets/banner.jpg",
      descripcion: ""
    })
    setSelectedTemplate("")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl shadow-2xl border border-border max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground p-6 rounded-t-xl flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Crear Nuevo Itinerario</h2>
              <p className="text-primary-foreground/90 mt-1">Completa la información para crear un nuevo itinerario turístico</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content Area - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          {/* Selector de Plantilla */}
          <div className="p-6 border-b border-border bg-gradient-to-r from-muted/20 to-muted/10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  Autocompletar el formulario con una plantilla
                </h3>
                <p className="text-muted-foreground text-sm mt-2">Selecciona un itinerario existente para autocompletar el formulario</p>
              </div>
              <Button
                variant={showTemplateSelector ? "default" : "outline"}
                onClick={() => setShowTemplateSelector(!showTemplateSelector)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 text-sm font-medium"
              >
                {showTemplateSelector ? "Ocultar Plantillas" : "Ver Plantillas Disponibles"}
              </Button>
            </div>

            {showTemplateSelector && (
              <div className="space-y-6">
                {/* Plantillas Destacadas */}
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
                    <span className="text-xl">⭐</span>
                    <span>Plantillas Destacadas</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {solicitudesEjemplo.filter(s => s.destacado).map((solicitud) => (
                      <div
                        key={solicitud.id}
                        className={`group relative overflow-hidden rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                          selectedTemplate === solicitud.id
                            ? 'border-primary ring-2 ring-primary/20 shadow-lg'
                            : 'border-border hover:border-primary/50 shadow-md'
                        }`}
                        onClick={() => handleTemplateSelect(solicitud.id)}
                      >
                        {/* Imagen de fondo con overlay */}
                        <div className="relative h-32 w-full overflow-hidden">
                          <img
                            src={solicitud.imagen}
                            alt={solicitud.nombre}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                          
                          {/* Badge destacado */}
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-lg text-xs">
                              ⭐ Destacado
                            </Badge>
                          </div>

                          {/* Badge de tipo */}
                          <div className="absolute top-2 right-2">
                            <Badge variant="outline" className="bg-white/90 text-foreground border-0 shadow-lg text-xs">
                              {solicitud.tipo}
                            </Badge>
                          </div>

                          {/* Indicador de selección */}
                          {selectedTemplate === solicitud.id && (
                            <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                              <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center shadow-lg">
                                <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Contenido de la tarjeta */}
                        <div className="p-3 bg-card">
                          <h4 className="font-bold text-sm text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {solicitud.nombre}
                          </h4>
                          
                          <div className="flex items-center space-x-2 mb-2 text-xs">
                            <MapPin className="w-3 h-3 text-primary" />
                            <span className="text-muted-foreground">{solicitud.destino}</span>
                            <span className="text-muted-foreground">•</span>
                            <Calendar className="w-3 h-3 text-primary" />
                            <span className="text-muted-foreground">{solicitud.duracion} días</span>
                            <span className="text-muted-foreground">•</span>
                            <Users className="w-3 h-3 text-primary" />
                            <span className="text-muted-foreground">{solicitud.personas} personas</span>
                          </div>

                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold text-primary">
                                S/ {solicitud.precioDescuento || solicitud.precio}
                              </span>
                              {solicitud.precioDescuento && (
                                <span className="text-xs text-muted-foreground line-through">
                                  S/ {solicitud.precio}
                                </span>
                              )}
                            </div>
                            <Badge className="bg-gradient-to-r from-secondary to-accent text-white border-0 text-xs">
                              {solicitud.categoria.split(' ')[1] || solicitud.categoria}
                            </Badge>
                          </div>

                          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                            {solicitud.descripcion}
                          </p>

                          {/* Servicios */}
                          <div className="flex flex-wrap gap-1">
                            {solicitud.servicios.slice(0, 2).map((servicio) => (
                              <Badge key={servicio} variant="outline" className="text-xs">
                                {servicio}
                              </Badge>
                            ))}
                            {solicitud.servicios.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{solicitud.servicios.length - 2} más
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Todas las Plantillas */}
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
                    <span className="text-xl">📋</span>
                    <span>Todas las Plantillas</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {solicitudesEjemplo.map((solicitud) => (
                      <div
                        key={solicitud.id}
                        className={`group relative overflow-hidden rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                          selectedTemplate === solicitud.id
                            ? 'border-primary ring-2 ring-primary/20 shadow-lg'
                            : 'border-border hover:border-primary/50 shadow-md'
                        }`}
                        onClick={() => handleTemplateSelect(solicitud.id)}
                      >
                        {/* Imagen de fondo */}
                        <div className="relative h-24 w-full overflow-hidden">
                          <img
                            src={solicitud.imagen}
                            alt={solicitud.nombre}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          
                          {/* Badge de tipo */}
                          <div className="absolute top-2 right-2">
                            <Badge variant="outline" className="bg-white/90 text-foreground border-0 text-xs">
                              {solicitud.tipo}
                            </Badge>
                          </div>

                          {/* Indicador de selección */}
                          {selectedTemplate === solicitud.id && (
                            <div className="absolute top-2 left-2">
                              <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center shadow-lg">
                                <div className="w-2 bg-white rounded-full"></div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Contenido compacto */}
                        <div className="p-3 bg-card">
                          <h4 className="font-semibold text-sm text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                            {solicitud.nombre}
                          </h4>
                          
                          <div className="flex items-center space-x-1 mb-2 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3 text-primary" />
                            <span>{solicitud.destino}</span>
                            <span>•</span>
                            <span>{solicitud.duracion}d</span>
                            <span>•</span>
                            <span>{solicitud.personas}p</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-primary">
                              S/ {solicitud.precioDescuento || solicitud.precio}
                            </span>
                            <Badge className="text-xs bg-secondary/20 text-secondary border-0">
                              {solicitud.categoria.split(' ')[1] || solicitud.categoria}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedTemplate && (
              <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-primary">Plantilla Seleccionada</span>
                </div>
                <div className="flex items-center space-x-3 mt-2">
                  <img
                    src={solicitudesEjemplo.find(s => s.id === selectedTemplate)?.imagen}
                    alt="Plantilla seleccionada"
                    className="w-10 h-10 rounded-lg object-cover border-2 border-primary/30"
                  />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Usando como base: <strong className="text-foreground">{solicitudesEjemplo.find(s => s.id === selectedTemplate)?.nombre}</strong>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Todos los campos han sido autocompletados. Puedes personalizarlos según tus necesidades.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Formulario */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Información Básica */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                  Información Básica
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="nombre" className="text-sm font-medium text-foreground">
                        Nombre del Itinerario *
                      </Label>
                      <Input
                        id="nombre"
                        value={formData.nombre}
                        onChange={(e) => handleInputChange('nombre', e.target.value)}
                        placeholder="Ej: Arequipa Aventurero"
                        className="mt-1"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="destino" className="text-sm font-medium text-foreground">
                        Destino *
                      </Label>
                      <Select value={formData.destino} onValueChange={(value) => handleInputChange('destino', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un destino" />
                        </SelectTrigger>
                        <SelectContent>
                          {destinos.map((destino) => (
                            <SelectItem key={destino} value={destino}>
                              {destino}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="categoria" className="text-sm font-medium text-foreground">
                        Categoría *
                      </Label>
                      <Select value={formData.categoria} onValueChange={(value) => handleInputChange('categoria', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          {categorias.map((categoria) => (
                            <SelectItem key={categoria} value={categoria}>
                              {categoria}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="tipo" className="text-sm font-medium text-foreground">
                        Tipo *
                      </Label>
                      <Select value={formData.tipo} onValueChange={(value) => handleInputChange('tipo', value as 'tour' | 'paquete')}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tour">Tour</SelectItem>
                          <SelectItem value="paquete">Paquete</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="duracion" className="text-sm font-medium text-foreground">
                        Duración (días) *
                      </Label>
                      <Select value={formData.duracion.toString()} onValueChange={(value) => handleInputChange('duracion', parseInt(value))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {duraciones.map((duracion) => (
                            <SelectItem key={duracion} value={duracion.toString()}>
                              {duracion} Días
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="personas" className="text-sm font-medium text-foreground">
                        Número de Personas *
                      </Label>
                      <Input
                        id="personas"
                        type="number"
                        min="1"
                        max="20"
                        value={formData.personas}
                        onChange={(e) => handleInputChange('personas', parseInt(e.target.value))}
                        className="mt-1"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="precio" className="text-sm font-medium text-foreground">
                        Precio Regular (S/) *
                      </Label>
                      <Input
                        id="precio"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.precio}
                        onChange={(e) => handleInputChange('precio', parseFloat(e.target.value))}
                        className="mt-1"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="precioDescuento" className="text-sm font-medium text-foreground">
                        Precio con Descuento (S/)
                      </Label>
                      <Input
                        id="precioDescuento"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.precioDescuento}
                        onChange={(e) => handleInputChange('precioDescuento', parseFloat(e.target.value))}
                        className="mt-1"
                        placeholder="Opcional"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Servicios */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                  Servicios Incluidos
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {servicios.map((servicio) => (
                    <div key={servicio} className="flex items-center space-x-2">
                      <Checkbox
                        id={servicio}
                        checked={formData.servicios.includes(servicio)}
                        onCheckedChange={() => handleServicioToggle(servicio)}
                      />
                      <Label htmlFor={servicio} className="text-sm text-muted-foreground cursor-pointer">
                        {servicio}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Idiomas */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                  Idiomas Disponibles
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {idiomas.map((idioma) => (
                    <div key={idioma} className="flex items-center space-x-2">
                      <Checkbox
                        id={idioma}
                        checked={formData.idiomas.includes(idioma)}
                        onCheckedChange={() => handleIdiomaToggle(idioma)}
                      />
                      <Label htmlFor={idioma} className="text-sm text-muted-foreground cursor-pointer">
                        {idioma}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Estado */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                  Estado del Itinerario
                </h3>
                <div>
                  <Label htmlFor="estado" className="text-sm font-medium text-foreground">
                    Estado *
                  </Label>
                  <Select value={formData.estado} onValueChange={(value) => handleInputChange('estado', value as 'activo' | 'inactivo' | 'borrador')}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="borrador">Borrador</SelectItem>
                      <SelectItem value="activo">Activo</SelectItem>
                      <SelectItem value="inactivo">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Descripción */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                  Descripción
                </h3>
                <div>
                  <Label htmlFor="descripcion" className="text-sm font-medium text-foreground">
                    Descripción del Itinerario *
                  </Label>
                  <Textarea
                    id="descripcion"
                    value={formData.descripcion}
                    onChange={(e) => handleInputChange('descripcion', e.target.value)}
                    placeholder="Describe los detalles del itinerario, atracciones principales, experiencias incluidas..."
                    className="mt-1 min-h-[100px]"
                    required
                  />
                </div>
              </div>

              {/* Imagen */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                  Imagen del Itinerario
                </h3>
                <div className="space-y-3">
                  {/* Upload de archivo */}
                  <div className="relative">
                    <input
                      type="file"
                      id="imagen"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          handleFileUpload(file)
                        }
                      }}
                      className="hidden"
                    />
                    
                    <label
                      htmlFor="imagen"
                      className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 ${
                        isDragOver 
                          ? 'border-primary bg-primary/5 scale-105 shadow-lg' 
                          : 'border-border bg-muted/20 hover:bg-muted/40'
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <ImageIcon className={`w-8 h-8 mb-2 transition-colors ${
                          isDragOver ? 'text-primary' : 'text-muted-foreground'
                        }`} />
                        <p className={`mb-2 text-sm transition-colors ${
                          isDragOver ? 'text-primary font-semibold' : 'text-muted-foreground'
                        }`}>
                          {isDragOver ? (
                            <span className="font-semibold">¡Suelta la imagen aquí!</span>
                          ) : (
                            <span className="font-semibold">Haz clic para subir</span>
                          )}
                          {!isDragOver && ' o arrastra y suelta'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG, GIF hasta 10MB
                        </p>
                      </div>
                    </label>
                  </div>
                  
                  {/* Vista previa de imagen */}
                  {formData.imagen && (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border shadow-lg">
                      <img
                        src={formData.imagen}
                        alt="Vista previa del itinerario"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <div className="absolute bottom-3 left-3 text-white">
                        <p className="text-sm font-medium">Vista previa de la imagen</p>
                      </div>
                      
                      {/* Botón para cambiar imagen */}
                      <div className="absolute top-3 right-3">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const input = document.getElementById('imagen') as HTMLInputElement
                            if (input) input.click()
                            // Limpiar mensajes al cambiar imagen
                            setUploadError("")
                            setUploadSuccess("")
                          }}
                          className="bg-white/90 hover:bg-white text-foreground border-0 shadow-lg"
                        >
                          <ImageIcon className="w-4 h-4 mr-1" />
                          Cambiar
                        </Button>
                      </div>
                      
                      {/* Botón para eliminar imagen */}
                      <div className="absolute top-3 left-3">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            handleInputChange('imagen', '')
                            // Limpiar mensajes al eliminar imagen
                            setUploadError("")
                            setUploadSuccess("")
                          }}
                          className="bg-red-500/90 hover:bg-red-500 text-white border-0 shadow-lg"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Información adicional */}
                  <div className="text-xs text-muted-foreground">
                    <p>• Formatos soportados: JPG, PNG, GIF, WebP</p>
                    <p>• Tamaño máximo: 10 MB</p>
                    <p>• Resolución recomendada: 1200x800 píxeles</p>
                  </div>
                  
                  {/* Mensajes de estado */}
                  {uploadError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-700 flex items-center">
                        <X className="w-4 h-4 mr-2" />
                        {uploadError}
                      </p>
                    </div>
                  )}
                  
                  {uploadSuccess && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-700 flex items-center">
                        <ImageIcon className="w-4 h-4 mr-2" />
                        {uploadSuccess}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="border-t border-border bg-muted/20 p-6 rounded-b-xl flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {selectedTemplate && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setSelectedTemplate("")
                    setFormData({
                      nombre: "",
                      destino: "",
                      duracion: 3,
                      personas: 2,
                      precio: 0,
                      precioDescuento: 0,
                      categoria: "",
                      tipo: "paquete",
                      servicios: [],
                      idiomas: ["Español"],
                      estado: "borrador",
                      imagen: "/assets/banner.jpg",
                      descripcion: ""
                    })
                  }}
                  className="border-orange-300 text-orange-600 hover:bg-orange-50"
                >
                  Limpiar Plantilla
                </Button>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-border text-muted-foreground hover:text-foreground"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                onClick={(e) => {
                  e.preventDefault()
                  handleSubmit(e)
                }}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Save className="w-4 h-4 mr-2" />
                Crear Itinerario
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ListaItinerariosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategoria, setSelectedCategoria] = useState("Todos (43)")
  const [selectedDuracion, setSelectedDuracion] = useState("Todos")
  const [selectedDestino, setSelectedDestino] = useState("Todos")
  const [selectedTipo, setSelectedTipo] = useState("todos")
  const [selectedEstado, setSelectedEstado] = useState("todos")
  const [selectedPersonas, setSelectedPersonas] = useState("Todos")
  const [precioMin, setPrecioMin] = useState("")
  const [precioMax, setPrecioMax] = useState("")
  const [calificacionMin, setCalificacionMin] = useState("0")
  const [servicioSeleccionado, setServicioSeleccionado] = useState("Todos")
  const [activeTab, setActiveTab] = useState("todos")
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Estados para los modales de acción
  const [detalleModalOpen, setDetalleModalOpen] = useState(false)
  const [editarModalOpen, setEditarModalOpen] = useState(false)
  const [eliminarModalOpen, setEliminarModalOpen] = useState(false)
  const [itinerarioSeleccionado, setItinerarioSeleccionado] = useState<Itinerario | null>(null)
  const [itinerarios, setItinerarios] = useState<Itinerario[]>(itinerariosEjemplo)

  const filteredItinerarios = itinerarios.filter(itinerario => {
    // Filtro por búsqueda de texto
    const matchesSearch = itinerario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         itinerario.destino.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Filtros principales
    const matchesCategoria = selectedCategoria === "Todos (43)" || itinerario.categoria === selectedCategoria
    const matchesDuracion = selectedDuracion === "Todos" || itinerario.duracion.toString() + " Días" === selectedDuracion
    const matchesDestino = selectedDestino === "Todos" || itinerario.destino === selectedDestino
    const matchesTipo = selectedTipo === "todos" || itinerario.tipo === selectedTipo
    const matchesEstado = selectedEstado === "todos" || itinerario.estado === selectedEstado
    
    // Filtros secundarios
    const matchesPersonas = selectedPersonas === "Todos" || 
                           (selectedPersonas === "5+" ? itinerario.personas >= 5 : itinerario.personas.toString() === selectedPersonas)
    
    // Filtros avanzados
    const matchesPrecioMin = !precioMin || itinerario.precio >= parseFloat(precioMin)
    const matchesPrecioMax = !precioMax || itinerario.precio <= parseFloat(precioMax)
    const matchesCalificacion = parseFloat(calificacionMin) === 0 || itinerario.calificacion >= parseFloat(calificacionMin)
    const matchesServicio = servicioSeleccionado === "Todos" || itinerario.servicios.includes(servicioSeleccionado)
    
    // Filtro por tab activo
    let matchesTab = true
    if (activeTab === "tours") matchesTab = itinerario.tipo === "tour"
    else if (activeTab === "paquetes") matchesTab = itinerario.tipo === "paquete"
    else if (activeTab === "borradores") matchesTab = itinerario.estado === "borrador"

    return matchesSearch && matchesCategoria && matchesDuracion && matchesDestino && 
           matchesTipo && matchesTab && matchesEstado && matchesPersonas && 
           matchesPrecioMin && matchesPrecioMax && matchesCalificacion && matchesServicio
  })

  const handleSaveItinerario = (itinerarioData: Omit<Itinerario, 'id' | 'fechaCreacion' | 'calificacion' | 'reservas'>) => {
    const newItinerario: Itinerario = {
      ...itinerarioData,
      id: `IT${String(itinerarios.length + 1).padStart(3, '0')}`,
      fechaCreacion: new Date().toISOString().split('T')[0],
      calificacion: 0,
      reservas: 0
    }
    
    // Agregar el nuevo itinerario a la lista
    setItinerarios(prev => [...prev, newItinerario])
    
    // Cerrar el modal
    setIsModalOpen(false)
    
    console.log("Nuevo itinerario creado:", newItinerario)
  }

  // Funciones para manejar las acciones de los botones
  const handleVerDetalle = (itinerario: Itinerario) => {
    setItinerarioSeleccionado(itinerario)
    setDetalleModalOpen(true)
  }

  const handleEditar = (itinerario: Itinerario) => {
    setItinerarioSeleccionado(itinerario)
    setEditarModalOpen(true)
  }

  const handleEliminar = (itinerario: Itinerario) => {
    setItinerarioSeleccionado(itinerario)
    setEliminarModalOpen(true)
  }

  const handleGuardarEdicion = (itinerarioEditado: Itinerario) => {
    setItinerarios(prev => prev.map(it => 
      it.id === itinerarioEditado.id ? itinerarioEditado : it
    ))
    setEditarModalOpen(false)
    setItinerarioSeleccionado(null)
    console.log("Itinerario editado:", itinerarioEditado)
  }

  const handleConfirmarEliminacion = () => {
    if (itinerarioSeleccionado) {
      setItinerarios(prev => prev.filter(it => it.id !== itinerarioSeleccionado.id))
      setEliminarModalOpen(false)
      setItinerarioSeleccionado(null)
      console.log("Itinerario eliminado:", itinerarioSeleccionado)
    }
  }

  // Funciones para manejar los filtros
  const handleLimpiarFiltros = () => {
    setSearchTerm("")
    setSelectedCategoria("Todos (43)")
    setSelectedDuracion("Todos")
    setSelectedDestino("Todos")
    setSelectedTipo("todos")
    setSelectedEstado("todos")
    setSelectedPersonas("Todos")
    setPrecioMin("")
    setPrecioMax("")
    setCalificacionMin("0")
    setServicioSeleccionado("Todos")
  }

  const handleAplicarFiltros = () => {
    // Los filtros se aplican automáticamente por el estado
    // Esta función puede usarse para logging o futuras funcionalidades
    console.log("Filtros aplicados:", {
      searchTerm,
      selectedCategoria,
      selectedDuracion,
      selectedDestino,
      selectedTipo,
      selectedEstado,
      selectedPersonas,
      precioMin,
      precioMax,
      calificacionMin,
      servicioSeleccionado
    })
  }

  const getEstadoBadge = (estado: string) => {
    const variants = {
      activo: "bg-green-100 text-green-800",
      inactivo: "bg-gray-100 text-gray-800",
      borrador: "bg-yellow-100 text-yellow-800"
    }
    return <Badge className={variants[estado as keyof typeof variants]}>{estado}</Badge>
  }

  const getTipoBadge = (tipo: string) => {
    const variants = {
      tour: "bg-blue-100 text-blue-800",
      paquete: "bg-purple-100 text-purple-800"
    }
    return <Badge className={variants[tipo as keyof typeof variants]}>{tipo}</Badge>
  }

  const getServicioIcon = (servicio: string) => {
    const iconMap: { [key: string]: any } = {
      "Hoteles": Building,
      "Tours": Camera,
      "Visitas guiadas": Eye,
      "Traslados": Car,
      "Alimentación": Utensils,
      "Boletos de Ingreso": Ticket,
      "Ecoturismo": Mountain
    }
    const Icon = iconMap[servicio] || Tag
    return <Icon className="w-4 h-4" />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="text-center lg:text-left mb-6 lg:mb-0">
              <h1 className="text-4xl font-bold mb-4">Gestión de Itinerarios</h1>
              <p className="text-xl text-primary-foreground/90">Crea y gestiona itinerarios turísticos personalizados</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                className="bg-white hover:bg-gray-100 text-primary border-0 px-6 py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={() => setIsModalOpen(true)}
              >
                <Plus className="w-5 h-5 mr-2" />
                Crear Itinerario
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 py-8">
        {/* Header del contenido */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Lista de Itinerarios</h2>
              <p className="text-muted-foreground mt-2">Administra todos los itinerarios del sistema</p>
            </div>
          </div>
        </div>

      {/* Modal para crear itinerario */}
      <CrearItinerarioModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveItinerario}
      />

      {/* Tabs principales */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="todos">Todos ({itinerarios.length})</TabsTrigger>
          <TabsTrigger value="tours">Tours ({itinerarios.filter(i => i.tipo === 'tour').length})</TabsTrigger>
          <TabsTrigger value="paquetes">Paquetes ({itinerarios.filter(i => i.tipo === 'paquete').length})</TabsTrigger>
          <TabsTrigger value="borradores">Borradores ({itinerarios.filter(i => i.estado === 'borrador').length})</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Filtros */}
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Filter className="w-5 h-5 text-primary" />
            <span>Filtros de Búsqueda</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Búsqueda por texto - Destacada */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Buscar Itinerarios</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar por nombre o destino..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
          </div>

          {/* Separador visual */}
          <div className="border-t border-border/50" />

          {/* Filtros principales - Primera fila */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground text-muted-foreground">Filtros Principales</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Destino */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Destino</Label>
                <Select value={selectedDestino} onValueChange={setSelectedDestino}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Seleccionar destino" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos los destinos</SelectItem>
                    {destinos.map((destino) => (
                      <SelectItem key={destino} value={destino}>
                        {destino}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Categoría */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Categoría</Label>
                <Select value={selectedCategoria} onValueChange={setSelectedCategoria}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos (43)">Todas las categorías</SelectItem>
                    {categorias.map((categoria) => (
                      <SelectItem key={categoria} value={categoria}>
                        {categoria}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tipo de itinerario */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Tipo</Label>
                <Select value={selectedTipo} onValueChange={setSelectedTipo}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los tipos</SelectItem>
                    <SelectItem value="tour">Tours</SelectItem>
                    <SelectItem value="paquete">Paquetes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Separador visual */}
          <div className="border-t border-border/50" />

          {/* Filtros secundarios - Segunda fila */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground text-muted-foreground">Filtros Adicionales</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Duración */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Duración</Label>
                <Select value={selectedDuracion} onValueChange={setSelectedDuracion}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Seleccionar duración" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Cualquier duración</SelectItem>
                    {duraciones.map((duracion) => (
                      <SelectItem key={duracion} value={duracion.toString()}>
                        {duracion} Días
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Estado del itinerario */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Estado</Label>
                <Select value={selectedEstado} onValueChange={setSelectedEstado}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los estados</SelectItem>
                    <SelectItem value="activo">Activo</SelectItem>
                    <SelectItem value="inactivo">Inactivo</SelectItem>
                    <SelectItem value="borrador">Borrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Número de personas */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Grupo</Label>
                <Select value={selectedPersonas} onValueChange={setSelectedPersonas}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Seleccionar grupo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Cualquier grupo</SelectItem>
                    <SelectItem value="1">1 persona</SelectItem>
                    <SelectItem value="2">2 personas</SelectItem>
                    <SelectItem value="3">3 personas</SelectItem>
                    <SelectItem value="4">4 personas</SelectItem>
                    <SelectItem value="5+">5+ personas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Separador visual */}
          <div className="border-t border-border/50" />

          {/* Filtros avanzados - Tercera fila */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground text-muted-foreground">Filtros Avanzados</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Rango de precios */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Rango de Precios (S/)</Label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Mín"
                    type="number"
                    min="0"
                    value={precioMin}
                    onChange={(e) => setPrecioMin(e.target.value)}
                    className="flex-1 h-10"
                  />
                  <Input
                    placeholder="Máx"
                    type="number"
                    min="0"
                    value={precioMax}
                    onChange={(e) => setPrecioMax(e.target.value)}
                    className="flex-1 h-10"
                  />
                </div>
              </div>

              {/* Calificación mínima */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Calificación Mínima</Label>
                <Select value={calificacionMin} onValueChange={setCalificacionMin}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Seleccionar calificación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Cualquier calificación</SelectItem>
                    <SelectItem value="3.0">3.0+ estrellas</SelectItem>
                    <SelectItem value="3.5">3.5+ estrellas</SelectItem>
                    <SelectItem value="4.0">4.0+ estrellas</SelectItem>
                    <SelectItem value="4.5">4.5+ estrellas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Servicios incluidos */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Servicios Incluidos</Label>
                <Select value={servicioSeleccionado} onValueChange={setServicioSeleccionado}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Seleccionar servicio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Cualquier servicio</SelectItem>
                    {servicios.map((servicio) => (
                      <SelectItem key={servicio} value={servicio}>
                        {servicio}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Separador visual */}
          <div className="border-t border-border/50" />

          {/* Botones de acción y contador de resultados */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm font-medium text-foreground">
                {filteredItinerarios.length} itinerario{filteredItinerarios.length !== 1 ? 's' : ''} encontrado{filteredItinerarios.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button 
                variant="outline" 
                onClick={handleLimpiarFiltros}
                className="flex items-center justify-center space-x-2 h-10 px-4"
              >
                <Filter className="w-4 h-4" />
                <span>Limpiar Filtros</span>
              </Button>
              <Button 
                onClick={handleAplicarFiltros}
                className="flex items-center justify-center space-x-2 h-10 px-6 bg-primary hover:bg-primary/90"
              >
                <Search className="w-4 h-4" />
                <span>Aplicar Filtros</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Itinerarios */}
      <div className="space-y-6">
        {filteredItinerarios.map((itinerario) => (
          <Card key={itinerario.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Imagen */}
                <div className="lg:col-span-3">
                  <div className="relative w-full h-48 rounded-lg overflow-hidden">
                    <img
                      src={itinerario.imagen}
                      alt={itinerario.nombre}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      {getTipoBadge(itinerario.tipo)}
                    </div>
                    <div className="absolute top-2 right-2">
                      {getEstadoBadge(itinerario.estado)}
                    </div>
                  </div>
                </div>

                {/* Información principal */}
                <div className="lg:col-span-6">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{itinerario.nombre}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{itinerario.destino}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          S/ {itinerario.precioDescuento?.toFixed(2) || itinerario.precio.toFixed(2)}
                        </div>
                        {itinerario.precioDescuento && (
                          <div className="text-sm text-muted-foreground line-through">
                            S/ {itinerario.precio.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm">{itinerario.descripcion}</p>

                    {/* Detalles del itinerario */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{itinerario.duracion} días</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{itinerario.personas} personas</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm">{itinerario.calificacion}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{itinerario.reservas} reservas</span>
                      </div>
                    </div>

                    {/* Servicios */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {itinerario.servicios.map((servicio, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                          {getServicioIcon(servicio)}
                          <span>{servicio}</span>
                        </Badge>
                      ))}
                    </div>

                    {/* Idiomas */}
                    <div className="flex items-center space-x-2">
                      <Tag className="w-4 h-4 text-muted-foreground" />
                      <div className="flex space-x-1">
                        {itinerario.idiomas.map((idioma, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {idioma}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Acciones y estadísticas */}
                <div className="lg:col-span-3">
                  <div className="space-y-4">
                    {/* Botones de acción */}
                    <div className="space-y-2">
                      <Button className="w-full" variant="outline" onClick={() => handleVerDetalle(itinerario)}>
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Detalle
                      </Button>
                      <Button className="w-full" variant="outline" onClick={() => handleEditar(itinerario)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </Button>
                      <Button className="w-full text-red-600 hover:text-red-700" variant="outline" onClick={() => handleEliminar(itinerario)}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Eliminar
                      </Button>
                    </div>

                    {/* Estadísticas rápidas */}
                    <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Creado:</span>
                        <span className="font-medium">{new Date(itinerario.fechaCreacion).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Categoría:</span>
                        <span className="font-medium">{itinerario.categoria}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Estado:</span>
                        <span className="font-medium capitalize">{itinerario.estado}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Estado vacío */}
      {filteredItinerarios.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                <MapPin className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">No se encontraron itinerarios</h3>
                <p className="text-muted-foreground">Intenta ajustar los filtros o crear un nuevo itinerario</p>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Crear Primer Itinerario
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modales */}
      <VerDetalleItinerarioModal
        isOpen={detalleModalOpen}
        onClose={() => setDetalleModalOpen(false)}
        itinerario={itinerarioSeleccionado}
      />
      <EditarItinerarioModal
        isOpen={editarModalOpen}
        onClose={() => setEditarModalOpen(false)}
        itinerario={itinerarioSeleccionado}
        onSave={handleGuardarEdicion}
      />
      <ConfirmarEliminacionModal
        isOpen={eliminarModalOpen}
        onClose={() => setEliminarModalOpen(false)}
        itinerario={itinerarioSeleccionado}
        onConfirm={handleConfirmarEliminacion}
      />
      </div>
    </div>
  )
}
