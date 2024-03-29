import url from 'url';
import * as Sentry from "@sentry/node";
import {getPreguntas, getPreguntasGlobal, PreguntasConRespuestas, createPregunta, updatePregunta, deletePregunta} from '../services/preguntas.services.js';


// Inicializar Sentry
Sentry.init({
    dsn: "https://ce9a9e5f107e47cdb2494e358172e645@o4505194838294528.ingest.sentry.io/4505194968383488",
    tracesSampleRate: 1.0,
  });

const onlyLettersPattern = /^[a-zA-Z0-9?¿!¡ ()áéíóúñÁÉÍÓÚÑ]+$/;



// controlador de getPreguntas 

export const getPreguntasControlador = async function (req, res) {
    const queryObject = url.parse(req.url, true).query;
    console.log(queryObject);
    

    var idVotacion = queryObject.idVotacion;

    

    if(isNaN(idVotacion)){
        return res.status(401).json({message: '¡NO INGRESE CARACTERES ESPECIAL NI TEXTO, POR FAVOR!'}); 
    }


    else{
        try{
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
        }catch (error) {
            console.log(error);
            // Capturar y enviar el error a Sentry
            Sentry.captureException(error);
            res.status(500).json({ message: error.message });
        }
    }

    
    

    
}

// controlador de gerPreguntasGlobal 

export const getPreguntasGlobalControlador = async function (req, res) {

    try{
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
    }catch (error) {
        console.log(error);
        // Capturar y enviar el error a Sentry
        Sentry.captureException(error);
        res.status(500).json({ message: error.message });
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
        try{
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
        }catch (error) {
            console.log(error);
            // Capturar y enviar el error a Sentry
            Sentry.captureException(error);
            res.status(500).json({ message: error.message });
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

    console.log(req.url,true)
    console.log((req.url,true).query)
    console.log(url.parse(req.url, true).query)
    

    console.log(idVotacion, titulo, idPregunta);

    if(isNaN(idVotacion) || isNaN(idPregunta) || !titulo.match(onlyLettersPattern)){
        return res.status(401).json({message: '¡LOS PARAMETROS INGRESADOS SON INVALIDOS!'}); 
    }

    else{
        try{
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
        }catch (error) {
            console.log(error);
            // Capturar y enviar el error a Sentry
            Sentry.captureException(error);
            res.status(500).json({ message: error.message });
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
        try{
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
        } catch (error) {
            console.log(error);
            // Capturar y enviar el error a Sentry
            Sentry.captureException(error);
            res.status(500).json({ message: error.message });
        }
         
    }
    
}




// controlador de update pregunta by id x lote
export const updatePreguntaControladorLote = async function (req, res) {

    const preguntasActualizar = req.body;
    console.log(preguntasActualizar)
    if (!Array.isArray(preguntasActualizar)) {
        return res.status(400).json({ message: 'El cuerpo de la solicitud debe ser un arreglo de preguntas' });
    }

    
    try {
        for (const pregunta of preguntasActualizar) {
            console.log(pregunta.idVotacion, pregunta.idPregunta, pregunta.titulo)
            if(
            isNaN(pregunta.idVotacion) || 
            isNaN(pregunta.idPregunta) ){
                return res.status(401).json({message: '¡LOS PARAMETROS INGRESADOS SON INVALIDOS!'}); 
            }
          const idPregunta = pregunta.idPregunta;
          const idVotacion = pregunta.idVotacion;
          const titulo = pregunta.titulo;
          await updatePregunta(idPregunta, titulo, idVotacion);
        }
        res.status(200).json({ message: 'Preguntas eliminadas correctamente' });
    } catch (error) {
        console.log(error);
        // Capturar y enviar el error a Sentry
        Sentry.captureException(error);
        res.status(500).json({ message: error.message });
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
        try{
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
        } catch (error) {
            console.log(error);
            // Capturar y enviar el error a Sentry
            Sentry.captureException(error);
            res.status(500).json({ message: error.message });
        }
        
    }
}


// controlador de delete pregunta by id x lote
export const deletePreguntaControladorLote = async function (req, res) {
    const preguntasEliminar = req.body;
    console.log(preguntasEliminar)
    if (!Array.isArray(preguntasEliminar)) {
        return res.status(400).json({ message: 'El cuerpo de la solicitud debe ser un arreglo de preguntas' });
    }

    
    try {
        for (const pregunta of preguntasEliminar) {
            console.log(pregunta.idVotacion, pregunta.idPregunta)
            if(
            isNaN(pregunta.idVotacion) || 
            isNaN(pregunta.idPregunta) ){
                return res.status(401).json({message: '¡LOS PARAMETROS INGRESADOS SON INVALIDOS!'}); 
            }
          const idPregunta = pregunta.idPregunta;
          const idVotacion = pregunta.idVotacion;
          await deletePregunta(idPregunta, idVotacion);
        }
        res.status(200).json({ message: 'Preguntas eliminadas correctamente' });
    } catch (error) {
        console.log(error);
        // Capturar y enviar el error a Sentry
        Sentry.captureException(error);
        res.status(500).json({ message: error.message });
    }


}

// controlador de createPreguntaControlador
export const createPreguntaControladorLote = async function (req, res) {

    const preguntasAgregar = req.body;
    console.log(preguntasAgregar)
    if (!Array.isArray(preguntasAgregar)) {
        return res.status(400).json({ message: 'El cuerpo de la solicitud debe ser un arreglo de preguntas' });
    }

    
    try {
        for (const pregunta of preguntasAgregar) {
            console.log(pregunta.idVotacion, pregunta.titulo, pregunta.idPregunta)
            if(!pregunta.titulo.match(onlyLettersPattern)||
            isNaN(pregunta.idVotacion) || 
            isNaN(pregunta.idPregunta) ){
                return res.status(401).json({message: '¡LOS PARAMETROS INGRESADOS SON INVALIDOS!'}); 
            }
          const titulo = pregunta.titulo;  
          const idPregunta = pregunta.idPregunta;
          const idVotacion = pregunta.idVotacion;
          await createPregunta(idVotacion, titulo, idPregunta);
        }
        res.status(200).json({ message: 'Preguntas eliminadas correctamente' });
    } catch (error) {
        console.log(error);
        // Capturar y enviar el error a Sentry
        Sentry.captureException(error);
        res.status(500).json({ message: error.message });
    }
    
}





    

   
