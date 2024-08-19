import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Pagamento Pix',
            version: '1.0.0',
            description: 'Documentação da API de Pagamento Pix',
        },
        servers: [
        {
            url: 'http://localhost:3000',
            description: 'Servidor principal',
        },
        ],
    },
    apis: ['./src/routes/*.ts'],
};
const swaggerSpec = swaggerJsdoc(options);
export { swaggerUi, swaggerSpec };
