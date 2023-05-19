import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import './config.js';
import router from './routes/routes.js';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit'
import helmet from 'helmet';

import * as Sentry from "@sentry/node";






const app = express();
Sentry.init({
  dsn: "https://ce9a9e5f107e47cdb2494e358172e645@o4505194838294528.ingest.sentry.io/4505194968383488",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const transaction = Sentry.startTransaction({
  op: "test",
  name: "My First Test Transaction",
});

setTimeout(() => {
  try {
    foo();
  } catch (e) {
    Sentry.captureException(e);
  } finally {
    transaction.finish();
  }
}, 99);


// El manejador de errores debe ser definido después de todas las rutas
app.use((err, req, res, next) => {
  // Capturar y enviar el error a Sentry
  Sentry.captureException(err);
  
  // También puedes registrar información adicional sobre el error
  Sentry.setExtra("requestBody", req.body);
  Sentry.setExtra("requestHeaders", req.headers);
  
  // Enviar una respuesta de error al cliente
  res.status(500).json({ error: "Internal Server Error" });
});


/* const corsOptions = {
  origin: ['http://localhost:3000', 'http://votaciononline.s3-website-us-east-1.amazonaws.com'],
}; */


// utilizacion de rateLimit con el objetivo de evitar ataques de fuerza bruta.
/* const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Ha realizo el limite de peticiones en un tiempo de 1 hora.'
}) */

/* app.use((req, res, next) => {
	res.setHeader('X-Content-Type-Options', 'nosniff');
	next();
  }); */
  

/* app.disable('x-powered-by');
app.use(helmet.hidePoweredBy()); */

// configuracion La función frameguard de helmet establece la cabecera X-Frame-Options en la respuesta HTTP para prevenir ataques de 'ClickJacking'. La directiva action establece el modo de protección y en este caso se está estableciendo en sameorigin.
// La función contentSecurityPolicy establece la cabecera Content-Security-Policy en la respuesta HTTP para especificar las políticas de seguridad para recursos que se cargan en tu sitio web. La directiva defaultSrc especifica los orígenes permitidos para recursos predeterminados, como scripts, imágenes y estilos. La directiva frameAncestors especifica los orígenes permitidos para cargar el sitio web en un iframe. En este caso, se está configurando para permitir solo el mismo origen.
// ESTE SE ESTA USANDO
/* app.use(helmet.frameguard({ action: 'sameorigin' })); */


/* app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    frameAncestors: ["'self'"]
  }
})); */
/* app.use(
  helmet.contentSecurityPolicy({
      directives: {
          // otras directivas...
          connectSrc: ["'self'", 'https://servidormysqlvotar.herokuapp.com']
      }
  })
); */

/* app.set('port', 3200); */
app.use(morgan('dev'));

app.use(express.json())

// con el objetivo de evitar inserciones scripts/HTML en la entrada.
//app.use(xss())

// con el objetivo de evitar ataques DoS (denegacion de servicios)
//app.use(express.json({ limit: '20kb' }));

//app.disable('x-powered-by');



const PORT = process.env.PORT || 3200;

app.use(cors());
app.use(router);
app.listen(PORT, ()=> {
    console.log('Servidor corriendo en puerto 3200 ' + process.env.PORT + ' ' + PORT);
});


export default app; 