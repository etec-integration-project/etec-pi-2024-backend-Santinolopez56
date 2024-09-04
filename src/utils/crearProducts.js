export async function crearProductos(pool) {
    try {
        // Inserta múltiples productos en una sola consulta correctamente
        await pool.query(`
            INSERT INTO products (name, price) 
            VALUES 
            ('Sillon 1', 200),
            ('Sillon 2', 400),
            ('Sillon 3', 500),
            ('Sillon 4', 700);
        `);

        console.log('Productos insertados correctamente.');
    } catch (error) {
        console.error('Error al insertar productos:', error);
    }
}

