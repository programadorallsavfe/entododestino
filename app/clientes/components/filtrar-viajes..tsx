"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, MapPin, Moon, Heart, Building2, Utensils, TreePine, Umbrella, Users, Sun, Building, Plane, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TravelPackage {
    id: number
    title: string
    destinations: number
    nights: number
    price: number
    image: string
    day: string
    rating: number
    reviews: number
    flightDetails: {
        departure: string
        arrival: string
        stops: number
        duration: string
        airline: string
    }
    highlights: string[]
}

interface TravelCategory {
    id: number
    name: string
    icon: React.ReactNode
}

const travelPackages: TravelPackage[] = [
    {
        id: 1,
        title: "PERÚ MÁGICO - MACHU PICCHU Y CUSCO",
        destinations: 4,
        nights: 6,
        price: 1500,
        image: "/assets/banner.jpg",
        day: "Lunes",
        rating: 4.8,
        reviews: 127,
        flightDetails: {
            departure: "LIM",
            arrival: "LIM",
            stops: 0,
            duration: "4h 30m",
            airline: "LATAM"
        },
        highlights: ["Machu Picchu", "Cusco", "Valle Sagrado", "Lima"]
    },
    {
        id: 2,
        title: "COLOMBIA CARIBE - CARTAGENA Y SANTA MARTA",
        destinations: 3,
        nights: 5,
        price: 2100,
        image: "/assets/banner.jpg",
        day: "Martes",
        rating: 4.6,
        reviews: 89,
        flightDetails: {
            departure: "LIM",
            arrival: "CTG",
            stops: 1,
            duration: "5h 15m",
            airline: "American Airlines"
        },
        highlights: ["Cartagena", "Santa Marta", "Tayrona"]
    },
    {
        id: 3,
        title: "ECUADOR AVENTURA - QUITO Y GALÁPAGOS",
        destinations: 5,
        nights: 7,
        price: 1999,
        image: "/assets/banner.jpg",
        day: "Miércoles",
        rating: 4.9,
        reviews: 156,
        flightDetails: {
            departure: "LIM",
            arrival: "UIO",
            stops: 0,
            duration: "4h 45m",
            airline: "LATAM"
        },
        highlights: ["Quito", "Galápagos", "Cuenca", "Otavalo", "Baños"]
    },
    {
        id: 4,
        title: "ARGENTINA TANGO - BUENOS AIRES Y MENDOZA",
        destinations: 3,
        nights: 6,
        price: 1499,
        image: "/assets/banner.jpg",
        day: "Jueves",
        rating: 4.7,
        reviews: 98,
        flightDetails: {
            departure: "LIM",
            arrival: "EZE",
            stops: 1,
            duration: "8h 30m",
            airline: "American Airlines"
        },
        highlights: ["Buenos Aires", "Mendoza", "Córdoba"]
    },
    {
        id: 5,
        title: "CHILE NATURALEZA - SANTIAGO Y VALLE DEL ELQUI",
        destinations: 4,
        nights: 5,
        price: 1399,
        image: "/assets/banner.jpg",
        day: "Viernes",
        rating: 4.5,
        reviews: 73,
        flightDetails: {
            departure: "LIM",
            arrival: "SCL",
            stops: 0,
            duration: "8h 20m",
            airline: "LATAM"
        },
        highlights: ["Santiago", "Valle del Elqui", "Valparaíso", "Viña del Mar"]
    },
    {
        id: 6,
        title: "BRASIL PLAYAS - RÍO DE JANEIRO Y FLORIANÓPOLIS",
        destinations: 3,
        nights: 6,
        price: 1799,
        image: "/assets/banner.jpg",
        day: "Sábado",
        rating: 4.4,
        reviews: 112,
        flightDetails: {
            departure: "LIM",
            arrival: "GIG",
            stops: 1,
            duration: "9h 45m",
            airline: "American Airlines"
        },
        highlights: ["Río de Janeiro", "Florianópolis", "São Paulo"]
    }
]

