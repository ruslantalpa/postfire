
This is an experiment to see if it's possible (it is) to emulate the grpc based firebase api (specificllly firestore) so that unmodified firebase SDK can connect and run on top of PostgreSQL.

To see it in action run the following in your terminal

Note: these commands do not work on arm architecture (apple M1)

### start the rest/grpc server (terminal 1)
```
docker-compose up -d
```

### start the node firebase client (terminal 1)
```
yarn install --cwd grpc
```
```
node grpc/src/example_client.mjs
```

### add a row directly to the database (terminal 2)
```
. .env
```
```
psql postgres://$SUPER_USER:$SUPER_USER_PASSWORD@localhost:$DB_PORT/$DB_NAME \
-c "INSERT INTO data.todo (todo) VALUES ('new todo')"
```
