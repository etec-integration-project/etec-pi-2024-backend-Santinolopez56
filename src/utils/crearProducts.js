export async function crearProductos(pool) {
    try {
        // Inserta múltiples productos en una sola consulta correctamente
        await pool.query(`
            INSERT INTO products (name, price) 
            VALUES 
            ('Imanes Circuitos', 100),
            ('Gorra Ferrari', 300),
            ('Buzo Mercedes', 400),
            ('Remera Aston Martin', 500),
            ('Remera Ferrari', 600),
            ('Remera Red Bull', 700),
            ('Campera McLaren', 800),
            ('Llavero Ruedas', 200),
            ('Auto de Juguete Mercedes', 900);
        `);

        console.log('Productos insertados correctamente.');
    } catch (error) {
        console.error('Error al insertar productos:', error);
    }
}
