import {conexion} from '../config.js';
import url from 'url';
import nodeMailer from 'nodemailer'


export const doLogin = async (email, password) =>{
    let connection;

    try{
        connection = await conexion.getConnection();
        const [result] = await connection.execute("SELECT ID, NOMBRE, PASSWORD, APELLIDO_PATERNO FROM usuario WHERE EMAIL = ? AND PASSWORD = ?", 
        [email, password], false);
        console.log("resultado en services" + result);
        return result;
    }finally {
        if (connection) {
          connection.release();
        }
    }
}


export const getUsuarios = async() =>{
    let connection;

    try{
        connection = await conexion.getConnection();
        const [rows] = await connection.execute("SELECT * FROM usuario", []);
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

export const getUsuariosGmail = async() =>{
    let connection;

    try{
        connection = await conexion.getConnection();
        const [rows] = await connection.execute("SELECT email FROM usuario", []);
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



export const createUsuario = async(nombre, apellidoPaterno, apellidoMaterno, email, password) =>{
    let connection;

    try{
        connection = await conexion.getConnection();
        const [rows] = await connection.execute("INSERT INTO usuario (nombre, apellido_paterno, apellido_materno, email, password) values (?,?,?,?,?)", 
        [nombre, apellidoPaterno, apellidoMaterno, email, password]);
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

export const updateUsuario = async(email, password) =>{
    let connection;

    try{
        connection = await conexion.getConnection();
        const [rows] = await connection.execute("UPDATE usuario SET password = ? WHERE email = ?", 
        [password, email]);
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

export const updateUsuarioContrasena = async(email, password) =>{
    

    nodeMailer.createTestAccount((err, account) =>{
        const htmlEmail = `
        <h3>Email enviado desde software de votación electronica</h3>
        <ul>
            <li>Email: ${email}</li>
            <li>Asunto: "Recuperar contraseña"</li>
        </ul>
        <h3>Mensaje</h3>
        <p>"Su nueva contraseña es: " + ${password}</p>
        `;
        let transporter = nodeMailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "softwaredevotacion@gmail.com",
                pass: "uttmfrtmnczhntno" 
            },
            tls: {
                rejectUnauthorized: false
            }
        })

        let mailOptions = {
            from: "softwaredevotacion@gmail.com",
            to: email,
            replyTo: "softwaredevotacion@gmail.com",
            subject: "Softwaredevotacion",
            text: "texto",
            html: htmlEmail
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return console.log(err);
            }
            console.log("Mensaje enviado: %s", info.mensaje);
            console.log("Url del mensaje: %s",  nodeMailer.getTestMessageUrl(info)); 
        })
    })

    let connection;

    try{
        connection = await conexion.getConnection();
        const [rows] = await connection.execute("UPDATE usuario SET password = ? WHERE email = ?", 
        [password, email]);
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






export const prueba = async(req, res) => {
    const connecction = await conexion.getConnection();
    const [rows] = await connecction.execute('SELECT * FROM usuario');
    console.log("services " + rows);
}

export const pruebaHola = async(req, res) => {
    res.send('hola mundo desde el servido online original 19/03 update');
}


// hacerla mas simple y ver que se puede crear la query
// pasando datos en postman
// luego hacer la consulta mas compleja con todas las rutas
// luego pasarle parametros de rial como si fuera
// la consulta verdadera
// cuando todo funcione verificarla en el front
export const doLoginPrueba = async(req, res) => {
    let connection;

    try{
        const queryObject = url.parse(req.url, true).query;
        var email = queryObject.email;
        console.log(email);
        connection = await conexion.getConnection();
        const result = await connection.execute("SELECT ID, NOMBRE, PASSWORD FROM usuario WHERE email = ?",[
            email, 
        ]);
        console.log(result);
        res.json(result);
    }finally {
        if (connection) {
          connection.release();
        }
    }
}