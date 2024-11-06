import { FastifyInstance } from 'fastify';
import { ToDoService } from '../services/toDo.service';
import { authMiddleware } from '../middlewares/auth.middleware';
import { ToDo, ToDoInsetDto } from '../interfaces/toDo.interface';
import { ResponseViewModel } from '../viewModels/response.viewModel';

interface ToDoParams {
  id: string;
}

const toDoService = new ToDoService();

export async function toDoRoutes(fastify: FastifyInstance) {

  fastify.get('/todo',
    {
      preHandler: authMiddleware,
      schema: {
        ...getToDoSchema,
        tags: ['ToDo']
      }
    },
    async (request, reply) => {

      try {
        const userId = request.user?.userId!;
        const response = await toDoService.getUserToDos(userId);
        const viewModel = new ResponseViewModel<ToDo[]>(true, response, 'Tarefas do usuário');

        reply.send(viewModel);
      }
      catch (error) {
        reply.send(new ResponseViewModel(false, null, error as string));
      }
    });

  fastify.post('/todo',
    {
      preHandler: authMiddleware,
      schema: {
        ...postToDoSchema,
        tags: ['ToDo']
      }
    },
    async (request, reply) => {

      try {
        const userId = request.user?.userId!;
        const { title } = request.body as ToDoInsetDto;
        const response = await toDoService.createToDo(userId, title);
        const viewModel = new ResponseViewModel<ToDo>(true, response, 'Tarefa criada com sucesso');

        reply.send(viewModel);
      }
      catch (error) {
        reply.send(new ResponseViewModel(false, null, error as string));
      }
    });


  fastify.put<{ Params: ToDoParams }>(
    '/todo/:id',
    {
      preHandler: authMiddleware,
      schema: {
        ...putToDoSchema,
        tags: ['ToDo']
      }
    },
    async (request, reply) => {
      try {
        const id = Number(request.params.id);
        const { title = '', completed } = request.body as Partial<ToDo>;
        const response = await toDoService.updateToDo(id, title, completed ?? false);
        const viewModel = new ResponseViewModel(true, response, 'Tarefa atualizada com sucesso');
        reply.send(viewModel);
      } catch (error) {
        reply.send(new ResponseViewModel(false, null, error as string));
      }
    }
  );

  fastify.delete<{ Params: ToDoParams }>(
    '/todo/:id',
    {
      preHandler: authMiddleware,
      schema: {
        ...deleteToDoSchema,
        tags: ['ToDo']
      }
    },
    async (request, reply) => {
      try {
        const id = Number(request.params.id);
        const response = await toDoService.deleteToDo(id);
        const viewModel = new ResponseViewModel(response, null, 'Tarefa deletada com sucesso');
        reply.send(viewModel);
      } catch (error) {
        reply.send(new ResponseViewModel(false, null, error as string));
      }
    }
  );
  
};




const getToDoSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              title: { type: 'string' },
              completed: { type: 'boolean' },
              userId: { type: 'number' },
            },
            required: ['id', 'title', 'completed', 'userId'],
          },
        },
        message: { type: 'string' },
      },
      required: ['success', 'data', 'message'],
    },
    401: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
};

// Schema para criação de tarefa (POST /todo)
const postToDoSchema = {
  body: {
    type: 'object',
    properties: {
      title: { type: 'string' },
    },
    required: ['title'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            title: { type: 'string' },
            completed: { type: 'boolean' },
            userId: { type: 'number' },
          },
          required: ['id', 'title', 'completed', 'userId'],
        },
        message: { type: 'string' },
      },
      required: ['success', 'data', 'message'],
    },
    401: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
};

// Schema para atualização de tarefa (PUT /todo/:id)
const putToDoSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  },
  body: {
    type: 'object',
    properties: {
      title: { type: 'string', nullable: true },
      completed: { type: 'boolean', nullable: true },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            title: { type: 'string' },
            completed: { type: 'boolean' },
            userId: { type: 'number' },
          },
          required: ['id', 'title', 'completed', 'userId'],
        },
        message: { type: 'string' },
      },
      required: ['success', 'data', 'message'],
    },
    401: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
};

// Schema para exclusão de tarefa (DELETE /todo/:id)
const deleteToDoSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: { type: 'null' },
        message: { type: 'string' },
      },
      required: ['success', 'data', 'message'],
    },
    401: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
};
