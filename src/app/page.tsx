import { crearReporte } from './actions'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function Home() {
  // RF-13: Consulta de datos para asegurar la trazabilidad de la información
  const reportes = await prisma.reporte.findMany({
    orderBy: { fechaCreacion: 'desc' }
  })

  return (
    <main className="min-h-screen bg-gray-100 p-8 flex flex-col items-center gap-8 text-gray-900">
      
      {/* SECCIÓN DEL FORMULARIO (Captura de Incidencias) */}
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        <h1 className="text-2xl font-bold text-blue-900 mb-1">Módulo de Seguimiento</h1>
        <p className="text-[10px] text-gray-500 mb-6 uppercase tracking-widest font-semibold border-b pb-2">
          Sistema de Gestión de Mantenimiento
        </p>
        
        <form action={crearReporte} className="space-y-4">
          {/* RF-13: Nombre del reportero */}
          <div>
            <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Nombre del Profesor / Administrativo</label>
            <input 
              name="nombre" 
              type="text" 
              required 
              placeholder="Nombre completo"
              className="w-full p-3 bg-white border-2 border-gray-300 rounded-lg focus:border-blue-600 outline-none transition-all font-medium" 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Ubicación (📍)</label>
              <input 
                name="ubicacion" 
                placeholder="Ej. Edificio L" 
                className="w-full p-3 bg-white border-2 border-gray-300 rounded-lg outline-none focus:border-blue-600 font-medium" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Aula (🚪)</label>
              <input 
                name="aula" 
                placeholder="Ej. L-203" 
                className="w-full p-3 bg-white border-2 border-gray-300 rounded-lg outline-none focus:border-blue-600 font-medium" 
              />
            </div>
          </div>

          {/* RB-16: Lista de Evaluación Predefinida */}
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
            <label className="block text-xs font-bold uppercase text-blue-800 mb-3 text-center">Lista de Evaluación (RB-16)</label>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-gray-500 uppercase ml-1">Limpieza</span>
                <select name="limpieza" className="text-xs p-2 border rounded bg-white font-semibold">
                  <option value="Bueno">Bueno</option>
                  <option value="Regular">Regular</option>
                  <option value="Deficiente">Deficiente</option>
                </select>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-gray-500 uppercase ml-1">Iluminación</span>
                <select name="iluminacion" className="text-xs p-2 border rounded bg-white font-semibold">
                  <option value="Bueno">Bueno</option>
                  <option value="Regular">Regular</option>
                  <option value="Deficiente">Deficiente</option>
                </select>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-gray-500 uppercase ml-1">Mobiliario</span>
                <select name="mobiliario" className="text-xs p-2 border rounded bg-white font-semibold">
                  <option value="Bueno">Bueno</option>
                  <option value="Regular">Regular</option>
                  <option value="Deficiente">Deficiente</option>
                </select>
              </div>
            </div>
          </div>

          {/* RB-18: Comentarios originales inalterables */}
          <div>
            <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Descripción de la Incidencia</label>
            <textarea 
              name="descripcion" 
              rows={3} 
              required
              placeholder="Detalle técnico de la falla..."
              className="w-full p-3 bg-white border-2 border-gray-300 rounded-lg outline-none focus:border-blue-600 font-medium"
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-800 text-white font-bold py-3 rounded-lg hover:bg-blue-900 shadow-md transition-all active:scale-95"
          >
            Guardar Reporte de Mantenimiento
          </button>
        </form>
      </div>

      {/* SECCIÓN DE CONSULTA TÉCNICA (CU-06 / RF-15) */}
      <div className="max-w-2xl w-full bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-xl font-bold mb-4 text-gray-800 border-b-2 border-blue-800 pb-2">Consulta de Detalles Técnicos</h2>
        <div className="space-y-6">
          {reportes.map((r) => (
            <div key={r.id.toString()} className="p-4 border-l-4 border-blue-600 bg-blue-50 rounded-r-lg shadow-sm border-y border-r border-gray-200">
              <div className="flex justify-between items-start">
                <span className="font-bold text-blue-900 text-lg">{r.reporteroNombre}</span>
                <span className="text-[10px] font-bold text-gray-500 bg-white px-2 py-1 rounded border shadow-sm">
                  📅 {r.fechaCreacion.toLocaleDateString()}
                </span>
              </div>
              
              <div className="mt-2 p-3 bg-white rounded border border-blue-100">
                <p className="text-gray-800 font-medium text-sm">
                  <span className="text-blue-600 font-bold uppercase text-[10px] block">Comentarios del Reportero:</span>
                  {r.descripcion}
                </p>
              </div>

              {/* Visualización de RB-16 */}
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-[10px] px-2 py-1 bg-white border rounded text-gray-700 font-bold">✨ Limpieza: <span className="text-blue-700">{r.limpieza || 'Bueno'}</span></span>
                <span className="text-[10px] px-2 py-1 bg-white border rounded text-gray-700 font-bold">💡 Iluminación: <span className="text-blue-700">{r.iluminacion || 'Bueno'}</span></span>
                <span className="text-[10px] px-2 py-1 bg-white border rounded text-gray-700 font-bold">🪑 Mobiliario: <span className="text-blue-700">{r.mobiliario || 'Bueno'}</span></span>
              </div>

              {/* RF-15 & HU-12: CONTEXTO TÉCNICO DE LA BASE DE DATOS */}
              <div className="mt-4 pt-3 border-t border-blue-200 grid grid-cols-4 gap-2 bg-gray-50 p-2 rounded">
                <div className="flex flex-col">
                  <span className="text-[8px] text-gray-400 font-bold uppercase">Tabla</span>
                  <span className="text-[10px] font-mono font-bold text-blue-800">reports</span>
                </div>
                <div className="flex flex-col border-l border-gray-200 pl-2">
                  <span className="text-[8px] text-gray-400 font-bold uppercase">ID PK</span>
                  <span className="text-[10px] font-mono font-bold text-blue-800">{r.id.toString()}</span>
                </div>
                <div className="flex flex-col border-l border-gray-200 pl-2">
                  <span className="text-[8px] text-gray-400 font-bold uppercase">Tipo Dato</span>
                  <span className="text-[10px] font-mono font-bold text-blue-800">BigInt</span>
                </div>
                <div className="flex flex-col border-l border-gray-200 pl-2">
                  <span className="text-[8px] text-gray-400 font-bold uppercase">Ubicación</span>
                  <span className="text-[10px] font-bold text-blue-800">{r.ubicacion} - {r.aula}</span>
                </div>
              </div>
            </div>
          ))}
          
          {reportes.length === 0 && (
            <p className="text-gray-500 text-center py-4 italic">No hay registros para mostrar en el contexto técnico.</p>
          )}
        </div>
      </div>
    </main>
  )
}
