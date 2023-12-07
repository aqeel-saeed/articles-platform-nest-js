import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let message = exception.message.replace(/\n/g, '');
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    switch (exception.code) {
      case 'P2000': {
        // Prisma Client initialization failed
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Prisma Client initialization failed.';
        break;
      }
      case 'P2001': {
        // Prisma Client is not connected to the database
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Prisma Client is not connected to the database.';
        break;
      }
      case 'P2002': {
        // Prisma Client failed to authenticate against the database
        statusCode = HttpStatus.CONFLICT;
        message = 'Prisma Client failed to authenticate against the database.';
        break;
      }
      case 'P2003': {
        // Prisma Client failed to connect to the database
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Prisma Client failed to connect to the database.';
        break;
      }
      case 'P2004': {
        // Prisma Client query execution failed
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Prisma Client query execution failed.';
        break;
      }
      case 'P2005': {
        // Prisma Client transaction query execution failed
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Prisma Client transaction query execution failed.';
        break;
      }
      case 'P2006': {
        statusCode = HttpStatus.NOT_FOUND;
        message = 'Prisma Client record not found.';
        break;
      }
      case 'P2007': {
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Prisma Client invalid input value.';
        break;
      }
      case 'P2008': {
        statusCode = HttpStatus.FORBIDDEN;
        message = 'Prisma Client permission denied.';
        break;
      }
      case 'P2009': {
        statusCode = HttpStatus.UNAUTHORIZED;
        message = 'Prisma Client authentication required.';
        break;
      }
      case 'P2010': {
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Prisma Client foreign key constraint violation.';
        break;
      }
      case 'P2011': {
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Prisma Client unique constraint violation.';
        break;
      }
      case 'P2012': {
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Prisma Client data validation error.';
        break;
      }
      case 'P2013': {
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Prisma Client input value too long.';
        break;
      }
      case 'P2014': {
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Prisma Client input value too short.';
        break;
      }
      case 'P2015': {
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Prisma Client required field missing.';
        break;
      }
      case 'P2016': {
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Prisma Client invalid cursor value.';
        break;
      }
      case 'P2017': {
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Prisma Client invalid date or time value.';
        break;
      }
      case 'P2018': {
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Prisma Client invalid enum value.';
        break;
      }
      case 'P2019': {
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Prisma Client invalid numeric value.';
        break;
      }
      case 'P2020': {
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Prisma Client invalid relation value.';
        break;
      }
      case 'P2021': {
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Prisma Client invalid select or include value.';
        break;
      }
      case 'P2022': {
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Prisma Client invalid orderBy value.';
        break;
      }
      case 'P2023': {
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Prisma Client invalid where value.';
        break;
      }
      case 'P2024': {
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Prisma Client invalid cursor value.';
        break;
      }
      case 'P2025': {
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Prisma Client invalid batch payload.';
        break;
      }
      case 'P2026': {
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Prisma Client invalid orderBy value.';
        break;
      }
      case 'P2027': {
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Prisma Client invalid include value.';
        break;
      }
      case 'P2028': {
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Prisma Client invalid select value.';
        break;
      }
      case 'P2029': {
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Prisma Client invalid where value.';
        break;
      }
      case 'P2030': {
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Prisma Client invalid distinct value.';
        break;
      }
      case 'P2031': {
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Prisma Client invalid groupBy value.';
        break;
      }
      case 'P2032': {
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Prisma Client invalid having value.';
        break;
      }
      case 'P2033': {
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Prisma Client invalid limit value.';
        break;
      }
      case 'P2034': {
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Prisma Client invalid skip value.';
        break;
      }
      default: {
        // Handle other Prisma error codes here if needed
        break;
      }
    }
    response.status(statusCode).json({
      statusCode,
      message,
    });
  }
}
