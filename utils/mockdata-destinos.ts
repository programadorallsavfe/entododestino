export interface Destination {
  id: string
  name: string
  lat: number
  lng: number
  type: 'start' | 'destination' | 'end'
  image?: string
  description?: string
}

export const destinosEjemplo: Destination[] = [
  {
    id: '1',
    name: 'Cusco',
    lat: -13.5167,
    lng: -71.9789,
    type: 'start',
    image: '/assets/banner.jpg',
    description: 'Capital histórica del Imperio Inca, conocida por Machu Picchu y su arquitectura colonial'
  },
  {
    id: '2',
    name: 'Arequipa',
    lat: -16.4090,
    lng: -71.5375,
    type: 'destination',
    image: '/assets/banner.jpg',
    description: 'Ciudad blanca del Perú, rodeada de volcanes y con arquitectura colonial única'
  },
  {
    id: '3',
    name: 'Lima',
    lat: -12.0464,
    lng: -77.0428,
    type: 'destination',
    image: '/assets/banner.jpg',
    description: 'Capital del Perú, centro gastronómico y cultural de América Latina'
  },
  {
    id: '4',
    name: 'Chachapoyas',
    lat: -6.2294,
    lng: -77.8694,
    type: 'destination',
    image: '/assets/banner.jpg',
    description: 'Tierra de los guerreros de las nubes, con fortalezas preincaicas impresionantes'
  },
  {
    id: '5',
    name: 'Puno',
    lat: -15.8402,
    lng: -70.0219,
    type: 'end',
    image: '/assets/banner.jpg',
    description: 'Capital del folklore peruano, ubicada a orillas del majestuoso Lago Titicaca'
  }
]

export const rutaCuscoArequipa: Destination[] = [
  {
    id: '1',
    name: 'Cusco',
    lat: -13.5167,
    lng: -71.9789,
    type: 'start',
    image: '/assets/banner.jpg',
    description: 'Inicio del viaje en la capital inca'
  },
  {
    id: '2',
    name: 'Arequipa',
    lat: -16.4090,
    lng: -71.5375,
    type: 'end',
    image: '/assets/banner.jpg',
    description: 'Destino final en la ciudad blanca'
  }
]

export const rutaCompletaPeru: Destination[] = [
  {
    id: '1',
    name: 'Lima',
    lat: -12.0464,
    lng: -77.0428,
    type: 'start',
    image: '/assets/banner.jpg',
    description: 'Inicio en la capital gastronómica'
  },
  {
    id: '2',
    name: 'Cusco',
    lat: -13.5167,
    lng: -71.9789,
    type: 'destination',
    image: '/assets/banner.jpg',
    description: 'Explorando la capital inca'
  },
  {
    id: '3',
    name: 'Arequipa',
    lat: -16.4090,
    lng: -71.5375,
    type: 'destination',
    image: '/assets/banner.jpg',
    description: 'Descubriendo la ciudad blanca'
  },
  {
    id: '4',
    name: 'Puno',
    lat: -15.8402,
    lng: -70.0219,
    type: 'end',
    image: '/assets/banner.jpg',
    description: 'Finalizando en el lago sagrado'
  }
]
