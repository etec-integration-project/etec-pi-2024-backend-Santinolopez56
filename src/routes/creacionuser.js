import express from 'express';
import { registrar, iniciarSesion, listarUsuarios } from '../controladores/authcontroladores.js';

const  creacionuser = express.Router();

creacionuser.post('/app/registrar', registrar);
creacionuser.post('/app/iniciar-sesion', iniciarSesion);
creacionuser.get('/app/usuarios', listarUsuarios);  

creacionuser.get('/app/probar', (req, res) => {
    return res.json({
        users: [
            {id: 1, name: 'tomas' },
            {id: 2, name: 'verdu' },
            {id: 3, name: 'tincho' },
        ]
    })
})

export default creacionuser;
