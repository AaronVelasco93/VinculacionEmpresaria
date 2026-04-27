import { useState, useEffect } from 'react'

interface Inspeccion {
  id: number
  reportero: string
  fecha: string
  tipoUbicacion: string
  edificio: string
  aulaSeccion: string
  comentarios: string | null
  estado: string
  createdAt: string
}

export default function Home() {
  const [inspecciones, setInspecciones] = useState<Inspeccion[]>([])
  const [formulario, setFormulario] = useState({
    reportero: '',
    fecha: new Date().toISOString().split('T')[0],
    tipoUbicacion: '',
    edificio: '',
    aulaSeccion: '',
    comentarios: '',
    estado: 'BORRADOR'
  })
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    cargarInspecciones()
  }, [])

  const cargarInspecciones = async () => {
    try {
      const res = await fetch('/api/incidencias')
      const data = await res.json()
      setInspecciones(data)
    } catch (error) {
      console.error('Error al cargar inspecciones:', error)
    }
  }

  const crearInspeccion = async (e: React.FormEvent, esBorrador: boolean = false) => {
    e.preventDefault()
    setCargando(true)
    
    try {
      const dataToSend = {
        ...formulario,
        estado: esBorrador ? 'BORRADOR' : 'ENVIADO'
      }
      
      const res = await fetch('/api/incidencias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      })
      
      if (res.ok) {
        await cargarInspecciones()
        setFormulario({
          reportero: '',
          fecha: new Date().toISOString().split('T')[0],
          tipoUbicacion: '',
          edificio: '',
          aulaSeccion: '',
          comentarios: '',
          estado: 'BORRADOR'
        })
      }
    } catch (error) {
      console.error('Error al crear inspección:', error)
    }
    
    setCargando(false)
  }

  const getEstadoColor = (estado: string) => {
    switch(estado) {
      case 'ENVIADO': return 'bg-green-500'
      case 'BORRADOR': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const tiposUbicacion = ['Edificio', 'Aulas', 'Baños', 'Áreas Comunes', 'Laboratorios', 'Biblioteca']

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📋Sistema de Inspección
          </h1>
          <p className="text-gray-600">Complete los detalles para registrar una nueva inspección</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">📝 Nuevo Reporte de Inspección</h2>
          <form onSubmit={(e) => crearInspeccion(e, false)}>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">📂 Información General</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Reportero *</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formulario.reportero}
                  onChange={e => setFormulario({ ...formulario, reportero: e.target.value })}
                  required
                  placeholder="Ingrese su nombre"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Inspección *</label>
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formulario.fecha}
                  onChange={e => setFormulario({ ...formulario, fecha: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">🔍 Detalles de Ubicación</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Ubicación *</label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formulario.tipoUbicacion}
                  onChange={e => setFormulario({ ...formulario, tipoUbicacion: e.target.value })}
                  required
                >
                  <option value="">Seleccione Tipo</option>
                  {tiposUbicacion.map(tipo => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Edificio *</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formulario.edificio}
                  onChange={e => setFormulario({ ...formulario, edificio: e.target.value })}
                  required
                  placeholder="Edificio"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Aula / Sección *</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formulario.aulaSeccion}
                  onChange={e => setFormulario({ ...formulario, aulaSeccion: e.target.value })}
                  required
                  placeholder="Aula"
                />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">💬 Comentarios y Observaciones</h3>
              <textarea
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formulario.comentarios}
                onChange={e => setFormulario({ ...formulario, comentarios: e.target.value })}
                placeholder="Reparaciones necesarias o estado general..."
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={(e) => crearInspeccion(e, true)}
                disabled={cargando}
                className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition disabled:bg-gray-400"
              >
                💾 Guardar Borrador
              </button>
              <button
                type="submit"
                disabled={cargando}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
              >
                {cargando ? 'Enviando...' : '📤 Enviar Reporte'}
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-4 text-center">
              Nota: Los reportes se registran para auditoría y seguimiento histórico.
            </p>
          </form>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">📋 Reportes de Inspección</h2>
          {inspecciones.length === 0 ? (
            <div className="bg-white rounded-lg p-8 text-center text-gray-500">
              No hay reportes de inspección registrados
            </div>
          ) : (
            inspecciones.map(ins => (
              <div key={ins.id} className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">
                      {ins.tipoUbicacion} - {ins.edificio}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Reportero: {ins.reportero} | Aula: {ins.aulaSeccion}
                    </p>
                  </div>
                  <span className={`${getEstadoColor(ins.estado)} text-white text-xs px-2 py-1 rounded-full`}>
                    {ins.estado === 'ENVIADO' ? '📨 Enviado' : '✏️ Borrador'}
                  </span>
                </div>
                {ins.comentarios && (
                  <p className="text-gray-600 mb-3 text-sm">{ins.comentarios}</p>
                )}
                <div className="text-xs text-gray-500">
                  📅 Fecha inspección: {new Date(ins.fecha).toLocaleDateString('es-ES')}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}