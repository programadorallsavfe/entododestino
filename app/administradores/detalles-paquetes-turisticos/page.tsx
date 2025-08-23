"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
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
  FileText
} from "lucide-react";
import Image from "next/image";

export default function DetallesPaquetesTuristicosPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("general");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [priceRange, setPriceRange] = useState(10);
  const [showPriceAnalysis, setShowPriceAnalysis] = useState(false);

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

  const handleVolver = () => {
    router.push('/administradores/lista-paquetes');
  };

  const handleEditar = () => {
    // Lógica para editar el paquete
    console.log('Editar paquete:', paquete.id);
  };

  const handleEliminar = () => {
    // Lógica para eliminar el paquete
    console.log('Eliminar paquete:', paquete.id);
  };

  // Generate price timeline data for the selected date range
  const generatePriceTimeline = (centerDate: Date, range: number) => {
    const timeline = [];
    const basePrice = 5133;
    
    for (let i = -range; i <= range; i++) {
      const date = new Date(centerDate);
      date.setDate(date.getDate() + i);
      
      // Simulate price variations based on day of week and season
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const weekendMultiplier = isWeekend ? 1.15 : 1.0;
      
      // Add some random variation
      const randomVariation = 0.9 + Math.random() * 0.2;
      const price = Math.round(basePrice * weekendMultiplier * randomVariation);
      
      // Determine trend
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

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    });
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
                  <Plane className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white">Detalles del Paquete</h1>
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
                onClick={handleEditar}
              >
                <Edit className="w-5 h-5 mr-2" />
                Editar
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mx-auto px-4 py-8 space-y-8">
        {/* Información General */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">Información General</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                  {paquete.estado}
                </Badge>
                <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                  {paquete.categoria}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto mb-3">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">${paquete.precio}</p>
                <p className="text-sm text-muted-foreground">Precio Base</p>
              </div>
              
              <div className="text-center">
                <div className="p-3 bg-blue-100 rounded-lg w-fit mx-auto mb-3">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-blue-600">{paquete.duracion}</p>
                <p className="text-sm text-muted-foreground">Noches</p>
              </div>
              
              <div className="text-center">
                <div className="p-3 bg-green-100 rounded-lg w-fit mx-auto mb-3">
                  <Route className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-green-600">{paquete.circuitos}</p>
                <p className="text-sm text-muted-foreground">Circuitos</p>
              </div>
              
              <div className="text-center">
                <div className="p-3 bg-orange-100 rounded-lg w-fit mx-auto mb-3">
                  <Building className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-orange-600">{paquete.alojamientos}</p>
                <p className="text-sm text-muted-foreground">Alojamientos</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Destinos</h3>
                <div className="flex flex-wrap gap-2">
                  {paquete.destinos.map((destino, index) => (
                    <Badge key={index} variant="secondary" className="bg-secondary text-secondary-foreground">
                      <MapPin className="w-4 h-4 mr-1" />
                      {destino}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Días de Salida</h3>
                <div className="flex flex-wrap gap-2">
                  {paquete.diasSalida.map((dia, index) => (
                    <Badge key={index} variant="outline" className="border-primary text-primary">
                      <Calendar className="w-4 h-4 mr-1" />
                      {dia}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Descripción</h3>
                <p className="text-muted-foreground">{paquete.descripcion}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs de Información Detallada */}
        <Card>
          <CardHeader>
            <CardTitle>Información Detallada</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="itinerario">Itinerario</TabsTrigger>
                <TabsTrigger value="precios">Precios</TabsTrigger>
                <TabsTrigger value="servicios">Servicios</TabsTrigger>
                <TabsTrigger value="analisis" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Análisis
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Características Principales</h3>
                    <div className="space-y-2">
                      {paquete.caracteristicas.map((caracteristica, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-muted-foreground">{caracteristica}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Fechas de Viaje</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">Desde</p>
                          <p className="text-muted-foreground">{paquete.fechaInicio}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">Hasta</p>
                          <p className="text-muted-foreground">{paquete.fechaFin}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="itinerario" className="space-y-6 mt-6">
                <div className="space-y-4">
                  {paquete.itinerario.map((dia, index) => (
                    <div key={index} className="border border-border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {dia.dia}
                        </div>
                        <div>
                          <h4 className="font-semibold">{dia.ciudad}</h4>
                          <p className="text-sm text-muted-foreground">{dia.alojamiento}</p>
                        </div>
                      </div>
                      
                      <div className="ml-11 space-y-2">
                        <div>
                          <h5 className="font-medium text-sm">Actividades:</h5>
                          <ul className="list-disc list-inside text-sm text-muted-foreground">
                            {dia.actividades.map((actividad, actIndex) => (
                              <li key={actIndex}>{actividad}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-sm">Comidas incluidas:</h5>
                          <div className="flex gap-2 mt-1">
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
              </TabsContent>
              
              <TabsContent value="precios" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Desglose de Precios</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Precio Base:</span>
                        <span className="font-medium">${paquete.precios.base}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Impuestos:</span>
                        <span className="font-medium">${paquete.precios.impuestos}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Comisiones:</span>
                        <span className="font-medium">${paquete.precios.comisiones}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span className="text-primary">${paquete.precios.total}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Descuentos Disponibles</h3>
                    <div className="space-y-3">
                      {paquete.precios.descuentos.map((descuento, index) => (
                        <div key={index} className="border border-border rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-green-600">{descuento.tipo}</span>
                            <span className="text-lg font-bold text-green-600">-${descuento.valor}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{descuento.descripcion}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="servicios" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Servicios del Hotel</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {paquete.servicios.map((servicio, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <servicio.icono className={`w-5 h-5 ${servicio.disponible ? 'text-green-600' : 'text-gray-400'}`} />
                          <span className={`text-sm ${servicio.disponible ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {servicio.nombre}
                          </span>
                          {servicio.disponible && (
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Disponibilidad</h3>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-card border border-border rounded-lg">
                        <p className="text-2xl font-bold text-primary">{paquete.disponibilidad.disponibles}</p>
                        <p className="text-sm text-muted-foreground">Plazas Disponibles</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Total de plazas:</span>
                          <span className="font-medium">{paquete.disponibilidad.total}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Reservadas:</span>
                          <span className="font-medium text-orange-600">{paquete.disponibilidad.reservados}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Próxima salida:</span>
                          <span className="font-medium text-green-600">{paquete.disponibilidad.proximaSalida}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="analisis" className="space-y-6 mt-6">
                {/* Price Analysis Header with Banner */}
                <div className="relative overflow-hidden rounded-lg mb-6">
                  <div className="relative h-48 w-full">
                    <Image
                      src="/assets/banner.jpg"
                      alt="Análisis de Precios"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 flex items-center justify-center">
                      <div className="text-center text-white">
                        <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3">
                          <LineChart className="w-8 h-8" />
                          Análisis Inteligente de Precios
                        </h2>
                        <p className="text-lg opacity-90">
                          Encuentra el mejor momento para viajar con nuestra IA de predicción de precios
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Date Selector and Controls */}
                <Card className="border-2 border-primary/20">
                  <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                    <CardTitle className="flex items-center gap-2">
                      <CalendarDays className="w-5 h-5" />
                      Selector de Fechas Inteligente
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Fecha Central
                        </label>
                        <input
                          type="date"
                          value={selectedDate.toISOString().split('T')[0]}
                          onChange={(e) => setSelectedDate(new Date(e.target.value))}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                          <Filter className="w-4 h-4" />
                          Rango de Días
                        </label>
                        <select
                          value={priceRange}
                          onChange={(e) => setPriceRange(Number(e.target.value))}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value={5}>± 5 días</option>
                          <option value={10}>± 10 días</option>
                          <option value={15}>± 15 días</option>
                          <option value={30}>± 30 días</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                          <Search className="w-4 h-4" />
                          Análisis
                        </label>
                        <Button 
                          onClick={() => setShowPriceAnalysis(!showPriceAnalysis)}
                          className="w-full"
                          variant={showPriceAnalysis ? "default" : "outline"}
                        >
                          <Zap className="w-4 h-4 mr-2" />
                          {showPriceAnalysis ? 'Ocultar' : 'Generar'} Análisis
                        </Button>
                      </div>
                    </div>

                    {/* Price Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                      <Card className="text-center">
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-center mb-2">
                            <TrendingDown className="w-6 h-6 text-green-600" />
                          </div>
                          <p className="text-2xl font-bold text-green-600">${minPrice}</p>
                          <p className="text-sm text-muted-foreground">Precio Mínimo</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="text-center">
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-center mb-2">
                            <TrendingUp className="w-6 h-6 text-red-600" />
                          </div>
                          <p className="text-2xl font-bold text-red-600">${maxPrice}</p>
                          <p className="text-sm text-muted-foreground">Precio Máximo</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="text-center">
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-center mb-2">
                            <BarChart3 className="w-6 h-6 text-blue-600" />
                          </div>
                          <p className="text-2xl font-bold text-blue-600">${avgPrice}</p>
                          <p className="text-sm text-muted-foreground">Precio Promedio</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="text-center">
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-center mb-2">
                            <DollarSign className="w-6 h-6 text-purple-600" />
                          </div>
                          <p className="text-2xl font-bold text-purple-600">${maxPrice - minPrice}</p>
                          <p className="text-sm text-muted-foreground">Diferencia</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>

                {/* Interactive Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Línea de Tiempo de Precios
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Timeline Header */}
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Fecha Seleccionada: {formatDate(selectedDate)}</span>
                        <span>Mostrando {priceRange * 2 + 1} días</span>
                      </div>
                      
                      {/* Timeline Grid */}
                      <div className="relative">
                        <div className="grid grid-cols-7 lg:grid-cols-11 gap-2">
                          {priceTimeline.map((item, index) => {
                            const heightPercentage = ((item.price - minPrice) / (maxPrice - minPrice)) * 100;
                            const isSelected = item.isSelected;
                            
                            return (
                              <div key={index} className="flex flex-col items-center space-y-2">
                                {/* Date and Day */}
                                <div className="text-center text-xs">
                                  <div className="font-medium">{item.dayOfWeek}</div>
                                  <div className="text-muted-foreground">
                                    {item.date.getDate()}/{item.date.getMonth() + 1}
                                  </div>
                                </div>
                                
                                {/* Price Bar */}
                                <div className="relative w-full h-32 bg-muted rounded-lg overflow-hidden">
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
                                    {/* Price Label */}
                                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap">
                                      ${item.price}
                                    </div>
                                    
                                    {/* Trend Arrow */}
                                    <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
                                      {item.trend === 'up' && <TrendingUp className="w-3 h-3 text-white" />}
                                      {item.trend === 'down' && <TrendingDown className="w-3 h-3 text-white" />}
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Availability Indicator */}
                                <div className="text-xs text-center">
                                  <div className={`w-2 h-2 rounded-full mx-auto mb-1 ${
                                    item.availability > 30 ? 'bg-green-500' : 
                                    item.availability > 15 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}></div>
                                  <span className="text-muted-foreground">{item.availability} plazas</span>
                                </div>
                                
                                {/* Select Button */}
                                <Button 
                                  size="sm" 
                                  variant={isSelected ? "default" : "outline"}
                                  className="text-xs px-2 py-1 h-6"
                                  onClick={() => setSelectedDate(new Date(item.date))}
                                >
                                  {isSelected ? 'Seleccionado' : 'Seleccionar'}
                                </Button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      {/* Legend */}
                      <div className="flex flex-wrap justify-center gap-4 text-xs">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-gradient-to-t from-primary to-primary/70 rounded"></div>
                          <span>Fecha Seleccionada</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-red-500" />
                          <span>Precio Subiendo</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingDown className="w-3 h-3 text-green-500" />
                          <span>Precio Bajando</span>
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

                {/* Recommendations */}
                {showPriceAnalysis && (
                  <Card className="border-2 border-green-200 bg-green-50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-800">
                        <Zap className="w-5 h-5" />
                        Recomendaciones IA
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-white rounded-lg border border-green-200">
                          <h4 className="font-semibold text-green-800 mb-2">💡 Mejor Momento para Viajar</h4>
                          <p className="text-sm text-green-700">
                            El precio más bajo es el {formatDate(priceTimeline.find(p => p.price === minPrice)?.date || new Date())} 
                            con ${minPrice}. Esto representa un ahorro de ${maxPrice - minPrice} comparado con el precio más alto.
                          </p>
                        </div>
                        
                        <div className="p-4 bg-white rounded-lg border border-green-200">
                          <h4 className="font-semibold text-green-800 mb-2">📈 Tendencia de Precios</h4>
                          <p className="text-sm text-green-700">
                            Los fines de semana tienden a ser más caros. Los días entre semana ofrecen mejor valor.
                            La diferencia promedio es de ${Math.round((maxPrice - minPrice) * 0.15)}.
                          </p>
                        </div>
                        
                        <div className="p-4 bg-white rounded-lg border border-green-200">
                          <h4 className="font-semibold text-green-800 mb-2">🎯 Estrategia Recomendada</h4>
                          <p className="text-sm text-green-700">
                            Para maximizar el ahorro, reserva para fechas con alta disponibilidad y precios bajos. 
                            Monitor iza la tendencia durante los próximos días para detectar descensos adicionales.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Acciones */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
             
              <Button variant="outline" size="lg" className="px-8">
                <Download className="w-5 h-5 mr-2" />
                Exportar PDF
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                <Eye className="w-5 h-5 mr-2" />
                Vista Previa
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                <Heart className="w-5 h-5 mr-2" />
                Favorito
              </Button>
              <Button 
                variant="destructive" 
                size="lg" 
                className="px-8"
                onClick={handleEliminar}
              >
                <Trash2 className="w-5 h-5 mr-2" />
                Eliminar
              </Button>
              <Button 
                size="lg" 
                className="px-8 bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={() => router.push('/administradores/pagos-paquete-cotizacion')}
              >
                <FileText className="w-5 h-5 mr-2" />
                Crear Cotización
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
