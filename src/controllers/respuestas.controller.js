import url from 'url';
import {getRespuestas, getRespuestasGlobal, createRespuesta, updateRespuesta, deleteRespuesta, updateVoto, getVotos, buscarRespuesta} from '../services/respuestas.services.js';

const onlyLettersPattern = /^[a-zA-Z0-9?¿!¡ ()áéíóúñÁÉÍÓÚÑ]+$/;


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

    // validar si la respuesta ya existe
    const respuestaExistente = await buscarRespuesta(respuestas, idPregunta);

    if(respuestaExistente){
        return res.status(409).json({message: 'La respuesta ya existe'});
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
    
    const votos = req.body;
    console.log(votos)
    if (!Array.isArray(votos)) {
        return res.status(400).json({ message: 'El cuerpo de la solicitud debe ser un arreglo de votos' });
    }

    try {
        for (const voto of votos) {
          const idPregunta = voto.idPregunta;
          const idRespuesta = voto.idRespuesta;
          const cantVotos = voto.voto;
          await updateVoto(idPregunta, idRespuesta, cantVotos);
        }
        res.status(200).json({ message: 'Votos actualizados correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al actualizar los votos' });
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

// controlador de delete respuesta by lote
export const deleteRespuestaControladorLote = async function (req, res) {

    const respuestasEliminar = req.body;
    console.log(respuestasEliminar)
    if (!Array.isArray(respuestasEliminar)) {
        return res.status(400).json({ message: 'El cuerpo de la solicitud debe ser un arreglo de preguntas' });
    }

    try {
        for (const respuesta of respuestasEliminar) {
            console.log(respuesta.idPregunta, respuesta.idRespuesta)
            if(
            isNaN(respuesta.idPregunta) || 
            isNaN(respuesta.idRespuesta) ){
                return res.status(401).json({message: '¡LOS PARAMETROS INGRESADOS SON INVALIDOS!'}); 
            }
          const idRespuesta = respuesta.idRespuesta;
          const idPregunta = respuesta.idPregunta;
          await deleteRespuesta(idPregunta, idRespuesta);
        }
        res.status(200).json({ message: 'Preguntas eliminadas correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al eliminar las preguntas' });
    }


}


// controlador de createRespuesta x lote
export const createRespuestaControladorLote = async function (req, res) {


    const respuestasAgregar = req.body;
    console.log(respuestasAgregar)
    if (!Array.isArray(respuestasAgregar)) {
        return res.status(400).json({ message: 'El cuerpo de la solicitud debe ser un arreglo de preguntas' });
    }

    try {
        for (const respuesta of respuestasAgregar) {
            console.log(respuesta.idPregunta, respuesta.respuestas)
            if(
            isNaN(respuesta.idPregunta) || 
            !respuesta.respuestas.match(onlyLettersPattern) ){
                return res.status(401).json({message: '¡LOS PARAMETROS INGRESADOS SON INVALIDOS!'}); 
            }
          const respuestas = respuesta.respuestas;
          const idPregunta = respuesta.idPregunta;
          await createRespuesta(idPregunta, respuestas );
        }
        res.status(200).json({ message: 'Preguntas eliminadas correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al eliminar las preguntas' });
    }

}





    
    
