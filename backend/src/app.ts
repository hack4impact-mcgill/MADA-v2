// Import modules from node_modules
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { auth } from './middleware/auth';

// Import from other .ts files
import { api } from './routes/index';

// Create express app
const app = express();

// Using third party middleware
app.use(bodyParser.json()); // body-parser is which allows express to read the body and then parse that into a Json object that we can understand.
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
);

// Routes go here
// Creating route : https://expressjs.com/en/guide/routing.html
app.use('/api', api);

// free endpoint
app.get('/free-endpoint', (request, response) => {
  response.json({ message: 'You are free to access me anytime' });
});

// authentication endpoint
app.get('/auth-endpoint', auth, (request, response) => {
  response.send({ message: 'You are authorized to access me' });
});

export default app;
