import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const inspecciones = await prisma.inspeccion.findMany({
        orderBy: { createdAt: 'desc' }
      })
      return res.status(200).json(inspecciones)
    } catch (error) {
      console.error('Error GET:', error)
      return res.status(500).json({ error: 'Error al obtener inspecciones' })
    }
  }

  if (req.method === 'POST') {
    try {
      const { reportero, fecha, tipoUbicacion, edificio, aulaSeccion, comentarios, estado } = req.body
      
      const nueva = await prisma.inspeccion.create({
        data: { 
          reportero,
          fecha: new Date(fecha),
          tipoUbicacion,
          edificio,
          aulaSeccion,
          comentarios: comentarios || null,
          estado: estado || 'BORRADOR'
        }
      })
      return res.status(201).json(nueva)
    } catch (error) {
      console.error('Error POST:', error)
      return res.status(500).json({ error: 'Error al crear inspección' })
    }
  }

  return res.status(405).json({ error: `Método ${req.method} no permitido` })
}