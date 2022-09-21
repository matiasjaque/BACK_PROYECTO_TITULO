import {conexion} from '../config.js';


export const getPreguntas = async(idVotacion) =>{
    const connection = await conexion();
    const [rows] = await connection.execute("SELECT titulo, id_pregunta FROM pregunta WHERE id_votacion = ?",
        [idVotacion]);
    console.log("services ");
    console.log(rows);
    return rows;
}

export const getPreguntasGlobal = async() =>{
    const connection = await conexion();
    const [rows] = await connection.execute("SELECT * FROM pregunta ");
    console.log("services ");
    console.log(rows);
    return rows;
}




export const createPregunta = async(idVotacion, titulo) =>{
    const connection = await conexion();
    const [rows] = await connection.execute("INSERT INTO pregunta (titulo, id_votacion) values (?,?)", 
    [titulo, idVotacion]);
    console.log("services ");
    console.log(rows);
    return rows;
}

export const updatePregunta = async(idPregunta, titulo, idVotacion) =>{
    const connection = await conexion();
    const [rows] = await connection.execute("UPDATE pregunta set titulo = ? WHERE id_pregunta = ? AND id_votacion = ?", 
    [titulo, idPregunta, idVotacion]);
    console.log("services ");
    console.log(rows);
    return rows;
}

export const deletePregunta = async(idPregunta, idVotacion) =>{
    const connection = await conexion();
    const [rows] = await connection.execute("DELETE FROM pregunta WHERE id_pregunta = ? AND id_votacion = ?", 
    [ idPregunta, idVotacion]);
    console.log("services ");
    console.log(rows);
    return rows;
}




