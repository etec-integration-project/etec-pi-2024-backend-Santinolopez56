export async function crearProductos(pool) {
    try {
        
            await pool.query(`
                INSERT INTO products (name, price, image) 
                VALUES 
                ('Remera Colapinto', 100, "https://acdn.mitiendanube.com/stores/001/216/412/products/screenshot_20240803-161822-fc66a5ee07dee37df917229015899583-240-0.png"),
                ('Gorra Ferrari', 300, "https://s3.sa-east-1.amazonaws.com/www.vaypol.com.ar/variants/676qxj2aajvrrd66fheoqgq8os85/77e513bcd3762f47919c96f85e400038a39acdbb0d268f51c1fd98fe5327bd96"),
                ('Buzo Mercedes', 400, "https://http2.mlstatic.com/D_NQ_NP_855094-MLA75409787673_032024-O.webp"),
                ('Auto de Jueguetes Ferrari', 500, "https://lh7-us.googleusercontent.com/PFU3Iyjs8GcwT_rVCQLlH0aV7imKYi6NbqhDdm22btRTNOd736xgVoAQJ7k2poW8GbHeMYMSA0SoK2LMjO5910rzE3ld-wEDbXrr3D0gXTDxrd4iqjy96flAzSLr_b50jWcnqFg9RvSOWMssXxq3HV0"),
                ('Remera Ferrari', 600, "https://shop.soymotor.com/img/p/2/2/6/7/3/22673-home_default.jpg"),
                ('Remera Red Bull', 700, "https://i.pinimg.com/236x/dd/9a/79/dd9a793832915e516c50205dd231ce4f.jpg"),
                ('Buzo McLaren', 800, "https://acdn.mitiendanube.com/stores/001/216/412/products/photoroom-20230521_1443561-1f56ef86cbc5a891ec16878669300118-640-0.png"),
                ('Llavero Ruedas', 200, "https://http2.mlstatic.com/D_NQ_NP_833812-MLA78388488191_082024-O.webp"),
                ('Auto de Juguete Mercedes', 900, "https://http2.mlstatic.com/D_Q_NP_990149-MLU72150986231_102023-O.webp");
            `);

        console.log('Productos insertados correctamente.');
    } catch (error) {
        console.error('Error al insertar productos:', error);
    }
}
