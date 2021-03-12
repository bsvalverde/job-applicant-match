import API from './express';
import mongo from './mongo';

const { MONGO_URL = 'mongodb://host.docker.internal/api' } = process.env;

mongo
  .connect(MONGO_URL)
  .then(() => {
    new API().start();
  })
  .catch((err: Error) => console.error('Unable to connect to mongo: ', err));

process
  .on('SIGINT', () => mongo.disconnect())
  .on('SIGTERM', () => mongo.disconnect());
