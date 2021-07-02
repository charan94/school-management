# School Management

## Tech Stack
- NodeJS
- React
- MySQL

## Running the Application
### Starting React, MySQL and NodeJS server
```sh
docker-compose up -d
```
### Run Migrations
```sh
ts-node ./node_modules/typeorm/cli.js migration:run
```

### PROD or UAT Configurations
Populate scripts in build/run-prod.sh by populating appropriate secrets

## License
MIT

