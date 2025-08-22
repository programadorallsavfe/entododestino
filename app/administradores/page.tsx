"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Users,
    Package,
    Calendar,
    DollarSign,
    TrendingUp,
    MapPin,
    Target,
    CheckCircle,
    XCircle,
    Star,
    Clock,
    BarChart3,
    Activity,
    Award,
    ArrowUpRight,
    ArrowDownRight,
    PieChart,
    LineChart,
    BarChart,
    AreaChart,
    Shield,
    Database,
    Key,
    Settings,
    UserCheck,
    Building,
    Hotel,
    Plane,
    FileText,
    CreditCard,
    Globe,
    Lock,
    Server,
    Zap,
    Mail
} from "lucide-react"

// Componente de gráfico de barras apiladas para administradores
const AdminStackedBarChart = () => (
  <div className="w-full h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-4 animate-in slide-in-from-bottom-4 duration-700">
    <div className="text-center mb-4 px-2">
    </div>
    <div className="flex items-end justify-between h-40 space-x-1">
      {/* Enero */}
      <div className="flex flex-col items-center space-y-1 group">
        <div className="w-8 bg-primary rounded-t transition-all duration-500 hover:scale-110 hover:shadow-lg" style={{ height: '70px' }}></div>
        <div className="w-8 bg-secondary transition-all duration-500 hover:scale-110 hover:shadow-lg" style={{ height: '45px' }}></div>
        <div className="w-8 bg-accent rounded-b transition-all duration-500 hover:scale-110 hover:shadow-lg" style={{ height: '25px' }}></div>
        <span className="text-xs text-muted-foreground font-medium group-hover:text-primary transition-colors duration-300">Ene</span>
      </div>
      {/* Febrero */}
      <div className="flex flex-col items-center space-y-1 group">
        <div className="w-8 bg-primary rounded-t transition-all duration-500 hover:scale-110 hover:shadow-lg" style={{ height: '85px' }}></div>
        <div className="w-8 bg-secondary transition-all duration-500 hover:scale-110 hover:shadow-lg" style={{ height: '55px' }}></div>
        <div className="w-8 bg-accent rounded-b transition-all duration-500 hover:scale-110 hover:shadow-lg" style={{ height: '30px' }}></div>
        <span className="text-xs text-muted-foreground font-medium group-hover:text-primary transition-colors duration-300">Feb</span>
      </div>
      {/* Marzo */}
      <div className="flex flex-col items-center space-y-1 group">
        <div className="w-8 bg-primary rounded-t transition-all duration-500 hover:scale-110 hover:shadow-lg" style={{ height: '75px' }}></div>
        <div className="w-8 bg-secondary transition-all duration-500 hover:scale-110 hover:shadow-lg" style={{ height: '65px' }}></div>
        <div className="w-8 bg-accent rounded-b transition-all duration-500 hover:scale-110 hover:shadow-lg" style={{ height: '35px' }}></div>
        <span className="text-xs text-muted-foreground font-medium group-hover:text-primary transition-colors duration-300">Mar</span>
      </div>
      {/* Abril */}
      <div className="flex flex-col items-center space-y-1 group">
        <div className="w-8 bg-primary rounded-t transition-all duration-500 hover:scale-110 hover:shadow-lg" style={{ height: '95px' }}></div>
        <div className="w-8 bg-secondary transition-all duration-500 hover:scale-110 hover:shadow-lg" style={{ height: '75px' }}></div>
        <div className="w-8 bg-accent rounded-b transition-all duration-500 hover:scale-110 hover:shadow-lg" style={{ height: '40px' }}></div>
        <span className="text-xs text-muted-foreground font-medium group-hover:text-primary transition-colors duration-300">Abr</span>
      </div>
      {/* Mayo */}
      <div className="flex flex-col items-center space-y-1 group">
        <div className="w-8 bg-primary rounded-t transition-all duration-500 hover:scale-110 hover:shadow-lg" style={{ height: '110px' }}></div>
        <div className="w-8 bg-secondary transition-all duration-500 hover:scale-110 hover:shadow-lg" style={{ height: '85px' }}></div>
        <div className="w-8 bg-accent rounded-b transition-all duration-500 hover:scale-110 hover:shadow-lg" style={{ height: '50px' }}></div>
        <span className="text-xs text-muted-foreground font-medium group-hover:text-primary transition-colors duration-300">May</span>
      </div>
      {/* Junio */}
      <div className="flex flex-col items-center space-y-1 group">
        <div className="w-8 bg-primary rounded-t transition-all duration-500 hover:scale-110 hover:shadow-lg" style={{ height: '90px' }}></div>
        <div className="w-8 bg-secondary transition-all duration-500 hover:scale-110 hover:shadow-lg" style={{ height: '70px' }}></div>
        <div className="w-8 bg-accent rounded-b transition-all duration-500 hover:scale-110 hover:shadow-lg" style={{ height: '40px' }}></div>
        <span className="text-xs text-muted-foreground font-medium group-hover:text-primary transition-colors duration-300">Jun</span>
      </div>
    </div>
    <div className="flex justify-center space-x-4 mt-4 text-xs">
      <div className="flex items-center space-x-2 group">
        <div className="w-3 h-3 bg-primary rounded transition-all duration-300 group-hover:scale-125 group-hover:shadow-md"></div>
        <span className="text-muted-foreground font-medium group-hover:text-primary transition-colors duration-300">Administradores</span>
      </div>
      <div className="flex items-center space-x-2 group">
        <div className="w-3 h-3 bg-secondary rounded transition-all duration-300 group-hover:scale-125 group-hover:shadow-md"></div>
        <span className="text-muted-foreground font-medium group-hover:text-secondary transition-colors duration-300">Trabajadores</span>
      </div>
      <div className="flex items-center space-x-2 group">
        <div className="w-3 h-3 bg-accent rounded transition-all duration-300 group-hover:scale-125 group-hover:shadow-md"></div>
        <span className="text-muted-foreground font-medium group-hover:text-accent transition-colors duration-300">Clientes</span>
      </div>
    </div>
  </div>
)

