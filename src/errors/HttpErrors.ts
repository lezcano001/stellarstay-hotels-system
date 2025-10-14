import { BaseError } from './BaseError';

export class BadRequestError extends BaseError {
  constructor(message: string = 'Bad Request') {
    super(message, 400);
  }
}

export class InternalServerError extends BaseError {
  constructor(message: string = 'Internal Server Error') {
    super(message, 500)
  }
}

export class HttpErrors {
  constructor() {}

  badRequest(message?: string) {
    return new BadRequestError(message);
  }

  internalServerError(message?: string) {
    return new InternalServerError(message);
  }
}