import url from 'url';
import {getUsuariosVotantes, createUsuarioVotante, updateUsuarioVotante, deleteUsuarioVotante} from '../services/usuarioVotante.services.js';

const onlyLettersPattern = /^[a-zA-Z0-9?¿!¡ ()áéíóúñÁÉÍÓÚÑ]+$/;


// controlador de getUsuarios 

export const getUsuariosVotanteControlador = async function (req, res) {
    let result = await getUsuariosVotantes();
    console.log("controlador " + result);
    let usuarios = result; 
    console.log("usuarios: " + usuarios);

    if (usuarios.length === 0) {
        return res.status(401).json({message: 'No hay usuarios'});
    }
    else{
        return res.status(200).json(usuarios);
    }  
}

// controlador de createUsuario
export const createUsuarioVotanteControlador = async function (req, res) {
    const queryObject = url.parse(req.url, true).query;

    //obtener parametros
    var nombre = queryObject.nombre;
    var rut = queryObject.rut;
    var idVotacion = queryObject.idVotacion;
    var validacion = queryObject.validacion;

    if( !nombre.match(onlyLettersPattern) ||
        isNaN(idVotacion) || 
        isNaN(validacion) ||
        isNaN(rut) ){
        return res.status(401).json({message: '¡LOS PARAMETROS INGRESADOS SON INVALIDOS!'}); 
    }

    console.log(nombre, rut, idVotacion);

    let result = await createUsuarioVotante(nombre, rut, idVotacion, validacion, 0);
    console.log("data " +result);
    let usuario = result; 
    console.log("usuario: " + usuario);

    if (usuario.length === 0) {
        return res.status(401).json({message: 'No hay usuarios'});
    }
    else{
        return res.status(200).json(usuario);
    }  
}

// controlador de update contraseña del usuario
export const updateUsuarioVotanteControlador = async function (req, res) {
    const queryObject = url.parse(req.url, true).query;

    //obtener parametros
    var idVotacion = queryObject.idVotacion;
    var rut = queryObject.rut;

    console.log(idVotacion, rut);

    let result = await updateUsuarioVotante(idVotacion, rut);
    console.log("data " +result);
    let usuario = result; 
    console.log("usuario: " + usuario);

    if (usuario.length === 0) {
        return res.status(401).json({message: 'No hay usuarios'});
    }
    else{
        return res.status(200).json(usuario);
    }  
}

// controlador de delete usuario votante by id
export const deleteUsuarioVotanteControlador = async function (req, res) {
    const queryObject = url.parse(req.url, true).query;

    //obtener parametros
    var rut = queryObject.rut;
    var idVotacion = queryObject.idVotacion;

    if(isNaN(rut) || isNaN(idVotacion) ){
        return res.status(401).json({message: '¡LOS PARAMETROS INGRESADOS SON INVALIDOS!'}); 
    }

    console.log(rut, idVotacion);

    let result = await deleteUsuarioVotante(rut, idVotacion);
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


