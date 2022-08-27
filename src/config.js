import mysql from 'mysql2/promise';


export const conexion = async() =>{
    return await mysql.createConnection({
        host: 'localhost',
        database: 'proyectoTitulo',
        user: 'root',
        password: 'matiasjaque',
    })
}



/* conexion.connect(function (err) {
    if (err) {
        throw err; 
    }else {
            console.log('Conexion exitosa' );
        }
}); */

/* async function open(sql, binds, autoCommit){
    let con = await conexion();
    let result = await con.query(sql, binds, autoCommit);
    con.release();
    return result;
} */



//exports.open = conexion;
//exports.Open = open;
//conexion.end();