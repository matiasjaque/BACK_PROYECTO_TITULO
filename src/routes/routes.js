import { Router } from 'express';
import {getUsuariosControlador, createUsuarioControlador,updateUsuarioControlador, login} from '../controllers/usuarios.controllers.js';
import {getVotacionesByIdControlador, createVotacionControlador, updateVotacionControlador, deleteVotacionControlador} from '../controllers/votaciones.controller.js';
import {prueba, pruebaHola, doLoginPrueba} from '../services/usuarios.services.js';

const router = Router();




// Usuario

// Login
router.get('/login', login);


// obtener todas las usuarios
router.get('/usuarios', getUsuariosControlador);

// crear un nuevo usuario
router.post('/usuarioCreate', createUsuarioControlador);

//actualizar contraseña del usuario
router.put('/usuarioUpdate', updateUsuarioControlador);



// votaciones

// obtener todos los votaciones de un usuario
router.get('/votaciones', getVotacionesByIdControlador);

// crear una nueva votacion
router.post('/votacionCreate', createVotacionControlador);

//actualizar votacion
router.put('/votacionUpdate', updateVotacionControlador); 

//delete votacion
router.delete('/votacionDelete', deleteVotacionControlador);


// zona de pruebas
router.get('/hola', pruebaHola);

router.get('/prueba', prueba);

router.get('/pruebaLogin', doLoginPrueba);

export default router;
//module.exports = router;