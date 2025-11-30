import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { playerName, timeLeft, completed, stagesCompleted, studentNumber } = req.body;
      
      const attempt = await prisma.escapeRoomAttempt.create({
        data: {
          playerName,
          timeLeft,
          completed,
          stagesCompleted,
          studentNumber
        }
      });
      
      res.status(200).json({ 
        success: true, 
        message: 'Game progress saved!',
        data: attempt 
      });
    } catch (error) {
      console.error('Save attempt error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to save game progress' 
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}