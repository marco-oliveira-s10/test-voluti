import express from 'express';
import { getPaymentStatus, createPayment } from '../controllers/paymentController';
import { authorize } from '../middleware/authorize';

const router = express.Router();

/**
 * @swagger
 * /payment/{id}:
 *   get:
 *     summary: Consultar o status de uma transação
 *     description: Retorna todos os dados da transação com base no ID fornecido
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da transação
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados da transação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 amount:
 *                   type: number
 *                 pixKey:
 *                   type: string
 *                 account:
 *                   type: string
 *                 bank:
 *                   type: string
 *       404:
 *         description: Transação não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/payment/:id', authorize, getPaymentStatus);

/**
 * @swagger
 * /payment:
 *   post:
 *     summary: Efetuar uma transação Pix
 *     description: Cria uma nova transação com base na chave Pix fornecida
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               pixKey:
 *                 type: string
 *               account:
 *                 type: string
 *               bank:
 *                 type: string
 *     responses:
 *       201:
 *         description: Transação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 amount:
 *                   type: number
 *                 pixKey:
 *                   type: string
 *                 account:
 *                   type: string
 *                 bank:
 *                   type: string
 *       400:
 *         description: Chave Pix já existe
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/payment', authorize, createPayment);

export default router;
