"use client"

import { Suspense } from 'react'
import { DetallePaqueteContent } from './detalle-paquete-content'

export default function DetallePaquetePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando detalles del paquete...</p>
        </div>
      </div>
    }>
      <DetallePaqueteContent />
    </Suspense>
  )
}