const travelCategories: TravelCategory[] = [
    { id: 1, name: "Navidades", icon: <TreePine className="w-6 h-6" /> },
    { id: 2, name: "Playa", icon: <Umbrella className="w-6 h-6" /> },
    { id: 3, name: "Familia", icon: <Users className="w-6 h-6" /> },
    { id: 4, name: "Verano", icon: <Sun className="w-6 h-6" /> },
    { id: 5, name: "Romántico", icon: <Heart className="w-6 h-6" /> },
    { id: 6, name: "Gastronomía", icon: <Utensils className="w-6 h-6" /> },
    { id: 7, name: "Historia", icon: <Building2 className="w-6 h-6" /> },
    { id: 8, name: "Ciudad", icon: <Building className="w-6 h-6" /> },
    { id: 9, name: "Playas de México", icon: <Umbrella className="w-6 h-6" /> }
]

export const FiltrarViajes = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null)

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % travelPackages.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + travelPackages.length) % travelPackages.length)
    }

    const goToSlide = (index: number) => {
        setCurrentSlide(index)
    }

    const handleCategoryClick = (categoryId: number) => {
        setSelectedCategory(selectedCategory === categoryId ? null : categoryId)
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 0
        }).format(price)
    }

    return (
        <section className="w-full bg-background py-16">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                        <div className="flex-1">
                            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                                Nuestras ideas de viaje
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                Aquí podrás ver nuestras ideas de viaje
                            </p>
                        </div>
                        <Button 
                            size="lg" 
                            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold"
                        >
                            Ver más
                        </Button>
                    </div>
                </div>

                {/* Category Navigation */}
                <div className="mb-12">
                    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                        {travelCategories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryClick(category.id)}
                                className={`
                                    flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300
                                    hover:bg-accent hover:text-accent-foreground
                                    ${selectedCategory === category.id 
                                        ? 'bg-primary text-primary-foreground shadow-lg scale-105' 
                                        : 'bg-card text-card-foreground hover:shadow-md'
                                    }
                                `}
                            >
                                <div className="p-2 rounded-lg bg-muted/50">
                                    {category.icon}
                                </div>
                                <span className="text-sm font-medium whitespace-nowrap">
                                    {category.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Travel Packages Carousel */}
                <div className="relative max-w-7xl mx-auto">
                    {/* Navigation Arrows */}
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg border-0 w-12 h-12 rounded-full"
                    >
                        <ChevronLeft className="w-6 h-6 text-foreground" />
                    </Button>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg border-0 w-12 h-12 rounded-full"
                    >
                        <ChevronRight className="w-6 h-6 text-foreground" />
                    </Button>

                    {/* Carousel Container */}
                    <div className="overflow-hidden">
                        <div 
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {travelPackages.map((pkg, index) => (
                                <div key={pkg.id} className="w-full flex-shrink-0 px-2">
                                    <Card className="relative h-[700px] overflow-hidden group bg-white shadow-xl">
                                        {/* Background Image */}
                                        <div className="absolute inset-0">
                                            <img
                                                src={pkg.image}
                                                alt={pkg.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                        </div>

                                        {/* Content */}
                                        <div className="relative h-full flex flex-col justify-between p-8 text-white">
                                            {/* Top Section - Header Info */}
                                            <div className="space-y-6">
                                                {/* Day Badge and Rating */}
                                                <div className="flex items-center justify-between">
                                                    <Badge 
                                                        variant="secondary" 
                                                        className="bg-blue-600 text-white border-0 px-4 py-2 text-sm font-semibold rounded-full"
                                                    >
                                                        {pkg.day}
                                                    </Badge>
                                                    
                                                    <div className="flex items-center gap-2 bg-black/30 px-3 py-2 rounded-full backdrop-blur-sm">
                                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                        <span className="text-sm font-medium">{pkg.rating}</span>
                                                        <span className="text-xs text-white/70">({pkg.reviews})</span>
                                                    </div>
                                                </div>
                                                
                                                {/* Main Title */}
                                                <h3 className="text-3xl md:text-4xl font-bold leading-tight max-w-lg">
                                                    {pkg.title}
                                                </h3>
                                                
                                                {/* Package Highlights */}
                                                <div className="flex flex-wrap gap-2">
                                                    {pkg.highlights.slice(0, 3).map((highlight, idx) => (
                                                        <Badge 
                                                            key={idx}
                                                            variant="secondary" 
                                                            className="bg-white/20 text-white border-white/30 px-3 py-1 text-xs"
                                                        >
                                                            {highlight}
                                                        </Badge>
                                                    ))}
                                                </div>
                                                
                                                {/* Destinations and Nights Info */}
                                                <div className="flex items-center gap-8 text-lg">
                                                    <div className="flex items-center gap-3">
                                                        <MapPin className="w-6 h-6 text-blue-300" />
                                                        <span className="font-semibold">{pkg.destinations} DESTINOS</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <Moon className="w-6 h-6 text-blue-300" />
                                                        <span className="font-semibold">{pkg.nights} NOCHES</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Middle Section - Flight Information */}
                                            <div className="bg-black/50 p-6 rounded-2xl backdrop-blur-sm border border-white/20">
                                                <div className="space-y-5">
                                                    {/* Flight Header */}
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-white/90 font-medium text-lg">Vuelo de ida y vuelta</span>
                                                        <Badge 
                                                            variant="secondary" 
                                                            className="bg-blue-600/90 text-white border-0 px-3 py-1 text-xs font-medium"
                                                        >
                                                            {pkg.flightDetails.stops === 0 ? 'Directo' : `${pkg.flightDetails.stops} escala${pkg.flightDetails.stops > 1 ? 's' : ''}`}
                                                        </Badge>
                                                    </div>
                                                    
                                                    {/* Flight Route */}
                                                    <div className="flex items-center justify-between">
                                                        {/* Departure */}
                                                        <div className="text-center flex-1">
                                                            <p className="text-3xl font-bold text-white">{pkg.flightDetails.departure}</p>
                                                            <p className="text-sm text-white/70">Salida</p>
                                                        </div>
                                                        
                                                        {/* Flight Path */}
                                                        <div className="flex-1 mx-8">
                                                            <div className="flex items-center justify-center">
                                                                <div className="w-24 h-0.5 bg-white/40 rounded-full relative">
                                                                    <div className="absolute -top-1 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2"></div>
                                                                </div>
                                                                <div className="mx-4">
                                                                    <Plane className="w-6 h-6 text-white/70 transform rotate-45" />
                                                                </div>
                                                                <div className="w-24 h-0.5 bg-white/40 rounded-full relative">
                                                                    <div className="absolute -top-1 right-1/2 w-2 h-2 bg-white rounded-full transform translate-x-1/2"></div>
                                                                </div>
                                                            </div>
                                                            <p className="text-center text-sm text-white/70 mt-3 font-medium">
                                                                {pkg.flightDetails.duration}
                                                            </p>
                                                        </div>
                                                        
                                                        {/* Arrival */}
                                                        <div className="text-center flex-1">
                                                            <p className="text-3xl font-bold text-white">{pkg.flightDetails.arrival}</p>
                                                            <p className="text-sm text-white/70">Llegada</p>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Airline and Included Badge */}
                                                    <div className="flex items-center justify-between pt-4 border-t border-white/20">
                                                        <span className="text-white/80">
                                                            Aerolínea: <span className="text-blue-300 font-semibold">{pkg.flightDetails.airline}</span>
                                                        </span>
                                                        <Badge 
                                                            variant="secondary" 
                                                            className="bg-green-600/90 text-white border-0 px-3 py-1 text-xs font-medium"
                                                        >
                                                            Incluido
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Bottom Section - CTA Button and Price */}
                                            <div className="space-y-6">
                                                {/* CTA Button */}
                                                <Button 
                                                    size="lg" 
                                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-5 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
                                                >
                                                    Paquete de vacaciones
                                                </Button>
                                                
                                                {/* Price Information */}
                                                <div className="text-left">
                                                    <p className="text-sm text-white/70 mb-2">Desde</p>
                                                    <p className="text-5xl md:text-6xl font-bold text-white">
                                                        {formatPrice(pkg.price)}
                                                    </p>
                                                    <p className="text-sm text-white/70">Por persona</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center mt-8 gap-3">
                        {travelPackages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`
                                    w-3 h-3 rounded-full transition-all duration-300
                                    ${index === currentSlide 
                                        ? 'bg-blue-600 scale-125' 
                                        : 'bg-white/30 hover:bg-white/50'
                                    }
                                `}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}