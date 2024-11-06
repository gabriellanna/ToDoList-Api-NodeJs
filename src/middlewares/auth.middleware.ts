import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';

export const authMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return reply.status(401).send({ message: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };

    // Agora podemos usar `request.user` sem erro de tipagem
    request.user = { userId: decoded.userId };
  } catch (error) {
    reply.status(401).send({ message: 'Token inválido' });
  }
};
