import {conexion} from '../config.js';



export const getRespuestas = async(idPregunta) =>{
    let connection;

    try{
        connection = await conexion.getConnection();
        const [rows] = await connection.execute("SELECT respuesta, votos FROM respuesta WHERE id_pregunta = ?",
            [idPregunta]);
        console.log("services ");
        console.log(rows);
        return rows;
    }finally {
        if (connection) {
          connection.release();
        }
    }
}

export const getRespuestasGlobal = async() =>{
    let connection;

    try{
        connection = await conexion.getConnection();
        const [rows] = await connection.execute("SELECT * FROM respuesta");
        console.log("services ");
        console.log(rows);
        return rows;
    }finally {
        if (connection) {
          connection.release();
        }
    }
}

export const buscarRespuesta = async(respuestas, idPregunta) =>{
    let connection;

    try{
        connection = await conexion.getConnection();
        const [rows] = await connection.execute("SELECT * FROM respuesta WHERE respuesta = ? AND id_pregunta = ?",
        [respuestas, idPregunta]);
        console.log("services ");
        console.log(rows);
        return rows.length > 0 ? rows[0] : null;
    }finally {
        if (connection) {
          connection.release();
        }
    }
}



export const createRespuesta = async(idPregunta, respuestas) =>{
    let connection;

    try{
        connection = await conexion.getConnection();
        const [rows] = await connection.execute("INSERT INTO respuesta (id_pregunta, respuesta, votos) values (?,?,?)", 
        [idPregunta, respuestas, 0]);
        console.log("services ");
        console.log(rows);
        return rows;
    }finally {
        if (connection) {
          connection.release();
        }
    }
}


export const updateRespuesta = async(idPregunta, respuestas, idRespuesta) =>{
    let connection;

    try{
        connection = await conexion.getConnection();
        const [rows] = await connection.execute("UPDATE respuesta set respuesta = ? WHERE id_pregunta = ? AND id_respuesta = ?", 
        [respuestas, idPregunta, idRespuesta]);
        console.log("services ");
        console.log(rows);
        return rows;
    }finally {
        if (connection) {
          connection.release();
        }
    }
}


export const deleteRespuesta = async(idPregunta, idRespuesta) =>{
    let connection;

    try{
        connection = await conexion.getConnection();
        const [rows] = await connection.execute("DELETE FROM respuesta WHERE id_pregunta = ? AND id_respuesta = ?", 
        [ idPregunta, idRespuesta]);
        console.log("services ");
        console.log(rows);
        return rows;
    }finally {
        if (connection) {
          connection.release();
        }
    }
}


export const updateVoto = async(idPregunta, idRespuesta, voto) =>{
    let connection;

    try{
        console.log(voto, idPregunta, idRespuesta)
        connection = await conexion.getConnection();
        const [rows] = await connection.execute("UPDATE respuesta set votos = ? WHERE id_pregunta = ? AND id_respuesta = ?", 
        [voto, idPregunta, idRespuesta]);
        console.log("services ");
        console.log(rows);
        return rows;
    }finally {
        if (connection) {
          connection.release();
        }
    }
}


export const getVotos = async(idRespuesta) =>{
    let connection;

    try{
        connection = await conexion.getConnection();
        const [rows] = await connection.execute("SELECT votos FROM respuesta WHERE id_respuesta = ?",
            [idRespuesta]);
        console.log("services ");
        console.log(rows);
        return rows;
    }finally {
        if (connection) {
          connection.release();
        }
    }
}