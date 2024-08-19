export type Transaction = {
    id: number;
    amount: number;
    pixKey: string;
    account: string;
    bank: string;
};

let idCounter = 0;
const database: Record < number, Transaction > = {};

export const createTransaction = (amount: number, pixKey: string, account: string, bank: string): Promise < Transaction > => {
    const transaction: Transaction = {
        id: idCounter++,
        amount,
        pixKey,
        account,
        bank
    };
    database[transaction.id] = transaction;
    return Promise.resolve(transaction);
};

export const getTransaction = (id: number): Promise < Transaction | undefined > => {
    const transaction = database[id];
    return Promise.resolve(transaction);
};