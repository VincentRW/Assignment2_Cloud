import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { playerName, timeLeft, completed, stagesCompleted, studentNumber } = req.body
      
      const attempt = await prisma.escapeRoomAttempt.create({
        data: {
          playerName,
          timeLeft,
          completed,
          stagesCompleted,
          studentNumber
        }
      })
      
      res.status(200).json({ success: true, id: attempt.id })
    } catch (error) {
      console.error('Save attempt error:', error)
      res.status(500).json({ error: 'Failed to save attempt' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}