"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDoRoutes = toDoRoutes;
const toDo_service_1 = require("../services/toDo.service");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const toDoService = new toDo_service_1.ToDoService();
async function toDoRoutes(fastify) {
    fastify.get('/todo', { preHandler: auth_middleware_1.authMiddleware }, async (request, reply) => {
        const userId = request.user?.userId;
        const response = await toDoService.getUserToDos(userId);
        reply.send(response);
    });
    fastify.post('/todo', { preHandler: auth_middleware_1.authMiddleware }, async (request, reply) => {
        const userId = request.user?.userId;
        const { title } = request.body;
        const response = await toDoService.createToDo(userId, title);
        reply.send(response);
    });
    fastify.put('/todo/:id', { preHandler: auth_middleware_1.authMiddleware }, async (request, reply) => {
        const id = Number(request.params.id); // Erro resolvido ao definir o tipo Params
        const { title = '', completed } = request.body;
        const response = await toDoService.updateToDo(id, title, completed ?? false);
        reply.send(response);
    });
    fastify.delete('/todo/:id', { preHandler: auth_middleware_1.authMiddleware }, async (request, reply) => {
        const id = Number(request.params.id); // Erro resolvido ao definir o tipo Params
        const response = await toDoService.deleteToDo(id);
        reply.send(response);
    });
}
