import app from "./app";
import { AppDataSource } from "./data-source";

// Initalizes data source
AppDataSource.initialize();

// Express app listens to port 3001
app.listen(3001);