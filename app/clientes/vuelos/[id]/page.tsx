"use client"

import { useParams } from 'next/navigation'
import DetallesVuelosPage from '../../detalles-vuelos/page'

export default function VueloDetallesPage() {
  const params = useParams()
  const vueloId = params.id as string
  
  // Pasar el ID del vuelo a la página de detalles
  return <DetallesVuelosPage vueloId={vueloId} />
}
