import url from 'url';
import {getRespuestas, getRespuestasGlobal, createRespuesta, updateRespuesta, deleteRespuesta, updateVoto, getVotos} from '../services/respuestas.services.js';

const onlyLettersPattern = /^[a-zA-Z0-9?¿!¡ ()áéíóú]+$/;

// controlador de getRespuestas 

export const getRespuestasControlador = async function (req, res) {
    const queryObject = url.parse(req.url, true).query;

    var idPregunta = queryObject.idPregunta;

    if(isNaN(idPregunta)){
        return res.status(401).json({message: '¡NO INGRESE CARACTERES ESPECIAL NI TEXTO, POR FAVOR!'}); 
    }

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

// controlador de getRespuestasGlobal 

export const getRespuestasGlobalControlador = async function (req, res) {

    let result = await getRespuestasGlobal();
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

    if(isNaN(idPregunta) || !respuestas.match(onlyLettersPattern)){
        return res.status(401).json({message: '¡LOS PARAMETROS INGRESADOS SON INVALIDOS!'}); 
    }

    

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

    if(isNaN(idPregunta) || isNaN(idRespuesta) || !respuestas.match(onlyLettersPattern)){
        return res.status(401).json({message: '¡LOS PARAMETROS INGRESADOS SON INVALIDOS!'}); 
    }

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

    if(isNaN(idPregunta) || isNaN(idRespuesta) ){
        return res.status(401).json({message: '¡LOS PARAMETROS INGRESADOS SON INVALIDOS!'}); 
    }

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


// controlador de update respuesta by id
export const updateVotoControlador = async function (req, res) {
    const queryObject = url.parse(req.url, true).query;

    //obtener parametros
    var idPregunta = queryObject.idPregunta;
    var idRespuesta = queryObject.idRespuesta;
    var voto = queryObject.voto;

    if(isNaN(idPregunta) || isNaN(idRespuesta) || isNaN(voto)){
        return res.status(401).json({message: '¡LOS PARAMETROS INGRESADOS SON INVALIDOS!'}); 
    }

    console.log(idPregunta, idRespuesta, voto);

    let result = await updateVoto(idPregunta, idRespuesta, voto);
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

// controlador de getVotos 

export const getVotosControlador = async function (req, res) {
    const queryObject = url.parse(req.url, true).query;

    var idRespuesta = queryObject.idRespuesta;

    console.log(idRespuesta);

    if(isNaN(idRespuesta)){
        return res.status(401).json({message: '¡NO INGRESE CARACTERES ESPECIAL NI TEXTO, POR FAVOR!'}); 
    }

    let result = await getVotos(idRespuesta);
    console.log("controlador " + result);
    let voto = result; 
    console.log("voto: ");
    console.log(voto);

    if (voto.length === 0) {
        return res.status(401).json({message: '¡NO HAY VOTOS CREADAS AÚN!'});
    }
    else{
        return res.status(200).json(voto);
    }  
}
