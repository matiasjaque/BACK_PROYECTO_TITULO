import url from 'url';
import * as Sentry from "@sentry/node";
import {getUsuariosVotantes, createUsuarioVotante, updateUsuarioVotante, deleteUsuarioVotante, buscarUsuarioVotante} from '../services/usuarioVotante.services.js';

// Inicializar Sentry
Sentry.init({
    dsn: "https://ce9a9e5f107e47cdb2494e358172e645@o4505194838294528.ingest.sentry.io/4505194968383488",
    tracesSampleRate: 1.0,
  });

const onlyLettersPattern = /^[a-zA-Z0-9?¿!¡ ()áéíóúñÁÉÍÓÚÑ]+$/;


// controlador de getUsuarios 

export const getUsuariosVotanteControlador = async function (req, res) {
    try{
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
    }catch (error) {
        console.log(error);
        // Capturar y enviar el error a Sentry
        Sentry.captureException(error);
        res.status(500).json({ message: error.message });
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

    // validar si la respuesta ya existe
    const usuarioVotanteExiste = await buscarUsuarioVotante(idVotacion, rut);

    if(usuarioVotanteExiste){
        return res.status(409).json({message: 'El usuario ya existe'});
    }

    try{
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
    }catch (error) {
        console.log(error);
        // Capturar y enviar el error a Sentry
        Sentry.captureException(error);
        res.status(500).json({ message: error.message });
    }

    
}


// controlador de createUsuarioVotante por lote
export const createUsuarioVotantePorLoteControlador = async function (req, res) {
    const usuarioVotantes = req.body;
    console.log(usuarioVotantes)
    if (!Array.isArray(usuarioVotantes)) {
        return res.status(400).json({ message: 'El cuerpo de la solicitud debe ser un arreglo de usuarios votantes' });
    }

    try {
        for (const userVotante of usuarioVotantes) {
            console.log(userVotante.NOMBRE, userVotante.idVotacion, userVotante.validacion, userVotante.RUT)
            if( !userVotante.NOMBRE.match(onlyLettersPattern) ||
            isNaN(userVotante.idVotacion) || 
            isNaN(userVotante.validacion) ||
            isNaN(userVotante.RUT) ){
                return res.status(401).json({message: '¡LOS PARAMETROS INGRESADOS SON INVALIDOS!'}); 
            }
          const nombre = userVotante.NOMBRE;
          const rut = userVotante.RUT;
          const idVotacion = userVotante.idVotacion;
          const validacion = userVotante.validacion;
          await createUsuarioVotante(nombre, rut, idVotacion, validacion, 0);
        }
        res.status(200).json({ message: 'Votos actualizados correctamente' });
    } catch (error) {
        console.log(error);
        Sentry.captureException(error);
        res.status(500).json({ message: error.message });
    }
    
}


// controlador de update contraseña del usuario
export const updateUsuarioVotanteControlador = async function (req, res) {
    const queryObject = url.parse(req.url, true).query;

    //obtener parametros
    var idVotacion = queryObject.idVotacion;
    var rut = queryObject.rut;

    console.log(idVotacion, rut);

    try{
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
    }catch (error) {
        console.log(error);
        Sentry.captureException(error);
        res.status(500).json({ message: error.message });
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

    try{
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
    }catch (error) {
        console.log(error);
        Sentry.captureException(error);
        res.status(500).json({ message: error.message });
    }

     
}

// controlador de delete usuario votante por lote
export const deleteUsuarioVotanteControladorLote = async function (req, res) {

    const usuarioVotantesEliminar = req.body;
    console.log(usuarioVotantesEliminar)
    if (!Array.isArray(usuarioVotantesEliminar)) {
        return res.status(400).json({ message: 'El cuerpo de la solicitud debe ser un arreglo de usuarios votantes' });
    }

    try {
        for (const userVotante of usuarioVotantesEliminar) {
            console.log(userVotante.idVotacion, userVotante.RUT)
            if(
            isNaN(userVotante.idVotacion) || 
            isNaN(userVotante.RUT) ){
                return res.status(401).json({message: '¡LOS PARAMETROS INGRESADOS SON INVALIDOS!'}); 
            }
          const rut = userVotante.RUT;
          const idVotacion = userVotante.idVotacion;
          await deleteUsuarioVotante(rut, idVotacion);
        }
        res.status(200).json({ message: 'Votos actualizados correctamente' });
    } catch (error) {
        console.log(error);
        Sentry.captureException(error);
        res.status(500).json({ message: error.message });
    }

   

}



   

