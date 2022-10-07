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

export const PreguntasConRespuestas = async(idVotacion) =>{
    const connection = await conexion();
    const [rows] = await connection.execute(
        "SELECT p.ID_PREGUNTA, \
                p.TITULO,\
                r.ID_RESPUESTA, \
                r.RESPUESTA, \
                r.VOTOS \
                FROM votacion v join pregunta p on v.ID_VOTACION = p.ID_VOTACION \
                    join respuesta r on p.ID_PREGUNTA = r.ID_PREGUNTA\
                where v.ID_VOTACION = ?", [idVotacion]);
    console.log("services ");
    console.log(rows);
    return rows;
}






export const createPregunta = async(idVotacion, titulo, idPregunta) =>{
    const connection = await conexion();
    const [rows] = await connection.execute("INSERT INTO pregunta (id_pregunta, titulo, id_votacion) values (?,?,?)", 
    [idPregunta, titulo, idVotacion]);
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




