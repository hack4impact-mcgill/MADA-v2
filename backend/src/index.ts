// Import modules from node_modules
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

// Import from other .ts files
import { AppDataSource } from './data-source';
import { resolve } from 'path';
import { api } from './routes/index';

// Create express app
const app = express();

AppDataSource.initialize().then(async () => {
  // Using third party middleware
  app.use(bodyParser.json()); // body-parser is which allows express to read the body and then parse that into a Json object that we can understand.
  app.use(cors()); //

  // Routes go here
  // Creating route : https://expressjs.com/en/guide/routing.html
  app.use('/api', api);

  // Starts server and listens on port 3001 for connections
  app.listen(3001);
});

export default app;
