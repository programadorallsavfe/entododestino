export interface Vuelo {
    id: number
    aerolinea: string
    numeroVuelo: string
    origen: string
    destino: string
    horaSalida: string
    horaLlegada: string
    duracion: string
    precio: number
    clase: string
    escalas: number
    aeronave: string
    terminal?: string
    puerta?: string
    estado: "A Tiempo" | "Retrasado" | "Cancelado" | "Abordando"
}

export interface Aeropuerto {
    codigo: string
    nombre: string
    ciudad: string
    pais: string
    zonaHoraria: string
}

export const vuelos: Vuelo[] = [
    {
        id: 1,
        aerolinea: "LATAM Airlines",
        numeroVuelo: "LA 800",
        origen: "MEX",
        destino: "LIM",
        horaSalida: "08:30",
        horaLlegada: "14:45",
        duracion: "6h 15m",
        precio: 450,
        clase: "Economy",
        escalas: 0,
        aeronave: "Boeing 787-9",
        terminal: "T2",
        puerta: "A15",
        estado: "A Tiempo"
    },
    {
        id: 2,
        aerolinea: "Avianca",
        numeroVuelo: "AV 123",
        origen: "BOG",
        destino: "MEX",
        horaSalida: "10:15",
        horaLlegada: "14:30",
        duracion: "4h 15m",
        precio: 380,
        clase: "Economy",
        escalas: 0,
        aeronave: "Airbus A320neo",
        terminal: "T1",
        puerta: "B8",
        estado: "A Tiempo"
    },
    {
        id: 3,
        aerolinea: "Aerolíneas Argentinas",
        numeroVuelo: "AR 1500",
        origen: "EZE",
        destino: "MEX",
        horaSalida: "13:45",
        horaLlegada: "19:20",
        duracion: "5h 35m",
        precio: 520,
        clase: "Economy",
        escalas: 0,
        aeronave: "Boeing 737-800",
        terminal: "T2",
        puerta: "C12",
        estado: "Retrasado"
    },
    {
        id: 4,
        aerolinea: "Copa Airlines",
        numeroVuelo: "CM 123",
        origen: "PTY",
        destino: "MEX",
        horaSalida: "06:20",
        horaLlegada: "10:45",
        duracion: "4h 25m",
        precio: 320,
        clase: "Economy",
        escalas: 0,
        aeronave: "Boeing 737-800",
        terminal: "T1",
        puerta: "A5",
        estado: "A Tiempo"
    },
    {
        id: 5,
        aerolinea: "American Airlines",
        numeroVuelo: "AA 1234",
        origen: "MIA",
        destino: "MEX",
        horaSalida: "09:00",
        horaLlegada: "12:15",
        duracion: "3h 15m",
        precio: 280,
        clase: "Economy",
        escalas: 0,
        aeronave: "Boeing 737-800",
        terminal: "T1",
        puerta: "B10",
        estado: "A Tiempo"
    },
    {
        id: 6,
        aerolinea: "Delta Air Lines",
        numeroVuelo: "DL 567",
        origen: "ATL",
        destino: "MEX",
        horaSalida: "11:30",
        horaLlegada: "15:45",
        duracion: "4h 15m",
        precio: 310,
        clase: "Economy",
        escalas: 0,
        aeronave: "Boeing 757-200",
        terminal: "T1",
        puerta: "C8",
        estado: "A Tiempo"
    },
    {
        id: 7,
        aerolinea: "United Airlines",
        numeroVuelo: "UA 890",
        origen: "IAH",
        destino: "MEX",
        horaSalida: "14:20",
        horaLlegada: "17:35",
        duracion: "3h 15m",
        precio: 290,
        clase: "Economy",
        escalas: 0,
        aeronave: "Boeing 737-900",
        terminal: "T1",
        puerta: "A12",
        estado: "A Tiempo"
    },
    {
        id: 8,
        aerolinea: "British Airways",
        numeroVuelo: "BA 123",
        origen: "LHR",
        destino: "MEX",
        horaSalida: "12:00",
        horaLlegada: "17:30",
        duracion: "11h 30m",
        precio: 1200,
        clase: "Economy",
        escalas: 0,
        aeronave: "Boeing 787-9",
        terminal: "T2",
        puerta: "D15",
        estado: "A Tiempo"
    },
    {
        id: 9,
        aerolinea: "Air France",
        numeroVuelo: "AF 456",
        origen: "CDG",
        destino: "MEX",
        horaSalida: "13:30",
        horaLlegada: "19:00",
        duracion: "11h 30m",
        precio: 1150,
        clase: "Economy",
        escalas: 0,
        aeronave: "Airbus A350-900",
        terminal: "T2",
        puerta: "E8",
        estado: "A Tiempo"
    },
    {
        id: 10,
        aerolinea: "Lufthansa",
        numeroVuelo: "LH 789",
        origen: "FRA",
        destino: "MEX",
        horaSalida: "15:45",
        horaLlegada: "21:15",
        duracion: "11h 30m",
        precio: 1180,
        clase: "Economy",
        escalas: 0,
        aeronave: "Boeing 747-8",
        terminal: "T2",
        puerta: "F12",
        estado: "Retrasado"
    },
    {
        id: 11,
        aerolinea: "Iberia",
        numeroVuelo: "IB 321",
        origen: "MAD",
        destino: "MEX",
        horaSalida: "16:00",
        horaLlegada: "21:30",
        duracion: "11h 30m",
        precio: 980,
        clase: "Economy",
        escalas: 0,
        aeronave: "Airbus A330-200",
        terminal: "T2",
        puerta: "G5",
        estado: "A Tiempo"
    },
    {
        id: 12,
        aerolinea: "KLM Royal Dutch Airlines",
        numeroVuelo: "KL 654",
        origen: "AMS",
        destino: "MEX",
        horaSalida: "10:30",
        horaLlegada: "16:00",
        duracion: "11h 30m",
        precio: 1100,
        clase: "Economy",
        escalas: 0,
        aeronave: "Boeing 787-9",
        terminal: "T2",
        puerta: "H8",
        estado: "A Tiempo"
    },
    {
        id: 13,
        aerolinea: "Turkish Airlines",
        numeroVuelo: "TK 987",
        origen: "IST",
        destino: "MEX",
        horaSalida: "08:15",
        horaLlegada: "16:45",
        duracion: "14h 30m",
        precio: 1350,
        clase: "Economy",
        escalas: 1,
        aeronave: "Boeing 777-300ER",
        terminal: "T2",
        puerta: "I10",
        estado: "A Tiempo"
    },
    {
        id: 14,
        aerolinea: "Emirates",
        numeroVuelo: "EK 456",
        origen: "DXB",
        destino: "MEX",
        horaSalida: "07:30",
        horaLlegada: "18:00",
        duracion: "16h 30m",
        precio: 1800,
        clase: "Economy",
        escalas: 1,
        aeronave: "Boeing 777-200LR",
        terminal: "T2",
        puerta: "J15",
        estado: "A Tiempo"
    },
    {
        id: 15,
        aerolinea: "Qatar Airways",
        numeroVuelo: "QR 789",
        origen: "DOH",
        destino: "MEX",
        horaSalida: "09:45",
        horaLlegada: "20:15",
        duracion: "16h 30m",
        precio: 1750,
        clase: "Economy",
        escalas: 1,
        aeronave: "Boeing 777-300ER",
        terminal: "T2",
        puerta: "K12",
        estado: "A Tiempo"
    }
]

