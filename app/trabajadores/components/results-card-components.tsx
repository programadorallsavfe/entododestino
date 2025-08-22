"use client";

import { useState, useEffect } from "react";
import { 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Plane, 
  Clock, 
  Car, 
  Building, 
  Ticket, 
  Globe,
  ArrowRight,
  Filter,
  SortAsc,
  Search,
  TrendingDown,
  TrendingUp,
  Info,
  ChevronRight
} from "lucide-react";
import Image from "next/image";

// Importar componentes de shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Importar mockdata
import { hotels } from "@/utils/mockdata-hoteles";
import { vuelos } from "@/utils/mockdata-vuelos";
import { destinosEjemplo } from "@/utils/mockdata-destinos";

// Importar componentes de cotización
import { DetallesCotizacion } from "./detalles-cotizacion";

interface SearchParams {
  category: string;
  countries?: string[];
  destinations?: string[];
  date?: string;
  nights?: string;
  origin?: string;
  destination?: string;
  departureDate?: string;
  returnDate?: string;
  passengers?: string;
  class?: string;
  accommodationType?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  nationality?: string;
  event?: string;
  month?: string;
}

interface ResultsCardComponentsProps {
  searchParams: SearchParams;
  isVisible: boolean;
  onSelectOption?: (optionData: any) => void;
}

