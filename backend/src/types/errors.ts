export class CodedError extends Error {
  status: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.status = statusCode;
  }
}

export class BadRequestError extends CodedError {
  constructor(resource: string) {
    const message = `Provided value for ${resource} is invalid`;
    super(message, 400);
  }
}
