"use client"

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  MapPin, 
  Star, 
  Users, 
  Bed, 
  Wifi, 
  Car, 
  Utensils, 
  Dumbbell, 
  Calendar as CalendarIcon,
  Clock,
  Phone,
  Mail,
  Globe,
  CheckCircle,
  XCircle,
  Info,
  CreditCard,
  Shield,
  ArrowLeft,
  Heart,
  Share2,
  Image as ImageIcon,
  Eye
} from 'lucide-react'
import { format, addDays, differenceInDays } from 'date-fns'
import { es } from 'date-fns/locale'

interface HotelDetails {
  id: string
  name: string
  description: string
  rating: number
  address: string
  city: string
  country: string
  amenities: string[]
  images: string[]
  contact: {
    phone: string
    email: string
    website: string
  }
  policies: {
    checkIn: string
    checkOut: string
    cancellation: string
    children: boolean
    pets: boolean
    smoking: boolean
  }
  rooms: {
    id: string
    type: string
    description: string
    capacity: number
    amenities: string[]
    basePrice: number
  }[]
}

interface Tarifa {
  date: string
  price: number
  available: boolean
  roomType: string
}

export function DetallesAlojamientosContent() {
  const [hotel, setHotel] = useState<HotelDetails | null>(null)
  const [selectedDates, setSelectedDates] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined
  })
  const [tarifas, setTarifas] = useState<Tarifa[]>([])
  const [bookingData, setBookingData] = useState({
    rooms: 1,
    guests: 1,
    roomType: '',
    totalPrice: 0
  })
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  const searchParams = useSearchParams()
  const hotelId = searchParams.get('id')

  // Datos simulados del hotel
  useEffect(() => {
    if (hotelId) {
      const mockHotel: HotelDetails = {
        id: hotelId,
        name: "Hotel Cusco Imperial",
        description: "Un lujoso hotel ubicado en el corazón del Cusco histórico, a solo 5 minutos de la Plaza de Armas. Ofrece vistas espectaculares de la ciudad y las montañas andinas, combinando la elegancia colonial con comodidades modernas.",
        rating: 4.8,
        address: "Calle San Agustín 123",
        city: "Cusco",
        country: "Perú",
        amenities: [
          "WiFi gratuito",
          "Estacionamiento",
          "Restaurante",
          "Gimnasio",
          "Piscina",
          "Spa",
          "Servicio de habitación",
          "Concierge 24/7",
          "Transfer al aeropuerto",
          "Tours organizados"
        ],
        images: [
          "/assets/hotel-1.jpg",
          "/assets/hotel-2.jpg",
          "/assets/hotel-3.jpg"
        ],
        contact: {
          phone: "+51 84 123 456",
          email: "reservas@cuscoimperial.com",
          website: "www.cuscoimperial.com"
        },
        policies: {
          checkIn: "15:00",
          checkOut: "11:00",
          cancellation: "Gratuita hasta 24h antes",
          children: true,
          pets: false,
          smoking: false
        },
        rooms: [
          {
            id: "1",
            type: "Habitación Estándar",
            description: "Habitación confortable con vista a la ciudad",
            capacity: 2,
            amenities: ["TV", "WiFi", "Baño privado", "Closet"],
            basePrice: 120
          },
          {
            id: "2",
            type: "Habitación Superior",
            description: "Habitación amplia con vista a las montañas",
            capacity: 3,
            amenities: ["TV", "WiFi", "Baño privado", "Closet", "Balcón"],
            basePrice: 180
          },
          {
            id: "3",
            type: "Suite Ejecutiva",
            description: "Suite de lujo con sala de estar separada",
            capacity: 4,
            amenities: ["TV", "WiFi", "Baño privado", "Closet", "Balcón", "Sala de estar", "Minibar"],
            basePrice: 280
          }
        ]
      }
      setHotel(mockHotel)
      
      // Generar tarifas simuladas
      generateMockTarifas(mockHotel)
    }
  }, [hotelId])

  const generateMockTarifas = (hotelData: HotelDetails) => {
    const mockTarifas: Tarifa[] = []
    const today = new Date()
    
    for (let i = 0; i < 30; i++) {
      const date = addDays(today, i)
      const isWeekend = date.getDay() === 0 || date.getDay() === 6
      const isHighSeason = i >= 15 && i <= 25 // Simular temporada alta
      
      hotelData.rooms.forEach(room => {
        let price = room.basePrice
        if (isWeekend) price += 20
        if (isHighSeason) price += 50
        
        mockTarifas.push({
          date: format(date, 'yyyy-MM-dd'),
          price: price,
          available: Math.random() > 0.1, // 90% de disponibilidad
          roomType: room.type
        })
      })
    }
    
    setTarifas(mockTarifas)
  }

  const handleDateSelect = (from: Date | undefined, to: Date | undefined) => {
    setSelectedDates({ from, to })
    if (from && to) {
      calculateTotalPrice(from, to)
    }
  }

  const calculateTotalPrice = (from: Date, to: Date) => {
    if (!hotel) return
    
    const nights = differenceInDays(to, from)
    const selectedRoom = hotel.rooms.find(r => r.type === bookingData.roomType)
    
    if (selectedRoom) {
      const totalPrice = selectedRoom.basePrice * nights * bookingData.rooms
      setBookingData(prev => ({ ...prev, totalPrice }))
    }
  }

  const handleBooking = () => {
    if (!selectedDates.from || !selectedDates.to || !bookingData.roomType) {
      alert('Por favor complete todos los campos')
      return
    }
    
    // Aquí iría la lógica de reserva
    console.log('Reserva:', {
      hotel: hotel?.name,
      dates: selectedDates,
      booking: bookingData
    })
    
    setIsBookingModalOpen(true)
  }

  if (!hotel) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando detalles del hotel...</p>
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
        {/* Información principal del hotel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Imágenes del hotel */}
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src="/assets/banner.jpg"
                    alt={`${hotel.name} - Vista panorámica`}
                    className="w-full h-96 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 right-4">
                    <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white">
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Ver más fotos
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="secondary" className="bg-white/90 text-foreground">
                      <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                      {hotel.rating} - {hotel.city}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Galería de imágenes adicionales */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">Galería de Imágenes</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[1, 2, 3, 4].map((index) => (
                    <div key={index} className="relative group cursor-pointer">
                      <img
                        src="/assets/banner.jpg"
                        alt={`${hotel.name} - Vista ${index}`}
                        className="w-full h-24 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                        <Eye className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Información básica */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl font-bold mb-2">{hotel.name}</CardTitle>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-5 h-5 ${i < Math.floor(hotel.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-lg font-semibold text-muted-foreground">{hotel.rating}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{hotel.address}, {hotel.city}, {hotel.country}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {hotel.description}
                </p>
                
                {/* Amenities */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {hotel.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Políticas del hotel */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Políticas del Hotel</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm font-medium">Check-in</span>
                      <span className="text-sm text-muted-foreground">{hotel.policies.checkIn}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm font-medium">Check-out</span>
                      <span className="text-sm text-muted-foreground">{hotel.policies.checkOut}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm font-medium">Cancelación</span>
                      <span className="text-sm text-muted-foreground">{hotel.policies.cancellation}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm font-medium">Niños</span>
                      <span className="text-sm text-muted-foreground">
                        {hotel.policies.children ? 'Permitidos' : 'No permitidos'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tipos de habitaciones */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Tipos de Habitaciones</h3>
                  <div className="space-y-4">
                    {hotel.rooms.map((room) => (
                      <div key={room.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold">{room.type}</h4>
                            <p className="text-sm text-muted-foreground">{room.description}</p>
                          </div>
                          <Badge variant="secondary">
                            <Users className="w-3 h-3 mr-1" />
                            {room.capacity} personas
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {room.amenities.map((amenity, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary">
                              S/ {room.basePrice}
                            </div>
                            <div className="text-xs text-muted-foreground">por noche</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar de reserva */}
          <div className="space-y-6">
            {/* Tarjeta de reserva */}
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl">Reservar Ahora</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Selección de fechas */}
                <div>
                  <Label htmlFor="dates">Fechas de estadía</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDates.from ? (
                          selectedDates.to ? (
                            <>
                              {format(selectedDates.from, "LLL dd, y", { locale: es })} -{" "}
                              {format(selectedDates.to, "LLL dd, y", { locale: es })}
                            </>
                          ) : (
                            format(selectedDates.from, "LLL dd, y", { locale: es })
                          )
                        ) : (
                          <span>Seleccionar fechas</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={selectedDates.from}
                        selected={selectedDates}
                        onSelect={(range) => handleDateSelect(range?.from, range?.to)}
                        numberOfMonths={2}
                        locale={es}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Selección de habitaciones */}
                <div>
                  <Label htmlFor="rooms">Número de habitaciones</Label>
                  <Select 
                    value={bookingData.rooms.toString()} 
                    onValueChange={(value) => setBookingData(prev => ({ ...prev, rooms: parseInt(value) }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map(num => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} habitación{num > 1 ? 'es' : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Selección de huéspedes */}
                <div>
                  <Label htmlFor="guests">Número de huéspedes</Label>
                  <Select 
                    value={bookingData.guests.toString()} 
                    onValueChange={(value) => setBookingData(prev => ({ ...prev, guests: parseInt(value) }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} huésped{num > 1 ? 'es' : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Selección de tipo de habitación */}
                <div>
                  <Label htmlFor="roomType">Tipo de habitación</Label>
                  <Select 
                    value={bookingData.roomType} 
                    onValueChange={(value) => setBookingData(prev => ({ ...prev, roomType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {hotel.rooms.map((room) => (
                        <SelectItem key={room.id} value={room.type}>
                          {room.type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Precio total */}
                {selectedDates.from && selectedDates.to && bookingData.totalPrice > 0 && (
                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Precio total:</span>
                      <span className="text-2xl font-bold text-primary">
                        S/ {bookingData.totalPrice}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {differenceInDays(selectedDates.to, selectedDates.from)} noche{differenceInDays(selectedDates.to, selectedDates.from) > 1 ? 's' : ''}
                    </div>
                  </div>
                )}

                {/* Botón de reserva */}
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleBooking}
                  disabled={!selectedDates.from || !selectedDates.to || !bookingData.roomType}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Reservar Ahora
                </Button>

                {/* Información de seguridad */}
                <div className="text-center text-xs text-muted-foreground">
                  <div className="flex items-center justify-center mb-1">
                    <Shield className="w-3 h-3 mr-1" />
                    Reserva segura
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
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{hotel.contact.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{hotel.contact.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{hotel.contact.website}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tarifas por fecha */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Tarifas por Fecha</CardTitle>
              <p className="text-muted-foreground">
                Selecciona fechas para ver precios específicos
              </p>
            </CardHeader>
            <CardContent>
              {selectedDates.from && selectedDates.to ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {hotel.rooms.map((room) => {
                      const nights = differenceInDays(selectedDates.to!, selectedDates.from!)
                      const totalPrice = room.basePrice * nights
                      
                      return (
                        <div key={room.id} className="border border-border rounded-lg p-4">
                          <h4 className="font-semibold mb-2">{room.type}</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Precio por noche:</span>
                              <span>S/ {room.basePrice}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Noches:</span>
                              <span>{nights}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-semibold">
                              <span>Total:</span>
                              <span className="text-primary">S/ {totalPrice}</span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p>Selecciona fechas para ver las tarifas disponibles</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
