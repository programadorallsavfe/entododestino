# Reglas de Código - Proyecto Turismo

## 📏 Límites y Estructura

### Límite de Líneas
- **MÁXIMO 500 líneas por archivo**
- Si un archivo supera este límite, dividir en componentes más pequeños
- Mantener archivos enfocados en una sola responsabilidad

### Estructura de Archivos
```
components/
  ui/           # Componentes base de shadcn/ui
  feature/      # Componentes específicos de funcionalidad
  layout/       # Componentes de layout y navegación
  forms/        # Componentes de formularios
  administradores/  # Componentes específicos del contexto de administradores
  clientes/         # Componentes específicos del contexto de clientes
  trabajadores/     # Componentes específicos del contexto de trabajadores
```

## 🎨 UI y Estilos

### Componentes UI
- **Siempre usar shadcn/ui como base** para componentes estándar
- Importar desde `@/components/ui/` para componentes base
- Crear componentes personalizados solo cuando sea necesario

### Organización por Contexto de Dominio
- **Crear componentes en la carpeta correspondiente al contexto:**
  - `@/components/administradores/` para componentes específicos de administradores
  - `@/components/clientes/` para componentes específicos de clientes  
  - `@/components/trabajadores/` para componentes específicos de trabajadores
- Componentes genéricos van en `@/components/ui/` o `@/components/feature/`
- Mantener separación clara entre contextos de dominio

### Tailwind CSS
- **Usar exclusivamente Tailwind CSS** para estilos
- Importar siempre `@globals.css` para variables CSS personalizadas
- Aprovechar el sistema de diseño con variables CSS definidas
- Usar clases utilitarias de Tailwind en lugar de CSS personalizado

### Tema
- Implementar soporte completo para tema claro/oscuro
- Usar variables CSS del tema para colores y espaciados
- Asegurar que todos los componentes funcionen en ambos temas

### Contraste y Legibilidad
- **Siempre usar colores con contraste adecuado** para garantizar legibilidad
- Texto principal: usar colores oscuros (slate-700, slate-800, teal-700, teal-800)
- Texto secundario: usar colores medios (slate-600, teal-600)
- Fondos claros: usar colores claros pero con suficiente contraste
- Evitar combinaciones de colores claros sobre fondos claros
- Cumplir con estándares WCAG para contraste de colores
- Usar `font-medium` o `font-bold` para mejorar legibilidad del texto

## 🏗️ Principios SOLID

### Single Responsibility Principle (SRP)
- **Cada componente debe tener UNA ÚNICA responsabilidad**
- Si un componente hace más de una cosa, dividirlo
- Nombres de componentes deben reflejar su responsabilidad específica

### Open/Closed Principle (OCP)
- Componentes abiertos para extensión, cerrados para modificación
- Usar props y children para personalización
- Evitar modificar componentes existentes

### Liskov Substitution Principle (LSP)
- Componentes deben ser intercambiables sin romper funcionalidad
- Props interfaces consistentes entre componentes similares

### Interface Segregation Principle (ISP)
- Props interfaces pequeñas y específicas
- Evitar props opcionales innecesarias
- Separar interfaces por responsabilidad

### Dependency Inversion Principle (DIP)
- Depender de abstracciones, no de implementaciones concretas
- Usar contextos y hooks para inyección de dependencias

## 🧹 Código Limpio

### Nomenclatura
- **Variables y funciones en inglés**
- **Contenido de UI en español** (orientado al usuario final)
- Nombres descriptivos y autoexplicativos
- Prefijos para eventos: `handleClick`, `handleSubmit`, `handleChange`

### Estructura de Componentes
```typescript
// ✅ Estructura recomendada
const ComponentName = ({ prop1, prop2 }: ComponentProps) => {
  // 1. Hooks y estado
  // 2. Funciones auxiliares
  // 3. Renderizado
  return (...)
}

// ❌ Evitar funciones tradicionales
function ComponentName() { ... }
```

### Imports y Dependencias
- Imports organizados por tipo (React, librerías externas, internos)
- Usar imports absolutos con `@/` cuando sea posible
- Evitar imports innecesarios

### Props y Tipos
- Definir interfaces TypeScript para todas las props
- Props opcionales solo cuando sea necesario
- Usar tipos específicos en lugar de `any`

## 📱 Responsive Design

### Mobile First
- **Diseñar primero para móvil** - Prioridad absoluta
- Usar breakpoints de Tailwind: `sm:`, `md:`, `lg:`, `xl:`
- Hook `useIsMobile` para lógica específica de móvil

### Responsividad Obligatoria
- **TODOS los componentes DEBEN ser responsive por defecto**
- **OBLIGATORIO**: Usar el hook `useIsMobile` para lógica específica de móvil
- **OBLIGATORIO**: Implementar breakpoints responsive en todos los componentes
- **OBLIGATORIO**: Testear en todos los tamaños de pantalla (320px - 1920px+)
- **OBLIGATORIO**: Usar clases responsive de Tailwind en cada elemento
- **OBLIGATORIO**: Considerar navegación móvil y touch-friendly
- **OBLIGATORIO**: Asegurar que el contenido sea legible en pantallas pequeñas

