import { IToDoRepository, ToDo, ToDoResponseDto } from '../interfaces/toDo.interface';
import { ToDoRepository } from '../repositories/toDo.repository';


export class ToDoService {
  private toDoRepository: IToDoRepository;
  constructor() {
    this.toDoRepository = new ToDoRepository();
  };

  async getUserToDos(userId: number): Promise<ToDo[]> {
    
    const toDos = await this.toDoRepository.findAllByUserId(userId); 
    return toDos;
  };


  async createToDo(userId: number, title: string): Promise<ToDo> {

    const toDo = await this.toDoRepository.create({ title, userId });
    return toDo;
  };


  async updateToDo(id: number, title: string, completed: boolean): Promise<ToDo> {

    const toDo = await this.toDoRepository.update(id, { title, completed });
    return toDo;
  };


  async deleteToDo(id: number): Promise<boolean> {

    const response = await this.toDoRepository.delete(id);
    return response;
  };

}
