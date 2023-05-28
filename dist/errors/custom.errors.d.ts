import { HttpException } from '@nestjs/common';
import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
export declare const HttpError: (statusCode: number, message: string) => HttpException;
export declare const getStatusCode: (exception: unknown) => number;
export declare const getErrorMessage: (exception: unknown) => string | object;
export declare class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void;
}
