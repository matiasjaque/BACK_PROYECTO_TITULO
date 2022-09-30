import {conexion} from '../config.js';
import url from 'url';


export const doLogin = async (email, password) =>{
    const connection = await conexion();
    const [result] = await connection.execute("SELECT ID, NOMBRE, PASSWORD, APELLIDO_PATERNO FROM usuario WHERE EMAIL = ? AND PASSWORD = ?", 
    [email, password], false);
    console.log("resultado en services" + result);
    return result;
}


export const getUsuarios = async() =>{
    const connection = await conexion();
    const [rows] = await connection.execute("SELECT * FROM usuario", []);
    console.log("services " + rows);
    //res.json(rows);
    return rows;
    //res.send("hola");

}

export const createUsuario = async(nombre, apellidoPaterno, apellidoMaterno, email, password) =>{
    const connection = await conexion();
    const [rows] = await connection.execute("INSERT INTO usuario (nombre, apellido_paterno, apellido_materno, email, password) values (?,?,?,?,?)", 
    [nombre, apellidoPaterno, apellidoMaterno, email, password]);
    console.log("services " + rows);
    //res.json(rows);
    return rows;
    //res.send("hola");

}

export const updateUsuario = async(email, password) =>{
    const connection = await conexion();
    const [rows] = await connection.execute("UPDATE usuario SET password = ? WHERE email = ?", 
    [password, email]);
    console.log("services " + rows);
    //res.json(rows);
    return rows;
    //res.send("hola");

}




export const prueba = async(req, res) => {
    const connecction = await conexion();
    const [rows] = await connecction.execute('SELECT * FROM usuario');
    console.log("services " + rows);
}

export const pruebaHola = async(req, res) => {
    res.send('hola mundo desde el servido online');
}


// hacerla mas simple y ver que se puede crear la query
// pasando datos en postman
// luego hacer la consulta mas compleja con todas las rutas
// luego pasarle parametros de rial como si fuera
// la consulta verdadera
// cuando todo funcione verificarla en el front
export const doLoginPrueba = async(req, res) => {
    const queryObject = url.parse(req.url, true).query;
    var email = queryObject.email;
    console.log(email);
    const connection = await conexion();
    const result = await connection.execute("SELECT ID, NOMBRE, PASSWORD FROM usuario WHERE email = ?",[
        email, 
    ]);
    console.log(result);
    res.json(result);
}