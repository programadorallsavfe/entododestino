"use client"
import { useState, useEffect, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  MapPin, 
  Calendar, 
  Users, 
  Plane, 
  Hotel, 
  Car, 
  Clock,
  Star,
  Globe,
  CreditCard,
  Download,
  ArrowLeft,
  CheckCircle,
  DollarSign,
  Phone,
  Mail
} from 'lucide-react'
import { Destination } from '../components/panel-izquierdo-constructor-itinerario'

// SVG real de WhatsApp
const WhatsAppIcon = () => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className="w-5 h-5"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
  </svg>
)

interface ItinerarioResumen {
  id: string
  fechaInicio: string
  fechaFin: string
  duracion: number
  personas: number
  destinos: Destination[]
  serviciosIncluidos: string[]
  precioTotal: number
  precioDescuento?: number
  estado: 'pendiente' | 'confirmado' | 'pagado'
}

function ResumenItinerarioContent() {
  const router = useRouter()
  const [itinerario, setItinerario] = useState<ItinerarioResumen | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simular carga de datos del itinerario
    setTimeout(() => {
      const itinerarioData: ItinerarioResumen = {
        id: 'IT-' + Date.now().toString().slice(-6),
        fechaInicio: '23 Septiembre 2025',
        fechaFin: '29 Septiembre 2025',
        duracion: 7,
        personas: 2,
        destinos: [
          {
            id: '1',
            name: 'Lima, Perú',
            lat: -12.0464,
            lng: -77.0428,
            type: 'start',
            image: '/assets/banner.jpg',
            nights: 2,
            transportIncluded: true,
            accommodationIncluded: true
          },
          {
            id: '2',
            name: 'Cusco',
            lat: -13.5167,
            lng: -71.9789,
            type: 'destination',
            image: '/assets/banner.jpg',
            nights: 3,
            transportIncluded: true,
            accommodationIncluded: true
          },
          {
            id: '3',
            name: 'Arequipa',
            lat: -16.4090,
            lng: -71.5375,
            type: 'destination',
            image: '/assets/banner.jpg',
            nights: 2,
            transportIncluded: true,
            accommodationIncluded: true
          }
        ],
        serviciosIncluidos: ['Hoteles', 'Tours', 'Visitas guiadas', 'Traslados', 'Alimentación'],
        precioTotal: 2899.99,
        precioDescuento: 2599.99,
        estado: 'pendiente'
      }
      setItinerario(itinerarioData)
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleVolver = () => {
    router.push('/clientes/configurar-tour')
  }

      const handleProcederPago = () => {
          router.push('/clientes/proceder-pago')
      }

  const handleEnviarWhatsApp = () => {
    const mensaje = `¡Hola! Me interesa este itinerario:\n\n` +
      `🌍 ${itinerario?.destinos.length} destinos\n` +
      `📅 ${itinerario?.duracion} días\n` +
      `👥 ${itinerario?.personas} personas\n` +
      `💰 Precio: S/ ${itinerario?.precioTotal}\n\n` +
      `¿Podrías darme más información?`
    
    const urlWhatsApp = `https://wa.me/51999999999?text=${encodeURIComponent(mensaje)}`
    window.open(urlWhatsApp, '_blank')
  }

  const handleDescargarPDF = () => {
    // Aquí iría la lógica para generar y descargar PDF
    alert('Generando PDF del itinerario...')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando resumen del itinerario...</p>
        </div>
      </div>
    )
  }

  if (!itinerario) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">No se encontró el itinerario</p>
          <Button onClick={handleVolver} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        </div>
      </div>
    )
  }

  const ahorro = itinerario.precioDescuento ? itinerario.precioTotal - itinerario.precioDescuento : 0

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Resumen del Itinerario</h1>
              <p className="text-primary-foreground/90 mt-2">
                Revisa todos los detalles antes de confirmar tu viaje
              </p>
            </div>
            <div className="text-right">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {itinerario.estado.toUpperCase()}
              </Badge>
              <p className="text-sm mt-2">ID: {itinerario.id}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Columna Principal - Detalles del Itinerario */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Información General */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-primary" />
                  <span>Información del Viaje</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium">Fecha Inicio</p>
                    <p className="text-xs text-muted-foreground">{itinerario.fechaInicio}</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium">Fecha Fin</p>
                    <p className="text-xs text-muted-foreground">{itinerario.fechaFin}</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium">Duración</p>
                    <p className="text-xs text-muted-foreground">{itinerario.duracion} días</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium">Personas</p>
                    <p className="text-xs text-muted-foreground">{itinerario.personas}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Destinos del Itinerario */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Ruta del Viaje</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {itinerario.destinos.map((destino, index) => (
                    <div key={destino.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full overflow-hidden">
                          <img 
                            src={destino.image || "/assets/banner.jpg"} 
                            alt={destino.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                          destino.type === 'start' ? 'bg-green-500' : 
                          destino.type === 'end' ? 'bg-red-500' : 'bg-blue-500'
                        }`}>
                          {destino.type === 'start' ? 'I' : destino.type === 'end' ? 'F' : index}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{destino.name}</h3>
                        <div className="flex items-center space-x-4 mt-2">
                          {destino.accommodationIncluded && (
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <Hotel className="w-4 h-4" />
                              <span>{destino.nights} noches</span>
                            </div>
                          )}
                          {destino.transportIncluded && (
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <Car className="w-4 h-4" />
                              <span>Incluido</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <Badge variant="outline" className="mb-2">
                          {destino.type === 'start' ? 'Inicio' : destino.type === 'end' ? 'Final' : 'Destino'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Servicios Incluidos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Servicios Incluidos</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {itinerario.serviciosIncluidos.map((servicio, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 bg-muted/30 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium">{servicio}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Columna Lateral - Precios y Acciones */}
          <div className="space-y-6">
            
            {/* Resumen de Precios */}
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <span>Resumen de Precios</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Precio por persona</span>
                    <span>S/ {(itinerario.precioTotal / itinerario.personas).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total ({itinerario.personas} personas)</span>
                    <span className="font-semibold">S/ {itinerario.precioTotal.toFixed(2)}</span>
                  </div>
                  
                  {itinerario.precioDescuento && (
                    <>
                      <Separator />
                      <div className="flex justify-between text-green-600">
                        <span>Descuento aplicado</span>
                        <span>-S/ {ahorro.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold text-primary">
                        <span>Precio Final</span>
                        <span>S/ {itinerario.precioTotal.toFixed(2)}</span>
                      </div>
                    </>
                  )}
                </div>

                <Separator />

                {/* Botones de Acción */}
                <div className="space-y-3">
                  <Button 
                    onClick={handleProcederPago} 
                    className="w-full h-12 bg-primary hover:bg-primary/90"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Proceder al Pago
                  </Button>
                  
                  <Button 
                    onClick={handleEnviarWhatsApp} 
                    variant="outline" 
                    className="w-full h-12 border-green-500 text-green-600 hover:bg-green-50"
                  >
                    <WhatsAppIcon />
                    <span className="ml-2">Enviar por WhatsApp</span>
                  </Button>
                  
                  <Button 
                    onClick={handleDescargarPDF} 
                    variant="outline" 
                    className="text-sm"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Descargar PDF
                  </Button>
                </div>

                {/* Información de Contacto */}
                <Separator />
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">¿Tienes preguntas?</p>
                  <div className="flex justify-center space-x-4">
                    <Button variant="ghost" size="sm" className="text-primary">
                      <Phone className="w-4 h-4 mr-1" />
                      Llamar
                    </Button>
                    <Button variant="ghost" size="sm" className="text-primary">
                      <Mail className="w-4 h-4 mr-1" />
                      Email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Botón Volver */}
        <div className="mt-8 text-center">
          <Button onClick={handleVolver} variant="outline" className="px-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Configurar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function ResumenItinerarioPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    }>
      <ResumenItinerarioContent />
    </Suspense>
  )
}
