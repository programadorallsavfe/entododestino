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
  Mail
} from 'lucide-react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';

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
}

interface FlightPrice {
  date: string;
  price: number;
  airline: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  isOptimal: boolean;
}

interface FlightSegment {
  from: string;
  to: string;
  segmentDate: string;
  prices: FlightPrice[];
}

// Componente de carga
const LoadingComponent = () => (
  <div className="min-h-screen bg-muted flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
      <p className="text-muted-foreground">Cargando detalles del itinerario...</p>
    </div>
  </div>
);

// Componente principal que usa useSearchParams
const DetallesCotizacionContent = () => {
  const searchParams = useSearchParams();
  const [itinerarioData, setItinerarioData] = useState<ItinerarioData | null>(null);
  const [currentStep, setCurrentStep] = useState<'resumen' | 'datos-cliente' | 'confirmacion' | 'exportacion'>('resumen');
  const [isCallDrawerOpen, setIsCallDrawerOpen] = useState(false);

  // Función para iniciar llamada telefónica
  const handleCall = (phoneNumber: string) => {
    try {
      // En dispositivos móviles, esto abrirá la app de teléfono
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        window.location.href = `tel:${phoneNumber}`;
      } else {
        // Para desktop, copiar al portapapeles sin mostrar alertas
        navigator.clipboard.writeText(phoneNumber);
        // Opcional: mostrar un toast o notificación sutil
        console.log(`Número ${phoneNumber} copiado al portapapeles`);
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
          endDate: data.selectedDate || '13 sept 2025'
        }],
        fechaInicio: data.selectedDate || '08 Septiembre 2025',
        fechaFin: data.selectedDate || '13 Septiembre 2025',
        duracion: data.nights || 5,
        personas: data.guests?.adults || data.passengers?.adults || 2,
        serviciosIncluidos: data.amenities || ['Servicios básicos'],
        precioTotal: data.price || 299.99,
        precioDescuento: data.discountPrice || 249.99
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
            precioDescuento: parseFloat(precioDescuento || '2599.99')
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
              endDate: serviceData.selectedDate || '13 sept 2025'
            }],
            fechaInicio: serviceData.selectedDate || '08 Septiembre 2025',
            fechaFin: serviceData.selectedDate || '13 Septiembre 2025',
            duracion: serviceData.nights || 5,
            personas: serviceData.guests?.adults || serviceData.passengers?.adults || 2,
            serviciosIncluidos: serviceData.amenities || ['Servicios básicos'],
            precioTotal: serviceData.price || 299.99,
            precioDescuento: serviceData.discountPrice || 249.99
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

  const getDestinationIcon = (type: 'start' | 'destination' | 'end') => {
    switch (type) {
      case 'start': return <Star className="w-4 h-4 text-green-600" />;
      case 'end': return <MapPin className="w-4 h-4 text-red-600" />;
      default: return <MapPin className="w-4 h-4 text-blue-600" />;
    }
  };

  const getDestinationColor = (type: 'start' | 'destination' | 'end') => {
    switch (type) {
      case 'start': return 'bg-green-100 text-green-800 border-green-200';
      case 'end': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  // Función para generar precios de vuelos simulados
  const generateFlightPrices = (): FlightSegment[] => {
    if (!itinerarioData || itinerarioData.destinations.length <= 1) return [];

    const segments: FlightSegment[] = [];
    
    for (let i = 0; i < itinerarioData.destinations.length - 1; i++) {
      const from = itinerarioData.destinations[i];
      const to = itinerarioData.destinations[i + 1];
      
      // Generar fecha del segmento (simulada)
      const segmentDate = new Date();
      segmentDate.setDate(segmentDate.getDate() + (i + 1) * 7); // Cada segmento una semana después
      
      const prices: FlightPrice[] = [];
      const airlines = ['LATAM', 'Avianca', 'Copa Airlines', 'American Airlines', 'Delta'];
      
      // Generar precios para 10 días antes y después
      for (let dayOffset = -10; dayOffset <= 10; dayOffset++) {
        const priceDate = new Date(segmentDate);
        priceDate.setDate(priceDate.getDate() + dayOffset);
        
        // Precio base variará según la distancia y demanda
        const basePrice = 150 + (i * 50) + Math.abs(dayOffset) * 5;
        const randomVariation = Math.random() * 100 - 50;
        const finalPrice = Math.max(80, basePrice + randomVariation);
        
        // Determinar si es el precio más óptimo (menor precio en ventana de ±3 días)
        const isOptimal = Math.abs(dayOffset) <= 3 && finalPrice <= basePrice + 20;
        
        prices.push({
          date: priceDate.toLocaleDateString('es-ES', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
          }),
          price: Math.round(finalPrice),
          airline: airlines[Math.floor(Math.random() * airlines.length)],
          departureTime: `${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 6) * 10}`,
          arrivalTime: `${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 6) * 10}`,
          duration: `${Math.floor(Math.random() * 3) + 1}h ${Math.floor(Math.random() * 60)}m`,
          stops: Math.floor(Math.random() * 2),
          isOptimal: isOptimal
        });
      }
      
      // Ordenar por precio y marcar el más óptimo
      prices.sort((a, b) => a.price - b.price);
      const optimalIndex = prices.findIndex(p => p.isOptimal);
      if (optimalIndex !== -1) {
        prices[optimalIndex].isOptimal = true;
        // Desmarcar otros como óptimos
        prices.forEach((p, idx) => {
          if (idx !== optimalIndex) p.isOptimal = false;
        });
      }
      
      segments.push({
        from: from.name,
        to: to.name,
        segmentDate: segmentDate.toLocaleDateString('es-ES', { 
          weekday: 'long', 
          month: 'long', 
          day: 'numeric' 
        }),
        prices: prices
      });
    }
    
    return segments;
  };

  if (!itinerarioData) {
    return <LoadingComponent />;
  }

  const renderResumen = () => (
    <div className="space-y-0">
      {/* Header Azul Completo */}
      <div className="w-full  text-dark py-8 px-6 lg:px-8 xl:px-12 -mx-6 lg:-mx-8 xl:-mx-12 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="text-center lg:text-left mb-4 lg:mb-0">
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                Resumen del Itinerario
              </h1>
              <p className="text-lg text-dark">
                Revisa todos los detalles antes de confirmar tu viaje
              </p>
            </div>
            <div className="flex flex-col items-center lg:items-end space-y-2">
              <Badge className="bg-primary-foreground text-primary px-4 py-2 text-sm font-semibold">
                PENDIENTE
              </Badge>
              <p className="text-sm text-dark">
                ID: IT-{Math.floor(Math.random() * 900000) + 100000}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal - Layout de Dos Columnas */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna Izquierda - Información del Viaje */}
          <div className="lg:col-span-2 space-y-6">
            {/* Información del Viaje */}
            <Card className="border border-border">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Globe className="w-5 h-5 text-primary" />
                  Información del Viaje
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted/30 rounded-lg border border-border">
                    <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-sm text-muted-foreground font-medium">Fecha Inicio</div>
                    <div className="text-base font-bold text-foreground">
                      {itinerarioData.fechaInicio}
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-muted/30 rounded-lg border border-border">
                    <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-sm text-muted-foreground font-medium">Fecha Fin</div>
                    <div className="text-base font-bold text-foreground">
                      {itinerarioData.fechaFin}
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-muted/30 rounded-lg border border-border">
                    <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-sm text-muted-foreground font-medium">Duración</div>
                    <div className="text-base font-bold text-foreground">
                      {itinerarioData.duracion} días
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-muted/30 rounded-lg border border-border">
                    <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-sm text-muted-foreground font-medium">Personas</div>
                    <div className="text-base font-bold text-foreground">
                      {itinerarioData.personas}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ruta del Viaje */}
            <Card className="border border-border">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="w-5 h-5 text-primary" />
                  Ruta del Viaje
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {itinerarioData.destinations.map((destination: Destination, index: number) => (
                  <div key={destination.id} className="relative">
                    {/* Línea conectora */}
                    {index > 0 && (
                      <div className="absolute left-6 top-0 w-0.5 h-8 bg-muted border-l-2 border-dashed border-border">
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="flex items-center space-x-2 bg-card px-2 py-1 rounded-full shadow-sm">
                            <Plane className="w-3 h-3 text-primary" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Tarjeta del destino */}
                    <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg border border-border">
                      <div className="relative">
                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            {getDestinationIcon(destination.type)}
                          </div>
                        </div>
                        <Badge className={`absolute -top-1 -right-1 w-6 h-6 p-0 text-xs font-bold ${
                          destination.type === 'start' ? 'bg-green-500' : 'bg-blue-500'
                        }`}>
                          {destination.type === 'start' ? '1' : index + 1}
                        </Badge>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-foreground text-lg">{destination.name}</h3>
                          <Badge variant="outline" className={getDestinationColor(destination.type)}>
                            {destination.type === 'start' ? 'Inicio' : destination.type === 'end' ? 'Final' : `Destino`}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Hotel className="w-4 h-4" />
                            {destination.nights || 2} noches
                          </div>
                          <div className="flex items-center gap-1">
                            <Check className="w-4 h-4 text-green-600" />
                            Incluido
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Servicios Incluidos */}
            <Card className="border border-border">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Check className="w-5 h-5 text-primary" />
                  Servicios Incluidos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                  {itinerarioData.serviciosIncluidos.map((servicio: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg border border-border">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-foreground">{servicio}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Columna Derecha - Resumen de Precios */}
          <div className="lg:col-span-1">
            <Card className="border border-border sticky top-8">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Resumen de Precios
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Precio por persona:</span>
                    <span className="font-semibold text-foreground">
                      {formatPrice(itinerarioData.precioTotal / itinerarioData.personas)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total ({itinerarioData.personas} personas):</span>
                    <span className="font-semibold text-foreground">
                      {formatPrice(itinerarioData.precioTotal)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Descuento aplicado:</span>
                    <span className="font-semibold text-green-600">
                      -{formatPrice(itinerarioData.precioTotal - itinerarioData.precioDescuento)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-foreground">Precio Final:</span>
                    <span className="text-xl font-bold text-primary">
                      {formatPrice(itinerarioData.precioDescuento)}
                    </span>
                  </div>
                </div>

                {/* Botones de Acción */}
                <div className="space-y-3 pt-4">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Proceder al Pago
                  </Button>
                                     <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50">
                     <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                       <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                     </svg>
                     Enviar por WhatsApp
                   </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Descargar PDF
                  </Button>
                </div>

                                 {/* Sección de Contacto */}
                 <div className="pt-6 border-t border-border">
                   <p className="text-sm text-muted-foreground mb-3">¿Tienes preguntas?</p>
                   <div className="flex gap-3">
                     <Drawer open={isCallDrawerOpen} onOpenChange={setIsCallDrawerOpen}>
                       <DrawerTrigger asChild>
                         <Button variant="outline" size="sm" className="flex-1">
                           <Phone className="w-4 h-4 mr-2" />
                           Llamar
                         </Button>
                       </DrawerTrigger>
                                               <DrawerContent className="bg-slate-900 border-slate-700">
                          <div className="mx-auto w-full max-w-sm">
                            <DrawerHeader className="border-b border-slate-700">
                              <DrawerTitle className="text-center text-xl font-semibold text-white">
                                📞 Marcador Telefónico
                              </DrawerTitle>
                              <p className="text-center text-sm text-slate-300">
                                Marca el número que deseas llamar
                              </p>
                            </DrawerHeader>
                            
                            {/* Número mostrado */}
                            <div className="px-6 py-6 text-center bg-slate-800/50">
                              <div className="text-4xl font-bold text-white mb-2">+51 1 234 5678</div>
                              <div className="text-sm text-slate-400 font-medium">LLAMANDO</div>
                            </div>
                            
                            {/* Teclado numérico */}
                            <div className="px-6 py-6">
                              <div className="grid grid-cols-3 gap-5 mb-8">
                                                                 {/* Primera fila: 1, 2, 3 */}
                                 <button 
                                   className="w-18 h-18 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-3xl font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                                   onClick={() => handleCall('+5112345678')}
                                 >
                                   1
                                 </button>
                                 <button 
                                   className="w-18 h-18 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-3xl font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                                   onClick={() => handleCall('+5112345678')}
                                 >
                                   2
                                 </button>
                                 <button 
                                   className="w-18 h-18 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-3xl font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                                   onClick={() => handleCall('+5112345678')}
                                 >
                                   3
                                 </button>
                                 
                                 {/* Segunda fila: 4, 5, 6 */}
                                 <button 
                                   className="w-18 h-18 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-3xl font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                                   onClick={() => handleCall('+5112345678')}
                                 >
                                   4
                                 </button>
                                 <button 
                                   className="w-18 h-18 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-3xl font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                                   onClick={() => handleCall('+5112345678')}
                                 >
                                   5
                                 </button>
                                 <button 
                                   className="w-18 h-18 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-3xl font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                                   onClick={() => handleCall('+5112345678')}
                                 >
                                   6
                                 </button>
                                 
                                 {/* Tercera fila: 7, 8, 9 */}
                                 <button 
                                   className="w-18 h-18 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-3xl font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                                   onClick={() => handleCall('+5112345678')}
                                 >
                                   7
                                 </button>
                                 <button 
                                   className="w-18 h-18 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-3xl font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                                   onClick={() => handleCall('+5112345678')}
                                 >
                                   8
                                 </button>
                                 <button 
                                   className="w-18 h-18 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-3xl font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                                   onClick={() => handleCall('+5112345678')}
                                 >
                                   9
                                 </button>
                                 
                                 {/* Cuarta fila: *, 0, # */}
                                 <button 
                                   className="w-18 h-18 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-3xl font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                                   onClick={() => handleCall('+5112345678')}
                                 >
                                   *
                                 </button>
                                 <button 
                                   className="w-18 h-18 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-3xl font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                                   onClick={() => handleCall('+5112345678')}
                                 >
                                   0
                                 </button>
                                 <button 
                                   className="w-18 h-18 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-3xl font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                                   onClick={() => handleCall('+5112345678')}
                                 >
                                   #
                                 </button>
                              </div>
                              
                              {/* Botón de llamada grande */}
                              <div className="flex justify-center mb-6">
                                <button 
                                  className="w-24 h-24 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl border-4 border-green-400/30"
                                  onClick={() => handleCall('+5112345678')}
                                >
                                  <Phone className="w-10 h-10" />
                                </button>
                              </div>
                              
                              {/* Botón de cerrar */}
                              <div className="text-center">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className=""
                                  onClick={() => setIsCallDrawerOpen(false)}
                                >
                                  Cerrar
                                </Button>
                              </div>
                            </div>
                          </div>
                        </DrawerContent>
                     </Drawer>
                     
                     <Button variant="outline" size="sm" className="flex-1">
                       <Mail className="w-4 h-4 mr-2" />
                       Email
                     </Button>
                   </div>
                 </div>
              </CardContent>
            </Card>
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
