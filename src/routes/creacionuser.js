import express from 'express';
import { registrar, iniciarSesion, listarUsuarios } from '../controladores/authcontroladores.js';

const  creacionuser = express.Router();

creacionuser.post('/registrar', registrar);
creacionuser.post('/iniciar-sesion', iniciarSesion);
creacionuser.get('/usuarios', listarUsuarios);  

export default creacionuser;
