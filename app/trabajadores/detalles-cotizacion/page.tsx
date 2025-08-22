"use client";

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Plane, 
  Hotel, 
  Clock,
  DollarSign,
  ArrowRight,
  FileText,
  Building,
  Star,
  Globe,
  Check,
  CreditCard,
  MessageCircle,
  Download,
  Phone,
  Mail,
  Navigation,
  Route,
  Compass,
  Car,
  Train,
  Ship,
  Wifi,
  Utensils,
  Camera,
  Shield,
  Gift,
  Award,
  Clock3,
  Map,
  TrendingUp,
  Zap,
  Heart,
  Home
} from 'lucide-react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { SimpleMap } from '@/app/clientes/components/SimpleMap';

interface Destination {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'start' | 'destination' | 'end';
  nights?: number;
  transportIncluded?: boolean;
  accommodationIncluded?: boolean;
  image?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  transportType?: 'plane' | 'car' | 'train' | 'ship';
  accommodationType?: 'hotel' | 'resort' | 'hostel' | 'apartment';
  activities?: string[];
  highlights?: string[];
}

interface ItinerarioData {
  destinations: Destination[];
  fechaInicio: string;
  fechaFin: string;
  duracion: number;
  personas: number;
  serviciosIncluidos: string[];
  precioTotal: number;
  precioDescuento: number;
  transportDetails?: {
    type: string;
    provider: string;
    duration: string;
    class: string;
  }[];
  accommodationDetails?: {
    name: string;
    rating: number;
    amenities: string[];
    roomType: string;
  }[];
  insurance?: {
    included: boolean;
    type: string;
    coverage: string;
  };
  cancellationPolicy?: string;
  specialOffers?: string[];
}

// Componente de carga mejorado
const LoadingComponent = () => (
  <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center">
    <div className="text-center space-y-6">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary/20 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
      <div className="space-y-2">
        <p className="text-lg font-semibold text-foreground">Preparando tu viaje</p>
        <p className="text-sm text-muted-foreground">Cargando todos los detalles del itinerario...</p>
      </div>
    </div>
  </div>
);

