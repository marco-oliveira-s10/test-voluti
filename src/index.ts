import express from 'express';
import { swaggerUi, swaggerSpec } from './swagger';
import paymentRoutes from './routes/paymentRoutes';

const app = express();
app.use(express.json());

// Inicializa as rotas
app.use('/api/v1', paymentRoutes);

// Serve a documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});
