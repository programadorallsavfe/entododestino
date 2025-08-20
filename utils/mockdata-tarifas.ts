export interface Tarifa {
    id: number
    operador: string
    nombreTour: string
    tarifa: number
    tipoMoneda: string
    duracion?: string
    destino?: string
    temporada?: string
    descripcion?: string
}

export const tarifas: Tarifa[] = [
    {
        id: 1,
        operador: "Viajes Lili",
        nombreTour: "Machu Picchu Clásico",
        tarifa: 850,
        tipoMoneda: "USD",
        duracion: "4 días / 3 noches",
        destino: "Cusco, Perú",
        temporada: "Alta",
        descripcion: "Tour completo a Machu Picchu con guía certificado"
    },
    {
        id: 2,
        operador: "En Todo Destino",
        nombreTour: "Río de Janeiro Express",
        tarifa: 650,
        tipoMoneda: "USD",
        duracion: "3 días / 2 noches",
        destino: "Río de Janeiro, Brasil",
        temporada: "Media",
        descripcion: "Visita a Cristo Redentor, Pan de Azúcar y playas"
    },
    {
        id: 3,
        operador: "South America Tours",
        nombreTour: "Patagonia Chilena",
        tarifa: 1200,
        tipoMoneda: "USD",
        duracion: "7 días / 6 noches",
        destino: "Torres del Paine, Chile",
        temporada: "Alta",
        descripcion: "Trekking en Torres del Paine con alojamiento premium"
    },
    {
        id: 4,
        operador: "Andes Adventures",
        nombreTour: "Galápagos Discovery",
        tarifa: 1800,
        tipoMoneda: "USD",
        duracion: "8 días / 7 noches",
        destino: "Islas Galápagos, Ecuador",
        temporada: "Alta",
        descripcion: "Crucero por las islas con buceo y observación de fauna"
    },
    {
        id: 5,
        operador: "Amazon Explorer",
        nombreTour: "Selva Amazónica",
        tarifa: 750,
        tipoMoneda: "USD",
        duracion: "5 días / 4 noches",
        destino: "Manaus, Brasil",
        temporada: "Baja",
        descripcion: "Exploración de la selva con lodge en el río"
    },
    {
        id: 6,
        operador: "Tango Tours",
        nombreTour: "Buenos Aires Cultural",
        tarifa: 480,
        tipoMoneda: "USD",
        duracion: "3 días / 2 noches",
        destino: "Buenos Aires, Argentina",
        temporada: "Media",
        descripcion: "Tango, gastronomía y arquitectura porteña"
    },
    {
        id: 7,
        operador: "Caribbean Dreams",
        nombreTour: "Cartagena Colonial",
        tarifa: 520,
        tipoMoneda: "USD",
        duracion: "4 días / 3 noches",
        destino: "Cartagena, Colombia",
        temporada: "Media",
        descripcion: "Ciudad amurallada, playas y islas del Rosario"
    },
    {
        id: 8,
        operador: "Mountain High",
        nombreTour: "Aconcagua Base Camp",
        tarifa: 950,
        tipoMoneda: "USD",
        duracion: "6 días / 5 noches",
        destino: "Mendoza, Argentina",
        temporada: "Alta",
        descripcion: "Trekking al campamento base del Aconcagua"
    },
    {
        id: 9,
        operador: "Desert Trails",
        nombreTour: "Desierto de Atacama",
        tarifa: 680,
        tipoMoneda: "USD",
        duracion: "4 días / 3 noches",
        destino: "San Pedro de Atacama, Chile",
        temporada: "Media",
        descripcion: "Valle de la Luna, géiseres y observación astronómica"
    },
    {
        id: 10,
        operador: "Rainforest Expeditions",
        nombreTour: "Iguazú Falls",
        tarifa: 420,
        tipoMoneda: "USD",
        duracion: "2 días / 1 noche",
        destino: "Puerto Iguazú, Argentina",
        temporada: "Media",
        descripcion: "Cataratas del lado argentino y brasileño"
    },
    {
        id: 11,
        operador: "Highland Tours",
        nombreTour: "Salar de Uyuni",
        tarifa: 580,
        tipoMoneda: "USD",
        duracion: "3 días / 2 noches",
        destino: "Uyuni, Bolivia",
        temporada: "Media",
        descripcion: "Desierto de sal, lagunas coloridas y geysers"
    },
    {
        id: 12,
        operador: "Coastal Adventures",
        nombreTour: "Mancora Beach",
        tarifa: 380,
        tipoMoneda: "USD",
        duracion: "3 días / 2 noches",
        destino: "Mancora, Perú",
        temporada: "Baja",
        descripcion: "Playa, surf y vida nocturna en la costa norte"
    },
    {
        id: 13,
        operador: "Wine & Dine",
        nombreTour: "Ruta del Vino",
        tarifa: 720,
        tipoMoneda: "USD",
        duracion: "4 días / 3 noches",
        destino: "Mendoza, Argentina",
        temporada: "Media",
        descripcion: "Bodegas, degustaciones y gastronomía local"
    },
    {
        id: 14,
        operador: "Eco Tourism",
        nombreTour: "Mashpi Reserve",
        tarifa: 890,
        tipoMoneda: "USD",
        duracion: "3 días / 2 noches",
        destino: "Quito, Ecuador",
        temporada: "Alta",
        descripcion: "Reserva natural con lodge de lujo en la selva"
    },
    {
        id: 15,
        operador: "Cultural Heritage",
        nombreTour: "Lima Gourmet",
        tarifa: 450,
        tipoMoneda: "USD",
        duracion: "2 días / 1 noche",
        destino: "Lima, Perú",
        temporada: "Media",
        descripcion: "Gastronomía peruana, museos y centro histórico"
    }
]

export const operadores = [
    "Viajes Lili",
    "En Todo Destino",
    "South America Tours",
    "Andes Adventures",
    "Amazon Explorer",
    "Tango Tours",
    "Caribbean Dreams",
    "Mountain High",
    "Desert Trails",
    "Rainforest Expeditions",
    "Highland Tours",
    "Coastal Adventures",
    "Wine & Dine",
    "Eco Tourism",
    "Cultural Heritage"
]

export const destinos = [
    "Cusco, Perú",
    "Río de Janeiro, Brasil",
    "Torres del Paine, Chile",
    "Islas Galápagos, Ecuador",
    "Manaus, Brasil",
    "Buenos Aires, Argentina",
    "Cartagena, Colombia",
    "Mendoza, Argentina",
    "San Pedro de Atacama, Chile",
    "Puerto Iguazú, Argentina",
    "Uyuni, Bolivia",
    "Mancora, Perú",
    "Quito, Ecuador",
    "Lima, Perú"
]

export const temporadas = [
    "Alta",
    "Media",
    "Baja"
]

export const monedas = [
    "USD",
    "EUR",
    "MXN",
    "PEN",
    "BRL",
    "ARS",
    "CLP",
    "COP",
    "BOB",
    "ECU"
]

export const rangosTarifas = [
    { label: "Económico", min: 0, max: 500 },
    { label: "Medio", min: 501, max: 1000 },
    { label: "Alto", min: 1001, max: 1500 },
    { label: "Premium", min: 1501, max: 9999 }
]
