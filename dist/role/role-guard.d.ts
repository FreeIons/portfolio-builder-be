import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
export declare enum Role {
    PLATFORM_USER = "platform_user",
    CREDENTIALS_USER = "credentials_user",
    PUBLIC = "public",
    ADMIN = "admin"
}
export declare class RolesGuard implements CanActivate {
    private reflector;
    private readonly jwtService;
    constructor(reflector: Reflector, jwtService: JwtService);
    private readonly logger;
    canActivate(context: ExecutionContext): Promise<boolean>;
    checkRoleBasedAuthorization: (roles: Role[], request: any) => Promise<boolean>;
}
