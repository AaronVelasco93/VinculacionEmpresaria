Arquitectura del Proyecto
Stack tecnológico
Capa	Tecnología	Versión
Framework	Next.js (App Router)	16.2.1
Lenguaje	TypeScript	5.x
Base de datos	PostgreSQL (Docker local)	16
ORM	Prisma	6.x
Autenticación	NextAuth.js v5 beta	5.0.0-beta.30
Estado global	Zustand (con persist)	5.x
Formularios	react-hook-form + Zod	7.x / 4.x
UI Components	shadcn/ui (new-york, neutral)	—
Styling	Tailwind CSS v4 (OKLCH)	4.x
Iconos	Lucide React	1.x
Tema	next-themes (class strategy)	0.4.x
Exportación	xlsx (SheetJS)	0.18.x
Imágenes	Cloudinary	2.x
Estructura de directorios
faciltrack/
├── prisma/
│   ├── schema.prisma          # Schema de la base de datos
│   └── seed.ts                # Datos de prueba iniciales
│
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/            # Grupo de rutas sin sidebar
│   │   │   └── login/
│   │   ├── (dashboard)/       # Grupo de rutas con sidebar + header
│   │   │   ├── layout.tsx     # AppShell: sidebar + header
│   │   │   ├── dashboard/
│   │   │   ├── reportes/
│   │   │   │   ├── nuevo/
│   │   │   │   └── [id]/
│   │   │   ├── edificios/
│   │   │   ├── personal/
│   │   │   └── analiticas/
│   │   ├── api/               # API Routes
│   │   │   ├── auth/[...nextauth]/
│   │   │   ├── reportes/
│   │   │   ├── espacios/
│   │   │   ├── grupos/
│   │   │   ├── tipos-espacio/
│   │   │   ├── stats/
│   │   │   └── upload/
│   │   ├── layout.tsx         # Root layout: ThemeProvider, fuentes
│   │   ├── page.tsx           # Redirige a /dashboard
│   │   ├── error.tsx          # Error boundary global
│   │   └── not-found.tsx      # Página 404
│   │
│   ├── components/
│   │   ├── ui/                # Primitivos shadcn/ui + componentes compartidos
│   │   ├── layout/            # Sidebar, Header, Breadcrumb, ThemeToggle
│   │   ├── dashboard/         # Componentes del panel principal
│   │   ├── reportes/          # Formulario de inspección y secciones
│   │   └── detalle/           # Vista de detalle del reporte
│   │
│   ├── lib/
│   │   ├── auth.ts            # Configuración NextAuth (Node.js)
│   │   ├── prisma.ts          # Singleton del cliente Prisma
│   │   ├── cloudinary.ts      # Configuración Cloudinary SDK
│   │   ├── utils.ts           # Función cn() de Tailwind
│   │   ├── validations/       # Schemas Zod
│   │   └── utils/             # Utilidades (fechas, export, estados)
│   │
│   ├── store/                 # Stores Zustand
│   ├── types/                 # Augmentación de tipos TypeScript
│   └── generated/             # Código generado por Prisma (no editar)
│
├── auth.config.ts             # Config NextAuth edge-safe (sin Prisma)
├── middleware.ts              # Protección de rutas
├── docker-compose.yml
└── .env / .env.example
Decisiones de arquitectura
Route Groups
Se usan dos route groups de Next.js App Router:

(auth) — rutas sin layout de app (solo la página de login)
(dashboard) — rutas con el AppShell (sidebar + header), requieren autenticación
NextAuth v5 — split de configuración
NextAuth v5 beta requiere separar la configuración en dos archivos para soportar el Edge Runtime en el middleware:

auth.config.ts          ← Edge-safe (sin imports Node.js)
                           Define: páginas, callbacks de JWT/session, authorized()
src/lib/auth.ts         ← Node.js only
                           Define: PrismaAdapter, Credentials provider (bcrypt)
middleware.ts           ← Usa auth.config.ts para proteger rutas
Prisma 6 — cliente generado
Prisma 6 genera el cliente en una carpeta personalizada en lugar de node_modules/@prisma/client. El path de importación es:

import { PrismaClient } from "@/generated/prisma/client";
No usar @prisma/client directamente.

Evaluación como JSON
Los criterios de evaluación del reporte (limpieza, seguridad, iluminación, equipo) se almacenan como un campo Json en la tabla Reporte en lugar de una tabla de criterios separada. Esto es intencional porque:

Los criterios son fijos y definidos por el formulario
Evita joins innecesarios
Permite añadir criterios sin migraciones de schema
// Estructura del campo evaluacion
{
  limpieza: 1-5,      // StarRating
  seguridad: 1-5,     // StarRating
  iluminacion: bool,  // Toggle
  equipo: bool        // Toggle
}
Imágenes como array
Las URLs de imágenes se almacenan como String[] (array nativo de PostgreSQL) en lugar de una tabla separada ReporteImagen. Apropiado mientras el número de imágenes sea pequeño.

Zustand con persist parcial
useUIStore persiste solo sidebarCollapsed en localStorage. Los filtros del dashboard se reinician al recargar la página intencionalmente.

partialize: (state) => ({ sidebarCollapsed: state.sidebarCollapsed })
Compatibilidad Zod v4 con react-hook-form
Zod v4 diferencia entre tipos de entrada y salida. Para evitar errores de TypeScript, los campos del schema no deben usar .default() — los valores por defecto se definen en useForm({ defaultValues: ... }).

Flujo de datos — Dashboard
DashboardPage (Server Component)
  ├── getStats() → Prisma directo → StatsGrid
  └── <DashboardClient /> (Client Component)
        ├── useUIStore (filtros reactivos)
        ├── useEffect → fetch /api/reportes?filtros
        ├── → ReportsTable
        └── → TablePagination
Flujo de datos — Formulario
/reportes/nuevo (Server Component)
  └── <ReporteForm /> (Client Component)
        ├── useReporteFormStore (draft en localStorage)
        ├── react-hook-form + zodResolver
        ├── UbicacionSection → fetch /api/tipos-espacio, /api/grupos, /api/espacios
        ├── ImageUploadSection → POST /api/upload → Cloudinary
        └── onSubmit → POST /api/reportes → redirect /reportes/[id]
Flujo de datos — Detalle del reporte
/reportes/[id] (Server Component)
  ├── prisma.reporte.findUnique() → datos iniciales
  ├── <ReporteHeader />, <InfoGrid />, <EvaluacionChecklist />, <ImageGallery />
  └── <EstadoSidebar /> (Client Component)
        ├── <AsignarTareaModal />
        │     └── PATCH /api/reportes/[id]
        └── router.refresh() → re-fetch datos del server
