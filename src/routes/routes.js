import { Router } from 'express';
import {getUsuariosControlador} from '../controllers/usuarios.controllers.js';
import {prueba} from '../services/usuarios.services.js';

const router = Router();



// Usuario

router.get('/hola', (req, res) =>{
    res.send({
        data: 'hola mundo la ctmmmm'
    })
});

// obtener todos los usuarios
router.get('/usuarios', getUsuariosControlador);

router.get('/prueba', prueba);

export default router;
//module.exports = router;