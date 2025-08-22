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
  TrendingDown,
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
  <div className="w-full h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-4">
    <div className="text-center mb-4 px-2">
      <h4 className="font-semibold text-foreground">Gestión de Usuarios por Mes</h4>
    </div>
    <div className="flex items-end justify-between h-40 space-x-1">
      {/* Enero */}
      <div className="flex flex-col items-center space-y-1">
        <div className="w-8 bg-primary rounded-t" style={{ height: '70px' }}></div>
        <div className="w-8 bg-secondary" style={{ height: '45px' }}></div>
        <div className="w-8 bg-accent rounded-b" style={{ height: '25px' }}></div>
        <span className="text-xs text-muted-foreground font-medium">Ene</span>
      </div>
      {/* Febrero */}
      <div className="flex flex-col items-center space-y-1">
        <div className="w-8 bg-primary rounded-t" style={{ height: '85px' }}></div>
        <div className="w-8 bg-secondary" style={{ height: '55px' }}></div>
        <div className="w-8 bg-accent rounded-b" style={{ height: '30px' }}></div>
        <span className="text-xs text-muted-foreground font-medium">Feb</span>
      </div>
      {/* Marzo */}
      <div className="flex flex-col items-center space-y-1">
        <div className="w-8 bg-primary rounded-t" style={{ height: '75px' }}></div>
        <div className="w-8 bg-secondary" style={{ height: '65px' }}></div>
        <div className="w-8 bg-accent rounded-b" style={{ height: '35px' }}></div>
        <span className="text-xs text-muted-foreground font-medium">Mar</span>
      </div>
      {/* Abril */}
      <div className="flex flex-col items-center space-y-1">
        <div className="w-8 bg-primary rounded-t" style={{ height: '95px' }}></div>
        <div className="w-8 bg-secondary" style={{ height: '75px' }}></div>
        <div className="w-8 bg-accent rounded-b" style={{ height: '40px' }}></div>
        <span className="text-xs text-muted-foreground font-medium">Abr</span>
      </div>
      {/* Mayo */}
      <div className="flex flex-col items-center space-y-1">
        <div className="w-8 bg-primary rounded-t" style={{ height: '110px' }}></div>
        <div className="w-8 bg-secondary" style={{ height: '85px' }}></div>
        <div className="w-8 bg-accent rounded-b" style={{ height: '50px' }}></div>
        <span className="text-xs text-muted-foreground font-medium">May</span>
      </div>
      {/* Junio */}
      <div className="flex flex-col items-center space-y-1">
        <div className="w-8 bg-primary rounded-t" style={{ height: '90px' }}></div>
        <div className="w-8 bg-secondary" style={{ height: '70px' }}></div>
        <div className="w-8 bg-accent rounded-b" style={{ height: '40px' }}></div>
        <span className="text-xs text-muted-foreground font-medium">Jun</span>
      </div>
    </div>
    <div className="flex justify-center space-x-4 mt-4 text-xs">
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-primary rounded"></div>
        <span className="text-muted-foreground font-medium">Administradores</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-secondary rounded"></div>
        <span className="text-muted-foreground font-medium">Trabajadores</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-accent rounded"></div>
        <span className="text-muted-foreground font-medium">Clientes</span>
      </div>
    </div>
  </div>
)

// Componente de gráfico de dona para métricas del sistema
const SystemDonutChart = () => (
  <div className="w-full h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-4">
    <div className="text-center mb-4">
      <h4 className="font-semibold text-foreground">Estado del Sistema</h4>
    </div>
    <div className="relative w-32 h-32 mx-auto">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Segmento 1 - Activo (75%) */}
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="15"
          strokeDasharray="165 220"
          strokeDashoffset="0"
          transform="rotate(-90 50 50)"
        />
        {/* Segmento 2 - Mantenimiento (20%) */}
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="hsl(var(--secondary))"
          strokeWidth="15"
          strokeDasharray="44 220"
          strokeDashoffset="-165"
          transform="rotate(-90 50 50)"
        />
        {/* Segmento 3 - Crítico (5%) */}
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="hsl(var(--destructive))"
          strokeWidth="15"
          strokeDasharray="11 220"
          strokeDashoffset="-209"
          transform="rotate(-90 50 50)"
        />
        {/* Centro */}
        <circle cx="50" cy="50" r="20" fill="hsl(var(--card))" className="shadow-lg" />
        <text x="50" y="55" textAnchor="middle" className="text-xs font-bold" fill="hsl(var(--card-foreground))">75%</text>
      </svg>
    </div>
    <div className="grid grid-cols-3 gap-2 text-xs mt-4">
      <div className="text-center">
        <div className="w-3 h-3 bg-primary rounded-full mx-auto mb-1"></div>
        <div className="text-muted-foreground font-medium">Activo 75%</div>
      </div>
      <div className="text-center">
        <div className="w-3 h-3 bg-secondary rounded-full mx-auto mb-1"></div>
        <div className="text-muted-foreground font-medium">Mant. 20%</div>
      </div>
      <div className="text-center">
        <div className="w-3 h-3 bg-destructive rounded-full mx-auto mb-1"></div>
        <div className="text-muted-foreground font-medium">Crítico 5%</div>
      </div>
    </div>
  </div>
)

