import url from 'url';
import * as Sentry from "@sentry/node";
import {getVotacionesGlobal, getVotacionesById, getVotacionById, createVotacion, updateVotacion, updateVotacionEstado, deleteVotacion} from '../services/votaciones.services.js';

// Inicializar Sentry
Sentry.init({
    dsn: "https://ce9a9e5f107e47cdb2494e358172e645@o4505194838294528.ingest.sentry.io/4505194968383488",
    tracesSampleRate: 1.0,
  });

const onlyLettersPattern = /^[a-zA-Z0-9?¿!¡ ()áéíóúñÁÉÍÓÚÑ]+$/;


// controlador de getVotaciones 

export const getVotacionesControlador = async function (req, res) {
    
    try{
        let result = await getVotacionesGlobal();
        console.log("controlador " + result);
        let votaciones = result; 
        console.log("votaciones: " + votaciones);
    
        if (votaciones.length === 0) {
            return res.status(401).json({message: '¡NO HAY VOTACIONES CREADAS AÚN!'});
        }
        else{
            return res.status(200).json(votaciones);
        } 
    }catch (error) {
        console.log(error);
        Sentry.captureException(error);
        res.status(500).json({ message: error.message });
    }
     
}

// controlador de getVotaciones 

export const getVotacionesByIdControlador = async function (req, res) {
    const queryObject = url.parse(req.url, true).query;

    var idUsuario = queryObject.idUsuario;

    if(isNaN(idUsuario)){
        return res.status(401).json({message: '¡NO INGRESE CARACTERES ESPECIAL NI TEXTO, POR FAVOR!'}); 
    }

    console.log(idUsuario);

    try{
        let result = await getVotacionesById(idUsuario);
        console.log("controlador " + result);
        let votaciones = result; 
        console.log("votaciones: " + votaciones);
    
        if (votaciones.length === 0) {
            return res.status(401).json({message: '¡NO HAY VOTACIONES CREADAS AÚN!'});
        }
        else{
            return res.status(200).json(votaciones);
        }  
    }catch (error) {
        console.log(error);
        Sentry.captureException(error);
        res.status(500).json({ message: error.message });
    }

    
}

// controlador de getVotacion 

export const getVotacionByIdControlador = async function (req, res) {
    const queryObject = url.parse(req.url, true).query;

    var idVotacion = queryObject.idVotacion;

    if(isNaN(idVotacion)){
        return res.status(401).json({message: '¡NO INGRESE CARACTERES ESPECIAL NI TEXTO, POR FAVOR!'}); 
    }

    console.log(idVotacion);

    try{
        let result = await getVotacionById(idVotacion);
        console.log("controlador " + result);
        let votaciones = result; 
        console.log("votaciones: " + votaciones);
    
        if (votaciones.length === 0) {
            return res.status(401).json({message: '¡NO HAY VOTACION CREADA AÚN!'});
        }
        else{
            return res.status(200).json(votaciones);
        }  
    }catch (error) {
        console.log(error);
        Sentry.captureException(error);
        res.status(500).json({ message: error.message });
    }

    
}


// controlador de createVotacionControlador
export const createVotacionControlador = async function (req, res) {

    const queryObject = url.parse(req.url, true).query;

    //obtener parametros
    var idUsuario = queryObject.idUsuario;
    var titulo = queryObject.titulo;
    var idVotacion = queryObject.idVotacion;
    var estado = queryObject.estado;
    var tipo = queryObject.tipo;
    var porcentaje = queryObject.porcentaje;
    var segura = queryObject.segura;

    console.log(idUsuario, titulo, idVotacion, estado, tipo, porcentaje, segura);

    if( isNaN(idUsuario) ||
        !titulo.match(onlyLettersPattern) ||
        isNaN(idVotacion) || 
        isNaN(estado)|| 
        !tipo.match(onlyLettersPattern) ||
        isNaN(porcentaje) ||
        isNaN(segura)){
        return res.status(401).json({message: '¡LOS PARAMETROS INGRESADOS SON INVALIDOS!'}); 
    }

    try{
        let result = await createVotacion(idUsuario, titulo, idVotacion, estado, tipo, porcentaje, segura );
        console.log("data " +result);
        let votacion = result; 
        console.log("votacion: ");  
        console.log(votacion);
    
        console.log("votacion: insertId ");
        console.log(votacion.insertId);
    
        if (votacion.length === 0) {
            return res.status(401).json({message: 'No se pudo crear la votacion'});
        }
        else{
            return res.status(200).json(votacion);
        } 
    }catch (error) {
        console.log(error);
        Sentry.captureException(error);
        res.status(500).json({ message: error.message });
    }

     
}

