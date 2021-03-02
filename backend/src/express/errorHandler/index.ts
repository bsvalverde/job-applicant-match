import { NextFunction, Request, Response } from 'express';
import { CodedError } from '../../types/errors';

const errorHandler = () => (
  err: CodedError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(err.status).json(err.message);
};

export default errorHandler;
