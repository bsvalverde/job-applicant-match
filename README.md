# Jobs and candidates matcher

This is a project that finds the candidates that are the best match for a job giving their city, experience and known technologies.

The project is composed of three layers:
* A Mongo database;
* A back-end REST API written with NodeJs; and
* A front-end single-page application written with ReactJs.

## Running the application

This is a dockerized app, and thus requires docker to be [locally installed](https://docs.docker.com/engine/install/) in order to be executed.

After you have docker, in the main folder, execute:

### `docker-compose up`

This will build all the images and start all the containers that are running the app. If the browser is not automatically started, the application can be found on [http://localhost:3000](http://localhost:3000).

## Testing the application

Both the back-end and the front-end have tests that can be run by executing `npm test` or `yarn test` inside their respective folders.
