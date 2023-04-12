import url from 'url';
import {doLogin, getUsuarios, getUsuariosGmail, createUsuario, updateUsuario, updateUsuarioContrasena, doLoginPrueba} from '../services/usuarios.services.js';

const onlyLettersPattern = /^[a-zA-Z0-9]+$/;

// controller de getUsuarios
//controla los errores y resultados

// controlador de login

export const login = async function (req, res) {
    const queryObject = url.parse(req.url, true).query;

    //obtener email
    var email = queryObject.email;

    //obtener contraseña
    var password = queryObject.password;

    //validar que existe el usuario
    console.log(email, password);

    let result = await doLogin(email, password);

    console.log("resultado del login: " + result);
    console.log("largo del login: " + result.length);
    console.log("metodo rows del login: " + result.rows);

    if (result.length === 0) {
        console.log("Usuario no existe");
        return res.status(401).json({message: 'El email o la contraseña ingresado son incorrectos'});
    }
    console.log("resultdo en [0].nombre: " + result[0].NOMBRE)
    let user = result[0];
    console.log("USUARIO: " + user.NOMBRE);
    console.log("USUARIO[2]: " + user.PASSWORD);
    if (user.PASSWORD === password) {
        user.PASSWORD = null;
        console.log(user);
        return res.status(200).json(user)
    }
    else{
        console.log("Contraseña invalida");
        return res.status(401).json({message: 'Contraseña invalida'});
    }
}




// controlador de getUsuarios 

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

// controlador de getUsuariosGmailControlador 

export const getUsuariosGmailControlador = async function (req, res) {
    let result = await getUsuariosGmail();
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
export const createUsuarioControlador = async function (req, res) {
    const queryObject = url.parse(req.url, true).query;

    //obtener parametros
    var nombre = queryObject.nombre;
    var apellidoPaterno = queryObject.apellidoPaterno;
    var apellidoMaterno = queryObject.apellidoMaterno; 
    var email = queryObject.email;
    var password = queryObject.password;

    if( !nombre.match(onlyLettersPattern) ||
        !apellidoPaterno.match(onlyLettersPattern) || 
        !apellidoMaterno.match(onlyLettersPattern) ){
        return res.status(401).json({message: '¡LOS PARAMETROS INGRESADOS SON INVALIDOS!'}); 
    }

    console.log(nombre, apellidoPaterno, apellidoMaterno,email, password);

    let result = await createUsuario(nombre, apellidoPaterno, apellidoMaterno, email, password);
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
export const updateUsuarioControlador = async function (req, res) {
    const queryObject = url.parse(req.url, true).query;

    //obtener parametros
    var email = queryObject.email;
    var password = queryObject.password;

    console.log(email, password);

    let result = await updateUsuario(email, password);
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

function generarContraseña(longitud) {
    var caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var contraseña = "";
    for (var i = 0; i < longitud; i++) {
      contraseña += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return contraseña;
  }

// controlador de update contraseña del usuario y enviar email
export const updateContrasenaUsuarioControlador = async function (req, res) {
    const queryObject = url.parse(req.url, true).query;

    //obtener parametros
    var email = queryObject.email;
    var password = generarContraseña(8)
    // crear la contraseña nueva dinamica

    console.log(email, password);

    let result = await updateUsuarioContrasena(email, password);
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





// seccion  de pruebas

export const pruebaLogin= async function (req, res) {
    //const queryObject = url.parse(req.url, true).query;

    //obtener usuario
    //var username = queryObject.username;

    //obtener contraseña
    //var password = queryObject.password;

    //validar que existe el usuario
    //console.log(username, password);

    let result = await doLoginPrueba();

    console.log(result);

    if (result.rows.length === 0) {
        console.log("Usuario no existe");
        return res.status(401).json({message: 'El usuario no existe'});
    }
    let user = result.rows[0];
    console.log(user);
    if (user[2] === password) {
        user[2] = null;
        console.log(user);
        return res.status(200).json({user})
    }
    else{
        console.log("Contraseña invalida");
        return res.status(401).json({message: 'Contraseña invalida'});
    }
}