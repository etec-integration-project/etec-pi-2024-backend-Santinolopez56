import express from 'express';
import { registrar, iniciarSesion, listarUsuarios } from '../controladores/authcontroladores.js';

const  creacionuser = express.Router();

creacionuser.post('/registrar', registrar);
creacionuser.post('/iniciar-sesion', iniciarSesion);
creacionuser.get('/usuarios', listarUsuarios);  

creacionuser.get('/probar', (req, res) => {
    return res.json({
        users: [
            {id: 1, name: 'tomas' },
            {id: 2, name: 'verdu' },
            {id: 3, name: 'tincho' },
        ]
    })
})

export default creacionuser;