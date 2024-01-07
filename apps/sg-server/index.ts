import express from 'express';
import helmet from 'helmet';
import compression from 'compression'
import cors from 'cors';
import morgan from 'morgan'
import dotenv from 'dotenv';
import routes from './routes'
import admin from 'firebase-admin'

dotenv.config();
console.log(process.env)
if(process.env.NODE_ENV === 'development') {
  console.log('Running in development mode')

  admin.initializeApp({
    credential: admin.credential.cert('./firebase-admin-config-staging.json'),
    storageBucket: 'shipgrid-staging-7c1ba.appspot.com',
  });

} else {
  admin.initializeApp({
    credential: admin.credential.cert('./firebase-admin-config.json'),
    storageBucket: 'shipgrid-6574f.appspot.com',
  });
}

const APP_PORT = process.env.APP_PORT || 4000;

// Initialize Express server
const app = express();

app.use(compression())
app.use(morgan('combined'))

// Disable http caching
app.set('etag', false); // turn off

// Parse body JSON data with payload size limit to mitigate variable size DOS
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: false, limit: "5mb" }));

const whitelist = ['https://shipgrid.io', 'http://localhost:5173']

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
// Enable CORS with the above options
app.use(cors(corsOptions));

// Apply security headers
app.use(helmet());

// Routing
app.use('/', routes);

// Not found handler
// If no routes triggered, send 404
app.use((req, res) => {
  res.status(404).send()
})

// Start server on port defined in .env or default to 4000
app.listen(APP_PORT, () => {
  console.log(`Started on port ${APP_PORT}`);
});