// Componente de gráfico de área para rendimiento
const PerformanceAreaChart = () => (
  <div className="w-full h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-4">
    <div className="text-center mb-4">
      <h4 className="font-semibold text-foreground">Rendimiento del Sistema</h4>
    </div>
    <div className="relative h-32">
      <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
        <defs>
          <linearGradient id="performanceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {/* Área sombreada */}
        <path
          d="M0,40 L20,35 L40,30 L60,25 L80,20 L100,15 L100,40 Z"
          fill="url(#performanceGradient)"
        />
        {/* Línea del gráfico */}
        <path
          d="M0,40 L20,35 L40,30 L60,25 L80,20 L100,15"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Puntos de datos */}
        <circle cx="20" cy="35" r="3" fill="hsl(var(--primary))" stroke="hsl(var(--card))" strokeWidth="2" />
        <circle cx="40" cy="30" r="3" fill="hsl(var(--primary))" stroke="hsl(var(--card))" strokeWidth="2" />
        <circle cx="60" cy="25" r="3" fill="hsl(var(--primary))" stroke="hsl(var(--card))" strokeWidth="2" />
        <circle cx="80" cy="20" r="3" fill="hsl(var(--primary))" stroke="hsl(var(--card))" strokeWidth="2" />
        <circle cx="100" cy="15" r="3" fill="hsl(var(--primary))" stroke="hsl(var(--card))" strokeWidth="2" />
      </svg>
    </div>
    <div className="grid grid-cols-5 gap-2 text-xs text-muted-foreground mt-4 font-medium">
      <div className="text-center">Ene</div>
      <div className="text-center">Feb</div>
      <div className="text-center">Mar</div>
      <div className="text-center">Abr</div>
      <div className="text-center">May</div>
    </div>
  </div>
)

// Componente de gráfico de radar para métricas de seguridad
const SecurityRadarChart = () => (
  <div className="w-full h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-4">
    <div className="text-center mb-4">
      <h4 className="font-semibold text-foreground">Métricas de Seguridad</h4>
    </div>
    <div className="relative w-32 h-32 mx-auto">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Círculos concéntricos */}
        <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="1" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="hsl(var(--muted))" strokeWidth="1" />
        <circle cx="50" cy="50" r="20" fill="none" stroke="hsl(var(--muted))" strokeWidth="1" />
        <circle cx="50" cy="50" r="10" fill="none" stroke="hsl(var(--muted))" strokeWidth="1" />
        
        {/* Líneas del radar */}
        <line x1="50" y1="10" x2="50" y2="90" stroke="hsl(var(--muted))" strokeWidth="1" />
        <line x1="10" y1="50" x2="90" y2="50" stroke="hsl(var(--muted))" strokeWidth="1" />
        <line x1="20" y1="20" x2="80" y2="80" stroke="hsl(var(--muted))" strokeWidth="1" />
        <line x1="80" y1="20" x2="20" y2="80" stroke="hsl(var(--muted))" strokeWidth="1" />
        
        {/* Datos del radar */}
        <polygon
          points="50,15 70,35 65,50 45,50 40,35"
          fill="hsl(var(--primary))"
          fillOpacity="0.3"
        />
        <polygon
          points="50,15 70,35 65,50 45,50 40,35"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Puntos de datos */}
        <circle cx="50" cy="15" r="2" fill="hsl(var(--primary))" />
        <circle cx="70" cy="35" r="2" fill="hsl(var(--primary))" />
        <circle cx="65" cy="50" r="2" fill="hsl(var(--primary))" />
        <circle cx="45" cy="50" r="2" fill="hsl(var(--primary))" />
        <circle cx="40" cy="35" r="2" fill="hsl(var(--primary))" />
      </svg>
    </div>
    <div className="grid grid-cols-4 gap-1 text-xs mt-4 text-muted-foreground font-medium">
      <div className="text-center">Firewall</div>
      <div className="text-center">SSL</div>
      <div className="text-center">Backup</div>
      <div className="text-center">Auth</div>
    </div>
  </div>
)

