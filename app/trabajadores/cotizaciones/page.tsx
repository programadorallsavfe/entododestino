"use client"

import { CotizacionesTable } from '../components/cotizaciones-table'

export default function CotizacionesPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Gestión de Cotizaciones</h1>
        <p className="text-muted-foreground mt-2">
          Administra y da seguimiento a todas las cotizaciones de paquetes turísticos
        </p>
      </div>
      
      <CotizacionesTable />
    </div>
  )
}
