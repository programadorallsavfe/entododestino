import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export  interface Destination {
  id: string
  name: string
  lat: number
  lng: number
  type: 'start' | 'destination' | 'end'
  nights?: number
  transportIncluded?: boolean
  accommodationIncluded?: boolean
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
    return (
        <>
         {/* Panel izquierdo - Constructor de itinerario */}
         <div className="h-full space-y-4">
         <Card className="h-full">
           <CardHeader>
             <CardTitle>Cree el itinerario de su viaje</CardTitle>
             <div className="text-sm text-muted-foreground">
               23 sept 2025 - 29 sept 2025 • 6 Noches • 2 Adultos
             </div>
           </CardHeader>
           <CardContent className="space-y-4 flex-1 overflow-y-auto">
             
             {/* Destinos existentes */}
             {destinations.map((dest, index) => (
                 <Card key={dest.id} className="p-4 border-border">
                 <div className="flex items-center justify-between mb-2">
                   <div className="flex items-center space-x-2">
                     {dest.type === 'start' && (
                         <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">Inicio</span>
                        )}
                     {dest.type === 'end' && (
                         <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">Fin</span>
                        )}
                     {dest.type === 'destination' && (
                         <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                         {destinations.filter(d => d.type === 'destination').findIndex(d => d.id === dest.id) + 1}
                       </span>
                     )}
                     <span className="font-medium text-foreground">{dest.name}</span>
                   </div>
                   {dest.type === 'destination' && (
                       <Button
                       variant="outline"
                       size="sm"
                       onClick={() => removeDestination(dest.id)}
                       className="border-border hover:bg-accent hover:text-accent-foreground"
                       >
                       Eliminar
                     </Button>
                   )}
                 </div>
                 
                 {dest.type === 'destination' && (
                     <div className="space-y-2">
                     <div className="flex items-center space-x-2">
                       <input
                         type="checkbox"
                         checked={dest.accommodationIncluded}
                         onChange={(e) => updateDestination(dest.id, { accommodationIncluded: e.target.checked })}
                         className="rounded border-border text-primary focus:ring-ring"
                         />
                       <span className="text-sm text-foreground">Alojamiento incluido</span>
                       <Input
                         type="number"
                         value={dest.nights || 1}
                         onChange={(e) => updateDestination(dest.id, { nights: parseInt(e.target.value) })}
                         className="w-16 h-8 border-border bg-background text-foreground"
                         min="1"
                         />
                       <span className="text-sm text-foreground">noches</span>
                     </div>
                     
                     <div className="flex items-center space-x-2">
                       <input
                         type="checkbox"
                         checked={dest.transportIncluded}
                         onChange={(e) => updateDestination(dest.id, { transportIncluded: e.target.checked })}
                         className="rounded border-border text-primary focus:ring-ring"
                         />
                       <span className="text-sm text-foreground">Transporte incluido</span>
                     </div>
                   </div>
                 )}
               </Card>
             ))}

             {/* Agregar nuevo destino */}
             <Card className="p-4 border-border">
               <CardTitle className="text-lg mb-3 text-foreground">¿Tu próximo destino?</CardTitle>
               <div className="flex space-x-2">
                 <Select value={newDestination} onValueChange={setNewDestination}>
                   <SelectTrigger className="w-full border-border bg-background text-foreground">
                     <SelectValue placeholder="Selecciona un destino" />
                   </SelectTrigger>
                   <SelectContent className="border-border bg-background">
                     <SelectItem value="Río de Janeiro">Río de Janeiro, Brasil</SelectItem>
                     <SelectItem value="São Paulo">São Paulo, Brasil</SelectItem>
                     <SelectItem value="Buenos Aires">Buenos Aires, Argentina</SelectItem>
                     <SelectItem value="Santiago">Santiago, Chile</SelectItem>
                     <SelectItem value="Bogotá">Bogotá, Colombia</SelectItem>
                     <SelectItem value="Quito">Quito, Ecuador</SelectItem>
                     <SelectItem value="La Paz">La Paz, Bolivia</SelectItem>
                     <SelectItem value="Asunción">Asunción, Paraguay</SelectItem>
                     <SelectItem value="Montevideo">Montevideo, Uruguay</SelectItem>
                     <SelectItem value="Caracas">Caracas, Venezuela</SelectItem>
                   </SelectContent>
                 </Select>
                 <Button onClick={addDestination} className="bg-primary text-primary-foreground hover:bg-primary/90">Agregar</Button>
               </div>
               <div className="text-xs text-muted-foreground mt-2">
                 Selecciona un destino de la lista para agregarlo a tu itinerario
               </div>
             </Card>

             <Button 
               className="w-full bg-green-600 hover:bg-green-700 text-white"
               onClick={finishItinerary}
               >
               Continuar
             </Button>
           </CardContent>
         </Card>
       </div>
                 </>

    )
}

export default PanelIzquierdoConstructorItinerario;     