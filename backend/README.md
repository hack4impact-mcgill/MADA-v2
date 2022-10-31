## How to run database
Make sure you have [Docker Desktop](https://www.docker.com/get-started/) on your machine.
To spin-up the database:
``` 
docker-compose up -d 
```

To view all containers:
``` 
docker ps -a 
```

To stop containers without removing them:
``` 
docker-compose stop 
```

To stop containers and remove them (along with their volumes—this will drop all tables from the database!):
``` 
docker-compose down -v 
```

The URL for the (development) database in container is "postgresql://mucrm:mucrm@localhost:5432/postgres"



## How to run tests
TODO for later

## How to run APIs
