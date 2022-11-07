import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { PostgresErrorCode } from 'src/types/database';
import { ErrorMessage } from 'src/utils/messages/errors';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode: number;
    let message: string | string[];

    if (exception instanceof NotFoundException) {
      statusCode = exception.getStatus();
      message = ErrorMessage.NOT_FOUND;
    } else if (exception instanceof QueryFailedError) {
      statusCode = 400;
      const code = exception.driverError.code;
      if (code === PostgresErrorCode.InvalidInput) {
        message = ErrorMessage.INVALID_INPUT;
      }
      if (code === PostgresErrorCode.UniqueViolation) {
        message = ErrorMessage.UNIQUE_INPUT;
      }
    } else if (exception instanceof BadRequestException) {
      const errorResponse = exception.getResponse();
      type ErrorResponse = { statusCode: number; message: string | string[] };
      message = (errorResponse as ErrorResponse).message;
      statusCode = (errorResponse as ErrorResponse).statusCode;
    } else if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      message = exception.message;
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = ErrorMessage.INTERNAL_SERVER_ERROR;
    }

    // if (exception instanceof ValidationError) {
    //
    // }

    console.log({
      statusCode,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
    response.status(statusCode).json({
      statusCode,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
