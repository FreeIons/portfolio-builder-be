"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const custom_errors_1 = require("../errors/custom.errors");
exports.CurrentUser = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const jwtService = new jwt_1.JwtService();
    const auth_token = request.headers['Authorization'] ||
        request.headers['authorization'] ||
        request.headers['x-api-key'] ||
        request.headers['x-access-token'];
    if (!auth_token) {
        throw (0, custom_errors_1.HttpError)(common_1.HttpStatus.UNAUTHORIZED, 'Unauthorized user!');
    }
    const token = auth_token.split(' ')[1];
    const user = jwtService.decode(token, { json: true });
    return user;
});
//# sourceMappingURL=current-user.decorator.js.map