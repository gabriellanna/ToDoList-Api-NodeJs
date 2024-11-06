"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const user_routes_1 = require("./routes/user.routes");
const toDo_routes_1 = require("./routes/toDo.routes");
const app = (0, fastify_1.default)();
// Configuração do Swagger
app.register(swagger_1.default, {
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
app.register(swagger_ui_1.default, {
    routePrefix: '/docs',
    // swagger: {
    //   info: {
    //     title: 'API ToDo',
    //     version: '1.0.0',
    //   },
    // },
    uiConfig: {
        docExpansion: 'none',
        deepLinking: false
    },
    // exposeRoute: true
});
// app.register(swaggerUI, {
//   routePrefix: '/docs', // Endpoint para acessar a documentação
//   staticCSP: true,
//   transformStaticCSP: (header) => header,
//   uiConfig: {
//     docExpansion: 'full',
//     deepLinking: false,
//   },
// });
// Registro das rotas
app.register(user_routes_1.userRoutes);
app.register(toDo_routes_1.toDoRoutes);
// Configuração de CORS
app.register(cors_1.default, {
    origin: '*', // Libera acesso para qualquer origem; ajuste conforme necessário
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos HTTP permitidos
});
// Inicializando o servidor
const startServer = async () => {
    try {
        await app.listen({ port: 3000 });
        console.log('Servidor rodando em http://localhost:3000');
        console.log('Documentação do Swagger em http://localhost:3000/docs');
    }
    catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
startServer();
exports.default = app;
