import express from 'express';
import { registrar, iniciarSesion, listarUsuarios, buyCart } from '../controladores/authcontroladores.js';
import { setFavouriteDriver, setOpinion } from '../controladores/controllersproducts.js';

const  creacionuser = express.Router();

creacionuser.post('/registrar', registrar);
creacionuser.post('/iniciar-sesion', iniciarSesion);
creacionuser.get('/usuarios', listarUsuarios);  
creacionuser.post('/realizarcompra', buyCart)
creacionuser.post('/pilotofavorito', setFavouriteDriver)
creacionuser.post('/opinion', setOpinion)

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
