# Sistema de Imágenes en el Mapa - Turismo

## 🎯 Descripción

Sistema implementado para mostrar imágenes en cada nodo/ubicación del mapa, permitiendo una visualización más atractiva e informativa de los destinos turísticos.

## 🖼️ Características de las Imágenes

### **Marcadores con Imágenes**
- **Tamaño**: 48x48 píxeles (circulares)
- **Borde**: 3px blanco con sombra
- **Hover**: Efecto de escala 110%
- **Fallback**: Si falla la imagen, usa `/assets/banner.jpg`

### **Tipos de Marcadores**
- **🟢 Inicio (Verde)**: Punto de partida del viaje
- **🔵 Destino (Azul)**: Paradas intermedias numeradas
- **🔴 Final (Rojo)**: Punto de llegada

## 🏗️ Implementación Técnica

### **1. Interface Destination**
```typescript
interface Destination {
  id: string
  name: string
  lat: number
  lng: number
  type: 'start' | 'destination' | 'end'
  image?: string        // URL de la imagen del destino
  description?: string  // Descripción del destino
}
```

### **2. Función createImageMarker**
```typescript
const createImageMarker = (dest: Destination, index: number) => {
  // Crea marcador personalizado con imagen
  if (dest.image) {
    return L.divIcon({
      className: 'custom-image-marker',
      html: `<div class="w-12 h-12 rounded-full overflow-hidden">
        <img src="${dest.image}" alt="${dest.name}" />
      </div>`
    })
  }
  // Marcador por defecto sin imagen
}
```

### **3. Popups Mejorados**
- **Imagen**: Muestra la imagen del destino
- **Nombre**: Título del destino
- **Tipo**: Badge con color según tipo
- **Descripción**: Información adicional del destino

## 📁 Estructura de Archivos

```
app/clientes/components/
├── SimpleMap.tsx                    # Componente principal del mapa
├── MapaConImagenesDemo.tsx          # Componente de demostración
└── panel-izquierdo-constructor-itinerario.tsx

utils/
└── mockdata-destinos.ts             # Datos de ejemplo con imágenes

app/
└── globals.css                      # Estilos CSS personalizados
```

## 🎨 Estilos CSS Personalizados

### **Marcadores de Imagen**
```css
.custom-image-marker {
  background: transparent !important;
  border: none !important;
}

.custom-image-marker img {
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease;
}
```

### **Popups**
```css
.custom-popup {
  border-radius: 12px !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12) !important;
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
}
```

## 📊 Datos de Ejemplo

### **Destinos Principales del Perú**
```typescript
export const destinosEjemplo: Destination[] = [
  {
    id: '1',
    name: 'Cusco',
    lat: -13.5167,
    lng: -71.9789,
    type: 'start',
    image: '/assets/banner.jpg',
    description: 'Capital histórica del Imperio Inca'
  },
  // ... más destinos
]
```

### **Rutas Predefinidas**
- **`rutaCuscoArequipa`**: Ruta simple de 2 destinos
- **`rutaCompletaPeru`**: Ruta completa de 4 destinos

## 🚀 Uso del Sistema

### **1. Crear Destino con Imagen**
```typescript
const nuevoDestino: Destination = {
  id: '1',
  name: 'Lima',
  lat: -12.0464,
  lng: -77.0428,
  type: 'start',
  image: '/assets/banner.jpg',
  description: 'Capital del Perú'
}
```

### **2. Pasar al Mapa**
```typescript
<SimpleMap destinations={destinations} className="h-96" />
```

### **3. Resultado Visual**
- ✅ Marcadores circulares con imágenes
- ✅ Popups informativos con imágenes
- ✅ Líneas con flechas entre destinos
- ✅ Efectos hover y transiciones suaves

## 🔧 Personalización

### **Cambiar Imagen por Destino**
```typescript
// En mockdata-destinos.ts
{
  name: 'Cusco',
  image: '/assets/cusco.jpg',  // Imagen específica
  // ... otras propiedades
}
```

### **Modificar Estilos de Marcadores**
```css
/* En globals.css */
.custom-image-marker img {
  border-radius: 50%;
  border: 4px solid #1605ac;  // Color personalizado
  box-shadow: 0 6px 20px rgba(22, 5, 172, 0.3);
}
```

## 📱 Responsive Design

- **Marcadores**: Se adaptan a diferentes tamaños de pantalla
- **Popups**: Responsivos con ancho máximo de 250px
- **Imágenes**: Mantienen proporción en todos los dispositivos

## 🎯 Beneficios

1. **Visualización Atractiva**: Mapas más interesantes y profesionales
2. **Información Enriquecida**: Cada destino muestra imagen y descripción
3. **Experiencia de Usuario**: Navegación más intuitiva y visual
4. **Personalización**: Fácil de adaptar a diferentes necesidades
5. **Fallback Robusto**: Sistema de respaldo para imágenes faltantes

## 🔍 Solución de Problemas

### **Imagen No Se Muestra**
- Verificar que la ruta `/assets/banner.jpg` existe
- Comprobar que la propiedad `image` está definida en el destino
- Revisar la consola del navegador para errores de carga

### **Marcadores No Aparecen**
- Verificar que `destinations.length >= 2`
- Comprobar que las coordenadas lat/lng son válidas
- Revisar que el mapa se inicializa correctamente

---

**Nota**: Este sistema está diseñado para ser simple, mantenible y escalable, siguiendo las mejores prácticas de React y TypeScript.
