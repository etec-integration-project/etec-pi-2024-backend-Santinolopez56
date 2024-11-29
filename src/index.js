import express from 'express';
import creacionuser from './routes/creacionuser.js';
import { config } from 'dotenv';
import cors from 'cors';
import { createPool } from 'mysql2/promise';
import { crearProductos } from './utils/crearProducts.js';
import { getAllProducts } from './controladores/controllersproducts.js';
import cookieParser from "cookie-parser";

config();

const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(cors({
    origin: '*',
    credentials: true
}));

export const pool = createPool({
    host: process.env.MYSQLDB_HOST,
    user: 'root',
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: 3306
});


const initializeDatabase = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL
            )`);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS products (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price INT NOT NULL,
                image VARCHAR(255) NOT NULL
            )`);

        await pool.query( `
            CREATE TABLE IF NOT EXISTS cart (
                id INT AUTO_INCREMENT PRIMARY KEY,
                userID INT NOT NULL,
                cartContent VARCHAR(1024) NOT NULL
            )`);
            await pool.query( `
            CREATE TABLE IF NOT EXISTS favoritos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                userID INT NOT NULL,
                driver VARCHAR(1024) NOT NULL
            )`);
        
        await pool.query(`
        CREATE TABLE IF NOT EXISTS opiniones (
            id INT AUTO_INCREMENT PRIMARY KEY,
            userID INT NOT NULL,
            opinion TEXT NOT NULL
        )`);
           
            
        console.log("Las tablas fueron creadas o ya existen.");
    } catch (error) {
        console.error('Error iniciando la base de datos', error);
    }
};

app.get('/app/', (req, res) => {
    res.send("Andando");
});

app.get('/app/ping', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT NOW()');
        res.json({ time: rows[0]['NOW()'] });
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo la hora actual' });
    }
});

app.get('/app/productos', getAllProducts);

app.use('/app/creacionuser', creacionuser);

app.listen(8080, async () => {
    await initializeDatabase();
    await crearProductos(pool);
    console.log('Servidor corriendo en el puerto 3000');
});
