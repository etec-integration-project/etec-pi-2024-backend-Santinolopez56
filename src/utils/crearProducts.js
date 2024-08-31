import { pool } from '../index.js';

export const crearProductos = async () => {
    try {
        await pool.query(`
            INSERT INTO products (name, price) VALUES ('Sillon 1', 200);
            INSERT INTO products (name, price) VALUES ('Sillon 2', 400);
            INSERT INTO products (name, price) VALUES ('Sillon 3', 500);
            INSERT INTO products (name, price) VALUES ('Sillon 4', 700);
        `);
        console.log('Productos insertados correctamente');
    } catch (err) {
        console.error('Error al insertar productos:', err);
    }
};