export default function AdministradoresPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Contenido principal */}
            <div className="pt-16">
                <div className="p-6 lg:p-8 space-y-6">
                    {/* Header del Dashboard */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">Dashboard de Administración</h1>
                            <p className="text-muted-foreground mt-2">Panel de control y gestión del sistema turístico</p>
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

                    {/* KPIs Principales */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="hover:shadow-lg transition-shadow border-primary/20">
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

                        <Card className="hover:shadow-lg transition-shadow border-secondary/20">
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

                        <Card className="hover:shadow-lg transition-shadow border-accent/20">
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

                        <Card className="hover:shadow-lg transition-shadow border-destructive/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Alertas del Sistema</CardTitle>
                                <Shield className="h-4 w-4 text-destructive" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-destructive">3</div>
                                <div className="flex items-center space-x-2 mt-1">
                                    <ArrowDownRight className="w-4 h-4 text-green-500" />
                                    <span className="text-xs text-green-600 font-medium">-2</span>
                                    <span className="text-xs text-muted-foreground">desde ayer</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Gráficos Estadísticos */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="border-primary/20">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <BarChart className="h-5 w-5 text-primary" />
                                    <span>Gestión de Usuarios por Mes</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <AdminStackedBarChart />
                            </CardContent>
                        </Card>

                        <Card className="border-secondary/20">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <PieChart className="h-5 w-5 text-secondary" />
                                    <span>Estado del Sistema</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <SystemDonutChart />
                            </CardContent>
                        </Card>

                        <Card className="border-accent/20">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <AreaChart className="h-5 w-5 text-accent" />
                                    <span>Rendimiento del Sistema</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <PerformanceAreaChart />
                            </CardContent>
                        </Card>

                        <Card className="border-primary/20">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <BarChart3 className="h-5 w-5 text-primary" />
                                    <span>Métricas de Seguridad</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <SecurityRadarChart />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Métricas del Sistema y Top Administradores */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card className="lg:col-span-2 border-primary/20">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Target className="h-5 w-5 text-primary" />
                                    <span>Rendimiento del Sistema</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {/* Uso de CPU */}
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium">Uso de CPU</span>
                                            <span className="text-sm font-bold text-primary">68.5%</span>
                                        </div>
                                        <Progress value={68.5} className="h-3" />
                                        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                                            <span>Normal: 45%</span>
                                            <span>Crítico: 85%</span>
                                        </div>
                                    </div>

                                    {/* Uso de Memoria */}
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium">Uso de Memoria</span>
                                            <span className="text-sm font-bold text-secondary">72.3%</span>
                                        </div>
                                        <Progress value={72.3} className="h-3" />
                                        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                                            <span>Disponible: 8.2 GB</span>
                                            <span>Total: 32 GB</span>
                                        </div>
                                    </div>

                                    {/* Estado de Servicios */}
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                                            <div className="text-2xl font-bold text-green-600">12</div>
                                            <div className="text-xs text-green-600 font-medium">Activos</div>
                                        </div>
                                        <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                                            <div className="text-2xl font-bold text-yellow-600">2</div>
                                            <div className="text-xs text-yellow-600 font-medium">Mantenimiento</div>
                                        </div>
                                        <div className="text-center p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                                            <div className="text-2xl font-bold text-red-600">1</div>
                                            <div className="text-xs text-red-600 font-medium">Crítico</div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Top Administradores */}
                        <Card className="border-secondary/20">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Award className="h-5 w-5 text-secondary" />
                                    <span>Top Administradores</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        { name: "Carlos Rodríguez", tasks: 89, rating: 4.9, change: "+15%" },
                                        { name: "Sofia Hernández", tasks: 76, rating: 4.8, change: "+12%" },
                                        { name: "Luis Martínez", tasks: 65, rating: 4.7, change: "+8%" },
                                        { name: "Ana López", tasks: 58, rating: 4.6, change: "+5%" },
                                        { name: "María González", tasks: 52, rating: 4.5, change: "+3%" }
                                    ].map((admin, index) => (
                                        <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
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

                    {/* Servicios del Sistema y Actividad Reciente */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Servicios del Sistema */}
                        <Card className="border-accent/20">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Server className="h-5 w-5 text-accent" />
                                    <span>Servicios del Sistema</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
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
                                            <div key={index} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                                                <div className="flex items-center space-x-3">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${statusBg}`}>
                                                        <IconComponent className={`w-4 h-4 ${statusColor}`} />
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

                        {/* Actividad Reciente */}
                        <Card className="border-primary/20">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Activity className="h-5 w-5 text-primary" />
                                    <span>Actividad del Sistema</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        { action: "Nuevo usuario administrador registrado", time: "Hace 5 min", type: "success" as const, icon: Shield },
                                        { action: "Backup automático completado", time: "Hace 15 min", type: "info" as const, icon: Database },
                                        { action: "Actualización de seguridad aplicada", time: "Hace 1 hora", type: "warning" as const, icon: Lock },
                                        { action: "Nueva API key generada", time: "Hace 2 horas", type: "info" as const, icon: Key },
                                        { action: "Alerta de sistema resuelta", time: "Hace 3 horas", type: "success" as const, icon: CheckCircle },
                                        { action: "Mantenimiento programado iniciado", time: "Hace 4 horas", type: "warning" as const, icon: Settings }
                                    ].map((activity, index) => {
                                        const IconComponent = activity.icon;
                                        const colorClasses = {
                                            success: "text-green-500 bg-green-50 dark:bg-green-950/20",
                                            info: "text-primary bg-primary/10",
                                            warning: "text-yellow-500 bg-yellow-50 dark:bg-yellow-950/20",
                                            error: "text-destructive bg-destructive/10"
                                        } as const;
                                        
                                        return (
                                            <div key={index} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colorClasses[activity.type]}`}>
                                                    <IconComponent className="w-4 h-4" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-sm">{activity.action}</div>
                                                    <div className="text-xs text-muted-foreground">{activity.time}</div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}   