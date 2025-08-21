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
  AreaChart
} from "lucide-react"

// Componente de gráfico de barras apiladas mejorado
const StackedBarChart = () => (
  <div className="w-full h-64 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-lg p-4">
    <div className="text-center mb-4 px-2">
    </div>
    <div className="flex items-end justify-between h-40 space-x-1">
      {/* Enero */}
      <div className="flex flex-col items-center space-y-1">
        <div className="w-8 bg-blue-500 rounded-t" style={{ height: '60px' }}></div>
        <div className="w-8 bg-green-500" style={{ height: '40px' }}></div>
        <div className="w-8 bg-yellow-500 rounded-b" style={{ height: '20px' }}></div>
        <span className="text-xs text-blue-700 dark:text-blue-300 font-medium">Ene</span>
      </div>
      {/* Febrero */}
      <div className="flex flex-col items-center space-y-1">
        <div className="w-8 bg-blue-500 rounded-t" style={{ height: '80px' }}></div>
        <div className="w-8 bg-green-500" style={{ height: '50px' }}></div>
        <div className="w-8 bg-yellow-500 rounded-b" style={{ height: '30px' }}></div>
        <span className="text-xs text-blue-700 dark:text-blue-300 font-medium">Feb</span>
      </div>
      {/* Marzo */}
      <div className="flex flex-col items-center space-y-1">
        <div className="w-8 bg-blue-500 rounded-t" style={{ height: '70px' }}></div>
        <div className="w-8 bg-green-500" style={{ height: '60px' }}></div>
        <div className="w-8 bg-yellow-500 rounded-b" style={{ height: '25px' }}></div>
        <span className="text-xs text-blue-700 dark:text-blue-300 font-medium">Mar</span>
      </div>
      {/* Abril */}
      <div className="flex flex-col items-center space-y-1">
        <div className="w-8 bg-blue-500 rounded-t" style={{ height: '90px' }}></div>
        <div className="w-8 bg-green-500" style={{ height: '70px' }}></div>
        <div className="w-8 bg-yellow-500 rounded-b" style={{ height: '40px' }}></div>
        <span className="text-xs text-blue-700 dark:text-blue-300 font-medium">Abr</span>
      </div>
      {/* Mayo */}
      <div className="flex flex-col items-center space-y-1">
        <div className="w-8 bg-blue-500 rounded-t" style={{ height: '100px' }}></div>
        <div className="w-8 bg-green-500" style={{ height: '80px' }}></div>
        <div className="w-8 bg-yellow-500 rounded-b" style={{ height: '50px' }}></div>
        <span className="text-xs text-blue-700 dark:text-blue-300 font-medium">May</span>
      </div>
      {/* Junio */}
      <div className="flex flex-col items-center space-y-1">
        <div className="w-8 bg-blue-500 rounded-t" style={{ height: '85px' }}></div>
        <div className="w-8 bg-green-500" style={{ height: '65px' }}></div>
        <div className="w-8 bg-yellow-500 rounded-b" style={{ height: '35px' }}></div>
        <span className="text-xs text-blue-700 dark:text-blue-300 font-medium">Jun</span>
      </div>
    </div>
    <div className="flex justify-center space-x-4 mt-4 text-xs">
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-blue-500 rounded"></div>
        <span className="text-blue-700 dark:text-blue-300 font-medium">Cusco</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-green-500 rounded"></div>
        <span className="text-green-700 dark:text-green-300 font-medium">Arequipa</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-yellow-500 rounded"></div>
        <span className="text-yellow-700 dark:text-yellow-300 font-medium">Lima</span>
      </div>
    </div>
  </div>
)

