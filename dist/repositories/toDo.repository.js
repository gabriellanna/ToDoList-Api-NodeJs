"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaToDoRepository = void 0;
const prisma_client_1 = __importDefault(require("../database/prisma-client"));
class PrismaToDoRepository {
    async findAllByUserId(userId) {
        return await prisma_client_1.default.toDo.findMany({ where: { userId } });
    }
    async create(data) {
        return await prisma_client_1.default.toDo.create({ data });
    }
    async update(id, data) {
        return await prisma_client_1.default.toDo.update({ where: { id }, data });
    }
    async delete(id) {
        await prisma_client_1.default.toDo.delete({ where: { id } });
        return true;
    }
}
exports.PrismaToDoRepository = PrismaToDoRepository;
