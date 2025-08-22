"use client";

import { useState, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Search, 
  Filter, 
  Plus, 
  Globe, 
  Plane, 
  Hotel, 
  Car, 
  Activity,
  CheckCircle,
  XCircle,
  AlertCircle,
  ExternalLink,
  Settings,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  Database,
  MoreHorizontal,
  ChevronRight,
  Star,
  AlertTriangle,
  Info,
  BarChart3,
  Users,
  Activity as ActivityIcon,
  Calendar,
  DollarSign,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface Proveedor {
  id: string;
  nombre: string;
  tipo: 'vuelos' | 'hoteles' | 'traslados' | 'actividades' | 'paquetes';
  categoria: 'premium' | 'estandar' | 'economico';
  estado: 'activo' | 'inactivo' | 'mantenimiento';
  apiKey: string;
  endpoint: string;
  version: string;
  uptime: number;
  latencia: number;
  precioPorConsulta: number;
  consultasPorMes: number;
  limiteMensual: number;
  ultimaActualizacion: string;
  documentacion: string;
  soporte: string;
  caracteristicas: string[];
  calificacion: number;
  regiones: string[];
}

interface FiltrosState {
  tipo: string;
  estado: string;
  categoria: string;
  busqueda: string;
}

interface Estadisticas {
  total: number;
  activos: number;
  premium: number;
  uptimePromedio: number;
  consultasTotales: number;
  ingresosEstimados: number;
}

// ============================================================================
// CONSTANTS & CONFIGURATION
// ============================================================================

const TIPOS_SERVICIO = [
  { value: 'todos', label: 'Todos los tipos', icon: Database },
  { value: 'vuelos', label: 'Vuelos', icon: Plane },
  { value: 'hoteles', label: 'Hoteles', icon: Hotel },
  { value: 'traslados', label: 'Traslados', icon: Car },
  { value: 'actividades', label: 'Actividades', icon: ActivityIcon },
  { value: 'paquetes', label: 'Paquetes', icon: Globe }
] as const;

const ESTADOS = [
  { value: 'todos', label: 'Todos los estados', color: 'text-muted-foreground' },
  { value: 'activo', label: 'Activo', color: 'text-green-600' },
  { value: 'inactivo', label: 'Inactivo', color: 'text-red-600' },
  { value: 'mantenimiento', label: 'Mantenimiento', color: 'text-yellow-600' }
] as const;

const CATEGORIAS = [
  { value: 'todos', label: 'Todas las categorías', color: 'text-muted-foreground' },
  { value: 'premium', label: 'Premium', color: 'text-purple-600' },
  { value: 'estandar', label: 'Estándar', color: 'text-blue-600' },
  { value: 'economico', label: 'Económico', color: 'text-orange-600' }
] as const;

// ============================================================================
// MOCK DATA
// ============================================================================

const PROVEEDORES_MOCK: Proveedor[] = [
  {
    id: '1',
    nombre: 'Amadeus Flight API',
    tipo: 'vuelos',
    categoria: 'premium',
    estado: 'activo',
    apiKey: 'amadeus_****_****_****',
    endpoint: 'https://api.amadeus.com/v2',
    version: '2.0.0',
    uptime: 99.8,
    latencia: 120,
    precioPorConsulta: 0.15,
    consultasPorMes: 1500000,
    limiteMensual: 2000000,
    ultimaActualizacion: '2024-01-15 14:30:00',
    documentacion: 'https://developers.amadeus.com',
    soporte: '24/7 Premium Support',
    caracteristicas: ['Búsqueda en tiempo real', 'Reservas', 'Precios históricos', 'Alertas de precio'],
    calificacion: 4.8,
    regiones: ['Global', 'Europa', 'América', 'Asia', 'África', 'Oceanía']
  },
  {
    id: '2',
    nombre: 'Sabre Flight Search',
    tipo: 'vuelos',
    categoria: 'premium',
    estado: 'activo',
    apiKey: 'sabre_****_****_****',
    endpoint: 'https://api.sabre.com/v1',
    version: '1.5.2',
    uptime: 99.5,
    latencia: 180,
    precioPorConsulta: 0.12,
    consultasPorMes: 1200000,
    limiteMensual: 1500000,
    ultimaActualizacion: '2024-01-14 09:15:00',
    documentacion: 'https://developer.sabre.com',
    soporte: 'Business Hours Support',
    caracteristicas: ['Búsqueda avanzada', 'Filtros múltiples', 'Comparación de precios'],
    calificacion: 4.6,
    regiones: ['América del Norte', 'Europa', 'Asia']
  },
  {
    id: '3',
    nombre: 'Booking.com Hotels API',
    tipo: 'hoteles',
    categoria: 'premium',
    estado: 'activo',
    apiKey: 'booking_****_****_****',
    endpoint: 'https://api.booking.com/v1',
    version: '1.8.0',
    uptime: 99.9,
    latencia: 95,
    precioPorConsulta: 0.08,
    consultasPorMes: 2500000,
    limiteMensual: 3000000,
    ultimaActualizacion: '2024-01-15 16:45:00',
    documentacion: 'https://developers.booking.com',
    soporte: '24/7 Enterprise Support',
    caracteristicas: ['Reservas instantáneas', 'Fotos HD', 'Reviews', 'Mapas interactivos'],
    calificacion: 4.9,
    regiones: ['Global']
  }
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const getTipoIcon = (tipo: string) => {
  const iconMap = {
    vuelos: <Plane className="w-4 h-4" />,
    hoteles: <Hotel className="w-4 h-4" />,
    traslados: <Car className="w-4 h-4" />,
    actividades: <ActivityIcon className="w-4 h-4" />,
    paquetes: <Globe className="w-4 h-4" />
  };
  return iconMap[tipo as keyof typeof iconMap] || <Database className="w-4 h-4" />;
};

const getEstadoColor = (estado: string) => {
  const colorMap = {
    activo: 'bg-green-100 text-green-800 border-green-200',
    inactivo: 'bg-red-100 text-red-800 border-red-200',
    mantenimiento: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  };
  return colorMap[estado as keyof typeof colorMap] || 'bg-gray-100 text-gray-800 border-gray-200';
};

const getCategoriaColor = (categoria: string) => {
  const colorMap = {
    premium: 'bg-purple-100 text-purple-800 border-purple-200',
    estandar: 'bg-blue-100 text-blue-800 border-blue-200',
    economico: 'bg-orange-100 text-orange-800 border-orange-200'
  };
  return colorMap[categoria as keyof typeof colorMap] || 'bg-gray-100 text-gray-800 border-gray-200';
};

const getUptimeColor = (uptime: number) => {
  if (uptime >= 99.5) return 'text-green-600';
  if (uptime >= 98.0) return 'text-yellow-600';
  return 'text-red-600';
};

const getLatenciaColor = (latencia: number) => {
  if (latencia <= 100) return 'text-green-600';
  if (latencia <= 200) return 'text-yellow-600';
  return 'text-red-600';
};

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('es-ES').format(num);
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

const useProveedores = () => {
  const [proveedores] = useState<Proveedor[]>(PROVEEDORES_MOCK);
  
  const estadisticas = useMemo((): Estadisticas => {
    const total = proveedores.length;
    const activos = proveedores.filter(p => p.estado === 'activo').length;
    const premium = proveedores.filter(p => p.categoria === 'premium').length;
    const uptimePromedio = Math.round(
      proveedores.reduce((acc, p) => acc + p.uptime, 0) / proveedores.length * 10
    ) / 10;
    const consultasTotales = proveedores.reduce((acc, p) => acc + p.consultasPorMes, 0);
    const ingresosEstimados = proveedores.reduce((acc, p) => acc + (p.consultasPorMes * p.precioPorConsulta), 0);
    
    return { total, activos, premium, uptimePromedio, consultasTotales, ingresosEstimados };
  }, [proveedores]);
  
  return { proveedores, estadisticas };
};

const useFiltros = () => {
  const [filtros, setFiltros] = useState<FiltrosState>({
    tipo: 'todos',
    estado: 'todos',
    categoria: 'todos',
    busqueda: ''
  });
  
  const actualizarFiltro = useCallback((campo: keyof FiltrosState, valor: string) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  }, []);
  
  const limpiarFiltros = useCallback(() => {
    setFiltros({
      tipo: 'todos',
      estado: 'todos',
      categoria: 'todos',
      busqueda: ''
    });
  }, []);
  
  return { filtros, actualizarFiltro, limpiarFiltros };
};

const useProveedoresFiltrados = (proveedores: Proveedor[], filtros: FiltrosState) => {
  return useMemo(() => {
    return proveedores.filter(proveedor => {
      const cumpleTipo = filtros.tipo === 'todos' || proveedor.tipo === filtros.tipo;
      const cumpleEstado = filtros.estado === 'todos' || proveedor.estado === filtros.estado;
      const cumpleCategoria = filtros.categoria === 'todos' || proveedor.categoria === filtros.categoria;
      const cumpleBusqueda = proveedor.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
                             proveedor.tipo.toLowerCase().includes(filtros.busqueda.toLowerCase());
      
      return cumpleTipo && cumpleEstado && cumpleCategoria && cumpleBusqueda;
    });
  }, [proveedores, filtros]);
};

// ============================================================================
// COMPONENTS
// ============================================================================

const PageHeader = () => (
  <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border">
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
              <Database className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Gestión de Proveedores</h1>
              <p className="text-lg text-muted-foreground">
                Administra y monitorea las APIs de servicios turísticos
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" size="lg" className="border-border hover:bg-muted">
            <RefreshCw className="w-5 h-5 mr-2" />
            Actualizar Datos
          </Button>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
            <Plus className="w-5 h-5 mr-2" />
            Nuevo Proveedor
          </Button>
        </div>
      </div>
    </div>
  </div>
);

const FiltrosAvanzados = ({ filtros, actualizarFiltro, limpiarFiltros }: {
  filtros: FiltrosState;
  actualizarFiltro: (campo: keyof FiltrosState, valor: string) => void;
  limpiarFiltros: () => void;
}) => (
  <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
    <div className="flex items-center gap-2 mb-6">
      <Filter className="w-5 h-5 text-primary" />
      <h2 className="text-lg font-semibold text-foreground">Filtros y Búsqueda</h2>
    </div>
    
    <div className="space-y-6">
      {/* Barra de búsqueda principal */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          placeholder="Buscar proveedores por nombre, tipo o características..."
          value={filtros.busqueda}
          onChange={(e) => actualizarFiltro('busqueda', e.target.value)}
          className="pl-12 pr-4 py-3 text-base border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20"
        />
      </div>
      
      {/* Filtros de categoría */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Tipo de Servicio</label>
          <Select value={filtros.tipo} onValueChange={(valor) => actualizarFiltro('tipo', valor)}>
            <SelectTrigger className="border-border bg-background text-foreground">
              <SelectValue placeholder="Seleccionar tipo" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {TIPOS_SERVICIO.map((tipo) => (
                <SelectItem key={tipo.value} value={tipo.value} className="text-foreground">
                  <div className="flex items-center gap-2">
                    <tipo.icon className="w-4 h-4" />
                    {tipo.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Estado</label>
          <Select value={filtros.estado} onValueChange={(valor) => actualizarFiltro('estado', valor)}>
            <SelectTrigger className="border-border bg-background text-foreground">
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {ESTADOS.map((estado) => (
                <SelectItem key={estado.value} value={estado.value} className="text-foreground">
                  <span className={estado.color}>{estado.label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Categoría</label>
          <Select value={filtros.categoria} onValueChange={(valor) => actualizarFiltro('categoria', valor)}>
            <SelectTrigger className="border-border bg-background text-foreground">
              <SelectValue placeholder="Seleccionar categoría" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {CATEGORIAS.map((categoria) => (
                <SelectItem key={categoria.value} value={categoria.value} className="text-foreground">
                  <span className={categoria.color}>{categoria.label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Acciones de filtros */}
      <div className="flex items-center justify-between pt-2">
        <div className="text-sm text-muted-foreground">
          {filtros.tipo !== 'todos' || filtros.estado !== 'todos' || filtros.categoria !== 'todos' || filtros.busqueda
            ? 'Filtros activos aplicados'
            : 'Sin filtros aplicados'
          }
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={limpiarFiltros}
          className="border-border hover:bg-muted text-foreground"
        >
          <XCircle className="w-4 h-4 mr-2" />
          Limpiar Filtros
        </Button>
      </div>
    </div>
  </div>
);

const DashboardEstadisticas = ({ estadisticas }: { estadisticas: Estadisticas }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-2">
      <BarChart3 className="w-6 h-6 text-primary" />
      <h2 className="text-2xl font-semibold text-foreground">Dashboard de Métricas</h2>
    </div>
    
    {/* Métricas principales en grid */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-card border border-border rounded-lg p-4 text-center hover:shadow-md transition-shadow">
        <div className="p-2 bg-primary/10 rounded-lg w-fit mx-auto mb-3">
          <Database className="w-6 h-6 text-primary" />
        </div>
        <p className="text-2xl font-bold text-foreground">{estadisticas.total}</p>
        <p className="text-sm text-muted-foreground">Total Proveedores</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 text-center hover:shadow-md transition-shadow">
        <div className="p-2 bg-green-100 rounded-lg w-fit mx-auto mb-3">
          <CheckCircle className="w-6 h-6 text-green-600" />
        </div>
        <p className="text-2xl font-bold text-green-600">{estadisticas.activos}</p>
        <p className="text-sm text-muted-foreground">Activos</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 text-center hover:shadow-md transition-shadow">
        <div className="p-2 bg-purple-100 rounded-lg w-fit mx-auto mb-3">
          <Zap className="w-6 h-6 text-purple-600" />
        </div>
        <p className="text-2xl font-bold text-purple-600">{estadisticas.premium}</p>
        <p className="text-sm text-muted-foreground">Premium</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 text-center hover:shadow-md transition-shadow">
        <div className="p-2 bg-blue-100 rounded-lg w-fit mx-auto mb-3">
          <TrendingUp className="w-6 h-6 text-blue-600" />
        </div>
        <p className="text-2xl font-bold text-blue-600">{estadisticas.uptimePromedio}%</p>
        <p className="text-sm text-muted-foreground">Uptime Promedio</p>
      </div>
    </div>

    {/* Métricas adicionales en layout horizontal */}
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Consultas Totales del Mes</p>
          <p className="text-2xl font-bold text-foreground">{formatNumber(estadisticas.consultasTotales)}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Ingresos Estimados</p>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(estadisticas.ingresosEstimados)}</p>
        </div>
       
      </div>
    </div>
  </div>
);

const TablaProveedores = ({ proveedores }: { proveedores: Proveedor[] }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-semibold text-foreground">Proveedores Disponibles</h2>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>{proveedores.length} proveedores encontrados</span>
        <ChevronRight className="w-4 h-4" />
      </div>
    </div>
    
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Proveedor</TableHead>
            <TableHead className="font-semibold">Tipo</TableHead>
            <TableHead className="font-semibold">Estado</TableHead>
            <TableHead className="font-semibold">Uptime</TableHead>
            <TableHead className="font-semibold">Latencia</TableHead>
            <TableHead className="font-semibold">Precio</TableHead>
            <TableHead className="font-semibold">Calificación</TableHead>
            <TableHead className="font-semibold">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {proveedores.map((proveedor) => (
            <TableRow key={proveedor.id} className="hover:bg-muted/30 transition-colors">
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {getTipoIcon(proveedor.tipo)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{proveedor.nombre}</p>
                    <p className="text-sm text-muted-foreground">{proveedor.endpoint}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={getCategoriaColor(proveedor.categoria)}>
                  {proveedor.categoria}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={getEstadoColor(proveedor.estado)}>
                  {proveedor.estado}
                </Badge>
              </TableCell>
              <TableCell>
                <span className={`font-semibold ${getUptimeColor(proveedor.uptime)}`}>
                  {proveedor.uptime}%
                </span>
              </TableCell>
              <TableCell>
                <span className={`font-semibold ${getLatenciaColor(proveedor.latencia)}`}>
                  {proveedor.latencia}ms
                </span>
              </TableCell>
              <TableCell>
                <span className="font-semibold text-foreground">
                  {formatCurrency(proveedor.precioPorConsulta)}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i < Math.floor(proveedor.calificacion)
                          ? 'bg-yellow-400'
                          : 'bg-muted'
                      }`}
                    />
                  ))}
                  <span className="text-sm font-medium text-foreground ml-1">
                    {proveedor.calificacion}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);

const VistaDetallada = ({ proveedores }: { proveedores: Proveedor[] }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-semibold text-foreground">Vista Detallada de Proveedores</h2>
    
    <Accordion type="multiple" className="space-y-3">
      {proveedores.map((proveedor) => (
        <AccordionItem key={proveedor.id} value={proveedor.id} className="border border-border rounded-lg">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-4 w-full">
              <div className="p-2 bg-primary/10 rounded-lg">
                {getTipoIcon(proveedor.tipo)}
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-foreground">{proveedor.nombre}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className={getCategoriaColor(proveedor.categoria)}>
                    {proveedor.categoria}
                  </Badge>
                  <Badge variant="outline" className={getEstadoColor(proveedor.estado)}>
                    {proveedor.estado}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Uptime</p>
                <p className={`font-bold ${getUptimeColor(proveedor.uptime)}`}>
                  {proveedor.uptime}%
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {/* Configuración de API */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  Configuración
                </h4>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">API Key</label>
                    <code className="block text-xs bg-muted text-foreground px-2 py-1 rounded border border-border font-mono mt-1">
                      {proveedor.apiKey}
                    </code>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Versión</label>
                    <Badge variant="secondary" className="bg-secondary text-secondary-foreground mt-1">
                      {proveedor.version}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Métricas de rendimiento */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  Rendimiento
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Latencia:</span>
                    <span className={`font-semibold ${getLatenciaColor(proveedor.latencia)}`}>
                      {proveedor.latencia}ms
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Regiones:</span>
                    <span className="font-semibold text-foreground">{proveedor.regiones.length}</span>
                  </div>
                </div>
              </div>

              {/* Información comercial */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  Comercial
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Precio:</span>
                    <span className="font-semibold text-foreground">
                      {formatCurrency(proveedor.precioPorConsulta)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Consultas:</span>
                    <span className="font-semibold text-foreground">
                      {formatNumber(proveedor.consultasPorMes)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Características */}
            <div className="mt-6 pt-4 border-t border-border">
              <h4 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 text-primary" />
                Características Principales
              </h4>
              <div className="flex flex-wrap gap-2">
                {proveedor.caracteristicas.map((caracteristica, index) => (
                  <Badge key={index} variant="secondary" className="bg-secondary text-secondary-foreground text-xs">
                    {caracteristica}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Acciones */}
            <div className="flex gap-3 mt-6 pt-4 border-t border-border">
              <Button variant="outline" size="sm" className="border-border hover:bg-muted text-foreground">
                <ExternalLink className="w-4 h-4 mr-2" />
                Documentación
              </Button>
              <Button variant="outline" size="sm" className="border-border hover:bg-muted text-foreground">
                <Shield className="w-4 h-4 mr-2" />
                Gestionar API Key
              </Button>
              <Button variant="outline" size="sm" className="border-border hover:bg-muted text-foreground">
                <Settings className="w-4 h-4 mr-2" />
                Configurar
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
);

const EmptyState = () => (
  <div className="bg-card border border-border rounded-lg p-16 text-center">
    <div className="mx-auto w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mb-6">
      <AlertCircle className="w-12 h-12 text-muted-foreground" />
    </div>
    <h3 className="text-2xl font-semibold text-foreground mb-3">
      No se encontraron proveedores
    </h3>
    <p className="text-muted-foreground text-lg mb-6 max-w-md mx-auto">
      Intenta ajustar los filtros o la búsqueda para encontrar proveedores que coincidan con tus criterios.
    </p>
    <Button variant="outline" className="border-border hover:bg-muted text-foreground">
      <Filter className="w-4 h-4 mr-2" />
      Ajustar Filtros
    </Button>
  </div>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ListaProveedoresPage() {
  const { proveedores, estadisticas } = useProveedores();
  const { filtros, actualizarFiltro, limpiarFiltros } = useFiltros();
  const proveedoresFiltrados = useProveedoresFiltrados(proveedores, filtros);

  return (
    <div className="min-h-screen bg-background">
      <PageHeader />
      
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <FiltrosAvanzados 
          filtros={filtros} 
          actualizarFiltro={actualizarFiltro} 
          limpiarFiltros={limpiarFiltros} 
        />
        
        <DashboardEstadisticas estadisticas={estadisticas} />
        
        {proveedoresFiltrados.length > 0 ? (
          <Tabs defaultValue="tabla" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="tabla" className="flex items-center gap-2">
                <Table className="w-4 h-4" />
                Vista de Tabla
              </TabsTrigger>
              <TabsTrigger value="detallada" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Vista Detallada
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="tabla" className="space-y-4">
              <TablaProveedores proveedores={proveedoresFiltrados} />
            </TabsContent>
            
            <TabsContent value="detallada" className="space-y-4">
              <VistaDetallada proveedores={proveedoresFiltrados} />
            </TabsContent>
          </Tabs>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}    