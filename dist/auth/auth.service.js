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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const auth_repository_1 = require("./auth.repository");
const custom_errors_1 = require("../errors/custom.errors");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("../config/config");
let AuthService = AuthService_1 = class AuthService {
    constructor(authRepository, jwtService) {
        this.authRepository = authRepository;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async createUser(request) {
        await this.validateCreateUserRequest(request);
        let user;
        try {
            user = await this.authRepository.userModel.create(Object.assign(Object.assign({}, request), { password: await bcrypt.hash(request.password, 10) }));
            console.log('user:', user);
        }
        catch (e) {
            console.log(e);
        }
        return user;
    }
    async updateUserPassword(request) {
        let updatedUser;
        try {
            updatedUser = await this.authRepository.userModel.findOneAndUpdate({
                email: request.email,
            }, { password: await bcrypt.hash(request.password, 10) }, { new: true });
        }
        catch (err) {
            this.logger.error(`Error occurred while validating create user ${this.updateUserPassword.name}:${err.message}`);
            throw (0, custom_errors_1.HttpError)(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'something went wrong');
        }
        if (!updatedUser) {
            throw (0, custom_errors_1.HttpError)(common_1.HttpStatus.NOT_FOUND, `User doesn't exists with email.`);
        }
        return updatedUser;
    }
    async updatePlatformUserPassword(request) {
        await this.validateLoginUserRequest({ email: request.email, password: request.old_password });
        let updatedUser;
        try {
            updatedUser = await this.authRepository.userModel.findOneAndUpdate({
                email: request.email,
            }, { password: await bcrypt.hash(request.new_password, 10) }, { new: true });
        }
        catch (err) {
            this.logger.error(`Error occurred while validating create user ${this.updateUserPassword.name}:${err.message}`);
            throw (0, custom_errors_1.HttpError)(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'something went wrong');
        }
        return "Password Updated Sucessfully";
    }
    async loginUser(request) {
        const user = await this.validateLoginUserRequest(request);
        const payload = {
            user_id: user._id,
            username: user.username,
            email: user.email,
            phone_number: user.phone_number,
        };
        let access_token;
        try {
            access_token = this.jwtService.sign(payload, {
                secret: (0, config_1.Configs)().jwt.secret,
            });
        }
        catch (e) {
            console.log(e);
            this.logger.error(`Error occurred while login ${this.loginUser.name}:${e.message}`);
            throw (0, custom_errors_1.HttpError)(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'something went wrong');
        }
        let user_details = await this.getUser(payload);
        return { access_token, user_details };
    }
    async validateCreateUserRequest(request) {
        let user;
        try {
            user = await this.authRepository.userModel.findOne({
                email: request.email,
            });
        }
        catch (err) {
            this.logger.error(`Error occurred while validating create user ${this.validateCreateUserRequest.name}:${err.message}`);
            throw (0, custom_errors_1.HttpError)(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'something went wrong');
        }
        if (user) {
            throw (0, custom_errors_1.HttpError)(common_1.HttpStatus.UNPROCESSABLE_ENTITY, 'User already exists with email.');
        }
    }
    async validateLoginUserRequest(request) {
        let user;
        try {
            user = await this.authRepository.userModel.findOne({
                email: request.email,
            });
        }
        catch (error) {
            this.logger.error(`Error occurred while validate login request ${this.validateLoginUserRequest.name}:${error.message}`);
            throw (0, custom_errors_1.HttpError)(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'something went wrong');
        }
        if (!user) {
            throw (0, custom_errors_1.HttpError)(common_1.HttpStatus.NOT_FOUND, 'Credentials are not valid.');
        }
        const passwordIsValid = await bcrypt.compare(request.password, user.password);
        if (!passwordIsValid) {
            throw (0, custom_errors_1.HttpError)(common_1.HttpStatus.NON_AUTHORITATIVE_INFORMATION, 'Credentials are not valid.');
        }
        return user;
    }
    async getUserByClientId(client_id) {
        let user;
        try {
            user = await this.authRepository.userModel
                .findOne({
                client_id,
                is_active: true
            }).
                populate('client_id').exec();
        }
        catch (error) {
            this.logger.error(`Error occurred while getting Client by Id ${this.getUserByClientId.name}:${error.message}`);
            throw (0, custom_errors_1.HttpError)(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'something went wrong');
        }
        if (!user) {
            throw (0, custom_errors_1.HttpError)(common_1.HttpStatus.NOT_FOUND, 'Credentials are not valid.');
        }
        return user;
    }
    async deleteUser(id) {
        let user;
        try {
            user = await this.authRepository.userModel.findByIdAndUpdate(id, { is_active: false }, {
                new: true,
            });
        }
        catch (err) {
            this.logger.error(`Error occurred while delete User ${this.deleteUser.name}:${err.message}`);
            throw (0, custom_errors_1.HttpError)(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'something went wrong');
        }
        if (!user) {
            throw (0, custom_errors_1.HttpError)(common_1.HttpStatus.NOT_FOUND, `User doesen't exists with userId: ${id} `);
        }
        return user;
    }
    async getUser(platform_user) {
        let user;
        try {
            user = await this.authRepository.userModel.findOne({ _id: platform_user.user_id });
        }
        catch (error) {
            this.logger.error(`Error occurred while getting user details ${this.getUser.name}:${error.message}`);
            throw (0, custom_errors_1.HttpError)(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong!');
        }
        let response = {
            id: user._id,
            email: user.email,
            username: user.username,
            phone: user.phone_number,
        };
        return response;
    }
    async generatePassword(password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("hashedPassword: ", hashedPassword);
    }
};
AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_repository_1.AuthRepository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map