import fastify from 'fastify';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import { userRoutes } from './routes/user.routes';
import { toDoRoutes } from './routes/toDo.routes';

const app = fastify();

// Configuração do Swagger
app.register(swagger, {
  swagger: {
    info: {
      title: 'API ToDo',
      description: 'API para gerenciamento de tarefas',
      version: '1.0.0'
    },
    securityDefinitions: {
      BearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description: "Digite o token no formato: Bearer <token>"
      }
    },
    security: [{ BearerAuth: [] }]
  }
});

app.register(swaggerUI, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'none',
    deepLinking: false
  }
});

app.register(userRoutes);
app.register(toDoRoutes);

app.register(cors, {
  origin: '*', // Libera acesso para qualquer origem
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

// Inicializando o servidor
const startServer = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log('Servidor rodando em http://localhost:3000');
    console.log('Documentação do Swagger em http://localhost:3000/docs');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

startServer();

export default app;
