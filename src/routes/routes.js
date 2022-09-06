import { Router } from 'express';
import {getUsuariosControlador, createUsuarioControlador,updateUsuarioControlador, login} from '../controllers/usuarios.controllers.js';
import {getVotacionesByIdControlador, createVotacionControlador, updateVotacionControlador, deleteVotacionControlador} from '../controllers/votaciones.controller.js';
import {getPreguntasControlador, createPreguntaControlador, updatePreguntaControlador, deletePreguntaControlador} from '../controllers/preguntas.controller.js';
import {getRespuestasControlador, createRespuestaControlador,updateRespuestaControlador, deleteRespuestaControlador} from '../controllers/respuestas.controller.js';
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


// preguntas de las votaciones

// obtener todos las preguntas de una votacion de un usuario
router.get('/preguntasGet', getPreguntasControlador);

// crear una nueva pregunta a una votacion
router.post('/preguntaCreate', createPreguntaControlador);

//actualizar una pregunta de una votacion
router.put('/preguntaUpdate', updatePreguntaControlador); 

//delete pregunta de una votacion
router.delete('/preguntaDelete', deletePreguntaControlador); 


// respuestas de las preguntas de las votaciones

// obtener todas las respuestas de una pregunta de una votacion de un usuario
router.get('/respuestasGet', getRespuestasControlador);

// crear una nueva respuesta a una pregunta de una votacion
router.post('/respuestaCreate', createRespuestaControlador);

//actualizar una respuesta de una votacion
router.put('/respuestaUpdate', updateRespuestaControlador); 

//delete respuesta de una votacion
router.delete('/respuestaDelete', deleteRespuestaControlador); 


// zona de pruebas
router.get('/hola', pruebaHola);

router.get('/prueba', prueba);

router.get('/pruebaLogin', doLoginPrueba);

export default router;
//module.exports = router;