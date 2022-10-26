import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import './config.js';
import router from './routes/routes.js';


const app = express();


/* app.set('port', 3200); */
app.use(morgan('dev'));

app.use(express.json());

/* // Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
 */

const PORT = process.env.PORT || 3200;

app.use(cors());
app.use(router);
app.listen(PORT, ()=> {
    console.log('Servidor corriendo en puerto 3200 ' + process.env.PORT + ' ' + PORT);
});

//app.use(express.urlencoded({extended:false}));
/* app.use(tasksRoutes);
*/
export default app; 