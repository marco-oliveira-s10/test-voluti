import express from 'express';
import fs from 'fs';
import path from 'path';
import util from 'util';

const app = express();
const router = express.Router();

const dbFilePath = path.join(__dirname, '../db.json');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// Buscar dados com base na chave Pix
router.get('/pixKey/payment/:id', async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const fileContent = await readFile(dbFilePath, 'utf8');
        const data = JSON.parse(fileContent);

        const transaction = data.pixKey[id];

        if (transaction) {
            res.json(transaction);
        } else {
            res.status(404).json({
                message: 'Record not found'
            });
        }
    } catch (error) {
        console.error('Error reading db.json file:', error);
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
});

// Criar uma nova transação
router.post('/pixKey/payment', async (req, res) => {
    const {
        pixKey,
        name,
        account,
        bank,
        amount
    } = req.body;

    if (!pixKey || !name || !account || !bank || amount == null) {
        return res.status(400).json({
            message: 'Invalid data'
        });
    }

    try {

        const fileContent = await readFile(dbFilePath, 'utf8');
        const data = JSON.parse(fileContent);

        if (data.pixKey[pixKey]) {
            return res.status(400).json({
                message: 'The Pix key already exists'
            });
        }

        const status = "analyzing";
        data.pixKey[pixKey] = {
            name,
            account,
            bank,
            amount,
            status
        };

        await writeFile(dbFilePath, JSON.stringify(data, null, 2), 'utf8');

        res.status(201).json(data.pixKey[pixKey]);
    } catch (error) {
        console.error('Error updating db.json file:', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
});


app.use(express.json());
app.use('/', router);

const port = 3001;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});