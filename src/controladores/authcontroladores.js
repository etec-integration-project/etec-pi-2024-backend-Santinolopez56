import { pool } from '../index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export const registrar = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        // Verificar si el username o email ya existen
        const [existingUser] = await pool.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email]);

        if (existingUser.length > 0) {
            return res.status(409).json({ mensaje: 'Usuario o correo ya existe' });
        }

        // Encriptar la contraseña
        const passwordHashed = await bcrypt.hash(password, 8);

        // Insertar nuevo usuario
        const [results] = await pool.query(
            'INSERT INTO users (username, password, email) VALUES (?, ?, ?)', 
            [username, passwordHashed, email]
        );

        res.status(201).json({ mensaje: 'Usuario registrado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al registrar usuario' });
    }
};

export const iniciarSesion = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ? AND username = ?', [email, username]);

        if (rows.length === 0) {
            return res.status(404).json({ mensaje: 'Usuario o correo no encontrado' });
        }

        const usuario = rows[0];
        const esContrasenaValida = await bcrypt.compare(password, usuario.password);

        if (!esContrasenaValida) {
            return res.status(401).json({ mensaje: 'Contraseña inválida' });
        }

        const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
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