export const aeropuertos: Aeropuerto[] = [
    { codigo: "MEX", nombre: "Aeropuerto Internacional Benito Juárez", ciudad: "Ciudad de México", pais: "México", zonaHoraria: "UTC-6" },
    { codigo: "LIM", nombre: "Aeropuerto Internacional Jorge Chávez", ciudad: "Lima", pais: "Perú", zonaHoraria: "UTC-5" },
    { codigo: "BOG", nombre: "Aeropuerto Internacional El Dorado", ciudad: "Bogotá", pais: "Colombia", zonaHoraria: "UTC-5" },
    { codigo: "EZE", nombre: "Aeropuerto Internacional Ministro Pistarini", ciudad: "Buenos Aires", pais: "Argentina", zonaHoraria: "UTC-3" },
    { codigo: "PTY", nombre: "Aeropuerto Internacional de Tocumen", ciudad: "Ciudad de Panamá", pais: "Panamá", zonaHoraria: "UTC-5" },
    { codigo: "MIA", nombre: "Aeropuerto Internacional de Miami", ciudad: "Miami", pais: "Estados Unidos", zonaHoraria: "UTC-5" },
    { codigo: "ATL", nombre: "Aeropuerto Internacional Hartsfield-Jackson", ciudad: "Atlanta", pais: "Estados Unidos", zonaHoraria: "UTC-5" },
    { codigo: "IAH", nombre: "Aeropuerto Intercontinental George Bush", ciudad: "Houston", pais: "Estados Unidos", zonaHoraria: "UTC-6" },
    { codigo: "LHR", nombre: "Aeropuerto de Londres-Heathrow", ciudad: "Londres", pais: "Reino Unido", zonaHoraria: "UTC+0" },
    { codigo: "CDG", nombre: "Aeropuerto de París-Charles de Gaulle", ciudad: "París", pais: "Francia", zonaHoraria: "UTC+1" },
    { codigo: "FRA", nombre: "Aeropuerto de Fráncfort del Meno", ciudad: "Fráncfort", pais: "Alemania", zonaHoraria: "UTC+1" },
    { codigo: "MAD", nombre: "Aeropuerto Adolfo Suárez Madrid-Barajas", ciudad: "Madrid", pais: "España", zonaHoraria: "UTC+1" },
    { codigo: "AMS", nombre: "Aeropuerto de Ámsterdam-Schiphol", ciudad: "Ámsterdam", pais: "Países Bajos", zonaHoraria: "UTC+1" },
    { codigo: "IST", nombre: "Aeropuerto de Estambul", ciudad: "Estambul", pais: "Turquía", zonaHoraria: "UTC+3" },
    { codigo: "DXB", nombre: "Aeropuerto Internacional de Dubái", ciudad: "Dubái", pais: "Emiratos Árabes Unidos", zonaHoraria: "UTC+4" },
    { codigo: "DOH", nombre: "Aeropuerto Internacional Hamad", ciudad: "Doha", pais: "Catar", zonaHoraria: "UTC+3" }
]

export const aerolineas = [
    "LATAM Airlines",
    "Avianca",
    "Aerolíneas Argentinas",
    "Copa Airlines",
    "American Airlines",
    "Delta Air Lines",
    "United Airlines",
    "British Airways",
    "Air France",
    "Lufthansa",
    "Iberia",
    "KLM Royal Dutch Airlines",
    "Turkish Airlines",
    "Emirates",
    "Qatar Airways"
]

export const clasesVuelo = [
    "Economy",
    "Premium Economy",
    "Business",
    "First Class"
]

export const estadosVuelo = [
    "A Tiempo",
    "Retrasado",
    "Cancelado",
    "Abordando"
]

export const rutasPopulares = [
    "MEX - LIM",
    "MEX - BOG",
    "MEX - EZE",
    "MEX - MIA",
    "MEX - LHR",
    "MEX - CDG",
    "MEX - MAD",
    "MEX - AMS"
]

export const rangosPrecio = [
    { label: "Económico", min: 0, max: 500 },
    { label: "Medio", min: 501, max: 1000 },
    { label: "Alto", min: 1001, max: 1500 },
    { label: "Premium", min: 1501, max: 9999 }
]
