"use client"

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  ArrowLeft,
  Plane,
  Clock,
  MapPin,
  Users,
  CreditCard,
  Phone,
  Mail,
  Globe,
  Heart,
  Share2,
  Star,
  BaggageClaim,
  Calendar,
  Shield,
  CheckCircle,
  XCircle,
  Info
} from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface VueloDetalles {
  id: string
  aerolinea: string
  logo: string
  calificacion: number
  tipo: string
  origen: string
  destino: string
  codigoOrigen: string
  codigoDestino: string
  fechaSalida: string
  fechaLlegada: string
  horaSalida: string
  horaLlegada: string
  duracion: string
  precio: number
  impuestos: number
  precioFinal: number
  equipaje: string
  escalas: number
  tipoVuelo: 'ida-vuelta' | 'solo-ida' | 'multidestino'
  horariosVuelta?: {
    horaSalida: string
    horaLlegada: string
    duracion: string
  }
  asientosDisponibles: number
  clase: string
  servicios: string[]
  politicas: {
    cancelacion: string
    cambio: string
    equipaje: string
    checkIn: string
  }
}

export default function DetallesVuelosPage({ vueloId }: { vueloId: string }) {
  const [vuelo, setVuelo] = useState<VueloDetalles | null>(null)
  const [pasajeros, setPasajeros] = useState(1)
  const [clase, setClase] = useState('economica')
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

  // Datos simulados del vuelo
  useEffect(() => {
    if (vueloId) {
      const mockVuelo: VueloDetalles = {
        id: vueloId,
        aerolinea: 'SKY Sky Airline',
        logo: '/assets/banner.jpg',
        calificacion: 8.5,
        tipo: 'directo',
        origen: 'Lima',
        destino: 'San Pablo',
        codigoOrigen: 'LIM',
        codigoDestino: 'GRU',
        fechaSalida: 'vie. 29 ago. 2025',
        fechaLlegada: 'vie. 29 ago. 2025',
        horaSalida: '00:25',
        horaLlegada: '07:30',
        duracion: '5 h 5 m',
        precio: 293,
        impuestos: 121,
        precioFinal: 414,
        equipaje: 'ambos',
        escalas: 0,
        tipoVuelo: 'ida-vuelta',
        horariosVuelta: {
          horaSalida: '05:55',
          horaLlegada: '09:25',
          duracion: '5 h 30 m'
        },
        asientosDisponibles: 45,
        clase: 'economica',
        servicios: [
          'WiFi a bordo',
          'Entretenimiento personal',
          'Bebidas incluidas',
          'Snacks',
          'Asientos reclinables',
          'Soporte para dispositivos'
        ],
        politicas: {
          cancelacion: 'Gratuita hasta 24h antes',
          cambio: 'Permitido con cargo',
          equipaje: '1 maleta de mano + 1 equipaje facturado',
          checkIn: 'Online 24h antes o en aeropuerto 2h antes'
        }
      }
      setVuelo(mockVuelo)
    }
  }, [vueloId])

  const handleWhatsAppContact = () => {
    const message = `Hola, estoy interesado en el vuelo ${vuelo?.aerolinea} de ${vuelo?.origen} a ${vuelo?.destino} para el ${vuelo?.fechaSalida}. ¿Podrían ayudarme con más información?`
    const whatsappUrl = `https://wa.me/51999999999?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handlePayment = () => {
    setIsPaymentModalOpen(true)
    // Aquí iría la lógica de pago
  }

  const renderEquipaje = (equipaje: string) => {
    if (equipaje === 'ambos') {
      return (
        <div className="flex space-x-1">
          <BaggageClaim className="w-4 h-4 text-green-600" />
          <BaggageClaim className="w-4 h-4 text-green-600" />
        </div>
      )
    } else if (equipaje === 'mano') {
      return <BaggageClaim className="w-4 h-4 text-blue-600" />
    } else {
      return <BaggageClaim className="w-4 h-4 text-orange-600" />
    }
  }

  if (!vuelo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando detalles del vuelo...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header con navegación */}
      <div className="bg-white border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Información principal del vuelo */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-3">
                      <img 
                        src={vuelo.logo} 
                        alt={vuelo.aerolinea} 
                        className="w-12 h-12 rounded-lg"
                      />
                      <div>
                        <CardTitle className="text-2xl font-bold">{vuelo.aerolinea}</CardTitle>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < Math.floor(vuelo.calificacion / 2) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{vuelo.calificacion}/10</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="text-sm text-muted-foreground">ORIGEN</div>
                        <div className="text-lg font-bold">{vuelo.codigoOrigen}</div>
                        <div className="text-sm">{vuelo.origen}</div>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="text-sm text-muted-foreground">DESTINO</div>
                        <div className="text-lg font-bold">{vuelo.codigoDestino}</div>
                        <div className="text-sm">{vuelo.destino}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Detalles del vuelo de ida */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Plane className="w-5 h-5 mr-2" />
                    Vuelo de Ida
                  </h3>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{vuelo.horaSalida}</div>
                        <div className="text-sm text-muted-foreground">{vuelo.codigoOrigen}</div>
                        <div className="text-xs text-muted-foreground">{vuelo.origen}</div>
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="flex items-center justify-center">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <div className="flex-1 h-0.5 bg-primary mx-2"></div>
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        </div>
                        <div className="text-center text-sm text-muted-foreground mt-2">
                          {vuelo.duracion}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{vuelo.horaLlegada}</div>
                        <div className="text-sm text-muted-foreground">{vuelo.codigoDestino}</div>
                        <div className="text-xs text-muted-foreground">{vuelo.destino}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                      <span>Fecha: {vuelo.fechaSalida}</span>
                      <span>Tipo: {vuelo.tipo === 'directo' ? 'Directo' : 'Con escalas'}</span>
                      <span>Equipaje: {renderEquipaje(vuelo.equipaje)}</span>
                    </div>
                  </div>
                </div>

                {/* Detalles del vuelo de vuelta (si aplica) */}
                {vuelo.tipoVuelo === 'ida-vuelta' && vuelo.horariosVuelta && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Plane className="w-5 h-5 mr-2 rotate-180" />
                      Vuelo de Vuelta
                    </h3>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{vuelo.horariosVuelta.horaSalida}</div>
                          <div className="text-sm text-muted-foreground">{vuelo.codigoDestino}</div>
                          <div className="text-xs text-muted-foreground">{vuelo.destino}</div>
                        </div>
                        <div className="flex-1 mx-4">
                          <div className="flex items-center justify-center">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <div className="flex-1 h-0.5 bg-primary mx-2"></div>
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          </div>
                          <div className="text-center text-sm text-muted-foreground mt-2">
                            {vuelo.horariosVuelta.duracion}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{vuelo.horariosVuelta.horaLlegada}</div>
                          <div className="text-sm text-muted-foreground">{vuelo.codigoOrigen}</div>
                          <div className="text-xs text-muted-foreground">{vuelo.origen}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                        <span>Fecha: {vuelo.fechaLlegada}</span>
                        <span>Tipo: Directo</span>
                        <span>Equipaje: {renderEquipaje(vuelo.equipaje)}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Servicios incluidos */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Servicios Incluidos</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {vuelo.servicios.map((servicio, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{servicio}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Políticas del vuelo */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Políticas del Vuelo</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm font-medium">Cancelación</span>
                      <span className="text-sm text-muted-foreground">{vuelo.politicas.cancelacion}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm font-medium">Cambio de fecha</span>
                      <span className="text-sm text-muted-foreground">{vuelo.politicas.cambio}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm font-medium">Equipaje</span>
                      <span className="text-sm text-muted-foreground">{vuelo.politicas.equipaje}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm font-medium">Check-in</span>
                      <span className="text-sm text-muted-foreground">{vuelo.politicas.checkIn}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar de reserva y contacto */}
          <div className="space-y-6">
            {/* Tarjeta de reserva */}
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl">Reservar Vuelo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Información de pasajeros */}
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium">Pasajeros:</span>
                  <span className="text-sm text-muted-foreground">{pasajeros} adulto{pasajeros > 1 ? 's' : ''}</span>
                </div>

                {/* Información de clase */}
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium">Clase:</span>
                  <span className="text-sm text-muted-foreground capitalize">{clase}</span>
                </div>

                {/* Asientos disponibles */}
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium">Asientos disponibles:</span>
                  <span className="text-sm text-muted-foreground">{vuelo.asientosDisponibles}</span>
                </div>

                {/* Precio total */}
                <div className="pt-4 border-t border-border">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Precio por adulto:</span>
                      <span>US$ {vuelo.precio}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Impuestos y cargos:</span>
                      <span>US$ {vuelo.impuestos}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Precio final:</span>
                      <span className="text-2xl text-primary">US$ {vuelo.precioFinal}</span>
                    </div>
                  </div>
                </div>

                {/* Botón de pago */}
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handlePayment}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pagar Ahora
                </Button>

                {/* Información de seguridad */}
                <div className="text-center text-xs text-muted-foreground">
                  <div className="flex items-center justify-center mb-1">
                    <Shield className="w-3 h-3 mr-1" />
                    Pago seguro
                  </div>
                  <p>Cancelación gratuita hasta 24h antes</p>
                </div>
              </CardContent>
            </Card>

            {/* Información de contacto */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* WhatsApp */}
                <Button 
                  variant="outline" 
                  className="w-full bg-green-500 text-white hover:bg-green-600 border-green-500"
                  onClick={handleWhatsAppContact}
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Contactar por WhatsApp
                </Button>

                {/* Teléfono */}
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">+51 999 999 999</span>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">reservas@aerolinea.com</span>
                </div>

                {/* Sitio web */}
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">www.aerolinea.com</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
