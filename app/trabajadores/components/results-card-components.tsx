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
      const startDate = new Date(dateRange.start);
      
      for (let i = 0; i < 21; i++) {
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
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl lg:max-w-5xl max-h-[95vh] overflow-hidden">
          {/* Header del Modal */}
          
          
          <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[calc(95vh-120px)]">
            {/* Información del Item Seleccionado */}
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-6 sm:p-8 mb-8 border border-slate-200 shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                <div className="lg:col-span-2">
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                    <div className="p-3 sm:p-4 bg-blue-100 rounded-xl self-center sm:self-start">
                      <Building className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                        {selectedItem.name || selectedItem.title}
                      </h4>
                      <p className="text-base sm:text-lg text-slate-600 mb-6">
                        {selectedItem.location || `${selectedItem.origin} → ${selectedItem.destination}`}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                        <div className="text-center p-4 sm:p-5  rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                          <span className="text-sm text-slate-500 uppercase tracking-wide font-medium">Precio Base</span>
                          <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">{formatPrice(selectedItem.price)}</div>
                        </div>
                        <div className="text-center p-4 sm:p-5  rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                          <span className="text-sm text-slate-500 uppercase tracking-wide font-medium">Rango de Precios</span>
                          <div className="text-lg sm:text-xl font-semibold text-slate-900 mt-2">
                            {formatPrice(lowestPrice)} - {formatPrice(highestPrice)}
                          </div>
                        </div>
                        <div className="text-center p-4 sm:p-5  rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                          <span className="text-sm text-slate-500 uppercase tracking-wide font-medium">Ahorro Máximo</span>
                          <div className="text-lg sm:text-xl font-semibold text-green-600 mt-2">
                            {formatPrice(selectedItem.price - lowestPrice)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center mt-6 lg:mt-0">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 sm:p-8 rounded-2xl text-center shadow-xl hover:shadow-2xl transition-shadow">
                    <div className="flex items-center justify-center mb-3">
                      <TrendingDown className="w-6 h-6 sm:w-8 sm:h-8 mr-3" />
                      <span className="text-sm sm:text-base font-semibold">Mejor Precio</span>
                    </div>
                    <div className="text-3xl sm:text-4xl font-bold mb-2">{formatPrice(lowestPrice)}</div>
                    <div className="text-green-100 text-sm sm:text-base">
                      {new Date(pricesForDates.find(d => d.isLowest)?.date || '').toLocaleDateString('es-ES')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Filtrador de Fechas */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 mb-8 border border-slate-200 shadow-lg">
              <h4 className="text-lg sm:text-xl font-semibold text-slate-900 mb-6 flex items-center gap-3">
                <Filter className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                Filtrador de Fechas
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
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
                      className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-base"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Rango de Análisis
                  </label>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-3 text-slate-600">
                      <Calendar className="w-5 h-5" />
                      <span className="text-base font-medium">
                        {new Date(dateRange.start).toLocaleDateString('es-ES')} - {new Date(dateRange.end).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Acciones Rápidas
                  </label>
                  <div className="flex flex-col gap-3">
                     <Button
                       variant="outline"
                       size="sm"
                       onClick={() => {
                         const bestPriceDate = pricesForDates.find(d => d.isLowest)?.date;
                         if (bestPriceDate) {
                           setSelectedDate(bestPriceDate);
                           // Scroll suave al gráfico
                           setTimeout(() => {
                             const graphElement = document.querySelector('[data-graph-section]');
                             if (graphElement) {
                               graphElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                             }
                           }, 100);
                         }
                       }}
                       className="text-green-600 border-green-300 hover:bg-green-50 flex items-center gap-2 h-10"
                     >
                       <TrendingDown className="w-4 h-4" />
                       Mejor Precio
                     </Button>
                     <Button
                       variant="outline"
                       size="sm"
                       onClick={() => {
                         const today = new Date().toISOString().split('T')[0];
                         setSelectedDate(today);
                       }}
                       className="text-blue-600 border-blue-300 hover:bg-blue-50 flex items-center gap-2 h-10"
                     >
                       <Calendar className="w-4 h-4" />
                       Hoy
                     </Button>
                     <Button
                       variant="outline"
                       size="sm"
                       onClick={() => {
                         // Encontrar el precio más bajo en la semana actual (días 7-14)
                         const currentWeekPrices = pricesForDates.slice(7, 14);
                         const bestCurrentWeek = currentWeekPrices.reduce((min, current) => 
                           current.price < min.price ? current : min
                         );
                         if (bestCurrentWeek) {
                           setSelectedDate(bestCurrentWeek.date);
                         }
                       }}
                       className="text-purple-600 border-purple-300 hover:bg-purple-50 flex items-center gap-2 h-10"
                     >
                       <Calendar className="w-4 h-4" />
                       Mejor Esta Semana
                     </Button>
                   </div>
                </div>
              </div>
            </div>
            
            {/* Gráfico de Precios por Fecha con Gráficos Apilados */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 mb-8 border border-slate-200 shadow-lg" data-graph-section>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
                <div>
                  <h4 className="text-lg sm:text-xl font-semibold text-slate-900 flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    Evolución de Precios (20 días)
                  </h4>
                  <p className="text-sm sm:text-base text-slate-600 mt-2">
                    Las barras más altas indican precios más bajos
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-green-600" />
                    <span>Mejor precio: {formatPrice(lowestPrice)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>{new Date(pricesForDates.find(d => d.isLowest)?.date || '').toLocaleDateString('es-ES')}</span>
                  </div>
                </div>
              </div>
              
                <div className="bg-gradient-to-b from-slate-50 to-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-slate-200">
                {/* Gráfico Principal - Barras Apiladas */}
                <div className="relative mb-8">
                  <div className="grid gap-1 sm:gap-2 mb-8" style={{ gridTemplateColumns: 'repeat(21, minmax(0, 1fr))' }}>
                    {pricesForDates.map((dateData, index) => {
                      // Corregir la lógica: precios más bajos = barras más altas
                      const priceHeight = ((highestPrice - dateData.price) / (highestPrice - lowestPrice)) * 120 + 40;
                      const isBestPrice = dateData.isLowest;
                      const isSelected = dateData.isSelected;
                      const priceDifference = selectedItem.price - dateData.price;
                      const isGoodDeal = priceDifference > 0;
                      
                      return (
                        <div
                          key={index}
                          className={`relative cursor-pointer group transition-all duration-300 ${
                            isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                          }`}
                          onClick={() => setSelectedDate(dateData.date)}
                        >
                          {/* Barra Principal */}
                          <div
                            className={`w-full rounded-t-lg transition-all duration-300 ${
                              isBestPrice
                                ? 'bg-gradient-to-t from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                                : isSelected
                                ? 'bg-gradient-to-t from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                                : isGoodDeal
                                ? 'bg-gradient-to-t from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600'
                                : 'bg-gradient-to-t from-slate-300 to-slate-400 hover:from-slate-400 hover:to-slate-500'
                            }`}
                            style={{ height: `${priceHeight}px` }}
                          />
                          
                                            {/* Indicador de Mejor Precio */}
                  {isBestPrice && (
                    <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-1 sm:px-2 py-1 rounded-full font-bold shadow-lg z-20 animate-pulse">
                      <TrendingDown className="w-2 h-2 sm:w-3 sm:h-3" />
                    </div>
                  )}
                  
                  {/* Indicador de Fecha Seleccionada */}
                  {isSelected && !isBestPrice && (
                    <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-1 sm:px-2 py-1 rounded-full font-bold shadow-lg z-20">
                      <Calendar className="w-2 h-2 sm:w-3 sm:h-3" />
                    </div>
                  )}
                  
                  {/* Indicador de Buen Precio */}
                  {!isBestPrice && !isSelected && isGoodDeal && (
                    <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white text-xs px-1 sm:px-2 py-1 rounded-full font-bold shadow-lg z-20">
                      <TrendingDown className="w-2 h-2 sm:w-3 sm:h-3" />
                    </div>
                  )}
                          
                          {/* Fecha */}
                          <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-slate-600 whitespace-nowrap font-medium">
                            {new Date(dateData.date).getDate()}
                          </div>
                          
                          {/* Precio en la Barra */}
                          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
                            {formatPrice(dateData.price)}
                          </div>
                          
                          {/* Indicador de Ahorro */}
                          {isGoodDeal && (
                            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
                              -{formatPrice(priceDifference)}
                            </div>
                          )}
                          
                                            {/* Tooltip Detallado */}
                  <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-2 sm:px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 shadow-xl hidden sm:block">
                    <div className="text-center">
                      <div className="font-medium">{new Date(dateData.date).toLocaleDateString('es-ES')}</div>
                      <div className="text-green-400 font-bold">{formatPrice(dateData.price)}</div>
                      {isBestPrice && <div className="text-green-300 text-xs mt-1">🎯 Mejor precio</div>}
                      {isSelected && !isBestPrice && <div className="text-blue-300 text-xs mt-1">📅 Seleccionada</div>}
                      {isGoodDeal && !isBestPrice && <div className="text-emerald-300 text-xs mt-1">💰 Buen precio</div>}
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
                  </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Línea de Referencia del Precio Base */}
                  <div className="absolute left-0 right-0 border-t-2 border-dashed border-slate-400 opacity-50" 
                       style={{ 
                         top: `${((highestPrice - selectedItem.price) / (highestPrice - lowestPrice)) * 120 + 40}px` 
                       }} />
                  <div className="absolute right-0 top-0 bg-slate-400 text-white text-xs px-2 py-1 rounded transform translate-y-[-50%] hidden sm:block">
                    Precio Base: {formatPrice(selectedItem.price)}
                  </div>
                </div>
                
                {/* Gráfico Secundario - Comparación de Rangos */}
                <div className="mb-6 sm:mb-8">
                  <h5 className="text-sm font-medium text-slate-700 mb-3 sm:mb-4 text-center">Rango de Precios por Período</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    {/* Semana Anterior */}
                    <div className="text-center p-4 bg-gradient-to-b from-red-50 to-red-100 rounded-xl border border-red-200">
                      <div className="text-xs text-red-600 uppercase tracking-wide mb-2">Semana Anterior</div>
                      <div className="text-lg font-bold text-red-700">
                        {formatPrice(Math.min(...pricesForDates.slice(0, 7).map(d => d.price)))}
                      </div>
                      <div className="text-xs text-red-600">a</div>
                      <div className="text-lg font-bold text-red-700">
                        {formatPrice(Math.max(...pricesForDates.slice(0, 7).map(d => d.price)))}
                      </div>
                    </div>
                    
                    {/* Semana Actual */}
                    <div className="text-center p-4 bg-gradient-to-b from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                      <div className="text-xs text-blue-600 uppercase tracking-wide mb-2">Semana Actual</div>
                      <div className="text-lg font-bold text-blue-700">
                        {formatPrice(Math.min(...pricesForDates.slice(7, 14).map(d => d.price)))}
                      </div>
                      <div className="text-xs text-blue-600">a</div>
                      <div className="text-lg font-bold text-blue-700">
                        {formatPrice(Math.max(...pricesForDates.slice(7, 14).map(d => d.price)))}
                      </div>
                    </div>
                    
                    {/* Semana Siguiente */}
                    <div className="text-center p-4 bg-gradient-to-b from-green-50 to-green-100 rounded-xl border border-green-200">
                      <div className="text-xs text-green-600 uppercase tracking-wide mb-2">Semana Siguiente</div>
                      <div className="text-lg font-bold text-green-700">
                        {formatPrice(Math.min(...pricesForDates.slice(14, 21).map(d => d.price)))}
                      </div>
                      <div className="text-xs text-green-600">a</div>
                      <div className="text-lg font-bold text-green-700">
                        {formatPrice(Math.max(...pricesForDates.slice(14, 21).map(d => d.price)))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Leyenda Mejorada */}
                <div className="flex items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gradient-to-t from-slate-300 to-slate-400 rounded-sm"></div>
                    <span className="text-slate-600">Precio normal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gradient-to-t from-emerald-400 to-emerald-500 rounded-sm"></div>
                    <span className="text-slate-600">Buen precio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gradient-to-t from-blue-500 to-blue-600 rounded-sm"></div>
                    <span className="text-slate-600">Fecha seleccionada</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gradient-to-t from-green-500 to-green-600 rounded-sm"></div>
                    <span className="text-slate-600">Mejor precio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-t-2 border-dashed border-slate-400"></div>
                    <span className="text-slate-600">Precio base</span>
                  </div>
                </div>
                
                {/* Nota de Interpretación */}
                <div className="text-center mt-4 text-xs text-slate-500">
                  💡 <strong>Interpretación:</strong> Las barras más altas representan precios más bajos
                </div>
              </div>
            </div>
            
            {/* Información Detallada de la Fecha Seleccionada */}
            {selectedDate && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 mb-8 border border-blue-200 shadow-lg">
                <h4 className="text-lg sm:text-xl font-semibold text-blue-900 mb-6 flex items-center gap-3">
                  <Info className="w-5 h-5 sm:w-6 sm:h-6" />
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                      <div className="text-center p-4 sm:p-6  rounded-xl border border-blue-200 shadow-sm">
                        <div className="p-2 sm:p-3 bg-blue-100 rounded-full w-fit mx-auto mb-2 sm:mb-3">
                          <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                        </div>
                        <div className="text-xs sm:text-sm text-blue-600 mb-2 uppercase tracking-wide font-medium">Precio para esta fecha</div>
                        <div className={`text-2xl sm:text-3xl font-bold ${isGoodDeal ? 'text-green-600' : 'text-blue-900'}`}>
                          {formatPrice(selectedDateData.price)}
                        </div>
                      </div>
                      
                      <div className="text-center p-4 sm:p-6 bg-white rounded-xl border border-blue-200 shadow-sm">
                        <div className="p-2 sm:p-3 bg-green-100 rounded-full w-fit mx-auto mb-2 sm:mb-3">
                          <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                        </div>
                        <div className="text-xs sm:text-sm text-blue-600 mb-2 uppercase tracking-wide font-medium">Comparado con precio base</div>
                        <div className={`text-xl sm:text-2xl font-semibold ${isGoodDeal ? 'text-green-600' : 'text-red-600'}`}>
                          {isGoodDeal ? `-${formatPrice(savings)}` : `+${formatPrice(Math.abs(savings))}`}
                        </div>
                        <div className="text-xs sm:text-sm text-slate-600 font-medium">
                          {isGoodDeal ? 'Ahorro' : 'Incremento'}
                        </div>
                      </div>
                      
                      <div className="text-center p-4 sm:p-6 bg-white rounded-xl border border-blue-200 shadow-sm sm:col-span-2 lg:col-span-1">
                        <div className="p-2 sm:p-3 bg-indigo-100 rounded-full w-fit mx-auto mb-2 sm:mb-3">
                          <Star className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                        </div>
                        <div className="text-xs sm:text-sm text-blue-600 mb-2 uppercase tracking-wide font-medium">Posición en el ranking</div>
                        <div className="text-xl sm:text-2xl font-semibold text-blue-900">
                          {ranking} de {pricesForDates.length}
                        </div>
                        <div className="text-xs sm:text-sm text-slate-600 font-medium">
                          {selectedDateData.isLowest ? 'Mejor precio disponible' : ranking <= 5 ? 'Precio excelente' : ranking <= 10 ? 'Precio competitivo' : 'Precio regular'}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
            
            {/* Botones de Acción */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Button 
                variant="outline" 
                size="lg"
                className="flex-1 h-14 sm:h-16 text-slate-700 border-slate-300 hover:bg-slate-50 text-base sm:text-lg"
                onClick={closePriceComparison}
              >
                                  <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                Cerrar
              </Button>
              <Button 
                size="lg"
                className="flex-1 h-14 sm:h-16 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg text-base sm:text-lg"
                onClick={() => handleReservar(selectedDate)}
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
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
      </div>
    );
  };

  const renderResultCard = (result: any) => {
    switch (result.type) {
      case "hotel":
        return (
          <Card key={result.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="relative">
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
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <CardTitle className="text-xl font-bold text-foreground mb-2">
                    {result.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{result.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {renderStars(result.rating)}
                  <span className="text-sm text-muted-foreground ml-1">({result.reviews})</span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {result.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {result.amenities.map((amenity: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
              </div>
                             <div className="flex items-center justify-between">
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
          <Card key={result.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="relative">
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
            <CardContent className="p-6">
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
                             <div className="flex items-center justify-between">
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
          <Card key={result.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="relative">
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
            <CardContent className="p-6">
              <CardTitle className="text-xl font-bold text-foreground mb-3">
                {result.title}
              </CardTitle>
              <div className="flex items-center gap-2 text-muted-foreground mb-3">
                <MapPin className="w-4 h-4" />
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
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {result.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {result.includes?.slice(0, 3).map((item: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
                             <div className="flex items-center justify-between">
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
          <Card key={result.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="relative">
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
            <CardContent className="p-6">
              <CardTitle className="text-xl font-bold text-foreground mb-3">
                {result.name || result.title}
              </CardTitle>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {result.description}
              </p>
                             <div className="flex items-center justify-between">
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

                           {/* Resumen de Ahorros */}
        <Card className="bg-gradient-to-r from-slate-50 to-blue-50 border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl">
                  <TrendingDown className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Oportunidades de Ahorro</h3>
                  <p className="text-slate-600">
                    {filteredResults.length > 0 ? 
                      `${filteredResults.filter((_, index) => index % 3 === 0).length} opciones con precios más bajos que la semana anterior` : 
                      'Compara precios para encontrar las mejores ofertas'
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Hover en "Seleccionar" para comparar
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

       {/* Filtros y Ordenamiento */}
       <Card className="bg-card/50 backdrop-blur-sm">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
