import { Router } from 'express';
import {getUsuariosControlador, getUsuariosGmailControlador, updateContrasenaUsuarioControlador, createUsuarioControlador,updateUsuarioControlador, login} from '../controllers/usuarios.controllers.js';
import {getUsuariosVotanteControlador, createUsuarioVotanteControlador, createUsuarioVotantePorLoteControlador, updateUsuarioVotanteControlador, deleteUsuarioVotanteControlador, deleteUsuarioVotanteControladorLote} from '../controllers/usuarioVotante.controlador.js';
import {getVotacionesControlador, getVotacionesByIdControlador, getVotacionByIdControlador, updateVotacionEstadoControlador, createVotacionControlador, updateVotacionControlador, deleteVotacionControlador} from '../controllers/votaciones.controller.js';
import {getPreguntasControlador, getPreguntasGlobalControlador, getPreguntasConRespuestas, createPreguntaControlador,createPreguntaControladorLote, updatePreguntaControlador, updatePreguntaControladorLote, deletePreguntaControlador, deletePreguntaControladorLote} from '../controllers/preguntas.controller.js';
import {getRespuestasControlador, getRespuestasGlobalControlador, createRespuestaControlador, createRespuestaControladorLote, updateRespuestaControlador, deleteRespuestaControlador, updateVotoControlador, updateRespuestaControladorLote, getVotosControlador, deleteRespuestaControladorLote} from '../controllers/respuestas.controller.js';
import { pruebaHola, doLoginPrueba} from '../services/usuarios.services.js';

const router = Router();




// Usuario

// Login
router.get('/login', login);


// obtener todas las usuarios
router.get('/usuarios', getUsuariosControlador);

// obtener todas las usuarios
router.get('/usuariosGmail', getUsuariosGmailControlador);

// crear un nuevo usuario
router.post('/usuarioCreate', createUsuarioControlador);

//actualizar contraseña del usuario
router.put('/usuarioUpdate', updateUsuarioControlador);

//recuperar contraseña del usuario y enviar email
router.put('/usuarioUpdateContrasena', updateContrasenaUsuarioControlador);

// usuario votante

// obtener todas las usuarios
router.get('/usuariosVotante', getUsuariosVotanteControlador);

// crear un nuevo usuario
router.post('/usuarioVotanteCreate', createUsuarioVotanteControlador);

// crear un nuevo usuario votante por lote
router.post('/usuarioVotanteCreateLote', createUsuarioVotantePorLoteControlador);


//actualizar estado voto del usuario votante
router.put('/usuarioVotanteUpdate', updateUsuarioVotanteControlador);

//delete usuario votante
router.delete('/usuarioVotanteDelete', deleteUsuarioVotanteControlador);

//delete usuario votante x lote
router.delete('/usuarioVotanteDeleteLote', deleteUsuarioVotanteControladorLote);

// votaciones

// obtener todos los votaciones de la base de datos
router.get('/votacionesGenerales', getVotacionesControlador);

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

// crear una nueva pregunta x lote
router.post('/preguntaCreateLote', createPreguntaControladorLote);

//actualizar una pregunta de una votacion
router.put('/preguntaUpdate', updatePreguntaControlador); 

//actualizar una pregunta de una votacion x lote
router.put('/preguntaUpdateLote', updatePreguntaControladorLote); 

//delete pregunta de una votacion
router.delete('/preguntaDelete', deletePreguntaControlador); 

//delete pregunta de una votacion x lote
router.delete('/preguntaDeleteLote', deletePreguntaControladorLote); 


// respuestas de las preguntas de las votaciones

// obtener todas las respuestas de una pregunta de una votacion de un usuario
router.get('/respuestasGet', getRespuestasControlador);

// obtener todas las respuestas 
router.get('/respuestasGetGlobal', getRespuestasGlobalControlador);

// obtener la cantidad de votos
router.get('/votosGet', getVotosControlador);

// crear una nueva respuesta a una pregunta de una votacion
router.post('/respuestaCreate', createRespuestaControlador);

// crear una nueva respuesta x lote
router.post('/respuestaCreateLote', createRespuestaControladorLote);

//actualizar una respuesta de una votacion
router.put('/respuestaUpdate', updateRespuestaControlador);

//actualizar una respuesta de una votacion
router.put('/respuestaUpdateLote', updateRespuestaControladorLote);

//permitir un voto a una respuesta
router.put('/votoUpdate', updateVotoControlador); 

//delete respuesta de una votacion
router.delete('/respuestaDelete', deleteRespuestaControlador); 

//delete respuesta de una votacion
router.delete('/respuestaDeleteLote', deleteRespuestaControladorLote); 





// zona de pruebas
router.get('/hola', pruebaHola); 

router.get('/pruebaLogin', doLoginPrueba);

export default router;
//module.exports = router;