import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import errorHandler from './errorHandler';
import routes from './routes';

const { PORT = 3030 } = process.env;

export default class API {
  private app;

  constructor() {
    this.app = express();
    this.app.use(helmet());
    this.app.use(cors({ credentials: true, origin: true }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

    this.app.use('/api', routes());

    this.app.use(errorHandler());
  }

  start() {
    this.app.listen(PORT, (): void =>
      console.log(`Server Running. See http://localhost:${PORT}`),
    );
  }
}
