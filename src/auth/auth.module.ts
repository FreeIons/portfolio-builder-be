import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UsersSchema } from './entity/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtFactory } from '../jwt/auth.jwt';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UsersSchema }]),
    JwtModule.registerAsync(jwtFactory),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
  exports: [AuthModule, AuthService, AuthRepository],
})
export class AuthModule {}

