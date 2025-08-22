"use client"

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  CreditCard, 
  Building, 
  DollarSign, 
  Plane, 
  Hotel, 
  MapPin, 
  Calendar, 
  Users, 
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Shield,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react'

interface DatosCliente {
  nombre: string
  email: string
  dni: string
  telefono: string
}

interface DatosPago {
  numeroTarjeta: string
  nombreTitular: string
  fechaVencimiento: string
  cvv: string
  tipoTarjeta: 'visa' | 'mastercard' | 'amex' | 'otro'
}

interface PaqueteData {
  id: string
  nombre: string
  precio: number
  personas: number
  fechaInicio: string
  fechaFin: string
  origen: string
  destino: string
  aerolinea: string
  tipoVuelo: string
}

export default function ProcederPagoPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [datosCliente, setDatosCliente] = useState<DatosCliente>({
    nombre: '',
    email: '',
    dni: '',
    telefono: ''
  })
  
  const [datosPago, setDatosPago] = useState<DatosPago>({
    numeroTarjeta: '',
    nombreTitular: '',
    fechaVencimiento: '',
    cvv: '',
    tipoTarjeta: 'visa'
  })
  
  const [metodoPago, setMetodoPago] = useState<'tarjeta' | 'transferencia' | 'efectivo'>('tarjeta')
  const [mostrarCVV, setMostrarCVV] = useState(false)
  const [procesandoPago, setProcesandoPago] = useState(false)
  const [pagoExitoso, setPagoExitoso] = useState(false)
  
  // Obtener datos del paquete desde los parámetros de URL
  const paqueteData: PaqueteData = {
    id: searchParams.get('paqueteId') || '1',
    nombre: searchParams.get('nombre') || 'Paquete Turístico',
    precio: parseInt(searchParams.get('precio') || '0'),
    personas: parseInt(searchParams.get('personas') || '2'),
    fechaInicio: searchParams.get('fechaInicio') || '23 ago 2025',
    fechaFin: searchParams.get('fechaFin') || '1 sep 2025',
    origen: searchParams.get('origen') || 'Lima',
    destino: searchParams.get('destino') || 'Buenos Aires',
    aerolinea: searchParams.get('aerolinea') || 'SKY',
    tipoVuelo: searchParams.get('tipoVuelo') || 'con-escalas'
  }

  const precioTotal = paqueteData.precio * paqueteData.personas
  const impuestos = precioTotal * 0.18 // 18% de impuestos
  const totalFinal = precioTotal + impuestos

  const handleInputChange = (campo: keyof DatosCliente, valor: string) => {
    setDatosCliente(prev => ({ ...prev, [campo]: valor }))
  }

  const handlePagoChange = (campo: keyof DatosPago, valor: string) => {
    setDatosPago(prev => ({ ...prev, [campo]: valor }))
  }

  const validarFormulario = () => {
    return datosCliente.nombre && 
           datosCliente.email && 
           datosCliente.dni && 
           datosCliente.telefono &&
           (metodoPago !== 'tarjeta' || 
            (datosPago.numeroTarjeta && 
             datosPago.nombreTitular && 
             datosPago.fechaVencimiento && 
             datosPago.cvv))
  }

  const procesarPago = async () => {
    if (!validarFormulario()) return
    
    setProcesandoPago(true)
    
    // Simular procesamiento de pago
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setProcesandoPago(false)
    setPagoExitoso(true)
    
    // Redirigir después de 3 segundos
    setTimeout(() => {
      router.push('/administradores/lista-paquetes')
    }, 3000)
  }

  const volverAtras = () => {
    router.back()
  }

  if (pagoExitoso) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">¡Pago Exitoso!</h2>
            <p className="text-green-600 mb-4">
              El pago ha sido procesado correctamente. Se ha enviado una confirmación al correo del cliente.
            </p>
            <div className="text-sm text-muted-foreground">
              Redirigiendo en unos segundos...
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={volverAtras}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Proceder al Pago</h1>
              <p className="text-primary-foreground/90">Complete el proceso de reserva</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna Principal - Formularios */}
          <div className="lg:col-span-2 space-y-6">
            {/* Datos del Cliente */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Datos del Cliente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nombre">Nombre Completo *</Label>
                    <Input
                      id="nombre"
                      value={datosCliente.nombre}
                      onChange={(e) => handleInputChange('nombre', e.target.value)}
                      placeholder="Nombre y apellidos"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Correo Electrónico *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={datosCliente.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="correo@ejemplo.com"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dni">DNI/Identificación *</Label>
                    <Input
                      id="dni"
                      value={datosCliente.dni}
                      onChange={(e) => handleInputChange('dni', e.target.value)}
                      placeholder="12345678"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefono">Teléfono *</Label>
                    <Input
                      id="telefono"
                      value={datosCliente.telefono}
                      onChange={(e) => handleInputChange('telefono', e.target.value)}
                      placeholder="+51 999 999 999"
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Métodos de Pago */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Método de Pago
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={metodoPago} onValueChange={(value) => setMetodoPago(value as any)}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="tarjeta">Tarjeta</TabsTrigger>
                    <TabsTrigger value="transferencia">Transferencia</TabsTrigger>
                    <TabsTrigger value="efectivo">Efectivo</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="tarjeta" className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="numeroTarjeta">Número de Tarjeta *</Label>
                        <Input
                          id="numeroTarjeta"
                          value={datosPago.numeroTarjeta}
                          onChange={(e) => handlePagoChange('numeroTarjeta', e.target.value)}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="nombreTitular">Nombre del Titular *</Label>
                        <Input
                          id="nombreTitular"
                          value={datosPago.nombreTitular}
                          onChange={(e) => handlePagoChange('nombreTitular', e.target.value)}
                          placeholder="Como aparece en la tarjeta"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="fechaVencimiento">Fecha de Vencimiento *</Label>
                        <Input
                          id="fechaVencimiento"
                          value={datosPago.fechaVencimiento}
                          onChange={(e) => handlePagoChange('fechaVencimiento', e.target.value)}
                          placeholder="MM/AA"
                          maxLength={5}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV *</Label>
                        <div className="relative mt-1">
                          <Input
                            id="cvv"
                            type={mostrarCVV ? 'text' : 'password'}
                            value={datosPago.cvv}
                            onChange={(e) => handlePagoChange('cvv', e.target.value)}
                            placeholder="123"
                            maxLength={4}
                            className="pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setMostrarCVV(!mostrarCVV)}
                          >
                            {mostrarCVV ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="w-4 h-4" />
                      <span>Tu información está protegida con encriptación SSL</span>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="transferencia" className="mt-4">
                    <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                      <h4 className="font-medium">Datos Bancarios</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Banco:</span>
                          <span className="font-medium">Banco de Crédito del Perú</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cuenta Corriente:</span>
                          <span className="font-medium">193-12345678-0-12</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Titular:</span>
                          <span className="font-medium">TURISMO PERU S.A.C.</span>
                        </div>
                        <div className="flex justify-between">
                          <span>CCI:</span>
                          <span className="font-medium">002-193-000123456789-12</span>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Envíe el comprobante de transferencia a: pagos@turismoperu.com
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="efectivo" className="mt-4">
                    <div className="bg-muted/30 rounded-lg p-4 text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <DollarSign className="w-6 h-6 text-green-600" />
                      </div>
                      <h4 className="font-medium mb-2">Pago en Efectivo</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Puede realizar el pago en nuestras oficinas o con nuestros representantes autorizados.
                      </p>
                      <div className="text-xs text-muted-foreground">
                        Horario de atención: Lunes a Viernes 9:00 AM - 6:00 PM
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Resumen y Total */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Resumen del Paquete */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plane className="w-5 h-5 text-primary" />
                    Resumen del Viaje
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Hotel className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{paqueteData.nombre}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{paqueteData.origen} → {paqueteData.destino}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{paqueteData.fechaInicio} - {paqueteData.fechaFin}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{paqueteData.personas} persona{paqueteData.personas > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{paqueteData.aerolinea}</span>
                      <Badge variant="secondary" className="text-xs">
                        {paqueteData.tipoVuelo}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Resumen de Precios */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    Resumen de Precios
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Precio por persona:</span>
                      <span>US$ {paqueteData.precio}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total ({paqueteData.personas} personas):</span>
                      <span>US$ {precioTotal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Impuestos y cargos:</span>
                      <span>US$ {impuestos.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total Final:</span>
                      <span className="text-primary">US$ {totalFinal.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg"
                    onClick={procesarPago}
                    disabled={!validarFormulario() || procesandoPago}
                  >
                    {procesandoPago ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Procesando Pago...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Confirmar Pago
                      </>
                    )}
                  </Button>
                  
                  <div className="text-xs text-muted-foreground text-center">
                    Al confirmar, acepta nuestros términos y condiciones
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}