"use client"

import { Suspense } from 'react'
import { DetallesAlojamientosContent } from './detalles-alojamientos-content'

export default function DetallesAlojamientosPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando detalles del alojamiento...</p>
        </div>
      </div>
    }>
      <DetallesAlojamientosContent />
    </Suspense>
  )
}
