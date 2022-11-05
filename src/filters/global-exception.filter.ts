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
      message = 'Opps! Page not found.';
    } else if (exception instanceof QueryFailedError) {
      statusCode = 400;
      const code = exception.driverError.code;
      if (code === PostgresErrorCode.InvalidInput) {
        message = 'Invalid input syntax.';
      }
      if (code === PostgresErrorCode.UniqueViolation) {
        message = 'That name already exists.';
      }
    } else if (exception instanceof BadRequestException) {
      const errorResponse = exception.getResponse();
      type ErrorResponse = { statusCode: number; message: string | string[] };
      const errorMessages = (errorResponse as ErrorResponse).message;
      if (Array.isArray(errorMessages)) {
        message = errorMessages[0];
      } else {
        message = errorMessages;
      }
      statusCode = (errorResponse as ErrorResponse).statusCode;
    } else if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      message = exception.message;
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Something went wrong, try again later.';
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
