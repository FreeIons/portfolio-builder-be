"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RolesGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesGuard = exports.Role = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const role_decorators_1 = require("./role-decorators");
const config_1 = require("../config/config");
const custom_errors_1 = require("../errors/custom.errors");
const jwt_1 = require("@nestjs/jwt");
var Role;
(function (Role) {
    Role["PLATFORM_USER"] = "platform_user";
    Role["CREDENTIALS_USER"] = "credentials_user";
    Role["PUBLIC"] = "public";
    Role["ADMIN"] = "admin";
})(Role = exports.Role || (exports.Role = {}));
let RolesGuard = RolesGuard_1 = class RolesGuard {
    constructor(reflector, jwtService) {
        this.reflector = reflector;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(RolesGuard_1.name);
        this.checkRoleBasedAuthorization = async (roles, request) => {
            const auth_token = request.headers['Authorization'] ||
                request.headers['authorization'] ||
                request.headers['x-api-key'] ||
                request.headers['x-access-token'];
            const userRole = roles[0];
            let token;
            switch (userRole) {
                case Role.PUBLIC:
                    return true;
                case Role.PLATFORM_USER:
                    this.logger.debug(`Validating role if platform user.`);
                    if (!auth_token) {
                        throw (0, custom_errors_1.HttpError)(common_1.HttpStatus.UNAUTHORIZED, 'Unauthorized user!');
                    }
                    token = auth_token.split(' ')[1];
                    try {
                        await this.jwtService.verify(token, {
                            secret: (0, config_1.Configs)().jwt.secret,
                        });
                        return true;
                    }
                    catch (e) {
                        this.logger.error(`${e}`);
                        throw (0, custom_errors_1.HttpError)(common_1.HttpStatus.UNAUTHORIZED, 'Unauthorized User!!');
                    }
                case Role.CREDENTIALS_USER:
                    this.logger.debug(`Validating role if credentials user.`);
                    if (!auth_token) {
                        throw (0, custom_errors_1.HttpError)(common_1.HttpStatus.UNAUTHORIZED, 'Unauthorized user!');
                    }
                    token = auth_token.replace("Bearer ", "");
                    return true;
                case Role.ADMIN:
                    if (!auth_token) {
                        throw (0, custom_errors_1.HttpError)(common_1.HttpStatus.UNAUTHORIZED, 'Unauthorized user!');
                    }
                    token = auth_token.replace("Bearer ", "");
                    return true;
                default:
                    return false;
            }
        };
    }
    async canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(role_decorators_1.ROLES_KEY, [context.getHandler(), context.getClass()]);
        if (!requiredRoles) {
            return false;
        }
        const request = context.switchToHttp().getRequest();
        return await this.checkRoleBasedAuthorization(requiredRoles, request);
    }
};
RolesGuard = RolesGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        jwt_1.JwtService])
], RolesGuard);
exports.RolesGuard = RolesGuard;
//# sourceMappingURL=role-guard.js.map