"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalExceptionFilter = exports.getErrorMessage = exports.getStatusCode = exports.HttpError = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const HttpError = (statusCode, message) => {
    return new common_1.HttpException({
        status: statusCode,
        error: message,
    }, statusCode);
};
exports.HttpError = HttpError;
const getStatusCode = (exception) => {
    return exception instanceof common_1.HttpException
        ? exception.getStatus()
        : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
};
exports.getStatusCode = getStatusCode;
const getErrorMessage = (exception) => {
    return exception instanceof common_1.HttpException
        ? exception.getResponse()
        : {
            status: common_1.HttpStatus.PROCESSING,
            message: 'something went wrong while converting error message.',
        };
};
exports.getErrorMessage = getErrorMessage;
let GlobalExceptionFilter = class GlobalExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const code = (0, exports.getStatusCode)(exception);
        const errorResponse = (0, exports.getErrorMessage)(exception);
        if (!errorResponse['error']) {
            errorResponse['error'] = 'Internal server error';
        }
        response.status(code).json({
            error: true,
            code: code,
            message: errorResponse['error'],
            data: null,
        });
    }
};
GlobalExceptionFilter = __decorate([
    (0, common_2.Catch)()
], GlobalExceptionFilter);
exports.GlobalExceptionFilter = GlobalExceptionFilter;
//# sourceMappingURL=custom.errors.js.map