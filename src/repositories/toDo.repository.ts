import prisma from '../database/prisma-client';
import { ToDo, ToDoCreateData, IToDoRepository } from '../interfaces/toDo.interface';

export class ToDoRepository implements IToDoRepository {
  async findAllByUserId(userId: number): Promise<ToDo[]> {
    return await prisma.toDo.findMany({ where: { userId } });
  }

  async create(data: ToDoCreateData): Promise<ToDo> {
    return await prisma.toDo.create({ data });
  }

  async update(id: number, data: Partial<ToDoCreateData>): Promise<ToDo> {
    return await prisma.toDo.update({ where: { id }, data });
  }

  async delete(id: number): Promise<boolean> {
    await prisma.toDo.delete({ where: { id } });
    return true;
  }
}
