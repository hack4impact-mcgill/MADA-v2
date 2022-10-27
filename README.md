# MADA-v2

## Database
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


## Useful links
1. Database diagrams: https://drive.google.com/file/d/13aiD-ivql-npTbgwyLVry0ToKAMEZFpc/view
2. API: https://docs.google.com/document/d/1IMIw5tTVAvfnxY7_No3z4CgpIFXdjOJUdFV8HtjSVxw/edit?usp=sharing
3. Project board: https://github.com/orgs/hack4impact-mcgill/projects/1
4. Design files: https://www.figma.com/file/wkaZhz34mkZOYyhIKs7BEj/ui-mockups?node-id=358%3A203

## Developer Team
**Devs**: Jessica Li 

**Project Managers**: Camilla Djamalov, Kathleen Younge

**Tech Lead**: Maite Kramarz

Hello!
