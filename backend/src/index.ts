<<<<<<< HEAD
<<<<<<< HEAD
import app from './app';
import { AppDataSource } from './data-source';
=======
import app from "./app";
import { AppDataSource } from "./data-source";
>>>>>>> separated app and index, fixed test, added test util
=======
import app from './app';
import { AppDataSource } from './data-source';
>>>>>>> c7dc21a4fa3677d7bbcdca2c1e6c975350e8ae14

// Initalizes data source
AppDataSource.initialize();

// Express app listens to port 3001
app.listen(3001);
