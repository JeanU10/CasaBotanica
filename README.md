<div align="center">

# Casa Botánica

### Una experiencia digital para un hotel boutique donde naturaleza, diseño y hospitalidad se encuentran.

![Astro](https://img.shields.io/badge/Astro-5-BC52EE?style=flat-square&logo=astro&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Responsive](https://img.shields.io/badge/Diseño-Responsive-C89C52?style=flat-square)

</div>

![Presentación de Casa Botánica](docs/screenshots/home.jpg)

## Sobre el proyecto

**Casa Botánica** es una experiencia web responsive para un hotel boutique ficticio. El proyecto combina una estética editorial de lujo con un recorrido de reserva claro y funcional: descubrir el hotel, comparar habitaciones, personalizar la estadía, ingresar los datos del huésped y revisar la confirmación.

La interfaz toma como inspiración la arquitectura mediterránea, la naturaleza y la iluminación cálida. Su sistema visual se construye alrededor del verde bosque, superficies marfil, acentos dorados, fotografía inmersiva y tipografías elegantes.

> Proyecto frontend demostrativo. Los datos de huéspedes, precios y pagos son ficticios y no se procesan transacciones reales.

## Experiencia visual

### Descubrimiento y habitaciones

La landing presenta la identidad del hotel, su propuesta de valor, habitaciones destacadas, experiencias locales y un buscador de disponibilidad integrado.

![Catálogo de habitaciones](docs/screenshots/rooms.jpg)

### Flujo de reserva

El proceso mantiene la misma línea visual y acompaña al huésped mediante pasos claros, resúmenes persistentes y llamadas a la acción consistentes.

![Flujo de reserva de Casa Botánica](docs/screenshots/booking.jpg)

## Funcionalidades

- Landing inmersiva con hero fotográfico y navegación traslúcida.
- Buscador de disponibilidad responsive.
- Catálogo de habitaciones con filtros y ordenamiento visual.
- Detalle completo de la Suite Botánica.
- Selección de experiencias y servicios adicionales.
- Formulario de datos del huésped.
- Interfaz de pago demostrativa.
- Confirmación con resumen y número de reserva.
- Navegación móvil y componentes reutilizables.
- Animaciones sutiles con soporte para `prefers-reduced-motion`.
- Diseño comprobado sin desbordamiento horizontal en móviles.

## Recorrido del usuario

```text
Portada
   ↓
Habitaciones disponibles
   ↓
Detalle de habitación
   ↓
Experiencias adicionales
   ↓
Datos del huésped
   ↓
Pago
   ↓
Confirmación
```

## Rutas disponibles

| Ruta | Vista |
| --- | --- |
| `/` | Landing principal |
| `/habitaciones` | Catálogo y disponibilidad |
| `/habitaciones/suite-botanica` | Detalle de Suite Botánica |
| `/reserva/experiencias` | Experiencias adicionales |
| `/reserva/datos` | Datos del huésped |
| `/reserva/pago` | Método de pago |
| `/reserva/confirmacion` | Confirmación de reserva |

## Sistema de diseño

| Elemento | Uso |
| --- | --- |
| Verde bosque `#0B2F24` | Navegación, botones y elementos de confianza |
| Marfil `#F7F4EE` | Fondo principal y superficies cálidas |
| Dorado `#C89C52` | Estados activos, etiquetas y detalles de marca |
| Cormorant Garamond | Titulares editoriales |
| Manrope | Navegación, formularios y contenido funcional |

Las vistas internas reutilizan encabezados fotográficos con degradado, superficies crema, estados dorados y tarjetas suaves para conservar una identidad consistente durante todo el recorrido.

## Tecnologías

- [Astro 5](https://astro.build/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- TypeScript
- HTML semántico
- JavaScript nativo

## Instalación local

Requiere Node.js 20 o superior y pnpm.

```bash
git clone https://github.com/JeanU10/CasaBotanica.git
cd CasaBotanica
pnpm install
pnpm dev
```

El servidor estará disponible normalmente en `http://localhost:4321`.

## Comandos

```bash
# Desarrollo
pnpm dev

# Verificación de Astro y compilación
pnpm build

# Previsualizar el build estático
pnpm preview
```

## Estructura principal

```text
src/
├── components/
│   ├── PublicHeader.astro
│   ├── ReservationSummary.astro
│   └── Stepper.astro
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── habitaciones/
│   ├── reserva/
│   └── index.astro
└── styles/
    └── global.css
```

## Build de producción

```bash
pnpm build
```

Astro genera el sitio estático optimizado dentro de `dist/`.

---

<div align="center">
  Diseñado y desarrollado como una experiencia conceptual para Casa Botánica.
</div>
