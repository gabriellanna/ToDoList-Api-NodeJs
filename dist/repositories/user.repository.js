"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUserRepository = void 0;
const prisma_client_1 = __importDefault(require("../database/prisma-client"));
class PrismaUserRepository {
    async findByEmail(email) {
        return await prisma_client_1.default.user.findUnique({ where: { email } });
    }
    async create(data) {
        return await prisma_client_1.default.user.create({ data });
    }
}
exports.PrismaUserRepository = PrismaUserRepository;
