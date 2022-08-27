//import {conexion} from '../config';

import {conexion} from '../config.js';


export const getUsuarios = async() =>{
    const connection = await conexion();
    const [rows] = await connection.execute("SELECT * FROM usuario");
    console.log("services " + rows);
    //res.json(rows);
    return rows;
    //res.send("hola");

}

export const prueba = async(req, res) => {
    const connecction = await conexion();
    const [rows] = await connecction.execute('SELECT * FROM usuario');
    console.log("services " + rows);
    res.json(rows)
}