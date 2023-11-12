import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan'

const APP_PORT = process.env.APP_PORT || 4000;
const ALLOWED_ORIGIN = process.env.ALLOW_APP_ORIGIN  // Default to localhost:3000 if env variable is not set

// Initialize Express server
const app = express();

// CORS options
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (origin === ALLOWED_ORIGIN || !origin) {  // Allow requests with no origin, like mobile apps or curl requests
//       callback(null, true);
//     } else {
//       callback(new internal_server_error('Not allowed by CORS'));
//     }
//   }
// };

app.use(morgan('combined'))

// Disable http caching
app.disable('etag');

// Parse body JSON data with payload size limit to mitigate variable size DOS
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: false, limit: "5mb" }));

// Enable CORS with the above options
// app.use(cors(corsOptions));

// Apply security headers
app.use(helmet());

// Routing
// app.use('/', routes);

// Not found handler


// Start server on port defined in .env or default to 4000
app.listen(APP_PORT, () => {
  console.log(`Started on port ${APP_PORT}`);
});
