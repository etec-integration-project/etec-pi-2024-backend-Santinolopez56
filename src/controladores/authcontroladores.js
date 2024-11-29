import { pool } from '../index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';


config();

export const registrar = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const [existingUser] = await pool.query(
            'SELECT * FROM users WHERE username = ? OR email = ?',
            [username, email]
        );

        if (existingUser.length > 0) {
            return res.status(409).json({ mensaje: 'Usuario o correo ya existe' });
        }

        const passwordHashed = await bcrypt.hash(password, 8);

        const [results] = await pool.query(
            'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
            [username, passwordHashed, email]
        );

        const token = jwt.sign(
            { id: results.insertId },
            process.env.JWT_SECRET,
        
        );

        res.cookie('lopez-app', token);

        res.status(201).json({ mensaje: 'Usuario registrado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al registrar usuario' });
    }
};

export const iniciarSesion = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE email = ? AND username = ?',
            [email, username]
        );

        if (rows.length === 0) {
            return res.status(404).json({ mensaje: 'Usuario o correo no encontrado' });
        }

        const usuario = rows[0];
        const esContrasenaValida = await bcrypt.compare(password, usuario.password);

        if (!esContrasenaValida) {
            return res.status(401).json({ mensaje: 'Contraseña inválida' });
        }

        const token = jwt.sign(
            { id: usuario.id },
            process.env.JWT_SECRET,
        );

        res.cookie('lopez-app', token);

        res.status(200).json({ mensaje: 'Inicio de sesión exitoso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al iniciar sesión' });
    }
};

export const listarUsuarios = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, username, email FROM users');
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al listar usuarios' });
    }
};

export const buyCart = async (req, res) => {
    // Validación de cookies
    if (!req.cookies || !req.cookies['lopez-app']) {
        return res.status(403).json({ error: 'No autorizado' });
    }

    try {
        // Validación del token
        const userCookie = req.cookies['lopez-app'];
        const data = jwt.verify(userCookie, process.env.JWT_SECRET);
        const user_id = data.id;

        // Validación de usuario
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [user_id]);
        if (rows.length === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        // // Validación del carrito
        // const cart = req.body.cart;
        // if (!cart || !Array.isArray(cart) || cart.length === 0) {
        //     return res.status(400).json({ mensaje: 'El carrito está vacío o es inválido' });
        // }

        // for (const item of cart) {
        //     if (!item.id || !item.cantidad || typeof item.id !== 'number' || typeof item.cantidad !== 'number') {
        //         return res.status(400).json({ mensaje: 'Formato del carrito inválido' });
        //     }
        // }

        // Insertar el carrito en la base de datos
        const cartStringified = JSON.stringify(cart);
        const [result] = await pool.query('INSERT INTO cart (userID, cartContent) VALUES (?, ?)', [user_id, cartStringified]);

        return res.json({ 
            mensaje: 'Compra realizada', 
            compraId: result.insertId 
        });
    } catch (error) {
        console.error('Error en buyCart:', error);
        res.status(500).json({ mensaje: 'Error al procesar la compra' });
    }
};