// Componente de gráfico de radar para métricas de seguridad
const SecurityRadarChart = () => (
  <div className="w-full h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-4 animate-in slide-in-from-bottom-4 duration-700">
    <div className="text-center mb-4">
      <h4 className="font-semibold text-foreground">Métricas de Seguridad</h4>
    </div>
    <div className="relative w-32 h-32 mx-auto group">
      <svg className="w-full h-full transition-all duration-500 group-hover:scale-110" viewBox="0 0 100 100">
        {/* Círculos concéntricos */}
        <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="1" className="transition-all duration-300 group-hover:stroke-width-2" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="hsl(var(--muted))" strokeWidth="1" className="transition-all duration-300 group-hover:stroke-width-2" />
        <circle cx="50" cy="50" r="20" fill="none" stroke="hsl(var(--muted))" strokeWidth="1" className="transition-all duration-300 group-hover:stroke-width-2" />
        <circle cx="50" cy="50" r="10" fill="none" stroke="hsl(var(--muted))" strokeWidth="1" className="transition-all duration-300 group-hover:stroke-width-2" />
        
        {/* Líneas del radar */}
        <line x1="50" y1="10" x2="50" y2="90" stroke="hsl(var(--muted))" strokeWidth="1" className="transition-all duration-300 group-hover:stroke-width-2" />
        <line x1="10" y1="50" x2="90" y2="50" stroke="hsl(var(--muted))" strokeWidth="1" className="transition-all duration-300 group-hover:stroke-width-2" />
        <line x1="20" y1="20" x2="80" y2="80" stroke="hsl(var(--muted))" strokeWidth="1" className="transition-all duration-300 group-hover:stroke-width-2" />
        <line x1="80" y1="20" x2="20" y2="80" stroke="hsl(var(--muted))" strokeWidth="1" className="transition-all duration-300 group-hover:stroke-width-2" />
        
        {/* Datos del radar */}
        <polygon
          points="50,15 70,35 65,50 45,50 40,35"
          fill="hsl(var(--primary))"
          fillOpacity="0.3"
          className="transition-all duration-500 group-hover:fill-opacity-50"
        />
        <polygon
          points="50,15 70,35 65,50 45,50 40,35"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-500 group-hover:stroke-width-3"
        />
        
        {/* Puntos de datos */}
        <circle cx="50" cy="15" r="2" fill="hsl(var(--primary))" className="transition-all duration-300 group-hover:r-3 group-hover:shadow-lg" />
        <circle cx="70" cy="35" r="2" fill="hsl(var(--primary))" className="transition-all duration-300 group-hover:r-3 group-hover:shadow-lg" />
        <circle cx="65" cy="50" r="2" fill="hsl(var(--primary))" className="transition-all duration-300 group-hover:r-3 group-hover:shadow-lg" />
        <circle cx="45" cy="50" r="2" fill="hsl(var(--primary))" className="transition-all duration-300 group-hover:r-3 group-hover:shadow-lg" />
        <circle cx="40" cy="35" r="2" fill="hsl(var(--primary))" className="transition-all duration-300 group-hover:r-3 group-hover:shadow-lg" />
      </svg>
    </div>
    <div className="grid grid-cols-4 gap-1 text-xs mt-4 text-muted-foreground font-medium">
      <div className="text-center group">
        <span className="transition-all duration-300 group-hover:text-primary group-hover:font-bold">Firewall</span>
      </div>
      <div className="text-center group">
        <span className="transition-all duration-300 group-hover:text-primary group-hover:font-bold">SSL</span>
      </div>
      <div className="text-center group">
        <span className="transition-all duration-300 group-hover:text-primary group-hover:font-bold">Backup</span>
      </div>
      <div className="text-center group">
        <span className="transition-all duration-300 group-hover:text-primary group-hover:font-bold">Auth</span>
      </div>
    </div>
  </div>
)

