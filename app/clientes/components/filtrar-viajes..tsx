"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, MapPin, Moon, Heart, Building2, Utensils, TreePine, Umbrella, Users, Sun, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TravelPackage {
    id: number
    title: string
    destinations: number
    nights: number
    price: number
    image: string
    day: string
    flightDetails: {
        departure: string
        arrival: string
        stops: number
        duration: string
        airline: string
    }
}

interface TravelCategory {
    id: number
    name: string
    icon: React.ReactNode
}

const travelPackages: TravelPackage[] = [
    {
        id: 1,
        title: "PERÚ MÁGICO - MACHU PICCHU Y CUSCO (Lunes)",
        destinations: 4,
        nights: 6,
        price: 1500,
        image: "/assets/banner.jpg",
        day: "Lunes",
        flightDetails: {
            departure: "MIA",
            arrival: "LIM",
            stops: 0,
            duration: "4h 30m",
            airline: "LATAM"
        }
    },
    {
        id: 2,
        title: "COLOMBIA CARIBE - CARTAGENA Y SANTA MARTA (Martes)",
        destinations: 3,
        nights: 5,
        price: 2100,
        image: "/assets/banner.jpg",
        day: "Martes",
        flightDetails: {
            departure: "MIA",
            arrival: "CTG",
            stops: 1,
            duration: "5h 15m",
            airline: "American Airlines"
        }
    },
    {
        id: 3,
        title: "ECUADOR AVENTURA - QUITO Y GALÁPAGOS (Miércoles)",
        destinations: 5,
        nights: 7,
        price: 1999,
        image: "/assets/banner.jpg",
        day: "Miércoles",
        flightDetails: {
            departure: "MIA",
            arrival: "UIO",
            stops: 0,
            duration: "4h 45m",
            airline: "LATAM"
        }
    },
    {
        id: 4,
        title: "ARGENTINA TANGO - BUENOS AIRES Y MENDOZA (Jueves)",
        destinations: 3,
        nights: 6,
        price: 1499,
        image: "/assets/banner.jpg",
        day: "Jueves",
        flightDetails: {
            departure: "MIA",
            arrival: "EZE",
            stops: 1,
            duration: "8h 30m",
            airline: "American Airlines"
        }
    },
    {
        id: 5,
        title: "CHILE NATURALEZA - SANTIAGO Y VALLE DEL ELQUI (Viernes)",
        destinations: 4,
        nights: 5,
        price: 1399,
        image: "/assets/banner.jpg",
        day: "Viernes",
        flightDetails: {
            departure: "MIA",
            arrival: "SCL",
            stops: 0,
            duration: "8h 20m",
            airline: "LATAM"
        }
    },
    {
        id: 6,
        title: "BRASIL PLAYAS - RÍO DE JANEIRO Y FLORIANÓPOLIS (Sábado)",
        destinations: 3,
        nights: 6,
        price: 1799,
        image: "/assets/banner.jpg",
        day: "Sábado",
        flightDetails: {
            departure: "MIA",
            arrival: "GIG",
            stops: 1,
            duration: "9h 45m",
            airline: "American Airlines"
        }
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
                                    <Card className="relative h-[500px] overflow-hidden group">
                                        {/* Background Image */}
                                        <div className="absolute inset-0">
                                            <img
                                                src={pkg.image}
                                                alt={pkg.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                        </div>

                                        {/* Content */}
                                        <CardContent className="relative h-full flex flex-col justify-between p-6 text-white">
                                            {/* Top Section */}
                                            <div className="space-y-4">
                                                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                                                    {pkg.day}
                                                </Badge>
                                                
                                                <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                                                    {pkg.title}
                                                </h3>
                                                
                                                {/* Separator Line */}
                                                <div className="w-16 h-0.5 bg-white rounded-full" />
                                                
                                                {/* Details */}
                                                <div className="flex items-center gap-6 text-lg">
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="w-5 h-5" />
                                                        <span>{pkg.destinations} DESTINOS</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Moon className="w-5 h-5" />
                                                        <span>{pkg.nights} NOCHES</span>
                                                    </div>
                                                </div>

                                                {/* Flight Information */}
                                                <div className="bg-black/30 p-4 rounded-xl backdrop-blur-sm border border-white/20">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <span className="text-sm text-white/80 font-medium">Vuelo de ida y vuelta</span>
                                                        <span className="text-xs text-blue-300 bg-blue-900/30 px-2 py-1 rounded-full">
                                                            {pkg.flightDetails.stops === 0 ? 'Directo' : `${pkg.flightDetails.stops} escala${pkg.flightDetails.stops > 1 ? 's' : ''}`}
                                                        </span>
                                                    </div>
                                                    
                                                    <div className="flex items-center justify-between text-white">
                                                        <div className="text-center">
                                                            <p className="text-lg font-bold">{pkg.flightDetails.departure}</p>
                                                            <p className="text-xs text-white/70">Salida</p>
                                                        </div>
                                                        
                                                        <div className="flex-1 mx-4">
                                                            <div className="flex items-center justify-center">
                                                                <div className="w-16 h-0.5 bg-white/40 rounded-full relative">
                                                                    <div className="absolute -top-1 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2"></div>
                                                                </div>
                                                                <div className="mx-2">
                                                                    <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                                                    </svg>
                                                                </div>
                                                                <div className="w-16 h-0.5 bg-white/40 rounded-full relative">
                                                                    <div className="absolute -top-1 right-1/2 w-2 h-2 bg-white rounded-full transform translate-x-1/2"></div>
                                                                </div>
                                                            </div>
                                                            <p className="text-center text-xs text-white/70 mt-1">{pkg.flightDetails.duration}</p>
                                                        </div>
                                                        
                                                        <div className="text-center">
                                                            <p className="text-lg font-bold">{pkg.flightDetails.arrival}</p>
                                                            <p className="text-xs text-white/70">Llegada</p>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/20">
                                                        <span className="text-sm text-white/80">Aerolínea: <span className="text-blue-300 font-medium">{pkg.flightDetails.airline}</span></span>
                                                        <span className="text-xs text-green-300 bg-green-900/30 px-2 py-1 rounded-full">Incluido</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Bottom Section */}
                                            <div className="space-y-4">
                                                <Button 
                                                    size="lg" 
                                                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-semibold py-4"
                                                >
                                                    Paquete de vacaciones
                                                </Button>
                                                
                                                <div className="text-left">
                                                    <p className="text-sm text-white/80 mb-1">Desde</p>
                                                    <p className="text-4xl md:text-5xl font-bold">
                                                        {formatPrice(pkg.price)}
                                                    </p>
                                                    <p className="text-sm text-white/80">Por persona</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center mt-8 gap-2">
                        {travelPackages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`
                                    w-3 h-3 rounded-full transition-all duration-300
                                    ${index === currentSlide 
                                        ? 'bg-primary scale-125' 
                                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
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