// Componente de gráfico de espiral mejorado
const SpiralChart = () => (
  <div className="w-full h-64 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-lg p-4 relative overflow-hidden">
    <div className="text-center mb-4">
      <h4 className="font-semibold text-purple-800 dark:text-purple-200">Crecimiento de Ingresos</h4>
    </div>
    <div className="relative w-32 h-32 mx-auto">
      {/* Espiral exterior */}
      <div className="absolute inset-0 border-4 border-purple-300 rounded-full animate-pulse"></div>
      {/* Espiral media */}
      <div className="absolute inset-2 border-4 border-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      {/* Espiral interior */}
      <div className="absolute inset-4 border-4 border-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      {/* Centro */}
      <div className="absolute inset-6 bg-purple-600 rounded-full flex items-center justify-center shadow-lg">
        <span className="text-white text-sm font-bold">S/ 89K</span>
      </div>
    </div>
    <div className="absolute bottom-4 left-4 right-4">
      <div className="grid grid-cols-3 gap-2 text-xs text-purple-700 dark:text-purple-300">
        <div className="text-center bg-white/50 dark:bg-purple-900/30 rounded p-2">
          <div className="font-semibold text-lg">+18%</div>
          <div className="text-xs">Este mes</div>
        </div>
        <div className="text-center bg-white/50 dark:bg-purple-900/30 rounded p-2">
          <div className="font-semibold text-lg">+12%</div>
          <div className="text-xs">Mes anterior</div>
        </div>
        <div className="text-center bg-white/50 dark:bg-purple-900/30 rounded p-2">
          <div className="font-semibold text-lg">+8%</div>
          <div className="text-xs">Promedio</div>
        </div>
      </div>
    </div>
  </div>
)

// Componente de gráfico de área mejorado
const AreaChartComponent = () => (
  <div className="w-full h-64 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-lg p-4">
    <div className="text-center mb-4">
      <h4 className="font-semibold text-green-800 dark:text-green-200">Tendencia de Clientes</h4>
    </div>
    <div className="relative h-32">
      <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#16a34a" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#16a34a" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {/* Área sombreada */}
        <path
          d="M0,40 L20,35 L40,30 L60,25 L80,20 L100,15 L100,40 Z"
          fill="url(#areaGradient)"
        />
        {/* Línea del gráfico */}
        <path
          d="M0,40 L20,35 L40,30 L60,25 L80,20 L100,15"
          stroke="#16a34a"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Puntos de datos */}
        <circle cx="20" cy="35" r="3" fill="#16a34a" stroke="white" strokeWidth="2" />
        <circle cx="40" cy="30" r="3" fill="#16a34a" stroke="white" strokeWidth="2" />
        <circle cx="60" cy="25" r="3" fill="#16a34a" stroke="white" strokeWidth="2" />
        <circle cx="80" cy="20" r="3" fill="#16a34a" stroke="white" strokeWidth="2" />
        <circle cx="100" cy="15" r="3" fill="#16a34a" stroke="white" strokeWidth="2" />
      </svg>
    </div>
    <div className="grid grid-cols-5 gap-2 text-xs text-green-700 dark:text-green-300 mt-4 font-medium">
      <div className="text-center">Ene</div>
      <div className="text-center">Feb</div>
      <div className="text-center">Mar</div>
      <div className="text-center">Abr</div>
      <div className="text-center">May</div>
    </div>
  </div>
)

// Componente de gráfico de dona mejorado
const DonutChart = () => (
  <div className="w-full h-64 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 rounded-lg p-4">
    <div className="text-center mb-4">
      <h4 className="font-semibold text-orange-800 dark:text-orange-200">Distribución de Paquetes</h4>
    </div>
    <div className="relative w-32 h-32 mx-auto">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Segmento 1 - Cusco (50%) */}
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="15"
          strokeDasharray="110 220"
          strokeDashoffset="0"
          transform="rotate(-90 50 50)"
        />
        {/* Segmento 2 - Arequipa (32%) */}
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="#10b981"
          strokeWidth="15"
          strokeDasharray="70 220"
          strokeDashoffset="-110"
          transform="rotate(-90 50 50)"
        />
        {/* Segmento 3 - Lima (18%) */}
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="15"
          strokeDasharray="40 220"
          strokeDashoffset="-180"
          transform="rotate(-90 50 50)"
        />
        {/* Centro */}
        <circle cx="50" cy="50" r="20" fill="white" className="shadow-lg" />
        <text x="50" y="55" textAnchor="middle" className="text-xs font-bold" fill="#374151">Total</text>
      </svg>
    </div>
    <div className="grid grid-cols-3 gap-2 text-xs mt-4">
      <div className="text-center">
        <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-1"></div>
        <div className="text-blue-700 dark:text-blue-300 font-medium">Cusco 50%</div>
      </div>
      <div className="text-center">
        <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>
        <div className="text-green-700 dark:text-green-300 font-medium">Arequipa 32%</div>
      </div>
      <div className="text-center">
        <div className="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-1"></div>
        <div className="text-yellow-700 dark:text-yellow-300 font-medium">Lima 18%</div>
      </div>
    </div>
  </div>
)