// Componente principal que usa useSearchParams
const DetallesCotizacionContent = () => {
  const searchParams = useSearchParams();
  const [itinerarioData, setItinerarioData] = useState<ItinerarioData | null>(null);
  const [currentStep, setCurrentStep] = useState<'resumen' | 'datos-cliente' | 'confirmacion' | 'exportacion'>('resumen');
  const [isCallDrawerOpen, setIsCallDrawerOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('+51 ');

  // Función para agregar un número al marcador
  const handleAddNumber = (digit: string) => {
    setPhoneNumber(prev => prev + digit);
  };

  // Función para eliminar el último número
  const handleDeleteNumber = () => {
    setPhoneNumber(prev => {
      if (prev.length <= 4) return '+51 ';
      return prev.slice(0, -1);
    });
  };

  // Función para limpiar todo el número
  const handleClearNumber = () => {
    setPhoneNumber('+51 ');
  };

  // Resetear número cuando se abre el drawer
  useEffect(() => {
    if (isCallDrawerOpen) {
      setPhoneNumber('+51 ');
    }
  }, [isCallDrawerOpen]);

  // Función para iniciar llamada telefónica
  const handleCall = (phoneNumberToCall: string) => {
    try {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        window.location.href = `tel:${phoneNumberToCall}`;
      } else {
        navigator.clipboard.writeText(phoneNumberToCall);
        console.log(`Número ${phoneNumberToCall} copiado al portapapeles`);
      }
    } catch (error) {
      console.log('Error al procesar la llamada:', error);
    }
  };

  useEffect(() => {
    // Obtener datos del localStorage o de los parámetros de URL
    const storedData = localStorage.getItem('itinerarioConfigurado');
    const cotizacionData = localStorage.getItem('cotizacionData');
    
    if (storedData) {
      setItinerarioData(JSON.parse(storedData));
    } else if (cotizacionData) {
      // Si hay datos de cotización general, convertirlos al formato de itinerario
      const data = JSON.parse(cotizacionData);
      const mockData: ItinerarioData = {
        destinations: [{
          id: 'dest-1',
          name: data.location || data.name,
          lat: -12.0464,
          lng: -77.0428,
          type: 'start',
          nights: data.nights || 2,
          transportIncluded: true,
          accommodationIncluded: data.type === 'hotel' || data.type === 'package',
          image: "/assets/banner.jpg",
          description: data.description,
          startDate: data.selectedDate || '08 sept 2025',
          endDate: data.selectedDate || '13 sept 2025',
          transportType: 'plane',
          accommodationType: 'hotel',
          activities: ['City Tour', 'Visita a museos', 'Gastronomía local'],
          highlights: ['Vistas panorámicas', 'Cultura local', 'Experiencia auténtica']
        }],
        fechaInicio: data.selectedDate || '08 Septiembre 2025',
        fechaFin: data.selectedDate || '13 Septiembre 2025',
        duracion: data.nights || 5,
        personas: data.guests?.adults || data.passengers?.adults || 2,
        serviciosIncluidos: data.amenities || ['Servicios básicos'],
        precioTotal: data.price || 299.99,
        precioDescuento: data.discountPrice || 249.99,
        transportDetails: [{
          type: 'Avión',
          provider: 'LATAM Airlines',
          duration: '1h 30m',
          class: 'Económica'
        }],
        accommodationDetails: [{
          name: 'Hotel Plaza Mayor',
          rating: 4.5,
          amenities: ['WiFi', 'Restaurante', 'Gimnasio', 'Piscina'],
          roomType: 'Habitación Superior'
        }],
        insurance: {
          included: true,
          type: 'Viaje Completo',
          coverage: 'Médico, equipaje, cancelación'
        },
        cancellationPolicy: 'Cancelación gratuita hasta 24h antes del viaje',
        specialOffers: ['Descuento por reserva anticipada', 'Traslado gratuito desde aeropuerto']
      };
      setItinerarioData(mockData);
    } else {
      // Si no hay datos en localStorage, crear datos simulados desde los parámetros
      const type = searchParams.get('type');
      if (type === 'multidestino') {
        const destinations = searchParams.get('destinations');
        const fechaInicio = searchParams.get('fechaInicio');
        const fechaFin = searchParams.get('fechaFin');
        const duracion = searchParams.get('duracion');
        const personas = searchParams.get('personas');
        const precioTotal = searchParams.get('precioTotal');
        const precioDescuento = searchParams.get('precioDescuento');

        if (destinations && fechaInicio && fechaFin) {
          const mockData: ItinerarioData = {
            destinations: JSON.parse(destinations),
            fechaInicio: fechaInicio,
            fechaFin: fechaFin,
            duracion: parseInt(duracion || '5'),
            personas: parseInt(personas || '2'),
            serviciosIncluidos: ['Hoteles', 'Tours', 'Visitas guiadas', 'Traslados', 'Alimentación'],
            precioTotal: parseFloat(precioTotal || '2899.99'),
            precioDescuento: parseFloat(precioDescuento || '2599.99'),
            transportDetails: [{
              type: 'Avión',
              provider: 'LATAM Airlines',
              duration: '1h 30m',
              class: 'Económica'
            }],
            accommodationDetails: [{
              name: 'Hotel Plaza Mayor',
              rating: 4.5,
              amenities: ['WiFi', 'Restaurante', 'Gimnasio', 'Piscina'],
              roomType: 'Habitación Superior'
            }],
            insurance: {
              included: true,
              type: 'Viaje Completo',
              coverage: 'Médico, equipaje, cancelación'
            },
            cancellationPolicy: 'Cancelación gratuita hasta 24h antes del viaje',
            specialOffers: ['Descuento por reserva anticipada', 'Traslado gratuito desde aeropuerto']
          };
          setItinerarioData(mockData);
        }
      } else if (type) {
        // Para otros tipos de servicios, crear datos simulados
        const data = searchParams.get('data');
        if (data) {
          const serviceData = JSON.parse(data);
          const mockData: ItinerarioData = {
            destinations: [{
              id: 'dest-1',
              name: serviceData.location || serviceData.name,
              lat: -12.0464,
              lng: -77.0428,
              type: 'start',
              nights: serviceData.nights || 2,
              transportIncluded: true,
              accommodationIncluded: serviceData.type === 'hotel' || serviceData.type === 'package',
              image: "/assets/banner.jpg",
              description: serviceData.description,
              startDate: serviceData.selectedDate || '08 sept 2025',
              endDate: serviceData.selectedDate || '13 sept 2025',
              transportType: 'plane',
              accommodationType: 'hotel',
              activities: ['City Tour', 'Visita a museos', 'Gastronomía local'],
              highlights: ['Vistas panorámicas', 'Cultura local', 'Experiencia auténtica']
            }],
            fechaInicio: serviceData.selectedDate || '08 Septiembre 2025',
            fechaFin: serviceData.selectedDate || '13 Septiembre 2025',
            duracion: serviceData.nights || 5,
            personas: serviceData.guests?.adults || serviceData.passengers?.adults || 2,
            serviciosIncluidos: serviceData.amenities || ['Servicios básicos'],
            precioTotal: serviceData.price || 299.99,
            precioDescuento: serviceData.discountPrice || 249.99,
            transportDetails: [{
              type: 'Avión',
              provider: 'LATAM Airlines',
              duration: '1h 30m',
              class: 'Económica'
            }],
            accommodationDetails: [{
              name: 'Hotel Plaza Mayor',
              rating: 4.5,
              amenities: ['WiFi', 'Restaurante', 'Gimnasio', 'Piscina'],
              roomType: 'Habitación Superior'
            }],
            insurance: {
              included: true,
              type: 'Viaje Completo',
              coverage: 'Médico, equipaje, cancelación'
            },
            cancellationPolicy: 'Cancelación gratuita hasta 24h antes del viaje',
            specialOffers: ['Descuento por reserva anticipada', 'Traslado gratuito desde aeropuerto']
          };
          setItinerarioData(mockData);
        }
      }
    }
  }, [searchParams]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTransportIcon = (type?: string) => {
    switch (type) {
      case 'plane': return <Plane className="w-5 h-5" />;
      case 'car': return <Car className="w-5 h-5" />;
      case 'train': return <Train className="w-5 h-5" />;
      case 'ship': return <Ship className="w-5 h-5" />;
      default: return <Navigation className="w-5 h-5" />;
    }
  };

  const getAccommodationIcon = (type?: string) => {
    switch (type) {
      case 'hotel': return <Building className="w-5 h-5" />;
      case 'resort': return <Star className="w-5 h-5" />;
      case 'hostel': return <Users className="w-5 h-5" />;
      case 'apartment': return <Home className="w-5 h-5" />;
      default: return <Building className="w-5 h-5" />;
    }
  };

  if (!itinerarioData) {
    return <LoadingComponent />;
  }

  const renderResumen = () => (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header Hero con Gradiente */}
      <div className="relative overflow-hidden">
        {/* Fondo con patrón geométrico */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        <div className="relative z-10 px-6 lg:px-8 xl:px-12 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto">
            {/* Información Principal */}
            <div className="text-center lg:text-left space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 text-primary rounded-full border border-primary/20">
                    <Compass className="w-5 h-5" />
                    <span className="text-sm font-medium">Paquete de Viaje</span>
                  </div>
                  
                  <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                    Resumen del
                    <span className="block text-primary">Itinerario</span>
                  </h1>
                  
                  <p className="text-xl text-muted-foreground max-w-2xl lg:max-w-none">
                    Revisa todos los detalles antes de confirmar tu experiencia de viaje única
                  </p>
                </div>
                
                {/* Estado y ID */}
                <div className="flex flex-col items-center lg:items-end space-y-4">
                  <div className="relative">
                    <Badge className="bg-primary text-primary-foreground px-6 py-3 text-lg font-semibold rounded-full shadow-lg">
                      PENDIENTE
                    </Badge>
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-secondary rounded-full animate-pulse"></div>
                  </div>
                  
                  <div className="text-center lg:text-right">
                    <p className="text-sm text-muted-foreground font-medium">ID de Reserva</p>
                    <p className="text-2xl font-bold text-foreground font-mono">
                      IT-{Math.floor(Math.random() * 900000) + 100000}
                    </p>
                  </div>
                  
                  {/* Información Rápida */}
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-background/80 backdrop-blur-sm rounded-xl border border-border/50">
                      <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Duración</p>
                      <p className="text-lg font-bold text-foreground">{itinerarioData.duracion} días</p>
                    </div>
                    <div className="p-3 bg-background/80 backdrop-blur-sm rounded-xl border border-border/50">
                      <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Viajeros</p>
                      <p className="text-lg font-bold text-foreground">{itinerarioData.personas}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="px-6 lg:px-8 xl:px-12 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Línea de Tiempo del Viaje */}
          <section className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary/50"></div>
            
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
                  <Route className="w-8 h-8 text-primary" />
                  Cronograma del Viaje
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Descubre cada parada de tu aventura con detalles completos de transporte, alojamiento y actividades
                </p>
              </div>

              {itinerarioData.destinations.map((destination, index) => (
                <div key={destination.id} className="relative">
                  {/* Marcador de tiempo */}
                  <div className="absolute left-6 top-0 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10"></div>
                  
                  {/* Contenido del destino */}
                  <div className="ml-16 space-y-6">
                    {/* Header del destino */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <Badge className={`px-3 py-1 text-sm font-bold ${
                            destination.type === 'start' 
                              ? 'bg-primary text-primary-foreground' 
                              : destination.type === 'end'
                              ? 'bg-destructive text-destructive-foreground'
                              : 'bg-secondary text-secondary-foreground'
                          }`}>
                            {destination.type === 'start' ? 'Inicio' : destination.type === 'end' ? 'Final' : `Destino ${index + 1}`}
                          </Badge>
                          <span className="text-sm text-muted-foreground font-medium">
                            {destination.nights || 2} noches
                          </span>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-foreground">{destination.name}</h3>
                        
                        {destination.description && (
                          <p className="text-muted-foreground max-w-2xl">{destination.description}</p>
                        )}
                      </div>
                      
                      {/* Fechas */}
                      <div className="text-right space-y-1">
                        <p className="text-sm text-muted-foreground">Llegada</p>
                        <p className="font-semibold text-foreground">{destination.startDate}</p>
                        <p className="text-sm text-muted-foreground">Salida</p>
                        <p className="font-semibold text-foreground">{destination.endDate}</p>
                      </div>
                    </div>

                    {/* Detalles del transporte */}
                    {itinerarioData.transportDetails && index > 0 && (
                      <div className="bg-muted/30 rounded-2xl p-6 border border-border/50">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="p-3 bg-primary/10 rounded-xl">
                            {getTransportIcon(destination.transportType)}
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-foreground">Transporte desde {itinerarioData.destinations[index - 1].name}</h4>
                            <p className="text-muted-foreground">Detalles del viaje</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center gap-3">
                            <Building className="w-5 h-5 text-primary" />
                            <div>
                              <p className="text-sm text-muted-foreground">Aerolínea</p>
                              <p className="font-semibold text-foreground">{itinerarioData.transportDetails[0]?.provider}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-primary" />
                            <div>
                              <p className="text-sm text-muted-foreground">Duración</p>
                              <p className="font-semibold text-foreground">{itinerarioData.transportDetails[0]?.duration}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Star className="w-5 h-5 text-primary" />
                            <div>
                              <p className="text-sm text-muted-foreground">Clase</p>
                              <p className="font-semibold text-foreground">{itinerarioData.transportDetails[0]?.class}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Detalles del alojamiento */}
                    {itinerarioData.accommodationDetails && destination.accommodationIncluded && (
                      <div className="bg-muted/30 rounded-2xl p-6 border border-border/50">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="p-3 bg-secondary/10 rounded-xl">
                            {getAccommodationIcon(destination.accommodationType)}
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-foreground">{itinerarioData.accommodationDetails[0]?.name}</h4>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-4 h-4 ${
                                      i < (itinerarioData.accommodationDetails?.[0]?.rating || 0) 
                                        ? 'text-yellow-500 fill-current' 
                                        : 'text-muted-foreground'
                                    }`} 
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {itinerarioData.accommodationDetails[0]?.rating}/5
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="font-semibold text-foreground mb-3">Tipo de Habitación</h5>
                            <p className="text-muted-foreground">{itinerarioData.accommodationDetails[0]?.roomType}</p>
                          </div>
                          
                          <div>
                            <h5 className="font-semibold text-foreground mb-3">Servicios Incluidos</h5>
                            <div className="flex flex-wrap gap-2">
                              {itinerarioData.accommodationDetails[0]?.amenities.map((amenity, idx) => (
                                <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 bg-background rounded-md text-xs text-muted-foreground">
                                  {amenity === 'WiFi' && <Wifi className="w-3 h-3" />}
                                  {amenity === 'Restaurante' && <Utensils className="w-3 h-3" />}
                                  {amenity === 'Gimnasio' && <Zap className="w-3 h-3" />}
                                  {amenity === 'Piscina' && <Heart className="w-3 h-3" />}
                                  {amenity}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actividades y highlights */}
                    {destination.activities && destination.activities.length > 0 && (
                      <div className="bg-muted/30 rounded-2xl p-6 border border-border/50">
                        <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                          <Camera className="w-5 h-5 text-primary" />
                          Actividades y Experiencias
                        </h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="font-semibold text-foreground mb-3">Actividades Incluidas</h5>
                            <div className="space-y-2">
                              {destination.activities.map((activity, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <Check className="w-4 h-4 text-green-600" />
                                  <span className="text-muted-foreground">{activity}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {destination.highlights && (
                            <div>
                              <h5 className="font-semibold text-foreground mb-3">Puntos Destacados</h5>
                              <div className="space-y-2">
                                {destination.highlights.map((highlight, idx) => (
                                  <div key={idx} className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                    <span className="text-muted-foreground">{highlight}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
                     </section>

           {/* Mapa del Itinerario */}
           <section className="space-y-8">
             <div className="text-center">
               <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
                 <Map className="w-8 h-8 text-primary" />
                 Mapa del Itinerario
               </h2>
               <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                 Visualiza la ruta completa de tu viaje con todos los destinos marcados
               </p>
             </div>
             
             <div className="bg-muted/30 rounded-2xl p-6 border border-border/50">
               <SimpleMap 
                 destinations={itinerarioData.destinations}
                 className="w-full h-[500px]"
               />
             </div>
           </section>

           {/* Servicios y Beneficios */}
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
                <Award className="w-8 h-8 text-primary" />
                Servicios Incluidos
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Todo lo que necesitas para una experiencia de viaje completa y sin preocupaciones
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {itinerarioData.serviciosIncluidos.map((servicio, index) => (
                <div key={index} className="group relative overflow-hidden bg-gradient-to-br from-muted/50 to-muted/30 rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10 space-y-4">
                    <div className="p-3 bg-primary/10 rounded-xl w-fit">
                      {servicio === 'Hoteles' && <Building className="w-6 h-6 text-primary" />}
                      {servicio === 'Tours' && <Compass className="w-6 h-6 text-primary" />}
                      {servicio === 'Visitas guiadas' && <Map className="w-6 h-6 text-primary" />}
                      {servicio === 'Traslados' && <Car className="w-6 h-6 text-primary" />}
                      {servicio === 'Alimentación' && <Utensils className="w-6 h-6 text-primary" />}
                      {!['Hoteles', 'Tours', 'Visitas guiadas', 'Traslados', 'Alimentación'].includes(servicio) && <Check className="w-6 h-6 text-primary" />}
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{servicio}</h3>
                      <p className="text-sm text-muted-foreground">
                        Incluido en tu paquete de viaje para máxima comodidad
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Información Adicional */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Seguro y Políticas */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
                <Shield className="w-6 h-6 text-primary" />
                Seguro y Políticas
              </h3>
              
              <div className="space-y-4">
                {itinerarioData.insurance && (
                  <div className="bg-muted/30 rounded-2xl p-6 border border-border/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="font-semibold text-foreground">Seguro Incluido</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{itinerarioData.insurance.type}</p>
                    <p className="text-xs text-muted-foreground">{itinerarioData.insurance.coverage}</p>
                  </div>
                )}
                
                {itinerarioData.cancellationPolicy && (
                  <div className="bg-muted/30 rounded-2xl p-6 border border-border/50">
                    <h4 className="font-semibold text-foreground mb-2">Política de Cancelación</h4>
                    <p className="text-sm text-muted-foreground">{itinerarioData.cancellationPolicy}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Ofertas Especiales */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
                <Gift className="w-6 h-6 text-primary" />
                Ofertas Especiales
              </h3>
              
              <div className="space-y-4">
                {itinerarioData.specialOffers?.map((offer, index) => (
                  <div key={index} className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary rounded-lg">
                        <TrendingUp className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <span className="font-semibold text-foreground">{offer}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Sección de Precios y Acciones - Sticky */}
      <div className="sticky  shadow-lg">
        <div className="px-6 lg:px-8 xl:px-12 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Información de Precios */}
              <div className="lg:col-span-2">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <DollarSign className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm bg-primary/10 rounded-lg p-2">Precio por persona</p>
                        <p className="text-2xl font-bold text-foreground">
                          {formatPrice(itinerarioData.precioTotal / itinerarioData.personas)}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right space-y-2">
                    <div className="flex items-center gap-2 justify-end">
                      <span className="text-sm text-muted-foreground">Total ({itinerarioData.personas} personas):</span>
                      <span className="text-lg font-semibold text-foreground">
                        {formatPrice(itinerarioData.precioTotal)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 justify-end">
                      <span className="text-sm text-muted-foreground">Descuento:</span>
                      <span className="text-lg font-semibold text-green-600">
                        -{formatPrice(itinerarioData.precioTotal - itinerarioData.precioDescuento)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3 justify-end">
                      <span className="text-sm text-muted-foreground">Precio Final:</span>
                      <span className="text-3xl font-bold text-primary">
                        {formatPrice(itinerarioData.precioDescuento)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="lg:col-span-1 space-y-3">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-lg font-semibold shadow-lg">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Proceder al Pago
                </Button>
                
                <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50 h-12">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Enviar por WhatsApp
                </Button>
                
                <Button variant="outline" className="w-full h-12">
                  <Download className="w-5 h-5 mr-2" />
                  Descargar PDF
                </Button>
              </div>
            </div>

            {/* Sección de Contacto */}
            <div className="mt-6 pt-6 border-t border-border/50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-sm text-muted-foreground mb-2">¿Tienes preguntas sobre tu viaje?</p>
                  <p className="text-xs text-muted-foreground">Nuestro equipo está disponible 24/7 para ayudarte</p>
                </div>
                
                <div className="flex gap-3">
                  <Drawer open={isCallDrawerOpen} onOpenChange={setIsCallDrawerOpen}>
                    <DrawerTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Llamar
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent className="bg-slate-900 border-slate-700">
                      <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader className="border-b border-slate-700">
                          <DrawerTitle className="text-center text-xl font-semibold text-white">
                            Marcador Telefónico
                          </DrawerTitle>
                          <p className="text-center text-sm text-slate-300">
                            Marca el número que deseas llamar
                          </p>
                        </DrawerHeader>
                        
                        {/* Número mostrado */}
                        <div className="px-6 py-6 text-center bg-slate-800/50">
                          <div className="text-4xl font-bold text-white mb-2">
                            {phoneNumber === '+51 ' ? 'Ingresa número' : phoneNumber}
                          </div>
                          <div className="text-sm text-slate-400 font-medium">
                            {phoneNumber === '+51 ' ? 'LISTO PARA MARCAR' : 'LLAMANDO'}
                          </div>
                        </div>
                        
                        {/* Teclado numérico */}
                        <div className="px-6 py-6">
                          <div className="grid grid-cols-3 gap-5 mb-8">
                            {/* Primera fila: 1, 2, 3 */}
                            <button 
                              className="w-18 h-18 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-3xl font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                              onClick={() => handleAddNumber('1')}
                            >
                              1
                            </button>
                            <button 
                              className="w-18 h-18 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-3xl font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                              onClick={() => handleAddNumber('2')}
                            >
                              2
                            </button>
                            <button 
                              className="w-18 h-18 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-3xl font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                              onClick={() => handleAddNumber('3')}
                            >
                              3
                            </button>
                            
                            {/* Segunda fila: 4, 5, 6 */}
                            <button 
                              className="w-18 h-18 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-3xl font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                              onClick={() => handleAddNumber('4')}
                            >
                              4
                            </button>
                            <button 
                              className="w-18 h-18 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-3xl font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                              onClick={() => handleAddNumber('5')}
                            >
                              5
                            </button>
                            <button 
                              className="w-18 h-18 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-3xl font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                              onClick={() => handleAddNumber('6')}
                            >
                              6
                            </button>
                            
                            {/* Tercera fila: 7, 8, 9 */}
                            <button 
                              className="w-18 h-18 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-3xl font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                              onClick={() => handleAddNumber('7')}
                            >
                              7
                            </button>
                            <button 
                              className="w-18 h-18 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-3xl font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                              onClick={() => handleAddNumber('8')}
                            >
                              8
                            </button>
                            <button 
                              className="w-18 h-18 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-3xl font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                              onClick={() => handleAddNumber('9')}
                            >
                              9
                            </button>
                            
                            {/* Cuarta fila: *, 0, # */}
                            <button 
                              className="w-18 h-18 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-3xl font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                              onClick={() => handleAddNumber('*')}
                            >
                              *
                            </button>
                            <button 
                              className="w-18 h-18 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-3xl font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                              onClick={() => handleAddNumber('0')}
                            >
                              0
                            </button>
                            <button 
                              className="w-18 h-18 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-3xl font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                              onClick={() => handleAddNumber('#')}
                            >
                              #
                            </button>
                          </div>
                          
                          {/* Botones de acción */}
                          <div className="flex flex-col gap-4 mb-6">
                            {/* Botón de borrar */}
                            <div className="flex justify-center">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="w-20 h-20 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg border-4 border-red-400/30"
                                onClick={handleDeleteNumber}
                                title="Borrar último número"
                              >
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-6-2h2v-2h-2v2zm0-4h2v-2h-2v2zm-2-2v2h2v-2h-2zm-2 2h2v-2h-2v2zm0 4h2v-2h-2v2zm-2-2v2h2v-2h-2z"/>
                                </svg>
                              </Button>
                            </div>
                            
                            {/* Botón de llamar */}
                            <div className="flex justify-center">
                              <Button 
                                className="w-20 h-20 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl border-4 border-green-400/30"
                                onClick={() => handleCall(phoneNumber)}
                                title="Llamar"
                              >
                                <Phone className="w-10 h-10" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DrawerContent>
                  </Drawer>
                  
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDatosCliente = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Datos del Cliente</h2>
        <p className="text-muted-foreground">Complete la información personal para generar la cotización</p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">Formulario de datos del cliente en desarrollo...</p>
        </CardContent>
      </Card>
      
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => setCurrentStep('resumen')}>
          Volver
        </Button>
        <Button onClick={() => setCurrentStep('confirmacion')}>
          Continuar
        </Button>
      </div>
    </div>
  );

  const renderConfirmacion = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Confirmación</h2>
        <p className="text-muted-foreground">Confirma los detalles antes de finalizar</p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">Confirmación en desarrollo...</p>
        </CardContent>
      </Card>
      
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => setCurrentStep('datos-cliente')}>
          Volver
        </Button>
        <Button onClick={() => setCurrentStep('exportacion')}>
          Confirmar
        </Button>
      </div>
    </div>
  );

  const renderExportacion = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Exportar Cotización</h2>
        <p className="text-muted-foreground">Descarga o envía tu cotización</p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">Exportación en desarrollo...</p>
        </CardContent>
      </Card>
      
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => setCurrentStep('confirmacion')}>
          Volver
        </Button>
        <Button>
          Finalizar
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full max-w-none px-6 lg:px-8 xl:px-12">
        {currentStep === 'resumen' && renderResumen()}
        {currentStep === 'datos-cliente' && renderDatosCliente()}
        {currentStep === 'confirmacion' && renderConfirmacion()}
        {currentStep === 'exportacion' && renderExportacion()}
      </div>
    </div>
  );
};

export default function DetallesCotizacionPage() {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <DetallesCotizacionContent />
    </Suspense>
  );
}
