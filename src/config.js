import mysql from 'mysql2/promise';


/* export const conexion = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    database: 'proyectoTitulo',
    user: 'root',
    password: 'matiasjaque',
  }); */


//export const conexion = async() =>{
    
    /* return await mysql.createConnection({   

        host: 'localhost',
        database: 'proyectoTitulo',
        user: 'root',
        password: 'matiasjaque',
    }) */

    export const conexion = mysql.createPool({
        connectionLimit: 50,
        host: 'bd-remota.mysql.database.azure.com',
        database: 'bd-remota',
        user: 'adminmysql',
        password: 'matiasjaque2000*',
      });

    /* return await mysql.createConnection({
        host: 'bd-remota.mysql.database.azure.com',
        database: 'bd-remota',
        user: 'adminmysql',
        password: 'matiasjaque2000*',
    }) */  

    /* return await mysql.createConnection({
        host: 'us-cdbr-east-06.cleardb.net',
        database: 'heroku_4ee8e3e776a72ff',
        user: 'b1caafadaac623',
        password: 'ce65f55c',
        migrate: 'safe',
    })   */
//}



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