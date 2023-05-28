import { AuthRepository } from './auth.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/users.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto, LoginUserResponse } from './dto/login-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdatePlatformUserPasswordDto } from './dto/update-platform-user-password';
export declare class AuthService {
    private readonly authRepository;
    private readonly jwtService;
    private readonly logger;
    constructor(authRepository: AuthRepository, jwtService: JwtService);
    createUser(request: CreateUserDto): Promise<any>;
    updateUserPassword(request: UpdateUserPasswordDto): Promise<User>;
    updatePlatformUserPassword(request: UpdatePlatformUserPasswordDto): Promise<string>;
    loginUser(request: LoginUserDto): Promise<{
        access_token: string;
        user_details: {
            id: string;
            email: string;
            username: string;
            phone: string;
        };
    }>;
    private validateCreateUserRequest;
    private validateLoginUserRequest;
    getUserByClientId(client_id: string): Promise<LoginUserResponse>;
    deleteUser(id: string): Promise<any>;
    getUser(platform_user: any): Promise<{
        id: string;
        email: string;
        username: string;
        phone: string;
    }>;
    private generatePassword;
}
