# Casa Botánica — Hotel Boutique

Sitio web responsive para **Casa Botánica**, un hotel boutique ficticio. El proyecto reproduce una experiencia digital cálida y editorial mediante una paleta verde bosque, superficies marfil, acentos dorados, fotografía inmersiva y un flujo completo de reserva.

## Vista general

El sitio incluye una landing pública y las principales pantallas del proceso de reserva:

- Portada con hero, disponibilidad, historia, habitaciones y experiencias.
- Catálogo de habitaciones con filtros responsive.
- Detalle de la Suite Botánica.
- Selección de servicios y experiencias adicionales.
- Formulario de datos del huésped.
- Pantalla de pago.
- Confirmación y resumen de la reserva.

## Tecnologías

- [Astro](https://astro.build/) 5
- [Tailwind CSS](https://tailwindcss.com/) 4
- TypeScript
- HTML semántico y JavaScript nativo

## Rutas

| Ruta | Descripción |
| --- | --- |
| `/` | Landing principal |
| `/habitaciones` | Habitaciones disponibles |
| `/habitaciones/suite-botanica` | Detalle de habitación |
| `/reserva/experiencias` | Servicios adicionales |
| `/reserva/datos` | Datos del huésped |
| `/reserva/pago` | Método de pago |
| `/reserva/confirmacion` | Confirmación de reserva |

## Instalación

Requiere Node.js 20 o superior y pnpm.

```bash
pnpm install
pnpm dev
```

El servidor de desarrollo estará disponible normalmente en `http://localhost:4321`.

## Comandos

```bash
# Desarrollo
pnpm dev

# Verificación de Astro y compilación de producción
pnpm build

# Previsualizar el build
pnpm preview
```

## Estructura

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

## Sistema visual

- **Verde bosque:** navegación, botones y elementos de confianza.
- **Marfil:** fondo principal y superficies cálidas.
- **Dorado:** estados activos, etiquetas y detalles de marca.
- **Cormorant Garamond:** titulares editoriales.
- **Manrope:** navegación, formularios y textos funcionales.

Las vistas utilizan encabezados traslúcidos con desenfoque, fotografía con degradados y componentes adaptativos. El flujo fue comprobado en escritorio y móvil sin desbordamiento horizontal.

## Build de producción

El proyecto genera un sitio estático en `dist/`:

```bash
pnpm build
```

## Nota

Las imágenes se cargan desde Unsplash y los datos de habitaciones, huéspedes y pagos son demostrativos. No existe procesamiento real de reservas ni transacciones.

