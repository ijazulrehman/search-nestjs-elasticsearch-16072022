# Local Infrastructure

Use **docker-compose** to run infrastructure locally.

Launch the containers in detached mode.

```shell
docker-compose -p="search-nestjs-elasticsearch-16072022" up -d
```

Stop the running containers.

```shell
docker-compose -p search-nestjs-elasticsearch-16072022 down
```

# Containers

- Rabbitmq
  - Management UI available on http://localhost:15672
  - Log in with `admin / admin`
  - Server available on `localhost:5672`
- Elasticsearch 
  - Host available on `localhost:9200`
- Kibana
  - Kibana is available on http://localhost:5601
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Documentation

[Swagger](http://localhost:4009/docs)


