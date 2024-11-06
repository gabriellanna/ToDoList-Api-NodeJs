"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDoService = void 0;
const toDo_repository_1 = require("../repositories/toDo.repository");
const response_viewModel_1 = require("../viewModels/response.viewModel");
class ToDoService {
    constructor() {
        this.toDoRepository = new toDo_repository_1.PrismaToDoRepository();
    }
    async getUserToDos(userId) {
        const toDos = await this.toDoRepository.findAllByUserId(userId);
        return new response_viewModel_1.ResponseViewModel(true, toDos, 'Tarefas do usuário');
    }
    async createToDo(userId, title) {
        const toDo = await this.toDoRepository.create({ title, userId });
        return new response_viewModel_1.ResponseViewModel(true, toDo, 'Tarefa criada com sucesso');
    }
    async updateToDo(id, title, completed) {
        const toDo = await this.toDoRepository.update(id, { title, completed });
        return new response_viewModel_1.ResponseViewModel(true, toDo, 'Tarefa atualizada com sucesso');
    }
    async deleteToDo(id) {
        await this.toDoRepository.delete(id);
        return new response_viewModel_1.ResponseViewModel(true, null, 'Tarefa deletada com sucesso');
    }
}
exports.ToDoService = ToDoService;
