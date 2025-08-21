"use client"

import { useState } from 'react'
import { 
  Users, 
  Package, 
  Calendar, 
  Settings, 
  HelpCircle, 
  BarChart3, 
  FileText, 
  CreditCard,
  ChevronRight,
  Home
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface SidebarItem {
  id: string
  label: string
  icon: React.ReactNode
  href: string
  badge?: string
  isActive?: boolean
  subItems?: Omit<SidebarItem, 'subItems'>[]
}

export const TrabajadoresSidebar = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const sidebarItems: SidebarItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <Home className="w-4 h-4" />,
      href: '/trabajadores',
      isActive: true
    },
    {
      id: 'clientes',
      label: 'Gestión de Clientes',
      icon: <Users className="w-4 h-4" />,
      href: '/trabajadores/clientes',
      badge: '12',
      subItems: [
        { id: 'lista-clientes', label: 'Lista de Clientes', icon: <Users className="w-4 h-4" />, href: '/trabajadores/clientes/lista' },
        { id: 'nuevo-cliente', label: 'Nuevo Cliente', icon: <Users className="w-4 h-4" />, href: '/trabajadores/clientes/nuevo' }
      ]
    },
    {
      id: 'paquetes',
      label: 'Paquetes Turísticos',
      icon: <Package className="w-4 h-4" />,
      href: '/trabajadores/paquetes',
      badge: '8',
      subItems: [
        { id: 'lista-paquetes', label: 'Lista de Paquetes', icon: <Package className="w-4 h-4" />, href: '/trabajadores/paquetes/lista' },
        { id: 'nuevo-paquete', label: 'Crear Paquete', icon: <Package className="w-4 h-4" />, href: '/trabajadores/paquetes/nuevo' }
      ]
    },
    {
      id: 'cotizaciones',
      label: 'Cotizaciones',
      icon: <Calendar className="w-4 h-4" />,
      href: '/trabajadores/cotizaciones',
      badge: '25',
      subItems: [
        { id: 'lista-cotizaciones', label: 'Todas las Cotizaciones', icon: <Calendar className="w-4 h-4" />, href: '/trabajadores/cotizaciones/lista' },
        { id: 'nueva-cotizacion', label: 'Nueva Cotización', icon: <Calendar className="w-4 h-4" />, href: '/trabajadores/cotizaciones/nueva' }
      ]
    },
    {
      id: 'finanzas',
      label: 'Finanzas',
      icon: <CreditCard className="w-4 h-4" />,
      href: '/trabajadores/finanzas',
      subItems: [
        { id: 'ingresos', label: 'Ingresos', icon: <BarChart3 className="w-4 h-4" />, href: '/trabajadores/finanzas/ingresos' },
        { id: 'gastos', label: 'Gastos', icon: <FileText className="w-4 h-4" />, href: '/trabajadores/finanzas/gastos' }
      ]
    },
    {
      id: 'configuracion',
      label: 'Configuración',
      icon: <Settings className="w-4 h-4" />,
      href: '/trabajadores/configuracion'
    },
    {
      id: 'ayuda',
      label: 'Ayuda',
      icon: <HelpCircle className="w-4 h-4" />,
      href: '/trabajadores/ayuda'
    }
  ]

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const renderSidebarItem = (item: SidebarItem) => {
    const isExpanded = expandedItems.includes(item.id)
    const hasSubItems = item.subItems && item.subItems.length > 0

    return (
      <div key={item.id} className="space-y-1">
        <Button
          variant={item.isActive ? "default" : "ghost"}
          className={`w-full justify-between h-10 px-3 ${
            item.isActive 
              ? "bg-primary text-primary-foreground hover:bg-primary/90" 
              : "text-foreground hover:bg-accent hover:text-accent-foreground"
          }`}
          onClick={() => hasSubItems ? toggleExpanded(item.id) : undefined}
        >
          <div className="flex items-center space-x-3">
            {item.icon}
            <span className="text-sm font-medium">{item.label}</span>
          </div>
          <div className="flex items-center space-x-2">
            {item.badge && (
              <Badge variant="secondary" className="text-xs">
                {item.badge}
              </Badge>
            )}
            {hasSubItems && (
              <ChevronRight 
                className={`w-4 h-4 transition-transform duration-200 ${
                  isExpanded ? 'rotate-90' : ''
                }`} 
              />
            )}
          </div>
        </Button>

        {/* Sub-items */}
        {hasSubItems && isExpanded && (
          <div className="ml-4 space-y-1">
            {item.subItems!.map((subItem) => (
              <Button
                key={subItem.id}
                variant="ghost"
                className="w-full justify-start h-8 px-3 text-xs text-muted-foreground hover:text-foreground hover:bg-accent"
              >
                {subItem.icon}
                <span className="ml-2">{subItem.label}</span>
              </Button>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="w-64 bg-card border-r border-border h-full overflow-y-auto">
      <div className="p-4 space-y-4">
        {/* Header del Sidebar */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Panel de Trabajadores</h3>
                <p className="text-xs text-muted-foreground">Gestión del Sistema</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Navegación */}
        <nav className="space-y-2">
          {sidebarItems.map(renderSidebarItem)}
        </nav>

        {/* Footer del Sidebar */}
        <div className="pt-4">
          <Separator className="mb-4" />
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Sistema de Gestión Turística
            </p>
            <p className="text-xs text-muted-foreground">
              v2.1.0
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrabajadoresSidebar
