//const url = require('url');
import {getUsuarios} from '../services/usuarios.services.js';

//var UsuariosServices = require('../services/Usuarios.Services');


/* exports.home = async function (req, res) {
    res.status(200).json({
        message: "ruta status 200"
    });
}; */

// controller de getUsuarios
//controla los errores y resultados

export const getUsuariosControlador = async function (req, res) {
    let result = await getUsuarios();
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




/* exports.getUsuarios = async function (req, res) {

    let result = await UsuariosServices.getUsuarios();
    let usuarios = result.rows;

    if (usuarios.length === 0) {
        return res.status(401).json({message: 'No hay usuarios'});
    }
    else{
        return res.status(200).json(usuarios);
    }   
} */
