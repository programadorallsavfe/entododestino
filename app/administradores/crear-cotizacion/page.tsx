"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { 
  Bed, 
  Plane, 
  Plus, 
  Ticket, 
  ArrowLeftRight, 
  MapPin, 
  Cpu, 
  Calendar, 
  Users, 
  Car, 
  Clock,
  ChevronDown,
  Mic,
  Globe,
  Building,
  Star,
  Search
} from "lucide-react";
import {
  ActivitiesForm,
  TransfersForm,
  MultiDestinationForm,
  AITripsForm,
  TripPlannerForm,
  PackagesForm,
  SportsEventsForm,
} from "./components";
import { ResultsCardComponents } from "@/app/trabajadores/components/results-card-components";

type CategoryType = 
  | "alojamiento"
  | "transporte-hotel"
  | "transportes"
  | "actividades"
  | "traslados"
  | "multidestino"
  | "ai-trips"
  | "trip-planner"
  | "paquetes"
  | "sports-events"
  | "alquilar-coche";

interface Category {
  id: CategoryType;
  label: string;
  icon: React.ReactNode;
  isNew?: boolean;
}

const categories: Category[] = [
  { id: "alojamiento", label: "Alojamiento", icon: <Bed className="w-6 h-6" /> },
  { id: "transporte-hotel", label: "Transporte+Hotel", icon: <><Plane className="w-4 h-4" /><Plus className="w-3 h-3" /><Bed className="w-4 h-4" /></> },
  { id: "transportes", label: "Transportes", icon: <Plane className="w-6 h-6" /> },
  { id: "actividades", label: "Actividades", icon: <Ticket className="w-6 h-6" /> },
  { id: "traslados", label: "Traslados", icon: <ArrowLeftRight className="w-6 h-6" /> },
  { id: "multidestino", label: "Multidestino", icon: <MapPin className="w-6 h-6" /> },
  { id: "ai-trips", label: "AI Trips", icon: <Cpu className="w-6 h-6" />, isNew: true },
  { id: "trip-planner", label: "Trip Planner", icon: <MapPin className="w-6 h-6" />, isNew: true },
  { id: "paquetes", label: "Paquetes", icon: <Building className="w-6 h-6" /> },
  
];

