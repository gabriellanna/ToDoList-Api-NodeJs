import prisma from '../database/prisma-client';
import { User, UserRegisterDto, IUserRepository } from '../interfaces/user.interface';

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } });
  }

  async create(data: UserRegisterDto): Promise<User> {
    return await prisma.user.create({ data });
  }
}
