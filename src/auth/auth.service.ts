import { Injectable, HttpStatus, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/users.entity';
import { HttpError } from '../errors/custom.errors';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto, LoginUserResponse } from './dto/login-user.dto';
import { Configs } from '../config/config';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdatePlatformUserPasswordDto } from './dto/update-platform-user-password';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly jwtService: JwtService,
    ) { }

    async createUser(request: CreateUserDto) {
        await this.validateCreateUserRequest(request);
        let user;
        try {
            user = await this.authRepository.userModel.create({
                ...request,
                password: await bcrypt.hash(request.password, 10),
            });
            console.log('user:', user);
        } catch (e) {
            console.log(e);
        }

        return user;
    }

    async updateUserPassword(request: UpdateUserPasswordDto) {
        let updatedUser: User;
        try {
            updatedUser = await this.authRepository.userModel.findOneAndUpdate({
                email: request.email,
            }, { password: await bcrypt.hash(request.password, 10) }, { new: true }
            );
        } catch (err) {
            this.logger.error(
                `Error occurred while validating create user ${this.updateUserPassword.name}:${err.message}`,
            );
            throw HttpError(HttpStatus.INTERNAL_SERVER_ERROR, 'something went wrong');
        }

        if (!updatedUser) {
            throw HttpError(
                HttpStatus.NOT_FOUND,
                `User doesn't exists with email.`,
            );
        }

        return updatedUser;
    }

    async updatePlatformUserPassword(request: UpdatePlatformUserPasswordDto) {
        await this.validateLoginUserRequest({ email: request.email, password: request.old_password });
        let updatedUser: User;
        try {
            updatedUser = await this.authRepository.userModel.findOneAndUpdate({
                email: request.email,
            }, { password: await bcrypt.hash(request.new_password, 10) }, { new: true }
            );
        } catch (err) {
            this.logger.error(
                `Error occurred while validating create user ${this.updateUserPassword.name}:${err.message}`,
            );
            throw HttpError(HttpStatus.INTERNAL_SERVER_ERROR, 'something went wrong');
        }

        return "Password Updated Sucessfully";
    }

    async loginUser(request: LoginUserDto) {
        const user = await this.validateLoginUserRequest(request);
        const payload = {
            user_id: user._id,
            username: user.username,
            email: user.email,
            phone_number: user.phone_number,
        };
        let access_token: string;
        try {
            access_token = this.jwtService.sign(payload, {
                secret: Configs().jwt.secret,
            });
        } catch (e) {
            console.log(e);
            this.logger.error(
                `Error occurred while login ${this.loginUser.name}:${e.message}`,
            );
            throw HttpError(HttpStatus.INTERNAL_SERVER_ERROR, 'something went wrong');
        }
        let user_details = await this.getUser(payload)
        return { access_token, user_details };
    }

    private async validateCreateUserRequest(request: CreateUserDto) {

        let user: User;
        try {
            user = await this.authRepository.userModel.findOne({
                email: request.email,
            });
        } catch (err) {
            this.logger.error(
                `Error occurred while validating create user ${this.validateCreateUserRequest.name}:${err.message}`,
            );
            throw HttpError(HttpStatus.INTERNAL_SERVER_ERROR, 'something went wrong');
        }

        if (user) {
            throw HttpError(
                HttpStatus.UNPROCESSABLE_ENTITY,
                'User already exists with email.',
            );
        }
    }

    private async validateLoginUserRequest(
        request: LoginUserDto,
    ): Promise<LoginUserResponse> {
        let user: User;
        try {
            user = await this.authRepository.userModel.findOne({
                email: request.email,
            });
        } catch (error) {
            this.logger.error(
                `Error occurred while validate login request ${this.validateLoginUserRequest.name}:${error.message}`,
            );
            throw HttpError(HttpStatus.INTERNAL_SERVER_ERROR, 'something went wrong');
        }
        if (!user) {
            throw HttpError(HttpStatus.NOT_FOUND, 'Credentials are not valid.');
        }
        const passwordIsValid = await bcrypt.compare(
            request.password,
            user.password,
        );
        if (!passwordIsValid) {
            throw HttpError(
                HttpStatus.NON_AUTHORITATIVE_INFORMATION,
                'Credentials are not valid.',
            );
        }
        return user;
    }

    async getUserByClientId(client_id: string): Promise<LoginUserResponse> {
        let user;
        try {
            user = await this.authRepository.userModel
                .findOne({
                    client_id,
                    is_active: true
                }).
                populate('client_id').exec();
        } catch (error) {
            this.logger.error(
                `Error occurred while getting Client by Id ${this.getUserByClientId.name}:${error.message}`,
            );
            throw HttpError(HttpStatus.INTERNAL_SERVER_ERROR, 'something went wrong');
        }

        if (!user) {
            throw HttpError(HttpStatus.NOT_FOUND, 'Credentials are not valid.');
        }
        return user;
    }

    async deleteUser(id: string) {
        let user;
        try {
            user = await this.authRepository.userModel.findByIdAndUpdate(
                id,
                { is_active: false },
                {
                    new: true,
                },
            );
        } catch (err) {
            this.logger.error(
                `Error occurred while delete User ${this.deleteUser.name}:${err.message}`,
            );
            throw HttpError(HttpStatus.INTERNAL_SERVER_ERROR, 'something went wrong');
        }
        if (!user) {
            throw HttpError(
                HttpStatus.NOT_FOUND,
                `User doesen't exists with userId: ${id} `,
            );
        }
        return user;
    }

    async getUser(platform_user) {
        let user: User;
        try {
            user = await this.authRepository.userModel.findOne({ _id: platform_user.user_id });
        } catch (error) {
            this.logger.error(`Error occurred while getting user details ${this.getUser.name}:${error.message}`)
            throw HttpError(HttpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong!');
        }
        let response = {
            id: user._id,
            email: user.email,
            username: user.username,
            phone: user.phone_number,
        }
        return response;

    }

    private async generatePassword(password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("hashedPassword: ", hashedPassword);
    }
}
