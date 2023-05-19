import {conexion} from '../config.js';


export const getVotacionesGlobal = async(idUsuario) =>{
    let connection;
    try{
        connection = await conexion.getConnection();
        const [rows] = await connection.execute("SELECT * FROM votacion");
        console.log("services ");
        console.log(rows);
        return rows;
    }finally {
        if (connection) {
          connection.release();
        }
    }
    

}

export const getVotacionesById = async(idUsuario) =>{
    let connection;
    try{
        connection = await conexion.getConnection();
        const [rows] = await connection.execute("SELECT titulo, fecha_modificacion, id_votacion, estado, porcentaje, segura, tipo FROM votacion WHERE id = ?",
            [idUsuario]);
        console.log("services ");
        console.log(rows);
        //res.json(rows);
        return rows;
        //res.send("hola");
    }finally {
        if (connection) {
          connection.release();
        }
    }
    

}

export const getVotacionById = async(idVotacion) =>{
    let connection;
    try{
        connection = await conexion.getConnection();
        const [rows] = await connection.execute("SELECT * FROM votacion WHERE id_votacion = ?",
            [idVotacion]);
        console.log("services ");
        console.log(rows);
        //res.json(rows);
        return rows;
        //res.send("hola");
    }finally {
        if (connection) {
          connection.release();
        }
    }
    

}



export const createVotacion = async(idUsuario, titulo, idVotacion, estado, tipo, porcentaje, segura) =>{
    let connection;
    try{
        connection = await conexion.getConnection();
        console.log(idUsuario, titulo, idVotacion, estado, tipo, porcentaje);
        const [rows] = await connection.execute("INSERT INTO votacion (ID_VOTACION, TITULO, ID, estado, tipo, porcentaje, segura) values (?,?,?,?,?,?,?)", 
        [idVotacion, titulo, idUsuario, estado, tipo, porcentaje, segura]);
        console.log("services ");
        console.log(rows);
        //res.json(rows);
        return rows;
        //res.send("hola");
    }finally {
        if (connection) {
          connection.release();
        }
    }
    

}

export const updateVotacion = async(idUsuario, titulo, idVotacion, porcentaje) =>{
    let connection;
    try{
        connection = await conexion.getConnection();
        const [rows] = await connection.execute("UPDATE votacion set titulo = ?, porcentaje = ? WHERE id = ? AND id_votacion = ?", 
        [titulo, porcentaje, idUsuario, idVotacion]);
        console.log("services ");
        console.log(rows);
        //res.json(rows);
        return rows;
        //res.send("hola");
    }finally {
        if (connection) {
          connection.release();
        }
    }
    

}

export const updateVotacionEstado = async(idUsuario, estado, idVotacion) =>{
    let connection;
    try{
        connection = await conexion.getConnection();
        const [rows] = await connection.execute("UPDATE votacion set estado = ? WHERE id = ? AND id_votacion = ?", 
        [estado, idUsuario, idVotacion]);
        console.log("services ");
        console.log(rows);
        //res.json(rows);
        return rows;
        //res.send("hola");
    }finally {
        if (connection) {
          connection.release();
        }
    }
    

}



export const deleteVotacion = async(idUsuario, idVotacion) =>{
    let connection;
    try{
        connection = await conexion.getConnection();
        const [rows] = await connection.execute("DELETE FROM votacion WHERE id = ? AND id_votacion = ?", 
        [ idUsuario, idVotacion]);
        console.log("services ");
        console.log(rows);
        return rows;
    }finally {
        if (connection) {
          connection.release();
        }
    }
    
}




