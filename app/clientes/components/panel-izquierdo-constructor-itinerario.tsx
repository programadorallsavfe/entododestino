import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { 
  MapPin, 
  Calendar, 
  Users, 
  Plane, 
  Hotel, 
  Car, 
  Plus, 
  Trash2,
  Star,
  Clock,
  Globe,
  Search
} from 'lucide-react'

export interface Destination {
  id: string
  name: string
  lat: number
  lng: number
  type: 'start' | 'destination' | 'end'
  nights?: number
  transportIncluded?: boolean
  accommodationIncluded?: boolean
  image?: string
  description?: string
}

interface PanelIzquierdoConstructorItinerarioProps {
  destinations: Destination[]
  newDestination: string
  setNewDestination: (value: string) => void
  addDestination: () => void
  removeDestination: (id: string) => void
  updateDestination: (id: string, updates: Partial<Destination>) => void
  finishItinerary: () => void
}

export const PanelIzquierdoConstructorItinerario = ({
  destinations,
  newDestination,
  setNewDestination,
  addDestination,
  removeDestination,
  updateDestination,
  finishItinerary
}: PanelIzquierdoConstructorItinerarioProps) => {
  const router = useRouter()

  const handleFinishItinerary = () => {
    // Guardar los datos del itinerario en localStorage o estado global
    const itinerarioData = {
      destinations,
      fechaInicio: '23 Septiembre 2025',
      fechaFin: '29 Septiembre 2025',
      duracion: 7,
      personas: 2,
      serviciosIncluidos: ['Hoteles', 'Tours', 'Visitas guiadas', 'Traslados', 'Alimentación'],
      precioTotal: 2899.99,
      precioDescuento: 2599.99
    }
    
    localStorage.setItem('itinerarioConfigurado', JSON.stringify(itinerarioData))
    
    // Redirigir a la página de resumen
    router.push('/clientes/resumen-itinerario')
  }

  return (
    <>
     {/* Panel izquierdo - Constructor de itinerario */}
     <div className="h-full space-y-4">
       {/* Header compacto con imagen de fondo */}
       <Card className="relative overflow-hidden border-0 shadow-md">
         <div className="absolute inset-0">
           <img 
             src="/assets/banner.jpg" 
             alt="Viaje por Sudamérica" 
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/75 to-secondary/85" />
         </div>
         <CardHeader className="relative z-10 text-white p-4">
           <div className="flex items-center space-x-3">
             <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
               <Globe className="w-5 h-5 text-white" />
             </div>
             <div className="flex-1">
               
               <div className="flex items-center space-x-3 text-white/90 text-xs">
                 <div className="flex items-center space-x-1">
                   <Calendar className="w-3 h-3" />
                   <span>23 sept - 29 sept 2025</span>
                 </div>
                 <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                 <div className="flex items-center space-x-1">
                   <Clock className="w-3 h-3" />
                   <span>6 Noches</span>
                 </div>
                 <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                 <div className="flex items-center space-x-1">
                   <Users className="w-3 h-3" />
                   <span>2 Adultos</span>
                 </div>
               </div>
             </div>
           </div>
         </CardHeader>
       </Card>

       {/* Barra de búsqueda y agregar destino - INNOVADORA */}
       <Card className="border border-border bg-card shadow-sm">
         <CardContent className="p-4">
           <div className="flex items-center space-x-3">
             <div className="flex-1 relative">
               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
               <Select value={newDestination} onValueChange={setNewDestination}>
                 <SelectTrigger className="w-full h-10 pl-10 border-border bg-background text-foreground hover:border-primary focus:border-primary">
                   <SelectValue placeholder="Buscar y seleccionar destino..." />
                 </SelectTrigger>
                 <SelectContent className="border-border bg-background">
                   <SelectItem value="Río de Janeiro">🇧🇷 Río de Janeiro, Brasil</SelectItem>
                   <SelectItem value="São Paulo">🇧🇷 São Paulo, Brasil</SelectItem>
                   <SelectItem value="Buenos Aires">🇦🇷 Buenos Aires, Argentina</SelectItem>
                   <SelectItem value="Santiago">🇨🇱 Santiago, Chile</SelectItem>
                   <SelectItem value="Bogotá">🇨🇴 Bogotá, Colombia</SelectItem>
                   <SelectItem value="Quito">🇪🇨 Quito, Ecuador</SelectItem>
                   <SelectItem value="La Paz">🇧🇴 La Paz, Bolivia</SelectItem>
                   <SelectItem value="Asunción">🇵🇾 Asunción, Paraguay</SelectItem>
                   <SelectItem value="Montevideo">🇺🇾 Montevideo, Uruguay</SelectItem>
                   <SelectItem value="Caracas">🇻🇪 Caracas, Venezuela</SelectItem>
                 </SelectContent>
               </Select>
             </div>
             <Button 
               onClick={addDestination} 
               className="h-10 px-6 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm flex-shrink-0"
               disabled={!newDestination}
             >
               <Plus className="w-4 h-4 mr-2" />
               Agregar
             </Button>
           </div>
           
           {/* Indicador visual de destinos */}
           <div className="mt-3 flex items-center justify-between">
             <div className="flex items-center space-x-2">
               <div className="w-2 h-2 bg-primary rounded-full"></div>
               <span className="text-xs text-muted-foreground">
                 {destinations.length} destino{destinations.length !== 1 ? 's' : ''} en el itinerario
               </span>
             </div>
             {destinations.length >= 2 && (
               <Badge className="bg-green-500 text-white text-xs">
                 Listo para continuar
               </Badge>
             )}
           </div>
         </CardContent>
       </Card>

       {/* Destinos existentes - Layout compacto */}
       <div className="space-y-3 flex-1 overflow-y-auto">
         {destinations.length === 0 ? (
           <Card className="border border-dashed border-border bg-muted/20">
             <CardContent className="p-8 text-center">
               <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                 <MapPin className="w-8 h-8 text-muted-foreground" />
               </div>
               <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                 No hay destinos agregados
               </h3>
               <p className="text-sm text-muted-foreground">
                 Usa la barra de búsqueda arriba para agregar tu primer destino
               </p>
             </CardContent>
           </Card>
         ) : (
           destinations.map((dest, index) => (
             <Card key={dest.id} className="group hover:shadow-md transition-all duration-200 border border-border bg-card">
               <CardContent className="p-3">
                 <div className="flex items-center space-x-3">
                   {/* Imagen del destino - más pequeña */}
                   <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                     <img 
                       src="/assets/banner.jpg" 
                       alt={dest.name} 
                       className="w-full h-full object-cover"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                     
                     {/* Badge del tipo */}
                     <div className="absolute top-1 left-1">
                       {dest.type === 'start' && (
                         <Badge className="bg-green-500 text-white border-0 text-xs px-1.5 py-0.5">
                           <Star className="w-2.5 h-2.5 mr-1" />
                           Inicio
                         </Badge>
                       )}
                       {dest.type === 'end' && (
                         <Badge className="bg-red-500 text-white border-0 text-xs px-1.5 py-0.5">
                           <MapPin className="w-2.5 h-2.5 mr-1" />
                           Fin
                         </Badge>
                       )}
                       {dest.type === 'destination' && (
                         <Badge className="bg-primary text-primary-foreground border-0 text-xs px-1.5 py-0.5">
                           {destinations.filter(d => d.type === 'destination').findIndex(d => d.id === dest.id) + 1}
                         </Badge>
                       )}
                     </div>
                   </div>

                   {/* Información del destino - más compacta */}
                   <div className="flex-1 min-w-0">
                     <div className="flex items-start justify-between mb-2">
                       <div>
                         <h3 className="text-base font-semibold text-card-foreground mb-0.5">{dest.name}</h3>
                         <p className="text-xs text-muted-foreground">
                           Destino {dest.type === 'start' ? 'de inicio' : dest.type === 'end' ? 'final' : `#${destinations.filter(d => d.type === 'destination').findIndex(d => d.id === dest.id) + 1}`}
                         </p>
                       </div>
                       {dest.type === 'destination' && (
                         <Button
                           variant="ghost"
                           size="sm"
                           onClick={() => removeDestination(dest.id)}
                           className="text-destructive hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 p-0"
                         >
                           <Trash2 className="w-3.5 h-3.5" />
                         </Button>
                       )}
                     </div>
                     
                     {dest.type === 'destination' && (
                       <div className="space-y-2">
                         {/* Alojamiento y Transporte en línea - FIXED para dark mode */}
                         <div className="flex items-center space-x-3">
                           <div className="flex items-center space-x-2 bg-accent/20 dark:bg-accent/10 rounded-md px-2 py-1 border border-accent/30 dark:border-accent/20">
                             <Checkbox
                               id={`accommodation-${dest.id}`}
                               checked={dest.accommodationIncluded}
                               onCheckedChange={(checked) => updateDestination(dest.id, { accommodationIncluded: checked as boolean })}
                               className="text-primary"
                             />
                             <Label htmlFor={`accommodation-${dest.id}`} className="flex items-center space-x-1 cursor-pointer text-xs">
                               <Hotel className="w-3 h-3 text-primary" />
                               <span className="text-foreground dark:text-white font-medium">Alojamiento</span>
                             </Label>
                             <Input
                               type="number"
                               value={dest.nights || 1}
                               onChange={(e) => updateDestination(dest.id, { nights: parseInt(e.target.value) })}
                               className="w-12 h-6 border-accent/30 dark:border-accent/20 bg-background text-foreground dark:text-white text-center text-xs"
                               min="1"
                               max="30"
                             />
                             <span className="text-xs text-foreground dark:text-white">noches</span>
                           </div>
                           
                           <div className="flex items-center space-x-2 bg-secondary/20 dark:bg-secondary/10 rounded-md px-2 py-1 border border-secondary/30 dark:border-secondary/20">
                             <Checkbox
                               id={`transport-${dest.id}`}
                               checked={dest.transportIncluded}
                               onCheckedChange={(checked) => updateDestination(dest.id, { transportIncluded: checked as boolean })}
                               className="text-secondary"
                             />
                             <Label htmlFor={`transport-${dest.id}`} className="flex items-center space-x-1 cursor-pointer text-xs">
                               <Car className="w-3 h-3 text-secondary" />
                               <span className="text-foreground dark:text-white font-medium">Transporte</span>
                             </Label>
                           </div>
                         </div>
                       </div>
                     )}
                   </div>
                 </div>
               </CardContent>
             </Card>
           ))
         )}
       </div>

       {/* Botón continuar - siempre visible */}
       <Button 
         className="w-full h-12 bg-primary text-primary-foreground text-base font-semibold hover:bg-primary/90 shadow-md transition-all duration-200 rounded-lg"
         onClick={handleFinishItinerary}
         disabled={destinations.length < 2}
       >
         <Plane className="w-4 h-4 mr-2" />
         Continuar con el Itinerario
       </Button>
     </div>
    </>
  )
}

export default PanelIzquierdoConstructorItinerario;     