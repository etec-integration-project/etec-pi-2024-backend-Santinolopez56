import express from 'express';
import { registrar, iniciarSesion, listarUsuarios, buyCart } from '../controladores/authcontroladores.js';

const  creacionuser = express.Router();

creacionuser.post('/registrar', registrar);
creacionuser.post('/iniciar-sesion', iniciarSesion);
creacionuser.get('/usuarios', listarUsuarios);  
creacionuser.post('/realizarcompra', buyCart)

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
