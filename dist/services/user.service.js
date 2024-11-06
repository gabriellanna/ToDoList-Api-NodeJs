"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_repository_1 = require("../repositories/user.repository");
class UserService {
    constructor() {
        this.userRepository = new user_repository_1.PrismaUserRepository();
    }
    async register(email, password) {
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const userCreate = await this.userRepository.create({ email, password: hashedPassword });
        return userCreate;
    }
    async login(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (!user || !(await bcrypt_1.default.compare(password, user.password))) {
            throw Error('Credenciais inválidas');
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    }
}
exports.UserService = UserService;
