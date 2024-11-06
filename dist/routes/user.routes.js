"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = userRoutes;
const user_service_1 = require("../services/user.service");
const response_viewModel_1 = require("../viewModels/response.viewModel");
const userService = new user_service_1.UserService();
async function userRoutes(fastify) {
    fastify.post('/user/register', swaggerRegister, async (request, reply) => {
        try {
            const { email, password } = request.body;
            const response = await userService.register(email, password);
            const viewModel = new response_viewModel_1.ResponseViewModel(true, response, 'Login realizado com sucesso');
            return reply.send(viewModel);
        }
        catch (error) {
            reply.send(new response_viewModel_1.ResponseViewModel(false, null, error));
        }
    });
    fastify.post('/user/login', swaggerLogin, async (request, reply) => {
        try {
            const { email, password } = request.body;
            const response = await userService.login(email, password);
            const viewModel = new response_viewModel_1.ResponseViewModel(true, response, 'Login realizado com sucesso');
            return reply.send(viewModel);
        }
        catch (error) {
            reply.send(new response_viewModel_1.ResponseViewModel(false, null, error));
        }
    });
}
const swaggerLogin = {
    schema: {
        body: {
            type: 'object',
            properties: {
                email: { type: 'string' },
                password: { type: 'string' },
            },
            required: ['email', 'password'],
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    success: { type: 'boolean' },
                    data: {
                        type: 'object',
                        nullable: true, // Permite que 'data' seja null quando as credenciais são inválidas
                        properties: {
                            token: { type: 'string' },
                        },
                    },
                    message: { type: 'string' },
                },
                required: ['success', 'data', 'message'],
            },
        },
    },
};
const swaggerRegister = {
    schema: {
        body: {
            type: 'object',
            properties: {
                email: { type: 'string' },
                password: { type: 'string' },
            },
            required: ['email', 'password'],
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    success: { type: 'boolean' },
                    data: {
                        type: 'object',
                        nullable: true, // Permite que 'data' seja null quando as credenciais são inválidas
                        properties: {
                            email: { type: 'string' },
                            password: { type: 'string' },
                        },
                    },
                    message: { type: 'string' },
                },
                required: ['success', 'data', 'message'],
            },
        },
    },
};
