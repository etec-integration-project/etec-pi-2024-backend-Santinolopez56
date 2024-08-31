import { pool } from '../index.js';

export const getAllProducts = async (req, res) => {
    try {
        const { rows: products } = await pool.query('SELECT * FROM products;');
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
