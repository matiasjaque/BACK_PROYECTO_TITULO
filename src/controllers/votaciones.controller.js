import url from 'url';
import {getVotacionesGlobal, getVotacionesById, getVotacionById, createVotacion, updateVotacion, updateVotacionEstado, deleteVotacion} from '../services/votaciones.services.js';

const onlyLettersPattern = /^[a-zA-Z0-9?¿!¡ ()áéíóúñÁÉÍÓÚÑ]+$/;


// controlador de getVotaciones 

export const getVotacionesControlador = async function (req, res) {
    

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
}

// controlador de getVotaciones 

export const getVotacionesByIdControlador = async function (req, res) {
    const queryObject = url.parse(req.url, true).query;

    var idUsuario = queryObject.idUsuario;

    if(isNaN(idUsuario)){
        return res.status(401).json({message: '¡NO INGRESE CARACTERES ESPECIAL NI TEXTO, POR FAVOR!'}); 
    }

    console.log(idUsuario);

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
}

// controlador de getVotacion 

export const getVotacionByIdControlador = async function (req, res) {
    const queryObject = url.parse(req.url, true).query;

    var idVotacion = queryObject.idVotacion;

    if(isNaN(idVotacion)){
        return res.status(401).json({message: '¡NO INGRESE CARACTERES ESPECIAL NI TEXTO, POR FAVOR!'}); 
    }

    console.log(idVotacion);

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
}

// controlador de update votacion by id
export const updateVotacionControlador = async function (req, res) {
    const queryObject = url.parse(req.url, true).query;

    //obtener parametros
    var idUsuario = queryObject.idUsuario;
    var idVotacion = queryObject.idVotacion;
    var titulo = queryObject.titulo;

    if(isNaN(idUsuario) || isNaN(idVotacion) || !titulo.match(onlyLettersPattern)){
        return res.status(401).json({message: '¡LOS PARAMETROS INGRESADOS SON INVALIDOS!'}); 
    }

    console.log(idUsuario, idVotacion, titulo);

    let result = await updateVotacion(idUsuario, titulo, idVotacion);
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
}





