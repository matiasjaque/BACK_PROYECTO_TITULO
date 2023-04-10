import url from 'url';
import {getPreguntas, getPreguntasGlobal, PreguntasConRespuestas, createPregunta, updatePregunta, deletePregunta} from '../services/preguntas.services.js';

const onlyLettersPattern = /^[a-zA-Z0-9]+$/;


// controlador de getPreguntas 

export const getPreguntasControlador = async function (req, res) {
    const queryObject = url.parse(req.url, true).query;
    console.log(queryObject);
    

    var idVotacion = queryObject.idVotacion;

    

    if(isNaN(idVotacion)){
        return res.status(401).json({message: '¡NO INGRESE CARACTERES ESPECIAL NI TEXTO, POR FAVOR!'}); 
    }

    
    console.log(idVotacion);

    let result = await getPreguntas(idVotacion);
    console.log("controlador " + result);
    let preguntas = result; 
    console.log("preguntas: " + preguntas);

    if (preguntas.length === 0) {
        return res.status(401).json({message: '¡NO HAY PREGUNTAS CREADAS AÚN!'});
    }
    else{
        return res.status(200).json(preguntas);
    }  
    

    
}

// controlador de gerPreguntasGlobal 

export const getPreguntasGlobalControlador = async function (req, res) {

    let result = await getPreguntasGlobal();
    console.log("controlador " + result);
    let preguntas = result; 
    console.log("preguntas: " + preguntas);

    if (preguntas.length === 0) {
        return res.status(401).json({message: '¡NO HAY PREGUNTAS CREADAS AÚN!'});
    }
    else{
        return res.status(200).json(preguntas);
    }  
}

// controlador de gerPreguntasGlobal 

export const getPreguntasConRespuestas = async function (req, res) {
    const queryObject = url.parse(req.url, true).query;


    //obtener parametros
    var idVotacion = queryObject.idVotacion;

    if(isNaN(idVotacion)){
        return res.status(401).json({message: '¡NO INGRESE CARACTERES ESPECIAL NI TEXTO, POR FAVOR!'}); 
    }

    else{
        let result = await PreguntasConRespuestas(idVotacion);
        console.log("controlador " + result);
        let preguntas = result; 
        console.log("preguntas: " + preguntas);
    
        if (preguntas.length === 0) {
            return res.status(401).json({message: '¡NO HAY PREGUNTAS CREADAS AÚN!'});
        }
        else{
            return res.status(200).json(preguntas);
        }  
    }

    
}





// controlador de createPreguntaControlador
export const createPreguntaControlador = async function (req, res) {
    const queryObject = url.parse(req.url, true).query;

    //obtener parametros
    var idVotacion = queryObject.idVotacion;
    var titulo = queryObject.titulo;
    var idPregunta = queryObject.idPregunta;

    console.log(idVotacion, titulo);

    if(isNaN(idVotacion) || isNaN(idPregunta) || !titulo.match(onlyLettersPattern)){
        return res.status(401).json({message: '¡LOS PARAMETROS INGRESADOS SON INVALIDOS!'}); 
    }

    else{
        let result = await createPregunta(idVotacion, titulo, idPregunta);
        console.log("data " +result);
        let pregunta = result; 
        console.log("pregunta: ");
        console.log(pregunta);
    
        if (pregunta.length === 0) {
            return res.status(401).json({message: '¡NO SE PUDO CREAR LA PREGUNTA!'});
        }
        else{
            return res.status(200).json(pregunta);
        }  
    }
    

    
}

// controlador de update pregunta by id
export const updatePreguntaControlador = async function (req, res) {
    const queryObject = url.parse(req.url, true).query;

    //obtener parametros
    var idPregunta = queryObject.idPregunta;
    var idVotacion = queryObject.idVotacion;
    var titulo = queryObject.titulo;

    console.log(idPregunta, idVotacion, titulo);

    if(isNaN(idVotacion) || isNaN(idPregunta) || !titulo.match(onlyLettersPattern)){
        return res.status(401).json({message: '¡LOS PARAMETROS INGRESADOS SON INVALIDOS!'}); 
    }

    else{
        let result = await updatePregunta(idPregunta, titulo, idVotacion);
        console.log("data " +result);
        let pregunta = result; 
        console.log("pregunta: ");
        console.log(pregunta);
    
        if (pregunta.length === 0) {
            return res.status(401).json({message: '?NO HAY PREGUNTAS!'});
        }
        else{
            return res.status(200).json(pregunta);
        }  
    }
    
}



// controlador de delete pregunta by id
export const deletePreguntaControlador = async function (req, res) {
    const queryObject = url.parse(req.url, true).query;

    //obtener parametros
    var idPregunta = queryObject.idPregunta;
    var idVotacion = queryObject.idVotacion;

    console.log(idPregunta, idVotacion);

    if(isNaN(idVotacion) || isNaN(idPregunta)){
        return res.status(401).json({message: '¡LOS PARAMETROS INGRESADOS SON INVALIDOS!'}); 
    }

    else{
        let result = await deletePregunta(idPregunta, idVotacion);
        console.log("data " +result);
        let pregunta = result; 
        console.log("pregunta: " + pregunta);

        if (pregunta.length === 0) {
            return res.status(401).json({message: '¡NO EXISTE LA PREGUNTA A ELIMINAR!'});
        }
        else{
            return res.status(200).json(pregunta);
        }  
    }
}

