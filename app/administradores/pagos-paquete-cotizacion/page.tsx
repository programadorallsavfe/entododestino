"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Hotel, 
  Plane, 
  Users, 
  DollarSign, 
  Star,
  Clock,
  Route,
  Building,
  Car,
  UtensilsCrossed,
  Wifi,
  Edit,
  Trash2,
  Share2,
  Download,
  Eye,
  Heart,
  TrendingUp,
  TrendingDown,
  BarChart3,
  LineChart,
  CalendarDays,
  Filter,
  Search,
  Zap,
  FileText,
  User,
  Mail,
  Phone,
  CreditCard,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import Image from "next/image";
import { SimpleMap } from "@/app/clientes/components/SimpleMap";

export default function PagosPaqueteCotizacionPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("cliente");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [priceRange, setPriceRange] = useState(10);
  const [showPriceAnalysis, setShowPriceAnalysis] = useState(false);

  // Client form state
  const [clientData, setClientData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    email: "",
    telefono: "",
    direccion: "",
    observaciones: ""
  });

  // Mock data for the package
  const paquete = {
    id: "PKG-001",
    nombre: "Europa del Este (Hot Deal)",
    tipo: "Circuito",
    categoria: "Premium",
    estado: "Activo",
    precio: 5133,
    moneda: "USD",
    duracion: 10,
    destinos: ["Viena", "Budapest", "Praga", "Berlin"],
    fechaInicio: "2025-10-01",
    fechaFin: "2026-10-31",
    diasSalida: ["Jueves"],
    alojamientos: 4,
    circuitos: 1,
    descripcion: "Descubre la magia de Europa del Este con este paquete premium que incluye las ciudades más fascinantes del continente.",
    caracteristicas: [
      "Vuelos internacionales incluidos",
      "Hoteles 4 estrellas",
      "Traslados privados",
      "Guía turístico certificado",
      "Seguro de viaje",
      "Desayunos incluidos"
    ],
    servicios: [
      { nombre: "Wi-Fi", icono: Wifi, disponible: true },
      { nombre: "Estacionamiento", icono: Car, disponible: true },
      { nombre: "Piscina", icono: Star, disponible: true },
      { nombre: "Spa", icono: Heart, disponible: false },
      { nombre: "Gimnasio", icono: Building, disponible: true },
      { nombre: "Restaurante", icono: UtensilsCrossed, disponible: true }
    ],
    itinerario: [
      {
        dia: 1,
        ciudad: "Viena",
        actividades: ["Llegada y check-in", "Tour por el centro histórico", "Cena de bienvenida"],
        alojamiento: "Hotel Imperial Vienna",
        comidas: ["Cena"]
      },
      {
        dia: 2,
        ciudad: "Viena",
        actividades: ["Palacio de Schönbrunn", "Ópera de Viena", "Paseo por Ringstrasse"],
        alojamiento: "Hotel Imperial Vienna",
        comidas: ["Desayuno", "Almuerzo"]
      },
      {
        dia: 3,
        ciudad: "Budapest",
        actividades: ["Viaje a Budapest", "Castillo de Buda", "Baños termales"],
        alojamiento: "Hotel Gellért",
        comidas: ["Desayuno", "Cena"]
      }
    ],
    precios: {
      base: 5133,
      impuestos: 256.65,
      comisiones: 102.66,
      total: 5492.31,
      descuentos: [
        { tipo: "Early Bird", valor: 200, descripcion: "Reserva con 6 meses de anticipación" },
        { tipo: "Grupo", valor: 150, descripcion: "Viaje en grupo de 4+ personas" }
      ]
    },
    disponibilidad: {
      total: 50,
      reservados: 23,
      disponibles: 27,
      proximaSalida: "2025-10-02"
    }
  };

  // Map destinations data
  const mapDestinations = [
    {
      id: "1",
      name: "Viena",
      lat: 48.2082,
      lng: 16.3738,
      type: "start" as const,
      image: "/assets/banner.jpg",
      description: "Capital de Austria, ciudad imperial"
    },
    {
      id: "2",
      name: "Budapest",
      lat: 47.4979,
      lng: 19.0402,
      type: "destination" as const,
      image: "/assets/banner.jpg",
      description: "Perla del Danubio"
    },
    {
      id: "3",
      name: "Praga",
      lat: 50.0755,
      lng: 14.4378,
      type: "destination" as const,
      image: "/assets/banner.jpg",
      description: "Ciudad de las cien torres"
    },
    {
      id: "4",
      name: "Berlin",
      lat: 52.5200,
      lng: 13.4050,
      type: "end" as const,
      image: "/assets/banner.jpg",
      description: "Capital de Alemania"
    }
  ];

  // Generate price timeline data
  const generatePriceTimeline = (centerDate: Date, range: number) => {
    const timeline = [];
    const basePrice = 5133;
    
    for (let i = -range; i <= range; i++) {
      const date = new Date(centerDate);
      date.setDate(date.getDate() + i);
      
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const weekendMultiplier = isWeekend ? 1.15 : 1.0;
      
      const randomVariation = 0.9 + Math.random() * 0.2;
      const price = Math.round(basePrice * weekendMultiplier * randomVariation);
      
      const previousPrice = i > -range ? timeline[timeline.length - 1]?.price : price;
      let trend: 'up' | 'down' | 'stable' = 'stable';
      if (price > previousPrice) trend = 'up';
      else if (price < previousPrice) trend = 'down';
      
      timeline.push({
        date: new Date(date),
        price,
        trend,
        isSelected: i === 0,
        dayOfWeek: date.toLocaleDateString('es-ES', { weekday: 'short' }),
        availability: Math.floor(Math.random() * 50) + 10
      });
    }
    
    return timeline;
  };

  const priceTimeline = generatePriceTimeline(selectedDate, priceRange);
  const minPrice = Math.min(...priceTimeline.map(p => p.price));
  const maxPrice = Math.max(...priceTimeline.map(p => p.price));
  const avgPrice = Math.round(priceTimeline.reduce((acc, p) => acc + p.price, 0) / priceTimeline.length);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    });
  };

  const handleVolver = () => {
    router.push('/administradores/detalles-paquetes-turisticos');
  };

  const handleInputChange = (field: string, value: string) => {
    setClientData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCrearCotizacion = () => {
    console.log('Creando cotización para:', clientData);
    // Lógica para crear cotización
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={handleVolver}
                >
                  <ArrowLeft className="w-6 h-6" />
                </Button>
                <div className="p-3 bg-white/20 rounded-xl border border-white/30 backdrop-blur-sm">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white">Crear Cotización</h1>
                  <p className="text-xl text-white/90">
                    {paquete.nombre}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white hover:bg-gray-100 text-primary border-0 px-6 py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Compartir
              </Button>
              <Button 
                size="lg" 
                className="bg-white hover:bg-gray-100 text-primary border-0 px-6 py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={handleCrearCotizacion}
              >
                <FileText className="w-5 h-5 mr-2" />
                Generar Cotización
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mx-auto px-4 py-8 space-y-8">
        {/* Tabs de Cotización */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Proceso de Cotización</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="cliente" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Cliente
                </TabsTrigger>
                <TabsTrigger value="itinerario" className="flex items-center gap-2">
                  <Route className="w-4 h-4" />
                  Itinerario
                </TabsTrigger>
                <TabsTrigger value="costos" className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Costos
                </TabsTrigger>
                <TabsTrigger value="resumen" className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Resumen
                </TabsTrigger>
              </TabsList>
              
              {/* Tab Cliente */}
              <TabsContent value="cliente" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Formulario de Cliente */}
                  <div className="space-y-6">
                    <Card className="border-2 border-primary/20">
                      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                        <CardTitle className="flex items-center gap-2">
                          <User className="w-5 h-5" />
                          Información del Cliente
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="nombre">Nombre *</Label>
                            <Input
                              id="nombre"
                              value={clientData.nombre}
                              onChange={(e) => handleInputChange('nombre', e.target.value)}
                              placeholder="Ingrese nombre"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="apellido">Apellido *</Label>
                            <Input
                              id="apellido"
                              value={clientData.apellido}
                              onChange={(e) => handleInputChange('apellido', e.target.value)}
                              placeholder="Ingrese apellido"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="dni">DNI *</Label>
                            <Input
                              id="dni"
                              value={clientData.dni}
                              onChange={(e) => handleInputChange('dni', e.target.value)}
                              placeholder="Ingrese DNI"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="telefono">Teléfono *</Label>
                            <Input
                              id="telefono"
                              value={clientData.telefono}
                              onChange={(e) => handleInputChange('telefono', e.target.value)}
                              placeholder="Ingrese teléfono"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Correo Electrónico *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={clientData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="Ingrese correo electrónico"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="direccion">Dirección</Label>
                          <Input
                            id="direccion"
                            value={clientData.direccion}
                            onChange={(e) => handleInputChange('direccion', e.target.value)}
                            placeholder="Ingrese dirección"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="observaciones">Observaciones</Label>
                          <Textarea
                            id="observaciones"
                            value={clientData.observaciones}
                            onChange={(e) => handleInputChange('observaciones', e.target.value)}
                            placeholder="Observaciones adicionales..."
                            rows={3}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Información del Paquete */}
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Plane className="w-5 h-5" />
                          Detalles del Paquete
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Plane className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{paquete.nombre}</h3>
                            <p className="text-sm text-muted-foreground">{paquete.tipo} - {paquete.categoria}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                            <p className="text-lg font-bold text-blue-600">{paquete.duracion}</p>
                            <p className="text-sm text-muted-foreground">Noches</p>
                          </div>
                          <div className="text-center p-3 bg-green-50 rounded-lg">
                            <Route className="w-6 h-6 text-green-600 mx-auto mb-2" />
                            <p className="text-lg font-bold text-green-600">{paquete.destinos.length}</p>
                            <p className="text-sm text-muted-foreground">Destinos</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium">Destinos:</h4>
                          <div className="flex flex-wrap gap-2">
                            {paquete.destinos.map((destino, index) => (
                              <Badge key={index} variant="secondary">
                                <MapPin className="w-3 h-3 mr-1" />
                                {destino}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              {/* Tab Itinerario */}
              <TabsContent value="itinerario" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Mapa Interactivo */}
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <MapPin className="w-5 h-5" />
                          Mapa del Itinerario
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <SimpleMap destinations={mapDestinations} className="h-96" />
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Línea de Tiempo */}
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Clock className="w-5 h-5" />
                          Línea de Tiempo del Viaje
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {paquete.itinerario.map((dia, index) => (
                            <div key={index} className="relative">
                              {/* Línea conectora */}
                              {index < paquete.itinerario.length - 1 && (
                                <div className="absolute left-4 top-8 w-0.5 h-8 bg-primary/30"></div>
                              )}
                              
                              <div className="flex items-start gap-4">
                                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold z-10 relative">
                                  {dia.dia}
                                </div>
                                <div className="flex-1 space-y-2">
                                  <div className="flex items-center gap-2">
                                    <Plane className="w-4 h-4 text-primary" />
                                    <h4 className="font-semibold">{dia.ciudad}</h4>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{dia.alojamiento}</p>
                                  
                                  <div className="space-y-1">
                                    <h5 className="text-xs font-medium text-primary">Actividades:</h5>
                                    <ul className="text-xs text-muted-foreground space-y-1">
                                      {dia.actividades.map((actividad, actIndex) => (
                                        <li key={actIndex} className="flex items-center gap-2">
                                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                          {actividad}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  
                                  <div className="flex gap-2">
                                    {dia.comidas.map((comida, comidaIndex) => (
                                      <Badge key={comidaIndex} variant="outline" className="text-xs">
                                        {comida}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              {/* Tab Costos */}
              <TabsContent value="costos" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Análisis de Precios */}
                  <div className="space-y-6">
                    <Card className="border-2 border-primary/20">
                      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                        <CardTitle className="flex items-center gap-2">
                          <BarChart3 className="w-5 h-5" />
                          Análisis de Precios
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="text-center p-3 bg-green-50 rounded-lg">
                            <TrendingDown className="w-6 h-6 text-green-600 mx-auto mb-2" />
                            <p className="text-xl font-bold text-green-600">${minPrice}</p>
                            <p className="text-sm text-muted-foreground">Precio Mínimo</p>
                          </div>
                          <div className="text-center p-3 bg-red-50 rounded-lg">
                            <TrendingUp className="w-6 h-6 text-red-600 mx-auto mb-2" />
                            <p className="text-xl font-bold text-red-600">${maxPrice}</p>
                            <p className="text-sm text-muted-foreground">Precio Máximo</p>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <span className="font-medium">Precio Base:</span>
                            <span className="text-lg font-bold">${paquete.precios.base}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <span className="font-medium">Impuestos:</span>
                            <span className="text-lg font-bold text-red-600">+${paquete.precios.impuestos}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <span className="font-medium">Comisiones:</span>
                            <span className="text-lg font-bold text-red-600">+${paquete.precios.comisiones}</span>
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
                            <span className="text-lg font-bold">Total:</span>
                            <span className="text-2xl font-bold text-primary">${paquete.precios.total}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Línea de Tiempo de Precios */}
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <LineChart className="w-5 h-5" />
                          Línea de Tiempo de Precios
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-7 gap-2">
                            {priceTimeline.slice(0, 7).map((item, index) => {
                              const heightPercentage = ((item.price - minPrice) / (maxPrice - minPrice)) * 100;
                              const isSelected = item.isSelected;
                              
                              return (
                                <div key={index} className="flex flex-col items-center space-y-2">
                                  <div className="text-center text-xs">
                                    <div className="font-medium">{item.dayOfWeek}</div>
                                    <div className="text-muted-foreground">
                                      {item.date.getDate()}/{item.date.getMonth() + 1}
                                    </div>
                                  </div>
                                  
                                  <div className="relative w-full h-24 bg-muted rounded-lg overflow-hidden">
                                    <div 
                                      className={`absolute bottom-0 w-full rounded-lg transition-all duration-300 ${
                                        isSelected 
                                          ? 'bg-gradient-to-t from-primary to-primary/70 shadow-lg' 
                                          : item.trend === 'up' 
                                            ? 'bg-gradient-to-t from-red-500 to-red-300'
                                            : item.trend === 'down'
                                              ? 'bg-gradient-to-t from-green-500 to-green-300'
                                              : 'bg-gradient-to-t from-gray-500 to-gray-300'
                                      }`}
                                      style={{ height: `${Math.max(heightPercentage, 10)}%` }}
                                    >
                                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap">
                                        ${item.price}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="text-xs text-center">
                                    <div className={`w-2 h-2 rounded-full mx-auto mb-1 ${
                                      item.availability > 30 ? 'bg-green-500' : 
                                      item.availability > 15 ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}></div>
                                    <span className="text-muted-foreground">{item.availability}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          
                          <div className="flex flex-wrap justify-center gap-4 text-xs">
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-gradient-to-t from-primary to-primary/70 rounded"></div>
                              <span>Seleccionado</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <span>Alta Disponibilidad</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              <span>Baja Disponibilidad</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              {/* Tab Resumen */}
              <TabsContent value="resumen" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Resumen de la Cotización */}
                  <div className="space-y-6">
                    <Card className="border-2 border-green-200 bg-green-50">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-800">
                          <CheckCircle className="w-5 h-5" />
                          Resumen de la Cotización
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                              <User className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium">Cliente</p>
                              <p className="text-sm text-muted-foreground">
                                {clientData.nombre} {clientData.apellido}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <Plane className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium">Paquete</p>
                              <p className="text-sm text-muted-foreground">{paquete.nombre}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                              <Calendar className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                              <p className="font-medium">Duración</p>
                              <p className="text-sm text-muted-foreground">{paquete.duracion} noches</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Costo Final */}
                  <div className="space-y-6">
                    <Card className="border-2 border-primary/20">
                      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                        <CardTitle className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5" />
                          Costo Final
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="text-center p-6 bg-primary/10 rounded-lg">
                            <p className="text-sm text-muted-foreground mb-2">Precio Total</p>
                            <p className="text-4xl font-bold text-primary">${paquete.precios.total}</p>
                            <p className="text-sm text-muted-foreground mt-2">{paquete.moneda}</p>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Precio Base:</span>
                              <span>${paquete.precios.base}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Impuestos:</span>
                              <span className="text-red-600">+${paquete.precios.impuestos}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Comisiones:</span>
                              <span className="text-red-600">+${paquete.precios.comisiones}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between text-lg font-bold">
                              <span>Total:</span>
                              <span className="text-primary">${paquete.precios.total}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                {/* Botones de Acción */}
                <div className="flex justify-center gap-4">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={() => setActiveTab("cliente")}
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Volver a Editar
                  </Button>
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90"
                    onClick={handleCrearCotizacion}
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Generar Cotización Final
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
