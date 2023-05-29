import { CreatedUserResponse, CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdatePlatformUserPasswordDto } from './dto/update-platform-user-password';
export declare class AuthController {
    private readonly AuthService;
    private readonly logger;
    constructor(AuthService: AuthService);
    createUser(request: CreateUserDto): Promise<CreatedUserResponse>;
    updateUserPassword(request: UpdateUserPasswordDto): Promise<CreatedUserResponse>;
    updatePlatformUserPassword(request: UpdatePlatformUserPasswordDto): Promise<string>;
    loginUser(request: LoginUserDto): Promise<any>;
    getUser(platform_user: any): Promise<any>;
    deleteUser(param: {
        id: string;
    }): Promise<any>;
}
