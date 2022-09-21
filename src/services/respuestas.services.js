import {conexion} from '../config.js';



export const getRespuestas = async(idPregunta) =>{
    const connection = await conexion();
    const [rows] = await connection.execute("SELECT respuesta, votos FROM respuesta WHERE id_pregunta = ?",
        [idPregunta]);
    console.log("services ");
    console.log(rows);
    return rows;
}

export const getRespuestasGlobal = async() =>{
    const connection = await conexion();
    const [rows] = await connection.execute("SELECT * FROM respuesta");
    console.log("services ");
    console.log(rows);
    return rows;
}



export const createRespuesta = async(idPregunta, respuestas) =>{
    const connection = await conexion();
    const [rows] = await connection.execute("INSERT INTO respuesta (id_pregunta, respuesta, votos) values (?,?,?)", 
    [idPregunta, respuestas, 0]);
    console.log("services ");
    console.log(rows);
    return rows;
}


export const updateRespuesta = async(idPregunta, respuestas, idRespuesta) =>{
    const connection = await conexion();
    const [rows] = await connection.execute("UPDATE respuesta set respuesta = ? WHERE id_pregunta = ? AND id_respuesta = ?", 
    [respuestas, idPregunta, idRespuesta]);
    console.log("services ");
    console.log(rows);
    return rows;
}


export const deleteRespuesta = async(idPregunta, idRespuesta) =>{
    const connection = await conexion();
    const [rows] = await connection.execute("DELETE FROM respuesta WHERE id_pregunta = ? AND id_respuesta = ?", 
    [ idPregunta, idRespuesta]);
    console.log("services ");
    console.log(rows);
    return rows;
}


export const updateVoto = async(idPregunta, idRespuesta, voto) =>{
    const connection = await conexion();
    const [rows] = await connection.execute("UPDATE respuesta set votos = ? WHERE id_pregunta = ? AND id_respuesta = ?", 
    [voto, idPregunta, idRespuesta]);
    console.log("services ");
    console.log(rows);
    return rows;
}


export const getVotos = async(idRespuesta) =>{
    const connection = await conexion();
    const [rows] = await connection.execute("SELECT votos FROM respuesta WHERE id_respuesta = ?",
        [idRespuesta]);
    console.log("services ");
    console.log(rows);
    return rows;
}