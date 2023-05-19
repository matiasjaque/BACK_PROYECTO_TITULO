import {conexion} from '../config.js';

export const getUsuariosVotantes = async() =>{
    let connection;
    try{
        connection = await conexion.getConnection();
        const [rows] = await connection.execute("SELECT * FROM usuariovotante", []);
        console.log("services " + rows);
        //res.json(rows);
        return rows;
        //res.send("hola");
    }finally {
        if (connection) {
          connection.release();
        }
    }
    

}

export const buscarUsuarioVotante = async(idVotacion, rut) =>{
    let connection;

    try{
        connection = await conexion.getConnection();
        const [rows] = await connection.execute("SELECT * FROM usuariovotante WHERE rut = ? AND id_votacion = ?",
        [rut, idVotacion]);
        console.log("services ");
        console.log(rows);
        return rows.length > 0 ? rows[0] : null;
    }finally {
        if (connection) {
          connection.release();
        }
    }
}

export const createUsuarioVotante = async(nombre, rut, idVotacion, validacion, voto) =>{
    let connection;

    try{
        connection = await conexion.getConnection();
        const [rows] = await connection.execute("INSERT INTO usuariovotante (nombre, rut, id_votacion, validacion, voto) values (?,?,?,?,?)", 
        [nombre, rut, idVotacion, validacion, voto]);
        console.log("services " + rows);
        //res.json(rows);
        return rows;
        //res.send("hola");
    }finally {
        if (connection) {
          connection.release();
        }
    }

}

export const updateUsuarioVotante = async(idVotacion, rut) =>{
    let connection;

    try{
        connection = await conexion.getConnection();
        const [rows] = await connection.execute("UPDATE usuariovotante SET voto = 1 WHERE id_votacion = ? AND rut = ?", 
        [idVotacion, rut]);
        console.log("services " + rows);
        //res.json(rows);
        return rows;
        //res.send("hola");
    }finally {
        if (connection) {
          connection.release();
        }
    }

}

export const deleteUsuarioVotante = async(rut, idVotacion) =>{
    let connection;

    try{
        connection = await conexion.getConnection();
        const [rows] = await connection.execute("DELETE FROM usuariovotante WHERE id_votacion = ? AND rut = ?", 
        [ idVotacion, rut]);
        console.log("services ");
        console.log(rows);
        return rows;
    }finally {
        if (connection) {
          connection.release();
        }
    }
}
