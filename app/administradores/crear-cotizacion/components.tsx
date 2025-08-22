"use client";

import { useState, useEffect, useRef } from "react";
import { 
  MapPin, 
  Calendar as CalendarIcon, 
  Users, 
  ChevronDown, 
  Globe, 
  Star,
  Plane,
  Clock,
  Car,
  Building,
  Ticket,
  Cpu,
  Mic
} from "lucide-react";



// Importar componentes de shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Importar componentes de itinerario
import { SimpleMap } from "@/app/clientes/components/SimpleMap";
import { PanelIzquierdoConstructorItinerario } from "@/app/clientes/components/panel-izquierdo-constructor-itinerario";

// Formulario de Actividades
export const ActivitiesForm = ({ onSearch }: { onSearch: (params: any) => void }) => {
  const [selectedDestination, setSelectedDestination] = useState<string>("");
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
  const [showEventDropdown, setShowEventDropdown] = useState(false);
  
  const destinationRef = useRef<HTMLDivElement>(null);
  const eventRef = useRef<HTMLDivElement>(null);

  // Lista de destinos populares
  const destinations = [
    "Lima, Perú", "Cusco, Perú", "Machu Picchu, Perú", "Arequipa, Perú",
    "Buenos Aires, Argentina", "Río de Janeiro, Brasil", "Santiago, Chile",
    "Bogotá, Colombia", "Quito, Ecuador", "Ciudad de México, México"
  ];

  // Lista de tipos de eventos
  const eventTypes = [
    "Concierto", "Festival", "Torneo Deportivo", "Conferencia", "Exposición",
    "Teatro", "Stand-up Comedy", "Feria Gastronómica", "Maratón", "Triatlón"
  ];

  // Cerrar dropdowns cuando se haga clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (destinationRef.current && !destinationRef.current.contains(event.target as Node)) {
        setShowDestinationDropdown(false);
      }
      if (eventRef.current && !eventRef.current.contains(event.target as Node)) {
        setShowEventDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Función para formatear la fecha
  const formatDate = (date: Date | undefined) => {
    if (!date) return "Elige Fecha";
    return date.toLocaleDateString('es-ES', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <Card className="border-0 shadow-none w-full bg-transparent">
      <CardContent className="space-y-8 p-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <Label htmlFor="destination" className="text-base font-medium">Destino</Label>
            <div className="relative" ref={destinationRef}>
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <div
                onClick={() => setShowDestinationDropdown(!showDestinationDropdown)}
                className="w-full pl-12 pr-12 h-12 border border-input rounded-md flex items-center justify-between cursor-pointer hover:border-ring transition-colors bg-background"
              >
                <span className={selectedDestination ? "text-foreground" : "text-muted-foreground"}>
                  {selectedDestination || "Lima, Perú"}
                </span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </div>
              
              {showDestinationDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-input rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                  {destinations.map((destination) => (
                    <div
                      key={destination}
                      onClick={() => {
                        setSelectedDestination(destination);
                        setShowDestinationDropdown(false);
                      }}
                      className="px-4 py-3 hover:bg-accent cursor-pointer transition-colors first:rounded-t-md last:rounded-b-md"
                    >
                      {destination}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="event" className="text-base font-medium">Evento</Label>
            <div className="relative" ref={eventRef}>
              <Ticket className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <div
                onClick={() => setShowEventDropdown(!showEventDropdown)}
                className="w-full pl-12 pr-12 h-12 border border-input rounded-md flex items-center justify-between cursor-pointer hover:border-ring transition-colors bg-background"
              >
                <span className={selectedEvent ? "text-foreground" : "text-muted-foreground"}>
                  {selectedEvent || "Equipo/Artista/Torneo"}
                </span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </div>
              
              {showEventDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-input rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                  {eventTypes.map((eventType) => (
                    <div
                      key={eventType}
                      onClick={() => {
                        setSelectedEvent(eventType);
                        setShowEventDropdown(false);
                      }}
                      className="px-4 py-3 hover:bg-accent cursor-pointer transition-colors first:rounded-t-md last:rounded-b-md"
                    >
                      {eventType}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="date" className="text-base font-medium">Fecha</Label>
            <Popover>
              <PopoverTrigger asChild>
            <div className="relative">
                   <CalendarIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                   <div className="w-full pl-12 pr-12 h-12 border border-input rounded-md flex items-center justify-between cursor-pointer hover:border-ring transition-colors bg-background">
                    <span className={selectedDate ? "text-foreground" : "text-muted-foreground"}>
                      {formatDate(selectedDate)}
                    </span>
                    <CalendarIcon className="w-4 h-4 text-muted-foreground" />
            </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => setSelectedDate(date)}
                  className="rounded-md border"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium">Acciones</Label>
            <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-base font-medium">
              Buscar
            </Button>
          </div>
        </div>

        <Separator />

        <p className="text-sm text-muted-foreground text-center">
          Haciendo click en "Buscar", acepto las{" "}
          <a href="#" className="text-primary underline hover:text-primary/80">Condiciones de uso</a>
        </p>
      </CardContent>
    </Card>
  );
};

// Formulario de Traslados
export const TransfersForm = ({ onSearch }: { onSearch: (params: any) => void }) => {
  const [tripType, setTripType] = useState("round-trip");
  const [selectedOrigin, setSelectedOrigin] = useState<string>("");
  const [selectedDestination, setSelectedDestination] = useState<string>("");
  const [passengerSelection, setPassengerSelection] = useState({
    adults: 2,
    children: 0,
    infants: 0,
    childAges: [] as number[]
  });
  
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
  const [showPassengerSelector, setShowPassengerSelector] = useState(false);
  
  const originRef = useRef<HTMLDivElement>(null);
  const destinationRef = useRef<HTMLDivElement>(null);
  const passengerSelectorRef = useRef<HTMLDivElement>(null);

  // Lista de orígenes y destinos populares
  const locations = [
    "Aeropuerto Internacional Jorge Chávez (LIM)", "Aeropuerto Internacional El Dorado (BOG)",
    "Aeropuerto Internacional Benito Juárez (MEX)", "Aeropuerto Internacional Ministro Pistarini (EZE)",
    "Puerto de Callao, Perú", "Puerto de Buenos Aires, Argentina", "Puerto de Veracruz, México",
    "Estación Central de Santiago, Chile", "Estación Retiro, Buenos Aires", "Estación Central, Lima",
    "Hotel Sheraton Lima", "Hotel Hilton Bogotá", "Hotel Four Seasons México", "Hotel Marriott Santiago"
  ];

  // Cerrar dropdowns cuando se haga clic fuera
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

  // Inicializar edades de niños
  useEffect(() => {
    if (passengerSelection.children > 0) {
      const newChildAges = Array(passengerSelection.children).fill(0);
      setPassengerSelection(prev => ({ ...prev, childAges: newChildAges }));
    }
  }, [passengerSelection.children]);

  // Función para formatear la selección de pasajeros
  const formatPassengerSelection = () => {
    const { adults, children, infants } = passengerSelection;
    let result = `${adults} adulto${adults !== 1 ? 's' : ''}`;
    if (children > 0) result += `, ${children} niño${children !== 1 ? 's' : ''}`;
    if (infants > 0) result += `, ${infants} bebé${infants !== 1 ? 's' : ''}`;
    return result;
  };

  // Función para obtener el total de personas
  const getTotalPeople = () => {
    return passengerSelection.adults + passengerSelection.children + passengerSelection.infants;
  };

  // Función para verificar si se pueden agregar más personas
  const canAddMorePeople = () => {
    return getTotalPeople() < 9; // Máximo 9 personas por traslado
  };

  // Función para obtener texto de ayuda
  const getHelpText = () => {
    const total = getTotalPeople();
    if (total === 0) return "Selecciona al menos 1 adulto";
    if (total > 9) return "Máximo 9 personas por traslado";
    return `${total} persona${total !== 1 ? 's' : ''} seleccionada${total !== 1 ? 's' : ''}`;
  };

  // Función para resetear la selección
  const resetPassengerSelection = () => {
    setPassengerSelection({
      adults: 2,
      children: 0,
      infants: 0,
      childAges: []
    });
  };
  
  return (
    <Card className="border-0 shadow-none w-full bg-transparent">
      <CardContent className="space-y-8 p-0">
        <div className="space-y-4">
          <Label className="text-base font-medium">Tipo de Traslado</Label>
          <RadioGroup value={tripType} onValueChange={setTripType} className="flex flex-wrap gap-6">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="one-way" id="one-way" />
              <Label htmlFor="one-way" className="text-base cursor-pointer">Sólo Ida</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="round-trip" id="round-trip" />
              <Label htmlFor="round-trip" className="text-base cursor-pointer">Ida y Vuelta</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Label htmlFor="origin" className="text-base font-medium">Origen</Label>
            <div className="relative" ref={originRef}>
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <div
                onClick={() => setShowOriginDropdown(!showOriginDropdown)}
                className="w-full pl-12 pr-12 h-12 border border-input rounded-md flex items-center justify-between cursor-pointer hover:border-ring transition-colors bg-background"
              >
                <span className={selectedOrigin ? "text-foreground" : "text-muted-foreground"}>
                  {selectedOrigin || "Seleccionar origen"}
                </span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </div>
              
              {showOriginDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-input rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                  {locations.map((location) => (
                    <div
                      key={location}
                      onClick={() => {
                        setSelectedOrigin(location);
                        setShowOriginDropdown(false);
                      }}
                      className="px-4 py-3 hover:bg-accent cursor-pointer transition-colors first:rounded-t-md last:rounded-b-md"
                    >
                      {location}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="destination" className="text-base font-medium">Destino</Label>
            <div className="relative" ref={destinationRef}>
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <div
                onClick={() => setShowDestinationDropdown(!showDestinationDropdown)}
                className="w-full pl-12 pr-12 h-12 border border-input rounded-md flex items-center justify-between cursor-pointer hover:border-ring transition-colors bg-background"
              >
                <span className={selectedDestination ? "text-foreground" : "text-muted-foreground"}>
                  {selectedDestination || "Seleccionar destino"}
                </span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>
              
              {showDestinationDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-input rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                  {locations.map((location) => (
                    <div
                      key={location}
                      onClick={() => {
                        setSelectedDestination(location);
                        setShowDestinationDropdown(false);
                      }}
                      className="px-4 py-3 hover:bg-accent cursor-pointer transition-colors first:rounded-t-md last:rounded-b-md"
                    >
                      {location}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Label className="text-base font-medium">Vuelo fecha y hora de llegada</Label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <CalendarIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="date"
                  className="pl-12 h-12 border-input focus:ring-ring text-base"
                />
              </div>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="time"
                  className="pl-12 h-12 border-input focus:ring-ring text-base"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <Label className="text-base font-medium">Fecha y hora de salida</Label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <CalendarIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="date"
                  className="pl-12 h-12 border-input focus:ring-ring text-base"
                />
              </div>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="time"
                  className="pl-12 h-12 border-input focus:ring-ring text-base"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="passengers" className="text-base font-medium">Seleccionar pasajeros</Label>
          <div className="relative" ref={passengerSelectorRef}>
            <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <div
              onClick={() => setShowPassengerSelector(!showPassengerSelector)}
              className="w-full pl-12 pr-12 h-12 border border-input rounded-md flex items-center justify-between cursor-pointer hover:border-ring transition-colors bg-background"
            >
              <span className={getTotalPeople() > 0 ? "text-foreground" : "text-muted-foreground"}>
                {formatPassengerSelection()}
              </span>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>
            
            {showPassengerSelector && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-input rounded-md shadow-lg z-50 p-4 min-w-[320px]">
                <div className="space-y-4">
                  {/* Adultos */}
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Adultos</Label>
                      <p className="text-xs text-muted-foreground">13+ años</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPassengerSelection(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                        disabled={passengerSelection.adults <= 1}
                        className="w-8 h-8 p-0"
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{passengerSelection.adults}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPassengerSelection(prev => ({ ...prev, adults: prev.adults + 1 }))}
                        disabled={!canAddMorePeople()}
                        className="w-8 h-8 p-0"
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Niños */}
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Niños</Label>
                      <p className="text-xs text-muted-foreground">2-12 años</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPassengerSelection(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                        disabled={passengerSelection.children <= 0}
                        className="w-8 h-8 p-0"
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{passengerSelection.children}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPassengerSelection(prev => ({ ...prev, children: prev.children + 1 }))}
                        disabled={!canAddMorePeople()}
                        className="w-8 h-8 p-0"
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  {/* Edades de niños */}
                  {passengerSelection.children > 0 && (
                    <div className="space-y-2">
                      <Label className="text-xs font-medium">Edades de los niños</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {Array.from({ length: passengerSelection.children }, (_, index) => (
                          <Select
                            key={index}
                            value={passengerSelection.childAges[index]?.toString() || "0"}
                            onValueChange={(value) => {
                              const newChildAges = [...passengerSelection.childAges];
                              newChildAges[index] = parseInt(value);
                              setPassengerSelection(prev => ({ ...prev, childAges: newChildAges }));
                            }}
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 11 }, (_, age) => (
                                <SelectItem key={age} value={age.toString()}>
                                  {age} años
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ))}
                      </div>
                    </div>
                  )}

                  <Separator />

                  {/* Bebés */}
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Bebés</Label>
                      <p className="text-xs text-muted-foreground">0-23 meses</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPassengerSelection(prev => ({ ...prev, infants: Math.max(0, prev.infants - 1) }))}
                        disabled={passengerSelection.infants <= 0}
                        className="w-8 h-8 p-0"
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{passengerSelection.infants}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPassengerSelection(prev => ({ ...prev, infants: prev.infants + 1 }))}
                        disabled={!canAddMorePeople()}
                        className="w-8 h-8 p-0"
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Información y botón de reset */}
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      {getHelpText()}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetPassengerSelection}
                      className="text-xs h-7 px-2"
                    >
                      Resetear
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-base font-medium"
            onClick={() => {
              onSearch({
                tripType,
                origin: selectedOrigin,
                destination: selectedDestination,
                passengers: passengerSelection,
                totalPassengers: getTotalPeople()
              });
            }}
          >
            Buscar
          </Button>
        </div>

        <Separator />

        <p className="text-sm text-muted-foreground text-center">
          Haciendo click en "Buscar", acepto las{" "}
          <a href="#" className="text-primary underline hover:text-primary/80">Condiciones de uso</a>
        </p>
      </CardContent>
    </Card>
  );
};

// Formulario de Multidestino
export const MultiDestinationForm = ({ onSearch }: { onSearch: (params: any) => void }) => {
  const [startDate, setStartDate] = useState<string>("");
  const [guestSelection, setGuestSelection] = useState({
    rooms: 1,
    adults: 2,
    children: 0,
    childAges: [] as number[]
  });
  const [nationality, setNationality] = useState<string>("");
  const [travelClass, setTravelClass] = useState<string>("");
  const [showGuestSelector, setShowGuestSelector] = useState(false);
  const [showItineraryBuilder, setShowItineraryBuilder] = useState(false);
  
  // Estado para el constructor de itinerario
  type DestinationType = {
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
  };
  
  const [destinations, setDestinations] = useState<DestinationType[]>([]);
  const [newDestination, setNewDestination] = useState("");
  
  const guestSelectorRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdowns al hacer click fuera
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

  // Lista de nacionalidades
  const nationalities = [
    "México", "Estados Unidos", "España", "Argentina", "Brasil", "Chile", "Colombia", 
    "Perú", "Ecuador", "Venezuela", "Uruguay", "Paraguay", "Bolivia", "Costa Rica",
    "Panamá", "Nicaragua", "Honduras", "El Salvador", "Guatemala", "Cuba", "República Dominicana"
  ];

  // Lista de clases de viaje
  const travelClasses = [
    "Económica", "Ejecutiva", "Primera Clase", "Premium Economy", "Business Class"
  ];

  // Inicializar edades de niños
  useEffect(() => {
    if (guestSelection.children > 0) {
      const newChildAges = Array(guestSelection.children).fill(0);
      setGuestSelection(prev => ({ ...prev, childAges: newChildAges }));
    }
  }, [guestSelection.children]);

  // Función para formatear la selección de huéspedes
  const formatGuestSelection = () => {
    const { rooms, adults, children } = guestSelection;
    let result = `${rooms} Habitación${rooms !== 1 ? 'es' : ''}, ${adults} adulto${adults !== 1 ? 's' : ''}`;
    if (children > 0) result += `, ${children} niño${children !== 1 ? 's' : ''}`;
    return result;
  };

  // Función para obtener el total de personas
  const getTotalPeople = () => {
    return guestSelection.adults + guestSelection.children;
  };

  // Función para verificar si se pueden agregar más personas
  const canAddMorePeople = () => {
    return getTotalPeople() < 4; // Máximo 4 personas por habitación
  };

  // Función para obtener texto de ayuda
  const getHelpText = () => {
    const total = getTotalPeople();
    if (total === 0) return "Selecciona al menos 1 adulto";
    if (total > 4) return "Máximo 4 personas por habitación";
    return `${total} persona${total !== 1 ? 's' : ''} seleccionada${total !== 1 ? 's' : ''}`;
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

  // Funciones para el constructor de itinerario
  const addDestination = () => {
    if (!newDestination.trim()) return;
    
    // Lista de destinos populares con coordenadas
    const popularDestinations = [
      { name: "Lima, Perú", lat: -12.0464, lng: -77.0428 },
      { name: "Cusco, Perú", lat: -13.5167, lng: -71.9789 },
      { name: "Machu Picchu, Perú", lat: -13.1631, lng: -72.5450 },
      { name: "Buenos Aires, Argentina", lat: -34.6118, lng: -58.3960 },
      { name: "Río de Janeiro, Brasil", lat: -22.9068, lng: -43.1729 },
      { name: "Santiago, Chile", lat: -33.4489, lng: -70.6693 },
      { name: "Bogotá, Colombia", lat: 4.7110, lng: -74.0721 },
      { name: "Quito, Ecuador", lat: -0.2299, lng: -78.5249 },
      { name: "Ciudad de México, México", lat: 19.4326, lng: -99.1332 },
      { name: "Madrid, España", lat: 40.4168, lng: -3.7038 },
      { name: "París, Francia", lat: 48.8566, lng: 2.3522 },
      { name: "Roma, Italia", lat: 41.9028, lng: 12.4964 }
    ];
    
    // Buscar si el destino está en la lista
    const foundDestination = popularDestinations.find(dest => 
      dest.name.toLowerCase().includes(newDestination.toLowerCase()) ||
      newDestination.toLowerCase().includes(dest.name.toLowerCase())
    );
    
    if (foundDestination) {
      const newDest = {
        id: `dest-${Date.now()}`,
        name: foundDestination.name,
        lat: foundDestination.lat,
        lng: foundDestination.lng,
        type: destinations.length === 0 ? 'start' as const : 'destination' as const,
        nights: 2,
        transportIncluded: true,
        accommodationIncluded: true,
        image: "/assets/banner.jpg",
        description: `Destino turístico en ${foundDestination.name}`,
        startDate: destinations.length === 0 ? "lun. 08 sept 2025" : "mié. 10 sept 2025",
        endDate: destinations.length === 0 ? "mié. 10 sept 2025" : "sáb. 13 sept 2025"
      };
      
      setDestinations(prev => [...prev, newDest]);
      setNewDestination("");
    } else {
      // Si no se encuentra, crear un destino genérico
      const newDest = {
        id: `dest-${Date.now()}`,
        name: newDestination,
        lat: -15.7801 + (Math.random() - 0.5) * 10, // Coordenadas aleatorias en Sudamérica
        lng: -47.9292 + (Math.random() - 0.5) * 10,
        type: destinations.length === 0 ? 'start' as const : 'destination' as const,
        nights: 2,
        transportIncluded: true,
        accommodationIncluded: true,
        image: "/assets/banner.jpg",
        description: `Destino personalizado: ${newDestination}`,
        startDate: destinations.length === 0 ? "lun. 08 sept 2025" : "mié. 10 sept 2025",
        endDate: destinations.length === 0 ? "mié. 10 sept 2025" : "sáb. 13 sept 2025"
      };
      
      setDestinations(prev => [...prev, newDest]);
      setNewDestination("");
    }
  };

  const removeDestination = (id: string) => {
    setDestinations(prev => {
      const filtered = prev.filter(dest => dest.id !== id);
      // Reasignar tipos si es necesario
      if (filtered.length > 0 && filtered[0].type !== 'start') {
        filtered[0] = { ...filtered[0], type: 'start' as const };
      }
      if (filtered.length > 1 && filtered[filtered.length - 1].type !== 'end') {
        filtered[filtered.length - 1] = { ...filtered[filtered.length - 1], type: 'end' as const };
      }
      return filtered as DestinationType[];
    });
  };

  const updateDestination = (id: string, updates: any) => {
    setDestinations(prev => 
      prev.map(dest => 
        dest.id === id ? { ...dest, ...updates } : dest
      )
    );
  };

  const finishItinerary = () => {
    // Marcar el último destino como 'end' si hay más de uno
    if (destinations.length > 1) {
      setDestinations(prev => 
        prev.map((dest, index) => {
          let newType: 'start' | 'destination' | 'end';
          if (index === 0) newType = 'start';
          else if (index === prev.length - 1) newType = 'end';
          else newType = 'destination';
          
          return {
            ...dest,
            type: newType
          };
        })
      );
    }
  };

  return (
    <Card className="border-0 shadow-none w-full bg-transparent">
      <CardContent className="space-y-8 p-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Fecha de inicio */}
          <div className="space-y-3">
            <Label htmlFor="start-date" className="text-base font-medium">Fecha de inicio</Label>
            <div className="relative">
              <CalendarIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="pl-12 h-12 border-input focus:ring-ring text-base"
              />
            </div>
          </div>
          
          {/* Seleccionar huéspedes */}
          <div className="space-y-3">
            <Label htmlFor="guests" className="text-base font-medium">Seleccionar huéspedes</Label>
            <div className="relative" ref={guestSelectorRef}>
              <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <div
                onClick={() => setShowGuestSelector(!showGuestSelector)}
                className="w-full pl-12 pr-12 h-12 border border-input rounded-md flex items-center justify-between cursor-pointer hover:border-ring transition-colors bg-background"
              >
                <span className={getTotalPeople() > 0 ? "text-foreground" : "text-muted-foreground"}>
                  {formatGuestSelection()}
                </span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </div>
              
              {showGuestSelector && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-input rounded-md shadow-lg z-50 p-4 min-w-[320px]">
                  <div className="space-y-4">
                    {/* Habitaciones */}
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">Habitaciones</Label>
                        <p className="text-xs text-muted-foreground">Número de habitaciones</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setGuestSelection(prev => ({ ...prev, rooms: Math.max(1, prev.rooms - 1) }))}
                          disabled={guestSelection.rooms <= 1}
                          className="w-8 h-8 p-0"
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{guestSelection.rooms}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setGuestSelection(prev => ({ ...prev, rooms: prev.rooms + 1 }))}
                          className="w-8 h-8 p-0"
                        >
                          +
                        </Button>
                    </div>
                  </div>

                    <Separator />

                    {/* Adultos */}
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">Adultos</Label>
                        <p className="text-xs text-muted-foreground">13+ años</p>
                </div>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setGuestSelection(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                          disabled={guestSelection.adults <= 1}
                          className="w-8 h-8 p-0"
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{guestSelection.adults}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setGuestSelection(prev => ({ ...prev, adults: prev.adults + 1 }))}
                          disabled={!canAddMorePeople()}
                          className="w-8 h-8 p-0"
                        >
                          +
                        </Button>
          </div>
        </div>

                    <Separator />

                    {/* Niños */}
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">Niños</Label>
                        <p className="text-xs text-muted-foreground">2-12 años</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setGuestSelection(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                          disabled={guestSelection.children <= 0}
                          className="w-8 h-8 p-0"
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{guestSelection.children}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setGuestSelection(prev => ({ ...prev, children: prev.children + 1 }))}
                          disabled={!canAddMorePeople()}
                          className="w-8 h-8 p-0"
                        >
                          +
                        </Button>
                </div>
              </div>

                    {/* Edades de niños */}
                    {guestSelection.children > 0 && (
                      <div className="space-y-2">
                        <Label className="text-xs font-medium">Edades de los niños</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {Array.from({ length: guestSelection.children }, (_, index) => (
                            <Select
                              key={index}
                              value={guestSelection.childAges[index]?.toString() || "0"}
                              onValueChange={(value) => {
                                const newChildAges = [...guestSelection.childAges];
                                newChildAges[index] = parseInt(value);
                                setGuestSelection(prev => ({ ...prev, childAges: newChildAges }));
                              }}
                            >
                              <SelectTrigger className="h-8 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 11 }, (_, age) => (
                                  <SelectItem key={age} value={age.toString()}>
                                    {age} años
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ))}
                  </div>
                </div>
              )}

                    <Separator />

                    {/* Información y botón de reset */}
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        {getHelpText()}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={resetGuestSelection}
                        className="text-xs h-7 px-2"
                      >
                        Resetear
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Nacionalidad */}
          <div className="space-y-3">
            <Label htmlFor="nationality" className="text-base font-medium">Nacionalidad</Label>
            <Select value={nationality} onValueChange={setNationality}>
              <SelectTrigger className="border-input focus:ring-ring h-12 text-base">
                <SelectValue placeholder="Seleccionar nacionalidad" />
              </SelectTrigger>
              <SelectContent>
                {nationalities.map((nat) => (
                  <SelectItem key={nat} value={nat}>{nat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Clase */}
          <div className="space-y-3">
            <Label htmlFor="class" className="text-base font-medium">Clase</Label>
            <Select value={travelClass} onValueChange={setTravelClass}>
              <SelectTrigger className="border-input focus:ring-ring h-12 text-base">
                <SelectValue placeholder="Seleccionar clase" />
              </SelectTrigger>
              <SelectContent>
                {travelClasses.map((cls) => (
                  <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Botón de búsqueda */}
        <div className="flex justify-end py-6">
          <Button 
            className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-base font-medium"
            onClick={() => {
              setShowItineraryBuilder(true);
              // No llamar a onSearch aquí - solo mostrar el constructor de itinerario
              // La navegación a detalles-cotizacion se hará desde el botón "Continuar" del panel izquierdo
            }}
          >
            Buscar
          </Button>
        </div>

        <Separator />

        <p className="text-sm text-muted-foreground text-center">
          Haciendo click en "Buscar", acepto las{" "}
          <a href="#" className="text-primary underline hover:text-primary/80">Condiciones de uso</a>
        </p>

                 {/* Constructor de Itinerario - Aparece después de hacer clic en Buscar */}
         {showItineraryBuilder && (
           <div className="mt-8 space-y-6">
             <div className="text-center">
               <h2 className="text-2xl font-bold text-foreground mb-2">Constructor de Itinerario Multidestino</h2>
               <p className="text-muted-foreground">Construye tu ruta personalizada seleccionando destinos en el mapa</p>
             </div>
             
             {/* Búsqueda rápida de destinos */}
             <div className="bg-card border rounded-lg p-6">
               <h3 className="text-lg font-semibold mb-4">Agregar Destinos Rápidamente</h3>
               <div className="flex gap-3 mb-4">
                 <Input
                   placeholder="Escribe el nombre de un destino..."
                   value={newDestination}
                   onChange={(e) => setNewDestination(e.target.value)}
                   className="flex-1"
                 />
                 <Button onClick={addDestination} disabled={!newDestination.trim()}>
                   Agregar
                 </Button>
               </div>
               
               {/* Destinos populares */}
               <div className="space-y-2">
                 <p className="text-sm text-muted-foreground">Destinos populares:</p>
                 <div className="flex flex-wrap gap-2">
                   {["Lima, Perú", "Cusco, Perú", "Machu Picchu, Perú", "Buenos Aires, Argentina", "Río de Janeiro, Brasil", "Santiago, Chile", "Bogotá, Colombia", "Quito, Ecuador", "Ciudad de México, México", "Madrid, España", "París, Francia", "Roma, Italia"].map((dest) => (
                     <Button
                       key={dest}
                       variant="outline"
                       size="sm"
                       onClick={() => {
                         setNewDestination(dest);
                         addDestination();
                       }}
                       className="text-xs"
                     >
                       {dest}
                     </Button>
                   ))}
                 </div>
               </div>
             </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                             {/* Panel izquierdo - Constructor de itinerario */}
               <div className="lg:col-span-1">
                 <PanelIzquierdoConstructorItinerario
                   destinations={destinations}
                   newDestination={newDestination}
                   setNewDestination={setNewDestination}
                   addDestination={addDestination}
                   removeDestination={removeDestination}
                   updateDestination={updateDestination}
                   finishItinerary={finishItinerary}
                   isWizard={true}
                                       onContinue={() => {
                      // Crear datos simulados para detalles-cotizacion
                      const itinerarioData = {
                        destinations,
                        fechaInicio: '08 Septiembre 2025',
                        fechaFin: '13 Septiembre 2025',
                        duracion: destinations.reduce((total, dest) => total + (dest.nights || 0), 0),
                        personas: 2,
                        serviciosIncluidos: ['Hoteles', 'Tours', 'Visitas guiadas', 'Traslados', 'Alimentación'],
                        precioTotal: 2899.99,
                        precioDescuento: 2599.99
                      };
                      
                      // Guardar en localStorage para acceso en detalles-cotizacion
                      localStorage.setItem('itinerarioConfigurado', JSON.stringify(itinerarioData));
                      
                      // Navegar a detalles-cotizacion con datos simulados
                      const searchParams = new URLSearchParams();
                      searchParams.set('type', 'multidestino');
                      searchParams.set('destinations', JSON.stringify(destinations));
                      searchParams.set('fechaInicio', itinerarioData.fechaInicio);
                      searchParams.set('fechaFin', itinerarioData.fechaFin);
                      searchParams.set('duracion', itinerarioData.duracion.toString());
                      searchParams.set('personas', itinerarioData.personas.toString());
                      searchParams.set('precioTotal', itinerarioData.precioTotal.toString());
                      searchParams.set('precioDescuento', itinerarioData.precioDescuento.toString());
                      
                      // Usar window.location para navegar a detalles-cotizacion
                      window.location.href = `/administradores/detalles-cotizacion?${searchParams.toString()}`;
                    }}
                 />
               </div>
               
               {/* Mapa - Ocupa 2 columnas */}
               <div className="lg:col-span-2">
                 <div className="bg-card border rounded-lg p-4">
                   <h3 className="text-lg font-semibold mb-4">Mapa de Destinos</h3>
                   <SimpleMap 
                     destinations={destinations} 
                     className="h-[600px]"
                   />
                 </div>
               </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Formulario de AI Trips
export const AITripsForm = ({ onSearch }: { onSearch: (params: any) => void }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);

  // Función para iniciar la grabación simulada
  const startRecording = () => {
    setIsRecording(true);
    setIsListening(true);
    
    // Simular que está escuchando por 3 segundos
    setTimeout(() => {
      setIsRecording(false);
      setIsListening(false);
      
      // Simular transcripción automática
      const sampleTexts = [
        "Quiero un viaje romántico a París para mi aniversario",
        "Busco una aventura en la selva amazónica con guía local",
        "Necesito un paquete familiar a la playa con todo incluido",
        "Deseo un tour cultural por las ruinas de Machu Picchu",
        "Busco un crucero por el Mediterráneo con paradas en Italia y Grecia"
      ];
      
      const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
      setTranscript(prev => prev + (prev ? " " : "") + randomText);
    }, 3000);
  };

  // Función para detener la grabación
  const stopRecording = () => {
    setIsRecording(false);
    setIsListening(false);
  };

  // Función para limpiar la transcripción
  const clearTranscript = () => {
    setTranscript("");
  };

  // Función para manejar la búsqueda
  const handleSearch = () => {
    if (transcript.trim()) {
      onSearch({ description: transcript });
    }
  };

  return (
    <Card className="border-0 shadow-none w-full bg-transparent">
      <CardContent className="space-y-8 p-0">
        <div className="flex items-center justify-between">
          <Label className="text-xl font-semibold">Describa el viaje de sus sueños</Label>
          <Button variant="outline" size="lg" className="text-base">
            ¿Cómo funciona?
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <div className="w-7 h-7 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 rounded-full"></div>
            </div>
            <Input
              placeholder="Describe tu viaje ideal..."
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              className="pl-14 pr-14 h-14 border-input focus:ring-ring text-base"
            />
                         <button
               onClick={isRecording ? stopRecording : startRecording}
               className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all duration-200 ${
                 isRecording 
                   ? 'bg-red-500 text-white animate-pulse' 
                   : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
               }`}
               title={isRecording ? "Detener grabación" : "Iniciar grabación de voz"}
             >
               <Mic className={`w-6 h-6 ${isRecording ? 'animate-pulse' : ''}`} />
             </button>
          </div>
          
          <Button 
            className="h-14 px-10 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-medium whitespace-nowrap"
            onClick={handleSearch}
            disabled={!transcript.trim()}
          >
            Buscar
          </Button>
        </div>

                 {/* Indicador de estado y transcripción */}
         {isListening && (
           <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
             <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
             <span className="text-blue-700 font-medium">Escuchando... Habla ahora</span>
           </div>
         )}

         {/* Instrucciones de uso */}
         {!isListening && (
           <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
             <div className="flex items-start gap-3">
               <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                 i
               </div>
               <div className="text-sm text-blue-700">
                 <p className="font-medium mb-1">Instrucciones de uso:</p>
                 <ul className="space-y-1 text-xs">
                   <li>• Haz clic en el micrófono para comenzar a grabar</li>
                   <li>• Habla claramente sobre tu viaje ideal</li>
                   <li>• El sistema transcribirá automáticamente tu voz</li>
                   <li>• Puedes editar el texto antes de buscar</li>
                 </ul>
               </div>
             </div>
           </div>
         )}

        {/* Transcripción */}
        {transcript && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-foreground">Transcripción de voz:</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearTranscript}
                className="text-xs h-7 px-2 text-muted-foreground hover:text-foreground"
              >
                Limpiar
              </Button>
            </div>
            <div className="p-4 bg-muted/50 border border-input rounded-lg min-h-[80px]">
              <p className="text-sm text-foreground whitespace-pre-wrap">
                {transcript || "La transcripción aparecerá aquí..."}
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row items-center justify-between text-sm text-muted-foreground gap-4">
          <div className="flex items-center gap-2">
            <ChevronDown className="w-5 h-5" />
            <span className="font-medium">VER EJEMPLOS</span>
          </div>
          
          <p className="text-center lg:text-right">
            Haciendo click en "Buscar", acepto las{" "}
            <a href="#" className="text-primary underline hover:text-primary/80">Condiciones de uso</a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

// Formulario de Trip Planner
export const TripPlannerForm = ({ onSearch }: { onSearch: (params: any) => void }) => {
  const [showGuestSelector, setShowGuestSelector] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [guestConfig, setGuestConfig] = useState({
    rooms: 1,
    adults: 2,
    children: 0
  });

  const handleGuestChange = (type: 'rooms' | 'adults' | 'children', action: 'increase' | 'decrease') => {
    setGuestConfig(prev => {
      const newConfig = { ...prev };
      
      if (action === 'increase') {
        if (type === 'rooms') {
          newConfig.rooms = Math.min(prev.rooms + 1, 5);
        } else if (type === 'adults') {
          newConfig.adults = Math.min(prev.adults + 1, 4 * prev.rooms);
        } else if (type === 'children') {
          newConfig.children = Math.min(prev.children + 1, 4 * prev.rooms - prev.adults);
        }
      } else {
        if (type === 'rooms') {
          if (prev.rooms > 1) {
            newConfig.rooms = prev.rooms - 1;
            // Ajustar adultos y niños si es necesario
            const maxPeople = newConfig.rooms * 4;
            if (prev.adults + prev.children > maxPeople) {
              newConfig.adults = Math.min(prev.adults, maxPeople);
              newConfig.children = Math.max(0, maxPeople - newConfig.adults);
            }
          }
        } else if (type === 'adults') {
          if (prev.adults > 1) {
            newConfig.adults = prev.adults - 1;
          }
        } else if (type === 'children') {
          if (prev.children > 0) {
            newConfig.children = prev.children - 1;
          }
        }
      }
      
      return newConfig;
    });
  };

  const resetGuestConfig = () => {
    setGuestConfig({ rooms: 1, adults: 2, children: 0 });
  };

  const availablePeople = guestConfig.rooms * 4 - guestConfig.adults - guestConfig.children;

  return (
    <Card className="border-0 shadow-none w-full bg-transparent">
      <CardContent className="space-y-8 p-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Label htmlFor="nationality" className="text-base font-medium">Nacionalidad</Label>
            <Select>
              <SelectTrigger className="border-input focus:ring-ring h-12 text-base">
                <SelectValue placeholder="Seleccionar nacionalidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mexico">México</SelectItem>
                <SelectItem value="usa">Estados Unidos</SelectItem>
                <SelectItem value="spain">España</SelectItem>
                <SelectItem value="argentina">Argentina</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="class" className="text-base font-medium">Clase</Label>
            <Select>
              <SelectTrigger className="border-input focus:ring-ring h-12 text-base">
                <SelectValue placeholder="Seleccionar clase" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="economy">Económica</SelectItem>
                <SelectItem value="business">Ejecutiva</SelectItem>
                <SelectItem value="first">Primera Clase</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                     <div className="space-y-3">
             <Label htmlFor="start-date" className="text-base font-medium">Fecha de inicio</Label>
             <Popover>
               <PopoverTrigger asChild>
                 <div className="relative">
                   <CalendarIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                   <div className="w-full pl-12 pr-12 h-12 border border-input rounded-md bg-background cursor-pointer hover:border-ring transition-colors flex items-center justify-between">
                     <span className={startDate ? "text-foreground" : "text-muted-foreground"}>
                       {startDate ? startDate.toLocaleDateString('es-ES', { 
                         day: 'numeric',
                         month: 'long', 
                         year: 'numeric' 
                       }) : "Seleccionar fecha..."}
                     </span>
                     <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                   </div>
                 </div>
               </PopoverTrigger>
               <PopoverContent className="w-auto p-0" align="start">
                 <CalendarComponent
                   mode="single"
                   className="rounded-md border"
                   disabled={(date) => date < new Date()}
                 />
               </PopoverContent>
             </Popover>
           </div>
          
                     <div className="space-y-3">
             <Label htmlFor="guests" className="text-base font-medium">Seleccionar huéspedes</Label>
             <div className="relative">
               <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
               <div 
                 onClick={() => setShowGuestSelector(true)}
                 className="w-full pl-12 pr-12 h-12 border border-input rounded-md bg-background cursor-pointer hover:border-ring transition-colors flex items-center justify-between"
               >
                 <span className={guestConfig.rooms > 0 ? "text-foreground" : "text-muted-foreground"}>
                   {guestConfig.rooms} Habitación{guestConfig.rooms > 1 ? 'es' : ''}, {guestConfig.adults} adulto{guestConfig.adults > 1 ? 's' : ''}
                   {guestConfig.children > 0 && `, ${guestConfig.children} niño${guestConfig.children > 1 ? 's' : ''}`}
                 </span>
                 <ChevronDown className="text-muted-foreground w-5 h-5" />
               </div>
             </div>
           </div>
        </div>

        <div className="flex justify-end">
          <Button className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-medium w-full lg:w-auto">
            Buscar
          </Button>
        </div>

        {/* Modal Selector de Huéspedes */}
        {showGuestSelector && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
              {/* Header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900">Seleccionar huéspedes</h3>
              </div>

              {/* Campo de resumen */}
              <div className="mb-6">
                <div className="w-full p-4 border-2 border-blue-200 rounded-xl bg-blue-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Users className="w-6 h-6 text-blue-600" />
                      <span className="text-base font-medium text-slate-900">
                        {guestConfig.rooms} Habitación{guestConfig.rooms > 1 ? 'es' : ''}, {guestConfig.adults} adulto{guestConfig.adults > 1 ? 's' : ''}
                        {guestConfig.children > 0 && `, ${guestConfig.children} niño${guestConfig.children > 1 ? 's' : ''}`}
                      </span>
                    </div>
                    <ChevronDown className="w-5 h-5 text-blue-600 transform rotate-180" />
                  </div>
                </div>
              </div>

              {/* Controles de selección */}
              <div className="space-y-6">
                {/* Habitaciones */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900">Habitaciones</h4>
                    <p className="text-sm text-slate-600">Cada habitación puede tener hasta 4 personas</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleGuestChange('rooms', 'decrease')}
                      disabled={guestConfig.rooms <= 1}
                      className="w-8 h-8 rounded-full border-2 border-slate-300 flex items-center justify-center text-slate-400 hover:border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-bold text-slate-900">{guestConfig.rooms}</span>
                    <button
                      onClick={() => handleGuestChange('rooms', 'increase')}
                      disabled={guestConfig.rooms >= 5}
                      className="w-8 h-8 rounded-full border-2 border-slate-300 flex items-center justify-center text-slate-400 hover:border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Personas disponibles */}
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-sm font-medium text-green-700">
                    {availablePeople} persona{availablePeople !== 1 ? 's' : ''} disponible{availablePeople !== 1 ? 's' : ''}
                  </span>
                  <button
                    onClick={resetGuestConfig}
                    className="text-sm text-blue-600 hover:text-blue-700 underline"
                  >
                    Resetear
                  </button>
                </div>

                {/* Adultos */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900">Adultos</h4>
                    <p className="text-sm text-slate-600">13 años o más</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleGuestChange('adults', 'decrease')}
                      disabled={guestConfig.adults <= 1}
                      className="w-8 h-8 rounded-full border-2 border-slate-300 flex items-center justify-center text-slate-400 hover:border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-bold text-slate-900">{guestConfig.adults}</span>
                    <button
                      onClick={() => handleGuestChange('adults', 'increase')}
                      disabled={guestConfig.adults >= 4 * guestConfig.rooms}
                      className="w-8 h-8 rounded-full border-2 border-slate-300 flex items-center justify-center text-slate-400 hover:border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Niños */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900">Niños</h4>
                    <p className="text-sm text-slate-600">0 a 12 años</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleGuestChange('children', 'decrease')}
                      disabled={guestConfig.children <= 0}
                      className="w-8 h-8 rounded-full border-2 border-slate-300 flex items-center justify-center text-slate-400 hover:border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-bold text-slate-900">{guestConfig.children}</span>
                    <button
                      onClick={() => handleGuestChange('children', 'increase')}
                      disabled={guestConfig.children >= 4 * guestConfig.rooms - guestConfig.adults}
                      className="w-8 h-8 rounded-full border-2 border-slate-300 flex items-center justify-center text-slate-400 hover:border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setShowGuestSelector(false)}
                  className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => setShowGuestSelector(false)}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}

        <Separator />

        <p className="text-sm text-muted-foreground text-center">
          Haciendo click en "Buscar", acepto las{" "}
          <a href="#" className="text-primary underline hover:text-primary/80">Condiciones de uso</a>
        </p>
      </CardContent>
    </Card>
  );
};

// Formulario de Paquetes
export const PackagesForm = ({ onSearch }: { onSearch: (params: any) => void }) => {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedNights, setSelectedNights] = useState<string>("");
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  
  const [showCountriesDropdown, setShowCountriesDropdown] = useState(false);
  const [showDestinationsDropdown, setShowDestinationsDropdown] = useState(false);
  const [showNightsDropdown, setShowNightsDropdown] = useState(false);
  const [showThemesDropdown, setShowThemesDropdown] = useState(false);
  
  const countriesRef = useRef<HTMLDivElement>(null);
  const destinationsRef = useRef<HTMLDivElement>(null);
  const nightsRef = useRef<HTMLDivElement>(null);
  const themesRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdowns al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countriesRef.current && !countriesRef.current.contains(event.target as Node)) {
        setShowCountriesDropdown(false);
      }
      if (destinationsRef.current && !destinationsRef.current.contains(event.target as Node)) {
        setShowDestinationsDropdown(false);
      }

      if (nightsRef.current && !nightsRef.current.contains(event.target as Node)) {
        setShowNightsDropdown(false);
      }
      if (themesRef.current && !themesRef.current.contains(event.target as Node)) {
        setShowThemesDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const countries = [
    "Argentina", "Brasil", "Chile", "Colombia", "Costa Rica", "Cuba", "Ecuador", 
    "El Salvador", "Guatemala", "Honduras", "México", "Nicaragua", "Panamá", 
    "Paraguay", "Perú", "República Dominicana", "Uruguay", "Venezuela", "España", 
    "Francia", "Italia", "Alemania", "Reino Unido", "Estados Unidos", "Canadá"
  ];

  const destinations = [
    "Buenos Aires", "Río de Janeiro", "Santiago", "Bogotá", "San José", "La Habana",
    "Quito", "San Salvador", "Ciudad de Guatemala", "Tegucigalpa", "Ciudad de México",
    "Managua", "Ciudad de Panamá", "Asunción", "Lima", "Santo Domingo", "Montevideo",
    "Caracas", "Madrid", "París", "Roma", "Berlín", "Londres", "Nueva York", "Toronto",
    "Malinas", "Cabo Verde", "Bangkok", "Phuket", "Tokio", "Singapur"
  ];



  const nightsOptions = [
    "1-3 noches", "4-6 noches", "7-10 noches", "11-15 noches", "16-20 noches", "21+ noches"
  ];

  const themes = [
    "Aventura", "Cultural", "Relax", "Romántico", "Familiar", "Lujo", "Económico", 
    "Gastronomía", "Naturaleza", "Historia", "Playa", "Montaña", "Ciudad", "Rural"
  ];

  const handleCountryToggle = (country: string) => {
    setSelectedCountries(prev => 
      prev.includes(country) 
        ? prev.filter(c => c !== country)
        : [...prev, country]
    );
  };

  const handleDestinationToggle = (destination: string) => {
    setSelectedDestinations(prev => 
      prev.includes(destination) 
        ? prev.filter(d => d !== destination)
        : [...prev, destination]
    );
  };

  const handleThemeToggle = (theme: string) => {
    setSelectedThemes(prev => 
      prev.includes(theme) 
        ? prev.filter(t => t !== theme)
        : [...prev, theme]
    );
  };

  const handleCountryRemove = (country: string) => {
    setSelectedCountries(prev => prev.filter(c => c !== country));
  };

  const handleDestinationRemove = (destination: string) => {
    setSelectedDestinations(prev => prev.filter(d => d !== destination));
  };

  const handleThemeRemove = (theme: string) => {
    setSelectedThemes(prev => prev.filter(t => t !== theme));
  };

  return (
    <Card className="border-0 shadow-none w-full bg-transparent">
      <CardContent className="space-y-8 p-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Selección de Países */}
          <div className="space-y-3">
            <Label className="text-base font-medium text-foreground">Seleccione países</Label>
            <div className="relative" ref={countriesRef}>
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 z-10" />
              <div 
                className="w-full pl-12 pr-12 py-4 border border-input rounded-md bg-background min-h-[60px] flex items-center cursor-pointer hover:border-ring transition-colors"
                onClick={() => setShowCountriesDropdown(!showCountriesDropdown)}
              >
                <div className="flex gap-3 flex-wrap">
                  {selectedCountries.length > 0 ? (
                    selectedCountries.map((country) => (
                      <Badge 
                        key={country} 
                        variant="secondary" 
                        className="flex items-center gap-2 px-3 py-2 text-sm bg-secondary text-secondary-foreground border border-secondary-border hover:bg-secondary/80"
                      >
                        {country} 
                        <button 
                          className="text-secondary-foreground hover:text-destructive ml-1 text-lg font-bold"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCountryRemove(country);
                          }}
                        >
                          ×
                        </button>
                      </Badge>
                    ))
                  ) : (
                    <span className="text-muted-foreground">Seleccionar países...</span>
                  )}
                </div>
              </div>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              
              {/* Dropdown de Países */}
              {showCountriesDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                  <div className="p-2">
                    <Input
                      placeholder="Buscar países..."
                      className="mb-2"
                      onChange={(e) => {
                        // Implementar búsqueda si es necesario
                      }}
                    />
                    <div className="space-y-1">
                      {countries.map((country) => (
                        <button
                          key={country}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                            selectedCountries.includes(country)
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-accent hover:text-accent-foreground'
                          }`}
                          onClick={() => handleCountryToggle(country)}
                        >
                          {country}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
                     {/* Selección de Fecha */}
           <div className="space-y-3">
             <Label htmlFor="when-packages" className="text-base font-medium text-foreground">Cuándo</Label>
             <Popover>
               <PopoverTrigger asChild>
                 <div className="relative">
                   <CalendarIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 z-10" />
                   <div className="w-full pl-12 pr-12 py-4 border border-input rounded-md bg-background cursor-pointer hover:border-ring transition-colors">
                     <span className={selectedDate ? "text-foreground" : "text-muted-foreground"}>
                       {selectedDate ? selectedDate.toLocaleDateString('es-ES', { 
                         day: 'numeric',
                         month: 'long', 
                         year: 'numeric' 
                       }) : "Seleccionar fecha..."}
                     </span>
                   </div>
                   <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                 </div>
               </PopoverTrigger>
               <PopoverContent className="w-auto p-0" align="start">
                 <CalendarComponent
                   mode="single"
                   selected={selectedDate}
                   onSelect={(date) => setSelectedDate(date)}
                   className="rounded-md border"
                   disabled={(date) => date < new Date()}
                 />
               </PopoverContent>
             </Popover>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Selección de Destinos */}
          <div className="space-y-3">
            <Label className="text-base font-medium text-foreground">Seleccionar destino</Label>
            <div className="relative" ref={destinationsRef}>
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 z-10" />
              <div 
                className="w-full pl-12 pr-12 py-4 border border-input rounded-md bg-background min-h-[60px] flex items-center cursor-pointer hover:border-ring transition-colors"
                onClick={() => setShowDestinationsDropdown(!showDestinationsDropdown)}
              >
                <div className="flex gap-3 flex-wrap">
                  {selectedDestinations.length > 0 ? (
                    selectedDestinations.map((destination) => (
                      <Badge 
                        key={destination} 
                        variant="secondary" 
                        className="flex items-center gap-2 px-3 py-2 text-sm bg-secondary text-secondary-foreground border border-secondary-border hover:bg-secondary/80"
                      >
                        {destination} 
                        <button 
                          className="text-secondary-foreground hover:text-destructive ml-1 text-lg font-bold"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDestinationRemove(destination);
                          }}
                        >
                          ×
                        </button>
                      </Badge>
                    ))
                  ) : (
                    <span className="text-muted-foreground">Seleccionar destinos...</span>
                  )}
                </div>
              </div>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              
              {/* Dropdown de Destinos */}
              {showDestinationsDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                  <div className="p-2">
                    <Input
                      placeholder="Buscar destinos..."
                      className="mb-2"
                      onChange={(e) => {
                        // Implementar búsqueda si es necesario
                      }}
                    />
                    <div className="space-y-1">
                      {destinations.map((destination) => (
                        <button
                          key={destination}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                            selectedDestinations.includes(destination)
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-accent hover:text-accent-foreground'
                          }`}
                          onClick={() => handleDestinationToggle(destination)}
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
          
          {/* Selección de Noches */}
          <div className="space-y-3">
            <Label htmlFor="nights-packages" className="text-base font-medium text-foreground">Número de noches</Label>
            <div className="relative" ref={nightsRef}>
               <CalendarIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 z-10" />
              <div 
                className="w-full pl-12 pr-12 py-4 border border-input rounded-md bg-background cursor-pointer hover:border-ring transition-colors"
                onClick={() => setShowNightsDropdown(!showNightsDropdown)}
              >
                <span className={selectedNights ? "text-foreground" : "text-muted-foreground"}>
                  {selectedNights || "Seleccionar noches..."}
                </span>
              </div>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              
              {/* Dropdown de Noches */}
              {showNightsDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-50">
                  <div className="p-2">
                    <div className="space-y-1">
                      {nightsOptions.map((option) => (
                        <button
                          key={option}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                            selectedNights === option
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-accent hover:text-accent-foreground'
                          }`}
                          onClick={() => {
                            setSelectedNights(option);
                            setShowNightsDropdown(false);
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Selección de Temas */}
          <div className="space-y-3">
            <Label htmlFor="themes-packages" className="text-base font-medium text-foreground">Temas</Label>
            <div className="relative" ref={themesRef}>
              <Star className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 z-10" />
              <div 
                className="w-full pl-12 pr-12 py-4 border border-input rounded-md bg-background min-h-[60px] flex items-center cursor-pointer hover:border-ring transition-colors"
                onClick={() => setShowThemesDropdown(!showThemesDropdown)}
              >
                <div className="flex gap-3 flex-wrap">
                  {selectedThemes.length > 0 ? (
                    selectedThemes.map((theme) => (
                      <Badge 
                        key={theme} 
                        variant="secondary" 
                        className="flex items-center gap-2 px-3 py-2 text-sm bg-secondary text-secondary-foreground border border-secondary-border hover:bg-secondary/80"
                      >
                        {theme} 
                        <button 
                          className="text-secondary-foreground hover:text-destructive ml-1 text-lg font-bold"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleThemeRemove(theme);
                          }}
                        >
                          ×
                        </button>
                      </Badge>
                    ))
                  ) : (
                    <span className="text-muted-foreground">Seleccionar temas...</span>
                  )}
                </div>
              </div>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              
              {/* Dropdown de Temas */}
              {showThemesDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                  <div className="p-2">
                    <Input
                      placeholder="Buscar temas..."
                      className="mb-2"
                      onChange={(e) => {
                        // Implementar búsqueda si es necesario
                      }}
                    />
                    <div className="space-y-1">
                      {themes.map((theme) => (
                        <button
                          key={theme}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                            selectedThemes.includes(theme)
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-accent hover:text-accent-foreground'
                          }`}
                          onClick={() => handleThemeToggle(theme)}
                        >
                          {theme}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Botón de búsqueda */}
        <div className="flex justify-end py-6">
          <Button 
            className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-base font-medium"
            onClick={() => {
              onSearch({
                countries: selectedCountries,
                date: selectedDate ? selectedDate.toISOString().split('T')[0] : "",
                destinations: selectedDestinations,
                nights: selectedNights,
                themes: selectedThemes
              });
            }}
          >
            Buscar
          </Button>
        </div>

        <Separator />

        <p className="text-sm text-muted-foreground text-center">
          Haciendo click en "Buscar", acepto las{" "}
          <a href="#" className="text-primary underline hover:text-primary/80">Condiciones de uso</a>
        </p>
      </CardContent>
    </Card>
  );
};

// Formulario de Sports & Events
export const SportsEventsForm = ({ onSearch }: { onSearch: (params: any) => void }) => {
  return (
    <Card className="border-0 shadow-none w-full bg-transparent">
      <CardContent className="space-y-8 p-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <Label htmlFor="destination-sports" className="text-base font-medium">Destino</Label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                id="destination-sports"
                placeholder="Lima, Perú"
                className="pl-12 h-12 border-input focus:ring-ring text-base"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="event-sports" className="text-base font-medium">Evento</Label>
            <div className="relative">
              <Ticket className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                id="event-sports"
                placeholder="Equipo/Artista/Torneo"
                className="pl-12 h-12 border-input focus:ring-ring text-base"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="month-sports" className="text-base font-medium">Mes</Label>
            <div className="relative">
               <CalendarIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                id="month-sports"
                placeholder="Elige Mes"
                className="pl-12 pr-12 h-12 border-input focus:ring-ring text-base"
              />
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium">Acciones</Label>
            <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-base font-medium">
              Buscar
            </Button>
          </div>
        </div>

        <Separator />

        <p className="text-sm text-muted-foreground text-center">
          Haciendo click en "Buscar", acepto las{" "}
          <a href="#" className="text-primary underline hover:text-primary/80">Condiciones de uso</a>
        </p>
      </CardContent>
    </Card>
  );
};


