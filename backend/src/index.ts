import app from './app';
import { AppDataSource } from './data-source';
import * as TypeormAdapter from '@adminjs/typeorm'
import { adminConfig } from './admin-config';
const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')

AdminJS.registerAdapter(TypeormAdapter);

const run = async () => {
    // Initalizes data source
    await AppDataSource.initialize();
    
    // Setup admin panel
    const admin = new AdminJS(adminConfig)
    const adminRouter = AdminJSExpress.buildRouter(admin)
    app.use(admin.options.rootPath, adminRouter)

    // Express app listens to port 3001
    app.listen(3001);
}

run()
