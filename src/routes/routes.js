import { Router } from 'express';
import {getUsuariosControlador, pruebaLogin, login} from '../controllers/usuarios.controllers.js';
import {prueba, pruebaHola, doLoginPrueba} from '../services/usuarios.services.js';

const router = Router();




// Usuario

// Login
router.get('/login', login);

// obtener todos los usuarios
router.get('/usuarios', getUsuariosControlador);


// zona de pruebas
router.get('/hola', pruebaHola);

router.get('/prueba', prueba);

router.get('/pruebaLogin', doLoginPrueba);

export default router;
//module.exports = router;