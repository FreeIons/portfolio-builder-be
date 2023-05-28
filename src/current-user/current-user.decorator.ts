//user.decorator.ts
import { createParamDecorator, ExecutionContext, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpError } from '../errors/custom.errors';

export const CurrentUser = createParamDecorator(async (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const jwtService = new JwtService();
    const auth_token =
        request.headers['Authorization'] ||
        request.headers['authorization'] ||
        request.headers['x-api-key'] ||
        request.headers['x-access-token'];
    if (!auth_token) {
        throw HttpError(HttpStatus.UNAUTHORIZED, 'Unauthorized user!');
    }
    const token = auth_token.split(' ')[1];
    const user = jwtService.decode(token,
        { json: true },
    )
    return user;
});