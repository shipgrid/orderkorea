import express from 'express';
import helmet from 'helmet';
import compression from 'compression'
import cors from 'cors';
import morgan from 'morgan'
import dotenv from 'dotenv';
import routes from './routes'

dotenv.config();

const APP_PORT = process.env.APP_PORT || 4000;
// const ALLOWED_ORIGIN = process.env.ALLOW_APP_ORIGIN  // Default to localhost:3000 if env variable is not set

// Initialize Express server
const app = express();

app.use(compression())
app.use(morgan('combined'))

// Disable http caching
app.set('etag', false); // turn off

// Parse body JSON data with payload size limit to mitigate variable size DOS
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: false, limit: "5mb" }));

// Enable CORS with the above options
app.use(cors());

// Apply security headers
app.use(helmet());

// Routing
app.use('/', routes);

// Not found handler
// If no routes triggered, send 404
app.use((req, res) => {
  console.log('no route found')
  res.status(404).send()
})

// Start server on port defined in .env or default to 4000
app.listen(APP_PORT, () => {
  console.log(`Started on port ${APP_PORT}`);
});
