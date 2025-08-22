"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Search, 
  Filter, 
  MapPin, 
  Plane, 
  Users, 
  DollarSign, 
  Calendar, 
  Clock, 
  Eye, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Phone, 
  Mail, 
  Globe, 
  TrendingUp, 
  TrendingDown 
} from 'lucide-react'

interface Vuelo {
  id: string
  numero: string
  aerolinea: string
  origen: {
    ciudad: string
    pais: string
    codigo: string
    coordenadas: { lat: number; lng: number }
  }
  destino: {
    ciudad: string
    pais: string
    codigo: string
    coordenadas: { lat: number; lng: number }
  }
  fechaSalida: string
  fechaLlegada: string
  horaSalida: string
  horaLlegada: string
  duracion: string
  tipoVuelo: 'directo' | 'con_escala' | 'conexion'
  escalas: string[]
  aeronave: {
    modelo: string
    capacidad: number
    matricula: string
  }
  asientos: {
    total: number
    disponibles: number
    ocupados: number
    claseEconomica: number
    claseEjecutiva: number
    primeraClase: number
  }
  precios: {
    economica: number
    ejecutiva: number
    primeraClase: number
    moneda: string
  }
  estado: 'programado' | 'en_vuelo' | 'aterrizado' | 'cancelado' | 'retrasado'
  retraso: number
  puerta: string
  terminal: string
  contacto: {
    piloto: string
    copiloto: string
    tripulacion: number
  }
  servicios: string[]
  ultimaActualizacion: string
}

