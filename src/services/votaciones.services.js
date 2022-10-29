import {conexion} from '../config.js';


export const getVotacionesById = async(idUsuario) =>{
    const connection = await conexion();
    const [rows] = await connection.execute("SELECT titulo, fecha_modificacion, id_votacion, estado FROM votacion WHERE id = ?",
        [idUsuario]);
    console.log("services ");
    console.log(rows);
    //res.json(rows);
    return rows;
    //res.send("hola");

}

export const getVotacionById = async(idVotacion) =>{
    const connection = await conexion();
    const [rows] = await connection.execute("SELECT * FROM votacion WHERE id_votacion = ?",
        [idVotacion]);
    console.log("services ");
    console.log(rows);
    //res.json(rows);
    return rows;
    //res.send("hola");

}



export const createVotacion = async(idUsuario, titulo, idVotacion, estado, tipo) =>{
    const connection = await conexion();
    console.log(idUsuario, titulo, idVotacion, estado, tipo);
    const [rows] = await connection.execute("INSERT INTO votacion (ID_VOTACION, TITULO, ID, estado, tipo) values (?,?,?,?,?)", 
    [idVotacion, titulo, idUsuario, estado, tipo]);
    console.log("services ");
    console.log(rows);
    //res.json(rows);
    return rows;
    //res.send("hola");

}

export const updateVotacion = async(idUsuario, titulo, idVotacion) =>{
    const connection = await conexion();
    const [rows] = await connection.execute("UPDATE votacion set titulo = ? WHERE id = ? AND id_votacion = ?", 
    [titulo, idUsuario, idVotacion]);
    console.log("services ");
    console.log(rows);
    //res.json(rows);
    return rows;
    //res.send("hola");

}

export const updateVotacionEstado = async(idUsuario, estado, idVotacion) =>{
    const connection = await conexion();
    const [rows] = await connection.execute("UPDATE votacion set estado = ? WHERE id = ? AND id_votacion = ?", 
    [estado, idUsuario, idVotacion]);
    console.log("services ");
    console.log(rows);
    //res.json(rows);
    return rows;
    //res.send("hola");

}



export const deleteVotacion = async(idUsuario, idVotacion) =>{
    const connection = await conexion();
    const [rows] = await connection.execute("DELETE FROM votacion WHERE id = ? AND id_votacion = ?", 
    [ idUsuario, idVotacion]);
    console.log("services ");
    console.log(rows);
    return rows;
}




