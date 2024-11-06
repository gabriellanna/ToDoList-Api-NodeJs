import { FastifyInstance } from 'fastify';
import { UserService } from '../services/user.service';
import { UserCreate } from '../interfaces/user.interface';
import { ResponseViewModel } from '../viewModels/response.viewModel';

const userService = new UserService();

export async function userRoutes(fastify: FastifyInstance) {

  fastify.post('/auth/register', swaggerRegister, async (request, reply) => {
    try {
      const inputData = request.body as UserCreate;
      const response = await userService.register(inputData.email, inputData.password);
      const viewModel = new ResponseViewModel(true, response, 'Registro realizado com sucesso!');

      return reply.send(viewModel);
    }
    catch (error) {
      reply.send(new ResponseViewModel(false, null, error as string));
    }
  });


  fastify.post('/auth/login', swaggerLogin, async (request, reply) => {
    try {
      const inputData = request.body as UserCreate;
      const response = await userService.login(inputData.email, inputData.password);
      const viewModel = new ResponseViewModel(true, response, 'Login realizado com sucesso!');

      return reply.send(viewModel);
    }
    catch (error) {
      reply.send(new ResponseViewModel(false, null, error as string));
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
    tags: ['Auth']
  },
}

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
    tags: ['Auth']
  },
}
