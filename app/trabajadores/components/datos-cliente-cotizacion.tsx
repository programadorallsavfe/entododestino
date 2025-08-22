"use client";

import { useState } from "react";
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  CreditCard,
  Building,
  Globe,
  FileText,
  Save
} from "lucide-react";

// Importar componentes de shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

interface ClienteData {
  // Información Personal
  nombre: string;
  apellido: string;
  dni: string;
  fechaNacimiento: string;
  genero: string;
  nacionalidad: string;
  
  // Información de Contacto
  telefono: string;
  telefonoAlternativo: string;
  email: string;
  emailAlternativo: string;
  
  // Información de Dirección
  direccion: string;
  ciudad: string;
  provincia: string;
  codigoPostal: string;
  pais: string;
  
  // Información Adicional
  ocupacion: string;
  empresa: string;
  preferencias: string[];
  observaciones: string;
  
  // Información de Viaje
  tipoViajero: string;
  restricciones: string;
  alergias: string;
  requerimientosEspeciales: string;
}

export const DatosClienteCotizacion = ({ onComplete }: { onComplete?: () => void }) => {
  const [clienteData, setClienteData] = useState<ClienteData>({
    nombre: "Juan Carlos",
    apellido: "González",
    dni: "12345678",
    fechaNacimiento: "1985-06-15",
    genero: "Masculino",
    nacionalidad: "Argentina",
    telefono: "+54 11 1234-5678",
    telefonoAlternativo: "+54 11 8765-4321",
    email: "juan.gonzalez@email.com",
    emailAlternativo: "juan.alt@email.com",
    direccion: "Av. Corrientes 1234, Piso 5, Depto A",
    ciudad: "Buenos Aires",
    provincia: "Buenos Aires",
    codigoPostal: "1043",
    pais: "Argentina",
    ocupacion: "Ingeniero de Sistemas",
    empresa: "TechCorp S.A.",
    preferencias: ["Vuelos directos", "Hoteles 4-5 estrellas", "Traslados privados"],
    observaciones: "Cliente frecuente, prefiere habitaciones con vista al mar. Solicita check-in temprano cuando sea posible.",
    tipoViajero: "Cultural",
    restricciones: "Vegetariano",
    alergias: "Polen, Mariscos",
    requerimientosEspeciales: "Habitación en piso bajo por preferencia personal"
  });

  const [isEditing, setIsEditing] = useState(true);

  const handleInputChange = (field: keyof ClienteData, value: string | string[]) => {
    setClienteData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreferenciaToggle = (preferencia: string) => {
    setClienteData(prev => ({
      ...prev,
      preferencias: prev.preferencias.includes(preferencia)
        ? prev.preferencias.filter(p => p !== preferencia)
        : [...prev.preferencias, preferencia]
    }));
  };

  const handleSave = () => {
    // Aquí se implementaría la lógica para guardar los datos
    console.log("Datos del cliente guardados:", clienteData);
    setIsEditing(false);
    
    // Llamar a la función de completado para pasar a la siguiente vista
    if (onComplete) {
      onComplete();
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Aquí se podrían restaurar los datos originales
  };

  const nacionalidades = [
    "Argentina", "Brasil", "Chile", "Colombia", "Costa Rica", "Cuba", "Ecuador",
    "El Salvador", "Guatemala", "Honduras", "México", "Nicaragua", "Panamá",
    "Paraguay", "Perú", "República Dominicana", "Uruguay", "Venezuela", "España",
    "Francia", "Italia", "Alemania", "Reino Unido", "Estados Unidos", "Canadá"
  ];

  const generos = ["Masculino", "Femenino", "No binario", "Prefiero no decir"];
  
  const tiposViajero = [
    "Aventurero", "Cultural", "Relax", "Romántico", "Familiar", "Lujo", 
    "Económico", "Gastronómico", "Naturaleza", "Histórico", "Playa", "Montaña"
  ];

  const preferencias = [
    "Vuelos directos", "Hoteles 4-5 estrellas", "Guía turístico", "Traslados privados",
    "Seguro de viaje", "Visa incluida", "Comidas incluidas", "Actividades opcionales",
    "Habitación con vista", "Check-in temprano", "Check-out tardío", "WiFi gratuito"
  ];

  return (
    <Card className="w-full">
      

      <CardContent className="p-6 space-y-8">
        {/* Información Personal */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-700 border-b pb-2">
            <User className="w-5 h-5 text-blue-600" />
            Información Personal
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nombre" className="text-sm font-medium text-gray-700">
                Nombre *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="nombre"
                  value={clienteData.nombre}
                  onChange={(e) => handleInputChange("nombre", e.target.value)}
                  placeholder="Ingrese su nombre"
                  className="pl-10"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="apellido" className="text-sm font-medium text-gray-700">
                Apellido *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="apellido"
                  value={clienteData.apellido}
                  onChange={(e) => handleInputChange("apellido", e.target.value)}
                  placeholder="Ingrese su apellido"
                  className="pl-10"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dni" className="text-sm font-medium text-gray-700">
                DNI/Pasaporte *
              </Label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="dni"
                  value={clienteData.dni}
                  onChange={(e) => handleInputChange("dni", e.target.value)}
                  placeholder="12345678"
                  className="pl-10"
                  disabled={!isEditing}
                />
              </div>
            </div>

         

            

           
          </div>
        </div>

        <Separator />

        {/* Información de Contacto */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-700 border-b pb-2">
            <Phone className="w-5 h-5 text-green-600" />
            Información de Contacto
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="telefono" className="text-sm font-medium text-gray-700">
                Teléfono Principal *
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="telefono"
                  value={clienteData.telefono}
                  onChange={(e) => handleInputChange("telefono", e.target.value)}
                  placeholder="+54 11 1234-5678"
                  className="pl-10"
                  disabled={!isEditing}
                />
              </div>
            </div>

        

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Principal *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  value={clienteData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="cliente@email.com"
                  className="pl-10"
                  disabled={!isEditing}
                />
              </div>
            </div>

         
          </div>
        </div>

        <Separator />

       

        {/* Botones de Acción */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          {isEditing ? (
            <>
              <Button 
                variant="outline" 
                onClick={handleCancel}
                className="px-6"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleSave}
                className="px-6 bg-green-600 hover:bg-green-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Guardar Datos
              </Button>
            </>
          ) : (
            <Button 
              onClick={handleEdit}
              className="px-6"
            >
              Editar Datos
            </Button>
          )}
        </div>

        {/* Resumen de Datos */}
        {!isEditing && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Resumen de Datos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">Cliente:</span> {clienteData.nombre} {clienteData.apellido}
              </div>
              <div>
                <span className="font-medium text-gray-600">DNI:</span> {clienteData.dni}
              </div>
              <div>
                <span className="font-medium text-gray-600">Teléfono:</span> {clienteData.telefono}
              </div>
              <div>
                <span className="font-medium text-gray-600">Email:</span> {clienteData.email}
              </div>
              <div>
                <span className="font-medium text-gray-600">Ciudad:</span> {clienteData.ciudad}, {clienteData.provincia}
              </div>
              <div>
                <span className="font-medium text-gray-600">Tipo de Viajero:</span> {clienteData.tipoViajero}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};   