API Reference
Todos los endpoints requieren autenticación. Las peticiones sin sesión activa retornan 401 No autorizado.

Base URL en desarrollo: http://localhost:3000/api

Reportes
GET /api/reportes
Lista paginada de reportes. Solo retorna reportes que no son borradores (isDraft: false).

Query params:

Param	Tipo	Descripción
estado	PENDIENTE | EN_PROCESO | ATENDIDO	Filtrar por estado
tipoUbicacion	string	Filtrar por tipo de ubicación
fechaDesde	YYYY-MM-DD	Fecha mínima de creación
fechaHasta	YYYY-MM-DD	Fecha máxima de creación
page	number	Página (default: 1)
pageSize	number	Registros por página (default: 10, max: 50)
Respuesta:

{
  "data": [
    {
      "id": 1,
      "fechaCreacion": "2026-03-29T10:00:00.000Z",
      "fechaInspeccion": "2026-03-29T00:00:00.000Z",
      "nombreSolicitante": "María García",
      "tipoUbicacion": "Aulas",
      "estado": "PENDIENTE",
      "descripcion": "Luminaria dañada",
      "urlImagenes": [],
      "espacio": {
        "espacio": "Aula 101",
        "grupo": { "nombre": "Edificio A" },
        "tipoEspacio": { "nombre": "Aulas" }
      }
    }
  ],
  "total": 48,
  "page": 1,
  "pageSize": 10
}
POST /api/reportes
Crea un nuevo reporte.

Body:

{
  "nombreSolicitante": "María García",
  "fechaInspeccion": "2026-03-29",
  "tipoUbicacion": "Aulas",
  "idEspacio": 1,
  "descripcion": "Luminaria dañada en esquina derecha",
  "evaluacion": {
    "limpieza": 4,
    "seguridad": 3,
    "iluminacion": false,
    "equipo": true
  },
  "urlImagenes": ["https://res.cloudinary.com/..."],
  "isDraft": false
}
Respuesta: 201 Created con el objeto Reporte creado.

GET /api/reportes/[id]
Retorna un reporte por ID con todas sus relaciones.

Respuesta:

{
  "id": 1,
  "fechaCreacion": "...",
  "fechaInspeccion": "...",
  "nombreSolicitante": "...",
  "tipoUbicacion": "Aulas",
  "estado": "PENDIENTE",
  "areaResponsable": null,
  "observaciones": null,
  "fechaAtencion": null,
  "fechaResolucion": null,
  "evaluacion": { "limpieza": 4, "seguridad": 3, "iluminacion": false, "equipo": true },
  "urlImagenes": [],
  "espacio": {
    "espacio": "Aula 101",
    "grupo": { "id": 1, "nombre": "Edificio A" },
    "tipoEspacio": { "id": 1, "nombre": "Aulas" }
  },
  "creadoPor": { "name": "María García", "email": "staff@faciltrack.local" }
}
Errores:

404 si el reporte no existe
PATCH /api/reportes/[id]
Actualiza el estado y/o información de atención de un reporte.

Body (todos los campos son opcionales):

{
  "estado": "EN_PROCESO",
  "areaResponsable": "Electricidad",
  "observaciones": "Se revisará el sistema eléctrico del aula"
}
Comportamiento automático:

Al cambiar estado a EN_PROCESO → se asigna fechaAtencion = now()
Al cambiar estado a ATENDIDO → se asigna fechaResolucion = now()
Respuesta: Objeto Reporte actualizado con sus relaciones.

DELETE /api/reportes/[id]
Elimina un reporte permanentemente.

Requiere rol: ADMIN

Respuesta: { "ok": true }

Catálogos
GET /api/tipos-espacio
Lista todos los tipos de espacio ordenados por nombre.

Respuesta:

[
  { "id": 1, "nombre": "Aulas" },
  { "id": 4, "nombre": "Áreas Comunes" },
  { "id": 2, "nombre": "Baños" },
  { "id": 6, "nombre": "Laboratorios" },
  { "id": 5, "nombre": "Oficinas" }
]
GET /api/grupos
Lista todos los grupos/edificios ordenados por nombre.

Respuesta:

[
  { "id": 1, "nombre": "Edificio A" },
  { "id": 2, "nombre": "Edificio B" },
  { "id": 3, "nombre": "Edificio C" },
  { "id": 4, "nombre": "Pabellón Principal" }
]
GET /api/espacios
Lista espacios con filtros opcionales.

Query params:

Param	Tipo	Descripción
idGrupo	number	Filtrar por edificio/grupo
idTipoEspacio	number	Filtrar por tipo de espacio
Respuesta:

[
  {
    "id": 1,
    "espacio": "Aula 101",
    "idGrupo": 1,
    "idTipoEspacio": 1,
    "grupo": { "id": 1, "nombre": "Edificio A" },
    "tipoEspacio": { "id": 1, "nombre": "Aulas" }
  }
]
Usado en el formulario para los selects en cascada: tipo → grupo → espacio.

Estadísticas
GET /api/stats
Retorna métricas para las tarjetas del dashboard.

Respuesta:

{
  "total": 248,
  "pendientes": 24,
  "enProceso": 12,
  "atendidos": 212,
  "atendidosRecientes": 18
}
atendidosRecientes = reportes atendidos en los últimos 7 días.

Upload
POST /api/upload
Genera una firma para subir una imagen directamente a Cloudinary desde el cliente.

Body:

{
  "folder": "faciltrack/reportes",
  "publicId": "opcional-id-personalizado"
}
Respuesta:

{
  "uploadUrl": "https://api.cloudinary.com/v1_1/[cloud]/image/upload",
  "signature": "sha1-hash",
  "apiKey": "tu-api-key",
  "timestamp": 1711700000,
  "folder": "faciltrack/reportes",
  "cloudName": "tu-cloud-name"
}
El cliente usa estos datos para hacer un POST multipart/form-data directamente a Cloudinary sin pasar los archivos por el servidor Next.js.

Si Cloudinary no está configurado (en desarrollo), retorna uploadUrl: undefined y el cliente usa URL.createObjectURL() como fallback.

Autenticación
GET /api/auth/[...nextauth]
POST /api/auth/[...nextauth]
Manejados automáticamente por NextAuth v5. Incluye:

GET /api/auth/session — datos de la sesión actual
POST /api/auth/signin/credentials — inicio de sesión
POST /api/auth/signout — cerrar sesión
GET /api/auth/csrf — token CSRF
