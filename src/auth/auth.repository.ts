/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { User } from './entity/users.entity';

@Injectable()
export class AuthRepository {
  protected readonly logger = new Logger(AuthRepository.name);

  constructor(
    @InjectModel(User.name) public userModel: Model<User>,
    @InjectConnection() public connection: Connection,
  ) {}
}
