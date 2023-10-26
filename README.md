# pulse-energy-assignment

[https://docs.google.com/document/d/1GNjOGeEBs3VTbZd5E8dM_j0ILkZNq7RDkDZFw38qgck/edit](https://docs.google.com/document/d/1GNjOGeEBs3VTbZd5E8dM_j0ILkZNq7RDkDZFw38qgck/edit)

## API
### curl for records-by-client-ids

 ```
 curl --location 'http://localhost:3500/api/v1/meter-value/records-by-client-ids' \
--header 'Content-Type: application/json' \
--data '{
    "charge_point_id" : ["3DgBCXm0cRF6t1nb54b", "tVhxJtv6vlipC3eCCr0c"],
    "offset": 0,
    "limit": 100
}' 
```
### curl for all-records

```
curl --location 'http://localhost:3500/api/v1/meter-value/all-records?offset=0&limit=200' \
--data ''
```

## Migration Commands
```
npx sequelize-cli model:generate --name MeterValueRecords --attributes uuid:string,charge_point_id:string,payload:string

npx sequelize-cli db:migrate
```

## Start
```
npm start
node callerScript.js // Script for simultaneously publishing all the unique client IDs
node Pub.js arg1 // For publishing payload by client ids, arg1 with be client id
node Sub.js // For subscribing and storing payload and client ids into database
```

## No need to run it now, just for reference 
```
node GetClientIds.js // For storing all the unique client id into JSON

```