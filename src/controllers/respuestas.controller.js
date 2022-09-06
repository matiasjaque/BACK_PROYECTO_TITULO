import url from 'url';
import {getRespuestas, createRespuesta, updateRespuesta, deleteRespuesta} from '../services/respuestas.services.js';



// controlador de getRespuestas 

export const getRespuestasControlador = async function (req, res) {
    const queryObject = url.parse(req.url, true).query;

    var idPregunta = queryObject.idPregunta;

    console.log(idPregunta);

    let result = await getRespuestas(idPregunta);
    console.log("controlador " + result);
    let respuestas = result; 
    console.log("respuestas: " + respuestas);

    if (respuestas.length === 0) {
        return res.status(401).json({message: '¡NO HAY RESPUESTAS CREADAS AÚN!'});
    }
    else{
        return res.status(200).json(respuestas);
    }  
}


// controlador de createRespuesta
export const createRespuestaControlador = async function (req, res) {
    const queryObject = url.parse(req.url, true).query;

    //obtener parametros
    var idPregunta = queryObject.idPregunta;
    var respuestas = queryObject.respuestas;

    console.log(idPregunta, respuestas);

    let result = await createRespuesta(idPregunta, respuestas );
    console.log("data " +result);
    let respuesta = result; 
    console.log("respuesta: ");
    console.log(respuesta);

    if (respuesta.length === 0) {
        return res.status(401).json({message: 'No se pudo crear la respuesta'});
    }
    else{
        return res.status(200).json(respuesta);
    }  
}



// controlador de update respuesta by id
export const updateRespuestaControlador = async function (req, res) {
    const queryObject = url.parse(req.url, true).query;

    //obtener parametros
    var idPregunta = queryObject.idPregunta;
    var idRespuesta = queryObject.idRespuesta;
    var respuestas = queryObject.respuestas;

    console.log(idPregunta, idRespuesta, respuestas);

    let result = await updateRespuesta(idPregunta, respuestas, idRespuesta);
    console.log("data " +result);
    let respuesta = result; 
    console.log("respuesta: ");
    console.log(respuesta);

    if (respuesta.length === 0) {
        return res.status(401).json({message: 'No hay respuesta'});
    }
    else{
        return res.status(200).json(respuesta);
    }  
}



// controlador de delete respuesta by id
export const deleteRespuestaControlador = async function (req, res) {
    const queryObject = url.parse(req.url, true).query;

    //obtener parametros
    var idPregunta = queryObject.idPregunta;
    var idRespuesta = queryObject.idRespuesta;

    console.log(idPregunta, idRespuesta);

    let result = await deleteRespuesta(idPregunta, idRespuesta);
    console.log("data " +result);
    let respuesta = result; 
    console.log("respuesta: " + respuesta);

    if (respuesta.length === 0) {
        return res.status(401).json({message: 'No hay respuesta'});
    }
    else{
        return res.status(200).json(respuesta);
    }  
}