import {conexion} from '../config.js';

export const getUsuariosVotantes = async() =>{
    const connection = await conexion();
    const [rows] = await connection.execute("SELECT * FROM usuariovotante", []);
    console.log("services " + rows);
    //res.json(rows);
    return rows;
    //res.send("hola");

}

export const createUsuarioVotante = async(nombre, rut, idVotacion, validacion, voto) =>{
    const connection = await conexion();
    const [rows] = await connection.execute("INSERT INTO usuariovotante (nombre, rut, id_votacion, validacion, voto) values (?,?,?,?,?)", 
    [nombre, rut, idVotacion, validacion, voto]);
    console.log("services " + rows);
    //res.json(rows);
    return rows;
    //res.send("hola");

}

export const updateUsuarioVotante = async(idVotacion, rut) =>{
    const connection = await conexion();
    const [rows] = await connection.execute("UPDATE usuariovotante SET voto = 1 WHERE id_votacion = ? AND rut = ?", 
    [idVotacion, rut]);
    console.log("services " + rows);
    //res.json(rows);
    return rows;
    //res.send("hola");

}

export const deleteUsuarioVotante = async(rut, idVotacion) =>{
    const connection = await conexion();
    const [rows] = await connection.execute("DELETE FROM usuariovotante WHERE id_votacion = ? AND rut = ?", 
    [ idVotacion, rut]);
    console.log("services ");
    console.log(rows);
    return rows;
}