// controlador de update votacion by id
export const updateVotacionControlador = async function (req, res) {
    const queryObject = url.parse(req.url, true).query;

    //obtener parametros
    var idUsuario = queryObject.idUsuario;
    var idVotacion = queryObject.idVotacion;
    var titulo = queryObject.titulo;
    var porcentaje = queryObject.porcentaje;

    if(isNaN(idUsuario) || isNaN(idVotacion) || !titulo.match(onlyLettersPattern) || isNaN(porcentaje)){
        return res.status(401).json({message: '¡LOS PARAMETROS INGRESADOS SON INVALIDOS!'}); 
    }

    console.log(idUsuario, idVotacion, titulo, porcentaje);

    try{
        let result = await updateVotacion(idUsuario, titulo, idVotacion, porcentaje);
        console.log("data " +result);
        let votacion = result; 
        console.log("votacion: ");
        console.log(votacion);
    
        if (votacion.length === 0) {
            return res.status(401).json({message: 'No hay votacion'});
        }
        else{
            return res.status(200).json(votacion);
        }  
    }catch (error) {
        console.log(error);
        Sentry.captureException(error);
        res.status(500).json({ message: error.message });
    }

    
}

// controlador de update votacion estado by id
export const updateVotacionEstadoControlador = async function (req, res) {
    const queryObject = url.parse(req.url, true).query;

    //obtener parametros
    var idUsuario = queryObject.idUsuario;
    var idVotacion = queryObject.idVotacion;
    var estado = queryObject.estado;

    console.log(idUsuario, idVotacion, estado);
    if(isNaN(idUsuario) || isNaN(idVotacion) || isNaN(estado)){
        return res.status(401).json({message: '¡LOS PARAMETROS INGRESADOS SON INVALIDOS!'}); 
    }

    try{
        let result = await updateVotacionEstado(idUsuario, estado, idVotacion);
        console.log("data " +result);
        let votacion = result; 
        console.log("votacion: ");
        console.log(votacion);
    
        if (votacion.length === 0) {
            return res.status(401).json({message: 'No hay votacion'});
        }
        else{
            return res.status(200).json(votacion);
        }  
    }catch (error) {
        console.log(error);
        Sentry.captureException(error);
        res.status(500).json({ message: error.message });
    }

    
}



// controlador de delete votacion by id
export const deleteVotacionControlador = async function (req, res) {
    const queryObject = url.parse(req.url, true).query;

    //obtener parametros
    var idUsuario = queryObject.idUsuario;
    var idVotacion = queryObject.idVotacion;

    if(isNaN(idUsuario) || isNaN(idVotacion) ){
        return res.status(401).json({message: '¡LOS PARAMETROS INGRESADOS SON INVALIDOS!'}); 
    }

    console.log(idUsuario, idVotacion);

    try{
        let result = await deleteVotacion(idUsuario, idVotacion);
        console.log("data " +result);
        let votacion = result; 
        console.log("votacion: " + votacion);
    
        if (votacion.length === 0) {
            return res.status(401).json({message: 'No hay votacion'});
        }
        else{
            return res.status(200).json(votacion);
        }  
    }catch (error) {
        console.log(error);
        Sentry.captureException(error);
        res.status(500).json({ message: error.message });
    }

    
}





