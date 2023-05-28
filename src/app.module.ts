import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Configs } from './config/config';
import { HealthModule } from './health/health.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtFactory } from './jwt/auth.jwt';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(Configs().databases.mongo_db.url, {
			dbName: 'resfolio',
		}),
    HealthModule,
    JwtModule.registerAsync(jwtFactory),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
