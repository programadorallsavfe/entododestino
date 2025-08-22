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
  Eye,
  ChevronRight,
  Award,
  Clock3,
  Zap,
  Sparkles
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
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [showAllAmenities, setShowAllAmenities] = useState(false)

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
          "Tours organizados",
          "Bar lounge",
          "Sala de conferencias",
          "Servicio de lavandería",
          "Caja fuerte",
          "Aire acondicionado"
        ],
        images: [
          "/assets/banner.jpg",
          "/assets/banner.jpg",
          "/assets/banner.jpg",
          "/assets/banner.jpg"
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

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: hotel?.name,
        text: `Mira este increíble hotel: ${hotel?.name}`,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Enlace copiado al portapapeles')
    }
  }

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-primary/20 rounded-full animate-ping"></div>
          </div>
          <p className="text-muted-foreground text-lg">Cargando detalles del hotel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header con navegación mejorado */}
      <div className="bg-white/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-40 transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => window.history.back()}
              className="hover:bg-primary/10 hover:text-primary transition-all duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Volver
            </Button>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={toggleFavorite}
                className={`hover:scale-110 transition-all duration-200 ${
                  isFavorite ? 'text-red-500 hover:text-red-600' : 'hover:text-red-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleShare}
                className="hover:scale-110 hover:text-primary transition-all duration-200"
              >
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
            {/* Imágenes del hotel mejoradas */}
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative group">
                  <img
                    src={hotel.images[activeImageIndex] || "/assets/banner.jpg"}
                    alt={`${hotel.name} - Vista panorámica`}
                    className="w-full h-96 object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Indicadores de imagen */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {hotel.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          index === activeImageIndex 
                            ? 'bg-white scale-125' 
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="absolute top-4 right-4">
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="bg-white/90 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                    >
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Ver más fotos
                    </Button>
                  </div>
                  
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="secondary" className="bg-white/90 text-foreground shadow-lg">
                      <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                      {hotel.rating} - {hotel.city}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Galería de imágenes mejorada */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <ImageIcon className="w-5 h-5 mr-2 text-primary" />
                  Galería de Imágenes
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {hotel.images.map((_, index) => (
                    <div 
                      key={index} 
                      className="relative group cursor-pointer overflow-hidden rounded-lg"
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <img
                        src="/assets/banner.jpg"
                        alt={`${hotel.name} - Vista ${index + 1}`}
                        className="w-full h-28 object-cover transition-all duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                        <Eye className="w-6 h-6 text-white transform scale-75 group-hover:scale-100 transition-transform duration-200" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Información básica mejorada */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Award className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                          {hotel.name}
                        </CardTitle>
                        <div className="flex items-center space-x-2 mt-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-5 h-5 ${
                                  i < Math.floor(hotel.rating) 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`} 
                              />
                            ))}
                          </div>
                          <span className="text-lg font-semibold text-muted-foreground">
                            {hotel.rating}
                          </span>
                          <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Excelente
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-muted-foreground bg-muted/30 px-3 py-2 rounded-lg">
                      <MapPin className="w-4 h-4 mr-2 text-primary" />
                      <span>{hotel.address}, {hotel.city}, {hotel.country}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {hotel.description}
                </p>
                
                {/* Amenities mejorados */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-primary" />
                    Amenities
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {hotel.amenities.slice(0, showAllAmenities ? hotel.amenities.length : 9).map((amenity, index) => (
                      <div 
                        key={index} 
                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                  {hotel.amenities.length > 9 && (
                    <Button
                      variant="ghost"
                      onClick={() => setShowAllAmenities(!showAllAmenities)}
                      className="mt-3 text-primary hover:text-primary/80"
                    >
                      {showAllAmenities ? 'Ver menos' : `Ver ${hotel.amenities.length - 9} más`}
                      <ChevronRight className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                        showAllAmenities ? 'rotate-90' : ''
                      }`} />
                    </Button>
                  )}
                </div>

                {/* Políticas del hotel mejoradas */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Clock3 className="w-5 h-5 mr-2 text-primary" />
                    Políticas del Hotel
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: 'Check-in', value: hotel.policies.checkIn, icon: Clock },
                      { label: 'Check-out', value: hotel.policies.checkOut, icon: Clock },
                      { label: 'Cancelación', value: hotel.policies.cancellation, icon: Shield },
                      { label: 'Niños', value: hotel.policies.children ? 'Permitidos' : 'No permitidos', icon: Users }
                    ].map((policy, index) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-muted/30 to-muted/50 rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-200"
                      >
                        <div className="flex items-center space-x-2">
                          <policy.icon className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">{policy.label}</span>
                        </div>
                        <span className="text-sm text-muted-foreground font-medium">{policy.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tipos de habitaciones mejorados */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Bed className="w-5 h-5 mr-2 text-primary" />
                    Tipos de Habitaciones
                  </h3>
                  <div className="space-y-4">
                    {hotel.rooms.map((room) => (
                      <div 
                        key={room.id} 
                        className="border border-border rounded-lg p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-white to-muted/20"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg mb-2">{room.type}</h4>
                            <p className="text-muted-foreground mb-3">{room.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {room.amenities.map((amenity, index) => (
                                <Badge key={index} variant="outline" className="text-xs bg-primary/5 border-primary/20 text-primary">
                                  {amenity}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Badge variant="secondary" className="ml-4 bg-blue-50 text-blue-700 border-blue-200">
                            <Users className="w-3 h-3 mr-1" />
                            {room.capacity} personas
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">
                              S/ {room.basePrice}
                            </div>
                            <div className="text-xs text-muted-foreground">por noche</div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200"
                          >
                            Ver detalles
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar de reserva mejorado */}
          <div className="space-y-6">
            {/* Tarjeta de reserva mejorada */}
            <Card className="shadow-xl border-primary/20 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-primary" />
                  Reservar Ahora
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  ¡Reserva tu estadía perfecta en {hotel.name}!
                </p>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Selección de fechas mejorada */}
                <div className="space-y-2">
                  <Label htmlFor="dates" className="text-sm font-medium flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-2 text-primary" />
                    Fechas de estadía
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal hover:border-primary hover:bg-primary/5 transition-all duration-200"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
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
                          <span className="text-muted-foreground">Seleccionar fechas</span>
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

                {/* Selección de habitaciones mejorada */}
                <div className="space-y-2">
                  <Label htmlFor="rooms" className="text-sm font-medium flex items-center">
                    <Bed className="w-4 h-4 mr-2 text-primary" />
                    Número de habitaciones
                  </Label>
                  <Select 
                    value={bookingData.rooms.toString()} 
                    onValueChange={(value) => setBookingData(prev => ({ ...prev, rooms: parseInt(value) }))}
                  >
                    <SelectTrigger className="hover:border-primary hover:bg-primary/5 transition-all duration-200">
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

                {/* Selección de huéspedes mejorada */}
                <div className="space-y-2">
                  <Label htmlFor="guests" className="text-sm font-medium flex items-center">
                    <Users className="w-4 h-4 mr-2 text-primary" />
                    Número de huéspedes
                  </Label>
                  <Select 
                    value={bookingData.guests.toString()} 
                    onValueChange={(value) => setBookingData(prev => ({ ...prev, guests: parseInt(value) }))}
                  >
                    <SelectTrigger className="hover:border-primary hover:bg-primary/5 transition-all duration-200">
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

                {/* Selección de tipo de habitación mejorada */}
                <div className="space-y-2">
                  <Label htmlFor="roomType" className="text-sm font-medium flex items-center">
                    <Bed className="w-4 h-4 mr-2 text-primary" />
                    Tipo de habitación
                  </Label>
                  <Select 
                    value={bookingData.roomType} 
                    onValueChange={(value) => setBookingData(prev => ({ ...prev, roomType: value }))}
                  >
                    <SelectTrigger className="hover:border-primary hover:bg-primary/5 transition-all duration-200">
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

                {/* Precio total mejorado */}
                {selectedDates.from && selectedDates.to && bookingData.totalPrice > 0 && (
                  <div className="pt-4 border-t border-border/50 bg-gradient-to-r from-primary/5 to-blue-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-muted-foreground">Precio total:</span>
                      <span className="text-2xl font-bold text-primary">
                        S/ {bookingData.totalPrice}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground text-center">
                      {differenceInDays(selectedDates.to, selectedDates.from)} noche{differenceInDays(selectedDates.to, selectedDates.from) > 1 ? 's' : ''}
                    </div>
                  </div>
                )}

                {/* Botón de reserva mejorado */}
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200" 
                  size="lg"
                  onClick={handleBooking}
                  disabled={!selectedDates.from || !selectedDates.to || !bookingData.roomType}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Reservar Ahora
                </Button>

                {/* Información de seguridad mejorada */}
                <div className="text-center text-xs text-muted-foreground bg-muted/30 rounded-lg p-3">
                  <div className="flex items-center justify-center mb-2">
                    <Shield className="w-4 h-4 mr-1 text-green-500" />
                    <span className="font-medium text-green-600">Reserva segura</span>
                  </div>
                  <p className="text-muted-foreground">Cancelación gratuita hasta 24h antes</p>
                </div>
              </CardContent>
            </Card>

            {/* Información de contacto mejorada */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-primary" />
                  Contacto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { icon: Phone, value: hotel.contact.phone, label: 'Teléfono' },
                  { icon: Mail, value: hotel.contact.email, label: 'Email' },
                  { icon: Globe, value: hotel.contact.website, label: 'Website' }
                ].map((contact, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200 cursor-pointer group"
                  >
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-200">
                      <contact.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground">{contact.label}</div>
                      <div className="text-sm font-medium">{contact.value}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tarifas por fecha mejoradas */}
        <div className="mt-12">
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <CalendarIcon className="w-6 h-6 mr-2 text-primary" />
                Tarifas por Fecha
              </CardTitle>
              <p className="text-muted-foreground">
                Selecciona fechas para ver precios específicos y mejores ofertas
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
                        <div 
                          key={room.id} 
                          className="border border-border rounded-lg p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-white to-muted/20"
                        >
                          <h4 className="font-semibold mb-3 text-lg">{room.type}</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Precio por noche:</span>
                              <span className="font-medium">S/ {room.basePrice}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Noches:</span>
                              <span className="font-medium">{nights}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-semibold text-lg">
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
                <div className="text-center py-12 text-muted-foreground">
                  <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CalendarIcon className="w-8 h-8 text-muted-foreground/50" />
                  </div>
                  <p className="text-lg">Selecciona fechas para ver las tarifas disponibles</p>
                  <p className="text-sm mt-2">Obtén los mejores precios y ofertas especiales</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
