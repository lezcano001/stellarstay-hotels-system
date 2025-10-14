import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import { BaseError } from '../errors/BaseError'
import { ILogger } from '../modules/common/logger.port'

// Factory that returns a valid Express error handler
export function createErrorMiddleware(logger: ILogger): ErrorRequestHandler {
  return function (
    err: any,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) {
    if (err instanceof BaseError) {
      return res.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      })
    }

    logger.error('Unexpected error', err)

    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    })
  }
}