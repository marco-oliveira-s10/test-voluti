import {
    Request,
    Response
} from 'express';
import {
    fetchTransaction,
    createTransaction
} from '../services/paymentService';

// Controlador para obter o status de uma transação
export const getPaymentStatus = async (req: Request, res: Response): Promise < void > => {
    try {
        const {
            id
        } = req.params;
        const transaction = await fetchTransaction(id);

        if (!transaction) {
            res.status(404).json({
                error: 'Transaction not found'
            });
            return;
        }

        res.json(transaction);
    } catch (error) {
        // Verifica se o erro é uma instância de Error
        if (error instanceof Error) {
            res.status(500).json({
                error: error.message || 'Internal Server Error'
            });
        } else {
            res.status(500).json({
                error: 'Internal Server Error'
            });
        }
    }
};

// Controlador para criar uma nova transação
export const createPayment = async (req: Request, res: Response): Promise < void > => {
    try {
        const {
            name,
            pixKey,
            account,
            bank,
            amount
        } = req.body;

        if (!name || !pixKey || !account || !bank || !amount) {
            res.status(400).json({
                error: 'Missing required fields'
            });
            return;
        }

        const transaction = await createTransaction(name, pixKey, account, bank, amount);
        res.status(201).json(transaction);

    } catch (error) {
        // Verifica se o erro é uma instância de Error
        if (error instanceof Error) {
            res.status(500).json({
                error: error.message || 'Internal Server Error'
            });
        } else {
            res.status(500).json({
                error: 'Internal Server Error'
            });
        }
    }
};