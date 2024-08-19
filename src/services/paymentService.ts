import axios from 'axios';
import fs from 'fs';
import path from 'path';
import util from 'util';

const BASE_URL = 'http://localhost:3001/pixKey';

export const fetchTransaction = async (pixKey: string) => {
    try {

        const response = await axios.get(`${BASE_URL}/payment/${pixKey}`);
        return response.data;

    } catch (error) {

        if (axios.isAxiosError(error) && error.response?.status === 404) {
            throw new Error('Transaction not found');
        }

        throw new Error('Internal Server Error');
    }
};

export const createTransaction = async (name: string, pixKey: string, account: string, bank: string, amount: number) => {

    try {

        const response = await axios.post(`${BASE_URL}/payment`, {
            name,
            pixKey,
            account,
            bank,
            amount
        });

        return response.data;

    } catch (error) {
        
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 400) {
                throw new Error('Pix key already exists');
            }
        }
        throw new Error('Internal Server Error');
    }
};