export default function AdministradoresPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Contenido principal */}
            <div className="pt-16">
                <div className="p-6 lg:p-8 space-y-8">
                    
                    {/* ===== HEADER DEL DASHBOARD ===== */}
                    <section className="space-y-4">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold text-foreground">Dashboard de Administración</h1>
                                <p className="text-muted-foreground">Panel de control y gestión del sistema turístico</p>
                            </div>
                            <div className="flex items-center space-x-2 mt-4 lg:mt-0">
                                <Badge variant="outline" className="text-sm">
                                    <Clock className="w-3 h-3 mr-1" />
                                    Última actualización: hace 2 min
                                </Badge>
                                <Badge className="bg-primary text-primary-foreground">
                                    <Shield className="w-3 h-3 mr-1" />
                                    Sistema Seguro
                                </Badge>
                            </div>
                        </div>
                    </section>

                    {/* ===== KPIs PRINCIPALES ===== */}
                    <section className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* KPI - Total Usuarios */}
                            <Card className="hover:shadow-lg transition-all duration-300 border-primary/20 hover:border-primary/40">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
                                    <Users className="h-4 w-4 text-primary" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-primary">3,247</div>
                                    <div className="flex items-center space-x-2 mt-1">
                                        <ArrowUpRight className="w-4 h-4 text-green-500" />
                                        <span className="text-xs text-green-600 font-medium">+15%</span>
                                        <span className="text-xs text-muted-foreground">desde el mes pasado</span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* KPI - Trabajadores Activos */}
                            <Card className="hover:shadow-lg transition-all duration-300 border-secondary/20 hover:border-secondary/40">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Trabajadores Activos</CardTitle>
                                    <UserCheck className="h-4 w-4 text-secondary" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-secondary">156</div>
                                    <div className="flex items-center space-x-2 mt-1">
                                        <ArrowUpRight className="w-4 h-4 text-green-500" />
                                        <span className="text-xs text-green-600 font-medium">+8%</span>
                                        <span className="text-xs text-muted-foreground">desde el mes pasado</span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* KPI - Ingresos del Mes */}
                            <Card className="hover:shadow-lg transition-all duration-300 border-accent/20 hover:border-accent/40">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Ingresos del Mes</CardTitle>
                                    <DollarSign className="h-4 w-4 text-accent" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-accent">S/ 156,432</div>
                                    <div className="flex items-center space-x-2 mt-1">
                                        <ArrowUpRight className="w-4 h-4 text-green-500" />
                                        <span className="text-xs text-green-600 font-medium">+23%</span>
                                        <span className="text-xs text-muted-foreground">desde el mes pasado</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </section>

                    {/* ===== GRÁFICOS ESTADÍSTICOS ===== */}
                    <section className="space-y-8">
                        {/* Primera fila de gráficos */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Gráfico de Gestión de Usuarios */}
                            <Card className="border-primary/20 hover:shadow-lg transition-all duration-300">
                                <CardHeader className="pb-4">
                                    <CardTitle className="flex items-center space-x-2 text-lg">
                                        <BarChart className="h-5 w-5 text-primary" />
                                        <span>Gestión de Usuarios por Mes</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="h-80">
                                        <AdminStackedBarChart />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Top Administradores */}
                            <Card className="border-secondary/20 hover:shadow-lg transition-all duration-300">
                                <CardHeader className="pb-4">
                                    <CardTitle className="flex items-center space-x-2 text-lg">
                                        <Award className="h-5 w-5 text-secondary" />
                                        <span> Administradores</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="space-y-4">
                                        {[
                                            { name: "Carlos Rodríguez", tasks: 89, rating: 4.9, change: "+15%" },
                                            { name: "Sofia Hernández", tasks: 76, rating: 4.8, change: "+12%" },
                                            { name: "Luis Martínez", tasks: 65, rating: 4.7, change: "+8%" },
                                            { name: "Ana López", tasks: 58, rating: 4.6, change: "+5%" },
                                            { name: "María González", tasks: 52, rating: 4.5, change: "+3%" }
                                        ].map((admin, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all duration-200">
                                                <div className="flex items-center space-x-3">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                                                        index === 0 ? 'bg-primary' : 
                                                        index === 1 ? 'bg-secondary' : 
                                                        index === 2 ? 'bg-accent' : 'bg-muted'
                                                    }`}>
                                                        {index + 1}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium">{admin.name}</div>
                                                        <div className="flex items-center space-x-1">
                                                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                                            <span className="text-xs text-muted-foreground">{admin.rating}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm font-bold">{admin.tasks} tareas</div>
                                                    <div className="text-xs text-green-600">{admin.change}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </section>

                    {/* ===== SERVICIOS DEL SISTEMA ===== */}
                    <section className="space-y-6">
                        <Card className="border-accent/20 hover:shadow-lg transition-all duration-300">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center space-x-2 text-lg">
                                    <Server className="h-5 w-5 text-accent" />
                                    <span>Servicios del Sistema</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { name: "Base de Datos", status: "online", uptime: "99.9%", icon: Database },
                                        { name: "API Gateway", status: "online", uptime: "99.8%", icon: Key },
                                        { name: "Servidor Web", status: "online", uptime: "99.7%", icon: Globe },
                                        { name: "Sistema de Pagos", status: "maintenance", uptime: "98.5%", icon: CreditCard },
                                        { name: "Servicio de Email", status: "online", uptime: "99.6%", icon: Mail },
                                        { name: "Backup Automático", status: "online", uptime: "99.9%", icon: Zap }
                                    ].map((service, index) => {
                                        const IconComponent = service.icon;
                                        const statusColor = service.status === 'online' ? 'text-green-600' : 'text-yellow-600';
                                        const statusBg = service.status === 'online' ? 'bg-green-50 dark:bg-green-950/20' : 'bg-yellow-50 dark:bg-yellow-950/20';
                                        
                                        return (
                                            <div key={index} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-all duration-200">
                                                <div className="flex items-center space-x-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${statusBg}`}>
                                                        <IconComponent className={`w-5 h-5 ${statusColor}`} />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium">{service.name}</div>
                                                        <div className="text-xs text-muted-foreground">Uptime: {service.uptime}</div>
                                                    </div>
                                                </div>
                                                <Badge variant={service.status === 'online' ? 'default' : 'secondary'}>
                                                    {service.status === 'online' ? 'Online' : 'Mantenimiento'}
                                                </Badge>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                </div>
            </div>
        </div>
    )
}   