# NestJs Elasticsearch Mongo Repository Pattern

This repository serves as a boilerplate for developing NestJS applications with Elasticsearch, Docker, and MongoDB integration. It demonstrates the implementation of the observer-subscriber pattern for synchronizing data between MongoDB and Elasticsearch within a NestJS architecture.

## Features

- **Observer-Subscriber Pattern**: The repository demonstrates how to synchronize data between MongoDB and Elasticsearch using the observer-subscriber pattern. MongoDB acts as the primary database, while Elasticsearch handles efficient search functionality.
- **API Endpoints:** The repository showcases three APIs:
  - Add New Books: Allows users to add new book entries to the system.
  - Update Existing Books: Enables users to update information for existing books.
  - Search Books: Provides a search functionality to find books based on specific criteria.
- **Data Synchronization:** When a new book is added, the data is saved in MongoDB, and Elasticsearch subscribes to the "after save" event. This ensures that the newly added book is immediately indexed in Elasticsearch, making it available for search.

- **Repository Pattern:** The implementation includes the repository pattern in NestJS, showcasing best practices for organizing and managing data access.

- **Automated Testing:** The repository includes comprehensive tests specifically designed to verify the behavior and response of the API endpoints. These tests ensure the reliability and correctness of the implemented functionality.

## Architecture Components

<p align="center">
  <img src="./architecture.png" label="Abstract architecture overview diagram">
  <h4 align="center">Abstract architecture overview diagram<h4>
</p>

## Dataflow Diagram

<p align="center">
  <img src="./dfd.png" label="data flow diagram">
  <h4 align="center">Data flow diagram<h4>
</p>

## Getting Started

To run this project locally and explore its features, follow these steps:

- Clone the repository
- Use **docker-compose** to run infrastructure locally.
  - Launch the containers in detached mode.

    ```shell
    docker-compose -p="search-nestjs-elasticsearch" up -d
    ```

  - Stop the running containers.

    ```shell
    docker-compose -p search-nestjs-elasticsearch down
    ```
- Install the required dependencies: yarn install
  ```bash
  $ yarn
  ```
- Configure the database and Elasticsearch connection settings in the configuration file.
  - Add env file
    ```bash
    $ cp .env.example .env
    ```
- Run the application
  ```bash
  # development mode
  $ yarn start

  # watch mode
  $ yarn start:dev

  # production mode
  $ yarn run start:prod
  ```
- Open your preferred API testing tool or browser and access the provided endpoints.

The infrastructure includes the following containers:

- **MongoDB:** Server available on localhost:27017
- **Mongo Express:** Accessible at http://localhost:8081 for MongoDB administration
- **Elasticsearch:** Host available on localhost:9200
- **Kibana:** Accessible at http://localhost:5601 for Kibana dashboard

## Running Tests

To run the tests for this project, use the following commands:

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

These commands will execute the respective tests and provide feedback on the test results and code coverage.

## Contributions

Contributions to this repository are welcome! If you find any issues, have suggestions, or want to add new features, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. Feel free to use, modify, and distribute this code as per the terms of the license.

## Documentation

For detailed API documentation, please refer to the Swagger documentation available at
[Swagger URL](http://localhost:4009/docs)

## About

This boilerplate aims to provide developers with a solid starting point for building NestJS applications with Elasticsearch, Docker, and MongoDB integration. It demonstrates the implementation of the observer-subscriber pattern, enabling efficient data synchronization between MongoDB and Elasticsearch within a NestJS architecture. The repository includes example APIs, automated testing, and a structured repository pattern, empowering developers to focus on building their application logic effectively.
