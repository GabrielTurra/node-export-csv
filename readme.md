## Using Postgres cursor and node streams to generate big csv files.

### Running:
### 1. Run the following command to setup the docker container:
```
docker compose up -d
```

### 2. Create a .env.local file with your database url connection.
If you don't change the docker compose file, you can just rename the `.env.example` to `.env.local`.

### 3. Seed database
```
node --env-file .env.local src/database/seed.ts
```

You can change the ``database/seed.ts`` file to increment the seed and turn it more fun.

### 4. Run the main code
```
node --env-file .env.local src/export-to-csv.ts
```