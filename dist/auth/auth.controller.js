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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AuthController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dto/create-user.dto");
const auth_service_1 = require("./auth.service");
const role_guard_1 = require("../role/role-guard");
const role_decorators_1 = require("../role/role-decorators");
const swagger_1 = require("@nestjs/swagger");
const custom_errors_1 = require("../errors/custom.errors");
const login_user_dto_1 = require("./dto/login-user.dto");
const current_user_decorator_1 = require("../current-user/current-user.decorator");
const update_user_password_dto_1 = require("./dto/update-user-password.dto");
const user_dto_1 = require("../current-user/dto/user.dto");
const update_platform_user_password_1 = require("./dto/update-platform-user-password");
let AuthController = AuthController_1 = class AuthController {
    constructor(AuthService) {
        this.AuthService = AuthService;
        this.logger = new common_1.Logger(AuthController_1.name);
    }
    async createUser(request) {
        try {
            await create_user_dto_1.CreateUserValidation.validateAsync(request);
        }
        catch (err) {
            this.logger.error(`Inside ${this.createUser.name}:${err.message}`);
            throw (0, custom_errors_1.HttpError)(common_1.HttpStatus.PRECONDITION_FAILED, `Invalid Request object:${err.message}`);
        }
        return this.AuthService.createUser(request);
    }
    async updateUserPassword(request) {
        try {
            await update_user_password_dto_1.UpdateUserPasswordValidation.validateAsync(request);
        }
        catch (err) {
            this.logger.error(`Inside ${this.createUser.name}:${err.message}`);
            throw (0, custom_errors_1.HttpError)(common_1.HttpStatus.PRECONDITION_FAILED, `Invalid Request object:${err.message}`);
        }
        return this.AuthService.updateUserPassword(request);
    }
    async updatePlatformUserPassword(request) {
        try {
            await update_platform_user_password_1.UpdatePlatformUserPasswordValidation.validateAsync(request);
        }
        catch (err) {
            this.logger.error(`Inside ${this.createUser.name}:${err.message}`);
            throw (0, custom_errors_1.HttpError)(common_1.HttpStatus.PRECONDITION_FAILED, `Invalid Request object:${err.message}`);
        }
        return this.AuthService.updatePlatformUserPassword(request);
    }
    async loginUser(request) {
        try {
            await login_user_dto_1.loginUserValidation.validateAsync(request);
        }
        catch (err) {
            this.logger.error(`Inside ${this.createUser.name}:${err.message}`);
            throw (0, custom_errors_1.HttpError)(common_1.HttpStatus.PRECONDITION_FAILED, `Invalid Request object:${err.message}`);
        }
        return this.AuthService.loginUser(request);
    }
    async getUser(platform_user) {
        return this.AuthService.getUser(platform_user);
    }
    async getUserByClientId(user, param) {
        if (user.client_id !== param.clientId) {
            throw (0, custom_errors_1.HttpError)(common_1.HttpStatus.UNAUTHORIZED, `token is not valid for ${param.clientId}`);
        }
        return await this.AuthService.getUserByClientId(user.client_id);
    }
    async deleteUser(param) {
        return await this.AuthService.deleteUser(param.id);
    }
};
__decorate([
    (0, common_1.Post)('/signup'),
    (0, role_decorators_1.Roles)(role_guard_1.Role.PLATFORM_USER),
    (0, swagger_1.ApiOperation)({
        summary: 'Create User',
        description: 'Create User Description',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The User has been successfully created',
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.PRECONDITION_FAILED,
        description: 'Failed Precondition.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 422,
        description: 'The User already exist with this email or phone',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createUser", null);
__decorate([
    (0, common_1.Put)('/admin/update-password'),
    (0, role_decorators_1.Roles)(role_guard_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Update User Password',
        description: 'Update User Password Description',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The User Password has been successfully updated',
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.PRECONDITION_FAILED,
        description: 'Failed Precondition.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: `The User doesn't exist with this email or phone`,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_password_dto_1.UpdateUserPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateUserPassword", null);
__decorate([
    (0, common_1.Put)('/update-password'),
    (0, role_decorators_1.Roles)(role_guard_1.Role.PLATFORM_USER),
    (0, swagger_1.ApiOperation)({
        summary: 'Update User Password',
        description: 'Update User Password Description',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The User Password has been successfully updated',
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.PRECONDITION_FAILED,
        description: 'Failed Precondition.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: `The User doesn't exist with this email or phone`,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_platform_user_password_1.UpdatePlatformUserPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updatePlatformUserPassword", null);
__decorate([
    (0, common_1.Post)('/signin'),
    (0, role_decorators_1.Roles)(role_guard_1.Role.PLATFORM_USER),
    (0, swagger_1.ApiOperation)({
        summary: 'Signin User',
        description: 'Create User Description',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The User has been successfully Signin',
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.PRECONDITION_FAILED,
        description: 'Failed Precondition.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 422,
        description: 'The User already exist with this email or phone',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginUser", null);
__decorate([
    (0, common_1.Get)('/get-user'),
    (0, role_decorators_1.Roles)(role_guard_1.Role.PLATFORM_USER),
    (0, swagger_1.ApiOperation)({
        summary: 'Get User',
        description: 'Get User Description',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The User successfully found',
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.PRECONDITION_FAILED,
        description: 'Failed Precondition.',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)('/client/:clientId'),
    (0, role_decorators_1.Roles)(role_guard_1.Role.PLATFORM_USER),
    (0, swagger_1.ApiOperation)({
        summary: 'Get User',
        description: 'Get User Description',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The User successfully found',
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.PRECONDITION_FAILED,
        description: 'Failed Precondition.',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CurrentUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUserByClientId", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, role_decorators_1.Roles)(role_guard_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete User by Id',
        description: 'Delete User Description',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.ACCEPTED,
        description: 'The User has been successfully Deleted',
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.PRECONDITION_FAILED,
        description: 'Failed Precondition.',
    }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "deleteUser", null);
AuthController = AuthController_1 = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map