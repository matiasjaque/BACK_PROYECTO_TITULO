import { Router } from 'express';
import {getUsuariosControlador, createUsuarioControlador,updateUsuarioControlador, login} from '../controllers/usuarios.controllers.js';
import {getVotacionesByIdControlador, getVotacionByIdControlador, updateVotacionEstadoControlador, createVotacionControlador, updateVotacionControlador, deleteVotacionControlador} from '../controllers/votaciones.controller.js';
import {getPreguntasControlador, getPreguntasGlobalControlador, getPreguntasConRespuestas, createPreguntaControlador, updatePreguntaControlador, deletePreguntaControlador} from '../controllers/preguntas.controller.js';
import {getRespuestasControlador, getRespuestasGlobalControlador, createRespuestaControlador,updateRespuestaControlador, deleteRespuestaControlador, updateVotoControlador, getVotosControlador} from '../controllers/respuestas.controller.js';
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

// obtener la votacion by id
router.get('/votacionById', getVotacionByIdControlador);


// crear una nueva votacion
router.post('/votacionCreate', createVotacionControlador);

//actualizar votacion
router.put('/votacionUpdate', updateVotacionControlador); 

//actualizar estado votacion
router.put('/votacionEstadoUpdate', updateVotacionEstadoControlador); 

//delete votacion
router.delete('/votacionDelete', deleteVotacionControlador);


// preguntas de las votaciones

// obtener todos las preguntas de una votacion de un usuario
router.get('/preguntasGet', getPreguntasControlador);

// obtener todos las preguntas de la base de datos
router.get('/preguntasGetGlobal', getPreguntasGlobalControlador);

// obtener todos las preguntas con respuestas de cierta votacion
router.get('/preguntasConRespuestas', getPreguntasConRespuestas);

// crear una nueva pregunta a una votacion
router.post('/preguntaCreate', createPreguntaControlador);

//actualizar una pregunta de una votacion
router.put('/preguntaUpdate', updatePreguntaControlador); 

//delete pregunta de una votacion
router.delete('/preguntaDelete', deletePreguntaControlador); 


// respuestas de las preguntas de las votaciones

// obtener todas las respuestas de una pregunta de una votacion de un usuario
router.get('/respuestasGet', getRespuestasControlador);

// obtener todas las respuestas 
router.get('/respuestasGetGlobal', getRespuestasGlobalControlador);

// obtener la cantidad de votos
router.get('/votosGet', getVotosControlador);

// crear una nueva respuesta a una pregunta de una votacion
router.post('/respuestaCreate', createRespuestaControlador);

//actualizar una respuesta de una votacion
router.put('/respuestaUpdate', updateRespuestaControlador); 

//permitir un voto a una respuesta
router.put('/votoUpdate', updateVotoControlador); 

//delete respuesta de una votacion
router.delete('/respuestaDelete', deleteRespuestaControlador); 


// zona de pruebas
router.get('/hola', pruebaHola);

router.get('/prueba', prueba);

router.get('/pruebaLogin', doLoginPrueba);

export default router;
//module.exports = router;