import express from 'express';
import creacionuser from './routes/creacionuser.js';
import { config } from 'dotenv';
import cors from 'cors';
import { createPool } from 'mysql2/promise';
import { crearProductos } from './utils/crearProducts.js';
import { getAllProducts } from './controladores/controllersproducts.js';

config();

const app = express();
app.use(cors());

export const pool = createPool({
    host: process.env.MYSQLDB_HOST,
    user: 'root',
    password: process.env.MYSQL_ROOT_PASSWORD,
    // port: 3306,
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
        )`);
        await pool.query(`
            CREATE TABLE IF NOT EXISTS products (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price INT NOT NULL  
            )`);
        console.log("Las tablas fueron creadas o ya existen.");
    } catch (error) {
        console.error('Error iniciando la base de datos', error);
    }
};

app.get('/', (req, res) => {
    res.send("Andando");
});

app.get('/ping', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT NOW()');
        res.json({ time: rows[0]['NOW()'] });
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo la hora actual' });
    }
});

app.get('/productos', getAllProducts);

app.use('/creacionuser', creacionuser);

app.listen(3000, async () => {
    await initializeDatabase();
    await crearProductos(pool);
    console.log('Servidor corriendo en el puerto', 8080);
});