### Breakpoints
```css
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
```

### Implementación de Responsividad
```typescript
// ✅ OBLIGATORIO: Usar useIsMobile en todos los componentes
import { useIsMobile } from "@/hooks/use-mobile"

const MyComponent = () => {
  const isMobile = useIsMobile()
  
  return (
    <div className={`
      grid grid-cols-1 
      ${isMobile ? 'gap-4 p-4' : 'md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'}
    `}>
      {/* Contenido responsive */}
    </div>
  )
}

// ✅ OBLIGATORIO: Clases responsive de Tailwind
<div className="
  text-sm md:text-base lg:text-lg 
  p-4 md:p-6 lg:p-8
  grid-cols-1 md:grid-cols-2 lg:grid-cols-3
">
```

### Ejemplos de Responsividad Obligatoria
- **Grids**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- **Espaciado**: `p-4 md:p-6 lg:p-8`
- **Tipografía**: `text-sm md:text-base lg:text-lg`
- **Navegación**: `hidden md:flex` para menús móviles
- **Imágenes**: `w-full md:w-auto` para adaptabilidad

## 🔧 Hooks y Estado

### Hooks Personalizados
- Crear hooks para lógica reutilizable
- Un hook por archivo
- Nombres descriptivos: `useUserData`, `useFormValidation`

### Estado
- Usar `useState` para estado local simple
- `useReducer` para estado complejo
- Context API para estado global compartido

## 📝 Formularios

### Validación
- Validación en tiempo real cuando sea posible
- Mensajes de error claros y en español
- Usar librerías como `react-hook-form` con `zod` para validación

### Accesibilidad
- Labels asociados con inputs
- Mensajes de error asociados con campos
- Navegación por teclado completa

## ♿ Accesibilidad

### Estándares
- Cumplir con WCAG 2.1 AA
- Roles ARIA apropiados
- Contraste de colores adecuado
- Navegación por teclado

### Componentes
- Todos los componentes interactivos deben ser accesibles
- Usar componentes de shadcn/ui que ya incluyen accesibilidad
- Testear con lectores de pantalla

## 🧪 Testing y Calidad

### Testing
- Componentes deben ser testables
- Props interfaces claras para testing
- Evitar lógica compleja en componentes

### Performance
- Evitar re-renders innecesarios
- Lazy loading para componentes pesados
- Optimizar imports y bundles

## 📚 Librerías y Dependencias

### Core
- React 18+
- Next.js 14+
- TypeScript 5+
- Tailwind CSS
- shadcn/ui

### Evitar
- CSS-in-JS
- Librerías de estilos alternativas
- Componentes que dupliquen funcionalidad de shadcn/ui

## 🚫 Anti-patrones

### No Hacer
- Archivos de más de 500 líneas
- Componentes con múltiples responsabilidades
- CSS personalizado fuera de Tailwind
- Imports de librerías no autorizadas
- Lógica de negocio en componentes UI
- **Componentes NO responsive** - OBLIGATORIO que sean responsive
- **No usar useIsMobile** - OBLIGATORIO para lógica móvil
- **Ignorar breakpoints** - OBLIGATORIO implementar responsive design

### Ejemplos de Violaciones
```typescript
// ❌ Componente con múltiples responsabilidades
const UserDashboard = () => {
  // Maneja usuarios, posts, comentarios, etc.
}

// ✅ Componentes separados por responsabilidad
const UserProfile = () => { /* Solo perfil de usuario */ }
const UserPosts = () => { /* Solo posts del usuario */ }
const UserComments = () => { /* Solo comentarios del usuario */ }
```

## 📋 Checklist de Revisión

Antes de commitear, verificar:
- [ ] Archivo no supera 500 líneas
- [ ] Componente tiene una sola responsabilidad
- [ ] Usa shadcn/ui cuando sea posible
- [ ] Estilos con Tailwind CSS
- [ ] Props interfaces definidas
- [ ] Soporte para tema claro/oscuro
- [ ] Contraste de colores adecuado para legibilidad
- [ ] Responsive design implementado
- [ ] Hook useIsMobile implementado para lógica móvil
- [ ] Breakpoints responsive en todos los elementos
- [ ] Testeado en múltiples tamaños de pantalla
- [ ] Accesibilidad verificada
- [ ] Nombres en inglés para código
- [ ] Contenido UI en español
- [ ] Principios SOLID aplicados
- [ ] Código limpio y legible
- [ ] Componente ubicado en la carpeta correcta del contexto de dominio

## 🔄 Refactoring

### Cuándo Refactorizar
- Archivo supera 500 líneas
- Componente tiene múltiples responsabilidades
- Props interface muy compleja
- Lógica de negocio en componentes UI
- Componente ubicado en carpeta incorrecta del contexto de dominio

### Cómo Refactorizar
1. Identificar responsabilidades separadas
2. Crear nuevos componentes
3. Extraer hooks personalizados
4. Simplificar props interfaces
5. Mantener funcionalidad existente
6. Mover componentes a la carpeta correcta del contexto de dominio

---

**Recuerda: Código simple, limpio y mantenible es mejor que código complejo y "inteligente".**
