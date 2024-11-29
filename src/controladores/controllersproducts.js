import { pool } from '../index.js';
import jwt from 'jsonwebtoken';

export const getAllProducts = async (req, res) => {
    try {
        const [products] = await pool.query('SELECT * FROM products;');
        return res.json({
            productos: products
        });
    } catch (err) {
        console.error('Error al obtener los productos:', err);
        return res.status(500).json({
            error: 'Error al obtener los productos'
        });
    }
};

export const setFavouriteDriver = async (req, res) => {
    const { piloto } = req.body

    const cookie = req.cookies['lopez-app']
    if (!cookie) res.staus(403).json({message: "unauthorized"})

    const user_id = jwt.verify(cookie, process.env.JWT_SECRET).id

    await pool.query(
        'INSERT INTO favoritos (userID, driver) VALUES (?,?)',
        [user_id, piloto]
    )

    res.staus(201).json({message: "Piloto añadido"})
}