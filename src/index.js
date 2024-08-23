import express from 'express';
import creacionuser from './routes/creacionuser.js';
import { config } from 'dotenv';
import cors from 'cors';
import { createPool } from 'mysql2/promise';

config();

const app = express();
app.use(cors())


export const pool = createPool({
    host: process.env.MYSQLDB_HOST,
    user: 'root',
    password: process.env.MYSQL_ROOT_PASSWORD,
    port: 3306,
    database: process.env.MYSQL_DATABASE
});

app.use(express.json());


const initializeDatabase = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL
            )
        `);
        console.log("La tabla Usuario fue creada o ya existe.");
    } catch (error) {
        console.error('Error iniciando la base de datos', error);
    }
};

app.get('/', (req, res) => {
    res.send("Andando");
});

app.get('/ping', async (req, res) => {
    const resultado = await pool.query('SELECT NOW()');
    res.json(resultado[0]);
});

app.use('/creacionuser', creacionuser);

app.listen(3000, async () => {
    await initializeDatabase();
    console.log('Servidor corriendo en el puerto', 3000);
});