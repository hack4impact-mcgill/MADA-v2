## How to run database

TODO

## How to run tests

TODO for later

## Setup
1. `docker compose up` to start the database
2. `npm install` to install dependencies
3. Create a `.env` file in the root directory with the following variables:
```
TOKEN_KEY=hack4impactmcgillmada
ADMIN_USERNAME=admin
ADMIN_PASSWORD=pw
ADMIN_EMAIL=admin@example.com
```

4. `npm run seed` to seed the database
5. `npm run dev` to start API

## Scripts
`npm run dev`: start API
`npm run seed`: seed the database
`npm run drop`: drop the database