export default function ListaVuelosPage() {
  const [vuelos, setVuelos] = useState<Vuelo[]>([])
  const [filtros, setFiltros] = useState({
    origen: 'todos',
    destino: 'todos',
    estado: 'todos',
    tipoVuelo: 'todos',
    fecha: 'todos'
  })
  const [vueloSeleccionado, setVueloSeleccionado] = useState<Vuelo | null>(null)
  const [modalDetalle, setModalDetalle] = useState(false)


  useEffect(() => {
    const vuelosData: Vuelo[] = [
      {
        id: '1',
        numero: 'LA-2047',
        aerolinea: 'LATAM Airlines',
        origen: {
          ciudad: 'Lima',
          pais: 'Perú',
          codigo: 'LIM',
          coordenadas: { lat: -12.0219, lng: -77.1143 }
        },
        destino: {
          ciudad: 'Buenos Aires',
          pais: 'Argentina',
          codigo: 'EZE',
          coordenadas: { lat: -34.8222, lng: -58.5358 }
        },
        fechaSalida: '2024-01-20',
        fechaLlegada: '2024-01-20',
        horaSalida: '08:30',
        horaLlegada: '16:45',
        duracion: '4h 15m',
        tipoVuelo: 'directo',
        escalas: [],
        aeronave: {
          modelo: 'Boeing 787-9 Dreamliner',
          capacidad: 293,
          matricula: 'CC-BGI'
        },
        asientos: {
          total: 293,
          disponibles: 45,
          ocupados: 248,
          claseEconomica: 220,
          claseEjecutiva: 48,
          primeraClase: 25
        },
        precios: {
          economica: 450,
          ejecutiva: 1200,
          primeraClase: 2800,
          moneda: 'USD'
        },
        estado: 'programado',
        retraso: 0,
        puerta: 'A15',
        terminal: 'T1',
        contacto: {
          piloto: 'Capt. Carlos Mendoza',
          copiloto: '1er. Oficial Ana Torres',
          tripulacion: 12
        },
        servicios: ['WiFi', 'Entretenimiento', 'Comida incluida', 'Bebidas'],
        ultimaActualizacion: '2024-01-19 15:30'
      },
      {
        id: '2',
        numero: 'AV-1234',
        aerolinea: 'Avianca',
        origen: {
          ciudad: 'Bogotá',
          pais: 'Colombia',
          codigo: 'BOG',
          coordenadas: { lat: 4.7110, lng: -74.0721 }
        },
        destino: {
          ciudad: 'Lima',
          pais: 'Perú',
          codigo: 'LIM',
          coordenadas: { lat: -12.0219, lng: -77.1143 }
        },
        fechaSalida: '2024-01-20',
        fechaLlegada: '2024-01-20',
        horaSalida: '14:15',
        horaLlegada: '16:45',
        duracion: '2h 30m',
        tipoVuelo: 'directo',
        escalas: [],
        aeronave: {
          modelo: 'Airbus A320neo',
          capacidad: 180,
          matricula: 'N1234AV'
        },
        asientos: {
          total: 180,
          disponibles: 23,
          ocupados: 157,
          claseEconomica: 150,
          claseEjecutiva: 30,
          primeraClase: 0
        },
        precios: {
          economica: 380,
          ejecutiva: 950,
          primeraClase: 0,
          moneda: 'USD'
        },
        estado: 'en_vuelo',
        retraso: 0,
        puerta: 'B8',
        terminal: 'T2',
        contacto: {
          piloto: 'Capt. Roberto Silva',
          copiloto: '1er. Oficial María López',
          tripulacion: 8
        },
        servicios: ['WiFi', 'Entretenimiento', 'Snacks', 'Bebidas'],
        ultimaActualizacion: '2024-01-20 14:45'
      },
      {
        id: '3',
        numero: 'CM-5678',
        aerolinea: 'Copa Airlines',
        origen: {
          ciudad: 'Panamá',
          pais: 'Panamá',
          codigo: 'PTY',
          coordenadas: { lat: 8.9824, lng: -79.5199 }
        },
        destino: {
          ciudad: 'Santiago',
          pais: 'Chile',
          codigo: 'SCL',
          coordenadas: { lat: -33.4489, lng: -70.6693 }
        },
        fechaSalida: '2024-01-20',
        fechaLlegada: '2024-01-20',
        horaSalida: '10:00',
        horaLlegada: '18:30',
        duracion: '6h 30m',
        tipoVuelo: 'con_escala',
        escalas: ['BOG'],
        aeronave: {
          modelo: 'Boeing 737-800',
          capacidad: 160,
          matricula: 'HP-1234CM'
        },
        asientos: {
          total: 160,
          disponibles: 67,
          ocupados: 93,
          claseEconomica: 140,
          claseEjecutiva: 20,
          primeraClase: 0
        },
        precios: {
          economica: 520,
          ejecutiva: 1100,
          primeraClase: 0,
          moneda: 'USD'
        },
        estado: 'programado',
        retraso: 0,
        puerta: 'C12',
        terminal: 'T1',
        contacto: {
          piloto: 'Capt. Luis González',
          copiloto: '1er. Oficial Carmen Ruiz',
          tripulacion: 10
        },
        servicios: ['WiFi', 'Entretenimiento', 'Comida caliente', 'Bebidas'],
        ultimaActualizacion: '2024-01-19 18:15'
      },
      {
        id: '4',
        numero: 'AR-9012',
        aerolinea: 'Aerolíneas Argentinas',
        origen: {
          ciudad: 'Buenos Aires',
          pais: 'Argentina',
          codigo: 'AEP',
          coordenadas: { lat: -34.5584, lng: -58.4164 }
        },
        destino: {
          ciudad: 'Cusco',
          pais: 'Perú',
          codigo: 'CUZ',
          coordenadas: { lat: -13.5225, lng: -71.9682 }
        },
        fechaSalida: '2024-01-20',
        fechaLlegada: '2024-01-20',
        horaSalida: '09:45',
        horaLlegada: '12:15',
        duracion: '2h 30m',
        tipoVuelo: 'directo',
        escalas: [],
        aeronave: {
          modelo: 'Embraer E190',
          capacidad: 100,
          matricula: 'LV-ABC1'
        },
        asientos: {
          total: 100,
          disponibles: 12,
          ocupados: 88,
          claseEconomica: 90,
          claseEjecutiva: 10,
          primeraClase: 0
        },
        precios: {
          economica: 420,
          ejecutiva: 980,
          primeraClase: 0,
          moneda: 'USD'
        },
        estado: 'retrasado',
        retraso: 45,
        puerta: 'D5',
        terminal: 'T2',
        contacto: {
          piloto: 'Capt. Diego Fernández',
          copiloto: '1er. Oficial Laura Morales',
          tripulacion: 6
        },
        servicios: ['WiFi', 'Entretenimiento', 'Snacks', 'Bebidas'],
        ultimaActualizacion: '2024-01-20 10:15'
      },
      {
        id: '5',
        numero: 'JJ-3456',
        aerolinea: 'LATAM Brasil',
        origen: {
          ciudad: 'São Paulo',
          pais: 'Brasil',
          codigo: 'GRU',
          coordenadas: { lat: -23.4356, lng: -46.4731 }
        },
        destino: {
          ciudad: 'Lima',
          pais: 'Perú',
          codigo: 'LIM',
          coordenadas: { lat: -12.0219, lng: -77.1143 }
        },
        fechaSalida: '2024-01-20',
        fechaLlegada: '2024-01-20',
        horaSalida: '16:20',
        horaLlegada: '19:50',
        duracion: '4h 30m',
        tipoVuelo: 'directo',
        escalas: [],
        aeronave: {
          modelo: 'Airbus A350-900',
          capacidad: 350,
          matricula: 'PR-XMB'
        },
        asientos: {
          total: 350,
          disponibles: 89,
          ocupados: 261,
          claseEconomica: 280,
          claseEjecutiva: 50,
          primeraClase: 20
        },
        precios: {
          economica: 480,
          ejecutiva: 1300,
          primeraClase: 3000,
          moneda: 'USD'
        },
        estado: 'programado',
        retraso: 0,
        puerta: 'E20',
        terminal: 'T1',
        contacto: {
          piloto: 'Capt. Paulo Santos',
          copiloto: '1er. Oficial Ana Costa',
          tripulacion: 14
        },
        servicios: ['WiFi', 'Entretenimiento premium', 'Comida gourmet', 'Bebidas premium'],
        ultimaActualizacion: '2024-01-19 20:00'
      }
    ]
    setVuelos(vuelosData)
  }, [])

  const vuelosFiltrados = vuelos.filter(vuelo => {
    if (filtros.origen !== 'todos' && vuelo.origen.codigo !== filtros.origen) return false
    if (filtros.destino !== 'todos' && vuelo.destino.codigo !== filtros.destino) return false
    if (filtros.estado !== 'todos' && vuelo.estado !== filtros.estado) return false
    if (filtros.tipoVuelo !== 'todos' && vuelo.tipoVuelo !== filtros.tipoVuelo) return false
    return true
  })

  const handleVerDetalle = (vuelo: Vuelo) => {
    setVueloSeleccionado(vuelo)
    setModalDetalle(true)
  }



  const renderEstado = (estado: string, retraso: number) => {
    const estados = {
      programado: { color: 'bg-blue-100 text-blue-800', icon: Clock },
      en_vuelo: { color: 'bg-green-100 text-green-800', icon: Plane },
      aterrizado: { color: 'bg-gray-100 text-gray-800', icon: CheckCircle },
      cancelado: { color: 'bg-red-100 text-red-800', icon: XCircle },
      retrasado: { color: 'bg-orange-100 text-orange-800', icon: AlertCircle }
    }
    const { color, icon: Icon } = estados[estado as keyof typeof estados]
    
    return (
      <div className="flex items-center space-x-2">
        <Badge className={color}>
          <Icon className="w-3 h-3 mr-1" />
          {estado.replace('_', ' ')}
        </Badge>
        {retraso > 0 && (
          <Badge variant="outline" className="text-orange-600">
            +{retraso}m
          </Badge>
        )}
      </div>
    )
  }

  const renderTipoVuelo = (tipo: string) => {
    const tipos = {
      directo: { color: 'bg-green-100 text-green-800', text: 'Directo' },
      con_escala: { color: 'bg-yellow-100 text-yellow-800', text: 'Con Escala' },
      conexion: { color: 'bg-blue-100 text-blue-800', text: 'Conexión' }
    }
    const { color, text } = tipos[tipo as keyof typeof tipos]
    
    return (
      <Badge className={color}>
        {text}
      </Badge>
    )
  }

  const estadisticas = {
    total: vuelos.length,
    programados: vuelos.filter(v => v.estado === 'programado').length,
    enVuelo: vuelos.filter(v => v.estado === 'en_vuelo').length,
    retrasados: vuelos.filter(v => v.estado === 'retrasado').length,
    cancelados: vuelos.filter(v => v.estado === 'cancelado').length,
    directos: vuelos.filter(v => v.tipoVuelo === 'directo').length,
    conEscala: vuelos.filter(v => v.tipoVuelo === 'con_escala').length
  }

  return (
    <div className="min-h-screen bg-background p-6">
             {/* Header */}
       <div className="mb-10">
         <div className="flex items-center justify-between mb-6">
           <div>
             <h1 className="text-4xl font-bold text-foreground tracking-tight mb-2">Gestión de Vuelos</h1>
             <p className="text-lg text-muted-foreground font-medium">Registro de vuelos obtenidos mediante el API de Aerolineas</p>
           </div>
           <div className="flex items-center space-x-3">
             <Button variant="outline" size="lg">
               <Filter className="w-5 h-5 mr-2" />
               Filtros
             </Button>
             <Button size="lg">
               <Search className="w-5 h-5 mr-2" />
               Buscar
             </Button>
           </div>
         </div>

                 {/* Estadísticas */}
         <div className="grid grid-cols-1 md:grid-cols-7 gap-5 mb-8">
           <Card className="hover:shadow-lg transition-all duration-300">
             <CardContent className="p-5">
               <div className="flex items-center space-x-3">
                 <div className="p-3 bg-blue-100 rounded-xl">
                   <Plane className="w-6 h-6 text-blue-600" />
                 </div>
                 <div>
                   <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Total</p>
                   <p className="text-3xl font-bold text-foreground">{estadisticas.total}</p>
                 </div>
               </div>
             </CardContent>
           </Card>
           
           <Card className="hover:shadow-lg transition-all duration-300">
             <CardContent className="p-5">
               <div className="flex items-center space-x-3">
                 <div className="p-3 bg-blue-100 rounded-xl">
                   <Clock className="w-6 h-6 text-blue-600" />
                 </div>
                 <div>
                   <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Programados</p>
                   <p className="text-3xl font-bold text-blue-600">{estadisticas.programados}</p>
                 </div>
               </div>
             </CardContent>
           </Card>
           
           <Card className="hover:shadow-lg transition-all duration-300">
             <CardContent className="p-5">
               <div className="flex items-center space-x-3">
                 <div className="p-3 bg-green-100 rounded-xl">
                   <Plane className="w-6 h-6 text-green-600" />
                 </div>
                 <div>
                   <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">En Vuelo</p>
                   <p className="text-3xl font-bold text-green-600">{estadisticas.enVuelo}</p>
                 </div>
               </div>
             </CardContent>
           </Card>
           
           <Card className="hover:shadow-lg transition-all duration-300">
             <CardContent className="p-5">
               <div className="flex items-center space-x-3">
                 <div className="p-3 bg-orange-100 rounded-xl">
                   <AlertCircle className="w-6 h-6 text-orange-600" />
                 </div>
                 <div>
                   <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Retrasados</p>
                   <p className="text-3xl font-bold text-orange-600">{estadisticas.retrasados}</p>
                 </div>
               </div>
             </CardContent>
           </Card>

           <Card className="hover:shadow-lg transition-all duration-300">
             <CardContent className="p-5">
               <div className="flex items-center space-x-3">
                 <div className="p-3 bg-red-100 rounded-xl">
                   <XCircle className="w-6 h-6 text-red-600" />
                 </div>
                 <div>
                   <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Cancelados</p>
                   <p className="text-3xl font-bold text-red-600">{estadisticas.cancelados}</p>
                 </div>
               </div>
             </CardContent>
           </Card>

           <Card className="hover:shadow-lg transition-all duration-300">
             <CardContent className="p-5">
               <div className="flex items-center space-x-3">
                 <div className="p-3 bg-green-100 rounded-xl">
                   <CheckCircle className="w-6 h-6 text-green-600" />
                 </div>
                 <div>
                   <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Directos</p>
                   <p className="text-3xl font-bold text-green-600">{estadisticas.directos}</p>
                 </div>
               </div>
             </CardContent>
           </Card>

           <Card className="hover:shadow-lg transition-all duration-300">
             <CardContent className="p-5">
               <div className="flex items-center space-x-3">
                 <div className="p-3 bg-yellow-100 rounded-xl">
                   <Clock className="w-5 h-5 text-yellow-600" />
                 </div>
                 <div>
                   <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Con Escala</p>
                   <p className="text-3xl font-bold text-yellow-600">{estadisticas.conEscala}</p>
                 </div>
               </div>
             </CardContent>
           </Card>
         </div>
      </div>

             {/* Contenido Principal */}
       <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* Sidebar de Filtros */}
         <div className="lg:col-span-1">
           <Card className="sticky top-6 shadow-lg border-0">
             <CardHeader className="pb-3 border-b border-border/50">
               <CardTitle className="flex items-center justify-between">
                 <div className="flex items-center space-x-2">
                   <div className="p-1.5 bg-primary/10 rounded-md">
                     <Filter className="w-4 h-4 text-primary" />
                   </div>
                   <span className="text-lg font-bold text-foreground">Filtros</span>
                 </div>
                 <Button
                   variant="ghost"
                   size="sm"
                   onClick={() => setFiltros({
                     origen: 'todos',
                     destino: 'todos',
                     estado: 'todos',
                     tipoVuelo: 'todos',
                     fecha: 'todos'
                   })}
                   className="text-xs font-medium text-primary hover:text-primary/80 hover:bg-primary/10 px-2 py-1 rounded-md"
                 >
                   Limpiar
                 </Button>
               </CardTitle>
             </CardHeader>
             <CardContent className="p-4 space-y-4">
               {/* Origen */}
               <div>
                 <h3 className="font-semibold text-xs text-foreground mb-2 flex items-center">
                   <div className="p-1 bg-blue-100 rounded mr-2">
                     <MapPin className="w-3 h-3 text-blue-600" />
                   </div>
                   Origen
                 </h3>
                 <div className="grid grid-cols-2 gap-2">
                   {['todos', 'LIM', 'BOG', 'PTY', 'AEP', 'GRU'].map((origen) => (
                     <button
                       key={origen}
                       onClick={() => setFiltros({...filtros, origen})}
                       className={`px-2 py-1.5 rounded-md text-xs font-medium transition-all duration-200 border ${
                         filtros.origen === origen
                           ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                           : 'bg-white text-muted-foreground border-border hover:border-primary/50 hover:bg-primary/5'
                       }`}
                     >
                       {origen === 'todos' ? 'Todos' : origen}
                     </button>
                   ))}
                 </div>
               </div>

               {/* Destino */}
               <div>
                 <h3 className="font-semibold text-xs text-foreground mb-2 flex items-center">
                   <div className="p-1 bg-green-100 rounded mr-2">
                     <MapPin className="w-3 h-3 text-green-600" />
                   </div>
                   Destino
                 </h3>
                 <div className="grid grid-cols-2 gap-2">
                   {['todos', 'EZE', 'LIM', 'SCL', 'CUZ'].map((destino) => (
                     <button
                       key={destino}
                       onClick={() => setFiltros({...filtros, destino})}
                       className={`px-2 py-1.5 rounded-md text-xs font-medium transition-all duration-200 border ${
                         filtros.destino === destino
                           ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                           : 'bg-white text-muted-foreground border-border hover:border-primary/50 hover:bg-primary/5'
                       }`}
                     >
                       {destino === 'todos' ? 'Todos' : destino}
                     </button>
                   ))}
                 </div>
               </div>

               {/* Estado */}
               <div>
                 <h3 className="font-semibold text-xs text-foreground mb-2 flex items-center">
                   <div className="p-1 bg-orange-100 rounded mr-2">
                     <Clock className="w-3 h-3 text-orange-600" />
                   </div>
                   Estado
                 </h3>
                 <div className="space-y-2">
                   {[
                     { value: 'todos', label: 'Todos', icon: CheckCircle, color: 'bg-muted text-muted-foreground' },
                     { value: 'programado', label: 'Programado', icon: Clock, color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
                     { value: 'en_vuelo', label: 'En Vuelo', icon: Plane, color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
                     { value: 'aterrizado', label: 'Aterrizado', icon: CheckCircle, color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200' },
                     { value: 'cancelado', label: 'Cancelado', icon: XCircle, color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
                     { value: 'retrasado', label: 'Retrasado', icon: AlertCircle, color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' }
                   ].map(({ value, label, icon: Icon, color }) => (
                     <button
                       key={value}
                       onClick={() => setFiltros({...filtros, estado: value})}
                       className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded-md text-xs font-medium transition-all duration-200 border ${
                         filtros.estado === value
                           ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                           : `bg-white border-border hover:border-primary/50 hover:bg-primary/5 ${color}`
                       }`}
                     >
                       <Icon className="w-3 h-3" />
                       <span>{label}</span>
                     </button>
                   ))}
                 </div>
               </div>

               {/* Tipo de Vuelo */}
               <div>
                 <h3 className="font-semibold text-xs text-foreground mb-2 flex items-center">
                   <div className="p-1 bg-purple-100 rounded mr-2">
                     <Plane className="w-3 h-3 text-purple-600" />
                   </div>
                   Tipo
                 </h3>
                 <div className="space-y-2">
                   {[
                     { value: 'todos', label: 'Todos', color: 'bg-muted text-muted-foreground' },
                     { value: 'directo', label: 'Directo', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
                     { value: 'con_escala', label: 'Con Escala', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
                     { value: 'conexion', label: 'Conexión', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' }
                   ].map(({ value, label, color }) => (
                     <button
                       key={value}
                       onClick={() => setFiltros({...filtros, tipoVuelo: value})}
                       className={`w-full px-2 py-1.5 rounded-md text-xs font-medium transition-all duration-200 border ${
                         filtros.tipoVuelo === value
                           ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                           : `bg-white border-border hover:border-primary/50 hover:bg-primary/5 ${color}`
                       }`}
                     >
                       {label}
                     </button>
                   ))}
                 </div>
               </div>

               {/* Resumen de Filtros Activos */}
               {(filtros.origen !== 'todos' || filtros.destino !== 'todos' || filtros.estado !== 'todos' || filtros.tipoVuelo !== 'todos') && (
                 <div className="pt-3 border-t border-border/50">
                   <div className="flex items-center justify-between mb-2">
                     <span className="text-xs font-bold text-foreground">Filtros Activos:</span>
                     <span className="text-xs text-muted-foreground font-medium bg-muted px-2 py-0.5 rounded-full">
                       {vuelosFiltrados.length} de {vuelos.length} vuelos
                     </span>
                   </div>
                   <div className="flex flex-wrap gap-1">
                     {filtros.origen !== 'todos' && (
                       <Badge variant="secondary" className="text-xs font-medium bg-blue-100 text-blue-800 border-blue-200">
                         Origen: {filtros.origen}
                       </Badge>
                     )}
                     {filtros.destino !== 'todos' && (
                       <Badge variant="secondary" className="text-xs font-medium bg-green-100 text-green-800 border-green-200">
                         Destino: {filtros.destino}
                       </Badge>
                     )}
                     {filtros.estado !== 'todos' && (
                       <Badge variant="secondary" className="text-xs font-medium bg-orange-100 text-orange-800 border-orange-200">
                         Estado: {filtros.estado.replace('_', ' ')}
                       </Badge>
                     )}
                     {filtros.tipoVuelo !== 'todos' && (
                       <Badge variant="secondary" className="text-xs font-medium bg-purple-100 text-purple-800 border-purple-200">
                         Tipo: {filtros.tipoVuelo.replace('_', ' ')}
                       </Badge>
                       )}
                   </div>
                 </div>
               )}

               {/* Botón Aplicar Filtros */}
               <div className="pt-2">
                 <Button 
                   className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 rounded-md shadow-sm text-xs"
                   size="sm"
                 >
                   <Filter className="w-3 h-3 mr-1" />
                   Aplicar ({vuelosFiltrados.length})
                 </Button>
               </div>
             </CardContent>
           </Card>
         </div>

                 {/* Lista de Vuelos */}
         <div className="lg:col-span-3">
           <Card>
             <CardHeader className="pb-4">
               <CardTitle className="text-2xl font-bold">Vuelos ({vuelosFiltrados.length})</CardTitle>
             </CardHeader>
             <CardContent>
               <div className="space-y-6">
                 {vuelosFiltrados.map((vuelo) => (
                   <div key={vuelo.id} className="border rounded-xl p-6 hover:shadow-lg transition-all duration-300 bg-card">
                     <div className="flex items-start space-x-6">
                       {/* Información del Vuelo */}
                       <div className="flex-1 space-y-4">
                         <div className="flex items-start justify-between">
                           <div>
                             <h3 className="font-bold text-foreground text-xl mb-2">
                               {vuelo.numero} - {vuelo.aerolinea}
                             </h3>
                             <div className="flex items-center space-x-4">
                               {renderEstado(vuelo.estado, vuelo.retraso)}
                               {renderTipoVuelo(vuelo.tipoVuelo)}
                             </div>
                           </div>
                         </div>

                                                 {/* Ruta y Horarios */}
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="space-y-3">
                             <div className="flex items-center justify-between">
                               <div className="text-center">
                                 <div className="text-2xl font-bold text-primary mb-1">{vuelo.origen.codigo}</div>
                                 <div className="text-base font-medium text-muted-foreground mb-1">{vuelo.origen.ciudad}</div>
                                 <div className="text-sm text-muted-foreground font-semibold">{vuelo.horaSalida}</div>
                               </div>
                               <div className="flex-1 mx-6">
                                 <div className="flex items-center justify-center">
                                   <div className="w-full h-1 bg-muted relative">
                                     <Plane className="w-5 h-5 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                                   </div>
                                 </div>
                                 <div className="text-center text-sm font-semibold text-muted-foreground mt-2">
                                   {vuelo.duracion}
                                 </div>
                               </div>
                               <div className="text-center">
                                 <div className="text-2xl font-bold text-primary mb-1">{vuelo.destino.codigo}</div>
                                 <div className="text-base font-medium text-muted-foreground mb-1">{vuelo.destino.ciudad}</div>
                                 <div className="text-sm text-muted-foreground font-semibold">{vuelo.horaLlegada}</div>
                               </div>
                             </div>
                           </div>

                           <div className="space-y-3">
                             <div className="flex items-center space-x-3 text-base text-muted-foreground">
                               <MapPin className="w-5 h-5" />
                               <span className="font-medium">Puerta: {vuelo.puerta} | Terminal: {vuelo.terminal}</span>
                             </div>
                             <div className="flex items-center space-x-4 text-base text-muted-foreground">
                               <div className="flex items-center space-x-2">
                                 <Users className="w-5 h-5" />
                                 <span className="font-medium">{vuelo.asientos.disponibles} asientos disponibles</span>
                               </div>
                             </div>
                             <div className="flex items-center space-x-3">
                               <span className="text-base text-muted-foreground font-medium">Precios desde:</span>
                               <span className="text-lg font-bold text-foreground">
                                 {vuelo.precios.moneda} {vuelo.precios.economica}
                               </span>
                             </div>
                           </div>
                         </div>

                                                 {/* Aeronave y Servicios */}
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="space-y-3">
                             <div className="text-base text-muted-foreground">
                               <span className="font-bold text-foreground">Aeronave:</span> {vuelo.aeronave.modelo}
                             </div>
                             <div className="text-base text-muted-foreground">
                               <span className="font-bold text-foreground">Matrícula:</span> {vuelo.aeronave.matricula}
                             </div>
                           </div>

                           <div className="space-y-3">
                             <div className="flex flex-wrap gap-2">
                               {vuelo.servicios.slice(0, 3).map((servicio, index) => (
                                 <Badge key={index} variant="secondary" className="text-sm font-medium px-3 py-1">
                                   {servicio}
                                 </Badge>
                               ))}
                               {vuelo.servicios.length > 3 && (
                                 <Badge variant="outline" className="text-sm font-medium px-3 py-1">
                                   +{vuelo.servicios.length - 3} más
                                 </Badge>
                               )}
                             </div>
                             <div className="text-sm text-muted-foreground font-medium">
                               Última actualización: {vuelo.ultimaActualizacion}
                             </div>
                           </div>
                         </div>

                         {/* Acciones */}
                         <div className="flex items-center justify-between pt-4 border-t border-border">
                           <div className="flex items-center space-x-3">
                             <Button
                               variant="outline"
                               size="lg"
                               onClick={() => handleVerDetalle(vuelo)}
                               className="font-semibold"
                             >
                               <Eye className="w-5 h-5 mr-2" />
                               Ver Detalle
                             </Button>
                           </div>
                         </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

            {/* Modal de Detalle */}
      {modalDetalle && vueloSeleccionado && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6">
          <div className="bg-background rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col border border-border">
            {/* Header */}
            <div className="bg-gradient-to-r from-muted to-muted/50 border-b border-border px-8 py-6 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-light text-foreground tracking-tight">Detalle del Vuelo</h2>
                  <p className="text-muted-foreground mt-1 font-medium">{vueloSeleccionado.numero} • {vueloSeleccionado.aerolinea}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setModalDetalle(false)}
                  className="hover:bg-muted transition-colors"
                >
                  <XCircle className="w-6 h-6 text-muted-foreground" />
                </Button>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-8 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                {/* Columna 1: Información General */}
                <div className="space-y-8">
                  {/* Información del Vuelo */}
                  <div className="bg-muted/30 rounded-lg p-6 border border-border">
                    <h3 className="text-xl font-semibold text-foreground mb-6 pb-3 border-b border-border">
                      Información del Vuelo
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Número de Vuelo</span>
                        <span className="text-lg font-semibold text-foreground">{vueloSeleccionado.numero}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Aerolínea</span>
                        <span className="text-lg font-semibold text-foreground">{vueloSeleccionado.aerolinea}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Fecha</span>
                        <span className="text-lg font-semibold text-foreground">{vueloSeleccionado.fechaSalida}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Estado</span>
                        <div className="flex items-center space-x-2">
                          {renderEstado(vueloSeleccionado.estado, vueloSeleccionado.retraso)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ruta del Vuelo */}
                  <div className="bg-muted/30 rounded-lg p-6 border border-border">
                    <h4 className="text-xl font-semibold text-foreground mb-6 pb-3 border-b border-border">
                      Ruta del Vuelo
                    </h4>
                    <div className="space-y-6">
                      {/* Origen */}
                      <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border shadow-sm">
                        <div>
                          <div className="text-2xl font-bold text-foreground">{vueloSeleccionado.origen.codigo}</div>
                          <div className="text-sm text-muted-foreground font-medium">{vueloSeleccionado.origen.ciudad}, {vueloSeleccionado.origen.pais}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-foreground">{vueloSeleccionado.horaSalida}</div>
                          <div className="text-xs text-muted-foreground uppercase tracking-wide">Salida</div>
                        </div>
                      </div>
                       
                      {/* Duración */}
                      <div className="text-center">
                        <div className="inline-flex items-center space-x-3 text-muted-foreground">
                          <div className="w-16 h-px bg-border"></div>
                          <span className="text-sm font-medium uppercase tracking-wide">{vueloSeleccionado.duracion}</span>
                          <div className="w-16 h-px bg-border"></div>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">
                          {vueloSeleccionado.tipoVuelo.replace('_', ' ')}
                        </div>
                      </div>
                       
                      {/* Destino */}
                      <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border shadow-sm">
                        <div>
                          <div className="text-2xl font-bold text-foreground">{vueloSeleccionado.destino.codigo}</div>
                          <div className="text-sm text-muted-foreground font-medium">{vueloSeleccionado.destino.ciudad}, {vueloSeleccionado.destino.pais}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-foreground">{vueloSeleccionado.horaLlegada}</div>
                          <div className="text-xs text-muted-foreground uppercase tracking-wide">Llegada</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Información de la Aeronave */}
                  <div className="bg-muted/30 rounded-lg p-6 border border-border">
                    <h4 className="text-xl font-semibold text-foreground mb-6 pb-3 border-b border-border">
                      Información de la Aeronave
                    </h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Modelo</span>
                        <span className="text-lg font-semibold text-foreground">{vueloSeleccionado.aeronave.modelo}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Matrícula</span>
                        <span className="text-lg font-semibold text-foreground font-mono">{vueloSeleccionado.aeronave.matricula}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Capacidad</span>
                        <span className="text-lg font-semibold text-foreground">{vueloSeleccionado.aeronave.capacidad} pasajeros</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Columna 2: Precios y Asientos */}
                <div className="space-y-8">
                  {/* Tarifas */}
                  <div className="bg-muted/30 rounded-lg p-6 border border-border">
                    <h4 className="text-xl font-semibold text-foreground mb-6 pb-3 border-b border-border">
                      Tarifas
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-4 bg-card rounded-lg border border-border">
                        <span className="text-sm font-medium text-card-foreground">Clase Económica</span>
                        <span className="text-xl font-bold text-foreground">{vueloSeleccionado.precios.moneda} {vueloSeleccionado.precios.economica}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-card rounded-lg border border-border">
                        <span className="text-sm font-medium text-card-foreground">Clase Ejecutiva</span>
                        <span className="text-xl font-bold text-foreground">{vueloSeleccionado.precios.moneda} {vueloSeleccionado.precios.ejecutiva}</span>
                      </div>
                      {vueloSeleccionado.precios.primeraClase > 0 && (
                        <div className="flex justify-between items-center p-4 bg-card rounded-lg border border-border">
                          <span className="text-sm font-medium text-card-foreground">Primera Clase</span>
                          <span className="text-xl font-bold text-foreground">{vueloSeleccionado.precios.moneda} {vueloSeleccionado.precios.primeraClase}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Estado de Asientos */}
                  <div className="bg-muted/30 rounded-lg p-6 border border-border">
                    <h4 className="text-xl font-semibold text-foreground mb-6 pb-3 border-b border-border">
                      Estado de Asientos
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-card rounded-lg border border-border shadow-sm">
                        <div className="text-3xl font-bold text-foreground">{vueloSeleccionado.asientos.disponibles}</div>
                        <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Disponibles</div>
                      </div>
                      <div className="text-center p-4 bg-card rounded-lg border border-border shadow-sm">
                        <div className="text-3xl font-bold text-foreground">{vueloSeleccionado.asientos.ocupados}</div>
                        <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Ocupados</div>
                      </div>
                      <div className="text-center p-4 bg-card rounded-lg border border-border shadow-sm">
                        <div className="text-3xl font-bold text-foreground">{vueloSeleccionado.asientos.claseEjecutiva}</div>
                        <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Ejecutiva</div>
                      </div>
                      <div className="text-center p-4 bg-card rounded-lg border border-border shadow-sm">
                        <div className="text-3xl font-bold text-foreground">{vueloSeleccionado.asientos.total}</div>
                        <div className="text-sm text-muted-foreground uppercase tracking-wide">Total</div>
                      </div>
                    </div>
                  </div>

                  {/* Calendario del Vuelo */}
                  <div className="bg-muted/30 rounded-lg p-6 border border-border">
                    <h4 className="text-xl font-semibold text-foreground mb-6 pb-3 border-b border-border">
                      Calendario del Vuelo
                    </h4>
                    <div className="space-y-4">
                      {/* Fechas principales */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-card rounded-lg border border-border shadow-sm">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-foreground">
                              {new Date(vueloSeleccionado.fechaSalida).getDate()}
                            </div>
                            <div className="text-sm text-muted-foreground font-medium">
                              {new Date(vueloSeleccionado.fechaSalida).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}
                            </div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wide mt-1">
                              Salida
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-card rounded-lg border border-border shadow-sm">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-foreground">
                              {new Date(vueloSeleccionado.fechaLlegada).getDate()}
                            </div>
                            <div className="text-sm text-muted-foreground font-medium">
                              {new Date(vueloSeleccionado.fechaLlegada).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}
                            </div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wide mt-1">
                              Llegada
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Información adicional de fechas */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 px-3 bg-card rounded-lg border border-border">
                          <span className="text-sm font-medium text-card-foreground">Duración del viaje</span>
                          <span className="text-sm font-semibold text-foreground">{vueloSeleccionado.duracion}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 px-3 bg-card rounded-lg border border-border">
                          <span className="text-sm font-medium text-card-foreground">Última actualización</span>
                          <span className="text-sm font-semibold text-foreground">
                            {new Date(vueloSeleccionado.ultimaActualizacion).toLocaleDateString('es-ES', { 
                              day: '2-digit', 
                              month: '2-digit', 
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tripulación */}
                  <div className="bg-muted/30 rounded-lg p-6 border border-border">
                    <h4 className="text-xl font-semibold text-foreground mb-6 pb-3 border-b border-border">
                      Tripulación
                    </h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Piloto</span>
                        <span className="text-lg font-semibold text-foreground">{vueloSeleccionado.contacto.piloto}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Copiloto</span>
                        <span className="text-lg font-semibold text-foreground">{vueloSeleccionado.contacto.copiloto}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Tripulación</span>
                        <span className="text-lg font-semibold text-foreground">{vueloSeleccionado.contacto.tripulacion} personas</span>
                      </div>
                    </div>
                  </div>

                  {/* Servicios Incluidos */}
                  <div className="bg-muted/30 rounded-lg p-6 border border-border">
                    <h4 className="text-xl font-semibold text-foreground mb-6 pb-3 border-b border-border">
                      Servicios Incluidos
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      {vueloSeleccionado.servicios.map((servicio, index) => (
                        <div key={index} className="flex items-center space-x-3 text-sm">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                          <span className="text-card-foreground font-medium">{servicio}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  )
}