// Componente de gráfico de radar mejorado
const RadarChart = () => (
  <div className="w-full h-64 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/20 dark:to-indigo-900/20 rounded-lg p-4">
    <div className="text-center mb-4">
      <h4 className="font-semibold text-indigo-800 dark:text-indigo-200">Métricas de Rendimiento</h4>
    </div>
    <div className="relative w-32 h-32 mx-auto">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Círculos concéntricos */}
        <circle cx="50" cy="50" r="40" fill="none" stroke="#a5b4fc" strokeWidth="1" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="#a5b4fc" strokeWidth="1" />
        <circle cx="50" cy="50" r="20" fill="none" stroke="#a5b4fc" strokeWidth="1" />
        <circle cx="50" cy="50" r="10" fill="none" stroke="#a5b4fc" strokeWidth="1" />
        
        {/* Líneas del radar */}
        <line x1="50" y1="10" x2="50" y2="90" stroke="#a5b4fc" strokeWidth="1" />
        <line x1="10" y1="50" x2="90" y2="50" stroke="#a5b4fc" strokeWidth="1" />
        <line x1="20" y1="20" x2="80" y2="80" stroke="#a5b4fc" strokeWidth="1" />
        <line x1="80" y1="20" x2="20" y2="80" stroke="#a5b4fc" strokeWidth="1" />
        
        {/* Datos del radar */}
        <polygon
          points="50,15 65,35 60,50 40,50 35,35"
          fill="#6366f1"
          fillOpacity="0.3"
        />
        <polygon
          points="50,15 65,35 60,50 40,50 35,35"
          fill="none"
          stroke="#6366f1"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Puntos de datos */}
        <circle cx="50" cy="15" r="2" fill="#6366f1" />
        <circle cx="65" cy="35" r="2" fill="#6366f1" />
        <circle cx="60" cy="50" r="2" fill="#6366f1" />
        <circle cx="40" cy="50" r="2" fill="#6366f1" />
        <circle cx="35" cy="35" r="2" fill="#6366f1" />
      </svg>
    </div>
    <div className="grid grid-cols-4 gap-1 text-xs mt-4 text-indigo-700 dark:text-indigo-300 font-medium">
      <div className="text-center">Ventas</div>
      <div className="text-center">Clientes</div>
      <div className="text-center">Satisfacción</div>
      <div className="text-center">Eficiencia</div>
    </div>
  </div>
)

// Componente de gráfico de líneas adicional
const LineChartComponent = () => (
  <div className="w-full h-64 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 rounded-lg p-4">
    <div className="text-center mb-4">
      <h4 className="font-semibold text-red-800 dark:text-red-200">Evolución de Precios</h4>
    </div>
    <div className="relative h-32">
      <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
        {/* Línea principal */}
        <path
          d="M0,30 L25,25 L50,20 L75,15 L100,10"
          stroke="#dc2626"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Línea secundaria */}
        <path
          d="M0,35 L25,30 L50,25 L75,20 L100,15"
          stroke="#f97316"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="5,5"
        />
        {/* Puntos de datos */}
        <circle cx="0" cy="30" r="3" fill="#dc2626" stroke="white" strokeWidth="2" />
        <circle cx="25" cy="25" r="3" fill="#dc2626" stroke="white" strokeWidth="2" />
        <circle cx="50" cy="20" r="3" fill="#dc2626" stroke="white" strokeWidth="2" />
        <circle cx="75" cy="15" r="3" fill="#dc2626" stroke="white" strokeWidth="2" />
        <circle cx="100" cy="10" r="3" fill="#dc2626" stroke="white" strokeWidth="2" />
      </svg>
    </div>
    <div className="grid grid-cols-5 gap-2 text-xs text-red-700 dark:text-red-300 mt-4 font-medium">
      <div className="text-center">Ene</div>
      <div className="text-center">Feb</div>
      <div className="text-center">Mar</div>
      <div className="text-center">Abr</div>
      <div className="text-center">May</div>
    </div>
    <div className="flex justify-center space-x-4 mt-2 text-xs">
      <div className="flex items-center space-x-1">
        <div className="w-3 h-3 bg-red-600 rounded"></div>
        <span>Precio Base</span>
      </div>
      <div className="flex items-center space-x-1">
        <div className="w-3 h-3 bg-orange-500 rounded border-2 border-dashed border-orange-300"></div>
        <span>Precio Promo</span>
      </div>
    </div>
  </div>
)

