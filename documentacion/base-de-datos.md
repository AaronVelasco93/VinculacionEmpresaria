Base de Datos
Diagrama de relaciones
TipoEspacio         Grupo
    │                 │
    └────┐     ┌──────┘
         ▼     ▼
        Espacio ──────────────────────────┐
                                          │
User ─────────────────────────────► Reporte
 │
 ├── Account   (NextAuth)
 ├── Session   (NextAuth)
Modelos
User
Tabla de usuarios del sistema. Incluye los campos requeridos por el adaptador de NextAuth v5.

Campo	Tipo	Descripción
id	String (cuid)	PK — identificador único
name	String?	Nombre del usuario
email	String (unique)	Correo electrónico
emailVerified	DateTime?	Fecha de verificación de email
image	String?	URL de foto de perfil
password	String?	Hash bcrypt de la contraseña
role	Role	Rol: STAFF, ADMIN o TECNICO
createdAt	DateTime	Fecha de creación
updatedAt	DateTime	Última actualización
Enum Role:

STAFF    → Personal que crea reportes
ADMIN    → Administrador con acceso completo
TECNICO  → Técnico que atiende reportes asignados
TipoEspacio
Catálogo de tipos de espacio (aulas, baños, laboratorios, etc.).

Campo	Tipo	Descripción
id	Int (autoincrement)	PK
nombre	String (100)	Nombre del tipo
Datos iniciales (seed):

Aulas
Baños
Laboratorios
Áreas Comunes
Oficinas
Grupo
Edificios o agrupaciones de espacios.

Campo	Tipo	Descripción
id	Int (autoincrement)	PK
nombre	String (100)	Nombre del edificio/grupo
Datos iniciales (seed):

Edificio A
Edificio B
Edificio C
Pabellón Principal
Espacio
Espacio específico dentro de un grupo/edificio.

Campo	Tipo	Descripción
id	Int (autoincrement)	PK
espacio	String (100)	Nombre del espacio (ej. "Aula 101")
idGrupo	Int (FK)	Referencia a Grupo
idTipoEspacio	Int (FK)	Referencia a TipoEspacio
Reporte
Reporte de inspección de una instalación. Modelo central del sistema.

Campo	Tipo	Descripción
id	Int (autoincrement)	PK
fechaCreacion	DateTime	Timestamp automático al crear
fechaInspeccion	DateTime	Fecha de la inspección (elegida en el formulario)
nombreSolicitante	String (50)	Nombre de quien reporta
tipoUbicacion	String (50)	Tipo de ubicación seleccionado
idEspacio	Int (FK)	Referencia a Espacio
descripcion	String? (500)	Comentarios del solicitante
estado	EstadoReporte	Estado actual del reporte
areaResponsable	String? (50)	Área asignada para atención
observaciones	String? (500)	Notas técnicas del técnico
fechaAtencion	DateTime?	Cuándo se inició la atención
fechaResolucion	DateTime?	Cuándo se marcó como resuelto
evaluacion	Json?	Criterios de evaluación (ver estructura abajo)
urlImagenes	String[]	URLs de imágenes en Cloudinary
isDraft	Boolean	true si es borrador sin enviar
creadoPorId	String? (FK)	Referencia a User
Enum EstadoReporte:

PENDIENTE   → Recién creado, sin atención
EN_PROCESO  → Atención iniciada
ATENDIDO    → Reporte resuelto
Estructura del campo evaluacion (JSON):

{
  limpieza:    1 | 2 | 3 | 4 | 5,  // Calificación de limpieza
  seguridad:   1 | 2 | 3 | 4 | 5,  // Calificación de seguridad
  iluminacion: boolean,              // ¿Iluminación funcional?
  equipo:      boolean               // ¿Equipo en buen estado?
}
Índices de la tabla Reporte:

@@index([estado])
@@index([tipoUbicacion])
@@index([fechaCreacion])
Account, Session, VerificationToken
Modelos requeridos por el adaptador Prisma de NextAuth v5. No se usan directamente en la aplicación.

Transiciones de estado
Los reportes siguen un flujo de estados unidireccional:

PENDIENTE ──► EN_PROCESO ──► ATENDIDO
Al pasar a EN_PROCESO se registra automáticamente fechaAtencion. Al pasar a ATENDIDO se registra automáticamente fechaResolucion.

El campo transicionesEstado en src/lib/utils/statusUtils.ts define las transiciones válidas:

export const transicionesEstado: Record<EstadoReporte, EstadoReporte[]> = {
  PENDIENTE:  ["EN_PROCESO"],
  EN_PROCESO: ["ATENDIDO"],
  ATENDIDO:   [],
};
Schema Prisma completo
// prisma/schema.prisma

generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String?
  role          Role      @default(STAFF)
  accounts      Account[]
  sessions      Session[]
  reportes      Reporte[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

enum Role { STAFF ADMIN TECNICO }

model TipoEspacio {
  id       Int       @id @default(autoincrement())
  nombre   String    @db.VarChar(100)
  espacios Espacio[]
}

model Grupo {
  id       Int       @id @default(autoincrement())
  nombre   String    @db.VarChar(100)
  espacios Espacio[]
}

model Espacio {
  id            Int         @id @default(autoincrement())
  espacio       String      @db.VarChar(100)
  idGrupo       Int
  idTipoEspacio Int
  grupo         Grupo       @relation(fields: [idGrupo], references: [id])
  tipoEspacio   TipoEspacio @relation(fields: [idTipoEspacio], references: [id])
  reportes      Reporte[]
}

model Reporte {
  id                Int           @id @default(autoincrement())
  fechaCreacion     DateTime      @default(now())
  fechaInspeccion   DateTime
  nombreSolicitante String        @db.VarChar(50)
  tipoUbicacion     String        @db.VarChar(50)
  idEspacio         Int
  descripcion       String?       @db.VarChar(500)
  estado            EstadoReporte @default(PENDIENTE)
  areaResponsable   String?       @db.VarChar(50)
  observaciones     String?       @db.VarChar(500)
  fechaAtencion     DateTime?
  fechaResolucion   DateTime?
  evaluacion        Json?
  urlImagenes       String[]
  isDraft           Boolean       @default(false)

  espacio     Espacio @relation(fields: [idEspacio], references: [id])
  creadoPor   User?   @relation(fields: [creadoPorId], references: [id])
  creadoPorId String?

  @@index([estado])
  @@index([tipoUbicacion])
  @@index([fechaCreacion])
}

enum EstadoReporte { PENDIENTE EN_PROCESO ATENDIDO }
Comandos de base de datos
# Aplicar schema sin migraciones (desarrollo)
npm run db:push

# Regenerar el cliente Prisma
npm run db:generate

# Abrir Prisma Studio (GUI visual)
npm run db:studio

# Ejecutar seed
npm run db:seed

# Conectar directamente con psql
docker exec -it faciltrack-db-1 psql -U faciltrack -d faciltrack
