import app from './app';
import { AppDataSource } from './data-source';
import * as TypeormAdapter from '@adminjs/typeorm'
import { adminConfig } from './admin-config';
const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')

AdminJS.registerAdapter(TypeormAdapter);

// Admin auth
// Hardcoded basic auth: https://medium.com/adminjs/overriding-the-login-view-in-adminjs-has-been-simplified-bfd02eaac062
// TODO - auth from db similar to this: https://docs.adminjs.co/installation/plugins/express#authenticated
const cookiePassword = 'very_secret_secret'

const DEFAULT_ADMIN = {
    email: 'admin@example.com',
    password: 'password',
}

const authenticate = async () => {
    return { email: DEFAULT_ADMIN.email }
}

const run = async () => {
    // Initalizes data source
    await AppDataSource.initialize();

    // Setup admin panel
    const admin = new AdminJS(adminConfig)
    const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin,
        {
            authenticate,
            cookiePassword: 'very_secret_secret',
        },
        null,
        {
            resave: true,
            saveUninitialized: true,
            cookiePassword,
        },
    )

    // Start admin panel
    app.use(admin.options.rootPath, adminRouter)

    // Express app listens to port 3001
    app.listen(3001);
}

run()
