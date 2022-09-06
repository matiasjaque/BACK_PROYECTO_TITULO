import url from 'url';
import {getVotacionesById, createVotacion, updateVotacion,deleteVotacion} from '../services/votaciones.services.js';



// controlador de getVotaciones 

export const getVotacionesByIdControlador = async function (req, res) {
    const queryObject = url.parse(req.url, true).query;

    var idUsuario = queryObject.idUsuario;

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

// controlador de createVotacionControlador
export const createVotacionControlador = async function (req, res) {
    const queryObject = url.parse(req.url, true).query;

    //obtener parametros
    var idUsuario = queryObject.idUsuario;
    var titulo = queryObject.titulo;

    console.log(idUsuario, titulo);

    let result = await createVotacion(idUsuario, titulo );
    console.log("data " +result);
    let votacion = result; 
    console.log("votacion: " + votacion);

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

// controlador de delete votacion by id
export const deleteVotacionControlador = async function (req, res) {
    const queryObject = url.parse(req.url, true).query;

    //obtener parametros
    var idUsuario = queryObject.idUsuario;
    var idVotacion = queryObject.idVotacion;

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





