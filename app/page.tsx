import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  UserCheck, 
  Briefcase, 
  Building2, 
  Globe, 
  MapPin, 
  Calendar,
  ArrowRight,
  Shield,
  Settings,
  BarChart3
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header Principal */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/banner.jpg"
            alt="Turismo Sudamérica"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-secondary/90" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Logo Principal */}
            <div className="mb-8">
              <Image
                src="/assets/logoooo.png"
                alt="Logo entododestino"
                width={200}
                height={80}
                className="mx-auto drop-shadow-lg"
                priority
              />
            </div>
            
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Sistema de Turismo
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              Gestiona itinerarios, reservas y experiencias turísticas en Sudamérica
            </p>
            
          </div>
        </div>
      </div>

      {/* Sección de Navegación Principal */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Acceso al Sistema
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Selecciona tu rol para acceder a las funcionalidades correspondientes del sistema
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Tarjeta Administradores */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/80 hover:from-primary/5 hover:to-primary/10">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Shield className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">
                Administradores
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Gestión completa del sistema y supervisión
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <Settings className="w-4 h-4" />
                  <span>Configuración del sistema</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <BarChart3 className="w-4 h-4" />
                  <span>Reportes y estadísticas</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>Gestión de usuarios</span>
                </div>
              </div>
              <Link href="/administradores">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 group-hover:bg-primary transition-colors">
                  Acceder
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Tarjeta Clientes */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/80 hover:from-secondary/5 hover:to-secondary/10">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                <UserCheck className="w-10 h-10 text-secondary" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">
                Clientes
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Planificación y reserva de viajes
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>Constructor de itinerarios</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Reservas y fechas</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <Globe className="w-4 h-4" />
                  <span>Explorar destinos</span>
                </div>
              </div>
              <Link href="/clientes">
                <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 group-hover:bg-secondary transition-colors">
                  Acceder
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Tarjeta Trabajadores */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/80 hover:from-accent/5 hover:to-accent/10">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                <Briefcase className="w-10 h-10 text-accent" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">
                Trabajadores
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Gestión de itinerarios y servicios
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <Building2 className="w-4 h-4" />
                  <span>Gestión de paquetes</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>Atención al cliente</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <BarChart3 className="w-4 h-4" />
                  <span>Reportes operativos</span>
                </div>
              </div>
              <Link href="/trabajadores">
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 group-hover:bg-accent transition-colors">
                  Acceder
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Información Adicional */}
        <div className="mt-20 text-center">
          <div className="max-w-4xl mx-auto">
            
            
          </div>
        </div>
      </div>
    </div>
  );
}
