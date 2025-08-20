"use client"

import { useState } from "react"
import { Calendar, Bed, Users, Search, Plus, Minus, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useIsMobile } from "@/hooks/use-mobile"
import Image from "next/image"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { southAmericanCountries, Country, travelClasses, TravelClass } from "@/utils/mockdata"
//react router
import { useRouter } from "next/navigation"

interface Room {
    id: number
    adults: number
    children: number
}

export const FiltrarReservas = () => {
    const router = useRouter()
    const [startDate, setStartDate] = useState<Date | undefined>(new Date(2025, 8, 8))
    const [rooms, setRooms] = useState<Room[]>([
        { id: 1, adults: 2, children: 0 }
    ])
    const [selectedCountry, setSelectedCountry] = useState<Country>(southAmericanCountries[5]) // Ecuador por defecto
    const [selectedTravelClass, setSelectedTravelClass] = useState<TravelClass>(travelClasses[0]) // Económica por defecto
    const [isGuestPopoverOpen, setIsGuestPopoverOpen] = useState(false)
    const [isCountryPopoverOpen, setIsCountryPopoverOpen] = useState(false)
    const isMobile = useIsMobile()

    const handleSearch = () => {
        console.log("Buscando:", { startDate, rooms, selectedCountry, selectedTravelClass })
    }

    const formatDate = (date: Date | undefined) => {
        if (!date) return "Seleccionar fecha"
        return format(date, "dd/MM/yyyy", { locale: es })
    }

    const formatGuestText = () => {
        const totalAdults = rooms.reduce((sum, room) => sum + room.adults, 0)
        const totalChildren = rooms.reduce((sum, room) => sum + room.children, 0)
        let text = `${rooms.length} Habitación${rooms.length > 1 ? 'es' : ''}, ${totalAdults} adulto${totalAdults > 1 ? 's' : ''}`
        if (totalChildren > 0) {
            text += `, ${totalChildren} niño${totalChildren > 1 ? 's' : ''}`
        }
        return text
    }

    const updateGuestCount = (roomId: number, type: 'adults' | 'children', increment: boolean) => {
        setRooms(prev => prev.map(room => {
            if (room.id === roomId) {
                const newValue = increment ? room[type] + 1 : room[type] - 1
                
                // Validaciones
                if (newValue < 0) return room
                if (type === 'adults' && newValue < 1) return room
                
                return { ...room, [type]: newValue }
            }
            return room
        }))
    }

    const addRoom = () => {
        const newRoomId = Math.max(...rooms.map(r => r.id)) + 1
        setRooms(prev => [...prev, { id: newRoomId, adults: 1, children: 0 }])
    }

    const removeRoom = (roomId: number) => {
        if (rooms.length > 1) {
            setRooms(prev => prev.filter(room => room.id !== roomId))
        }
    }

    const acceptGuestSelection = () => {
        setIsGuestPopoverOpen(false)
    }

    const selectCountry = (country: Country) => {
        setSelectedCountry(country)
        setIsCountryPopoverOpen(false)
    }

    return (
        <div className="relative w-full overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/banner.jpg"
                    alt="Banner de viajes"
                    fill
                    className="object-cover object-center"
                    priority
                />
                {/* Overlay para mejorar legibilidad */}
                <div className="absolute inset-0 bg-black/40 z-10"></div>
            </div>

            {/* Contenido */}
            <div className="relative z-20 py-16">
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                        Paquetes de Viajes
                    </h1>
                    <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto px-4 drop-shadow-md">
                        Con Vuelos, Hoteles y Tours Incluidos
                    </p>
                </div>
                
                <div className="flex justify-center items-center px-4">
                    <div className="w-full max-w-6xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 items-end">
                            {/* Fecha de inicio */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white drop-shadow-md">
                                    Fecha de inicio
                                </label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={`
                                                w-full justify-start text-left font-normal h-12
                                                ${!startDate && "text-white/70"}
                                                bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20
                                                focus:ring-2 focus:ring-white/50 focus:border-white/50
                                                placeholder:text-white/70
                                            `}
                                        >
                                            <Calendar className="mr-2 h-4 w-4 text-white/70" />
                                            {formatDate(startDate)}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <CalendarComponent
                                            mode="single"
                                            selected={startDate}
                                            onSelect={setStartDate}
                                            initialFocus
                                            disabled={(date) => date < new Date()}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/* Seleccionar huéspedes */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white drop-shadow-md">
                                    Seleccionar huéspedes:
                                </label>
                                <Popover open={isGuestPopoverOpen} onOpenChange={setIsGuestPopoverOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start text-left font-normal h-12 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 focus:ring-2 focus:ring-white/50 focus:border-white/50"
                                        >
                                            <Bed className="mr-2 h-4 w-4 text-white/70" />
                                            {formatGuestText()}
                                            <svg className="ml-auto w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-96 p-4" align="start">
                                        <div className="space-y-4">
                                            {/* Header */}
                                            <div className="text-center">
                                                <h3 className="text-lg font-semibold text-card-foreground">Seleccionar huéspedes:</h3>
                                            </div>

                                            {/* Resumen actual */}
                                            <div className="bg-muted rounded-lg p-3 flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <Bed className="w-4 h-4 text-muted-foreground" />
                                                    <span className="text-sm text-muted-foreground">{formatGuestText()}</span>
                                                </div>
                                                <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>

                                            {/* Encabezados de columnas */}
                                            <div className="grid grid-cols-3 gap-4 text-center text-sm font-medium text-muted-foreground">
                                                <div>Habitaciones</div>
                                                <div>Adultos</div>
                                                <div>Niños</div>
                                            </div>

                                            {/* Contenedor scrollable para habitaciones */}
                                            <div className="max-h-64 overflow-y-auto pr-2" style={{
                                                scrollbarWidth: 'thin',
                                                scrollbarColor: 'var(--muted-foreground) var(--muted)'
                                            }}>
                                                <style jsx>{`
                                                    .scrollable-container::-webkit-scrollbar {
                                                        width: 6px;
                                                    }
                                                    .scrollable-container::-webkit-scrollbar-track {
                                                        background: var(--muted);
                                                        border-radius: 3px;
                                                    }
                                                    .scrollable-container::-webkit-scrollbar-thumb {
                                                        background: var(--muted-foreground);
                                                        border-radius: 3px;
                                                    }
                                                    .scrollable-container::-webkit-scrollbar-thumb:hover {
                                                        background: var(--foreground);
                                                    }
                                                `}</style>
                                                <div className="space-y-3 scrollable-container">
                                                    {/* Habitaciones individuales */}
                                                    {rooms.map((room, index) => (
                                                        <div key={room.id} className="grid grid-cols-3 gap-4 items-center">
                                                            {/* Número de habitación */}
                                                            <div className="flex items-center justify-center space-x-2">
                                                                <Bed className="w-4 h-4 text-muted-foreground" />
                                                                <span className="text-sm font-medium text-card-foreground">{index + 1}</span>
                                                            </div>

                                                            {/* Adultos */}
                                                            <div className="flex items-center justify-center space-x-2">
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => updateGuestCount(room.id, 'adults', false)}
                                                                    disabled={room.adults <= 1}
                                                                    className="w-8 h-8 p-0"
                                                                >
                                                                    <Minus className="w-3 h-3" />
                                                                </Button>
                                                                <span className="w-8 text-center text-sm font-medium text-card-foreground">{room.adults}</span>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => updateGuestCount(room.id, 'adults', true)}
                                                                    className="w-8 h-8 p-0"
                                                                >
                                                                    <Plus className="w-3 h-3" />
                                                                </Button>
                                                            </div>

                                                            {/* Niños */}
                                                            <div className="flex items-center justify-center space-x-2">
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => updateGuestCount(room.id, 'children', false)}
                                                                    disabled={room.children <= 0}
                                                                    className="w-8 h-8 p-0"
                                                                >
                                                                    <Minus className="w-3 h-3" />
                                                                </Button>
                                                                <span className="w-8 text-center text-sm font-medium text-card-foreground">{room.children}</span>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => updateGuestCount(room.id, 'children', true)}
                                                                    className="w-8 h-8 p-0"
                                                                >
                                                                    <Plus className="w-3 h-3" />
                                                                </Button>
                                                            </div>

                                                            {/* Botón eliminar habitación (solo si hay más de 1) */}
                                                            {rooms.length > 1 && (
                                                                <div className="col-span-3 flex justify-end mt-2">
                                                                    <button
                                                                        onClick={() => removeRoom(room.id)}
                                                                        className="text-sm text-muted-foreground hover:text-destructive transition-colors"
                                                                    >
                                                                        Eliminar habitación
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Botones de acción */}
                                            <div className="flex space-x-3 pt-2">
                                                <Button
                                                    variant="outline"
                                                    onClick={addRoom}
                                                    className="flex-1 border-primary text-primary hover:bg-primary/10"
                                                >
                                                    Añadir habitación
                                                </Button>
                                                <Button
                                                    onClick={acceptGuestSelection}
                                                    className="flex-1"
                                                >
                                                    Aceptar
                                                </Button>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/* Nacionalidad */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white drop-shadow-md">
                                    Nacionalidad
                                </label>
                                <Popover open={isCountryPopoverOpen} onOpenChange={setIsCountryPopoverOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start text-left font-normal h-12 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 focus:ring-2 focus:ring-white/50 focus:border-white/50"
                                        >
                                            <span className="mr-2 text-lg">{selectedCountry.flag}</span>
                                            <span className="flex-1 text-left">{selectedCountry.name}</span>
                                            <ChevronDown className="ml-auto w-4 h-4 text-white/70" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80 p-0" align="start">
                                        <div className="max-h-64 overflow-y-auto">
                                            <div className="p-2">
                                                {southAmericanCountries.map((country) => (
                                                    <button
                                                        key={country.id}
                                                        onClick={() => selectCountry(country)}
                                                        className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left hover:bg-accent hover:text-accent-foreground transition-colors ${
                                                            selectedCountry.id === country.id ? 'bg-primary text-primary-foreground' : 'text-popover-foreground'
                                                        }`}
                                                    >
                                                        <span className="text-xl">{country.flag}</span>
                                                        <span className="flex-1 font-medium">{country.name}</span>
                                                        {selectedCountry.id === country.id && (
                                                            <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/* Clase */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white drop-shadow-md">
                                    Clase
                                </label>
                                <Select value={selectedTravelClass.id.toString()} onValueChange={(value) => {
                                    const travelClass = travelClasses.find(tc => tc.id.toString() === value)
                                    if (travelClass) setSelectedTravelClass(travelClass)
                                }}>
                                    <SelectTrigger className="w-full h-12 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 focus:ring-2 focus:ring-white/50 focus:border-white/50">
                                        <SelectValue>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-lg">{selectedTravelClass.icon}</span>
                                                <span>{selectedTravelClass.name}</span>
                                            </div>
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {travelClasses.map((travelClass) => (
                                            <SelectItem key={travelClass.id} value={travelClass.id.toString()}>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-lg">{travelClass.icon}</span>
                                                    <span>{travelClass.name}</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Botón de búsqueda */}
                            <div className="space-y-2">
                                
                                <Button     
                                    onClick={
                                        () => router.push('/clientes/configurar-tour')
                                        
                                    }
                                    className="w-full h-12 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                                >
                                    <Search className="w-6 h-6 mr-3" />
                                    Buscar
                                </Button>
                            </div>
                        </div>

                        {/* Términos legales */}
                        <div className="mt-6 text-center">
                            <p className="text-xs text-white/80 drop-shadow-md">
                                Haciendo click en "Buscar", acepto las Condiciones de uso
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}   