export const ResultsCardComponents = ({ searchParams, isVisible, onSelectOption }: ResultsCardComponentsProps) => {
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState("price-asc");
  const [priceRange, setPriceRange] = useState([0, 7000]);
  const [selectedRating, setSelectedRating] = useState<number[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showPriceComparison, setShowPriceComparison] = useState(false);
  const [showDetallesCotizacion, setShowDetallesCotizacion] = useState(false);
  const [reservationData, setReservationData] = useState<any>(null);

  useEffect(() => {
    if (searchParams && isVisible) {
      generateResults();
    }
  }, [searchParams, isVisible]);

  const generateResults = () => {
    let results: any[] = [];
    
    switch (searchParams.category) {
      case "alojamiento":
        results = generateAccommodationResults();
        break;
      case "transporte-hotel":
        results = generateTransportHotelResults();
        break;
      case "transportes":
        results = generateTransportResults();
        break;
      case "actividades":
        results = generateActivitiesResults();
        break;
      case "traslados":
        results = generateTransfersResults();
        break;
      case "multidestino":
        results = generateMultiDestinationResults();
        break;
      case "ai-trips":
        results = generateAITripsResults();
        break;
      case "trip-planner":
        results = generateTripPlannerResults();
        break;
      case "paquetes":
        results = generatePackagesResults();
        break;
      default:
        results = generateAccommodationResults();
    }
    
    setFilteredResults(results);
  };

  const generateAccommodationResults = () => {
    const peruHotels = [
      {
        name: "Belmond Hotel Monasterio",
        location: "Cusco, Perú",
        price: 450,
        rating: 5,
        amenities: ["WiFi", "Spa", "Restaurante Gourmet"],
        description: "Hotel de lujo en un monasterio del siglo XVI en el corazón de Cusco",
        reviews: 892
      },
      {
        name: "JW Marriott El Convento Cusco",
        location: "Cusco, Perú",
        price: 380,
        rating: 5,
        amenities: ["WiFi", "Piscina", "Restaurante"],
        description: "Hotel de 5 estrellas con vistas espectaculares a la ciudad imperial",
        reviews: 567
      },
      {
        name: "Palacio del Inka, a Luxury Collection Hotel",
        location: "Cusco, Perú",
        price: 420,
        rating: 5,
        amenities: ["WiFi", "Spa", "Bar"],
        description: "Palacio colonial restaurado con elegancia y confort moderno",
        reviews: 734
      },
      {
        name: "Casa Andina Premium Cusco",
        location: "Cusco, Perú",
        price: 280,
        rating: 4,
        amenities: ["WiFi", "Restaurante", "Terraza"],
        description: "Hotel boutique en el centro histórico de Cusco",
        reviews: 445
      },
      {
        name: "Tambo del Inka, a Luxury Collection Resort",
        location: "Valle Sagrado, Perú",
        price: 520,
        rating: 5,
        amenities: ["WiFi", "Spa", "Piscina"],
        description: "Resort de lujo en el Valle Sagrado de los Incas",
        reviews: 623
      },
      {
        name: "Libertador Machu Picchu",
        location: "Machu Picchu, Perú",
        price: 390,
        rating: 4,
        amenities: ["WiFi", "Restaurante", "Vistas"],
        description: "Hotel con vistas directas a la ciudadela de Machu Picchu",
        reviews: 512
      },
      {
        name: "Costa del Sol Wyndham Lima",
        location: "Lima, Perú",
        price: 320,
        rating: 4,
        amenities: ["WiFi", "Piscina", "Restaurante"],
        description: "Hotel moderno en el distrito financiero de Lima",
        reviews: 678
      },
      {
        name: "Swissôtel Lima",
        location: "Lima, Perú",
        price: 350,
        rating: 5,
        amenities: ["WiFi", "Spa", "Piscina"],
        description: "Hotel de lujo en el centro histórico de Lima",
        reviews: 456
      }
    ];

    return peruHotels.map((hotel, index) => ({
      id: index + 1,
      type: "hotel",
      name: hotel.name,
      location: hotel.location,
      rating: hotel.rating,
      price: hotel.price,
      image: "/assets/banner.jpg",
      amenities: hotel.amenities,
      description: hotel.description,
      reviews: hotel.reviews
    }));
  };

  const generateTransportResults = () => {
    const peruFlights = [
      {
        airline: "LATAM Airlines",
        origin: "Lima, Perú",
        destination: "Cusco, Perú",
        departure: "08:30",
        arrival: "09:45",
        price: 120,
        duration: "1h 15m",
        class: "Económica",
        stops: "Directo"
      },
      {
        airline: "Avianca",
        origin: "Lima, Perú",
        destination: "Arequipa, Perú",
        departure: "10:15",
        arrival: "11:25",
        price: 95,
        duration: "1h 10m",
        class: "Económica",
        stops: "Directo"
      },
      {
        airline: "LATAM Airlines",
        origin: "Lima, Perú",
        destination: "Trujillo, Perú",
        departure: "14:20",
        arrival: "15:30",
        price: 85,
        duration: "1h 10m",
        class: "Económica",
        stops: "Directo"
      },
      {
        airline: "Avianca",
        origin: "Lima, Perú",
        destination: "Piura, Perú",
        departure: "16:45",
        arrival: "18:00",
        price: 110,
        duration: "1h 15m",
        class: "Económica",
        stops: "Directo"
      },
      {
        airline: "LATAM Airlines",
        origin: "Cusco, Perú",
        destination: "Lima, Perú",
        departure: "18:30",
        arrival: "19:45",
        price: 130,
        duration: "1h 15m",
        class: "Económica",
        stops: "Directo"
      },
      {
        airline: "Avianca",
        origin: "Arequipa, Perú",
        destination: "Lima, Perú",
        departure: "20:15",
        arrival: "21:25",
        price: 105,
        duration: "1h 10m",
        class: "Económica",
        stops: "Directo"
      },
      {
        airline: "LATAM Airlines",
        origin: "Lima, Perú",
        destination: "Iquitos, Perú",
        departure: "07:00",
        arrival: "08:30",
        price: 140,
        duration: "1h 30m",
        class: "Económica",
        stops: "Directo"
      },
      {
        airline: "Avianca",
        origin: "Lima, Perú",
        destination: "Tacna, Perú",
        departure: "12:30",
        arrival: "13:45",
        price: 90,
        duration: "1h 15m",
        class: "Económica",
        stops: "Directo"
      }
    ];

    return peruFlights.map((flight, index) => ({
      id: index + 1,
      type: "flight",
      airline: flight.airline,
      origin: flight.origin,
      destination: flight.destination,
      departure: flight.departure,
      arrival: flight.arrival,
      price: flight.price,
      duration: flight.duration,
      class: flight.class,
      stops: flight.stops,
      image: "/assets/banner.jpg"
    }));
  };

  const  generateMultiDestinationResults = () => {
    const peruPackages = [
      {
        title: "Ruta Inca Completa",
        destinations: ["Lima", "Cusco", "Machu Picchu", "Valle Sagrado"],
        duration: "8 días",
        price: 2800,
        rating: 5,
        description: "Descubre la ruta completa de los Incas desde Lima hasta Machu Picchu",
        highlights: ["Vuelos incluidos", "Hoteles 4-5 estrellas", "Guía turístico", "Traslados", "Tren a Machu Picchu"]
      },
      {
        title: "Costa y Sierra Peruana",
        destinations: ["Lima", "Paracas", "Ica", "Arequipa", "Colca"],
        duration: "10 días",
        price: 3200,
        rating: 5,
        description: "Explora la costa del Pacífico y la majestuosa sierra peruana",
        highlights: ["Vuelos incluidos", "Hoteles 4-5 estrellas", "Guía turístico", "Traslados", "Reserva de Paracas"]
      },
      {
        title: "Amazonas y Andes",
        destinations: ["Lima", "Iquitos", "Cusco", "Machu Picchu"],
        duration: "12 días",
        price: 3800,
        rating: 5,
        description: "Combina la selva amazónica con la majestuosidad de los Andes",
        highlights: ["Vuelos incluidos", "Lodge en Amazonas", "Hoteles 5 estrellas", "Guía turístico", "Traslados"]
      },
      {
        title: "Norte Místico",
        destinations: ["Lima", "Trujillo", "Chiclayo", "Piura", "Máncora"],
        duration: "9 días",
        price: 2500,
        rating: 4,
        description: "Descubre las civilizaciones pre-incas del norte peruano",
        highlights: ["Vuelos incluidos", "Hoteles 4 estrellas", "Guía turístico", "Traslados", "Playas de Máncora"]
      },
      {
        title: "Sur Profundo",
        destinations: ["Lima", "Arequipa", "Puno", "Titicaca", "Cusco"],
        duration: "11 días",
        price: 3500,
        rating: 5,
        description: "Explora el sur profundo de Perú desde Arequipa hasta Cusco",
        highlights: ["Vuelos incluidos", "Hoteles 4-5 estrellas", "Guía turístico", "Traslados", "Lago Titicaca"]
      },
      {
        title: "Luxury Peru Experience",
        destinations: ["Lima", "Cusco", "Machu Picchu", "Valle Sagrado"],
        duration: "7 días",
        price: 5200,
        rating: 5,
        description: "Experiencia de lujo en los destinos más exclusivos de Perú",
        highlights: ["Vuelos primera clase", "Hoteles de lujo", "Guía privado", "Traslados VIP", "Experiencias exclusivas"]
      }
    ];

    return peruPackages.map((pkg, index) => ({
      id: index + 1,
      type: "package",
      title: pkg.title,
      destinations: pkg.destinations,
      duration: pkg.duration,
      price: pkg.price,
      rating: pkg.rating,
      image: "/assets/banner.jpg",
      description: pkg.description,
      highlights: pkg.highlights
    }));
  };

  const generateActivitiesResults = () => {
    const peruActivities = [
      {
        name: "Tour por el Centro Histórico de Lima",
        location: "Lima, Perú",
        price: 45,
        rating: 5,
        duration: "3 horas",
        description: "Descubre la arquitectura colonial y la historia de la Ciudad de los Reyes",
        includes: ["Guía experto", "Entradas incluidas", "Refrigerio", "Seguro"]
      },
      {
        name: "Excursión a Machu Picchu",
        location: "Cusco, Perú",
        price: 180,
        rating: 5,
        duration: "12 horas",
        description: "Visita la ciudadela inca más impresionante del mundo",
        includes: ["Guía experto", "Transporte", "Entrada", "Almuerzo buffet"]
      },
      {
        name: "Tour por el Valle Sagrado",
        location: "Cusco, Perú",
        price: 85,
        rating: 5,
        duration: "8 horas",
        description: "Explora los pueblos y sitios arqueológicos del Valle Sagrado",
        includes: ["Guía experto", "Transporte", "Entradas", "Almuerzo"]
      },
      {
        name: "Reserva Nacional de Paracas",
        location: "Paracas, Perú",
        price: 65,
        rating: 4,
        duration: "4 horas",
        description: "Observa la fauna marina y las formaciones rocosas de la costa",
        includes: ["Guía experto", "Transporte", "Entrada", "Refrigerio"]
      },
      {
        name: "Degustación Gastronómica en Lima",
        location: "Lima, Perú",
        price: 75,
        rating: 5,
        duration: "3 horas",
        description: "Prueba la mejor cocina peruana en restaurantes locales",
        includes: ["Chef experto", "Degustación completa", "Bebidas", "Recetas"]
      },
      {
        name: "Paseo en Barco por el Lago Titicaca",
        location: "Puno, Perú",
        price: 55,
        rating: 4,
        duration: "6 horas",
        description: "Navega por el lago navegable más alto del mundo",
        includes: ["Guía experto", "Transporte en barco", "Visita a islas", "Almuerzo"]
      },
      {
        name: "Safari Fotográfico en la Amazonía",
        location: "Iquitos, Perú",
        price: 120,
        rating: 5,
        duration: "8 horas",
        description: "Captura la biodiversidad de la selva amazónica peruana",
        includes: ["Guía experto", "Equipamiento fotográfico", "Transporte", "Almuerzo"]
      },
      {
        name: "Clase de Cocina Peruana",
        location: "Cusco, Perú",
        price: 60,
        rating: 5,
        duration: "4 horas",
        description: "Aprende a preparar platos típicos peruanos con ingredientes locales",
        includes: ["Chef experto", "Ingredientes", "Equipamiento", "Degustación"]
      }
    ];
    
    return peruActivities.map((activity, index) => ({
      id: index + 1,
      type: "activity",
      name: activity.name,
      location: activity.location,
      price: activity.price,
      rating: activity.rating,
      duration: activity.duration,
      image: "/assets/banner.jpg",
      description: activity.description,
      includes: activity.includes
    }));
  };

  const generateTransfersResults = () => {
    const peruTransfers = [
      {
        service: "Aeropuerto Jorge Chávez - Centro de Lima",
        origin: "Aeropuerto Jorge Chávez",
        destination: "Centro de Lima",
        price: 35,
        duration: "45 min",
        vehicle: "Sedán",
        description: "Traslado directo desde el aeropuerto principal de Lima al centro histórico",
        features: ["Conductor profesional", "Aire acondicionado", "WiFi gratuito", "Agua embotellada"]
      },
      {
        service: "Centro de Lima - Aeropuerto Jorge Chávez",
        origin: "Centro de Lima",
        destination: "Aeropuerto Jorge Chávez",
        price: 35,
        duration: "45 min",
        vehicle: "Sedán",
        description: "Traslado puntual desde el centro de Lima al aeropuerto internacional",
        features: ["Conductor profesional", "Aire acondicionado", "WiFi gratuito", "Agua embotellada"]
      },
      {
        service: "Aeropuerto Alejandro Velasco Astete - Centro de Cusco",
        origin: "Aeropuerto de Cusco",
        destination: "Centro de Cusco",
        price: 25,
        duration: "20 min",
        vehicle: "Van",
        description: "Traslado desde el aeropuerto de Cusco al centro histórico de la ciudad imperial",
        features: ["Conductor profesional", "Aire acondicionado", "WiFi gratuito", "Agua embotellada"]
      },
      {
        service: "Centro de Cusco - Estación de Tren a Machu Picchu",
        origin: "Centro de Cusco",
        destination: "Estación de Tren",
        price: 20,
        duration: "30 min",
        vehicle: "Van",
        description: "Traslado desde el centro de Cusco a la estación de tren hacia Machu Picchu",
        features: ["Conductor profesional", "Aire acondicionado", "WiFi gratuito", "Agua embotellada"]
      },
      {
        service: "Aeropuerto Rodríguez Ballón - Centro de Arequipa",
        origin: "Aeropuerto de Arequipa",
        destination: "Centro de Arequipa",
        price: 30,
        duration: "25 min",
        vehicle: "Sedán",
        description: "Traslado desde el aeropuerto de Arequipa al centro de la Ciudad Blanca",
        features: ["Conductor profesional", "Aire acondicionado", "WiFi gratuito", "Agua embotellada"]
      },
      {
        service: "Puerto de Paracas - Hotel en Paracas",
        origin: "Puerto de Paracas",
        destination: "Hotel en Paracas",
        price: 15,
        duration: "10 min",
        vehicle: "Van",
        description: "Traslado corto desde el puerto de Paracas a hoteles locales",
        features: ["Conductor profesional", "Aire acondicionado", "WiFi gratuito", "Agua embotellada"]
      },
      {
        service: "Aeropuerto de Iquitos - Lodge en Amazonas",
        origin: "Aeropuerto de Iquitos",
        destination: "Lodge en Amazonas",
        price: 45,
        duration: "90 min",
        vehicle: "Van 4x4",
        description: "Traslado aventurero desde el aeropuerto de Iquitos a lodges en la selva",
        features: ["Conductor experto", "Aire acondicionado", "WiFi gratuito", "Agua embotellada", "Equipamiento de seguridad"]
      },
      {
        service: "Centro de Trujillo - Sitios Arqueológicos",
        origin: "Centro de Trujillo",
        destination: "Chan Chan y Huacas",
        price: 40,
        duration: "60 min",
        vehicle: "Van",
        description: "Traslado turístico desde Trujillo a los sitios arqueológicos pre-incas",
        features: ["Conductor profesional", "Aire acondicionado", "WiFi gratuito", "Agua embotellada", "Guía turístico"]
      }
    ];
    
    return peruTransfers.map((transfer, index) => ({
      id: index + 1,
      type: "transfer",
      service: transfer.service,
      origin: transfer.origin,
      destination: transfer.destination,
      price: transfer.price,
      duration: transfer.duration,
      vehicle: transfer.vehicle,
      image: "/assets/banner.jpg",
      description: transfer.description,
      features: transfer.features
    }));
  };

  const generateTransportHotelResults = () => {
    const peruPackages = [
      {
        title: "Lima - Cusco Básico",
        origin: "Lima, Perú",
        destination: "Cusco, Perú",
        duration: "4 días",
        price: 850,
        rating: 4,
        description: "Paquete básico con vuelo Lima-Cusco y hotel 3 estrellas",
        includes: ["Vuelo ida y vuelta", "Hotel 3 estrellas", "Desayuno", "Traslados"]
      },
      {
        title: "Lima - Machu Picchu Premium",
        origin: "Lima, Perú",
        destination: "Machu Picchu, Perú",
        duration: "5 días",
        price: 1200,
        rating: 5,
        description: "Paquete premium con vuelo, hotel 4 estrellas y tren a Machu Picchu",
        includes: ["Vuelo ida y vuelta", "Hotel 4 estrellas", "Desayuno", "Tren a Machu Picchu", "Traslados"]
      },
      {
        title: "Lima - Arequipa Lujo",
        origin: "Lima, Perú",
        destination: "Arequipa, Perú",
        duration: "6 días",
        price: 1500,
        rating: 5,
        description: "Paquete de lujo con vuelo y hotel 5 estrellas en la Ciudad Blanca",
        includes: ["Vuelo ida y vuelta", "Hotel 5 estrellas", "Desayuno", "Tours incluidos", "Traslados VIP"]
      },
      {
        title: "Lima - Paracas Estándar",
        origin: "Lima, Perú",
        destination: "Paracas, Perú",
        duration: "3 días",
        price: 650,
        rating: 4,
        description: "Paquete estándar con vuelo y hotel en la Reserva de Paracas",
        includes: ["Vuelo ida y vuelta", "Hotel 4 estrellas", "Desayuno", "Traslados"]
      },
      {
        title: "Lima - Iquitos Aventura",
        origin: "Lima, Perú",
        destination: "Iquitos, Perú",
        duration: "7 días",
        price: 1800,
        rating: 5,
        description: "Paquete de aventura con vuelo y lodge en la Amazonía peruana",
        includes: ["Vuelo ida y vuelta", "Lodge en Amazonas", "Todas las comidas", "Tours de selva", "Traslados"]
      },
      {
        title: "Lima - Trujillo Cultural",
        origin: "Lima, Perú",
        destination: "Trujillo, Perú",
        duration: "4 días",
        price: 750,
        rating: 4,
        description: "Paquete cultural con vuelo y hotel para explorar Chan Chan",
        includes: ["Vuelo ida y vuelta", "Hotel 4 estrellas", "Desayuno", "Tours arqueológicos", "Traslados"]
      }
    ];

    return peruPackages.map((pkg, index) => ({
      id: index + 1,
      type: "package",
      title: pkg.title,
      origin: pkg.origin,
      destination: pkg.destination,
      duration: pkg.duration,
      price: pkg.price,
      rating: pkg.rating,
      image: "/assets/banner.jpg",
      description: pkg.description,
      includes: pkg.includes
    }));
  };

  const generateAITripsResults = () => {
    return Array.from({ length: 4 }, (_, index) => ({
      id: index + 1,
      type: "ai-trip",
      title: `Viaje AI ${["Personalizado", "Aventura", "Cultural", "Relax"][index]}`,
      destination: ["Europa", "Asia", "América", "África"][index],
      duration: `${Math.floor(Math.random() * 15) + 7} días`,
      price: Math.floor(Math.random() * 12000) + 5000,
      rating: 5,
      image: "/assets/banner.jpg",
      description: "Viaje diseñado por IA según tus preferencias y estilo de vida",
      features: ["Itinerario personalizado", "Recomendaciones IA", "Reservas automáticas", "Soporte 24/7"]
    }));
  };

  const generateTripPlannerResults = () => {
    return Array.from({ length: 5 }, (_, index) => ({
      id: index + 1,
      type: "planner",
      title: `Planificador ${["Básico", "Estándar", "Premium", "VIP", "Personalizado"][index]}`,
      destinations: Math.floor(Math.random() * 5) + 1,
      duration: `${Math.floor(Math.random() * 20) + 5} días`,
      price: Math.floor(Math.random() * 3000) + 500,
      rating: Math.floor(Math.random() * 5) + 1,
      image: "/assets/banner.jpg",
      description: "Servicio de planificación de viajes personalizado",
      services: ["Consultoría", "Itinerario", "Reservas", "Seguimiento", "Ajustes"]
    }));
  };

  const generatePackagesResults = () => {
    const peruVacationPackages = [
      {
        title: "Perú Clásico",
        destinations: ["Lima", "Cusco", "Machu Picchu", "Valle Sagrado"],
        duration: "8 días",
        price: 2800,
        rating: 5,
        description: "Descubre los destinos más emblemáticos de Perú en un paquete completo",
        includes: ["Vuelos domésticos", "Hoteles 4-5 estrellas", "Guía turístico", "Traslados", "Tren a Machu Picchu"]
      },
      {
        title: "Perú Completo",
        destinations: ["Lima", "Paracas", "Ica", "Arequipa", "Colca", "Cusco", "Machu Picchu"],
        duration: "15 días",
        price: 4800,
        rating: 5,
        description: "Explora Perú de norte a sur con este paquete integral",
        includes: ["Vuelos domésticos", "Hoteles 4-5 estrellas", "Guía turístico", "Traslados", "Tren a Machu Picchu", "Tours incluidos"]
      },
      {
        title: "Perú Aventura",
        destinations: ["Lima", "Iquitos", "Cusco", "Machu Picchu", "Valle Sagrado"],
        duration: "12 días",
        price: 3800,
        rating: 5,
        description: "Combina la selva amazónica con la majestuosidad de los Andes",
        includes: ["Vuelos domésticos", "Lodge en Amazonas", "Hoteles 4-5 estrellas", "Guía turístico", "Traslados", "Actividades de aventura"]
      },
      {
        title: "Perú Cultural",
        destinations: ["Lima", "Trujillo", "Chiclayo", "Cusco", "Machu Picchu"],
        duration: "14 días",
        price: 4200,
        rating: 5,
        description: "Sumérgete en la rica historia y cultura de las civilizaciones pre-incas e incas",
        includes: ["Vuelos domésticos", "Hoteles 4-5 estrellas", "Guía turístico", "Traslados", "Tours arqueológicos", "Museos incluidos"]
      },
      {
        title: "Perú Costa y Sierra",
        destinations: ["Lima", "Paracas", "Ica", "Arequipa", "Colca", "Puno", "Titicaca"],
        duration: "13 días",
        price: 3900,
        rating: 5,
        description: "Explora la costa del Pacífico y la majestuosa sierra peruana",
        includes: ["Vuelos domésticos", "Hoteles 4-5 estrellas", "Guía turístico", "Traslados", "Reserva de Paracas", "Lago Titicaca"]
      },
      {
        title: "Perú Luxury Experience",
        destinations: ["Lima", "Cusco", "Machu Picchu", "Valle Sagrado"],
        duration: "10 días",
        price: 6800,
        rating: 5,
        description: "Experiencia de lujo en los destinos más exclusivos de Perú",
        includes: ["Vuelos primera clase", "Hoteles de lujo", "Guía privado", "Traslados VIP", "Experiencias exclusivas", "Restaurantes gourmet"]
      },
      {
        title: "Perú Familiar",
        destinations: ["Lima", "Cusco", "Machu Picchu", "Valle Sagrado"],
        duration: "9 días",
        price: 3200,
        rating: 5,
        description: "Paquete diseñado especialmente para familias con niños",
        includes: ["Vuelos domésticos", "Hoteles familiares", "Guía especializado", "Traslados", "Actividades para niños", "Alojamiento familiar"]
      },
      {
        title: "Perú Gastronómico",
        destinations: ["Lima", "Cusco", "Machu Picchu", "Arequipa"],
        duration: "11 días",
        price: 3600,
        rating: 5,
        description: "Descubre la rica gastronomía peruana en sus mejores restaurantes",
        includes: ["Vuelos domésticos", "Hoteles 4-5 estrellas", "Guía gastronómico", "Traslados", "Clases de cocina", "Degustaciones incluidas"]
      }
    ];

    return peruVacationPackages.map((pkg, index) => ({
      id: index + 1,
      type: "package",
      title: pkg.title,
      destinations: pkg.destinations,
      duration: pkg.duration,
      price: pkg.price,
      rating: pkg.rating,
      image: "/assets/banner.jpg",
      description: pkg.description,
      includes: pkg.includes
    }));
  };

  const handleSort = (value: string) => {
    setSortBy(value);
    let sorted = [...filteredResults];
    
    switch (value) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "duration":
        sorted.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
        break;
    }
    
    setFilteredResults(sorted);
  };

  const handleSelectItem = (item: any) => {
    console.log('Item seleccionado:', item);
    
    // Siempre mostrar el modal de comparación de precios primero
    setSelectedItem(item);
    setShowPriceComparison(true);
  };

  const closePriceComparison = () => {
    setShowPriceComparison(false);
    setSelectedItem(null);
  };

  const generatePriceComparison = (basePrice: number, type: string) => {
    const variation = type === 'hotel' ? 0.15 : type === 'flight' ? 0.25 : 0.20;
    
    return {
      previousWeek: {
        price: Math.round(basePrice * (1 - (Math.random() * variation + 0.05))),
        date: "Hace 1 semana",
        savings: Math.round(basePrice * (Math.random() * variation + 0.05))
      },
      nextWeek: {
        price: Math.round(basePrice * (1 + (Math.random() * variation + 0.05))),
        date: "En 1 semana",
        increase: Math.round(basePrice * (Math.random() * variation + 0.05))
      },
      hasSavings: Math.random() > 0.5
    };
  };

  const closeDetallesCotizacion = () => {
    setShowDetallesCotizacion(false);
    setReservationData(null);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };



  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };



                  // Componente Modal para Comparación de Precios con Filtrador de Fechas
                const PriceComparisonModal = () => {
                  console.log('Modal renderizando:', { showPriceComparison, selectedItem });
                  if (!showPriceComparison || !selectedItem) return null;
                  
                  const [selectedDate, setSelectedDate] = useState<string>('');
                  const [dateRange, setDateRange] = useState<{ start: string; end: string }>(() => {
                    const today = new Date();
                    const startDate = new Date(today);
                    startDate.setDate(today.getDate() - 10);
                    
                    const endDate = new Date(today);
                    endDate.setDate(today.getDate() + 10);
                    
                    return {
                      start: startDate.toISOString().split('T')[0],
                      end: endDate.toISOString().split('T')[0]
                    };
                  });

                  // Estado para el rango de fechas seleccionado por el usuario
                  const [userDateRange, setUserDateRange] = useState<{ start: string; end: string }>({
                    start: dateRange.start,
                    end: dateRange.end
                  });

                  const handleReservar = (selectedDate: string) => {
                    if (!selectedDate || !selectedItem) return;
                    
                    // Encontrar el precio para la fecha seleccionada
                    const selectedDateData = pricesForDates.find((d: any) => d.date === selectedDate);
                    const finalPrice = selectedDateData ? selectedDateData.price : selectedItem.price;
                    
                    // Si tenemos la función onSelectOption, llamarla con los datos del item y la fecha seleccionada
                    if (onSelectOption) {
                      const itemWithDate = {
                        ...selectedItem,
                        selectedDate: selectedDate,
                        finalPrice: finalPrice
                      };
                      onSelectOption(itemWithDate);
                      setShowPriceComparison(false);
                      return;
                    }
                    
                    // Si no, mostrar la vista de detalles de cotización (comportamiento anterior)
                    const reservationInfo = {
                      item: selectedItem,
                      selectedDate: selectedDate,
                      price: finalPrice,
                      searchParams: searchParams,
                      timestamp: new Date().toISOString()
                    };
                    
                    setReservationData(reservationInfo);
                    setShowDetallesCotizacion(true);
                    setShowPriceComparison(false);
                  };
    
    // Establecer fecha seleccionada por defecto (hoy)
    useEffect(() => {
      if (showPriceComparison) {
        const today = new Date().toISOString().split('T')[0];
        setSelectedDate(today);
      }
    }, [showPriceComparison]);
    
    // Generar precios para diferentes fechas
    const generatePricesForDates = () => {
      const basePrice = selectedItem.price;
      const variation = selectedItem.type === 'hotel' ? 0.25 : selectedItem.type === 'flight' ? 0.35 : 0.30;
      
      const dates = [];
      const startDate = new Date(userDateRange.start);
      const endDate = new Date(userDateRange.end);
      const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      
      for (let i = 0; i < totalDays; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        
        const priceVariation = (Math.random() - 0.5) * variation;
        const price = Math.round(basePrice * (1 + priceVariation));
        
        dates.push({
          date: currentDate.toISOString().split('T')[0],
          price,
          isSelected: currentDate.toISOString().split('T')[0] === selectedDate,
          isLowest: false
        });
      }
      
      // Marcar el precio más bajo
      const lowestPrice = Math.min(...dates.map(d => d.price));
      dates.forEach(date => {
        if (date.price === lowestPrice) {
          date.isLowest = true;
        }
      });
      
      return dates;
    };
    
    const pricesForDates = generatePricesForDates();
    const lowestPrice = Math.min(...pricesForDates.map(d => d.price));
    const highestPrice = Math.max(...pricesForDates.map(d => d.price));
    
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] flex flex-col">
          {/* Header del Modal con Botón de Cerrar */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Comparación de Precios
                </h3>
                <p className="text-sm text-slate-600">
                  {selectedItem.name || selectedItem.title}
                </p>
              </div>
            </div>
            
            {/* Botón de Cerrar en Header */}
            <Button
              variant="ghost"
              size="sm"
              className="w-10 h-10 rounded-full hover:bg-slate-200"
              onClick={closePriceComparison}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
          
          {/* Contenido del Modal - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Información del Item Seleccionado */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-xl self-center sm:self-start">
                        <Building className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h4 className="text-2xl font-bold text-slate-900 mb-3">
                          {selectedItem.name || selectedItem.title}
                        </h4>
                        <p className="text-lg text-slate-600 mb-6">
                          {selectedItem.location || `${selectedItem.origin} → ${selectedItem.destination}`}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-white rounded-xl border border-blue-200 shadow-sm">
                            <span className="text-sm text-blue-600 uppercase tracking-wide font-medium">Precio Base</span>
                            <div className="text-2xl font-bold text-slate-900 mt-2">{formatPrice(selectedItem.price)}</div>
                          </div>
                          <div className="text-center p-4 bg-white rounded-xl border border-blue-200 shadow-sm">
                            <span className="text-sm text-blue-600 uppercase tracking-wide font-medium">Rango de Precios</span>
                            <div className="text-xl font-semibold text-slate-900 mt-2">
                              {formatPrice(lowestPrice)} - {formatPrice(highestPrice)}
                            </div>
                          </div>
                          <div className="text-center p-4 bg-white rounded-xl border border-blue-200 shadow-sm">
                            <span className="text-sm text-blue-600 uppercase tracking-wide font-medium">Ahorro Máximo</span>
                            <div className="text-xl font-semibold text-green-600 mt-2">
                              {formatPrice(selectedItem.price - lowestPrice)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="bg-green-500 text-white p-6 rounded-2xl text-center shadow-lg">
                      <div className="flex items-center justify-center mb-3">
                        <TrendingDown className="w-6 h-6 mr-2" />
                        <span className="font-semibold">Mejor Precio</span>
                      </div>
                      <div className="text-3xl font-bold mb-2">{formatPrice(lowestPrice)}</div>
                      <div className="text-green-100 text-sm">
                        {new Date(pricesForDates.find(d => d.isLowest)?.date || '').toLocaleDateString('es-ES')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Filtrador de Fechas */}
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <h4 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-3">
                  <Filter className="w-5 h-5 text-blue-600" />
                  Filtrador de Fechas
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Seleccionar Fecha
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={dateRange.start}
                        max={dateRange.end}
                        className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Rango de Análisis
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-slate-600">Desde:</label>
                        <input
                          type="date"
                          value={userDateRange.start}
                          onChange={(e) => {
                            setUserDateRange(prev => ({ ...prev, start: e.target.value }));
                            if (selectedDate && e.target.value > selectedDate) {
                              setSelectedDate(e.target.value);
                            }
                          }}
                          max={userDateRange.end}
                          className="px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-slate-600">Hasta:</label>
                        <input
                          type="date"
                          value={userDateRange.end}
                          onChange={(e) => {
                            setUserDateRange(prev => ({ ...prev, end: e.target.value }));
                            if (selectedDate && e.target.value < selectedDate) {
                              setSelectedDate(e.target.value);
                            }
                          }}
                          min={userDateRange.start}
                          className="px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Acciones Rápidas
                    </label>
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const bestPriceDate = pricesForDates.find(d => d.isLowest)?.date;
                          if (bestPriceDate) {
                            setSelectedDate(bestPriceDate);
                          }
                        }}
                        className="text-green-600 border-green-300 hover:bg-green-50 h-10"
                      >
                        <TrendingDown className="w-4 h-4 mr-2" />
                        Mejor Precio
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const today = new Date().toISOString().split('T')[0];
                          setSelectedDate(today);
                        }}
                        className="text-blue-600 border-blue-300 hover:bg-blue-50 h-10"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Hoy
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Gráfico de Precios por Fecha - Comparación Estructurada */}
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm" data-graph-section>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      Comparación de Precios por Día
                    </h4>
                    <p className="text-sm text-slate-600 mt-2">
                      Análisis de precios para los próximos 10 días desde la fecha seleccionada
                    </p>
                  </div>
                  
                  {/* Resumen de Precios */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Mejor precio: {formatPrice(lowestPrice)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Fecha seleccionada</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                      <span>Precio base: {formatPrice(selectedItem.price)}</span>
                    </div>
                  </div>
                </div>

                {/* Grilla de Precios por Día */}
                <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-6 border border-slate-200">
                  <div className="grid grid-cols-5 sm:grid-cols-10 gap-3 mb-6">
                    {pricesForDates.slice(0, 10).map((dateData, index) => {
                      const isBestPrice = dateData.isLowest;
                      const isSelected = dateData.isSelected;
                      const priceDifference = selectedItem.price - dateData.price;
                      const isGoodDeal = priceDifference > 0;
                      
                      // Calcular altura proporcional al precio
                      const maxPrice = Math.max(...pricesForDates.slice(0, 10).map(d => d.price));
                      const minPrice = Math.min(...pricesForDates.slice(0, 10).map(d => d.price));
                      const priceHeight = ((dateData.price - minPrice) / (maxPrice - minPrice)) * 80 + 20;
                      
                      return (
                        <div
                          key={index}
                          className={`relative group cursor-pointer transition-all duration-200 ${
                            isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                          }`}
                          onClick={() => setSelectedDate(dateData.date)}
                        >
                          {/* Barra de Precio */}
                          <div className="relative mb-3">
                            <div
                              className={`w-full rounded-t-lg transition-all duration-300 ${
                                isBestPrice
                                  ? 'bg-green-500 hover:bg-green-600'
                                  : isSelected
                                  ? 'bg-blue-500 hover:bg-blue-600'
                                  : isGoodDeal
                                  ? 'bg-emerald-500 hover:bg-emerald-600'
                                  : 'bg-slate-400 hover:bg-slate-500'
                              }`}
                              style={{ height: `${priceHeight}px` }}
                            />
                            
                            {/* Indicador de Mejor Precio */}
                            {isBestPrice && (
                              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg z-10">
                                <TrendingDown className="w-3 h-3" />
                              </div>
                            )}
                            
                            {/* Indicador de Fecha Seleccionada */}
                            {isSelected && !isBestPrice && (
                              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg z-10">
                                <Calendar className="w-3 h-3" />
                              </div>
                            )}
                          </div>
                          
                          {/* Precio */}
                          <div className="text-center mb-2">
                            <div className={`text-sm font-bold ${
                              isBestPrice ? 'text-green-600' : 
                              isSelected ? 'text-blue-600' : 
                              isGoodDeal ? 'text-emerald-600' : 'text-slate-600'
                            }`}>
                              {formatPrice(dateData.price)}
                            </div>
                            
                            {/* Indicador de Ahorro */}
                            {isGoodDeal && (
                              <div className="text-xs text-green-600 font-medium">
                                -{formatPrice(priceDifference)}
                              </div>
                            )}
                          </div>
                          
                          {/* Fecha */}
                          <div className="text-center">
                            <div className="text-xs text-slate-600 font-medium">
                              {new Date(dateData.date).toLocaleDateString('es-ES', { 
                                day: '2-digit', 
                                month: '2-digit' 
                              })}
                            </div>
                            <div className="text-xs text-slate-500">
                              {new Date(dateData.date).toLocaleDateString('es-ES', { 
                                weekday: 'short' 
                              })}
                            </div>
                          </div>
                          
                          {/* Tooltip Detallado */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20 shadow-xl mb-2">
                            <div className="text-center">
                              <div className="font-medium">{new Date(dateData.date).toLocaleDateString('es-ES', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}</div>
                              <div className="text-green-400 font-bold">{formatPrice(dateData.price)}</div>
                              {isBestPrice && <div className="text-green-300 text-xs mt-1">Mejor precio disponible</div>}
                              {isSelected && !isBestPrice && <div className="text-green-300 text-xs mt-1">Fecha seleccionada</div>}
                              {isGoodDeal && !isBestPrice && <div className="text-emerald-300 text-xs mt-1">Ahorro disponible</div>}
                            </div>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Línea de Referencia del Precio Base */}
                  <div className="relative mb-6">
                    <div className="absolute left-0 right-0 border-t-2 border-dashed border-slate-400 opacity-60" 
                         style={{ 
                           top: `${((selectedItem.price - Math.min(...pricesForDates.slice(0, 10).map(d => d.price))) / (Math.max(...pricesForDates.slice(0, 10).map(d => d.price)) - Math.min(...pricesForDates.slice(0, 10).map(d => d.price)))) * 80 + 20}px` 
                         }} />
                    <div className="absolute right-0 top-0 bg-slate-400 text-white text-xs px-2 py-1 rounded transform translate-y-[-50%]">
                      Precio Base: {formatPrice(selectedItem.price)}
                    </div>
                  </div>
                  
                  {/* Estadísticas Rápidas */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-2xl font-bold text-green-600">
                        {formatPrice(lowestPrice)}
                      </div>
                      <div className="text-sm text-green-600 font-medium">Mejor Precio</div>
                      <div className="text-xs text-slate-600">
                        {new Date(pricesForDates.find(d => d.isLowest)?.date || '').toLocaleDateString('es-ES')}
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-2xl font-bold text-blue-600">
                        {formatPrice(selectedItem.price)}
                      </div>
                      <div className="text-sm text-blue-600 font-medium">Precio Base</div>
                      <div className="text-xs text-slate-600">Referencia</div>
                    </div>
                    
                    <div className="text-center p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="text-2xl font-bold text-slate-600">
                        {formatPrice(Math.max(...pricesForDates.slice(0, 10).map(d => d.price)))}
                      </div>
                      <div className="text-sm text-slate-600 font-medium">Precio Más Alto</div>
                      <div className="text-xs text-slate-600">En el rango</div>
                    </div>
                  </div>
                  
                  {/* Leyenda */}
                  <div className="flex items-center justify-center gap-6 text-xs text-slate-600 flex-wrap">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
                      <span>Mejor precio</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-emerald-500 rounded-sm"></div>
                      <span>Buen precio</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
                      <span>Fecha seleccionada</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-slate-400 rounded-sm"></div>
                      <span>Precio regular</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-t-2 border-dashed border-slate-400"></div>
                      <span>Precio base</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Información Detallada de la Fecha Seleccionada */}
              {selectedDate && (
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                  <h4 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-3">
                    <Info className="w-5 h-5 text-blue-600" />
                    <span className="hidden sm:inline">
                      Detalles para {new Date(selectedDate).toLocaleDateString('es-ES', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                    <span className="sm:hidden">
                      Detalles para {new Date(selectedDate).toLocaleDateString('es-ES')}
                    </span>
                  </h4>
                  
                  {(() => {
                    const selectedDateData = pricesForDates.find(d => d.date === selectedDate);
                    if (!selectedDateData) return null;
                    
                    const savings = selectedItem.price - selectedDateData.price;
                    const isGoodDeal = savings > 0;
                    const ranking = pricesForDates.filter(d => d.price <= selectedDateData.price).length;
                    
                    return (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200 shadow-sm">
                          <div className="p-2 bg-blue-100 rounded-full w-fit mx-auto mb-3">
                            <Calendar className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="text-sm text-blue-600 mb-2 uppercase tracking-wide font-medium">Precio para esta fecha</div>
                          <div className={`text-2xl font-bold ${isGoodDeal ? 'text-green-600' : 'text-blue-900'}`}>
                            {formatPrice(selectedDateData.price)}
                          </div>
                        </div>
                        
                        <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200 shadow-sm">
                          <div className="p-2 bg-green-100 rounded-full w-fit mx-auto mb-3">
                            <TrendingDown className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="text-sm text-green-600 mb-2 uppercase tracking-wide font-medium">Comparado con precio base</div>
                          <div className={`text-xl font-semibold ${isGoodDeal ? 'text-green-600' : 'text-red-600'}`}>
                            {isGoodDeal ? `-${formatPrice(savings)}` : `+${formatPrice(Math.abs(savings))}`}
                          </div>
                          <div className="text-xs text-slate-600 font-medium">
                            {isGoodDeal ? 'Ahorro' : 'Incremento'}
                          </div>
                        </div>
                        
                        <div className="text-center p-4 bg-indigo-50 rounded-xl border border-indigo-200 shadow-sm sm:col-span-2 lg:col-span-1">
                          <div className="p-2 bg-indigo-100 rounded-full w-fit mx-auto mb-3">
                            <Star className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div className="text-sm text-indigo-600 mb-2 uppercase tracking-wide font-medium">Posición en el ranking</div>
                          <div className="text-xl font-semibold text-indigo-900">
                            {ranking} de {pricesForDates.length}
                          </div>
                          <div className="text-xs text-slate-600 font-medium">
                            {selectedDateData.isLowest ? 'Mejor precio disponible' : ranking <= 5 ? 'Precio excelente' : ranking <= 10 ? 'Precio competitivo' : 'Precio regular'}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>
          
          {/* Footer del Modal con Botones de Acción - SIEMPRE VISIBLE */}
          <div className="flex flex-col sm:flex-row gap-4 p-6 border-t border-slate-200 bg-slate-50 flex-shrink-0">
            <Button 
              variant="outline" 
              size="lg"
              className="flex-1 h-12 text-slate-700 border-slate-300 hover:bg-slate-50"
              onClick={closePriceComparison}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cerrar
            </Button>
            <Button 
              size="lg"
              className="flex-1 h-12 bg-green-600 hover:bg-green-700 shadow-lg"
              onClick={() => handleReservar(selectedDate)}
            >
              <Calendar className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">
                Reservar para {selectedDate ? new Date(selectedDate).toLocaleDateString('es-ES') : 'Fecha Seleccionada'}
              </span>
              <span className="sm:hidden">
                Reservar
              </span>
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderResultCard = (result: any) => {
    switch (result.type) {
      case "hotel":
        return (
          <Card key={result.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
            <div className="relative flex-shrink-0">
              <Image
                src={result.image}
                alt={result.name}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                Hotel
              </Badge>
              <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground">
                {formatPrice(result.price)}
              </Badge>
              {/* Indicador de ahorro */}
              <div className="absolute top-3 left-20">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg flex items-center gap-1">
                        <TrendingDown className="w-3 h-3" />
                        Ahorro
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Precio más bajo que la semana anterior</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <CardContent className="p-6 flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <CardTitle className="text-xl font-bold text-foreground mb-2">
                    {result.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">{result.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                  {renderStars(result.rating)}
                  <span className="text-sm text-muted-foreground ml-1">({result.reviews})</span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
                {result.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {result.amenities.map((amenity: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between mt-auto">
                <div className="text-2xl font-bold text-primary">
                  {formatPrice(result.price)}
                  <span className="text-sm text-muted-foreground font-normal">/noche</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    className="border-green-600 text-green-600 hover:bg-green-50"
                    onClick={() => handleSelectItem(result)}
                  >
                    Seleccionar
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Ver Detalles
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case "flight":
        return (
          <Card key={result.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
            <div className="relative flex-shrink-0">
              <Image
                src={result.image}
                alt={`${result.origin} - ${result.destination}`}
                width={400}
                height={200}
                className="w-full h-40 object-cover"
              />
              <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                Vuelo
              </Badge>
              {/* Indicador de ahorro */}
              <div className="absolute top-3 left-20">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg flex items-center gap-1">
                        <TrendingDown className="w-3 h-3" />
                        Ahorro
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Precio más bajo que la semana anterior</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <CardContent className="p-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{result.origin}</div>
                  <div className="text-sm text-muted-foreground">Salida</div>
                </div>
                <div className="flex-1 mx-4">
                  <div className="flex items-center justify-center">
                    <Plane className="w-6 h-6 text-primary" />
                    <div className="h-px bg-border flex-1 mx-2" />
                  </div>
                  <div className="text-center text-sm text-muted-foreground mt-1">
                    {result.duration}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{result.destination}</div>
                  <div className="text-sm text-muted-foreground">Llegada</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-muted-foreground">Aerolínea</div>
                  <div className="font-semibold">{result.airline}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Clase</div>
                  <div className="font-semibold">{result.class}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Fecha</div>
                  <div className="font-semibold">{result.departure}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Paradas</div>
                  <div className="font-semibold">{result.stops}</div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <div className="text-2xl font-bold text-primary">
                  {formatPrice(result.price)}
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    className="border-green-600 text-green-600 hover:bg-green-50"
                    onClick={() => handleSelectItem(result)}
                  >
                    Seleccionar
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Reservar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case "package":
        return (
          <Card key={result.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
            <div className="relative flex-shrink-0">
              <Image
                src={result.image}
                alt={result.title}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                Paquete
              </Badge>
              <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground">
                {formatPrice(result.price)}
              </Badge>
              {/* Indicador de ahorro */}
              <div className="absolute top-3 left-20">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg flex items-center gap-1">
                        <TrendingDown className="w-3 h-3" />
                        Ahorro
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Precio más bajo que la semana anterior</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <CardContent className="p-6 flex-1 flex flex-col">
              <CardTitle className="text-xl font-bold text-foreground mb-3">
                {result.title}
              </CardTitle>
              <div className="flex items-center gap-2 text-muted-foreground mb-3">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">
                  {Array.isArray(result.destinations) 
                    ? result.destinations.join(" → ") 
                    : result.destinations}
                </span>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{result.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  {renderStars(result.rating)}
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
                {result.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {result.includes?.slice(0, 3).map((item: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between mt-auto">
                <div className="text-2xl font-bold text-primary">
                  {formatPrice(result.price)}
                  <span className="text-sm text-muted-foreground font-normal">/persona</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    className="border-green-600 text-green-600 hover:bg-green-50"
                    onClick={() => handleSelectItem(result)}
                  >
                    Seleccionar
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Ver Detalles
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return (
          <Card key={result.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
            <div className="relative flex-shrink-0">
              <Image
                src={result.image}
                alt={result.name || result.title}
                width={400}
                height={200}
                className="w-full h-40 object-cover"
              />
              <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                {result.type}
              </Badge>
              {/* Indicador de ahorro */}
              <div className="absolute top-3 left-20">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg flex items-center gap-1">
                        <TrendingDown className="w-3 h-3" />
                        Ahorro
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Precio más bajo que la semana anterior</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <CardContent className="p-6 flex-1 flex flex-col">
              <CardTitle className="text-xl font-bold text-foreground mb-3">
                {result.name || result.title}
              </CardTitle>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
                {result.description}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <div className="text-2xl font-bold text-primary">
                  {formatPrice(result.price)}
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    className="border-green-600 text-green-600 hover:bg-green-50"
                    onClick={() => handleSelectItem(result)}
                  >
                    Seleccionar
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Ver Detalles
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  if (!isVisible || !searchParams) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Header de Resultados */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Resultados de Búsqueda
        </h2>
        <p className="text-lg text-muted-foreground">
          Encontramos {filteredResults.length} opciones para tu viaje
        </p>
      </div>


       {/* Filtros y Ordenamiento */}
       <Card className="bg-card/50 backdrop-blur-sm px-19">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Ordenar por</Label>
              <Select value={sortBy} onValueChange={handleSort}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
                  <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
                  <SelectItem value="rating">Mejor Calificación</SelectItem>
                  <SelectItem value="duration">Duración</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Rango de Precio: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
              </Label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={7000}
                step={100}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Calificación</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 estrellas</SelectItem>
                  <SelectItem value="4">4+ estrellas</SelectItem>
                  <SelectItem value="3">3+ estrellas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Acciones</Label>
              <Button variant="outline" className="w-full">
                <Filter className="w-4 h-4 mr-2" />
                Más Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resultados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        {filteredResults.map((result) => renderResultCard(result))}
      </div>

      {/* Paginación */}
      {filteredResults.length > 0 && (
        <div className="flex justify-center">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Anterior
            </Button>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((page) => (
                <Button
                  key={page}
                  variant={page === 1 ? "default" : "outline"}
                  size="sm"
                  className="w-8 h-8"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button variant="outline" size="sm">
              Siguiente
            </Button>
          </div>
        </div>
      )}

             {/* Sin resultados */}
       {filteredResults.length === 0 && (
         <Card className="text-center py-12">
           <CardContent>
             <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
             <h3 className="text-xl font-semibold text-foreground mb-2">
               No se encontraron resultados
             </h3>
             <p className="text-muted-foreground mb-4">
               Intenta ajustar tus filtros de búsqueda
             </p>
             <Button variant="outline">
               Limpiar Filtros
             </Button>
           </CardContent>
         </Card>
       )}
       
               {/* Modal de Comparación de Precios */}
        <PriceComparisonModal />
        
        {/* Modal de Detalles de Cotización */}
        {showDetallesCotizacion && reservationData && (
          <DetallesCotizacion 
            reservationData={reservationData}
            onClose={closeDetallesCotizacion}
          />
        )}
      </div>
    );
  };
