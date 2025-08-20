"use client"

import { useState } from 'react'
import { 
  DollarSign, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Plus,
  MapPin,
  Clock,
  Building,
  Calendar
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { tarifas, operadores, destinos, temporadas, monedas, rangosTarifas } from '@/utils/mockdata-tarifas'


const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const TarifasTable = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [operadorFilter, setOperadorFilter] = useState<string>('todos')
  const [destinoFilter, setDestinoFilter] = useState<string>('todos')
  const [temporadaFilter, setTemporadaFilter] = useState<string>('todos')
  const [rangoFilter, setRangoFilter] = useState<string>('todos')

  const getTemporadaBadge = (temporada: string) => {
    const variants = {
      'Alta': 'bg-red-100 text-red-800 border-red-200',
      'Media': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Baja': 'bg-green-100 text-green-800 border-green-200'
    }
    
    return (
      <Badge className={`${variants[temporada as keyof typeof variants]} border`}>
        {temporada}
      </Badge>
    )
  }

  const getRangoBadge = (tarifa: number) => {
    const rango = rangosTarifas.find(r => tarifa >= r.min && tarifa <= r.max)
    if (!rango) return null

    const variants = {
      'Económico': 'bg-green-100 text-green-800 border-green-200',
      'Medio': 'bg-blue-100 text-blue-800 border-blue-200',
      'Alto': 'bg-orange-100 text-orange-800 border-orange-200',
      'Premium': 'bg-purple-100 text-purple-800 border-purple-200'
    }
    
    return (
      <Badge className={`${variants[rango.label as keyof typeof variants]} border`}>
        {rango.label}
      </Badge>
    )
  }

  const filteredTarifas = tarifas.filter(tarifa => {
    const matchesSearch = tarifa.nombreTour.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tarifa.operador.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesOperador = operadorFilter === 'todos' || tarifa.operador === operadorFilter
    const matchesDestino = destinoFilter === 'todos' || tarifa.destino === destinoFilter
    const matchesTemporada = temporadaFilter === 'todos' || tarifa.temporada === temporadaFilter
    
    let matchesRango = true
    if (rangoFilter !== 'todos') {
      const rango = rangosTarifas.find(r => r.label === rangoFilter)
      if (rango) {
        matchesRango = tarifa.tarifa >= rango.min && tarifa.tarifa <= rango.max
      }
    }
    
    return matchesSearch && matchesOperador && matchesDestino && matchesTemporada && matchesRango
  })

  const limpiarFiltros = () => {
    setSearchTerm('')
    setOperadorFilter('todos')
    setDestinoFilter('todos')
    setTemporadaFilter('todos')
    setRangoFilter('todos')
  }

  const totalTarifas = tarifas.reduce((sum, t) => sum + t.tarifa, 0)
  const promedioTarifas = Math.round(totalTarifas / tarifas.length)

  return (
    <div className="space-y-6">
      {/* Header y Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-primary" />
            <span>Gestión de Tarifas</span>
            <Badge variant="secondary" className="ml-2">
              {filteredTarifas.length} tarifas
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por tour o operador..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-border bg-background text-foreground"
              />
            </div>
            
            <Select value={operadorFilter} onValueChange={setOperadorFilter}>
              <SelectTrigger className="w-full lg:w-40 border-border bg-background text-foreground">
                <SelectValue placeholder="Operador" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los operadores</SelectItem>
                {operadores.map(operador => (
                  <SelectItem key={operador} value={operador}>{operador}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={destinoFilter} onValueChange={setDestinoFilter}>
              <SelectTrigger className="w-full lg:w-40 border-border bg-background text-foreground">
                <SelectValue placeholder="Destino" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los destinos</SelectItem>
                {destinos.map(destino => (
                  <SelectItem key={destino} value={destino}>{destino}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={temporadaFilter} onValueChange={setTemporadaFilter}>
              <SelectTrigger className="w-full lg:w-32 border-border bg-background text-foreground">
                <SelectValue placeholder="Temporada" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas las temporadas</SelectItem>
                {temporadas.map(temporada => (
                  <SelectItem key={temporada} value={temporada}>{temporada}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={rangoFilter} onValueChange={setRangoFilter}>
              <SelectTrigger className="w-full lg:w-32 border-border bg-background text-foreground">
                <SelectValue placeholder="Rango" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los rangos</SelectItem>
                {rangosTarifas.map(rango => (
                  <SelectItem key={rango.label} value={rango.label}>{rango.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
            <Button 
              variant="outline" 
              onClick={limpiarFiltros}
              className="border-border hover:bg-accent hover:text-accent-foreground"
            >
              <Filter className="w-4 h-4 mr-2" />
              Limpiar Filtros
            </Button>
            
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Nueva Tarifa
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de Tarifas */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Tour</TableHead>
                <TableHead>Operador</TableHead>
                <TableHead>Destino</TableHead>
                <TableHead>Duración</TableHead>
                <TableHead>Temporada</TableHead>
                <TableHead>Tarifa</TableHead>
                <TableHead>Rango</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTarifas.map((tarifa) => (
                <TableRow key={tarifa.id} className="hover:bg-muted/30">
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">{tarifa.nombreTour}</div>
                      {tarifa.descripcion && (
                        <div className="text-sm text-muted-foreground line-clamp-2">
                          {tarifa.descripcion}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Building className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm text-foreground">{tarifa.operador}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm text-foreground">{tarifa.destino}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm text-foreground">{tarifa.duracion}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    {getTemporadaBadge(tarifa.temporada || '')}
                  </TableCell>
                  
                  <TableCell>
                    <div className="font-medium text-foreground">
                      {tarifa.tipoMoneda} {formatNumber(tarifa.tarifa)}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    {getRangoBadge(tarifa.tarifa)}
                  </TableCell>
                  
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Resumen */}
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{tarifas.length}</div>
              <div className="text-sm text-muted-foreground">Total Tarifas</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {tarifas.filter(t => t.temporada === 'Alta').length}
              </div>
              <div className="text-sm text-muted-foreground">Temporada Alta</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                USD {formatNumber(promedioTarifas)}
              </div>
              <div className="text-sm text-muted-foreground">Promedio</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                USD {formatNumber(totalTarifas)}
              </div>
              <div className="text-sm text-muted-foreground">Valor Total</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TarifasTable
