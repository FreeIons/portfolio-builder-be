"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let GlobalResponseInterceptor = class GlobalResponseInterceptor {
    intercept(context, next) {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        let message = '';
        if (response['statusCode'] === 200) {
            message = 'The request has been succeeded.';
        }
        if (response['statusCode'] === 201) {
            message = 'Request succeeded and resource has been created.';
        }
        if (response['statusCode'] > 201 && response['statusCode'] <= 299) {
            message = 'Request succeeded.';
        }
        return next.handle().pipe((0, operators_1.map)((data) => ({
            data: data,
            error: false,
            code: response['statusCode'],
            message: message,
        })));
    }
};
GlobalResponseInterceptor = __decorate([
    (0, common_1.Injectable)()
], GlobalResponseInterceptor);
exports.GlobalResponseInterceptor = GlobalResponseInterceptor;
//# sourceMappingURL=response.interceptor.js.map