export interface Hotel {
    id: number
    name: string
    image: string
    location: string
    country: string
    price: number
    rating?: number
    amenities?: string[]
}

export const hotels: Hotel[] = [
    {
        id: 1,
        name: "Belmond Hotel das Cataratas",
        image: "/assets/banner.jpg",
        location: "Parque Nacional Iguazú",
        country: "Brasil",
        price: 600,
        rating: 5,
        amenities: ["WiFi", "Piscina", "Restaurante", "Bar", "Vista a las cataratas"]
    },
    {
        id: 2,
        name: "Hotel Fasano Rio de Janeiro",
        image: "/assets/banner.jpg",
        location: "Ipanema",
        country: "Brasil",
        price: 850,
        rating: 5,
        amenities: ["WiFi", "Spa", "Restaurante", "Bar", "Vista al mar", "Piscina"]
    },
    {
        id: 3,
        name: "Palacio Duhau - Park Hyatt Buenos Aires",
        image: "/assets/banner.jpg",
        location: "Recoleta",
        country: "Argentina",
        price: 750,
        rating: 5,
        amenities: ["WiFi", "Spa", "Restaurante", "Bar", "Jardines históricos"]
    },
    {
        id: 4,
        name: "Hotel Alvear Palace",
        image: "/assets/banner.jpg",
        location: "Avenida Alvear",
        country: "Argentina",
        price: 650,
        rating: 5,
        amenities: ["WiFi", "Afternoon Tea", "Restaurante", "Bar", "Spa"]
    },
    {
        id: 5,
        name: "Hotel Monasterio Cusco",
        image: "/assets/banner.jpg",
        location: "Plaza de Armas",
        country: "Perú",
        price: 450,
        rating: 5,
        amenities: ["WiFi", "Spa", "Restaurante", "Bar", "Monasterio del siglo XVI"]
    },
    {
        id: 6,
        name: "Belmond Sanctuary Lodge",
        image: "/assets/banner.jpg",
        location: "Machu Picchu",
        country: "Perú",
        price: 1200,
        rating: 5,
        amenities: ["WiFi", "Restaurante", "Bar", "Vista a Machu Picchu", "Guía turístico"]
    },
    {
        id: 7,
        name: "Hotel W Santiago",
        image: "/assets/banner.jpg",
        location: "Las Condes",
        country: "Chile",
        price: 550,
        rating: 5,
        amenities: ["WiFi", "Spa", "Restaurante", "Bar", "Piscina", "Gimnasio"]
    },
    {
        id: 8,
        name: "The Singular Patagonia",
        image: "/assets/banner.jpg",
        location: "Puerto Bories",
        country: "Chile",
        price: 1800,
        rating: 5,
        amenities: ["WiFi", "Spa", "Restaurante", "Bar", "Vista a los fiordos", "Excursiones"]
    },
    {
        id: 9,
        name: "Hotel Casa Gangotena",
        image: "/assets/banner.jpg",
        location: "Plaza San Francisco",
        country: "Ecuador",
        price: 400,
        rating: 5,
        amenities: ["WiFi", "Restaurante", "Bar", "Vista al centro histórico", "Terraza"]
    },
    {
        id: 10,
        name: "Mashpi Lodge",
        image: "/assets/banner.jpg",
        location: "Reserva Mashpi",
        country: "Ecuador",
        price: 950,
        rating: 5,
        amenities: ["WiFi", "Restaurante", "Bar", "Vista a la selva", "Guía naturalista"]
    },
    {
        id: 11,
        name: "Hotel de la Opera",
        image: "/assets/banner.jpg",
        location: "Centro Histórico",
        country: "Colombia",
        price: 350,
        rating: 5,
        amenities: ["WiFi", "Restaurante", "Bar", "Arquitectura colonial", "Terraza"]
    },
    {
        id: 12,
        name: "Hotel Sofitel Legend Santa Clara",
        image: "/assets/banner.jpg",
        location: "Centro Histórico",
        country: "Colombia",
        price: 500,
        rating: 5,
        amenities: ["WiFi", "Spa", "Restaurante", "Bar", "Piscina", "Convento histórico"]
    },
    {
        id: 13,
        name: "Hotel Jw Marriott El Convento Cusco",
        image: "/assets/banner.jpg",
        location: "San Blas",
        country: "Perú",
        price: 380,
        rating: 5,
        amenities: ["WiFi", "Spa", "Restaurante", "Bar", "Convento restaurado", "Vista a la ciudad"]
    },
    {
        id: 14,
        name: "Hotel Explora Patagonia",
        image: "/assets/banner.jpg",
        location: "Torres del Paine",
        country: "Chile",
        price: 2200,
        rating: 5,
        amenities: ["WiFi", "Spa", "Restaurante", "Bar", "Vista a las torres", "Excursiones incluidas"]
    },
    {
        id: 15,
        name: "Hotel Fasano São Paulo",
        image: "/assets/banner.jpg",
        location: "Jardins",
        country: "Brasil",
        price: 700,
        rating: 5,
        amenities: ["WiFi", "Spa", "Restaurante", "Bar", "Piscina", "Vista a la ciudad"]
    }
]

export const popularDestinations = [
    "Río de Janeiro, Brasil",
    "Buenos Aires, Argentina",
    "Cusco, Perú",
    "Santiago, Chile",
    "Quito, Ecuador",
    "Cartagena, Colombia",
    "Lima, Perú",
    "São Paulo, Brasil",
    "Bogotá, Colombia",
    "Valparaíso, Chile"
]

export const hotelCategories = [
    "Lujo",
    "Boutique",
    "Resort",
    "Histórico",
    "Moderno",
    "Ecológico",
    "Familiar",
    "Romántico",
    "De negocios",
    "De playa"
]

export const priceRanges = [
    { label: "Económico", min: 0, max: 200 },
    { label: "Medio", min: 201, max: 500 },
    { label: "Alto", min: 501, max: 1000 },
    { label: "Lujo", min: 1001, max: 9999 }
]
