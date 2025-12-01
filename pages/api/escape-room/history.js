import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { studentNumber } = req.query;
      
      const attempts = await prisma.escapeRoomAttempt.findMany({
        where: { studentNumber },
        orderBy: { createdAt: 'desc' },
        take: 10 
      });
      
      res.status(200).json({ success: true, data: attempts });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}