import app from './app';
import { AppDataSource } from './data-source';

(async () => {
    // Initalizes data source
    await AppDataSource.initialize();

    // seed();
})(); 

// Express app listens to port 3001
app.listen(3001);
