export interface ToDo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface ToDoInsetDto {
  title: string;
  userId: number;
}

export interface ToDoCreateData {
  title: string;
  userId: number;
  completed?: boolean;
}

export interface ToDoResponseDto {
  title: string;
  userId: number;
  completed: boolean;
}


export interface IToDoRepository {
  findAllByUserId(userId: number): Promise<ToDo[]>;
  create(data: ToDoCreateData): Promise<ToDo>;
  update(id: number, data: Partial<ToDoCreateData>): Promise<ToDo>;
  delete(id: number): Promise<boolean>;
}
