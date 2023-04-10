import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import './config.js';
import router from './routes/routes.js';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit'


const app = express();

// utilizacion de rateLimit con el objetivo de evitar ataques de fuerza bruta.
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Ha realizo el limite de peticiones en un tiempo de 1 hora.'
})


/* app.set('port', 3200); */
app.use(morgan('dev'));

// con el objetivo de evitar inserciones scripts/HTML en la entrada.
app.use(xss())

// con el objetivo de evitar ataques DoS (denegacion de servicios)
app.use(express.json({ limit: '20kb' }));


const PORT = process.env.PORT || 3200;

app.use(cors());
app.use(router, limiter);
app.listen(PORT, ()=> {
    console.log('Servidor corriendo en puerto 3200 ' + process.env.PORT + ' ' + PORT);
});

//app.use(express.urlencoded({extended:false}));
/* app.use(tasksRoutes);
*/
export default app; 