export default function TrabajadoresPage() {
    return (
        <div className="bg-background p-6 space-y-6">
            {/* Header del Dashboard */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Dashboard de Trabajadores</h1>
                    <p className="text-muted-foreground mt-2">Bienvenido al panel de gestión turística</p>
                </div>
                <div className="flex items-center space-x-2 mt-4 lg:mt-0">
                    <Badge variant="outline" className="text-sm">
                        <Clock className="w-3 h-3 mr-1" />
                        Última actualización: hace 5 min
                    </Badge>
                    <Badge className="bg-green-500 text-white">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Sistema Activo
                    </Badge>
                </div>
            </div>

            {/* KPIs Principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-primary">2,847</div>
                        <div className="flex items-center space-x-2 mt-1">
                            <ArrowUpRight className="w-4 h-4 text-green-500" />
                            <span className="text-xs text-green-600 font-medium">+12%</span>
                            <span className="text-xs text-muted-foreground">desde el mes pasado</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Paquetes Activos</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">156</div>
                        <div className="flex items-center space-x-2 mt-1">
                            <ArrowUpRight className="w-4 h-4 text-green-500" />
                            <span className="text-xs text-green-600 font-medium">+8%</span>
                            <span className="text-xs text-muted-foreground">desde el mes pasado</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Reservas del Mes</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">342</div>
                        <div className="flex items-center space-x-2 mt-1">
                            <ArrowUpRight className="w-4 h-4 text-green-500" />
                            <span className="text-xs text-green-600 font-medium">+23%</span>
                            <span className="text-xs text-muted-foreground">desde el mes pasado</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ingresos del Mes</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-600">S/ 89,432</div>
                        <div className="flex items-center space-x-2 mt-1">
                            <ArrowUpRight className="w-4 h-4 text-green-500" />
                            <span className="text-xs text-green-600 font-medium">+18%</span>
                            <span className="text-xs text-muted-foreground">desde el mes pasado</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Gráficos Estadísticos Avanzados */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <BarChart className="h-5 w-5 text-primary" />
                            <span>Reservas por Mes y Destino</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <StackedBarChart />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <PieChart className="h-5 w-5 text-primary" />
                            <span>Gráfico de Espiral</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <SpiralChart />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <AreaChart className="h-5 w-5 text-primary" />
                            <span>Gráfico de Área</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <AreaChartComponent />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <LineChart className="h-5 w-5 text-primary" />
                            <span>Gráfico de Dona</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DonutChart />
                    </CardContent>
                </Card>
            </div>

            {/* Gráficos Adicionales */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Gráfico de Radar */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <BarChart3 className="h-5 w-5 text-primary" />
                            <span>Gráfico de Radar - Métricas de Rendimiento</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RadarChart />
                    </CardContent>
                </Card>

                {/* Gráfico de Líneas */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <TrendingUp className="h-5 w-5 text-primary" />
                            <span>Gráfico de Líneas - Evolución de Precios</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <LineChartComponent />
                    </CardContent>
                </Card>
            </div>

            {/* Métricas de Cotizaciones */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Target className="h-5 w-5 text-primary" />
                            <span>Rendimiento de Cotizaciones</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {/* Tasa de Éxito */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium">Tasa de Éxito</span>
                                    <span className="text-sm font-bold text-green-600">78.5%</span>
                                </div>
                                <Progress value={78.5} className="h-3" />
                                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                                    <span>Éxitos: 1,256</span>
                                    <span>Total: 1,600</span>
                                </div>
                            </div>

                            {/* Cotizaciones por Estado */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                                    <div className="text-2xl font-bold text-green-600">1,256</div>
                                    <div className="text-xs text-green-600 font-medium">Aceptadas</div>
                                </div>
                                <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                                    <div className="text-2xl font-bold text-yellow-600">234</div>
                                    <div className="text-xs text-yellow-600 font-medium">Pendientes</div>
                                </div>
                                <div className="text-center p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                                    <div className="text-2xl font-bold text-red-600">110</div>
                                    <div className="text-xs text-red-600 font-medium">Rechazadas</div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Top Trabajadores */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Award className="h-5 w-5 text-primary" />
                            <span>Top Trabajadores</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { name: "María González", sales: 89, rating: 4.9, change: "+12%" },
                                { name: "Carlos Ruiz", sales: 76, rating: 4.8, change: "+8%" },
                                { name: "Ana Martínez", sales: 65, rating: 4.7, change: "+15%" },
                                { name: "Luis Pérez", sales: 58, rating: 4.6, change: "+5%" },
                                { name: "Sofia López", sales: 52, rating: 4.5, change: "+3%" }
                            ].map((worker, index) => (
                                <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                                            index === 0 ? 'bg-yellow-500' : 
                                            index === 1 ? 'bg-gray-400' : 
                                            index === 2 ? 'bg-amber-600' : 'bg-blue-500'
                                        }`}>
                                            {index + 1}
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium">{worker.name}</div>
                                            <div className="flex items-center space-x-1">
                                                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                                <span className="text-xs text-muted-foreground">{worker.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-bold">{worker.sales} ventas</div>
                                        <div className="text-xs text-green-600">{worker.change}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Paquetes Más Solicitados y Actividad */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Paquetes Más Solicitados */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <MapPin className="h-5 w-5 text-primary" />
                            <span>Paquetes Más Solicitados</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { name: "Cusco Amanecer", destination: "Cusco", requests: 156, percentage: 45, trend: "+12%" },
                                { name: "Arequipa Aventurero", destination: "Arequipa", requests: 98, percentage: 28, trend: "+8%" },
                                { name: "Lima Cosmopolita", destination: "Lima", requests: 62, percentage: 18, trend: "+5%" },
                                { name: "Chachapoyas Extremo", destination: "Chachapoyas", requests: 31, percentage: 9, trend: "+15%" }
                            ].map((pkg, index) => (
                                <div key={index} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-4 h-4 rounded-full ${
                                            index === 0 ? 'bg-blue-500' : 
                                            index === 1 ? 'bg-green-500' : 
                                            index === 2 ? 'bg-yellow-500' : 'bg-purple-500'
                                        }`}></div>
                                        <div>
                                            <div className="text-sm font-medium">{pkg.name}</div>
                                            <div className="text-xs text-muted-foreground">{pkg.destination}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-bold">{pkg.requests} solicitudes</div>
                                        <div className="text-xs text-green-600">{pkg.trend}</div>
                                        <div className="text-xs text-muted-foreground">{pkg.percentage}% del total</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Actividad Reciente */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Activity className="h-5 w-5 text-primary" />
                            <span>Actividad Reciente</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { action: "Nueva reserva para 'Cusco Amanecer'", time: "Hace 2 min", type: "success" as const, icon: CheckCircle },
                                { action: "Cliente registrado: María González", time: "Hace 15 min", type: "info" as const, icon: Users },
                                { action: "Paquete 'Arequipa Aventurero' actualizado", time: "Hace 1 hora", type: "warning" as const, icon: Package },
                                { action: "Nueva tarifa agregada para temporada alta", time: "Hace 2 horas", type: "info" as const, icon: DollarSign },
                                { action: "Cotización rechazada por cliente", time: "Hace 3 horas", type: "error" as const, icon: XCircle },
                                { action: "Meta mensual alcanzada al 85%", time: "Hace 4 horas", type: "success" as const, icon: Target }
                            ].map((activity, index) => {
                                const IconComponent = activity.icon;
                                const colorClasses = {
                                    success: "text-green-500 bg-green-50 dark:bg-green-950/20",
                                    info: "text-blue-500 bg-blue-50 dark:bg-blue-950/20",
                                    warning: "text-yellow-500 bg-yellow-50 dark:bg-yellow-950/20",
                                    error: "text-red-500 bg-red-50 dark:bg-red-950/20"
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
    )
}   