export default function CrearCotizacionPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("alojamiento");
  const [tripType, setTripType] = useState<"one-way" | "round-trip" | "multiple">("round-trip");
  const [accommodationType, setAccommodationType] = useState<"single" | "multiple" | "hourly">("single");
  const [showResults, setShowResults] = useState(false);
  const [searchParams, setSearchParams] = useState<any>(null);

  const handleCategoryChange = (category: CategoryType) => {
    setSelectedCategory(category);
    setShowResults(false);
    setSearchParams(null);
  };

  const handleSearch = (params: any) => {
    console.log('Búsqueda realizada:', params);
    
    // Para multidestino, no navegar directamente - solo mostrar el constructor de itinerario
    if (selectedCategory === 'multidestino') {
      console.log('Multidestino seleccionado - mostrando constructor de itinerario');
      return; // No hacer nada más - el MultiDestinationForm maneja su propia lógica
    }
    
    // Crear datos simulados para detalles-cotizacion según el tipo de servicio
    let cotizacionData = {};
    
    if (selectedCategory === 'alojamiento') {
      cotizacionData = {
        type: 'hotel',
        name: 'Hotel de Lujo',
        location: params.destination || 'Lima, Perú',
        description: 'Hotel de 5 estrellas con todas las comodidades',
        amenities: ['WiFi gratuito', 'Piscina', 'Spa', 'Restaurante', 'Gimnasio'],
        includes: ['Desayuno incluido', 'Traslado al aeropuerto', 'Servicio de conserjería'],
        price: 299.99,
        discountPrice: 249.99,
        selectedDate: params.checkIn || '2025-09-08',
        guests: params.guestSelection || { adults: 2, children: 0 },
        nights: params.nights || 2
      };
    } else if (selectedCategory === 'transporte-hotel') {
      cotizacionData = {
        type: 'package',
        name: 'Paquete Transporte + Hotel',
        location: `${params.origin || 'Lima'} → ${params.destination || 'Cusco'}`,
        description: 'Paquete completo con vuelo y alojamiento',
        amenities: ['Vuelo directo', 'Hotel 4 estrellas', 'Traslados incluidos'],
        includes: ['Vuelo ida y vuelta', 'Alojamiento', 'Desayuno', 'Traslados'],
        price: 299.99,
        discountPrice: 249.99,
        selectedDate: params.departureDate || '2025-09-08',
        guests: params.guestSelection || { adults: 2, children: 0 },
        nights: params.nights || 3
      };
    } else if (selectedCategory === 'transportes') {
      cotizacionData = {
        type: 'flight',
        name: 'Vuelo Nacional',
        origin: params.origin || 'Lima',
        destination: params.destination || 'Cusco',
        description: 'Vuelo directo con la mejor aerolínea',
        amenities: ['Vuelo directo', 'Equipaje incluido', 'Asiento asignado'],
        includes: ['Vuelo ida y vuelta', 'Equipaje de mano', 'Snack a bordo'],
        price: 199.99,
        discountPrice: 159.99,
        selectedDate: params.departureDate || '2025-09-08',
        passengers: params.passengerSelection || { adults: 2, children: 0, infants: 0 }
      };
    } else if (selectedCategory === 'actividades') {
      cotizacionData = {
        type: 'activity',
        name: 'Tour Cultural',
        location: params.selectedDestination || 'Machu Picchu, Perú',
        description: 'Tour guiado por las ruinas más impresionantes',
        amenities: ['Guía certificado', 'Transporte incluido', 'Entradas incluidas'],
        includes: ['Tour completo', 'Almuerzo', 'Fotografías', 'Recuerdos'],
        price: 89.99,
        discountPrice: 69.99,
        selectedDate: params.selectedDate || '2025-09-08',
        participants: 2
      };
    } else if (selectedCategory === 'traslados') {
      cotizacionData = {
        type: 'transfer',
        name: 'Traslado Aeropuerto',
        location: `${params.selectedOrigin || 'Aeropuerto'} → ${params.selectedDestination || 'Hotel'}`,
        description: 'Traslado privado y confortable',
        amenities: ['Vehículo privado', 'Conductor profesional', 'WiFi gratuito'],
        includes: ['Traslado directo', 'Asistencia en aeropuerto', 'Bebidas'],
        price: 49.99,
        discountPrice: 39.99,
        selectedDate: params.departureDate || '2025-09-08',
        passengers: params.passengerSelection || { adults: 2, children: 0, infants: 0 }
      };
    } else if (selectedCategory === 'ai-trips') {
      cotizacionData = {
        type: 'ai-package',
        name: 'Viaje Personalizado IA',
        location: 'Destino personalizado',
        description: params.description || 'Viaje diseñado por inteligencia artificial',
        amenities: ['Planificación personalizada', 'Opciones flexibles', 'Asistencia 24/7'],
        includes: ['Itinerario personalizado', 'Reservas automáticas', 'Soporte IA'],
        price: 399.99,
        discountPrice: 349.99,
        selectedDate: '2025-09-08',
        guests: 2
      };
    } else if (selectedCategory === 'paquetes') {
      cotizacionData = {
        type: 'package',
        name: 'Paquete Turístico Premium',
        location: params.selectedCountries?.join(', ') || 'Sudamérica',
        description: 'Paquete completo con múltiples destinos',
        amenities: ['Hoteles premium', 'Vuelos incluidos', 'Guías expertos'],
        includes: ['Todo incluido', 'Seguro de viaje', 'Asistencia VIP'],
        price: 1299.99,
        discountPrice: 1099.99,
        selectedDate: params.date || 'Septiembre 2025',
        guests: 2,
        nights: params.nights || '7-10 noches'
      };
    }
    
    // Para todos los demás servicios, solo mostrar los resultados (cards) sin navegar
    setSearchParams(params);
    setShowResults(true);
  };

  // Nueva función para manejar la selección de una opción específica
  const handleSelectOption = (optionData: any) => {
    console.log('Opción seleccionada:', optionData);
    
    // Crear datos simulados para detalles-cotizacion según el tipo de servicio
    let cotizacionData = {};
    
    if (selectedCategory === 'alojamiento') {
      cotizacionData = {
        type: 'hotel',
        name: optionData.name || 'Hotel Seleccionado',
        location: searchParams?.destination || 'Lima, Perú',
        description: optionData.description || 'Hotel con todas las comodidades',
        amenities: optionData.amenities || ['WiFi gratuito', 'Piscina', 'Spa', 'Restaurante'],
        includes: optionData.includes || ['Desayuno incluido', 'Traslado al aeropuerto'],
        price: optionData.price || 299.99,
        discountPrice: optionData.discountPrice || 249.99,
        selectedDate: searchParams?.checkIn || '2025-09-08',
        guests: searchParams?.guests || { adults: 2, children: 0 },
        nights: searchParams?.nights || 2
      };
    } else if (selectedCategory === 'transporte-hotel') {
      cotizacionData = {
        type: 'package',
        name: optionData.name || 'Paquete Seleccionado',
        location: `${searchParams?.origin || 'Lima'} → ${searchParams?.destination || 'Cusco'}`,
        description: optionData.description || 'Paquete completo con vuelo y alojamiento',
        amenities: optionData.amenities || ['Vuelo directo', 'Hotel 4 estrellas', 'Traslados incluidos'],
        includes: optionData.includes || ['Vuelo ida y vuelta', 'Alojamiento', 'Desayuno', 'Traslados'],
        price: optionData.price || 299.99,
        discountPrice: optionData.discountPrice || 249.99,
        selectedDate: searchParams?.departureDate || '2025-09-08',
        guests: searchParams?.guests || { adults: 2, children: 0 },
        nights: searchParams?.nights || 3
      };
    } else if (selectedCategory === 'transportes') {
      cotizacionData = {
        type: 'flight',
        name: optionData.name || 'Vuelo Seleccionado',
        origin: searchParams?.origin || 'Lima',
        destination: searchParams?.destination || 'Cusco',
        description: optionData.description || 'Vuelo directo con la mejor aerolínea',
        amenities: optionData.amenities || ['Vuelo directo', 'Equipaje incluido', 'Asiento asignado'],
        includes: optionData.includes || ['Vuelo ida y vuelta', 'Equipaje de mano', 'Snack a bordo'],
        price: optionData.price || 199.99,
        discountPrice: optionData.discountPrice || 159.99,
        selectedDate: searchParams?.departureDate || '2025-09-08',
        passengers: searchParams?.passengerSelection || { adults: 2, children: 0, infants: 0 }
      };
    } else if (selectedCategory === 'actividades') {
      cotizacionData = {
        type: 'activity',
        name: optionData.name || 'Actividad Seleccionada',
        location: searchParams?.selectedDestination || 'Machu Picchu, Perú',
        description: optionData.description || 'Tour guiado por las ruinas más impresionantes',
        amenities: optionData.amenities || ['Guía certificado', 'Transporte incluido', 'Entradas incluidas'],
        includes: optionData.includes || ['Tour completo', 'Almuerzo', 'Fotografías', 'Recuerdos'],
        price: optionData.price || 89.99,
        discountPrice: optionData.discountPrice || 69.99,
        selectedDate: searchParams?.selectedDate || '2025-09-08',
        participants: 2
      };
    } else if (selectedCategory === 'traslados') {
      cotizacionData = {
        type: 'transfer',
        name: optionData.name || 'Traslado Seleccionado',
        location: `${searchParams?.selectedOrigin || 'Aeropuerto'} → ${searchParams?.selectedDestination || 'Hotel'}`,
        description: optionData.description || 'Traslado privado y confortable',
        amenities: optionData.amenities || ['Vehículo privado', 'Conductor profesional', 'WiFi gratuito'],
        includes: optionData.includes || ['Traslado directo', 'Asistencia en aeropuerto', 'Bebidas'],
        price: optionData.price || 49.99,
        discountPrice: optionData.discountPrice || 39.99,
        selectedDate: searchParams?.departureDate || '2025-09-08',
        passengers: searchParams?.passengerSelection || { adults: 2, children: 0, infants: 0 }
      };
    } else if (selectedCategory === 'ai-trips') {
      cotizacionData = {
        type: 'ai-package',
        name: optionData.name || 'Viaje Personalizado IA',
        location: 'Destino personalizado',
        description: optionData.description || 'Viaje diseñado por inteligencia artificial',
        amenities: optionData.amenities || ['Planificación personalizada', 'Opciones flexibles', 'Asistencia 24/7'],
        includes: optionData.includes || ['Itinerario personalizado', 'Reservas automáticas', 'Soporte IA'],
        price: optionData.price || 399.99,
        discountPrice: optionData.discountPrice || 349.99,
        selectedDate: '2025-09-08',
        guests: 2
      };
    } else if (selectedCategory === 'paquetes') {
      cotizacionData = {
        type: 'package',
        name: optionData.name || 'Paquete Turístico Premium',
        location: searchParams?.selectedCountries?.join(', ') || 'Sudamérica',
        description: optionData.description || 'Paquete completo con múltiples destinos',
        amenities: optionData.amenities || ['Hoteles premium', 'Vuelos incluidos', 'Guías expertos'],
        includes: optionData.includes || ['Todo incluido', 'Seguro de viaje', 'Asistencia VIP'],
        price: optionData.price || 1299.99,
        discountPrice: optionData.discountPrice || 1099.99,
        selectedDate: searchParams?.date || 'Septiembre 2025',
        guests: 2,
        nights: searchParams?.nights || '7-10 noches'
      };
    }
    
    // Guardar datos en localStorage
    localStorage.setItem('cotizacionData', JSON.stringify(cotizacionData));
    
    // Navegar a detalles de cotización
    const urlParams = new URLSearchParams();
    urlParams.set('type', selectedCategory);
    urlParams.set('data', JSON.stringify(cotizacionData));
    
    window.location.href = `/administradores/detalles-cotizacion?${urlParams.toString()}`;
  };

  const renderSearchForm = () => {
    switch (selectedCategory) {
      case "alojamiento":
        return <AccommodationForm onSearch={handleSearch} />;
      case "transporte-hotel":
        return <TransportHotelForm onSearch={handleSearch} />;
      case "transportes":
        return <TransportForm onSearch={handleSearch} />;
      case "actividades":
        return <ActivitiesForm onSearch={handleSearch} />;
      case "traslados":
        return <TransfersForm onSearch={handleSearch} />;
      case "multidestino":
        return <MultiDestinationForm onSearch={handleSearch} />;
      case "ai-trips":
        return <AITripsForm onSearch={handleSearch} />;
      case "trip-planner":
        return <TripPlannerForm onSearch={handleSearch} />;
      case "paquetes":
        return <PackagesForm onSearch={handleSearch} />;
      case "sports-events":
        return <SportsEventsForm onSearch={handleSearch} />;
      
      default:
        return <AccommodationForm onSearch={handleSearch} />;
    }
  };

  return (
    
      <div className="mx-auto relative z-10">
        {/* Header con Banner */}
        <div className="relative mb-8 rounded-xl overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/assets/banner.jpg')" }}
          />
          <div className="relative z-10 bg-black/40 backdrop-blur-sm p-12 text-center">
            <h1 className="text-4xl font-bold text-white mb-2">Crear Cotización</h1>
            <p className="text-white/90 text-lg">Selecciona el tipo de servicio y completa los detalles</p>
          </div>
        </div>

        {/* Main Search Card */}
        <div className="">
          {/* Category Navigation */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category.id
                    ? "text-blue-600 bg-blue-50 shadow-lg shadow-blue-100"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                <div className="relative">
                  <div className={`p-2 rounded-lg ${
                    selectedCategory === category.id ? "bg-blue-100" : "bg-gray-100"
                  }`}>
                    {category.icon}
                  </div>
                  {category.isNew && (
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg">
                      NEW
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium text-center max-w-[100px]">{category.label}</span>
                {selectedCategory === category.id && (
                  <div className="w-full h-1 bg-blue-600 rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </div>

          {/* Search Form */}
          {renderSearchForm()}
        </div>

                {/* Results Section */}
        {showResults && searchParams && (
          <div className="mt-8">
            <ResultsCardComponents 
              searchParams={searchParams} 
              isVisible={showResults}
              onSelectOption={handleSelectOption}
            />
          </div>
        )}
      </div>
    
    );
  }

// Formulario de Alojamiento
const AccommodationForm = ({ onSearch }: { onSearch: (params: any) => void }) => {
  const [accommodationType, setAccommodationType] = useState<"single" | "multiple" | "hourly">("single");
  const [selectedDestination, setSelectedDestination] = useState<string>("");
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
  const [guestSelection, setGuestSelection] = useState({
    rooms: 1,
    adults: 2,
    children: 0,
    childAges: [] as number[]
  });
  const [showGuestSelector, setShowGuestSelector] = useState(false);
  
  const destinations = [
    "Lima, Perú", "Buenos Aires, Argentina", "Santiago, Chile", "Bogotá, Colombia", 
    "Quito, Ecuador", "Ciudad de México, México", "Madrid, España", "París, Francia",
    "Roma, Italia", "Berlín, Alemania", "Londres, Reino Unido", "Nueva York, Estados Unidos"
  ];

  const destinationRef = useRef<HTMLDivElement>(null);
  const guestSelectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (destinationRef.current && !destinationRef.current.contains(event.target as Node)) {
        setShowDestinationDropdown(false);
      }
      if (guestSelectorRef.current && !guestSelectorRef.current.contains(event.target as Node)) {
        setShowGuestSelector(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Inicializar edades de niños cuando se agreguen
  useEffect(() => {
    if (guestSelection.children > guestSelection.childAges.length) {
      const newAges = [...guestSelection.childAges];
      while (newAges.length < guestSelection.children) {
        newAges.push(5);
      }
      setGuestSelection(prev => ({ ...prev, childAges: newAges }));
    }
  }, [guestSelection.children, guestSelection.childAges.length]);

  // Cerrar selector cuando se haga clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (guestSelectorRef.current && !guestSelectorRef.current.contains(event.target as Node)) {
        setShowGuestSelector(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Validar límites de personas por habitación
  useEffect(() => {
    const totalPeople = guestSelection.adults + guestSelection.children;
    const maxPeoplePerRoom = 4;
    const maxPeople = guestSelection.rooms * maxPeoplePerRoom;
    
    if (totalPeople > maxPeople) {
      if (guestSelection.children > 0) {
        setGuestSelection(prev => ({ ...prev, children: Math.max(0, maxPeople - prev.adults) }));
      } else {
        setGuestSelection(prev => ({ ...prev, adults: maxPeople }));
      }
    }
  }, [guestSelection.rooms, guestSelection.adults, guestSelection.children]);

  // Función para formatear la selección de huéspedes
  const formatGuestSelection = () => {
    let result = `${guestSelection.rooms} Habitación${guestSelection.rooms > 1 ? 'es' : ''}, ${guestSelection.adults} adulto${guestSelection.adults > 1 ? 's' : ''}`;
    if (guestSelection.children > 0) {
      result += `, ${guestSelection.children} niño${guestSelection.children > 1 ? 's' : ''}`;
    }
    return result;
  };

  // Función para obtener el total de personas
  const getTotalPeople = () => {
    return guestSelection.adults + guestSelection.children;
  };

  // Función para validar si se puede agregar más personas
  const canAddMorePeople = () => {
    const totalPeople = getTotalPeople();
    const maxPeople = guestSelection.rooms * 4;
    return totalPeople < maxPeople;
  };

  // Función para obtener el texto de ayuda
  const getHelpText = () => {
    const totalPeople = getTotalPeople();
    const maxPeople = guestSelection.rooms * 4;
    if (totalPeople >= maxPeople) {
      return `Máximo ${maxPeople} personas para ${guestSelection.rooms} habitación${guestSelection.rooms > 1 ? 'es' : ''}`;
    }
    return `${maxPeople - totalPeople} persona${maxPeople - totalPeople > 1 ? 's' : ''} disponible${maxPeople - totalPeople > 1 ? 's' : ''}`;
  };

  // Función para resetear la selección
  const resetGuestSelection = () => {
    setGuestSelection({
      rooms: 1,
      adults: 2,
      children: 0,
      childAges: []
    });
  };
  
  return (
    <div className="space-y-2">
      {/* Tipo de Alojamiento */}
      <div className="flex gap-4 mb-6">
        {[
          { id: "single", label: "Un alojamiento", value: "single" },
          { id: "multiple", label: "Múltiples alojamientos", value: "multiple" },
          { id: "hourly", label: "Alojamiento por horas", value: "hourly" }
        ].map((option) => (
          <label key={option.id} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="accommodationType"
              value={option.value}
              checked={accommodationType === option.value}
              onChange={(e) => setAccommodationType(e.target.value as any)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>

      {/* Campos de búsqueda */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Destino</label>
          <div className="relative" ref={destinationRef}>
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
            <div 
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer bg-white hover:border-blue-400 transition-colors"
              onClick={() => setShowDestinationDropdown(!showDestinationDropdown)}
            >
              <span className={selectedDestination ? "text-gray-900" : "text-gray-400"}>
                {selectedDestination || "Lima, Perú"}
              </span>
            </div>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            
            {/* Dropdown de Destinos */}
            {showDestinationDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                <div className="p-2">
                  <div className="space-y-1">
                    {destinations.map((destination) => (
                      <button
                        key={destination}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          selectedDestination === destination
                            ? 'bg-blue-500 text-white'
                            : 'hover:bg-gray-100 text-gray-900'
                        }`}
                        onClick={() => {
                          setSelectedDestination(destination);
                          setShowDestinationDropdown(false);
                        }}
                      >
                        {destination}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Seleccionar huéspedes</label>
          <div className="relative" ref={guestSelectorRef}>
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <div
              onClick={() => setShowGuestSelector(!showGuestSelector)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer bg-white hover:border-blue-400 transition-colors flex items-center justify-between"
            >
              <span className="text-gray-700">
                {formatGuestSelection()}
              </span>
              <ChevronDown className={`text-gray-400 w-5 h-5 transition-transform ${showGuestSelector ? 'rotate-180' : ''}`} />
            </div>
            
            {/* Selector de huéspedes */}
            {showGuestSelector && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-4">
                <div className="space-y-4">
                  {/* Habitaciones */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-gray-700">Habitaciones</span>
                      <p className="text-sm text-gray-500">Cada habitación puede tener hasta 4 personas</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setGuestSelection(prev => ({ ...prev, rooms: Math.max(1, prev.rooms - 1) }))}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        disabled={guestSelection.rooms <= 1}
                      >
                        <span className="text-gray-600 font-bold">-</span>
                      </button>
                      <span className="w-8 text-center font-medium">{guestSelection.rooms}</span>
                      <button
                        onClick={() => setGuestSelection(prev => ({ ...prev, rooms: prev.rooms + 1 }))}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-gray-600 font-bold">+</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                                      {/* Texto de ayuda y botón de reset */}
                  <div className="flex items-center justify-between mb-4">
                    <p className={`text-sm font-medium ${canAddMorePeople() ? 'text-green-600' : 'text-red-600'}`}>
                      {getHelpText()}
                    </p>
                    <button
                      onClick={resetGuestSelection}
                      className="text-xs text-blue-600 hover:text-blue-800 underline"
                    >
                      Resetear
                    </button>
                  </div>
                    
                    {/* Adultos */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="font-medium text-gray-700">Adultos</span>
                        <p className="text-sm text-gray-500">13 años o más</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setGuestSelection(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          disabled={guestSelection.adults <= 1}
                        >
                          <span className="text-gray-600 font-bold">-</span>
                        </button>
                        <span className="w-8 text-center font-medium">{guestSelection.adults}</span>
                        <button
                          onClick={() => setGuestSelection(prev => ({ ...prev, adults: prev.adults + 1 }))}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          disabled={!canAddMorePeople()}
                        >
                          <span className="text-gray-600 font-bold">+</span>
                        </button>
                      </div>
                    </div>
                    
                    {/* Niños */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="font-medium text-gray-700">Niños</span>
                        <p className="text-sm text-gray-500">0 a 12 años</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => {
                            setGuestSelection(prev => ({
                              ...prev,
                              children: Math.max(0, prev.children - 1),
                              childAges: prev.childAges.slice(0, -1)
                            }))
                          }}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          disabled={guestSelection.children <= 0}
                        >
                          <span className="text-gray-600 font-bold">-</span>
                        </button>
                        <span className="w-8 text-center font-medium">{guestSelection.children}</span>
                        <button
                          onClick={() => {
                            setGuestSelection(prev => ({
                              ...prev,
                              children: prev.children + 1,
                              childAges: [...prev.childAges, 5]
                            }))
                          }}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          disabled={!canAddMorePeople()}
                        >
                          <span className="text-gray-600 font-bold">+</span>
                        </button>
                      </div>
                    </div>
                    
                    {/* Edades de los niños */}
                    {guestSelection.children > 0 && (
                      <div className="space-y-3">
                        <span className="text-sm font-medium text-gray-700">Edades de los niños</span>
                        <div className="grid grid-cols-2 gap-3">
                          {guestSelection.childAges.map((age, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <span className="text-sm text-gray-600">Niño {index + 1}:</span>
                              <select
                                value={age}
                                onChange={(e) => {
                                  const newAges = [...guestSelection.childAges];
                                  newAges[index] = parseInt(e.target.value);
                                  setGuestSelection(prev => ({ ...prev, childAges: newAges }));
                                }}
                                className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                              >
                                {Array.from({ length: 13 }, (_, i) => (
                                  <option key={i} value={i}>{i}</option>
                                ))}
                              </select>
                              <span className="text-sm text-gray-500">años</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Botón de confirmar */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowGuestSelector(false)}
                        className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => setShowGuestSelector(false)}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Confirmar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nacionalidad</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none">
              <option>Peruana</option>
            
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Botón de búsqueda */}
      <div className="flex justify-end">
        <button 
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          onClick={() => onSearch({
            accommodationType,
            destination: selectedDestination || "Lima, Perú",
            checkIn: "2025-08-01", // Placeholder
            checkOut: "2025-08-05", // Placeholder
            guests: `${guestSelection.adults} adulto${guestSelection.adults > 1 ? 's' : ''}${guestSelection.children > 0 ? `, ${guestSelection.children} niño${guestSelection.children > 1 ? 's' : ''}` : ''}`,
            rooms: guestSelection.rooms,
            adults: guestSelection.adults,
            children: guestSelection.children,
            childAges: guestSelection.childAges
          })}
        >
          Buscar
        </button>
      </div>

      {/* Términos y condiciones */}
      <p className="text-sm text-gray-500 text-center">
        Haciendo click en "Buscar", acepto las{" "}
        <a href="#" className="text-blue-600 underline">Condiciones de uso</a>
      </p>
    </div>
  );
};

// Formulario de Transporte+Hotel
const TransportHotelForm = ({ onSearch }: { onSearch: (params: any) => void }) => {
  const [selectedOrigin, setSelectedOrigin] = useState<string>("");
  const [selectedDestination, setSelectedDestination] = useState<string>("");
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
  const [guestSelection, setGuestSelection] = useState({
    rooms: 1,
    adults: 2,
    children: 0,
    childAges: [] as number[]
  });
  const [showGuestSelector, setShowGuestSelector] = useState(false);
  
  const cities = [
    "Ciudad de México, México", "Lima, Perú", "Buenos Aires, Argentina", "Santiago, Chile", 
    "Bogotá, Colombia", "Quito, Ecuador", "Madrid, España", "París, Francia",
    "Roma, Italia", "Berlín, Alemania", "Londres, Reino Unido", "Nueva York, Estados Unidos"
  ];

  const originRef = useRef<HTMLDivElement>(null);
  const destinationRef = useRef<HTMLDivElement>(null);
  const guestSelectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (originRef.current && !originRef.current.contains(event.target as Node)) {
        setShowOriginDropdown(false);
      }
      if (destinationRef.current && !destinationRef.current.contains(event.target as Node)) {
        setShowDestinationDropdown(false);
      }
      if (guestSelectorRef.current && !guestSelectorRef.current.contains(event.target as Node)) {
        setShowGuestSelector(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Función para formatear la selección de huéspedes
  const formatGuestSelection = () => {
    let result = `${guestSelection.rooms} Habitación${guestSelection.rooms > 1 ? 'es' : ''}, ${guestSelection.adults} adulto${guestSelection.adults > 1 ? 's' : ''}`;
    if (guestSelection.children > 0) {
      result += `, ${guestSelection.children} niño${guestSelection.children > 1 ? 's' : ''}`;
    }
    return result;
  };

  // Función para obtener el total de personas
  const getTotalPeople = () => {
    return guestSelection.adults + guestSelection.children;
  };

  // Función para validar si se puede agregar más personas
  const canAddMorePeople = () => {
    const totalPeople = getTotalPeople();
    const maxPeople = guestSelection.rooms * 4;
    return totalPeople < maxPeople;
  };

  // Función para obtener el texto de ayuda
  const getHelpText = () => {
    const totalPeople = getTotalPeople();
    const maxPeople = guestSelection.rooms * 4;
    if (totalPeople >= maxPeople) {
      return `Máximo ${maxPeople} personas para ${guestSelection.rooms} habitación${guestSelection.rooms > 1 ? 'es' : ''}`;
    }
    return `${maxPeople - totalPeople} persona${maxPeople - totalPeople > 1 ? 's' : ''} disponible${maxPeople - totalPeople > 1 ? 's' : ''}`;
  };

  // Función para resetear la selección
  const resetGuestSelection = () => {
    setGuestSelection({
      rooms: 1,
      adults: 2,
      children: 0,
      childAges: []
    });
  };

  return (
    <div className="space-y-6">
      {/* Campos de búsqueda */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Origen</label>
          <div className="relative" ref={originRef}>
            <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
            <div 
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer bg-white hover:border-blue-400 transition-colors"
              onClick={() => setShowOriginDropdown(!showOriginDropdown)}
            >
              <span className={selectedOrigin ? "text-gray-900" : "text-gray-400"}>
                {selectedOrigin || "Ciudad de origen"}
              </span>
            </div>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            
            {/* Dropdown de Origen */}
            {showOriginDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                <div className="p-2">
                  <div className="space-y-1">
                    {cities.map((city) => (
                      <button
                        key={city}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          selectedOrigin === city
                            ? 'bg-blue-500 text-white'
                            : 'hover:bg-gray-100 text-gray-900'
                        }`}
                        onClick={() => {
                          setSelectedOrigin(city);
                          setShowOriginDropdown(false);
                        }}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Destino</label>
          <div className="relative" ref={destinationRef}>
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
            <div 
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer bg-white hover:border-blue-400 transition-colors"
              onClick={() => setShowDestinationDropdown(!showDestinationDropdown)}
            >
              <span className={selectedDestination ? "text-gray-900" : "text-gray-400"}>
                {selectedDestination || "Lima, Perú"}
              </span>
            </div>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            
            {/* Dropdown de Destino */}
            {showDestinationDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                <div className="p-2">
                  <div className="space-y-1">
                    {cities.map((city) => (
                      <button
                        key={city}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          selectedDestination === city
                            ? 'bg-blue-500 text-white'
                            : 'hover:bg-gray-100 text-gray-900'
                        }`}
                        onClick={() => {
                          setSelectedDestination(city);
                          setShowDestinationDropdown(false);
                        }}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Salida</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Vuelta</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Seleccionar huéspedes</label>
          <div className="relative" ref={guestSelectorRef}>
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <div
              onClick={() => setShowGuestSelector(!showGuestSelector)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer bg-white hover:border-blue-400 transition-colors flex items-center justify-between"
            >
              <span className="text-gray-700">
                {formatGuestSelection()}
              </span>
              <ChevronDown className={`text-gray-400 w-5 h-5 transition-transform ${showGuestSelector ? 'rotate-180' : ''}`} />
            </div>
            
            {/* Selector de huéspedes */}
            {showGuestSelector && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-4">
                <div className="space-y-4">
                  {/* Habitaciones */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-gray-700">Habitaciones</span>
                      <p className="text-sm text-gray-500">Cada habitación puede tener hasta 4 personas</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setGuestSelection(prev => ({ ...prev, rooms: Math.max(1, prev.rooms - 1) }))}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        disabled={guestSelection.rooms <= 1}
                      >
                        <span className="text-gray-600 font-bold">-</span>
                      </button>
                      <span className="w-8 text-center font-medium">{guestSelection.rooms}</span>
                      <button
                        onClick={() => setGuestSelection(prev => ({ ...prev, rooms: prev.rooms + 1 }))}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-gray-600 font-bold">+</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    {/* Texto de ayuda y botón de reset */}
                    <div className="flex items-center justify-between mb-4">
                      <p className={`text-sm font-medium ${canAddMorePeople() ? 'text-green-600' : 'text-red-600'}`}>
                        {getHelpText()}
                      </p>
                      <button
                        onClick={resetGuestSelection}
                        className="text-xs text-blue-600 hover:text-blue-800 underline"
                      >
                        Resetear
                      </button>
                    </div>
                    
                    {/* Adultos */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="font-medium text-gray-700">Adultos</span>
                        <p className="text-sm text-gray-500">13 años o más</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setGuestSelection(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          disabled={guestSelection.adults <= 1}
                        >
                          <span className="text-gray-600 font-bold">-</span>
                        </button>
                        <span className="w-8 text-center font-medium">{guestSelection.adults}</span>
                        <button
                          onClick={() => setGuestSelection(prev => ({ ...prev, adults: prev.adults + 1 }))}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          disabled={!canAddMorePeople()}
                        >
                          <span className="text-gray-600 font-bold">+</span>
                        </button>
                      </div>
                    </div>
                    
                    {/* Niños */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="font-medium text-gray-700">Niños</span>
                        <p className="text-sm text-gray-500">0 a 12 años</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => {
                            setGuestSelection(prev => ({
                              ...prev,
                              children: Math.max(0, prev.children - 1),
                              childAges: prev.childAges.slice(0, -1)
                            }))
                          }}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          disabled={guestSelection.children <= 0}
                        >
                          <span className="text-gray-600 font-bold">-</span>
                        </button>
                        <span className="w-8 text-center font-medium">{guestSelection.children}</span>
                        <button
                          onClick={() => {
                            setGuestSelection(prev => ({
                              ...prev,
                              children: prev.children + 1,
                              childAges: [...prev.childAges, 5]
                            }))
                          }}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          disabled={!canAddMorePeople()}
                        >
                          <span className="text-gray-600 font-bold">+</span>
                        </button>
                      </div>
                    </div>
                    
                    {/* Edades de los niños */}
                    {guestSelection.children > 0 && (
                      <div className="space-y-3">
                        <span className="text-sm font-medium text-gray-700">Edades de los niños</span>
                        <div className="grid grid-cols-2 gap-3">
                          {guestSelection.childAges.map((age, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <span className="text-sm text-gray-600">Niño {index + 1}:</span>
                              <select
                                value={age}
                                onChange={(e) => {
                                  const newAges = [...guestSelection.childAges];
                                  newAges[index] = parseInt(e.target.value);
                                  setGuestSelection(prev => ({ ...prev, childAges: newAges }));
                                }}
                                className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                              >
                                {Array.from({ length: 13 }, (_, i) => (
                                  <option key={i} value={i}>{i}</option>
                                ))}
                              </select>
                              <span className="text-sm text-gray-500">años</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Botón de confirmar */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowGuestSelector(false)}
                        className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => setShowGuestSelector(false)}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Confirmar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nacionalidad</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none">
              <option>México</option>
              <option>Estados Unidos</option>
              <option>España</option>
              <option>Argentina</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Clase</label>
          <div className="relative">
            <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none">
              <option>Económica</option>
              <option>Ejecutiva</option>
              <option>Primera Clase</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Botón de búsqueda */}
      <div className="flex justify-end">
        <button 
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          onClick={() => onSearch({
            origin: selectedOrigin || "Ciudad de México",
            destination: selectedDestination || "Lima, Perú",
            departureDate: "2025-08-01", // Placeholder
            returnDate: "2025-08-05", // Placeholder
            guests: `${guestSelection.adults} adulto${guestSelection.adults > 1 ? 's' : ''}${guestSelection.children > 0 ? `, ${guestSelection.children} niño${guestSelection.children > 1 ? 's' : ''}` : ''}`,
            rooms: guestSelection.rooms,
            adults: guestSelection.adults,
            children: guestSelection.children,
            childAges: guestSelection.childAges,
            class: "Económica" // Placeholder
          })}
        >
          Buscar
        </button>
      </div>

      {/* Términos y condiciones */}
      <p className="text-sm text-gray-500 text-center">
        Haciendo click en "Buscar", acepto las{" "}
        <a href="#" className="text-blue-600 underline">Condiciones de uso</a>
      </p>
    </div>
  );
};

// Formulario de Transportes
const TransportForm = ({ onSearch }: { onSearch: (params: any) => void }) => {
  const [tripType, setTripType] = useState<"one-way" | "round-trip" | "multiple">("round-trip");
  const [selectedOrigin, setSelectedOrigin] = useState<string>("");
  const [selectedDestination, setSelectedDestination] = useState<string>("");
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
  const [passengerSelection, setPassengerSelection] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    childAges: [] as number[]
  });
  const [showPassengerSelector, setShowPassengerSelector] = useState(false);
  
  const cities = [
    "Ciudad de México, México", "Lima, Perú", "Buenos Aires, Argentina", "Santiago, Chile", 
    "Bogotá, Colombia", "Quito, Ecuador", "Madrid, España", "París, Francia",
    "Roma, Italia", "Berlín, Alemania", "Londres, Reino Unido", "Nueva York, Estados Unidos"
  ];

  const originRef = useRef<HTMLDivElement>(null);
  const destinationRef = useRef<HTMLDivElement>(null);
  const passengerSelectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (originRef.current && !originRef.current.contains(event.target as Node)) {
        setShowOriginDropdown(false);
      }
      if (destinationRef.current && !destinationRef.current.contains(event.target as Node)) {
        setShowDestinationDropdown(false);
      }
      if (passengerSelectorRef.current && !passengerSelectorRef.current.contains(event.target as Node)) {
        setShowPassengerSelector(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Función para formatear la selección de pasajeros
  const formatPassengerSelection = () => {
    let result = `${passengerSelection.adults} adulto${passengerSelection.adults > 1 ? 's' : ''}`;
    if (passengerSelection.children > 0) {
      result += `, ${passengerSelection.children} niño${passengerSelection.children > 1 ? 's' : ''}`;
    }
    if (passengerSelection.infants > 0) {
      result += `, ${passengerSelection.infants} bebé${passengerSelection.infants > 1 ? 's' : ''}`;
    }
    return result;
  };

  // Función para obtener el total de pasajeros
  const getTotalPassengers = () => {
    return passengerSelection.adults + passengerSelection.children + passengerSelection.infants;
  };

  // Función para validar si se pueden agregar más pasajeros (máximo 9 pasajeros por reserva)
  const canAddMorePassengers = () => {
    const totalPassengers = getTotalPassengers();
    return totalPassengers < 9;
  };

  // Función para obtener el texto de ayuda
  const getPassengerHelpText = () => {
    const totalPassengers = getTotalPassengers();
    const maxPassengers = 9;
    if (totalPassengers >= maxPassengers) {
      return `Máximo ${maxPassengers} pasajeros por reserva`;
    }
    return `${maxPassengers - totalPassengers} pasajero${maxPassengers - totalPassengers > 1 ? 's' : ''} disponible${maxPassengers - totalPassengers > 1 ? 's' : ''}`;
  };

  // Función para resetear la selección
  const resetPassengerSelection = () => {
    setPassengerSelection({
      adults: 1,
      children: 0,
      infants: 0,
      childAges: []
    });
  };
  
  return (
    <div className="space-y-6">
      {/* Tipo de Viaje */}
      <div className="flex gap-4 mb-6">
        {[
          { id: "one-way", label: "Sólo Ida", value: "one-way" },
          { id: "round-trip", label: "Ida y Vuelta", value: "round-trip" },
          { id: "multiple", label: "Múltiples destinos", value: "multiple" }
        ].map((option) => (
          <label key={option.id} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="tripType"
              value={option.value}
              checked={tripType === option.value}
              onChange={(e) => setTripType(e.target.value as any)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>

      {/* Origen y Destino */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Origen</label>
          <div className="relative" ref={originRef}>
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
            <div 
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer bg-white hover:border-blue-400 transition-colors"
              onClick={() => setShowOriginDropdown(!showOriginDropdown)}
            >
              <span className={selectedOrigin ? "text-gray-900" : "text-gray-400"}>
                {selectedOrigin || "Ciudad de origen"}
              </span>
            </div>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            
            {/* Dropdown de Origen */}
            {showOriginDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                <div className="p-2">
                  <div className="space-y-1">
                    {cities.map((city) => (
                      <button
                        key={city}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          selectedOrigin === city
                            ? 'bg-blue-500 text-white'
                            : 'hover:bg-gray-100 text-gray-900'
                        }`}
                        onClick={() => {
                          setSelectedOrigin(city);
                          setShowOriginDropdown(false);
                        }}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Destino</label>
          <div className="relative" ref={destinationRef}>
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
            <div 
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer bg-white hover:border-blue-400 transition-colors"
              onClick={() => setShowDestinationDropdown(!showDestinationDropdown)}
            >
              <span className={selectedDestination ? "text-gray-900" : "text-gray-400"}>
                {selectedDestination || "Lima, Perú"}
              </span>
            </div>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            
            {/* Dropdown de Destino */}
            {showDestinationDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                <div className="p-2">
                  <div className="space-y-1">
                    {cities.map((city) => (
                      <button
                        key={city}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          selectedDestination === city
                            ? 'bg-blue-500 text-white'
                            : 'hover:bg-gray-100 text-gray-900'
                        }`}
                        onClick={() => {
                          setSelectedDestination(city);
                          setShowDestinationDropdown(false);
                        }}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de ida</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de regreso</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Seleccionar pasajeros</label>
          <div className="relative" ref={passengerSelectorRef}>
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <div
              onClick={() => setShowPassengerSelector(!showPassengerSelector)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer bg-white hover:border-blue-400 transition-colors flex items-center justify-between"
            >
              <span className="text-gray-700">
                {formatPassengerSelection()}
              </span>
              <ChevronDown className={`text-gray-400 w-5 h-5 transition-transform ${showPassengerSelector ? 'rotate-180' : ''}`} />
            </div>
            
            {/* Selector de pasajeros */}
            {showPassengerSelector && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-4">
                <div className="space-y-4">
                  {/* Texto de ayuda y botón de reset */}
                  <div className="flex items-center justify-between mb-4">
                    <p className={`text-sm font-medium ${canAddMorePassengers() ? 'text-green-600' : 'text-red-600'}`}>
                      {getPassengerHelpText()}
                    </p>
                    <button
                      onClick={resetPassengerSelection}
                      className="text-xs text-blue-600 hover:text-blue-800 underline"
                    >
                      Resetear
                    </button>
                  </div>
                  
                  {/* Adultos */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="font-medium text-gray-700">Adultos</span>
                      <p className="text-sm text-gray-500">13 años o más</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setPassengerSelection(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        disabled={passengerSelection.adults <= 1}
                      >
                        <span className="text-gray-600 font-bold">-</span>
                      </button>
                      <span className="w-8 text-center font-medium">{passengerSelection.adults}</span>
                      <button
                        onClick={() => setPassengerSelection(prev => ({ ...prev, adults: prev.adults + 1 }))}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        disabled={!canAddMorePassengers()}
                      >
                        <span className="text-gray-600 font-bold">+</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Niños */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="font-medium text-gray-700">Niños</span>
                      <p className="text-sm text-gray-500">2 a 12 años</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => {
                          setPassengerSelection(prev => ({
                            ...prev,
                            children: Math.max(0, prev.children - 1),
                            childAges: prev.childAges.slice(0, -1)
                          }))
                        }}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        disabled={passengerSelection.children <= 0}
                      >
                        <span className="text-gray-600 font-bold">-</span>
                      </button>
                      <span className="w-8 text-center font-medium">{passengerSelection.children}</span>
                      <button
                        onClick={() => {
                          setPassengerSelection(prev => ({
                            ...prev,
                            children: prev.children + 1,
                            childAges: [...prev.childAges, 5]
                          }))
                        }}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        disabled={!canAddMorePassengers()}
                      >
                        <span className="text-gray-600 font-bold">+</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Bebés */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="font-medium text-gray-700">Bebés</span>
                      <p className="text-sm text-gray-500">0 a 2 años (en regazo)</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setPassengerSelection(prev => ({ ...prev, infants: Math.max(0, prev.infants - 1) }))}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        disabled={passengerSelection.infants <= 0}
                      >
                        <span className="text-gray-600 font-bold">-</span>
                      </button>
                      <span className="w-8 text-center font-medium">{passengerSelection.infants}</span>
                      <button
                        onClick={() => setPassengerSelection(prev => ({ ...prev, infants: prev.infants + 1 }))}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        disabled={!canAddMorePassengers() || passengerSelection.infants >= passengerSelection.adults}
                      >
                        <span className="text-gray-600 font-bold">+</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Edades de los niños */}
                  {passengerSelection.children > 0 && (
                    <div className="space-y-3">
                      <span className="text-sm font-medium text-gray-700">Edades de los niños</span>
                      <div className="grid grid-cols-2 gap-3">
                        {passengerSelection.childAges.map((age, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Niño {index + 1}:</span>
                            <select
                              value={age}
                              onChange={(e) => {
                                const newAges = [...passengerSelection.childAges];
                                newAges[index] = parseInt(e.target.value);
                                setPassengerSelection(prev => ({ ...prev, childAges: newAges }));
                              }}
                              className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                            >
                              {Array.from({ length: 11 }, (_, i) => i + 2).map((age) => (
                                <option key={age} value={age}>{age}</option>
                              ))}
                            </select>
                            <span className="text-sm text-gray-500">años</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Nota sobre bebés */}
                  {passengerSelection.infants > 0 && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs text-blue-700">
                        <strong>Nota:</strong> Los bebés deben viajar en regazo de un adulto. Máximo 1 bebé por adulto.
                      </p>
                    </div>
                  )}
                  
                  {/* Botón de confirmar */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowPassengerSelector(false)}
                        className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => setShowPassengerSelector(false)}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Confirmar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Clase</label>
          <div className="relative">
            <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none">
              <option>Económica</option>
              <option>Ejecutiva</option>
              <option>Primera Clase</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Botón de búsqueda */}
      <div className="flex justify-end">
        <button 
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          onClick={() => onSearch({
            tripType,
            origin: selectedOrigin || "Ciudad de origen",
            destination: selectedDestination || "Lima, Perú",
            departureDate: "2025-08-01", // Placeholder
            returnDate: "2025-08-05", // Placeholder
            passengers: formatPassengerSelection(),
            adults: passengerSelection.adults,
            children: passengerSelection.children,
            infants: passengerSelection.infants,
            childAges: passengerSelection.childAges,
            totalPassengers: getTotalPassengers(),
            class: "Económica" // Placeholder
          })}
        >
          Buscar
        </button>
      </div>

      {/* Términos y condiciones */}
      <p className="text-sm text-gray-500 text-center">
        Haciendo click en "Buscar", acepto las{" "}
        <a href="#" className="text-blue-600 underline">Condiciones de uso</a>
      </p>
    </div>
  );
};

// Componente de Resultados de Paquetes Vacacionales
const VacationPackagesResults = () => {
  const [selectedFilter, setSelectedFilter] = useState("6-10");
  const [priceRange, setPriceRange] = useState([3322, 107271]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  // Función helper para formatear números de manera consistente
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US');
  };

  const packages = [
    {
      id: 1,
      title: "Europa del Este (Hot Deal)",
      destinations: ["Viena", "Budapest", "Praga", "Berlin", "Berlín (Estado)"],
      departureDays: ["Jueves"],
      dates: "Desde octubre 2025 Hasta octubre 2026",
      nights: 10,
      circuits: 1,
      accommodations: 4,
      price: 5133,
      image: "/assets/banner.jpg",
      isHotDeal: true
    },
    {
      id: 2,
      title: "BANGKOK Y PHUKET (Domingo, Jueves, Martes, Sábado)",
      destinations: ["Bangkok", "Phuket"],
      departureDays: ["Martes", "Jueves", "Sábado", "Domingo"],
      dates: "Desde agosto 2025 Hasta octubre 2025",
      nights: 6,
      circuits: 1,
      accommodations: 32,
      price: 8676,
      image: "/assets/banner.jpg"
    },
    {
      id: 3,
      title: "BANGKOK Y PHUKET (Lunes, Viernes, Miércoles)",
      destinations: ["Bangkok", "Phuket"],
      departureDays: ["Lunes", "Miércoles", "Viernes"],
      dates: "Desde agosto 2025 Hasta octubre 2025",
      nights: 6,
      circuits: 1,
      accommodations: 32,
      price: 8676,
      image: "/assets/banner.jpg"
    }
  ];

  const handleLanguageToggle = (language: string) => {
    setSelectedLanguages(prev => 
      prev.includes(language) 
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
  };

  return (
    <div className="bg-transparent">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar de Filtros */}
        <div className="lg:col-span-1 space-y-6">
          {/* Búsqueda de Paquete */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Búsqueda de paquete</h3>
            
            <div className="space-y-3">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Todos los países"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Destinos"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Octubre 2025"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar por título"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              
              <div className="relative">
                <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Origen"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
          </div>

          {/* Filtros */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Filtros</h3>
            
            {/* Número de noches */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Número de noches</label>
              <div className="space-y-2">
                {[
                  { id: "1-5", label: "De 1 a 5 noches" },
                  { id: "6-10", label: "De 6 a 10 noches" },
                  { id: "11-15", label: "De 11 a 15 noches" },
                  { id: "15+", label: "Más de 15 noches" }
                ].map((option) => (
                  <label key={option.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="nights"
                      value={option.id}
                      checked={selectedFilter === option.id}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Precio por persona */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Precio por persona (MXN)
              </label>
              <div className="px-2">
                <input
                  type="range"
                  min="0"
                  max="150000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{priceRange[0].toLocaleString('en-US')}</span>
                  <span>{priceRange[1].toLocaleString('en-US')}</span>
                </div>
              </div>
            </div>

            {/* Idioma del Guía */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Idioma del Guía</label>
              <div className="space-y-2">
                {["English", "Español", "Italiano", "Português", "Deutsch"].map((language) => (
                  <label key={language} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedLanguages.includes(language)}
                      onChange={() => handleLanguageToggle(language)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{language}</span>
                  </label>
                ))}
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
              Mostrar los 7 resultados
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Resultados */}
        <div className="lg:col-span-3 space-y-6">
          {/* Header de Resultados */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Paquetes vacacionales</h2>
              <p className="text-gray-600">1.287 Resultados de tu búsqueda</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              {/* Filtro aplicado */}
              <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                de 6 a 10 noches
                <button className="text-gray-500 hover:text-gray-700">×</button>
              </div>
              
              {/* Ordenamiento */}
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Ordenado por Precio (más bajo primero)</option>
                <option>Ordenado por Precio (más alto primero)</option>
                <option>Ordenado por Popularidad</option>
              </select>
              
              <button className="text-gray-600 hover:text-gray-800 text-sm px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Eliminar filtros
              </button>
            </div>
          </div>

          {/* Lista de Paquetes */}
          <div className="space-y-4">
            {packages.map((pkg) => (
              <div key={pkg.id} className="bg-transparent">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Imagen/Mapa */}
                  <div className="relative">
                    <div className="w-full h-48 rounded-lg overflow-hidden">
                      <Image
                        src={pkg.image}
                        alt={pkg.title}
                        width={300}
                        height={192}
                        className="w-full h-full object-cover"
                      />
                      <div className="" />
                    </div>
                    {pkg.isHotDeal && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Hot Deal
                      </div>
                    )}
                  </div>

                  {/* Información del Paquete */}
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{pkg.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        Visitando: {pkg.destinations.join(" | ")}
                      </p>
                      <p className="text-gray-600 text-sm mb-2">
                        Días de salida: {pkg.departureDays.join("; ")}
                      </p>
                      <p className="text-gray-600 text-sm">{pkg.dates}</p>
                    </div>

                    {/* Estadísticas */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span>{pkg.nights} Noches</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-green-500" />
                        <span>{pkg.circuits} Circuitos</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-purple-500" />
                        <span>{pkg.accommodations} Alojamientos</span>
                      </div>
                    </div>

                    {/* Precio y Botón */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <p className="text-2xl font-bold text-blue-600">
                          Desde {formatNumber(pkg.price)} $
                        </p>
                        <p className="text-gray-500 text-sm">Por persona</p>
                      </div>
                      
                      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        Detalles
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
